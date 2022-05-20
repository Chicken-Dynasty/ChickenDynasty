// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

contract Token is ERC721, Ownable {
    using Counters for Counters.Counter;
    IERC20 public eggTokenAddr;
    uint256 public MINTRATE = 100 * 10 ** 18;
    uint256 public FEEDRATE = 10 * 10 ** 18;
    uint256 public REWARD = 3 * 10 ** 18;
    uint RANDNUMBER = 4;
    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => Chicken) public chickenMap;
    uint256 HUNGER = 86400; //seconds = 1 Day
    uint256 CLAIMABLE = 30; //seconds = 1 Day
    

    struct Chicken {
        string name;
        uint rarity;
        uint256 lastMeal;
        uint256 hunger; //24 hours without food
        uint256 lastClaim;
        uint256 claimModifier;

    }

    constructor(address _eggTokenAddr) ERC721("chickenMap", "CHK") {
        eggTokenAddr = IERC20(_eggTokenAddr);
    }

    function safeMint(string memory name) public {
        eggTokenAddr.transferFrom(msg.sender,address(this),MINTRATE);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        uint rarity = randRarity();
        uint claimModifier = checkClaimMod(rarity);
        chickenMap[tokenId] = Chicken(name,rarity,block.timestamp,HUNGER,block.timestamp,claimModifier);
        _safeMint(msg.sender, tokenId);
    }

    function feed(uint256 tokenId) public {
        require(ownerOf(tokenId) ==  msg.sender);
        eggTokenAddr.transferFrom(msg.sender,address(this),FEEDRATE);
        Chicken storage chicken = chickenMap[tokenId];
        require(chicken.lastMeal + chicken.hunger > block.timestamp);
        chickenMap[tokenId].lastMeal = block.timestamp;
    }

    function claimReward(uint256 tokenId) public {
        require(ownerOf(tokenId) ==  msg.sender);
        Chicken storage chicken = chickenMap[tokenId];
        require(chicken.lastClaim + CLAIMABLE < block.timestamp);
        eggTokenAddr.transfer(msg.sender,REWARD);

        chicken.lastClaim = block.timestamp;
        //WIP

    }

    function randRarity() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,msg.sender))) % RANDNUMBER;
    }

    function checkClaimMod(uint rarity) public view returns(uint) {
        if(rarity == 0) {
            return 300;
        }
        else if (rarity == 1) {
            return 150;
        }
        else if (rarity ==2) {
            return 60;
        }
        else {
            return 30;
        }
    }

}
