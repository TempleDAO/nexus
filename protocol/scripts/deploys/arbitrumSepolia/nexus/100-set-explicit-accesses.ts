import { ethers, network } from 'hardhat';
import {
    blockTimestamp,
    ensureExpectedEnvvars,
    mine,
    toAtto
} from '../../helpers';
import { NexusCommon__factory, PartnerZeroSacrifice__factory, Relic__factory, Shard__factory, TempleERC20Token__factory, TempleSacrifice__factory } from '../../../../typechain';
import { DEPLOYED_CONTRACTS } from '../../helpers';
import { AbiCoder, defaultAbiCoder } from 'ethers/lib/utils';


async function main() {
    ensureExpectedEnvvars();
  
    const [owner] = await ethers.getSigners();
    const deployedContracts = DEPLOYED_CONTRACTS[network.name];
    const relic = Relic__factory.connect(deployedContracts.RELIC, owner);
    const shard = Shard__factory.connect(deployedContracts.SHARD, owner);
    const templeSacrifice = TempleSacrifice__factory.connect(deployedContracts.TEMPLE_SACRIFICE, owner);
    const nexusCommon = NexusCommon__factory.connect(deployedContracts.NEXUS_COMMON, owner);
    const partnerZeroSacrifice = PartnerZeroSacrifice__factory.connect(deployedContracts.PARTNER_ZERO_SACRIFICE, owner);
    const templeToken = TempleERC20Token__factory.connect(deployedContracts.TEMPLE, owner);

    // await mine(templeToken.addMinter(await owner.getAddress()));
    // await mine(templeToken.mint(await owner.getAddress(), toAtto(10_000)));
    // await mine(templeToken.approve(templeSacrifice.address, toAtto(10_000)));
    // await mine(templeSacrifice.sacrifice(1, await owner.getAddress()));

    const addresses = [
        // "0xeb8F8842DD0201525342225AE9F22F6FC0D516D0", 
        // "0xc7f0d22A9C7f0c4Bd08eF82FE4FEb8eDf340bE76",
        "0x8EFd6D9a350688d105DBc02aC5A9Bc33c4875e3F",
        // "0x909374E971087a1A01F0D30eA9191b287D33537E",
        // "0x9d14083c54a0ed1F776D7426556847Dd75b5E0b8",
        // "0x060C78C7043295d7C132ecf97c17b1D95ad50cb9",
        // "0x8e326B69Ecc66C7CA92693e890CBB879812fDBE0",
        // "0xebc111160ceA3c99b4DcC90E30f64B92f2112473"
    ];

    // add as minter
    for (const acc of addresses) {
        await mine(templeToken.addMinter(acc));
    }
    // enable Shard Id 6
    await mine(shard.setNewMinterShards([await owner.getAddress()]));
    // nexus common set NON-ENCLAVE id for partner A
    await mine(nexusCommon.setEnclaveName(6, "PARTNER-A-ENCLAVE"));
    await mine(nexusCommon.setShardEnclave(6, 6));

    // const enclaveIds = [1, 2, 3, 4, 5, 6];
    // const enclaveIdsAllow = [true, true, true, true, true, true];
    for (const account of addresses) {
        // Relic access
        let fnSigs = [
            relic.interface.getSighash('setRelicMinterEnclaveIds'),
            relic.interface.getSighash('setXPRarityThresholds'),
            relic.interface.getSighash('setBlacklistAccount'),
            relic.interface.getSighash('setBlacklistedShards'),
            relic.interface.getSighash('unsetBlacklistedShards'),
            relic.interface.getSighash('setRelicXP'),
            relic.interface.getSighash('recoverToken'),
            relic.interface.getSighash('burnBlacklistedRelicShards')
        ];
        let explicitAccessArray = [];
        // construct explicit access array for each account of all signatures
        for (const fnSig of fnSigs) {
            const explicitAccessStruct = {
                fnSelector: fnSig,
                allowed: true
            }
            explicitAccessArray.push(explicitAccessStruct)
        }
        await mine(relic.setExplicitAccess(account, explicitAccessArray));
        // reset
        fnSigs = [];
        explicitAccessArray = [];

        fnSigs = [
            shard.interface.getSighash('setNewMinterShards'),
            shard.interface.getSighash('setMinterAllowedShardIds'),
            shard.interface.getSighash('setAllowedShardCaps'),
            shard.interface.getSighash('addRecipe'),
            shard.interface.getSighash('deleteRecipe')
        ]
        // construct explicit access array for each account of all signatures
        for (const fnSig of fnSigs) {
            const explicitAccessStruct = {
                fnSelector: fnSig,
                allowed: true
            }
            explicitAccessArray.push(explicitAccessStruct)
        }
        await mine(shard.setExplicitAccess(account, explicitAccessArray));
        // reset
        fnSigs = [];
        explicitAccessArray = [];
        fnSigs = [
            templeSacrifice.interface.getSighash('setCustomPrice')
        ];
        // construct explicit access array for each account of all signatures
        for (const fnSig of fnSigs) {
            const explicitAccessStruct = {
                fnSelector: fnSig,
                allowed: true
            }
            explicitAccessArray.push(explicitAccessStruct)
        }
        await mine(templeSacrifice.setExplicitAccess(account, explicitAccessArray));
        // reset
        fnSigs = [];
        explicitAccessArray = [];
        fnSigs = [
            partnerZeroSacrifice.interface.getSighash('setMintCap'),
            partnerZeroSacrifice.interface.getSighash('sacrifice'),
        ];
        // construct explicit access array for each account of all signatures
        for (const fnSig of fnSigs) {
            const explicitAccessStruct = {
                fnSelector: fnSig,
                allowed: true
            }
            explicitAccessArray.push(explicitAccessStruct)
        }
        await mine(partnerZeroSacrifice.setExplicitAccess(account, explicitAccessArray));

        {
            ///setRelicMinterEnclaveIds setXPRarityThresholds setBlacklistAccount setBlacklistedShards unsetBlacklistedShards setRelicXP recoverToken burnBlacklistedRelicShards
        
        }

        /// Shard access
        {
            /// setNewMinterShards setMinterAllowedShardIds setAllowedShardCaps addRecipe deleteRecipe 
        }
        /// Temple Sacrifice accesses
        {
            // setCustomPrice
        }

        {
            // Partner Sacrigice
            /// setMintCap, sacrifice
        }
    }
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });