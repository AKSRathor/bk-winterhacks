// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Upload is ERC721URIStorage, VRFConsumerBase {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    uint256 public tokens;

    // Chainlink VRF variables
    bytes32 internal keyHash;
    uint256 internal fee;
    mapping(bytes32 => uint256) internal requestIdToTokenId;

    constructor(address _vrfCoordinator, address _link, bytes32 _keyHash, uint256 _fee)
        ERC721("NFTMarketplace", "NFTM")
        VRFConsumerBase(_vrfCoordinator, _link)
    {
        keyHash = _keyHash;
        fee = _fee;
    }

    struct certificate {
        uint256 tokenId;
        address owner;
        address organization;
        address employee;
        address[] accesslist;
        bool active;
        int ethUsdPrice;
        uint256 randomNumber; 
    }

    mapping(uint256 => certificate) public items;
    mapping(address => uint256[]) public certiList;
    mapping(address => mapping(uint256 => bool)) public ownership;

    function additem(
        string memory tokenURI,
        address _reciever,
        address _org,
        address _user
    ) public returns (uint256) {
        tokens += 1;
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(_user, tokenId);
        _setTokenURI(tokenId, tokenURI);

        address[] memory arr;

        // Request a random number from Chainlink VRF
        bytes32 requestId = getRandomNumber(tokenId);
        requestIdToTokenId[requestId] = tokenId;

        int ethUsdPrice = getEthUsdPrice();

        items[tokenId] = certificate(
            tokenId,
            _reciever,
            _org,
            _user,
            arr,
            true,
            ethUsdPrice,
            0
        );

        items[tokenId].accesslist.push(_reciever);
        items[tokenId].accesslist.push(_org);
        items[tokenId].accesslist.push(_user);
        certiList[_reciever].push(tokenId);
        certiList[_org].push(tokenId);
        certiList[_user].push(tokenId);
        ownership[_reciever][tokenId] = true;
        ownership[_org][tokenId] = true;
        ownership[_user][tokenId] = true;
        return tokenId;
    }


    function getRandomNumber(uint256 tokenId) internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK tokens");
        requestId = requestRandomness(keyHash, fee);
        requestIdToTokenId[requestId] = tokenId;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 tokenId = requestIdToTokenId[requestId];
    items[tokenId].randomNumber = randomness;


}

function getRandomNumberForTokenId(uint256 tokenId) external view returns (uint256) {
    require(_exists(tokenId), "Token does not exist");
    return items[tokenId].randomNumber;
}



    function giveAccess(uint tokenId, address adder) public {
        items[tokenId].accesslist.push(adder);
        certiList[adder].push(tokenId);
        ownership[adder][tokenId] = true;
    }

    function cancelAccess(uint tokenId, address remove) public {
        ownership[remove][tokenId] = false;
    }

    function revokeCerti(uint tokenId) public {
        items[tokenId].active = false;
    }

    function getallCerti(address _user) public view returns (certificate[] memory) {
        uint count;
        for (uint i = 0; i < certiList[_user].length; i++) {
            uint tokenId = certiList[_user][i];

            if (ownership[_user][tokenId]) {
                count += 1;
            }
        }

        certificate[] memory myCertis = new certificate[](count);

        uint ind;
        for (uint i = 0; i < certiList[_user].length; i++) {
            uint tokenId = certiList[_user][i];

            if (ownership[_user][tokenId]) {
                certificate storage currentItem = items[tokenId];
                if (currentItem.active) {
                    myCertis[ind] = currentItem;
                    ind += 1;
                }
            }
        }

        return myCertis;
    }

    function viewCerti(uint tokenId) public view returns (certificate[] memory) {
        certificate[] memory allcer = new certificate[](1);
        certificate storage currentItem = items[tokenId];
        allcer[0] = currentItem;
        return allcer;
    }


    function getEthUsdPrice() public view returns (int) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return price;
    }
}
