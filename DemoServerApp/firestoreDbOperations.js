
var result = [
    {
      id: 1,
      first_name: 'Tom',
      last_name: 'Lee'
    },
    {
      id: 2,
      first_name: 'Dee',
      last_name: 'Smith'
    },
    {
      id: 3,
      first_name: 'Dan',
      last_name: 'Brown'
    }
];

module.exports = {
    readUsersList: function(callback) {
        
        callback(null, result);

    }
}