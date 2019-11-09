var express = require("express");
var cors = require("cors");

var dbOperations = require('./firestoreDbOperations');


var serverApp = express();
serverApp.use(cors());


var apiRouter = express.Router();
serverApp.use("/api", apiRouter);

apiRouter.route("/userslist")
    .get(function(req, res) {
        let startRow = parseInt(req.query.startRow);
        dbOperations.readUsersList(startRow, function(err, result) {
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
    .get(function(req, res) {
        let userId = parseInt(req.query.userId);
        dbOperations.readUserStatistics(userId, function(err, result) {
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

serverApp.listen(3000);