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

## Hardhat Network Terminal
```solidity
npx hardhat node
```

## Deploying a Smart Contract to Hardhat Network:
```solidity
npx hardhat run scripts/deploy.js --network localhost

## Outcome: 

* Run Hardhat Network and deploy smart contracts to it.
* Initialise a Hardhat project directory.
* Import Hardhat Network as well as Hardhat Network accounts into MetaMask.
* Connect a MetaMask wallet to a webpage.
* Use Ethers.js to read values from a deployed smart contract.
* Use Ethers.js to modify state of a blockchain.
* Use React to build a frontend that allows users to interact with your deployed smart contract.
