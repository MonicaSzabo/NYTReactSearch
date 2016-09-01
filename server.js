var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost/nytreact');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

app.get('/api/saved', function(req, res) {

  // This GET request will search for the latest clickCount
  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

app.post('/api/saved', function(req, res){

  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  // var results = req.body.results;
  // var searchTerm = req.body.searchTerm;

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount.
  newArticle.save(function(err, doc){

    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }

  });

  //   else{
    //       Article.create({'title': req.body.title, 'date': req.body.date, 'url':req.body.url}).exec(function(err, doc){
    //   if(err) {
    //     console.log(err);
    //   }


});



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
