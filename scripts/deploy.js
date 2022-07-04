const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    const btcContractFactory = await hre.ethers.getContractFactory("freeBTC");
    const btcContract = await btcContractFactory.deploy({
      value:hre.ethers.utils.parseEther("0.2"),
    });
    await btcContract.deployed();
    let contractBalance  = await hre.ethers.provider.getBalance(btcContract.address);
    console.log(`Smart Contract Address: ${btcContract.address}  with a balance of ${hre.ethers.utils.formatEther(contractBalance)}ETH`);
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