// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract freeBTC {
    uint256 BTC = 10000000 ether;

    event Beneficiaries(address indexed from, uint256 timestamp, string message );

    struct people {
        address _beneficiaries;
        uint256 _timestamp;
        string _message;
    }

    people[] benefitedPeoples;

    constructor() {
        console.log("Free BTC is up for grabs, A lucky winner will have 300BTC!!!");
    }
 
    function sendBTC(string memory _messageFromUser) public {
        benefitedPeoples.push(people(msg.sender, block.timestamp, _messageFromUser));
        emit Beneficiaries(msg.sender, block.timestamp, _messageFromUser);
        console.log("%s said %s, so we send him/her 300btc!", msg.sender, _messageFromUser);
        console.log();
    }

    function getAllBeneficiaries() public view returns (people[] memory){
        return benefitedPeoples;
    }

    function btcLeft() public view returns (uint256) {
        console.log("We still have %d BTC left! Invite your friends! ", BTC);
        return BTC;
    }
}
