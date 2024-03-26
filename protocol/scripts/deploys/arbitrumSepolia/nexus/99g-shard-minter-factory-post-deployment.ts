import { ethers, network } from 'hardhat';
import {
    ensureExpectedEnvvars,
    mine
} from '../../helpers';
import { Shard__factory, ShardMinterFactory__factory } from '../../../../typechain';
import { DEPLOYED_CONTRACTS } from '../../helpers';

async function main() {
    ensureExpectedEnvvars();
  
    const [owner] = await ethers.getSigners();
    const deployedContracts = DEPLOYED_CONTRACTS[network.name];

    const shardAddress = deployedContracts.SHARD;
    const shardMinterFactoryAddress = deployedContracts.SHARD_MINTER_FACTORY;
    const ownerAddress = await owner.getAddress();
    const pathOfTemplarShardId = 1;
    const origamiShardId = 7;

    const shard = Shard__factory.connect(shardAddress, owner);
    const shardMinterFactory = ShardMinterFactory__factory.connect(shardMinterFactoryAddress, owner);

    // create new shard minter using factory
    await mine(shardMinterFactory.deploy(ownerAddress, pathOfTemplarShardId, "PATH_OF_TEMPLAR_SHARD_MINTER"));
    const pathOfTemplarShardMinter = await shardMinterFactory.shardToMinter(pathOfTemplarShardId);
    console.log(`Path of Templar Shard Minter ${pathOfTemplarShardMinter}`);

    await mine(shardMinterFactory.deploy(ownerAddress, origamiShardId, "ORIGAMI_SHARD_MINTER"));
    const origamiShardMinter = await shardMinterFactory.shardToMinter(origamiShardId);
    console.log(`Origami Shard Minter ${origamiShardMinter}`);

    // approve new implementation to mint shards
    let shardIds = [pathOfTemplarShardId];
    let allows = [true];
    await mine(shard.setMinterAllowedShardIds(pathOfTemplarShardMinter, shardIds, allows));
    shardIds = [origamiShardId];
    await mine(shard.setMinterAllowedShardIds(origamiShardMinter, shardIds, allows));
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });