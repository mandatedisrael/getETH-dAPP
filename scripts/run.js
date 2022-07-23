const { ethers } = require("ethers");
const { ContractType } = require("hardhat/internal/hardhat-network/stack-traces/model");

const main = async () => {
    //get owner address
    const [owner, person1, person2] = await hre.ethers.getSigners();
    const ETHContractFactory = await hre.ethers.getContractFactory("freeETH");
    //initialize the contract with 0.2ETH
    const ETHContract = await ETHContractFactory.deploy({
      value:hre.ethers.utils.parseEther("0.5"),
    });
    await ETHContract.deployed();
    let contractBalance  = await hre.ethers.provider.getBalance(ETHContract.address);
    console.log(`Smart Contract Address: ${ETHContract.address}  with a balance of ${hre.ethers.utils.formatEther(contractBalance)}ETH`);
    
    //formatEther converts wei to eth
    console.log(`ETH available in the SC: ${hre.ethers.utils.formatEther(contractBalance)}`);
    console.log("Alchemy should get the contract out soon, Dont forget to update your ABI!");

    //CLI testing...
    // let person1Txn = await ETHContract.sendETH("I need money for fuck sake!");
    // await person1Txn.wait();

    // let person2Txn = await ETHContract.sendETH("Wanna feed my kitties!");
    // await person2Txn.wait();

    //A for each loop to print out events for each participants
    // let totalBeneficiaries = await ETHContract.getAllBeneficiaries();
    // totalBeneficiaries.forEach((value, index) => {
    //   console.log("Address: ",totalBeneficiaries[index]._beneficiaries);
    //   console.log("Reason: ",totalBeneficiaries[index]._message);
    //   console.log(`Time: ${totalBeneficiaries[index]._timestamp.toString()}`);
    // })
    console.log(`Remaining ETH in the Smart Contract: ${await hre.ethers.utils.formatEther(await hre.ethers.provider.getBalance(ETHContract.address))}`);

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