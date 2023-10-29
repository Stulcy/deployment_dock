// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Return42Deployer {
    constructor(address magicNumAddress) {
        // Bytecode that returns 42
        bytes memory bytecode = hex"69602a60005260206000f3600052600a6016f3";
        address return42Address;
        assembly {
            // 0 -> 0 ETH sent to the contract
            // bytecode + 0x20 -> from pointer to bytecode skip 32 bytes
            // 0x13 -> bytecode has 19 bytes
            return42Address := create(0, add(bytecode, 0x20), 0x13)
        }
        MagicNum(magicNumAddress).setSolver(return42Address);
    }
}

contract MagicNum {
    address public solver;

    constructor() {}

    function setSolver(address _solver) public {
        solver = _solver;
    }

    /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}
