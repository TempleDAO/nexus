/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  NexusCommon,
  NexusCommonInterface,
} from "../../../contracts/nexus/NexusCommon";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialExecutor",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [],
    name: "acceptExecutor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
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
    stateMutability: "view",
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
    inputs: [],
    name: "shard",
    outputs: [
      {
        internalType: "contract IShard",
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
        name: "",
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
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161161338038061161383398101604081905261002f9161007d565b806001600160a01b0381166100575760405163e6c4247b60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055506100ad565b60006020828403121561008f57600080fd5b81516001600160a01b03811681146100a657600080fd5b9392505050565b611557806100bc6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063bcf56f521161008c578063d9a349c111610066578063d9a349c114610219578063daeccc791461022c578063dc2554f21461025a578063ec74dd371461027a57600080fd5b8063bcf56f52146101d3578063bfccf0ec146101e6578063c34c08e5146101f957600080fd5b806389f707ad116100c857806389f707ad14610145578063996373c3146101585780639bf11b341461019d578063a2fa9c53146101b057600080fd5b806309b6cc1b146100ef5780631c74a8871461010d5780631f2114051461013b575b600080fd5b6100f761028d565b6040516101049190610e87565b60405180910390f35b61012d61011b366004610ecb565b60056020526000908152604090205481565b604051908152602001610104565b61014361029e565b005b610143610153366004610ee4565b61036c565b6003546101789073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610104565b6101436101ab366004610f2f565b6105ba565b6101c36101be366004610ecb565b6106da565b6040519015158152602001610104565b6101436101e1366004610fc8565b6106ed565b6101436101f4366004611085565b610828565b6000546101789073ffffffffffffffffffffffffffffffffffffffff1681565b610143610227366004610f2f565b610a2f565b6101c361023a36600461113b565b600160209081526000928352604080842090915290825290205460ff1681565b61026d610268366004610ecb565b610b73565b60405161010491906111d2565b6100f7610288366004610ecb565b610c0d565b60606102996006610c23565b905090565b60025473ffffffffffffffffffffffffffffffffffffffff1633146102ef576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054604051339273ffffffffffffffffffffffffffffffffffffffff909216917fe963dc9c0d2165b080440a5d2665566142f2426b1ea15f3da8390b0fd336b06491a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000009081163317909155600280549091169055565b61039a336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c37565b6103d0576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160000361040a576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526008602052604090208054610423906111e5565b905060000361045e576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6003546040517f7756c0030000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690637756c00390602401602060405180830381865afa1580156104cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f19190611249565b610527576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081815260056020908152604080832054808452600490925290912061054e9083610cb9565b5060008381526004602052604090206105679083610cc5565b50600082815260056020526040908190208490555182907f60c7cac1511bf29c5603f3dedcc3494567cdaaa640eee8a0be9205691a644721906105ad9086815260200190565b60405180910390a2505050565b6105e8336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c37565b61061e576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff811661066b576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517f65cad0856e7b82552f9442578b694821473deebbedcbf2fe5cc3f45a75c3854d90600090a250565b60006106e7600683610cd1565b92915050565b61071b336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c37565b610751576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160000361078b576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80516000036107c6576040517fd252903400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526008602052604090206107de82826112b1565b506107ea600683610cc5565b507fb3ccf20a18c1d055ca0d4b8cdbe8c0b0d9b82ce0ccea5d5c3b7a9759c8593238828260405161081c9291906113cb565b60405180910390a15050565b610856336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c37565b61088c576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff83166108d9576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040805180820190915260008082526020820152819060005b82811015610a275784848281811061090c5761090c6113ec565b905060400201803603810190610922919061141b565b91508160200151151582600001517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168773ffffffffffffffffffffffffffffffffffffffff167ff5736e75de2c751f775d4c5ed517289f77074f8c337f451ba4c0c3ed1dd7f9ad60405160405180910390a460208281015173ffffffffffffffffffffffffffffffffffffffff8816600090815260018352604080822086517fffffffff000000000000000000000000000000000000000000000000000000001683529093529190912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055610a20816114a7565b90506108f2565b505050505050565b610a5d336000357fffffffff0000000000000000000000000000000000000000000000000000000016610c37565b610a93576040517fc0185c6400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8116610ae0576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002546000805460405173ffffffffffffffffffffffffffffffffffffffff808616948116939216917f4857570a90fe0a0fc580e89a287e77576141ac8e2e8b3710cd26db44f44156c191a4600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60086020526000908152604090208054610b8c906111e5565b80601f0160208091040260200160405190810160405280929190818152602001828054610bb8906111e5565b8015610c055780601f10610bda57610100808354040283529160200191610c05565b820191906000526020600020905b815481529060010190602001808311610be857829003601f168201915b505050505081565b60008181526004602052604090206060906106e7905b60606000610c3083610ce9565b9392505050565b6000805473ffffffffffffffffffffffffffffffffffffffff84811691161480610c30575073ffffffffffffffffffffffffffffffffffffffff831660009081526001602090815260408083207fffffffff000000000000000000000000000000000000000000000000000000008616845290915290205460ff169392505050565b6000610c308383610d45565b6000610c308383610e38565b60008181526001830160205260408120541515610c30565b606081600001805480602002602001604051908101604052809291908181526020018280548015610d3957602002820191906000526020600020905b815481526020019060010190808311610d25575b50505050509050919050565b60008181526001830160205260408120548015610e2e576000610d696001836114df565b8554909150600090610d7d906001906114df565b9050818114610de2576000866000018281548110610d9d57610d9d6113ec565b9060005260206000200154905080876000018481548110610dc057610dc06113ec565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610df357610df36114f2565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506106e7565b60009150506106e7565b6000818152600183016020526040812054610e7f575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556106e7565b5060006106e7565b6020808252825182820181905260009190848201906040850190845b81811015610ebf57835183529284019291840191600101610ea3565b50909695505050505050565b600060208284031215610edd57600080fd5b5035919050565b60008060408385031215610ef757600080fd5b50508035926020909101359150565b803573ffffffffffffffffffffffffffffffffffffffff81168114610f2a57600080fd5b919050565b600060208284031215610f4157600080fd5b610c3082610f06565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610fc057610fc0610f4a565b604052919050565b60008060408385031215610fdb57600080fd5b8235915060208084013567ffffffffffffffff80821115610ffb57600080fd5b818601915086601f83011261100f57600080fd5b81358181111561102157611021610f4a565b611051847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610f79565b9150808252878482850101111561106757600080fd5b80848401858401376000848284010152508093505050509250929050565b60008060006040848603121561109a57600080fd5b6110a384610f06565b9250602084013567ffffffffffffffff808211156110c057600080fd5b818601915086601f8301126110d457600080fd5b8135818111156110e357600080fd5b8760208260061b85010111156110f857600080fd5b6020830194508093505050509250925092565b80357fffffffff0000000000000000000000000000000000000000000000000000000081168114610f2a57600080fd5b6000806040838503121561114e57600080fd5b61115783610f06565b91506111656020840161110b565b90509250929050565b6000815180845260005b8181101561119457602081850181015186830182015201611178565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b602081526000610c30602083018461116e565b600181811c908216806111f957607f821691505b602082108103611232577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b801515811461124657600080fd5b50565b60006020828403121561125b57600080fd5b8151610c3081611238565b601f8211156112ac57600081815260208120601f850160051c8101602086101561128d5750805b601f850160051c820191505b81811015610a2757828155600101611299565b505050565b815167ffffffffffffffff8111156112cb576112cb610f4a565b6112df816112d984546111e5565b84611266565b602080601f83116001811461133257600084156112fc5750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610a27565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561137f57888601518255948401946001909101908401611360565b50858210156113bb57878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006113e4604083018461116e565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006040828403121561142d57600080fd5b6040516040810181811067ffffffffffffffff8211171561145057611450610f4a565b60405261145c8361110b565b8152602083013561146c81611238565b60208201529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036114d8576114d8611478565b5060010190565b818103818111156106e7576106e7611478565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212201a00a5bfbca9a83af792118e1434909a410e91f43e918603e09ad1a72dc61f5364736f6c63430008130033";

type NexusCommonConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NexusCommonConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NexusCommon__factory extends ContractFactory {
  constructor(...args: NexusCommonConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _initialExecutor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NexusCommon> {
    return super.deploy(
      _initialExecutor,
      overrides || {}
    ) as Promise<NexusCommon>;
  }
  override getDeployTransaction(
    _initialExecutor: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_initialExecutor, overrides || {});
  }
  override attach(address: string): NexusCommon {
    return super.attach(address) as NexusCommon;
  }
  override connect(signer: Signer): NexusCommon__factory {
    return super.connect(signer) as NexusCommon__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NexusCommonInterface {
    return new utils.Interface(_abi) as NexusCommonInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NexusCommon {
    return new Contract(address, _abi, signerOrProvider) as NexusCommon;
  }
}
