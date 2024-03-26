pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (interfaces/nexus/IShardMinterImplementation.sol)


interface IShardMinterImplementation {
    event ShardMinted(address indexed msgSender, uint256 relicId);
    error ShardMintedForRelic(uint256 relicId);

    function initialize(address _relic, address _shard, uint256 _shardId, string memory _name) external;
    function mint(uint256 relicId) external;
}