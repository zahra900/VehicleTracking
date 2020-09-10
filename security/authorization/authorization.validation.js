const jwt = require('jsonwebtoken'),
refreshSecret = require('../../env.config.js').actualRefreshSecret,
crypto = require('crypto');
var fs = require('fs');
const path = require('path');


const dirPath = path.join(__dirname, '../../tls/token-public-key.pem');
const cert = fs.readFileSync(dirPath);

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                var aud = 'urn:'+(req.get('origin')?req.get('origin'):"kaaniche.xyz");
                req.jwt = jwt.verify(authorization[1], cert, {issuer:"urn:kaaniche.xyz",audience:aud,algorithms: ['RS512']});
                return next();
            }
        } catch (err) {
            return res.status(403).send({"msg":err});
        }
    } else {
        return res.status(401).send();
    }
};

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({'msg': 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let decoded = b.toString().split('$');
    let salt = decoded[0];
    let refresh_token = decoded[1];
    let hash = crypto.createHmac('sha512', salt).update(req.jwt.user_id + refreshSecret + req.jwt.jti).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({'msg': 'Invalid refresh token'});
    }
};