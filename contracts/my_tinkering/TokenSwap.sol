// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    IERC20 token0;
    IERC20 token1;
    address user0;
    address user1;

    // 2 users decide to trade 2 specific tokens for defined amounts
    constructor(
        address _user0,
        address _token0,
        address _user1,
        address _token1
    ) {
        user0 = _user0;
        user1 = _user1;
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function swap(uint _amount0, uint _amount1) public {
        require(msg.sender == user0 || msg.sender == user1, "No permission.");
        require(_amount0 != 0 && _amount1 != 0, "Can not be zero.");
        require(
            token0.allowance(user0, address(this)) >= _amount0,
            "Allowance for token0 not given."
        );
        require(
            token1.allowance(user1, address(this)) >= _amount1,
            "Allowance for token1 not given."
        );
        _executeSwap(user0, user1, _amount0, token0);
        _executeSwap(user1, user0, _amount1, token1);
    }

    function _executeSwap(
        address _from,
        address _to,
        uint _amount,
        IERC20 _token
    ) private {
        bool res = _token.transferFrom(_from, _to, _amount);
        require(res, "Transfer failed.");
    }
}
