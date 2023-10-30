// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TaxHavenToken is ERC20 {
    ERC20 public token;

    constructor(
        string memory _name,
        string memory _symbol,
        ERC20 _token
    ) ERC20(_name, _symbol) {
        token = _token;
    }

    // Transfers real tokens to the contract,
    function mint(uint256 _amount) external {
        require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Not enough allowance"
        );
        assert(token.transferFrom(msg.sender, address(this), _amount));
        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Not enough balance");
        assert(token.transfer(msg.sender, _amount));
        _burn(msg.sender, _amount);
    }
}
