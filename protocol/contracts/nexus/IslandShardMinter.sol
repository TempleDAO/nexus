pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (nexus/IslandShardMinter.sol)


import { CommonEventsAndErrors } from "../common/CommonEventsAndErrors.sol";
import { IRelic } from "contracts/interfaces/nexus/IRelic.sol";
import { IShard } from "contracts/interfaces/nexus/IShard.sol";
import { INexusCommon } from "contracts/interfaces/nexus/INexusCommon.sol";
import { IIslandShardMinter } from "contracts/interfaces/nexus/IIslandShardMinter.sol";

contract IslandShardMinter is IIslandShardMinter {

    IRelic public immutable relic;
    IShard public immutable shard;
    INexusCommon public immutable nexusCommon;
    mapping(uint256 relicId => bool minted) public minted;
    
    uint256 private immutable SHARD_MINT_AMOUNT;


    constructor(
        address _relic,
        address _shard,
        address _nexusCommon
    ) { 
        relic = IRelic(_relic);
        shard = IShard(_shard);
        nexusCommon = INexusCommon(_nexusCommon);
        SHARD_MINT_AMOUNT = 1;
    }

    /*
     * @notice Mint SHARD matching with RELIC enclave
     * @param relicId RELLIC ID
     */
    function mint(uint256 relicId) external override {
        if (msg.sender != relic.ownerOf(relicId)) { revert CommonEventsAndErrors.InvalidAccess(); }
        if (minted[relicId] == true) { revert ShardMintedForRelic(relicId); }
        IRelic.RelicInfoView memory relicInfo = relic.getRelicInfo(relicId);
        uint256 reliceEnclaveId = relicInfo.enclaveId;

        minted[relicId] = true;
        uint256[] memory shardIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        // SHARDs map to enclaves which start from 2 - 6
        shardIds[0] = 1 + reliceEnclaveId;
        amounts[0] = SHARD_MINT_AMOUNT;
        shard.mintBatch(msg.sender, shardIds, amounts);

        emit ShardMinted(relicId, msg.sender);
    }
}