## Usage

mongod --auth --bind_ip 127.0.0.1

Make sure you have mongodb installed into your own machine and running;
Get the project and run: `npm install`

Run `npm start`. It will initialize the server at port 8443.

##Test Identity related requests

POST https://localhost:8443/users

{"firstName":"Mohamed-Amine","lastName":"Alum","email":"medamine@yahoo.com","password":"Min$09ou2!","permissionLevel":2049}

201 Created

{
    "id": "5bcc712b50ace7ebfaaf82ac"
}


GET https://localhost:8443/users/5bcc712b50ace7ebfaaf82ac

401 Unauthorized

POST https://localhost:8443/auth

201 Created

{"email":"medamine@yahoo.com","password":"Min$09ou2!"}

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o",
    "refreshToken": "QkM2MlNTSHRaM3NlMzhRNWViOFpMelEvUXd1Y00xV0dZSlNBSHpkeGF6TVBOK1c1cERFb3lQeWppaVJvTGVmOEpnNDlvSElrZGM4K0xGenpLTVNySGc9PQ=="
}

GET https://localhost:8443/users/5bcc712b50ace7ebfaaf82ac

authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o

200 OK

{
    "firstName": "Mohamed-Amine",
    "lastName": "Alum",
    "email": "medamine@yahoo.com",
    "password": "aSptMBJUtcjA81T8gsn8Lg==$klzw7dDgRkSp9xlPEGe1RpVZCrdCFjDikAQqWTMvcYPXVywR9HdBzXmsRA8pFQnEatokusQ8pA5/QbCaT3mdrw==",
    "permissionLevel": 1,
    "id": "5bcc712b50ace7ebfaaf82ac"
}

##Test Vehicule Related Requests

POST https://localhost:8443/Vehicule/5e08e84f5fba6c4de4a3f505

{"VIN": "VF1RFA00X60637450"}

201 Created

{
    "id": "5e08e8f95fba6c4de4a3f507"
}

GET https://localhost:8443/Vehicules

200 OK

{
    "result": [
        {
            "_id": "5e08e8f95fba6c4de4a3f507",
            "VIN": "dbfgb5452425cb",
            "ownedBy": "5e08e84f5fba6c4de4a3f505",
            "__v": 0
        }
    ]
}

DELETE https://localhost:8443/Vehicule/:vehicule_id

200 OK

{
    "result": "DELETED"
}

GET https://localhost:8443/Vin/2019-12-19/2019-12-21

200 OK

{
    "result": [
        "VF1RFA00X60637450",
        "VF1JZ49BJ55440744",
        "VF1RFD00257184142"
    ]
}

##Test tracking data related functions

POST https://localhost:8443/Trackingdata

{ "VIN": "VF1RFA00X60637450",
  "timestamp": 1562527525,
  "gpsAltitude": 32,
  "gpsDirection": 84.099998,
  "gpsLatitude": 47.519165,
  "gpsLongitude": -0.426781,
  "longitudinalAcceleration": -0.127,
  "transverseAcceleration": -0.17,
  "verticalAcceleration": -1.126 }

201 Created

{
    "id": "5dd2fe8aa948384854d2b25e"
}


GET https://localhost:8443/Trackingdata/VF1RFD00257184142/2019-7-2/2019-8-2

403 Forbidden

POST https://localhost:8443/auth

201 Created

{"email":"medamine@yahoo.com","password":"Min$09ou2!"}

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o",
    "refreshToken": "QkM2MlNTSHRaM3NlMzhRNWViOFpMelEvUXd1Y00xV0dZSlNBSHpkeGF6TVBOK1c1cERFb3lQeWppaVJvTGVmOEpnNDlvSElrZGM4K0xGenpLTVNySGc9PQ=="
}

GET https://localhost:8443/Trackingdata/VF1RFD00257184142/2019-12-19/2019-12-21

authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o

200 OK

{
    "result": [
        {
            "_id": "5dd2ff66acd6424b084c8f81",
            "timestamp": 1562086036,
            "VIN": "VF1RFD00257184142",
            "FleetID": 100201,
            "gpsAltitude": 164,
            "gpsDirection": 306.600006,
            "gpsLatitude": 48.775711,
            "gpsLongitude": 2.072922,
            "longitudinalAcceleration": -0.098,
            "transverseAcceleration": 0.061,
            "verticalAcceleration": -1.166,
            "__v": 0
        },
        .
        .
        .
        {
            "_id": "5dd2ff6cacd6424b084c9081",
            "timestamp": 1562086668,
            "VIN": "VF1RFD00257184142",
            "FleetID": 100201,
            "gpsAltitude": 164,
            "gpsDirection": 35.299999,
            "gpsLatitude": 48.797482,
            "gpsLongitude": 2.035639,
            "longitudinalAcceleration": 0.313,
            "transverseAcceleration": -0.062,
            "verticalAcceleration": -1.067,
            "__v": 0
        }
    ]
}

