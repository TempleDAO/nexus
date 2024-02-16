/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PartnerZeroSacrifice,
  PartnerZeroSacrificeInterface,
} from "../../../contracts/nexus/PartnerZeroSacrifice";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_relic",
        type: "address",
      },
      {
        internalType: "address",
        name: "_executor",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    inputs: [],
    name: "InvalidAccess",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidParam",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "",
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
    stateMutability: "view",
    type: "function",
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
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "mintCap",
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
    inputs: [],
    name: "originTime",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "relic",
    outputs: [
      {
        internalType: "contract IRelic",
        name: "",
        type: "address",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "setMintCap",
    outputs: [],
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
  {
    inputs: [],
    name: "totalMinted",
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
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610fb1380380610fb183398101604081905261002f9161009c565b806001600160a01b0381166100575760405163e6c4247b60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392831617905591909116608052506100cf565b80516001600160a01b038116811461009757600080fd5b919050565b600080604083850312156100af57600080fd5b6100b883610080565b91506100c660208401610080565b90509250929050565b608051610ec06100f16000396000818161018a01526105b50152610ec06000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c8063a2309ff81161008c578063c34c08e511610066578063c34c08e5146101e4578063d3e01b6414610204578063d9a349c114610217578063daeccc791461022a57600080fd5b8063a2309ff81461017c578063a4590bd014610185578063bfccf0ec146101d157600080fd5b806369d88b48116100bd57806369d88b481461014b57806376c71ca11461016c57806398d5fdca1461017557600080fd5b80631f211405146100e457806330581790146100ee5780634070a0c914610138575b600080fd5b6100ec610268565b005b60025461011a9074010000000000000000000000000000000000000000900467ffffffffffffffff1681565b60405167ffffffffffffffff90911681526020015b60405180910390f35b6100ec610146366004610ba5565b610336565b61015e610159366004610be7565b6103d6565b60405190815260200161012f565b61015e60035481565b600061015e565b61015e60045481565b6101ac7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161012f565b6100ec6101df366004610c13565b6106a9565b6000546101ac9073ffffffffffffffffffffffffffffffffffffffff1681565b6100ec610212366004610c99565b6108b0565b6100ec610225366004610cca565b6109dc565b610258610238366004610d15565b600160209081526000928352604080842090915290825290205460ff1681565b604051901515815260200161012f565b60025473ffffffffffffffffffffffffffffffffffffffff1633146102b9576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054604051339273ffffffffffffffffffffffffffffffffffffffff909216917fe963dc9c0d2165b080440a5d2665566142f2426b1ea15f3da8390b0fd336b06491a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163317909155600280549091169055565b610364336000357fffffffff0000000000000000000000000000000000000000000000000000000016610b20565b61039a576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60038190556040518181527f84ae69f46147b2201fc857459f4cd6857eb32f01efc6e677bcd2aa78cd015980906020015b60405180910390a150565b6000610406336000357fffffffff0000000000000000000000000000000000000000000000000000000016610b20565b61043c576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60025474010000000000000000000000000000000000000000900467ffffffffffffffff164210156104c6576002546040517fab7d9deb0000000000000000000000000000000000000000000000000000000081527401000000000000000000000000000000000000000090910467ffffffffffffffff1660048201526024015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216610513576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060045460016105249190610d6e565b90506000600354118015610539575060035481115b15610573576040517fa240f47d000000000000000000000000000000000000000000000000000000008152600481018290526024016104bd565b60048181556040517f40aa3c5100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016916340aa3c519161060b91879189910173ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b6020604051808303816000875af115801561062a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064e9190610d81565b604080518281526020810187905291935073ffffffffffffffffffffffffffffffffffffffff8516917f53fc574245f3492c719eb51c66e1e990bab0d2543f12b52916aa531f43fa85e4910160405180910390a25092915050565b6106d7336000357fffffffff0000000000000000000000000000000000000000000000000000000016610b20565b61070d576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831661075a576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040805180820190915260008082526020820152819060005b828110156108a85784848281811061078d5761078d610d9a565b9050604002018036038101906107a39190610dc9565b91508160200151151582600001517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168773ffffffffffffffffffffffffffffffffffffffff167ff5736e75de2c751f775d4c5ed517289f77074f8c337f451ba4c0c3ed1dd7f9ad60405160405180910390a460208281015173ffffffffffffffffffffffffffffffffffffffff8816600090815260018352604080822086517fffffffff000000000000000000000000000000000000000000000000000000001683529093529190912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169115159190911790556108a181610e52565b9050610773565b505050505050565b6108de336000357fffffffff0000000000000000000000000000000000000000000000000000000016610b20565b610914576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b428167ffffffffffffffff161015610958576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600280547fffffffff0000000000000000ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000067ffffffffffffffff8481168202929092179283905560405192041681527f9878ffb89fd2301f6b06499f920d133ee48fba4aae757d800542034116d0faf0906020016103cb565b610a0a336000357fffffffff0000000000000000000000000000000000000000000000000000000016610b20565b610a40576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8116610a8d576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002546000805460405173ffffffffffffffffffffffffffffffffffffffff808616948116939216917f4857570a90fe0a0fc580e89a287e77576141ac8e2e8b3710cd26db44f44156c191a4600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000805473ffffffffffffffffffffffffffffffffffffffff84811691161480610b9c575073ffffffffffffffffffffffffffffffffffffffff831660009081526001602090815260408083207fffffffff000000000000000000000000000000000000000000000000000000008616845290915290205460ff165b90505b92915050565b600060208284031215610bb757600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610be257600080fd5b919050565b60008060408385031215610bfa57600080fd5b82359150610c0a60208401610bbe565b90509250929050565b600080600060408486031215610c2857600080fd5b610c3184610bbe565b9250602084013567ffffffffffffffff80821115610c4e57600080fd5b818601915086601f830112610c6257600080fd5b813581811115610c7157600080fd5b8760208260061b8501011115610c8657600080fd5b6020830194508093505050509250925092565b600060208284031215610cab57600080fd5b813567ffffffffffffffff81168114610cc357600080fd5b9392505050565b600060208284031215610cdc57600080fd5b610b9c82610bbe565b80357fffffffff0000000000000000000000000000000000000000000000000000000081168114610be257600080fd5b60008060408385031215610d2857600080fd5b610d3183610bbe565b9150610c0a60208401610ce5565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610b9f57610b9f610d3f565b600060208284031215610d9357600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060408284031215610ddb57600080fd5b6040516040810181811067ffffffffffffffff82111715610e25577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604052610e3183610ce5565b815260208301358015158114610e4657600080fd5b60208201529392505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610e8357610e83610d3f565b506001019056fea2646970667358221220054ed21aec77cef0c7b0a9cae8f535183226a7ce0973d8bbac95d3e5df7bad8c64736f6c63430008130033";

type PartnerZeroSacrificeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PartnerZeroSacrificeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PartnerZeroSacrifice__factory extends ContractFactory {
  constructor(...args: PartnerZeroSacrificeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _relic: PromiseOrValue<string>,
    _executor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PartnerZeroSacrifice> {
    return super.deploy(
      _relic,
      _executor,
      overrides || {}
    ) as Promise<PartnerZeroSacrifice>;
  }
  override getDeployTransaction(
    _relic: PromiseOrValue<string>,
    _executor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_relic, _executor, overrides || {});
  }
  override attach(address: string): PartnerZeroSacrifice {
    return super.attach(address) as PartnerZeroSacrifice;
  }
  override connect(signer: Signer): PartnerZeroSacrifice__factory {
    return super.connect(signer) as PartnerZeroSacrifice__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PartnerZeroSacrificeInterface {
    return new utils.Interface(_abi) as PartnerZeroSacrificeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PartnerZeroSacrifice {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PartnerZeroSacrifice;
  }
}