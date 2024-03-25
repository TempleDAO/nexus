/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISacrifice,
  ISacrificeInterface,
} from "../../../../../contracts/interfaces/nexus/IBaseSacrifice.sol/ISacrifice";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "originTime",
        type: "uint64",
      },
    ],
    name: "FutureOriginTime",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newTotal",
        type: "uint256",
      },
    ],
    name: "MintCapExceeded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "originTime",
        type: "uint64",
      },
    ],
    name: "OriginTimeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "relicId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "enclaveId",
        type: "uint256",
      },
    ],
    name: "PartnerZeroSacrificed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "RelicMintCapSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAccount",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenSacrificed",
    type: "event",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "enclaveId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "sacrifice",
    outputs: [
      {
        internalType: "uint256",
        name: "relicId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_originTime",
        type: "uint64",
      },
    ],
    name: "setOriginTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISacrifice__factory {
  static readonly abi = _abi;
  static createInterface(): ISacrificeInterface {
    return new utils.Interface(_abi) as ISacrificeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISacrifice {
    return new Contract(address, _abi, signerOrProvider) as ISacrifice;
  }
}