##Test journey data related functions

POST https://localhost:8443/JourneyData

{"VIN": "VF1RFD00257184142",
  "FleetID": 100200,
  "averageSpeed": 38.33736473582771,
  "consumedFuel": 1.52,
  "distance": 16.729999999995925,
  "duration": 27,
  "endDate": 1562002279,
  "endLatitude": 48.824238,
  "endLongitude": 1.964275,
  "fleetId": 100200,
  "startDate": 1562000708,
  "startLatitude": 48.763462,
  "startLongitude": 2.088455,
  "timestamp": 1562002279}

201 Created

{
    "id": "5dd460e8b43fd511cc2149e7"
}

GET https://localhost:8443/Journeydata/VF1RFD00257184142/2019-12-19/2019-12-21

403 Forbidden

POST https://localhost:8443/auth

201 Created

{"email":"medamine@yahoo.com","password":"Min$09ou2!"}

{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o",
    "refreshToken": "QkM2MlNTSHRaM3NlMzhRNWViOFpMelEvUXd1Y00xV0dZSlNBSHpkeGF6TVBOK1c1cERFb3lQeWppaVJvTGVmOEpnNDlvSElrZGM4K0xGenpLTVNySGc9PQ=="
}

GET https://localhost:8443/Journeydata/VF1RFD00257184142/2019-12-19/2019-12-21

authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmNjNzEyYjUwYWNlN2ViZmFhZjgyYWMiLCJlbWFpbCI6Imd0X2FtaW5lQHlhaG9vLmZyIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1vaGFtZWQtQW1pbmUgR3VldGFyaSIsInJlZnJlc2hLZXkiOiI2L1gyendwckRJMWF2VTNYSVMwcWVBPT0iLCJpYXQiOjE1NDAxMjU1NDJ9.oHf4kSVmziEy6pbpmpgYzmUc_WpZa0kuyWbXfTH6b1o

200 OK

{
    "result": [
        {
            "_id": "5dd45f26df56a5476cc52d52",
            "timestamp": 1561959115,
            "VIN": "VF1RFD00257184142",
            "FleetID": 100201,
            "averageSpeed": 6.222222222196352,
            "consumedFuel": 0.06,
            "distance": 0.13999999999941792,
            "duration": 2,
            "startDate": 1561959034,
            "endDate": 1561959115,
            "endLatitude": 48.821907,
            "endLongitude": 1.959311,
            "startLatitude": 48.820972,
            "startLongitude": 1.959453,
            "__v": 0
        },
        .
        .
        .
        {
            "_id": "5dd45f26df56a5476cc52d5d",
            "timestamp": 1562002279,
            "VIN": "VF1RFD00257184142",
            "FleetID": 100201,
            "averageSpeed": 38.33736473582771,
            "consumedFuel": 1.52,
            "distance": 16.729999999995925,
            "duration": 27,
            "startDate": 1562000708,
            "endDate": 1562002279,
            "endLatitude": 48.824238,
            "endLongitude": 1.964275,
            "startLatitude": 48.763462,
            "startLongitude": 2.088455,
            "__v": 0
        }
    ]
}

##Test status data related functions

POST https://localhost:8443/Statusdata

{ "VIN": "VF1RFA00X60637450",
  "FleetID": 100201,
  "eventTimestamp": 1561479607,
  "brakingSystemFailure": 0,
  "fuelLevelWarning": 0,
  "globalServWarning":0,
  "globalStopWarning": 0,
  "keyBatteryWarning": 0 }

GET https://localhost:8443/Statusdata/VF1RFD00257184142/2019-12-19/2019-12-21

  {
    "result": [
        {
            "sensorType": "datasStatus",
            "_id": "5dfd587f8ded26292c732354",
            "topic": "StatusData",
            "protocol": "MQTT",
            "isActive": true,
            "name": "Statussensor",
            "isCalibrated": true,
            "isPrecise": true,
            "RelatedVehicule": "VF1RFD00257184142",
            "eventTimestamp": 1561910578,
            "brakingSystemFailure": 0,
            "fuelLevelWarning": 0,
            "globalServWarning":0,
            "globalStopWarning": 0,
            "keyBatteryWarning": 0,
            "date_up": "2019-12-20T23:25:51.226Z",
            "__v": 0
        },
        .
        .
        .
        {
            "sensorType": "datasStatus",
            "_id": "5dfd58818ded26292c732376",
            "topic": "StatusData",
            "protocol": "MQTT",
            "isActive": true,
            "name": "Statussensor",
            "isCalibrated": true,
            "isPrecise": true,
            "RelatedVehicule": "VF1RFD00257184142",
            "eventTimestamp": 1561910663,
            "brakingSystemFailure": 0,
            "fuelLevelWarning": 0,
            "globalServWarning":0,
            "globalStopWarning": 0,
            "keyBatteryWarning": 0,
            "date_up": "2019-12-20T23:25:53.533Z",
            "__v": 0
        }
    ]
}