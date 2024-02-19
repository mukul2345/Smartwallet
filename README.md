## Hardhat
* Hardhat (like most Ethereum libraries and tools) is written in Javascript.
* One feature of Hardhat is that it comes with its own built-in Ethereum network called the Hardhat Network. 
* You can think of this as your private testnet that runs on your local machine. By default, it will mine a block with each transaction that it receives, in order and without any delays. 
* It is backed by the @ethereumjs/vm EVM implementation, the same one used by Ganache and Remix.

## Adding Hardhat to MetaMask Wallet:
* Network name - Hardhat Network
* New RPC URL - http://127.0.0.1:8545/
* Chain ID - 31337
* Currency symbol - ETH
* Block explorer URL (Optional) - leave it empty
<img width="600" alt="Screenshot 2023-02-27 at 12 46 52 AM" src="https://user-images.githubusercontent.com/92979885/221433818-1787ef8e-2dd5-4ef5-8e09-2c8336c31c76.png">

## Hardhat Network Terminal
```solidity
npx hardhat node
```

## Deploying a Smart Contract to Hardhat Network:
```solidity
npx hardhat run scripts/deploy.js --network localhost
```
<img width="600" alt="Screenshot 2023-02-27 at 12 52 16 AM" src="https://user-images.githubusercontent.com/92979885/221433779-65a4b54a-80fc-4a25-b366-573b995d3790.png">
<img width="600" alt="Screenshot 2023-02-27 at 12 49 02 AM" src="https://user-images.githubusercontent.com/92979885/221433927-7cd86eaa-a555-449f-9a68-19cf54c0135e.png">

## Connecting Wallet with React to display Contact Address & Application Binary Interface (ABI):
<img width="600" alt="C59_Q2_Swap-Nova" src="https://user-images.githubusercontent.com/92979885/221434010-8ec0ad69-71f6-4f04-8af6-b6d92728893e.png">

## Get User Quest Status
<img width="600" alt="C59_Q3_Swap-Nova" src="https://user-images.githubusercontent.com/92979885/222038166-6f0ad6be-bae6-4245-8896-800b19d9ab20.png">

## Outcome: 

* Run Hardhat Network and deploy smart contracts to it.
* Initialise a Hardhat project directory.
* Import Hardhat Network as well as Hardhat Network accounts into MetaMask.
* Connect a MetaMask wallet to a webpage.
* Use Ethers.js to read values from a deployed smart contract.
* Use Ethers.js to modify state of a blockchain.
* Use React to build a frontend that allows users to interact with your deployed smart contract.
