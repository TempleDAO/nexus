import { ethers, network } from 'hardhat';
import {
  BaseContract,
  BigNumber,
  Contract,
  ContractFactory,
  ContractTransaction,
  Signer,
} from 'ethers';
import { IElevatedAccess } from '../../typechain';
import * as fs from 'fs';
import * as path from 'path';

export interface DeployedContracts {
  TEMPLE: string,

  // NEXUS
  RELIC: string;
  SHARD: string;
  TEMPLE_SACRIFICE: string;
  NEXUS_COMMON: string;
  PARTNER_ZERO_SACRIFICE: string;
  ISLAND_SHARD_MINTER: string;
  PUZZLE_MINTER_VERIFIER: string;
  SHARD_MINTER_IMPLEMENTATION: string;
  SHARD_MINTER_FACTORY: string;
  SHARD_MINTER_PATH_OF_TEMPLAR: string;
  SHARD_MINTER_ORIGAMI: string;
}

export const DEPLOYED_CONTRACTS: { [key: string]: DeployedContracts } = {
  localhost: {

    // Active contracts
    TEMPLE: process.env.TEMPLE || '',
    // NEXUS
    RELIC: '',
    SHARD: '',
    TEMPLE_SACRIFICE: '',
    NEXUS_COMMON: '',
    PARTNER_ZERO_SACRIFICE: '',
    ISLAND_SHARD_MINTER: '',
    PUZZLE_MINTER_VERIFIER: '',
    SHARD_MINTER_IMPLEMENTATION: '',
    SHARD_MINTER_FACTORY: '',
    SHARD_MINTER_PATH_OF_TEMPLAR: '',
    SHARD_MINTER_ORIGAMI: ''
  },
  arbitrumSepolia: {
    // Active contracts
    TEMPLE: '0x0090F9655a0B0A32cEE0Da5ae45E93EAB4C6d149',

    // NEXUS
    RELIC: '0xcbc7cf85dd0AB91Aa2671400E86ebf3AaC6dc658',
    SHARD: '0x192aA9BfDcA5540406E211950C226C8E0cd5047F',
    TEMPLE_SACRIFICE: '0x1b274A49fF8Ec84f874B989EcF23840952D7E600',
    NEXUS_COMMON: '0x98c5E61b1B3731A1f379E8770861164d23118cdc',
    PARTNER_ZERO_SACRIFICE: '0x2ae6318e34bb97ae3755AFcE75559452aA223A5D',
    ISLAND_SHARD_MINTER: '0x187272156be91Fc4A0f4AFcBc0B8A615DF6ba22A',
    PUZZLE_MINTER_VERIFIER: '0x5b523eECfbB13bd68B6F81Edc62fdD061a922aec',
    SHARD_MINTER_IMPLEMENTATION: '0x1EAa33d7fa36ed89E8160F203bd7e7499A38f5EF',
    SHARD_MINTER_FACTORY: '0x97f0145db280d16bdcfaDbb586Cfbd3DA42dBF31',
    SHARD_MINTER_PATH_OF_TEMPLAR: '0x377Fe2181a06894C7513EF6327BDDddCc08D848A',
    SHARD_MINTER_ORIGAMI: '0x6DF00255eeb295fAF064fd4160C00efcC3e50C4c'
  }
};

/**
 * Current block timestamp
 */
export const blockTimestamp = async () => {
  return (
    await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
  ).timestamp;
};

/** number to attos (what all our contracts expect) */
export function toAtto(n: number): BigNumber {
  return ethers.utils.parseEther(n.toString());
}

/** number from attos (ie, human readable) */
export function fromAtto(n: BigNumber): number {
  return Number.parseFloat(ethers.utils.formatUnits(n, 18));
}

export async function mine(tx: Promise<ContractTransaction>) {
  console.log(`Mining transaction: ${(await tx).hash}`);
  await (await tx).wait();
}

// BigNumber json serialization override, dump as string
Object.defineProperties(BigNumber.prototype, {
  toJSON: {
    value: function (this: BigNumber) {
      return this.toString();
    },
  },
});

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Typesafe helper that works on contract factories to create, deploy, wait till deploy completes
 * and output useful commands to setup etherscan with contract code
 */
export async function deployAndMine<
  T extends BaseContract,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D extends (...args: any[]) => Promise<T>
