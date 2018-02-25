var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/JQU3XAFWxEI443K0NZSg"));


var wallet=web3.eth.accounts.wallet.add('0x43665c4c2cef440eea6e0cd41ba85c70e505f16629f14e21baa566d332712a64');
web3.eth.getBalance(wallet.address).then(console.log);

const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "_numberOfHashes",
				"type": "uint256"
			},
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "indexNumber",
				"type": "uint256"
			}
		],
		"name": "getHashes",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "newHash",
				"type": "string"
			}
		],
		"name": "addHash",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var notarization = new web3.eth.Contract(abi, '0xe8B9462a9EF9C0F4C4a04932e3093c54F61B3262');

var getUser = function(username){
  notarization.methods.getUser(username).call({from:wallet.address},function(err,res){
    if(!err)
      return res;
    else
      return "Not able to fetch the user Details for now";
  });
}

var getHashes = function(username,indexNumber){
  notarization.methods.getHashes(username,indexNumber).call({from:wallet.address},(err,res) => {
    if(!err){
      console.log(res);
      return res;
    }
    else
      return "Error Fetching Hash  "+indexNumber+1;
  });
}

function after(receipt){
  console.log(receipt.transactionHash);
  return receipt.transactionHash;
}
var addUser = function(username,pAddress){
  notarization.methods.addUser(username,pAddress).send({
    from:wallet.address,gas:5000000
  }).then(after);
}



var addHash = function(username,newHash){
  var hash;
  notarization.methods.addHash(username,newHash).send({
    from:wallet.address,gas:5000000
  }).then(after);

}

module.exports={
  getUser:getUser,
  getHashes:getHashes,
  addUser:addUser,
  addHash:addHash
}
//var ro=addHash('intenserave','iAmJustDoodlingAndFuckingFrustrated');
//console.log("Hashhhhh "+ro);
