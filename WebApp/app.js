//express import
var express =require('express');

//for parsing the data string sent over the network
var bodyParser = require('body-parser');
//for database queries
var mongoose = require('mongoose');
var user = require('./models/db');

//for sessions
var session = require('express-session');

//passport js
var passport=require('passport');

var WEB3  = require('./models/web3');

//bcrypt for hashing the password
var bcrypt = require('bcryptjs');
const saltRounds = 10;
/*
var newuser= user({username:'himanshu',password:'dfgkjl'}).save(function(err,data){
  if(err) throw err;
  console.log('saved');
  console.log(data);
});
*/

//App object
var app=express();
console.log("Server Started");

 //selecting the view engine
app.set('view engine','ejs');

//for loading the static files required in the views
app.use(express.static('./views'));
app.use(session({secret:"45rtfgy67tygh9uik65",resave:false,saveUninitialized:true}));
//Parser object
var urlencodedParser = bodyParser.urlencoded({extended:false});
//passport use
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('/',function(req,res){
  console.log("HomePage");
  res.render('index');
});
app.get('/login',function(req,res){
  console.log("Login");
  res.render('login',{flag:false});
});
app.get('/register',function(req,res){
  console.log("Register Page");
  res.render('register',{flag:false});
});

app.get('/about',function(req,res){
  console.log("About Page");
res.render('about');
});

app.get('/faq',function(req,res){
  console.log("FAQ Page");
res.render('faq');
});
app.get('/profile/:name',function(req,res){
  res.render('profile',{person:req.params.name});
});

app.get('/register-success/:username',function(req,res){
  res.render('register-success',{uname:req.params.username});
});

app.get('/dashboard',function(req,res){
  console.log(req.session);
  if(!req.session.user){
    return res.status(401).redirect('/login');
  }
  else {
    return res.status(200).render('profile',{person:req.session.user.username});
  }
});

app.get('/logout',function(req,res){
  //console.log(req.session.user.username+" is logged out");
  req.session.destroy();
  res.redirect('/login');
});
//routes for the post requests

app.post('/register',urlencodedParser,function(req,res,next){
  //if username is unique then load the register succes page

  var name=req.body.username;
  var pass=req.body.password;

  console.log('On server side!!');

  //console.log(WEB3.publicKey);
  //console.log(WEB3.encPrivateKey);

  bcrypt.hash(pass, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    var newuser= user.User({username:name,password:hash}).save(function(err,data){
      if(err){
          console.log("Failed to register !! Try Again");
        return res.status(404).render("register",{flag:true});
      }
        else {
          //console.log(WEB3.encPrivateKey(password));
          //toDo--->generate user wallet and store private key in encrypted form
          //getting the encrypted private key
          var k = WEB3(pass);
          //storing the private key in DB
          var Pkey = user.Key({username:name,encKey: k}).save(function(err,data){
            if(err){
              console.log('Failed to store encrypted private key in database');
            }
            else{
              console.log(data);
            }
          });
          //var enckey = user.Key({username: name,})
          //console.log(data);
          console.log("Succesfully registered with username " +name);
          res.redirect('/register-success/'+name);
        }
      });

  });


});

app.post('/login',urlencodedParser,function(req,res){
  var name=req.body.username;
  var pass=req.body.password;

  user.findOne({username:name},function(err,data){
    if(err){
        console.log("Failed to login !! Try Again");
        return res.status(500).send("Error Occured something wrong with database");
    }
    else if(!data)
    {
      return res.status(404).render("login",{flag:true});
    }
    else {
      bcrypt.compare(pass,data.password,function(err,isMatch){
        if(isMatch){
          console.log("Login Succesfully");
          //added to the session
          req.session.user=data;

          res.redirect('/dashboard');
        }
        else{
          return res.status(404).render("login",{flag:true});
        }
      });

    }
  });
});


app.listen(4000);
