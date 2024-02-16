/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IElevatedAccess,
  IElevatedAccessInterface,
} from "../../../../../contracts/interfaces/nexus/access/IElevatedAccess";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes4",
        name: "fnSelector",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "ExplicitAccessSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldExecutor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newExecutor",
        type: "address",
      },
    ],
    name: "NewExecutorAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldExecutor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldProposedExecutor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newProposedExecutor",
        type: "address",
      },
    ],
    name: "NewExecutorProposed",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptExecutor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "executor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddr",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "functionSelector",
        type: "bytes4",
      },
    ],
    name: "explicitFunctionAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "proposeNewExecutor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "allowedCaller",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes4",
            name: "fnSelector",
            type: "bytes4",
          },
          {
            internalType: "bool",
            name: "allowed",
            type: "bool",
          },
        ],
        internalType: "struct IElevatedAccess.ExplicitAccess[]",
        name: "access",
        type: "tuple[]",
      },
    ],
    name: "setExplicitAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IElevatedAccess__factory {
  static readonly abi = _abi;
  static createInterface(): IElevatedAccessInterface {
    return new utils.Interface(_abi) as IElevatedAccessInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IElevatedAccess {
    return new Contract(address, _abi, signerOrProvider) as IElevatedAccess;
  }
}