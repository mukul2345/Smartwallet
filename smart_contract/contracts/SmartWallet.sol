pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SmartWallet {
    address public owner;
    uint256 public balance;

    function initialize(address _owner) external {
        require(owner == address(0), "Initialized");
        owner = _owner;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function deposit() external payable {
        balance += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Unauthorized");
        require(balance >= amount, "Insufficient balance");
        payable(owner).transfer(amount);
        balance -= amount; // Deduct the withdrawn amount from the balance
    }


    function transfer(address to, uint256 amount) external {
        require(msg.sender == owner, "Unauthorized");
        require(balance >= amount, "Insufficient balance");
        payable(to).transfer(amount);
        balance -= amount; // Reduce the balance by the transferred amount

    }

    function approve(address spender, uint256 amount) external {
        require(msg.sender == owner, "Unauthorized");
        IERC20(spender).approve(address(this), amount);
    }

    function transferFrom(address from, address to, uint256 amount) external {
        require(msg.sender == owner, "Unauthorized");
        IERC20(from).transferFrom(address(this), to, amount);
        balance -= amount; // Deduct the transferred amount from the balance

    }
}