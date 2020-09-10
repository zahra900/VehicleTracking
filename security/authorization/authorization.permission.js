const jwt = require('jsonwebtoken'), config = require('../../env.config');

const Master = config.permissionLevels.Master;
const Member = config.permissionLevels.Member;
//surfer is the default permission level attributed to the new user
const Surfer = config.permissionLevels.Surfer;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.roles);
        //ET binaire exemple 5 & 13 -> 0101 & 1101 --> 0101 --> expected output: 5 --> true
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            //code 403 forbidden access
            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {

    let user_permission_level = parseInt(req.jwt.roles);
    let userId = req.jwt.userId;
    // if it is the same user
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        // if it is the admin
        if (user_permission_level & Master) {
            return next();
        } else {
            return res.status(403).send();
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};
