//express import
var express =require('express');

//for parsing the data string sent over the network
var bodyParser = require('body-parser');

//for database queries
var mongoose = require('mongoose');
var user = require('./models/db');
var passport = require('passport');

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

//Parser object
var urlencodedParser = bodyParser.urlencoded({extended:false});

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

//routes for the post requests

app.post('/register',urlencodedParser,function(req,res,next){
  //if username is unique then load the register succes page

  var name=req.body.username;
  var pass=req.body.password;
  var newuser= user({username:name,password:pass}).save(function(err,data){
    if(err){
        console.log("Failed to register !! Try Again");
      return res.status(404).render("register",{flag:true});
    }
      else {
        console.log("Succesfully registered with username " +name);
        res.redirect('/register-success/'+name);
      }
    });
});

app.post('/login',urlencodedParser,function(req,res){
  var name=req.body.username;
  var pass=req.body.password;
  user.findOne({username:name,password:pass},function(err,data){
    if(err){
        console.log("Failed to login !! Try Again");
        return res.status(500).send("Error Occured something wrong with database");
    }
    else if(!data)
    {
      return res.status(404).render("login",{flag:true});
    }
    else {
      console.log("Login Succesfully");
      res.redirect('/profile/'+data.username);
    }
  });
});


app.listen(4000);
