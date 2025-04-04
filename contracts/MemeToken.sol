// contracts/MemeFactory.sol
// 工厂合约，用于统一发币流程、存储发射记录、控制交易对、播种机制等

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MemeToken.sol";

contract MemeFactory {
    address[] public allTokens;
    mapping(address => address[]) public userToTokens;

    event MemeTokenCreated(address tokenAddress, address creator);

    function createMemeToken(
        string calldata name,
        string calldata symbol,
        string calldata audioURI
    ) external returns (address) {
        MemeToken token = new MemeToken(name, symbol, audioURI, msg.sender);
        allTokens.push(address(token));
        userToTokens[msg.sender].push(address(token));
        emit MemeTokenCreated(address(token), msg.sender);
        return address(token);
    }

    function getTokensByUser(address user) external view returns (address[] memory) {
        return userToTokens[user];
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
