require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

let secret = require("./secret.json")
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: secret.url,
      accounts: [secret.key]
    }
  }
};
