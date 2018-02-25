var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/JQU3XAFWxEI443K0NZSg"));

web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);

var createWallet = function (username,password){
  var wallet = web3.eth.accounts.wallet.create(1,web3.utils.randomHex(32)); //it's an array object
  wallet.defaultKeyName = username;
  var pAddress = wallet[0].address; //first account address
  var pKey = wallet.encrypt(password); //Array: The encrypted keystore v3.
  var rObject ={
    pAddress:pAddress,
    pKey:pKey
  };
  //console.log(rObject);
  return rObject;

}

var decryptWallet = function(eWallet,password){
  var wallet = web3.eth.accounts.wallet.decrypt(eWallet,password);
  return wallet; //returns whole wallet object

}

module.exports={
  createWallet:createWallet,
  decryptWallet:decryptWallet
}
