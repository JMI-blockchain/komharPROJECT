pragma solidity ^0.4.0 ;

contract notarization{
    address owner;
    
    struct userStruct{
        uint256 numberOfHashes;
        address userAddress;
        mapping (uint256 => string) hashes;
    }
    
    mapping (string => userStruct) users;
    
    function notarization() public {
        owner=msg.sender;
    }
    
    modifier OnlyOwner{
        require(msg.sender == owner);
        _;
    }
    
    function addUser(string _username,address _userAddress) public OnlyOwner returns(bool){
        users[_username] = userStruct(0,_userAddress);
        return true;
        
    }
    function getUser(string _username) public  OnlyOwner constant returns(uint256 _numberOfHashes,address _userAddress){
    return(users[_username].numberOfHashes,users[_username].userAddress);
    }
    function getHashes(string _username,uint256 indexNumber) public OnlyOwner constant returns(string){
        return users[_username].hashes[indexNumber];
    }
    function addHash(string _username,string newHash) public returns(bool success){
        users[_username].hashes[users[_username].numberOfHashes] = newHash;
        users[_username].numberOfHashes++;
            return true;
    }
    
    
}