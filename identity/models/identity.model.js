const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking',{ useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once('open', ()=>{console.log('connected')}).on('error', (error)=>{console.log('error')});
const Schema = mongoose.Schema;


const identitySchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    date_up: Date,
    permissionLevel: Number,
});

identitySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

identitySchema.set('toJSON', {
    virtuals: true
});

identitySchema.pre('save', function(next) {
    var todo = this;
    var currentDate = new Date();
    if (!todo.date_up) {
        todo.date_up = currentDate;
    }
    next();
  
  });

  identitySchema.findById = function (cb) {
    return this.model('Users').find({ id: this.id }, cb);
};

const Identity = mongoose.model('Users', identitySchema);

exports.findByEmail = (email) => {
    return Identity.find({ email: email });
};

exports.findById = (id) => {
    return Identity.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createIdentity = (userData) => {
    const newuser = new Identity(userData);
    return newuser.save();
};


exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Identity.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.putIdentity = (id, identityData) => {
    return new Promise((resolve, reject) => {
        Identity.findByIdAndUpdate(id, identityData, function (err, user) {
            if (err) reject(err);
            resolve(user);
        });
    });
};

exports.patchIdentity = (id, userData) => {
    return new Promise((resolve, reject) => {
        Identity.findById(id, function (err, user) {
            if (err) reject(err);
            let actualPermisssion = user.permissionLevel;
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.permissionLevel = actualPermisssion;
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    });

};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        Identity.remove({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.Identity;


