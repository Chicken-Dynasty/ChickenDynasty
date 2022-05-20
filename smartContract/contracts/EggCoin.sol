// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC20/ERC20.sol";

contract Egg is ERC20 {
    constructor() ERC20("Egg", "EGG") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
