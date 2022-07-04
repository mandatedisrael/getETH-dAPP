const { ethers } = require("ethers");

const main = async () => {
    const [owner] = await hre.ethers.getSigners();
    const btcContractFactory = await hre.ethers.getContractFactory("freeBTC");
    const btcContract = await btcContractFactory.deploy();
    await btcContract.deployed();
  
    console.log(`Smart Contract Address: ${btcContract.address} `);
    console.log(`Our sponsor for today giveaway is ${owner.address}, give a shoutout!`);
  
    let [randomPerson, randomPerson2] = await hre.ethers.getSigners();
    let btcTxn = await btcContract.connect(randomPerson).sendBTC("i need this for my final exam");
    await btcTxn.wait();
    let btc2Txn = await btcContract.connect(randomPerson2).sendBTC("I want a real asset for my portfolio!")

    // let [secondPerson] = await hre.ethers.getSigners();
    // secondPersonTxn = await btcContract.connect(secondPerson).sendBTC("I impregnated someone!");
    // await secondPersonTxn.wait();
  
    await btcContract.btcLeft();
    const allBeneficiaries = await btcContract.getAllBeneficiaries();
    allBeneficiaries.forEach(beneficiary => { 
      console.log("Address: ",beneficiary._beneficiaries);
      console.log("Timestamp: ", new Date(beneficiary._timestamp * 1000));
      console.log("Reason: ",beneficiary._message);
      console.log("--------------------------------------------------------------------");
    });

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