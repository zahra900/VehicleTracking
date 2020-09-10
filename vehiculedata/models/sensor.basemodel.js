const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VehiculeTracking', { useNewUrlParser: true });

var IoTProtocol = {
  MQTT: "MQTT",
  AMQP: "AMQP",
  XMPP: "XMPP",
  CoAP: "CoAP",
  DDS: "DDS"
};

const baseOptions = {
  discriminatorKey: 'sensorType', // our discriminator key
  collection: 'sensor', // the name of our collection
};

// Our Base schema: these properties will be shared
const sensorSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  protocol: { type: IoTProtocol, required: true },
  isActive: { type: Boolean, required: true },
  name: { type: String, required: true },
  isCalibrated: { type: Boolean, required: true },
  isPrecise: { type: Boolean, required: true },
  RelatedVehicule: {
    type: String,
    ref: 'Vehicule'
  },
}, baseOptions,
)

Sensor = mongoose.model('sensor', sensorSchema);

exports.Sensor = mongoose.model('sensor', sensorSchema);
