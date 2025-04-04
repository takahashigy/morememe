// contracts/MemeToken.sol
// 标准 Meme Token 模板，每个通过工厂部署的代币将基于此合约

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeToken is ERC20, Ownable {
    string public memeAudioURI;
    address public factory;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory audioURI_,
        address owner_
    ) ERC20(name_, symbol_) {
        _mint(owner_, 1_000_000_000 * 1e18);
        memeAudioURI = audioURI_;
        factory = msg.sender;
        _transferOwnership(owner_);
    }
}
