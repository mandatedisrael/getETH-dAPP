// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract freeETH {
    uint256 private seed;

    mapping(address => uint256) public lastBeneficiary;

    event Beneficiaries(address indexed from, uint256 timestamp, string message );
    event WinOrLoss(string userStatus);

    struct people {
        address _beneficiaries;
        uint256 _timestamp;
        string _message;
    }

    people[] benefitedPeoples;

    constructor() payable {
        //a little code to generate randomness but NOT SECURED!!
        //seed  = (block.timestamp + block.difficulty ) % 100;
        console.log("Deploying.....");
    }
 
    function sendETH(string memory _messageFromUser) public {
        //Prevent users from spamming and only give opportunities after 15mins!
        if (lastBeneficiary[msg.sender] + 15 minutes < block.timestamp){
            lastBeneficiary[msg.sender] = block.timestamp;
            emit WinOrLoss("You just won a free 0.001ETH!");
            uint prizeAmount = 0.1 ether;

            if (prizeAmount <= address(this).balance){
                (bool success, ) = msg.sender.call{value:prizeAmount}("");
                require(success, "Fail to withdraw ETH from Contract");
                console.log("%s said %s, so we send him/her 0.001ETH!", msg.sender, _messageFromUser);
                benefitedPeoples.push(people(msg.sender, block.timestamp, _messageFromUser));
                emit Beneficiaries(msg.sender, block.timestamp, _messageFromUser);
            }else{
                emit WinOrLoss("The Contract doesn't have enough ETH to give now, Try again later!");
            }
        }else{
            emit WinOrLoss("Try again after 15mins!");
        }
    }
    
    
    function getAllBeneficiaries() public view returns(people[] memory){
        return benefitedPeoples;
    }

}