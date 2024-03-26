import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { PuzzleMinterVerifier__factory } from '../../../../typechain';
import {
  deployAndMine,
  ensureExpectedEnvvars
} from '../../helpers';


async function main() {
    ensureExpectedEnvvars();
    const [owner] = await ethers.getSigners();

    const verifierFactory = new PuzzleMinterVerifier__factory(owner);
    const signer = '0xCBd7Ab6abC38985DFF0e295c691cA571f74E680f';
    const name = 'NEXUS_PUZZLE_MINTER_VERIFIER';
    const symbol = 'NPMV';

    await deployAndMine(
        'NEXUS_PUZZLE_MINTER_VERIFIER',
        verifierFactory,
        verifierFactory.deploy,
        signer,
        await owner.getAddress(),
        name,
        symbol
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