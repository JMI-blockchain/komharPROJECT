# komharPROJECT
The four sprints are intended to create a complete solution that provides notarization and
document storage service supported by ethereum blockchain and IPFS content storage.
High level Physical Architecture:
The IPFS node and ethereum testnet will reside on infura http://infura.io .
The Web Application will reside AWS EC2 cloud instance.
<br/><br/><b>Functional Requirements:</b>
<br><b>User Registration:</b>
Parameters - Username, Wallet Password (With each registration, the user’s wallet is
created and the key file should be stored on the server file system). On User registration a new
ethereum account should be created and its address should be stored with the user name in the
smart contract created for the same.
<br><b>User Login:</b>
The user should supply the username and wallet password - the flow should verify that
the user key is decrypted using the password supplied by the user. The user’s wallet address
will need to be retrieved from the Smart Contract that holds the username and user wallet
address. The application code will have to loop through all the usernames and match the
requested username to reach the correct user wallet address. Once the wallet address is
retrieved from the contract, the correct key should be selected from the file system and should
be decrypted with the password from the user. If it succeeds user should reach his profile page.
<br><b>User Profile:</b>
User profile should allow him to upload document files and sow his existing uploaded file
hashes. A new file uploaded should be added to IPFS and the file hash should be added into
the smart contract in a mapping against his username. Existing files hashes should be
maintained as a mapping in the contract.
The profile page should list the file hashes as links, when the user clicks on the link, the
file content stored by the user should display (if it’s an image) or download if it cannot be
displayed.
<br><b>Ether funding:</b>
The file add smart contract function call should use gas from the user wallet. The server
already has the user private key so the transaction needs to execute using that private key of
the user.
The user add smart contract function call should use and admin wallet which will be
already created by the interns before any user registers. The wallet’s private key should also be
on the server file system. After the registration, user’s wallet will need to be funded offline so the
user is able to execute file upload without running out of funds, This funding can be done offline
from the admin wallet.
<br><b>Smart Contract:</b>
The basic design of the smart contract has to ensure that it holds a mapping of the users
struct and within a single user struct it should hold a mapping of the user’s file hashes.
__________________________________________________________________________
