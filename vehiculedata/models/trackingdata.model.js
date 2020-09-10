const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking', { useNewUrlParser: true });
const config = require('../../env.config');
const model = require('./sensor.basemodel');

const trackingSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true },
    gpsLatitude: { type: Number, required: true },
    gpsLongitude: { type: Number, required: true },
    date_up: { type: Date },
})

trackingSchema.pre('save', function (next) {
    var todo = this;
    var currentDate = new Date();
    if (!todo.date_up) {
        todo.date_up = currentDate;
    }
    next();
});

const tracking = model.Sensor.discriminator('datasTracking ', trackingSchema);

exports.addTrackingData = (TrackingData) => {
    const track = new tracking({
        topic: config.SensorData.TrackingSensor.topic,
        protocol: config.SensorData.protocol,
        isActive: config.SensorData.isActive,
        name: config.SensorData.TrackingSensor.name,
        isCalibrated: config.SensorData.isCalibrated,
        isPrecise: config.SensorData.isPrecise,
        RelatedVehicule: TrackingData.VIN,
        timestamp: TrackingData.timestamp,
        gpsLatitude: TrackingData.gpsLatitude,
        gpsLongitude: TrackingData.gpsLongitude
    });
    return track.save();
};

exports.findTrackingData = (vin, dd, df) => {
    var dd = new Date(dd + "T00:00:00Z");
    var df = new Date(df + "T00:00:00Z");
    console.log(dd)
    return tracking.find({ RelatedVehicule: vin, date_up: { $gte: dd, $lte: df } })
        .then((result) => {
            console.log(result)
            delete result._id;
            delete result.__v;
            return result;
        });
};
function cleanArray(array) {
    var i, j, len = array.length,
        obj = {};
    var table1 = [];
    for (i = 0; i < len; i++) {
        obj[array[i]] = 0;
    }
    for (j in obj) {
        table1.push(j);
    }
    return table1
}
var tableVIN = [];

exports.findVIN = (dd, df) => {
    var dd = new Date(dd + "T00:00:00Z");
    var df = new Date(df + "T00:00:00Z");
    return tracking.find({ date_up: { $gte: dd, $lte: df } })
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                tableVIN[i] = result[i].RelatedVehicule
            }
            tableVIN = cleanArray(tableVIN)
            return tableVIN;
        });
};
