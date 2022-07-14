// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract freeBTC {
    uint256 private seed;

    mapping(address => uint256) public lastBeneficiary;

    event Beneficiaries(address indexed from, uint256 timestamp, string message );

    struct people {
        address _beneficiaries;
        uint256 _timestamp;
        string _message;
    }

    people[] benefitedPeoples;

    constructor() payable {
        //a little code to generate random number but NOT SECURED!!
        seed  = (block.timestamp + block.difficulty ) % 100;
    }
 
    function sendBTC(string memory _messageFromUser) public {
        //Prevent users from spamming and only give opportunities after 15mins!
        require(lastBeneficiary[msg.sender] + 15 minutes < block.timestamp, "Try again after 15Mins!");
        
        lastBeneficiary[msg.sender] = block.timestamp;

        benefitedPeoples.push(people(msg.sender, block.timestamp, _messageFromUser));
        emit Beneficiaries(msg.sender, block.timestamp, _messageFromUser);

        seed  = (seed + block.timestamp + block.difficulty) % 100;
        
        if (seed < 50){
            console.log("%s won!", msg.sender);
            uint prizeAmount = 0.001 ether;
            require(
            prizeAmount <= address(this).balance,
            "The Contract doesn't have enough ETH to give now!"
            );
            (bool success, ) = msg.sender.call{value:prizeAmount}("");
            require(success, "Fail to withdraw ETH from Contract");
            console.log("%s said %s, so we send him/her 0.001ETH!", msg.sender, _messageFromUser);
        }
        
    }

    function getAllBeneficiaries() public view returns (people[] memory){
        return benefitedPeoples;
    }

}
