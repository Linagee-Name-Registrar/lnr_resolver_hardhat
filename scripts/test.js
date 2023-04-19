const { ethers, network } = require("hardhat");
const hre = require("hardhat");

const multisig = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";
const resolver_contract = "0x6023E55814DC00F094386d4eb7e17Ce49ab1A190";
const og_contract = "0x5564886ca2C518d1964E5FCea4f423b41Db9F561"

const masonAddress = "0x7e1877D6eD0574181E5508952CFCD057B5AC5832"
const masonog = "0x6d61736f6e000000000000000000000000000000000000000000000000000000"

const og_abi = [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "name","outputs": [{"name": "o_name","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "owner","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "content","outputs": [{"name": "","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "addr","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "reserve","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "subRegistrar","outputs": [{"name": "o_subRegistrar","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_newOwner","type": "address"}],"name": "transfer","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_registrar","type": "address"}],"name": "setSubRegistrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [],"name": "Registrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_a","type": "address"},{"name": "_primary","type": "bool"}],"name": "setAddress","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_content","type": "bytes32"}],"name": "setContent","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "disown","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "register","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"}],"name": "Changed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"},{"indexed": true,"name": "addr","type": "address"}],"name": "PrimaryChanged","type": "event"},{"type": "fallback","payable": true,"stateMutability": "payable"}]
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "controller",
                "type": "address"
            }
        ],
        "name": "NewController",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "primary",
                "type": "address"
            }
        ],
        "name": "NewPrimary",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "_controller",
                "type": "address"
            }
        ],
        "name": "setController",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            }
        ],
        "name": "setPrimary",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_key",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_value",
                "type": "string"
            }
        ],
        "name": "setTextRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "value",
                "type": "string"
            }
        ],
        "name": "SetTextRecord",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            }
        ],
        "name": "unsetController",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unsetPrimary",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_key",
                "type": "string"
            }
        ],
        "name": "unsetTextRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "controller",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            }
        ],
        "name": "getResolveAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "_key",
                "type": "string"
            }
        ],
        "name": "getTextRecord",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lnrAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "primary",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_domain",
                "type": "string"
            }
        ],
        "name": "resolve",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "resolveAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "userTextRecords",
        "outputs": [
            {
                "internalType": "bool",
                "name": "initialized",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_name",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "verifyIsNameOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]


async function main() {
  
    const v3 = await hre.ethers.getContractFactory("LNR_RESOLVER_V3");
    const v3Contract = await v3.deploy();
  
    await v3Contract.deployed();

    

    console.log("v3 contract deployed at: ", v3Contract.address);

    var lnrAddress = await v3Contract.lnrAddress();

    console.log("lnrAddress: ", lnrAddress)




    
    const multisig = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";
    const resolver_contract = "0x6023E55814DC00F094386d4eb7e17Ce49ab1A190";
    const og_contract = "0x5564886ca2C518d1964E5FCea4f423b41Db9F561"
    // const resolver_v3 = "0x21915b79E1d334499272521a3508061354D13FF0";

    const me = "0x7e1877D6eD0574181E5508952CFCD057B5AC5832"

    const masonog = "0x6d61736f6e000000000000000000000000000000000000000000000000000000"

    const og_abi = [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "name","outputs": [{"name": "o_name","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "owner","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "content","outputs": [{"name": "","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "addr","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "reserve","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "subRegistrar","outputs": [{"name": "o_subRegistrar","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_newOwner","type": "address"}],"name": "transfer","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_registrar","type": "address"}],"name": "setSubRegistrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [],"name": "Registrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_a","type": "address"},{"name": "_primary","type": "bool"}],"name": "setAddress","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_content","type": "bytes32"}],"name": "setContent","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "disown","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "register","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"}],"name": "Changed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"},{"indexed": true,"name": "addr","type": "address"}],"name": "PrimaryChanged","type": "event"},{"type": "fallback","payable": true,"stateMutability": "payable"}]

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "previousAdmin",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newAdmin",
                    "type": "address"
                }
            ],
            "name": "AdminChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "beacon",
                    "type": "address"
                }
            ],
            "name": "BeaconUpgraded",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint8",
                    "name": "version",
                    "type": "uint8"
                }
            ],
            "name": "Initialized",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "controller",
                    "type": "address"
                }
            ],
            "name": "NewController",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "primary",
                    "type": "address"
                }
            ],
            "name": "NewPrimary",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "_controller",
                    "type": "address"
                }
            ],
            "name": "setController",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                }
            ],
            "name": "setPrimary",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "_key",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_value",
                    "type": "string"
                }
            ],
            "name": "setTextRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "name",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "key",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                }
            ],
            "name": "SetTextRecord",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                }
            ],
            "name": "unsetController",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unsetPrimary",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "_key",
                    "type": "string"
                }
            ],
            "name": "unsetTextRecord",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "implementation",
                    "type": "address"
                }
            ],
            "name": "Upgraded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newImplementation",
                    "type": "address"
                }
            ],
            "name": "upgradeTo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newImplementation",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "upgradeToAndCall",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "controller",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                }
            ],
            "name": "getResolveAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "_key",
                    "type": "string"
                }
            ],
            "name": "getTextRecord",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "lnrAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "primary",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "proxiableUUID",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_domain",
                    "type": "string"
                }
            ],
            "name": "resolve",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "resolveAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "userTextRecords",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "initialized",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_name",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "verifyIsNameOwner",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    //  impersonating multisig account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [multisig],
    });

    const signer = await ethers.getSigner(multisig);

    console.log("impersonating multisig...")

    var myContract = new ethers.Contract(resolver_contract, abi, signer)

    var owner = await myContract.resolve("mason.og")
    console.log("mason.og (v2 resolver): ", owner)

    console.log("calling upgradeTo function...")

    // //const myContract = (await hre.ethers.getContractFactory("Proxy")).attach(resolver_contract)

    // //const myContract = await hre.ethers.getContractAt("LNR_RESOLVER_V2", resolver_contract)

    // const [owner] = await ethers.getSigners();

    // //const signer = owner[0]

    
    // const myContract = new ethers.Contract(resolver_v3, abi, signer)
    
    await myContract.upgradeTo(v3Contract.address);

    var lnrAddress = await v3Contract.lnrAddress();

    console.log("lnrAddress: ", lnrAddress);

    var owner = await myContract.resolve("mason.og")
    console.log("mason.og (v3 resolver): ", owner);

    await network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [multisig],
      });

    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [me],
      });
  
    const signerMe = await ethers.getSigner(me);

    console.log("signer ", signerMe.address)

    var myContract2 = new ethers.Contract(resolver_contract, abi, signerMe)

    console.log("impersonating mason...")

    console.log("setting text record... ", masonog, " testkey ", "testvalue")

    await myContract2.setTextRecord(masonog, "testkey", "testvalue")

    var userRecords = await myContract2.userTextRecords(masonog)

    console.log("userTextRecords: ", userRecords, userRecords['userTextRecords'])

    var userRecord = await myContract2.getTextRecord(masonog, "testkey")

    console.log("getTextRecord() for mason.og: ", userRecord);

    console.log("reserving a new name: 12mason12");

    const mason12 = "0x31326d61736f6e31320000000000000000000000000000000000000000000000"

    var ogContract = new ethers.Contract(og_contract, og_abi, signerMe)

    await ogContract.reserve(mason12);

    console.log("setting text record for 12mason12.og ...")

    await myContract2.setTextRecord(mason12, "testkey12", "testvalue12")

    var userRecord = await myContract2.getTextRecord(mason12, "testkey12")

    console.log("getTextRecord() for mason12.og: ", userRecord);

    await myContract2.unsetTextRecord(mason12, "testkey12")

    var userRecord = await myContract2.getTextRecord(mason12, "testkey12")

    console.log("getTextRecord() for mason12.og after unset: ", userRecord, typeof(userRecord));


   



}

