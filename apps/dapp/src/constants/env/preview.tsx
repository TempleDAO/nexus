import { ADDRESS_ZERO } from 'utils/bigNumber';
import { RARITY_TYPE } from 'components/Pages/Nexus/types';
import { Environment } from './types';

const env: Environment = {
  alchemyId: '-nNWThz_YpX1cGffGiz-lbSMu7dmp4GK',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/AorwfDdHDsEjIX4HPwS70zkVjWqjv5vZ',
  backendUrl: 'https://backend-stage.templedao.link',
  contracts: {
    balancerVault: '0x65748E8287Ce4B9E6D83EE853431958851550311',
    exitQueue: '0x75a89f50cb40aec7Ed237F1Bfab562A60023ebE6',
    faith: '0x2c20342F1B27Ca1E4e6668A623084Bb9fC086A4D',
    farmingWallet: '0x5C8898f8E0F9468D4A677887bC03EE2659321012',
    frax: '0x73651AD693531F9937528009cC204a4d9b696a68',
    usdc: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    usdt: '',
    dai: '0x8c9e6c40d3402480ace624730524facc5482798c',
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    frax3CrvFarming: '',
    frax3CrvFarmingRewards: '',
    lockedOgTemple: '0x564462C807600684965d8A8f57eA190F2F66169C',
    lbpFactory: '0xB0C726778C3AE4B3454D85557A48e8fa502bDD6A',
    ogTemple: '0x07d6c81fce4263ddeb0610c217c673b315e766f1',
    olympus: '',
    otcOffer: '',
    temple: '0x5631d8eA427129e15bDa68F0F9227C149bD29Dcf',
    templeStaking: '0x20Ab503De9859eecB22EaB0ddEc9Bcd8bAFB876C',
    templeV2FraxPair: '0x85dA8c4312742522519911052Fa2B4aC302E4d6c',
    templeV2Router: '0x7a19509307648b0bf00dd7349F2dDaE716B9a998',
    swap1InchRouter: '0x1111111254EEB25477B68fb85Ed929f73A960582',
    tlc: '0xAe0A4a7690F5f308C6615E3738243Ab629DaEAEA',
    treasuryReservesVault: '',
    treasuryIv: '0xA443355cE4F9c1AA6d68e057a962E86E071B0ed3',
    vaultOps: '0x542891Faf336d69E440De80145Df21510dCa6a78',
    vaultProxy: '0xb0043346da58ce01EaE3246664Cb5984f75adC1b',
    vaultEarlyExit: '0x7Edb6ea1A90318E9D2B3Ae03e5617A5AAFd7b249',
    ramos: '0x02783CE28C5B3B015340938A11Aa79BB9f26f1Bc',
    ramosPoolHelper: '0xe3346D1923A9935A581FEa891b027eabF7B35250',
    balancerHelpers: '0x5aDDCCa35b7A0D07C74063c48700C8590E87864E',
    strategies: {
      dsrBaseStrategy: '0x472C7cDb6E730ff499E118dE6260c6b44c61d7bf',
      ramosStrategy: '0xB9507b59f91FF320631d30f774142631b30C537A',
      templeStrategy: '0xECe4ff1bd589b488350557A5C36D823C7B47E82F',
      tlcStrategy: '0x415A9B41700AC645d9C22F2499a6E853b625F792',
      temploMayorGnosisStrategy: '',
    }
  },
  subgraph: {
    // TODO: These need updated to the templedao organization subgraphs once they are deployed
    templeCore: 'https://api.thegraph.com/subgraphs/name/templedao/templedao-core-goerli',
    protocolMetrics: 'https://api.thegraph.com/subgraphs/name/medariox/temple-metrics',
    protocolMetricsArbitrum: 'https://api.thegraph.com/subgraphs/name/medariox/temple-metrics-arbitrum',
    balancerV2: 'https://api.thegraph.com/subgraphs/name/templedao/templedao-balancer-v2',
    // TODO: Will be deprecated
    ramos: 'https://api.thegraph.com/subgraphs/name/templedao/templedao-ramos',
    // TODO: restore this
    // templeV2: 'https://api.studio.thegraph.com/query/520/v2-sepolia/version/latest',
    templeV2: 'https://api.thegraph.com/subgraphs/name/medariox/v2-mainnet'
    // Original Balancer Subgraph
    // balancerV2: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-goerli-v2',
  },
  gas: {
    swapFraxForTemple: 300000,
    swapTempleForFrax: 300000,
    widthrawBase: 180000,
    widthrawPerEpoch: 15000,
    unstakeBase: 300000,
    unstakePerEpoch: 16000,
    restakeBase: 350000,
    restakePerEpoch: 20000,
    stake: 150000,
    claimOgTemple: 100000,
  },
  infuraId: '4cd22916292d4fb6be156454978c326b',
  intervals: {
    ascendData: 30_000,
    ascendQuote: 10_000,
  },
  tokens: {
    frax: {
      name: 'Frax',
      address: '0x73651AD693531F9937528009cC204a4d9b696a68',
      decimals: 18,
      symbol: 'FRAX',
    },
    temple: {
      name: 'Temple',
      address: '0x5631d8eA427129e15bDa68F0F9227C149bD29Dcf',
      decimals: 18,
      symbol: 'TEMPLE',
    },
    ogTemple: {
      name: 'OGTemple',
      address: '0x07d6c81fce4263ddeb0610c217c673b315e766f1',
      decimals: 18,
      symbol: 'OGTEMPLE',
    },
    ohm: {
      name: 'Olympus',
      address: '',
      decimals: 9,
    },
    eth: {
      name: 'ETH',
      address: ADDRESS_ZERO,
      decimals: 18,
    },
    weth: {
      name: 'WETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18,
      symbol: 'WETH',
    },
    usdc: {
      name: 'USDC',
      address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
      decimals: 6,
      symbol: 'USDC',
    },
    usdt: {
      name: 'USDT',
      address: '',
      decimals: 6,
    },
    dai: {
      name: 'DAI',
      address: '0x8c9e6c40d3402480ace624730524facc5482798c',
      decimals: 18,
      symbol: 'DAI',
    },
  },
  network: 5,
  etherscan: 'https://goerli.arbiscan.io',
  templeMultisig: '0x3a320fF715dCBbF097e15257B7051dd08fdfb7A2',
  nexus: {
    templeRelicAddress: '0xcbc7cf85dd0AB91Aa2671400E86ebf3AaC6dc658',
    templeShardsAddress: '0x192aA9BfDcA5540406E211950C226C8E0cd5047F',
    templeSacrificeAddress: '0x1b274A49fF8Ec84f874B989EcF23840952D7E600',
    templeToken: '0x0090F9655a0B0A32cEE0Da5ae45E93EAB4C6d149',
    templePartnerMinterAddress: '0x2ae6318e34bb97ae3755AFcE75559452aA223A5D',
    pathOfTemplarShardAddress: '',
    recipes: [
      // { id: 0, required_ids: [0, 1], required_amounts: [1, 1], reward_ids: [2], reward_amounts: [1] },
      // { id: 2, required_ids: [0, 1], required_amounts: [2, 3], reward_ids: [2], reward_amounts: [1] },
      // { id: 3, required_ids: [0, 1, 2], required_amounts: [1, 2, 1], reward_ids: [3], reward_amounts: [1] },
    ],
    shardMetadata: {
      1: {
        id: 1, //note: this has to align with the id on the contract side
        name: 'Tome of Knowledge',
        description: "Obtained for completing the Temple's Apocrypha.",
        originUrl: 'https://www.voxels.com/spaces/ecd16631-9db3-49d7-b8d6-08e28556a734/play?coords=W@30W,1S,32F',
        logoUrl: 'https://myst.mypinata.cloud/ipfs/QmZxyeEakU7nzExo4t7LEyZwpR8QX6ZdBV72fgrGdGNPvT',
        rarity: RARITY_TYPE.EPIC,
      },
      // 2: {
      //   id: 2,
      //   name: 'Sigil of Temple Enclave',
      //   description: 'Obtained from completing a pilgrimage through the Temple Gates',
      //   originUrl: 'https://echoingwhispers.link/',
      //   logoUrl: 'https://devzodiactemple.mypinata.cloud/ipfs/QmSnRGU8CXtsX7pfnDaZ39JN9bNFZzGF6hwUbSAaW1zDg7',
      //   rarity: RARITY_TYPE.EPIC,
      // },
    },
    quests: [
      // {
      //   id: '1',
      //   title: 'Path Of The Templar',
      //   origin: 'TempleDAO',
      //   linkUrl: 'https://nexus.echoingwhispers.link/nexus/relic/no-relic',
      //   description:
      //     'The weary Templar seeking safe harbor from the bitter storms of DeFi volatility begins to have fever dreams about a mythical Hall of Scriptures where they may gain knowledge and enlightenment. The intrepid Templar may explore 1 of 5 paths available to them which will grant access to an Enclave of their choosing based on their natural alignments. The paths to the Enclaves of Chaos, Mystery, Logic, Structure and Order stretch out into the distance. Which path will bring you to prosperity?',
      //   logoUrl: 'https://myst.mypinata.cloud/ipfs/QmU3yaVLhaWi75AUwi4zxMFbu7uM53Pa4duar7jHD2m4Gs/StructureRelic.gif',
      //   rewardIds: [2],
      //   rarity: RARITY_TYPE.EPIC,
      // },
      {
        id: '1',
        title: 'Temple Scholar',
        origin: 'TempleDAO',
        linkUrl: 'https://www.voxels.com/spaces/ecd16631-9db3-49d7-b8d6-08e28556a734/play?coords=W@30W,1S,32F',
        description:
          'A mysterious and sultry figure in the Hall of Scriptures will point you in the right direction to locate the ancient Temple Library. There you will embark on a quest for knowledge through ancient tomes hidden within the library walls. The path of the Scholar is long but rewarding.',
        logoUrl: 'https://myst.mypinata.cloud/ipfs/QmZxyeEakU7nzExo4t7LEyZwpR8QX6ZdBV72fgrGdGNPvT',
        rewardIds: [1],
        rarity: RARITY_TYPE.EPIC,
      },
    ],
  },
};

export default env;
