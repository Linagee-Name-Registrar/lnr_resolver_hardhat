[![Hardhat tests](https://github.com/Linagee-Name-Registrar/lnr_resolver_hardhat/actions/workflows/main.yml/badge.svg)](https://github.com/Linagee-Name-Registrar/lnr_resolver_hardhat/actions/workflows/main.yml)

# Linagee Resolver Hardhat Repo

### Install dependencies
```shell
npm install
```

### Add your API keys
- Create a **.env** file in the root folder and add your Alchemy API key (use .env.example as a template)
- Also add the ETHERSCAN_API_KEY (if you want to verify the contract on Etherscan)

### Compile the contract
```shell
npx hardhat compile
```

### Run tests
```shell
npx hardhat test
npx hardhat test --network hardhat
REPORT_GAS=true npx hardhat test
```

### Deploy the contract
```shell
npx hardhat run scripts/deploy.js
npx hardhat run --network <desired-network> scripts/deploy.js
```

### Verify the contract on Etherscan
```shell
npx hardhat verify --network <desired-network> <address> <constructor argument 1> <constructor argument 2> ...
```

### Other commands
```shell
npx hardhat help
npx hardhat node
```
