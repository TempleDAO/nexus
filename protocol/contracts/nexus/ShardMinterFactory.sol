pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (nexus/ShardMinterFactory.sol)


import { CommonEventsAndErrors } from "../common/CommonEventsAndErrors.sol";
import { IRelic } from "contracts/interfaces/nexus/IRelic.sol";
import { IShard } from "contracts/interfaces/nexus/IShard.sol";
import { INexusCommon } from "contracts/interfaces/nexus/INexusCommon.sol";
import { IIslandShardMinter } from "contracts/interfaces/nexus/IIslandShardMinter.sol";
import { EnumerableSet } from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import { IPuzzleMinterVerifier } from "../interfaces/nexus/IPuzzleMinterVerifier.sol";
import { ElevatedAccess } from "./access/ElevatedAccess.sol";
import { IShardMinterImplementation } from "contracts/interfaces/nexus/IShardMinterImplementation.sol";
import { IShardMinterFactory } from "contracts/interfaces/nexus/IShardMinterFactory.sol";

contract ShardMinterFactory is IShardMinterFactory, ElevatedAccess {
    using EnumerableSet for EnumerableSet.UintSet;

    /// @notice Shard minter contract implementation
    address public implementation;
    /// @notice Relic contract
    address public immutable relic;
    /// @notice Shard contract
    address public immutable shard;

    /// @notice Keep track of deployed shard minter to mintable ShardId
    mapping(address shardMinter => uint256 shardId ) public minterToShardId;
    /// @notice Reverse mapping
    mapping(uint256 shardId => address shardMinter) public shardToMinter;
    /// @notice Set of shard Ids already taken
    EnumerableSet.UintSet private deployedMinterShardIds;

    event ImplementationSet(address implementation);
    event ShardMinterCreated(address indexed shardMinter, uint256 shardId);

    error InvalidShard();

    constructor(
        address  _executor,
        address _implementation,
        address _relic,
        address _shard
    ) ElevatedAccess(_executor) {
        implementation = _implementation;
        relic = _relic;
        shard = _shard;
        /// @notice Update for default enclave shards 2 - 6
        for (uint shardId = 2; shardId < 7; shardId++) {
            deployedMinterShardIds.add(shardId);
        }
    }

    function setImplementation(address _implementation) external override onlyElevatedAccess {
        if (_implementation == address(0)) { revert CommonEventsAndErrors.InvalidAddress(); }
        implementation = _implementation;
        emit ImplementationSet(_implementation);
    }

    function deploy(
        address initialExecutor,
        uint256 shardId,
        string memory name
    ) external override onlyElevatedAccess returns (address) {
        if (initialExecutor == address(0)) { revert CommonEventsAndErrors.InvalidAddress(); }
        if (shardId == 0) { revert CommonEventsAndErrors.ExpectedNonZero(); }
        /// @dev Shard cannot be associated with already deployed minter
        if (deployedMinterShardIds.contains(shardId)) { revert InvalidShard(); }

        /// deploy
        address deployedAddress = Clones.clone(implementation);

        emit ShardMinterCreated(deployedAddress, shardId);
        minterToShardId[deployedAddress] = shardId; 
        shardToMinter[shardId] = deployedAddress;
        deployedMinterShardIds.add(shardId);

        /// initialize contract
        IShardMinterImplementation(deployedAddress).initialize(relic, shard, shardId, name);

        return deployedAddress;   
    }

    function isMinterDeployedForShardId(uint256 shardId) external view returns (bool) {
        return deployedMinterShardIds.contains(shardId);
    }

    function getDeployedMinterShardId(address minter) external view returns (uint256) {
        return minterToShardId[minter];
    }
}