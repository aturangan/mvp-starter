var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 

var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/../react-client/dist'));

console.log('SERVERR')

//need to define url with star wars api + req.body.term

app.post('/SW', function(req, res) {
  res.send('THIS IS IN THE POST IN SERVER'); 

  var user = req.body.word;
  var urlStem = 'http://swapi.co/api/';

  request(urlStem + user, function(error, response, data) {
    var post = JSON.parse(data); 

    if (error) {
      throw error; 
    } else {
      console.log('data', data);
    }
  })

});


app.get('/info', function (req, res) {
  res.send('this is in the get in server');

  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

