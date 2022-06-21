const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const btcContractFactory = await hre.ethers.getContractFactory("freeBTC");
    const btcContract = await btcContractFactory.deploy();
    await btcContract.deployed();
  
    console.log(`1000BTC is now available at ${btcContract.address} `);
    console.log(`Our sponsor for today giveaway is ${owner.address}, give a shoutout!`);
  
    let btcTxn = await btcContract.connect(randomPerson).sendBTC();
    await btcTxn.wait();
  
    await btcContract.btcLeft();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();