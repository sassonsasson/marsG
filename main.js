var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: 'SECRET'});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//here we connect our server to our database...the name after localhost is the name of our db. Db name wont appear in mongo unless you save something to the db
mongoose.connect('mongodb://localhost/mars');

app.use(express.static('public'));
app.use(express.static('node_modules'));

var LocalStrategy = require('passport-local').Strategy;

app.get('/admin', function (req, res) {
  
  Form.find().exec(function(err, rel){
    res.json(rel)
  })

});

var Form = require("./public/form.js");

// var form1 = new Form({email: 'gal@gal77.com', company: 'meGusta', subject: 'text', text: 'this is a text'});

app.post('/admin',function(req,res){
  var newForm = new Form(req.body);
  
  newForm.save();

  //respond back to the client...res.json, res.send, res.end
  res.end();
})

app.listen(9000);


// app.get('/logged', auth, function (req, res) {
//   res.json(req.user);
// });
//   passport.use('login', new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }

//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }

//       return done(null, user);
//     });
//   }
// ));