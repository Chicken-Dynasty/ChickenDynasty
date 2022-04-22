// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Token is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    struct Chicken{
        string name;
        uint256 lastMeal;
        uint256 hunger; //24 hours without food
        uint8 rarity;
    }

    mapping( uint256 => Chicken) private _tokenDetails;
    
    constructor() ERC721("Chicken", "CHK") {}

    function safeMint(string memory name,uint256 hunger, uint8 rarity) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _tokenDetails[tokenId] = Chicken(name,block.timestamp,hunger,rarity);
        _safeMint(msg.sender, tokenId);

    }

    function feed(uint256 tokenId) public {
        Chicken storage chicken = _tokenDetails[tokenId];
        require(chicken.lastMeal + chicken.hunger > block.timestamp);
        _tokenDetails[tokenId].lastMeal = block.timestamp;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        Chicken storage chicken = _tokenDetails[tokenId];
        require(chicken.lastMeal + chicken.hunger > block.timestamp);

    }

}