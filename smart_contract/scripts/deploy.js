const hre = require("hardhat");

async function main() {
  const [admin, player1, player2] = await hre.ethers.getSigners();

  let Your_Address = "0x0D443D97158A60411B72f87A5708d5895B443BcF";
  await player1.sendTransaction({
    to: Your_Address,
    value: hre.ethers.parseEther("1000"),
  });

  const contract = await hre.ethers.getContractFactory("SmartWallet");
  const deployedContract = await contract.deploy(admin.address);
  await deployedContract.waitForDeployment();
  console.log(`Smartcontract deployed to ${deployedContract.target}`);


  const contract2 = await hre.ethers.getContractFactory("SmartWalletProxy");
  const Proxycontract = await contract2.deploy(admin.address);
  await Proxycontract.waitForDeployment();
  console.log(
    `Proxycontract deployed to ${Proxycontract.target}`
  );

  console.log("getBalance before deposit:", await hre.ethers.provider.getBalance(deployedContract.target));

  await deployedContract.deposit({value: hre.ethers.parseEther("500")});
  console.log("getBalance after deposit:", await hre.ethers.provider.getBalance(deployedContract.target));

  // Test withdraw function
  await deployedContract.withdraw(250);
  console.log("getBalance after withdraw:", await hre.ethers.provider.getBalance(deployedContract.target));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Smartcontract deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Proxycontract deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512