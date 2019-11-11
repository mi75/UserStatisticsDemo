
const firebase = require("firebase");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBAMHyn99ez4mY2bjK7E0VOpgGQNfxxMeg",
  authDomain: "userstatisticsdemo.firebaseapp.com",
  projectId: "userstatisticsdemo"
});

var db = firebase.firestore();

module.exports = {

    readUsersList: function(startRow, callback) {

        var count;

        db.collection("users")
        .orderBy("id")
        .get()
        .then((querySnapshot) => {
          count = querySnapshot.size;
        })
        .catch((error) => {
          callback(error, null);
        });

        db.collection("users")
        .orderBy("id")
        .startAfter(startRow)
        .limit(50)
        .get()
        .then((querySnapshot) => {
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          dataModel = {
            rows: result,
            count: count
          }
          callback(null, dataModel);
        })
        .catch((error) => {
          callback(error, null);
        });

    },

    readUserStatistics: function(userId, callback) {

      // check user's existence before ("перед выборкой данных должна выполняться проверка на существование пользователя в таблице users")
      let docName = String(userId - 1);
      db.collection("users").doc(docName).get().then(function(doc) {
        if (doc.exists) {
          db.collection("users_statistic").where("user_id", "==", userId)
          .orderBy("date")
          .get()
          .then((querySnapshot) => {
            let result = [];
            querySnapshot.forEach((doc) => {
              result.push(doc.data());
            });
            callback(null, result);
          })
          .catch((error) => {
            callback(error, null);
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        callback(error, null);
      });
    }
    
}