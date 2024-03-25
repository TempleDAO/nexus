pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (nexus/IslandShardMinter.sol)


import { CommonEventsAndErrors } from "../common/CommonEventsAndErrors.sol";
import { IRelic } from "contracts/interfaces/nexus/IRelic.sol";
import { IShard } from "contracts/interfaces/nexus/IShard.sol";
import { INexusCommon } from "contracts/interfaces/nexus/INexusCommon.sol";
import { IIslandShardMinter } from "contracts/interfaces/nexus/IIslandShardMinter.sol";
import { IPuzzleMinterVerifier } from "../interfaces/nexus/IPuzzleMinterVerifier.sol";

contract IslandShardMinter is IIslandShardMinter {

    IRelic public immutable relic;
    IShard public immutable shard;
    INexusCommon public immutable nexusCommon;
    IPuzzleMinterVerifier public immutable sigVerifier;

    uint256 private immutable SHARD_MINT_AMOUNT;
    mapping(uint256 relicId => mapping(uint256 puzzleId => bool minted)) public minted;

    constructor(
        address _relic,
        address _shard,
        address _nexusCommon,
        address _sigVerifier
    ) { 
        relic = IRelic(_relic);
        shard = IShard(_shard);
        nexusCommon = INexusCommon(_nexusCommon);
        sigVerifier = IPuzzleMinterVerifier(_sigVerifier);
        SHARD_MINT_AMOUNT = 1;
    }

    function mint(uint256 relicId, uint256 puzzleId, bytes memory signature) external override {
        if (msg.sender != relic.ownerOf(relicId)) { revert CommonEventsAndErrors.InvalidAccess(); }
        if (puzzleId == 0) { revert CommonEventsAndErrors.InvalidParam(); }
        if (minted[relicId][puzzleId] == true) { revert ShardMintedForRelic(relicId); }
        /// @dev using relicId as nonce
        bool verified = sigVerifier.verifyWithParams(msg.sender, puzzleId, relicId, signature);
        if(!verified) { revert IIslandShardMinter.InvalidSignature(msg.sender, relicId, puzzleId); }

        IRelic.RelicInfoView memory relicInfo = relic.getRelicInfo(relicId);
        uint256 relicEnclaveId = relicInfo.enclaveId;

        minted[relicId][puzzleId] = true;
        uint256[] memory shardIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        shardIds[0] = 1 + relicEnclaveId;
        amounts[0] = SHARD_MINT_AMOUNT;

        shard.mintBatch(msg.sender, shardIds, amounts);

        emit ShardMinted(relicId, puzzleId, msg.sender);
    }
}