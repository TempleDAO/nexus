import { ethers, network } from 'hardhat';
import {
    ensureExpectedEnvvars,
    mine
} from '../../helpers';
import { Shard__factory } from '../../../../typechain';
import { DEPLOYED_CONTRACTS } from '../../helpers';


async function main() {
    ensureExpectedEnvvars();
  
    const [owner] = await ethers.getSigners();
    const deployedContracts = DEPLOYED_CONTRACTS[network.name];
    const shard = Shard__factory.connect(deployedContracts.SHARD, owner);
    const islandShardMinterAddress = deployedContracts.ISLAND_SHARD_MINTER;

    const shardIds = [2,3,4,5,6];
    const allow = [true,true,true,true,true];
    await mine(shard.setMinterAllowedShardIds(islandShardMinterAddress, shardIds, allow));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });