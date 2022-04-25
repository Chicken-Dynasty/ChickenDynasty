// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

contract Token is ERC721, Ownable {
    using Counters for Counters.Counter;
    IERC20 public eggTokenAddr;
    uint256 public mintRate = 100 * 10 ** 18;
    uint256 public feedRate = 10 * 10 ** 18;

    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => Chicken) public chickenMap;
    uint256 HUNGER = 86400; //seconds = 1 Day

    struct Chicken {
        string name;
        uint256 lastMeal;
        uint256 hunger; //24 hours without food
        uint8 rarity;
    }

    constructor(address _eggTokenAddr) ERC721("chickenMap", "CHK") {
        eggTokenAddr = IERC20(_eggTokenAddr);
    }

    function safeMint(string memory name, uint8 rarity) public {
        eggTokenAddr.transferFrom(msg.sender,address(this),mintRate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        chickenMap[tokenId] = Chicken(name,block.timestamp,HUNGER,rarity);
        _safeMint(msg.sender, tokenId);
    }

    function feed(uint256 tokenId) public {
        require(ownerOf(tokenId) ==  msg.sender);
        eggTokenAddr.transferFrom(msg.sender,address(this),feedRate);
        Chicken storage chicken = chickenMap[tokenId];
        require(chicken.lastMeal + chicken.hunger > block.timestamp);
        chickenMap[tokenId].lastMeal = block.timestamp;
    }


}