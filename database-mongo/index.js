var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var infoSchema = mongoose.Schema({
  //info that you want to display for star wars word 

  name: {type: String, unique: true, dropDups: true}
  
});

var Info = mongoose.model('Info', infoSchema);

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;

module.exports = Info; 