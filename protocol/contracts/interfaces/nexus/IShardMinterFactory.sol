pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (interfaces/nexus/IShardMinterFactory.sol)


interface IShardMinterFactory {

    function setImplementation(address _implementation) external;
    function deploy(address initialExecutor, uint256 shardId, string memory name) external returns (address);
    function isMinterDeployedForShardId(uint256 shardId) external view returns (bool);

    function getDeployedMinterShardId(address minter) external view returns (uint256);
}