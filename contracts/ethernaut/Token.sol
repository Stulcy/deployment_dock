// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract GoodFriend {
    Token tokenContract;

    constructor(address _address) public {
        tokenContract = Token(_address);
    }

    function callTransfer(address _to, uint _value) external {
        tokenContract.transfer(_to, _value);
    }
}

contract Token {
    mapping(address => uint) balances;
    uint public totalSupply;

    constructor(uint _initialSupply) public {
        balances[msg.sender] = totalSupply = _initialSupply;
    }

    function transfer(address _to, uint _value) public returns (bool) {
        console.log("sender balance:", balances[msg.sender]);
        console.log("value:", _value);
        console.log("outcome:", balances[msg.sender] - _value);
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }
}
