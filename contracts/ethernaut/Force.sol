// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract ForceFiller {
    address public force;

    constructor(address _force) payable {
        force = _force;
    }

    function fillForce() public {
        selfdestruct(payable(force));
    }
}
