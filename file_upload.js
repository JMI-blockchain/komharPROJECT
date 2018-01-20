var express = require('express');
var app = express();

//
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) 
const IPFS = require('ipfs');
// Spawn your IPFS node \o/
const node = new IPFS();

//

var multer  = require('multer');
var upload = multer({ dest: './z000000000'});
var fs = require('fs');

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('filer');

app.post('/upload', type, function (req,res) {

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;
  console.log(tmp_path);
  //
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
            path: './'+tmp_path,
            content: data
        }
    ]
    node.files.add(files, function (err, files) {
        if (err) {
            console.log(err);
        } else {
            console.log(files)
        }
    })
})
//
  res.end();
  

});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
