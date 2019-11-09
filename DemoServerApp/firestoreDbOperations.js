
const firebase = require("firebase");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBAMHyn99ez4mY2bjK7E0VOpgGQNfxxMeg",
  authDomain: "userstatisticsdemo.firebaseapp.com",
  projectId: "userstatisticsdemo"
});

var db = firebase.firestore();

module.exports = {

    readUsersList: function(callback) {

        db.collection("users")
        .orderBy("id")
        .limit(50)
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

    },

    readUserStatistics: function(userId, callback) {

      db.collection("users_statistic").where("user_id", "==", userId)
      .orderBy("date")
      .limit(50)
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

  }

}