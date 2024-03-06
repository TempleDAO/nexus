pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (tests/forge/nexus/PuzzleMinterVerifier.t.sol)


import { NexusTestBase } from "./Nexus.t.sol";
import { PuzzleMinterVerifier } from "./../../../contracts/nexus/PuzzleMinterVerifier.sol";
import { CommonEventsAndErrors } from "../../../contracts/common/CommonEventsAndErrors.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { console } from "./../../../lib/forge-std/src/console.sol";


contract PuzzleMinterVerifierBaseTest is NexusTestBase {
    PuzzleMinterVerifier public verifier;

    address public signer;
    address public user;
    uint256 internal signerPrivateKey;
    uint96 public puzzleId = 1;

    string public constant _NAME = "PUZZLE_MINTER_VERIFIER";
    string public constant _SYMBOL = "PMV";


    function setUp() public {
        (signer, signerPrivateKey) = makeAddrAndKey("mike");
        user = makeAddr("john");
        verifier = new PuzzleMinterVerifier(signer, _NAME, _SYMBOL);
    }
    
    function test_verify() public {
        uint256 nonce = 255;

        vm.startPrank(signer);
        bytes32 digest = verifier.getHashDigest(user, puzzleId, nonce);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v); // v is last byte
        vm.stopPrank();

        bytes32 fakeDigest = verifier.getHashDigest(signer, 2, nonce);
        assertEq(verifier.verify(digest, signature), true);
        assertEq(verifier.verify(fakeDigest, signature), false);
        assertEq(verifier.verifyWithParams(user, puzzleId, nonce, signature), true);
        assertEq(verifier.verifyWithParams(user, puzzleId, 20, signature), false);
    }
}


