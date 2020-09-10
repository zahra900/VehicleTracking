const AuthorizationValidation = require('../security/authorization/authorization.validation');
const AuthorizationPermission = require('../security/authorization/authorization.permission');
const DataController  = require('./controllers/vehiculedata.provider');
const config = require('../env.config');

const Member = config.permissionLevels.Member;

exports.routesConfig = function (app) {
    
    app.post('/Vehicule/:user_id', [
        //AuthorizationValidation.validJWTNeeded,
        DataController.insertVehicule
    ]);

    app.get('/Vehicules', [
        //AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.GetVehicules
    ]);

    app.delete('/Vehicule/:VIN', [
        AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.removeById
    ]);

    app.get('/Vin/:D1/:D2', [
        AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.GetVIN,
    ]);
    
    app.post('/Trackingdata', [
        //AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.insertTrackingData
    ]);
    app.get('/Trackingdata/:vin/:D1/:D2', [
        AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.GetTrackingData,
    ]);

    app.post('/Journeydata', [
        //AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.insertJourneyData
    ]);
    app.get('/Journeydata/:vin/:D1/:D2', [
        AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.GetJourneyData,
    ]);
    app.post('/Statusdata', [
       // AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.insertStatus
    ]);
    app.get('/Statusdata/:vin/:D1/:D2', [
        AuthorizationValidation.validJWTNeeded,
        //AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DataController.GetStatusByDate,
    ]);
}
