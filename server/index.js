var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 
var db = require('../database-mongo/index.js' );

var app = express();
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/SW', function(req, res, next) {

  var user = req.body.word.toLowerCase();
  console.log(typeof user); 


  var urlStem = 'http://swapi.co/api/';
  var num;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (user === 'species') {
    num = getRandomInt(1, 37);
  } else if (user === 'people') {
    num = getRandomInt(1, 87); 
  } else if (user === 'planets') {
    num = getRandomInt(1, 61); 
  }


  request(urlStem + user + '/' + num + '/', function(error, response, data) {
    var post = JSON.parse(data); 

    console.log('POST RESULTS', post)

    var DB = new db({
      name: post.name
    });

    console.log('DATABASEEE', DB); 

    DB.save(function(error) {
      if (error) {
        console.log('Error Saving to Database'); 
      } else {
        console.log('Information Saved to Database'); 
      }
    });

    res.send(post.name); //sending the headers as well
    res.end(); 
  })
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

