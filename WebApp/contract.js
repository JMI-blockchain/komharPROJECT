var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/JQU3XAFWxEI443K0NZSg"));

web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);

//var adminAccount =web3.eth.accounts.privateKeyToAccount('43665c4c2cef440eea6e0cd41ba85c70e505f16629f14e21baa566d332712a64');
/*var acc= {
    address: "0x433434AD9a5E8E448d991E4908f90a1626c495D2",
    privateKey: "43665c4c2cef440eea6e0cd41ba85c70e505f16629f14e21baa566d332712a64",
    signTransaction: function(tx){},
    sign: function(data){},
    encrypt: function(password){}};
*///
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
  notarization.getUser(username)
}
