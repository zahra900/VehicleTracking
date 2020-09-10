var mqtt = require('mqtt');
var TrackingData = require('./vehiculedata/models/trackingdata.model');
var JourneyData = require('./vehiculedata/models/journeysdata.model');
var StatusData = require('./vehiculedata/models/statusdata.model');
 
var options1 = {
    port: 1883,
    host: 'mqtt://tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'souxufjh',
    password: 'hepYxeQfkl6e',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var client1 = mqtt.connect('mqtt://tailor.cloudmqtt.com', options1);

client1.subscribe('TracksSensor', function () {
    // when a message arrives, do something with it
    client1.on('message', function (topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
        var message = JSON.parse(message)
        //console.log("Received '" + message + "' on '" + topic + "'");
        //create and save Tracking data 
        console.log(message)
        TrackingData.addTrackingData(message)
        console.log("added")
    })
});
var options2 = {
    port: 16963,
    host: 'mqtt://tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'wsystwpy',
    password: 'b3bdBTBaxGlZ',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var client2 = mqtt.connect('mqtt://tailor.cloudmqtt.com', options2);

client2.subscribe('Journeysensor', function () {
    // when a message arrives, do something with it
    client2.on('message', function (topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
        var message = JSON.parse(message)
        console.log(message)
        JourneyData.addJourneyData(message)
        console.log("added")
    })
});

var options3 = {
    port: 11373,
    host: 'mqtt://tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'uqlqcwig',
    password: 'GtNu4bhqpFJd',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var client3 = mqtt.connect('mqtt://tailor.cloudmqtt.com', options3);

client3.subscribe('WarningsSensor', function () {
    client3.on('message', function (topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
        var message = JSON.parse(message)
        console.log(message)
        StatusData.addStatusData(message)
        console.log("added")
    })
});


