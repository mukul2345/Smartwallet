const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SmartWallet contract", function () {
  let smartWallet;
  let owner;
  let Proxycontract;

  beforeEach(async function () {
    // Deploy the SmartWallet contract
    [owner,player1, player2] = await ethers.getSigners();

    const SmartWallet = await ethers.getContractFactory("SmartWallet");
    smartWallet = await SmartWallet.deploy(owner.address);
    await smartWallet.waitForDeployment();

    const contract2 = await hre.ethers.getContractFactory("SmartWalletProxy");
    Proxycontract = await contract2.deploy(owner.address);
    await Proxycontract.waitForDeployment();

  });

  describe("initialize()", function () {
    it("should fail if the wallet is already initialized", async function () {
      await expect(smartWallet.initialize(owner.address)).to.be.revertedWith(
        "Initialized"
      );
    });
  });

  describe("deposit()", function () {
    it("should deposit Ether to the wallet", async function () {
      await smartWallet.deposit({ value: hre.ethers.parseEther("1") });

      expect(await smartWallet.balance()).to.equal(hre.ethers.parseEther("1"));
    });

    it("should allow multiple deposits", async function () {
      await smartWallet.deposit({ value: hre.ethers.parseEther("1") });
      await smartWallet.deposit({ value: hre.ethers.parseEther("2") });

      expect(await smartWallet.balance()).to.equal(hre.ethers.parseEther("3"));
    });
  });


  describe("withdraw()", function () {
    it("should withdraw Ether from the wallet", async function () {
      await smartWallet.deposit({ value: hre.ethers.parseEther("1") });

      await smartWallet.withdraw(hre.ethers.parseEther("1"));

      expect(await smartWallet.balance()).to.equal(0);
      expect(await owner.provider.getBalance(owner.address)).to.closeTo(hre.ethers.parseEther("10000"),hre.ethers.parseEther("10"));
    });

    it("should fail if the wallet has insufficient balance", async function () {
      await expect(smartWallet.withdraw(hre.ethers.parseEther("1"))).to.be.revertedWith(
        "Insufficient balance"
      );
    });
  });


  describe("transfer()", function () {
    it("should transfer Ether to another address", async function () {
      await smartWallet.deposit({ value: hre.ethers.parseEther("10") });
      await smartWallet.transfer(owner.address, hre.ethers.parseEther("1"));

      expect(await smartWallet.balance()).to.equal(hre.ethers.parseEther("9"));
      expect(await owner.provider.getBalance(owner.address)).to.closeTo(hre.ethers.parseEther("10000"),hre.ethers.parseEther("20"));
    });

    it("should fail if the wallet has insufficient balance", async function () {
      await expect(
        smartWallet.transfer(owner.address, hre.ethers.parseEther("1"))
      ).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Proxycontract", function () {
    it("Should deploy and create a wallet", async function () {
      await Proxycontract.createWallet();

      const walletAddress = await Proxycontract.getWallet();
      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

      expect(walletAddress).to.not.equal(ZERO_ADDRESS);

      const walletOwner = await smartWallet.owner();
      expect(walletOwner).to.equal(owner.address);
    });

    it("Should destroy wallet", async function () {
        await Proxycontract.createWallet(); // Create the wallet
        const destroyTx = await Proxycontract.destroyWallet(); // Destroy the wallet
      
        // Wait for the transaction to be mined
        await destroyTx.wait();
      });
      
  });
})
