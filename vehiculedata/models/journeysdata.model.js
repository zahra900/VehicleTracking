const mongoose = require('mongoose');
const config = require('../../env.config');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking', { useNewUrlParser: true });
const model = require('./sensor.basemodel');

const Schema = mongoose.Schema;

const journeySchema = new Schema({
  timestamp: Number,
  averageSpeed: Number,
  consumedFuel: Number,
  distance: Number,
  duration: Number,
  startDate: Number,
  endDate: Number,
  endLatitude: Number,
  endLongitude: Number,
  startLatitude: Number,
  startLongitude: Number,
  date_up: { type: Date }
});

journeySchema.pre('save', function(next) {
  var todo = this;
  var currentDate = new Date();
  if (!todo.date_up) {
      todo.date_up = currentDate;
  }
  next();

});

const journeys = model.Sensor.discriminator('datasJourney', journeySchema);

exports.addJourneyData = (JourneyData) => {
  const NewJourneyData = new journeys({
    topic: config.SensorData.JourneySensor.topic,
    protocol: config.SensorData.protocol,
    isActive: config.SensorData.isActive,
    name: config.SensorData.JourneySensor.name,
    isCalibrated: config.SensorData.isCalibrated,
    isPrecise: config.SensorData.isPrecise,
    RelatedVehicule: JourneyData.VIN,
    timestamp: JourneyData["Data/timestamp"],
    averageSpeed: JourneyData["Data/averageSpeed"],
    consumedFuel: JourneyData["Data/consumedFuel"],
    distance: JourneyData["Data/distance"],
    duration: JourneyData["Data/duration"],
    startDate: JourneyData["Data/startDate"],
    endDate: JourneyData["Data/endDate"],
    endLatitude: JourneyData["Data/endLatitude"],
    endLongitude: JourneyData["Data/endLongitude"],
    startLatitude: JourneyData["Data/startLatitude"],
    startLongitude: JourneyData["Data/startLongitude"]
    /*timestamp: JourneyData.timestamp,
    averageSpeed: JourneyData.averageSpeed,
    consumedFuel: JourneyData.consumedFuel,
    distance: JourneyData.distance,
    duration: JourneyData.duration,
    startDate: JourneyData.startDate,
    endDate: JourneyData.endDate,
    endLatitude: JourneyData.endLatitude,
    endLongitude: JourneyData.endLongitude,
    startLatitude: JourneyData.startLatitude,
    startLongitude: JourneyData.startLongitude*/
  })
  return NewJourneyData.save();
};


exports.findJourneyData = (vin, dd, df) => {
  var dd = new Date(dd + "T00:00:00Z");
  var df = new Date(df + "T00:00:00Z");
  return journeys.find({ RelatedVehicule: vin, date_up: { $gte: dd, $lte: df } })
    .then((result) => {
      console.log(result)
      delete result._id;
      delete result.__v;
      return result;
    });
};
