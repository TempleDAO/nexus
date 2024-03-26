import '@nomiclabs/hardhat-ethers';
import { ethers, network } from 'hardhat';
import { IslandShardMinter__factory } from '../../../../typechain';
import {
  deployAndMine,
  ensureExpectedEnvvars,
  DEPLOYED_CONTRACTS
} from '../../helpers';

async function main() {
    ensureExpectedEnvvars();
    const [owner] = await ethers.getSigners();
    const relicAddress = DEPLOYED_CONTRACTS[network.name].RELIC;
    const shardAddress = DEPLOYED_CONTRACTS[network.name].SHARD;
    const nexusCommonAddress = DEPLOYED_CONTRACTS[network.name].NEXUS_COMMON;
    const verifierAddress = DEPLOYED_CONTRACTS[network.name].PUZZLE_MINTER_VERIFIER;

    const minterFactory = new IslandShardMinter__factory(owner);
    
    await deployAndMine(
        'ISLAND_SHARD_MINTER',
        minterFactory,
        minterFactory.deploy,
        relicAddress,
        shardAddress,
        nexusCommonAddress,
        verifierAddress
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