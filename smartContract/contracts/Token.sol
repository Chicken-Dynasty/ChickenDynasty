// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

contract Token is ERC721,ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    IERC20 public eggTokenAddr;
    uint RANDNUMBER = 4;
    uint256 public MINTRATE = 100 * 10 ** 18;
    uint256 public WHEATCOST = 1 * 10 ** 18;
    uint256 public REWARD = 3 * 10 ** 18;
    Counters.Counter private _tokenIdCounter;


    mapping (uint256 => Chicken) public chickenMap;
    mapping (address => uint256) public wheatInventory;

    struct Chicken {
        string name;
        uint rarity;
        uint256 lastClaim;
        uint256 claimModifier;
        uint256 chickenId;

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
        chickenMap[tokenId] = Chicken(name,rarity,block.timestamp,claimModifier,tokenId);
        _safeMint(msg.sender, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function buyWheat(uint256 amount) public {
        eggTokenAddr.transferFrom(msg.sender,address(this),amount*WHEATCOST);
        wheatInventory[msg.sender] += amount;
    }

    function claimReward(uint256 tokenId) public {
        require(ownerOf(tokenId) ==  msg.sender);
        Chicken storage chicken = chickenMap[tokenId];
        require(chicken.lastClaim + chicken.claimModifier < block.timestamp);
        require(wheatInventory[msg.sender] > 0 );
        wheatInventory[msg.sender] -= 1;
        eggTokenAddr.transfer(msg.sender,REWARD);

        chicken.lastClaim = block.timestamp;

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
