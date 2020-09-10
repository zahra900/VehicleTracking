const mongoose = require('mongoose');
const config = require('../../env.config');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking', { useNewUrlParser: true });
const model = require('./sensor.basemodel');

const statusSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  fuelLevelWarning: { type: Number, required: true },
  waterTemperatureWarning: { type: Number, required: true },
  oilLevelWarning: { type: Number, required: true },
  keyBatteryWarning: { type: Number, required: true },
  date_up: { type: Date },
});

statusSchema.pre('save', function (next) {
  var todo = this;
  var currentDate = new Date();
  if (!todo.date_up) {
    todo.date_up = currentDate;
  }
  next();

});

const status = model.Sensor.discriminator('datasStatus', statusSchema);

exports.addStatusData = (StatusData) => {
  const statusdata = new status({
    topic: config.SensorData.StatusSensor.topic,
    protocol: config.SensorData.protocol,
    isActive: config.SensorData.isActive,
    name: config.SensorData.StatusSensor.name,
    isCalibrated: config.SensorData.isCalibrated,
    isPrecise: config.SensorData.isPrecise,
    RelatedVehicule: StatusData.VIN,
    timestamp: StatusData.timestamp,
    fuelLevelWarning: StatusData.fuelLevelWarning,
    waterTemperatureWarning: StatusData.waterTemperatureWarning,
    oilLevelWarning: StatusData.oilLevelWarning,
    keyBatteryWarning: StatusData.keyBatteryWarning
  });
  return statusdata.save();
};

exports.findStatusData = (vin, dd, df) => {
  var dd = new Date(dd + "T00:00:00Z");
  var df = new Date(df + "T00:00:00Z");
  return status.find({ RelatedVehicule: vin, date_up: { $gte: dd, $lte: df } })
    .then((result) => {
      console.log(result)
      delete result._id;
      delete result.__v;
      return result;
    });
};