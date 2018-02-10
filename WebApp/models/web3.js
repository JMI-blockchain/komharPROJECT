//wallet creation and encrypting wallet using password
//still in progress

var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/d0FjnUKmW0TQrK9cci9m"));

var wallet = web3.eth.accounts.wallet.create(1, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
//console.log(wallet);

//console.log('*********************************************************');

var arr = web3.eth.accounts.wallet.encrypt('password');

//keyfile of the generated wallet
var publicKey = '0x'+arr[0].address;
var encPrivateKey = arr[0].crypto.ciphertext;

var keyFile = {'publicKey':publicKey,'encPrivateKey':encPrivateKey};

//console.log('0x'+arr[0].address);
//console.log(keyFile);

module.exports = publicKey;
module.exports = encPrivateKey;
//console.log('*********************************************************');

//console.log(web3.version);


