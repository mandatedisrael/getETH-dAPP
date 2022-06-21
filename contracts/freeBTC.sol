// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract freeBTC {
    uint256 BTC = 1000;

    constructor() {
        console.log("Free BTC is up for grabs, A lucky winner will have 300BTC!!!");
    }

    function sendBTC() public {
        BTC -= 300;
        console.log("300BTC has been sent to %s which is the winner for today!", msg.sender);
    }

    function btcLeft() public view returns (uint256) {

        console.log("We still have %d BTC left! Invite your friends! ", BTC);
        return BTC;
    }
}