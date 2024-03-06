pragma solidity 0.8.19;
// SPDX-License-Identifier: AGPL-3.0-or-later
// Temple (interfaces/nexus/IPuzzleMinterVerifier.sol)


interface IPuzzleMinterVerifier {
    /// @notice Verify if signature is signed by signer
    function verify(bytes32 digest, bytes memory signature) external view returns (bool);

    /// @notice Verify if signature is signed by signer. Function creates digest from parameters
    function verifyWithParams(
        address player,
        uint256 puzzleId,
        uint256 nonce,
        bytes memory signature)
     external view returns (bool);

    /// @notice Get digest using typed data
    function getHashDigest(address player, uint256 puzzleId, uint256 nonce) external view returns (bytes32);
}