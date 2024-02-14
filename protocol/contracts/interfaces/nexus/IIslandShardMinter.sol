pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (interfaces/nexus/IIslandShardMinter.sol)


interface IIslandShardMinter {
    event ShardMinted(uint256 relicId, address indexed owner);

    error ShardMintedForRelic(uint256 relicId);
    error EnclaveMismatch(uint256 shardEnclaveId, uint256 relicEnclaveId);

    function mint(uint256 relicId) external;
    function minted(uint256 relicId) external returns (bool);
}