const { ethers } = require("ethers");
const { ContractType } = require("hardhat/internal/hardhat-network/stack-traces/model");

const main = async () => {
    //get owner address
    const [owner, person1, person2] = await hre.ethers.getSigners();
    const btcContractFactory = await hre.ethers.getContractFactory("freeBTC");
    //initialize the contract with 0.2ETH
    const btcContract = await btcContractFactory.deploy({
      value:hre.ethers.utils.parseEther("0.2"),
    });
    await btcContract.deployed();
    let contractBalance  = await hre.ethers.provider.getBalance(btcContract.address);
    console.log(`Smart Contract Address: ${btcContract.address}  with a balance of ${hre.ethers.utils.formatEther(contractBalance)}ETH`);
    
    //formatEther converts wei to eth
    console.log(`ETH available in the SC: ${hre.ethers.utils.formatEther(contractBalance)}`);
    let person1Txn = await btcContract.sendBTC("I need money for fuck sake!");
    await person1Txn.wait();

    let person2Txn = await btcContract.sendBTC("Wanna feed my kitties!");
    await person2Txn.wait();

    //A for each loop to print out events for each participants
    // let totalBeneficiaries = await btcContract.getAllBeneficiaries();
    // totalBeneficiaries.forEach((value, index) => {
    //   console.log("Address: ",totalBeneficiaries[index]._beneficiaries);
    //   console.log("Reason: ",totalBeneficiaries[index]._message);
    //   console.log(`Time: ${totalBeneficiaries[index]._timestamp.toString()}`);
    // })
    console.log(`Remaining ETH in the Smart Contract: ${await hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(btcContract.address))}`);

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