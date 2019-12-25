var express = require("express");
var cors = require("cors");

var dbOperations = require('./rdsDbOperations');


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
                // res.send(err);
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

// apiRouter.route("/usersdat")
//     .get(function(req, res) {
//         let userId = parseInt(req.query.userId);
//         let start = req.query.start;
//         let last = req.query.last;
//         dbOperations.readUserStatistics(userId, function(err, result) {
//             if (err) {
//                 res.status(500);
//                 res.send(err);
//             } else {
//                 let list = '';
//                 var set = [];
//                 for (let i=0; i<result.length; i++) {
//                     if (new Date(result[i].date) >= new Date(start) && new Date(result[i].date) <= new Date(last)) {
//                         set.push(result[i]);
//                     }
//                 };
//                 list = JSON.stringify(set);
//                 res.send(list);
//             }
//         });
//     });

serverApp.listen(3000);