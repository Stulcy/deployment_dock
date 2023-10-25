// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Deal {
    IERC20 public token0;
    IERC20 public token1;
    address public user0;
    address public user1;
    uint256 public amount0;
    uint256 public amount1;
    bool public completed;

    constructor(
        address _user0,
        address _user1,
        address _token0,
        address _token1,
        uint256 _amount0,
        uint256 _amount1
    ) {
        user0 = _user0;
        user1 = _user1;
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
        amount0 = _amount0;
        amount1 = _amount1;
    }

    modifier isCompleted() {
        require(!completed, "Deal is completed.");
        _;
    }

    function didUserAllow(address _userAddress) public view returns (bool) {
        if (user0 == _userAddress) {
            return token0.allowance(user0, address(this)) >= amount0;
        }
        return token1.allowance(user1, address(this)) >= amount1;
    }

    function execute() external isCompleted {
        require(didUserAllow(user0), "Insufficient allowance user0.");
        require(didUserAllow(user1), "Insufficient allowance user1.");
        _executeSwap(user0, user1, amount0, token0);
        _executeSwap(user1, user0, amount1, token1);
        completed = true;
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
