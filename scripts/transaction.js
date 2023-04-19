const { ethers, network } = require("hardhat");
const hre = require("hardhat");

async function send() {
  const vitalik_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const addressTo = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";

  //  impersonating vitalik's account
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [vitalik_address],
  });

  //   make vitalik the signer
  const signer = await ethers.getSigner(vitalik_address);

  console.log(
    "Vitalik account before transaction",
    ethers.utils.formatEther(await signer.getBalance())
  );

  //   create  transaction
  const tx = {
    to: addressTo,
    value: ethers.utils.parseEther("10"),
  };

  const recieptTx = await signer.sendTransaction(tx);

  await recieptTx.wait();

  console.log(`Transaction successful with hash: ${recieptTx.hash}`);
  console.log(
    "Vitalik account after transaction",
    ethers.utils.formatEther(await signer.getBalance())
  );
}

// send()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



  async function main() {

    console.log("prepring to send")

    await send();

    const multisig = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";
    const resolver_contract = "0x6023E55814DC00F094386d4eb7e17Ce49ab1A190";
    const resolver_v3 = "0x2f8D338360D095a72680A943A22fE6a0d398a0B4";
    const me = "0x7e1877D6eD0574181E5508952CFCD057B5AC5832"

    const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"controller","type":"address"}],"name":"NewController","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"primary","type":"address"}],"name":"NewPrimary","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"getResolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lnrAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"primary","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_domain","type":"string"}],"name":"resolve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"resolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"setPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"unsetController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unsetPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_addr","type":"address"}],"name":"verifyIsNameOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
    //  impersonating vitalik's account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [multisig],
    });
  
    //   make vitalik the signer
    const signer = await ethers.getSigner(multisig);

    //const myContract = (await hre.ethers.getContractFactory("Proxy")).attach(resolver_contract)

    const myContract = new ethers.Contract(resolver_contract, abi, signer)

    var owner = await myContract.owner()
    console.log("owner: ", owner)

    
    
    const upgradeContract = await myContract.upgradeTo(resolver_v3)

    var owner = await myContract.owner()
    console.log("owner: ", owner)

    //var resolve = await myContract.primary(me)

    console.log("Tx hash:", upgradeContract.hash);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


async function main2() {

    
    const multisig = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";
    const resolver_contract = "0xeaB077eE281E4C2b6f9C94e7497eacAF804DD472";
    const resolver_v3 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"controller","type":"address"}],"name":"NewController","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"primary","type":"address"}],"name":"NewPrimary","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"getResolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lnrAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"primary","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_domain","type":"string"}],"name":"resolve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"resolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"setPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"unsetController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unsetPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_addr","type":"address"}],"name":"verifyIsNameOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
    //  impersonating vitalik's account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [multisig],
    });
  
    //   make vitalik the signer
    const signer = await ethers.getSigner(multisig);

    //const myContract = (await hre.ethers.getContractFactory("Proxy")).attach(resolver_contract)

    //const myContract = await hre.ethers.getContractAt("LNR_RESOLVER_V2", resolver_contract)

    const [owner] = await ethers.getSigners();

    //const signer = owner[0]

    
    const myContract = new ethers.Contract(resolver_contract, abi, signer)
    
    //const upgradeContract = await myContract.lnrAddress()

    //const lnr = await myContract.owner()

    const balance = await signer.getBalance(multisig);


    console.log("lnr address:", balance);

    



}

// main2()
// .then(() => process.exit(0))
// .catch((error) => {
//     console.error(error);
//     process.exit(1);
// });