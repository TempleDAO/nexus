import '@nomiclabs/hardhat-ethers';
import { ethers, network } from 'hardhat';
import { ShardMinterFactory__factory } from '../../../../typechain';
import {
  deployAndMine,
  ensureExpectedEnvvars,
  DEPLOYED_CONTRACTS
} from '../../helpers';

async function main() {
    ensureExpectedEnvvars();
    const [owner] = await ethers.getSigners();

    const minterFactory = new ShardMinterFactory__factory(owner);
    const deployedContracts = DEPLOYED_CONTRACTS[network.name];
    const implementationAddress = deployedContracts.SHARD_MINTER_IMPLEMENTATION;
    const relicAddress = deployedContracts.RELIC;
    const shardAddress = deployedContracts.SHARD;

    await deployAndMine(
        'SHARD_MINTER_FACTORY',
        minterFactory,
        minterFactory.deploy,
        await owner.getAddress(), // executor
        implementationAddress,
        relicAddress,
        shardAddress
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });