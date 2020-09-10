module.exports = {
    "port": 8443,
    "appEndpoint": "https://localhost:8443",
    "apiEndpoint": "https://localhost:8443",
    "refresh_secret": "Oh!42My@Go6*d9753!",
    "jwtValidityTimeInSeconds": 1020,
    "environment": "dev",
    "permissionLevels": {
        "Member": 1,
    },
    "actualRefreshSecret": null,
    "initRefreshSecret": function () {
        this.actualRefreshSecret = this.refresh_secret.concat('$' + (new Date(Date.now())).toISOString());
    },
    "SensorData": {
        "protocol": "MQTT",
        "isActive": true,
        "name": "Track",
        "isCalibrated": true,
        "isPrecise": true,
        "TrackingSensor":{
            "topic":"TrackingData",
            "name":"Trackingsensor",
        },
        "StatusSensor":{
            "topic":"StatusData",
            "name":"Statussensor",
        },
        "JourneySensor":{
            "topic":"JourneyData",
            "name":"Journeysensor",
        }
    }
};