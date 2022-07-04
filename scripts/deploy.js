const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const btcContractFactory = await hre.ethers.getContractFactory("freeBTC");
    const btcContract = await btcContractFactory.deploy();
    await btcContract.deployed();
  
    console.log("freeBTC address: ", btcContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

runMain();