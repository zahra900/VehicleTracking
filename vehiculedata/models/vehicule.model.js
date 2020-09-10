const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking', { useNewUrlParser: true });
const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
    VIN: String,
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
});

const vehicule = mongoose.model('Vehicule', vehiculeSchema);

exports.addVehicule = (VehiculeData,user_id) => {
    const Newvehicule = new vehicule({
        VIN: VehiculeData.VIN,
        OwnerID:user_id,
        ownedBy: mongoose.Types.ObjectId(user_id),
    });
    return Newvehicule.save();
};

exports.findVehicules = () => {
    var tableVEHICULES = [];
    //return vehicule.find({ ownedBy: mongoose.Types.ObjectId(user_id) })
    return vehicule.find()
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                tableVEHICULES[i] = result[i].VIN
            }
            return tableVEHICULES;
        });
};

exports.removeVehicule = (VIN) => {
    return new Promise((resolve, reject) => {
        vehicule.remove({ VIN: VIN }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.vehicule;