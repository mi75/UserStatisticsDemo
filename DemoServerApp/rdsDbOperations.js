var mysql = require('mysql');

// create a MySQL DB connection:
var connection = mysql.createConnection({
    host: 'turcomp-db.c1qcxy6ljwg1.eu-central-1.rds.amazonaws.com',
    database: 'mandry',
    user: 'admin',
    password: 'strikeagle15',
    port: 3306
});


module.exports = {

    readUsersList: function(startRow, callback) {
        var count;
        connection.query('SELECT COUNT(*) as count FROM users', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                count = result[0].count;
            }
        });
        connection.query('SELECT * FROM users ORDER BY id ASC LIMIT ?, 3', startRow, function(err, result) {
            var dataModel;
            if (err) {
                callback(err, null);
            } else {
                dataModel = {
                    rows: result,
                    count: count
                }
                callback(null, dataModel);
            }
        });
    },

    readUserStatistics: function(userId, callback) {
        connection.query('SELECT * FROM stat WHERE stat.id = ?', userId, function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

}


// insertion's data: console.log(query.sql);