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
  name: {type: String, unique: true, dropDups: true}
});

var Info = mongoose.model('Info', infoSchema);

module.exports = Info; 