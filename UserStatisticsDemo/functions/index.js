
'use strict';

var express = require("express");
const functions = require('firebase-functions');
// const cors = require('cors')({
//   origin: true,
// });
var dbOperations = require('./firestoreDbOperations');

var serverApp = express();

var apiRouter = express.Router();
serverApp.use("/api", apiRouter);

exports.serverApp = functions.https.onRequest(serverApp);

// exports.serverApp = functions.https.onRequest((req, res) => {
  
//   return cors(req, res, () => {
    
//     res.status(200).send("test test");

//   });
// });

apiRouter.route("/userslist")
    .get ((req, res) => {
        let startRow = parseInt(req.query.startRow);
        dbOperations.readUsersList(startRow, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                let list = '';
                if (result) list = JSON.stringify(result);
                res.send(list);
            }
        });
    });

apiRouter.route("/userstat")
    .get((req, res) => {
        let userId = parseInt(req.query.userId);
        dbOperations.readUserStatistics(userId, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                let list = '';
                if (result) list = JSON.stringify(result);
                res.send(list);
            }
        });
    });

apiRouter.route("/usersdat")
    .get((req, res) => {
        let userId = parseInt(req.query.userId);
        let start = req.query.start;
        let last = req.query.last;
        dbOperations.readUserStatistics(userId, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                let list = '';
                var set = [];
                for (let i=0; i<result.length; i++) {
                    if (new Date(result[i].date) >= new Date(start) && new Date(result[i].date) <= new Date(last)) {
                        set.push(result[i]);
                    }
                }
                list = JSON.stringify(set);
                res.send(list);
            }
        });
    });

