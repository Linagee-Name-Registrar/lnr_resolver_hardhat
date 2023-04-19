require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/5b26585dfc17437da190dd2117648295",
      }
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/5b26585dfc17437da190dd2117648295",
      gasPrice: 204369036266, 
      gas: 53064000,
    },
  }
};
