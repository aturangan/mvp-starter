var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 
var items = require('../database-mongo');

var app = express();
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/../react-client/dist'));

console.log('SERVERR'); 

//need to define url with star wars api + req.body.term

app.post('/SW', function(req, res) {

  res.send('THIS IS IN THE POST IN SERVER'); 

  //won't work because user types in (ex. Luke, 
  // but the api is looking for /person/1 or something)
  //is it possible to get all the data from the api?
  //or do you have to specifically put /planet/1

  //need to get the result from category and number

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

