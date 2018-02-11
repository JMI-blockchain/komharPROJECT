//wallet creation when a new user registers
//not fully functional yet!

var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://infuranet.infura.io/70y4rT35vggBsEImygNs"));

var accounts=//hash of ethereum account. i am not sure of it right now. so leaving it blank

var address=// address of contract. get it at run time

var contract_abi=web3.eth.contract()//abi will be pasted here. check it from infura

var contract_start= contract_abi.at(address) 

web3.eth.defaultAccount= accounts;

var user_address=// user ipfs hash
$("#register").click(function() {
            notarization.addUser($("#name").val(), user_address);	// this function will be called when user
        });												// register with their user name and address hash assigned to them by ipfs

var username= $("#name").val()	//storing username of current user... not so sure whether it will work
		
var doc_hash=//uploaded document hash

$("#upload").click(function() {
            notarization.addHashes(username, doc_hash);	// this function will be called when user
        });				// upload a new document

		
$("#gethashs").click(function() {
		notarization.getHashes(username,indexnumber)(function(error, result){
            if(!error)
                {
                    $("#display").html(result[0]);		//displaying all hashes 
                    console.log(result);
                }
            else
                console.error(error);
        });	
}		

$("#getuser").click(function() {
		notarization.getUser(username)(function(error, result){
            if(!error)
                {
                     $("#instructor").html('address: '+result[1]+'\n'+'number of hashes: '+result[0]); 		//getting user address and number of hashes
                    console.log(result);										// will run on clicking getuser button 
                }
            else
                console.error(error);
        });	
}	
		
		
//console.log(wallet);

//console.log('*********************************************************');

//console.log(arr);
//keyfile of the generated wallet
//var publicKey = '0x'+arr[0].address;
//var encPrivateKey = arr[0].crypto.ciphertext;

//var keyFile = {'publicKey':publicKey,'encPrivateKey':encPrivateKey};

//console.log('0x'+arr[0].address);
//console.log(keyFile);

//module.exports = publicKey;
module.exports = function(password){
	var wallet = web3.eth.accounts.wallet.create(1, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
	var arr = web3.eth.accounts.wallet.encrypt(password);
	var key = arr[0].crypto.ciphertext;
	return key;
}

//console.log('*********************************************************');

//console.log(web3.version);