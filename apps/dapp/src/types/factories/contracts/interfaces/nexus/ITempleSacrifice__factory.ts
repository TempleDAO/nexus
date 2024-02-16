/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITempleSacrifice,
  ITempleSacrificeInterface,
} from "../../../../contracts/interfaces/nexus/ITempleSacrifice";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "setSacrificedTokenRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ITempleSacrifice__factory {
  static readonly abi = _abi;
  static createInterface(): ITempleSacrificeInterface {
    return new utils.Interface(_abi) as ITempleSacrificeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITempleSacrifice {
    return new Contract(address, _abi, signerOrProvider) as ITempleSacrifice;
  }
}