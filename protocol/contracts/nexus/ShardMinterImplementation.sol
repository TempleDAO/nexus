pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (nexus/ShardMinterImplementation.sol)


import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { CommonEventsAndErrors } from "../common/CommonEventsAndErrors.sol";
import { IRelic } from "contracts/interfaces/nexus/IRelic.sol";
import { IShard } from "contracts/interfaces/nexus/IShard.sol";
import { IShardMinterImplementation } from "contracts/interfaces/nexus/IShardMinterImplementation.sol";

contract ShardMinterImplementation is IShardMinterImplementation, Initializable {

    IRelic public relic;
    IShard public shard;

    uint256 public shardId;
    uint256 public constant SHARD_MINT_AMOUNT = 1;

    string public name;

    mapping(uint256 relicId => bool minted) public minted;

    function initialize(address _relic, address _shard, uint256 _shardId, string memory _name) initializer external override {
        relic = IRelic(_relic);
        shard = IShard(_shard);
        shardId = _shardId;
        name = _name;
    }

    function mint(uint256 relicId) external override {
        if (msg.sender != relic.ownerOf(relicId)) { revert CommonEventsAndErrors.InvalidAccess(); }
        if (minted[relicId] == true) { revert ShardMintedForRelic(relicId); }

        minted[relicId] = true;
        uint256[] memory shardIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        shardIds[0] = shardId;
        amounts[0] = SHARD_MINT_AMOUNT;

        shard.mintBatch(msg.sender, shardIds, amounts);

        emit ShardMinted(msg.sender, relicId);
    }
}
