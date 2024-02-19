pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./SmartWallet.sol";

contract SmartWalletProxy {
    using Clones for address;

    address public implementation;
    mapping(address => address) public userToWallet;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function createWallet() external {
        require(userToWallet[msg.sender] == address(0), "Wallet already exists");
        address clone = implementation.clone();
        SmartWallet(clone).initialize(msg.sender);
        userToWallet[msg.sender] = clone;
    }

    function destroyWallet() external {
        address wallet = userToWallet[msg.sender];
        require(wallet != address(0), "Wallet does not exist");
        userToWallet[msg.sender] = address(0);
        selfdestruct(payable(msg.sender));
    }

    function getWallet() external view returns (address) {
        return userToWallet[msg.sender];
    }
}