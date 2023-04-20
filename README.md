# Linagee Resolver Hardhat Repo

### Install dependencies
```shell
npm install
```

### Add your API keys
- Create a **.env** file in the root folder and add your Alchemy API key (use .env.example as a template)

### Compile the contract
```shell
npx hardhat compile
```

### Run tests
```shell
npx hardhat test
REPORT_GAS=true npx hardhat test
```

### Deploy
```
npx hardhat run scripts/deploy.js
```

### Other commands
```shell
npx hardhat help
npx hardhat node
```