>(
  name: string,
  factory: ContractFactory,
  deploy: D,
  ...args: Parameters<D>
): Promise<T> {
  if (factory.deploy !== deploy) {
    throw new Error("Contract factory and deploy method don't match");
  }

  // Ensure none of the args are empty
  args.forEach((a, i) => {
    if (!a.toString()) throw new Error(`Empty arg in position ${i}`);
  });

  const renderedArgs = JSON.stringify(args, null, 2);

  console.log(
    `*******Deploying ${name} on ${network.name} with args ${renderedArgs}`
  );
  const contract = (await factory.deploy(...args)) as T;
  console.log(
    `Deployed... waiting for transaction to mine: ${contract.deployTransaction.hash}`
  );
  console.log();
  await contract.deployed();
  console.log('Contract deployed');
  console.log(`${name}=${contract.address}`);
  console.log(`export ${name}=${contract.address}`);

  const argsPath = `scripts/deploys/${network.name}/deploymentArgs/${contract.address}.js`;
  const verifyCommand = `yarn hardhat verify --network ${network.name} ${contract.address} --constructor-args ${argsPath}`;
  ensureDirectoryExistence(argsPath);
  let contents = `// ${network.name}: ${name}=${contract.address}`;
  contents += `\n// ${verifyCommand}`;
  contents += `\nmodule.exports = ${renderedArgs};`;
  fs.writeFileSync(argsPath, contents);

  console.log(verifyCommand);
  console.log('********************\n');

  return contract;
}

/**
 * Check if process.env.MAINNET_ADDRESS_PRIVATE_KEY (required when doing deploy)
 */
export function expectAddressWithPrivateKey() {
  if (network.name == 'arbitrumSepolia' && !process.env.ARBITRUM_SEPOLIA_ADDRESS_PRIVATE_KEY) {
    throw new Error("Missing environment variable ARBITRUM_SEPOLIA_ADDRESS_PRIVATE_KEY. An arbitrum sepolia address private key with eth is required to deploy/manage contracts");
  }
}

const expectedEnvvars: { [key: string]: string[] } = {
  mainnet: [
    'MAINNET_ADDRESS_PRIVATE_KEY',
    'MAINNET_RPC_URL',
    'MAINNET_GAS_IN_GWEI',
  ],
  arbitrumSepolia: ['ARBITRUM_SEPOLIA_ADDRESS_PRIVATE_KEY', 'ARBITRUM_SEPOLIA_RPC_URL'],
  anvil: [],
  localhost: [],
};

/**
 * Check if the required environment variables exist
 */
export function ensureExpectedEnvvars() {
  let hasAllExpectedEnvVars = true;
  for (const envvarName of expectedEnvvars[network.name]) {
    if (!process.env[envvarName]) {
      console.error(`Missing environment variable ${envvarName}`);
      hasAllExpectedEnvVars = false;
    }
  }

  if (!hasAllExpectedEnvVars) {
    throw new Error(`Expected envvars missing`);
  }
}

// Impersonate an address and run fn(signer), then stop impersonating.
export async function impersonateSigner(address: string): Promise<Signer> {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return await ethers.getSigner(address);
}

// Wait until network gas price is below maxGasPrice, returns current gas price
export async function waitForMaxGas(
  maxGasPrice: BigNumber
): Promise<BigNumber> {
  let { gasPrice: currentGasPrice } = await ethers.provider.getFeeData();
  if (!currentGasPrice) throw new Error('No current gas price');
  while (currentGasPrice.gt(maxGasPrice)) {
    console.log(
      `Current gas price ${ethers.utils.formatUnits(
        currentGasPrice,
        'gwei'
      )} is higher than max gas price ${ethers.utils.formatUnits(
        maxGasPrice,
        'gwei'
      )}. Waiting for 30 seconds...`
    );
    await new Promise((resolve) => setTimeout(resolve, 30000));
    // Refresh current gas price
    currentGasPrice = await ethers.provider.getGasPrice();
    if (!currentGasPrice) throw new Error('No current gas price');
  }
  return currentGasPrice;
}

export async function setExplicitAccess(
  contract: Contract,
  allowedCaller: string,
  fnNames: string[],
  value: boolean
) {
  const access: IElevatedAccess.ExplicitAccessStruct[] = fnNames.map(
    (fn) => {
      return {
        fnSelector: contract.interface.getSighash(
          contract.interface.getFunction(fn)
        ),
        allowed: value,
      };
    }
  );
  return await mine(contract.setExplicitAccess(allowedCaller, access));
}

const { AddressZero } = ethers.constants;
export { AddressZero as ZERO_ADDRESS };
