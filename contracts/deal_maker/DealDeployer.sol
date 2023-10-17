// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "./Deal.sol";
import "hardhat/console.sol";

contract DealDeployer {
    address[] public deals;
    mapping(address => uint256) userDealsAmount;

    event DealDeployed(address dealAddress);

    function initiateDeal(
        address _partner,
        address _token0,
        address _token1,
        uint256 _amount0,
        uint256 _amount1
    ) external returns (address) {
        address deal = address(
            new Deal(msg.sender, _partner, _token0, _token1, _amount0, _amount1)
        );
        deals.push(deal);
        userDealsAmount[msg.sender] += 1;
        userDealsAmount[_partner] += 1;
        emit DealDeployed(deal);
        return deal;
    }

    function getDeals(
        address _partner
    ) external view returns (address[] memory) {
        address[] memory partnerDeals = new address[](
            userDealsAmount[_partner]
        );
        uint counter;
        for (uint256 i; i < deals.length; i++) {
            Deal deal = Deal(deals[i]);
            if (
                (deal.user0() == _partner || deal.user1() == _partner) &&
                !deal.completed()
            ) {
                partnerDeals[counter] = address(deal);
                counter++;
            }
        }
        return partnerDeals;
    }
}
