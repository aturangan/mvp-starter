var express = require('express');
var bodyParser = require('body-parser');
var request = require('request'); 
var db = require('../database-mongo');

var app = express();
app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/../react-client/dist'));

//console.log('SERVERR'); 

//need to define url with star wars api + req.body.term

app.post('/SW', function(req, res) {

  var user = req.body.word.toLowerCase();
  var urlStem = 'http://swapi.co/api/';

  request(urlStem + user + '/', function(error, response, data) {
    var post = JSON.parse(data); 

    console.log('POST AT INDEX', post);

    post.results.forEach(item => {
      console.log(item); 

      db.findOne({stat: item.name}, function(error, data) {

        if (data) {
          console.log('We already have those stats');

        } else {
          var DB = new db({
            title: item.title, 
            episode_id: item.episode_id
          });

          DB.save(function(error) {
            if (error) {
              console.log('Error Saving to Database'); 
            } else {
              console.log('Information Saved to Database'); 
            }
          });
        }
      })
    })
  })

  res.end();
})


app.get('/info', function (req, res) {
  // db.find(function(err, item) {
  //   if (err) {
  //     console.error(err); 
  //   } else {
  //     res.send(item); 
  //   }
  // })

  res.send('this is in the get in server');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

