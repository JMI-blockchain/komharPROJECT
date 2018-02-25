var fs = require('fs');

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

//bcrypt for hashing the password
var bcrypt = require('bcrypt');
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
var urlencodedParser = bodyParser.urlencoded({extended:true});
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

  bcrypt.hash(pass, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    var newuser= user({username:name,password:hash}).save(function(err,data){
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

/*IPFS FILE UPOLOAD CODE BY AMISH*/

//multer middleware
var multer  = require('multer');
var upload = multer({ dest: './z000000z00'});

var ipfsAPI = require('ipfs-api')
//var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) 
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')
const IPFS = require('ipfs');

// Spawn your IPFS node \o/
const node = new IPFS();

app.post('/file_upload', upload.single('filer'), function (req, res, next)  {
   var tmp_path = req.file.path;
  console.log(tmp_path);
var hashes=ipfs.id()
    {
      //showStatus(`daemon active\nid: ${res.ID}`, COLORS.success)
      var data = fs.readFileSync('./'+tmp_path);
console.log("Synchronous read: " + data.toString());
      var hashes2=""; 
    let files = [
        {
            path:'./'+tmp_path,
            content: data
        }
    ]
    node.files.add(files, function (err,files) {
        if (err) {
            console.log(err);
        } else {
hashes2="hash:"+files[0].hash
hashes=hashes2;
return hashes2;
            console.log(files[0].hash)
                
         }
    })
    }
/*
BELOW CODE IS OLD ONE NOT WORKING 
node.on('ready', () => {
    node.id((err, id) => {
        if (err) {
            return console.log(err)
        }
        console.log(id)
    })
    
var data = fs.readFileSync('./'+tmp_path);
console.log("Synchronous read: " + data.toString());

    let files = [
        {
            path:'./'+tmp_path,
            content: data
        }
    ]
console.log(files.path);
    node.files.add(files, function (err, files) {
        if (err) {
            console.log(err);
        } else {
            console.log(files[0].hash)
        }
    })
})*/
setTimeout(function(){ console.log("haha"+hashes);
//res.end();
  res.send(hashes); }, 3000);

})

app.listen(4000);
