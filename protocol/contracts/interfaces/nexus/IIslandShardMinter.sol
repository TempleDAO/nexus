pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (interfaces/nexus/IIslandShardMinter.sol)


interface IIslandShardMinter {
    event ShardMinted(uint256 relicId, uint256 puzzleId, address indexed owner);

    error ShardMintedForRelic(uint256 relicId);
    error EnclaveMismatch(uint256 shardEnclaveId, uint256 relicEnclaveId);
    error InvalidSignature(address sender, uint256 relicId, uint256 puzzleId);

    function mint(uint256 relicId, uint256 puzzleId, bytes memory signature) external;
    function minted(uint256 relicId, uint256 puzzleId) external returns (bool);
}