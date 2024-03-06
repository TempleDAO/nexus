pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (tests/forge/nexus/IslandShardMinter.t.sol)


import { NexusTestBase } from "./Nexus.t.sol";
import { PuzzleMinterVerifier } from "contracts/nexus/PuzzleMinterVerifier.sol";
import { Relic } from "contracts/nexus/Relic.sol";
import { Shard } from "contracts/nexus/Shard.sol";
import { NexusCommon } from "contracts/nexus/NexusCommon.sol";
import { CommonEventsAndErrors } from "contracts/common/CommonEventsAndErrors.sol";
import { IslandShardMinter } from "contracts/nexus/IslandShardMinter.sol";
import { IIslandShardMinter } from "contracts/interfaces/nexus/IIslandShardMinter.sol";


contract IslandShardMinterTest is NexusTestBase {
    Relic public relic;
    Shard public shard;
    NexusCommon public nexusCommon;
    PuzzleMinterVerifier public verifier;
    IslandShardMinter public minter;

    address public signer;
    address public user;
    uint256 internal signerPrivateKey;
    uint256 internal userPrivateKey;
    uint256 internal constant PUZZLE_1_ID = 1;
    uint256 internal constant PUZZLE_2_ID = 2;

    string public constant _NAME = "PUZZLE_MINTER_VERIFIER";
    string public constant _SYMBOL = "PMV";

    event ShardMinted(uint256 relicId, uint256 puzzleId, address indexed sender);

    function setUp() public {
        (signer, signerPrivateKey) = makeAddrAndKey("mike");
        (user, userPrivateKey) = makeAddrAndKey("john");
        verifier = new PuzzleMinterVerifier(signer, _NAME, _SYMBOL);
        nexusCommon = new NexusCommon(executor);
        relic = new Relic(NAME, SYMBOL, address(nexusCommon), executor);
        shard = new Shard(address(relic), address(nexusCommon), executor, "http://example.com");
        minter = new IslandShardMinter(address(relic), address(shard), address(nexusCommon), address(verifier));
        
        vm.startPrank(executor);
        //  nexuscommon setup
        {
            nexusCommon.setEnclaveName(MYSTERY_ID, MYSTERY);
            nexusCommon.setEnclaveName(CHAOS_ID, CHAOS);
            nexusCommon.setEnclaveName(LOGIC_ID, LOGIC);
            nexusCommon.setEnclaveName(STRUCTURE_ID, STRUCTURE);
            nexusCommon.setEnclaveName(ORDER_ID, ORDER);
        }
        // relic setup
        {
            _enableAllEnclavesForMinter(relic, operator);
            relic.setShard(address(shard));
            vm.startPrank(operator);
            relic.mintRelic(bob, LOGIC_ID);
            relic.mintRelic(bob, MYSTERY_ID);
        }
        // shard setup
        {
            vm.startPrank(executor);
            address[] memory minters = new address[](4);
            minters[0] = minters[1] = minters[2] = minters[3] = address(minter);
            shard.setNewMinterShards(minters);
            uint256[] memory shardIds = new uint256[](1);
            bool[] memory allow = new bool[](1);
            shardIds[0] = SHARD_1_ID;
            allow[0] = true;
            shard.setMinterAllowedShardIds(bob, shardIds, allow);
            shard.setShardUri(SHARD_1_ID, SHARD_1_URI);
            shard.setShardUri(SHARD_2_ID, SHARD_2_URI);
            shard.setShardUri(SHARD_3_ID, SHARD_3_URI);
            shard.setShardUri(SHARD_4_ID, SHARD_4_URI);

            vm.startPrank(address(minter));
            shardIds = new uint256[](2);
            uint256[] memory amounts = new uint256[](2);
            shardIds[0] = SHARD_1_ID;
            shardIds[1] = SHARD_2_ID;
            amounts[0] = 5;
            amounts[1] = 10;
            shard.mintBatch(bob, shardIds, amounts);
        }
        vm.stopPrank();
    }

    function test_initialization() public {
        assertEq(address(minter.relic()), address(relic));
        assertEq(address(minter.shard()), address(shard));
        assertEq(address(minter.nexusCommon()), address(nexusCommon));
        assertEq(address(minter.sigVerifier()), address(verifier));
    }

    function test_island_shard_mint() public {
        /// test reverts
        vm.expectRevert(abi.encodeWithSelector(CommonEventsAndErrors.InvalidAccess.selector));
        minter.mint(RELIC_1_ID, PUZZLE_1_ID, new bytes(0));
        vm.startPrank(bob);
        vm.expectRevert(abi.encodeWithSelector(CommonEventsAndErrors.InvalidParam.selector));
        minter.mint(RELIC_1_ID, 0, new bytes(0));
        vm.expectRevert("ECDSA: invalid signature length");
        minter.mint(RELIC_1_ID, 1, new bytes(0));

        vm.startPrank(user);
        bytes32 digest = verifier.getHashDigest(bob, 99, 99);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(userPrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v); // v is last byte
        vm.startPrank(bob);
        vm.expectRevert(abi.encodeWithSelector(IIslandShardMinter.InvalidSignature.selector, bob, RELIC_1_ID, PUZZLE_1_ID));
        minter.mint(RELIC_1_ID, 1, signature);
        
       
        vm.startPrank(signer);
        digest = verifier.getHashDigest(bob, PUZZLE_1_ID, RELIC_1_ID);
        (v, r, s) = vm.sign(signerPrivateKey, digest);
        signature = abi.encodePacked(r, s, v); // v is last byte
        
        vm.startPrank(bob);
        vm.expectEmit(address(minter));
        emit ShardMinted(RELIC_1_ID, PUZZLE_1_ID, bob);
        minter.mint(RELIC_1_ID, 1, signature);

        /// expect fail minting again
        vm.expectRevert(abi.encodeWithSelector(IIslandShardMinter.ShardMintedForRelic.selector, RELIC_1_ID));
        minter.mint(RELIC_1_ID, 1, signature);

        /// signing fake hash
        digest = verifier.getHashDigest(bob, PUZZLE_2_ID, RELIC_1_ID);
        (v, r, s) = vm.sign(userPrivateKey, digest);
        signature = abi.encodePacked(r, s, v); // v is last byte
        vm.expectRevert(abi.encodeWithSelector(IIslandShardMinter.InvalidSignature.selector, bob, RELIC_1_ID, PUZZLE_2_ID));
        minter.mint(RELIC_1_ID, PUZZLE_2_ID, signature);

        vm.startPrank(signer);
        digest = verifier.getHashDigest(bob, PUZZLE_2_ID, RELIC_1_ID);
        (v, r, s) = vm.sign(signerPrivateKey, digest);
        signature = abi.encodePacked(r, s, v); // v is last byte

        /// mint for puzzle 2
        vm.startPrank(bob);
        vm.expectEmit(address(minter));
        emit ShardMinted(RELIC_1_ID, PUZZLE_2_ID, bob);
        minter.mint(RELIC_1_ID, PUZZLE_2_ID, signature);
    }

}