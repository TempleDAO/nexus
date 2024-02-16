/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  INexusCommon,
  INexusCommonInterface,
} from "../../../../contracts/interfaces/nexus/INexusCommon";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "EnclaveNameSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "enclaveId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "shardId",
        type: "uint256",
      },
    ],
    name: "ShardEnclaveSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "shard",
        type: "address",
      },
    ],
    name: "ShardSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "enclaveId",
        type: "uint256",
      },
    ],
    name: "enclaveNames",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllEnclaveIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
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
    ],
    name: "getEnclaveShards",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
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
    ],
    name: "isValidEnclaveId",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setEnclaveName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_shard",
        type: "address",
      },
    ],
    name: "setShard",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "shardId",
        type: "uint256",
      },
    ],
    name: "setShardEnclave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shardId",
        type: "uint256",
      },
    ],
    name: "shardToEnclave",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class INexusCommon__factory {
  static readonly abi = _abi;
  static createInterface(): INexusCommonInterface {
    return new utils.Interface(_abi) as INexusCommonInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): INexusCommon {
    return new Contract(address, _abi, signerOrProvider) as INexusCommon;
  }
}