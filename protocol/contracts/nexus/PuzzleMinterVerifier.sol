pragma solidity 0.8.20;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (nexus/PuzzleMinterVerifier.sol)


import { CommonEventsAndErrors } from "../common/CommonEventsAndErrors.sol";
import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { IPuzzleMinterVerifier } from "../interfaces/nexus/IPuzzleMinterVerifier.sol";
import { ElevatedAccess } from "./access/ElevatedAccess.sol";

/// @title Contract verifies signatures signed by set signer
contract PuzzleMinterVerifier is IPuzzleMinterVerifier, ElevatedAccess, EIP712 {

    address public signer;

    event SignerSet(address signer);

    constructor(
        address _signer,
        address _executor,
        string memory _name,
        string memory _version
    ) EIP712(_name, _version) ElevatedAccess(_executor){
        signer = _signer;
    }

    function setSigner(address _signer) external override onlyElevatedAccess {
        if (_signer == address(0)) { revert CommonEventsAndErrors.InvalidAddress(); }
        signer = _signer;
        emit SignerSet(_signer);
    }

    /// @notice Verify if signature is signed by signer
    function verify(bytes32 digest, bytes memory signature) external override view returns (bool) {
        address _signer = ECDSA.recover(digest, signature);
        return _signer == signer;
    }

    /// @notice Verify if signature is signed by signer. Function creates digest from parameters
    function verifyWithParams(
        address player,
        uint256 puzzleId,
        uint256 nonce,
        bytes memory signature)
     external override view returns (bool) {
        if (player == address(0) || puzzleId == 0 || nonce == 0) { revert CommonEventsAndErrors.InvalidParam(); }
        bytes32 digest = getHashDigest(player, puzzleId, nonce);
        return signer == ECDSA.recover(digest, signature);
    }

    /// @notice Get digest using typed data
    function getHashDigest(address player, uint256 puzzleId, uint256 nonce) public view override returns (bytes32) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
          keccak256("Mint(address player,uint256 puzzleId,uint256 nonce)"),
          player,
          puzzleId,
          nonce
        )));
        return digest;
    }
}