var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) 
const IPFS = require('ipfs');
// Spawn your IPFS node \o/
const node = new IPFS();
var fs = require('fs');

function ipfsupload(filepath){
	
	node.on('ready', () => {
    node.id((err, id) => {
        if (err) {
            return console.log(err)
        }
        console.log(id)
    })
    
var data = fs.readFileSync(filepath);
console.log("Synchronous read: " + data.toString());

    let files = [
        {
            path: path,
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
return files[0].hash;
}

module.exports.ipfsupload=ipfsupload;
