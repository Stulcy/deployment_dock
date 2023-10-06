// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0;

contract Smth {
    uint countSmth = 0;

    function setCount(uint _count) public {
        countSmth = _count;
    }

    function getCount() public view returns (uint) {
        return countSmth;
    }
}
