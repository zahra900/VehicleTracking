const StatusData = require('../models/statusdata.model');
const TrackingData = require('../models/trackingdata.model');
const JourneyData = require('../models/journeysdata.model');
const Vehicule = require('../models/vehicule.model');

exports.insertVehicule = (req, res) => {
    Vehicule.addVehicule(req.body,req.params.user_id)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

exports.GetVehicules = (req, res) => {
    Vehicule.findVehicules()
        .then((result) => {
            console.log('res',res);
            console.log('result', result);
            res.status(200).send({ "result": result });
        });
};

exports.GetVIN = (req, res) => {
    TrackingData.findVIN( req.params.D1, req.params.D2)
        .then((result) => {
            res.status(200).send({ "result": result });
        });
};

exports.removeById = (req, res) => {
    Vehicule.removeVehicule(req.params.VIN)
        .then((result) => {
            res.status(200).send({ "result": "DELETED" });
        });
};

exports.insertTrackingData = (req, res) => {
    TrackingData.addTrackingData(req.body)
        .then((result) => {
            res.status(201).send({ "result": result });
        });
};

exports.GetTrackingData = (req, res) => {
    TrackingData.findTrackingData(req.params.vin, req.params.D1, req.params.D2)
        .then((result) => {
            res.status(200).send({ "result": result });
        });
};

exports.insertJourneyData = (req, res) => {
    JourneyData.addJourneyData(req.body)
        .then((result) => {
            res.status(201).send({ "result": result });
        });
};

exports.GetJourneyData = (req, res) => {
    JourneyData.findJourneyData(req.params.vin, req.params.D1, req.params.D2)
        .then((result) => {
            res.status(200).send({ "result": result });
        });
};

exports.insertStatus = (req, res) => {
    StatusData.addStatusData(req.body)
        .then((result) => {
            res.status(201).send({ "result": result});
        });
};

exports.GetStatusByDate = (req, res) => {
    StatusData.findStatusData(req.params.vin, req.params.D1, req.params.D2)
        .then((result) => {
            res.status(200).send({ "result": result });
        });
};

