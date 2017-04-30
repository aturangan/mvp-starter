var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 
var db = require('../database-mongo/index.js' );

var app = express();
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/SW', function(req, res) {

  var user = req.body.word.toLowerCase();
  var urlStem = 'http://swapi.co/api/';

  request(urlStem + user + '/', function(error, response, data) {
    var post = JSON.parse(data); 

    post.results.forEach(item => {
      console.log('ITEM, ITEM, ITEM, ITEM NAAAME', item.name); 


        var DB = new db({
          name: item.name
        });

        console.log('DATABASEEE', DB); 

        DB.save(function(error) {
          if (error) {
            console.log('Error Saving to Database'); 
          } else {
            console.log('Information Saved to Database'); 
          }
        });

      });
    })

    console.log('databaseee'); 

  });



app.get('/info', function (req, res) {

  // console.log('REQUEST FOR GET', req); 
  // //might need to parse 
  // //send to client as object 

  // //how to get from database
  // DB.find({}, function(err, item) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(item);
  //     console.log('GET REQUEST');
  //     res.end(); 
  //   }
  // })

  res.send('HELLO')


});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