// main()
// .then(() => process.exit(0))
// .catch((error) => {
//     console.error(error);
//     process.exit(1);
// });

async function deployAndUpgradeTo(){

    //  deploy resolver v3
    const v3 = await hre.ethers.getContractFactory("LNR_RESOLVER_V3");
    const v3Contract = await v3.deploy();
    await v3Contract.deployed();

    console.log(v3Contract.address)

    //  impersonating multisig account
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [multisig],
    });
    const signer = await ethers.getSigner(multisig);

    //  call upgradeTo
    var parentResolver = new ethers.Contract(resolver_contract, abi, signer)
    await parentResolver.upgradeTo(v3Contract.address);

    //  stop impersonating multisig
    await network.provider.request({
        method: "hardhat_stopImpersonatingAccount",
        params: [multisig],
      });

    //  impersonate mason
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [masonAddress],
      });
  
    const signerMason = await ethers.getSigner(masonAddress);


    //  reinitialize ogContract with signerMason
    var lnrResolverInstance = new ethers.Contract(resolver_contract, abi, signerMason)

    var lnrResolverAddress = await lnrResolverInstance.lnrAddress();

    //  initialize ogContract instance
    var lnrOgInstance = new ethers.Contract(og_contract, og_abi, signerMason)


    console.log(lnrResolverAddress, lnrResolverInstance.address, lnrOgInstance.address )

    return(lnrResolverInstance, lnrResolverAddress, lnrOgInstance, signerMason, masonog)


}

deployAndUpgradeTo()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});