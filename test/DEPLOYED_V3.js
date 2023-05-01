const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { ethers, network } = require("hardhat");
  const hre = require("hardhat");



  const multisig = "0x6B59D66f15c6A5F618a22D33bbFF015ab77DaDa3";
  const resolver_contract = "0x6023E55814DC00F094386d4eb7e17Ce49ab1A190";
  const og_contract = "0x5564886ca2C518d1964E5FCea4f423b41Db9F561"

  const masonAddress = "0x7e1877D6eD0574181E5508952CFCD057B5AC5832"
  const masonog = "0x6d61736f6e000000000000000000000000000000000000000000000000000000"
  const mason12 = "0x31326d61736f6e31320000000000000000000000000000000000000000000000"
  const zero = "0x0000000000000000000000000000000000000000"
  const zeroBytes = "0x0000000000000000000000000000000000000000000000000000000000000000"

  const og_abi = [{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "name","outputs": [{"name": "o_name","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "owner","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "content","outputs": [{"name": "","type": "bytes32"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "addr","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "reserve","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "subRegistrar","outputs": [{"name": "o_subRegistrar","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_newOwner","type": "address"}],"name": "transfer","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_registrar","type": "address"}],"name": "setSubRegistrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [],"name": "Registrar","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_a","type": "address"},{"name": "_primary","type": "bool"}],"name": "setAddress","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"},{"name": "_content","type": "bytes32"}],"name": "setContent","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": false,"inputs": [{"name": "_name","type": "bytes32"}],"name": "disown","outputs": [],"type": "function","payable": true,"stateMutability": "payable"},{"constant": true,"inputs": [{"name": "_name","type": "bytes32"}],"name": "register","outputs": [{"name": "","type": "address"}],"type": "function","payable": false,"stateMutability": "view"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"}],"name": "Changed","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "name","type": "bytes32"},{"indexed": true,"name": "addr","type": "address"}],"name": "PrimaryChanged","type": "event"},{"type": "fallback","payable": true,"stateMutability": "payable"}]
  const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"controller","type":"address"}],"name":"NewController","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"address","name":"primary","type":"address"}],"name":"NewPrimary","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":true,"internalType":"string","name":"key","type":"string"},{"indexed":true,"internalType":"string","name":"value","type":"string"}],"name":"SetTextRecord","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"getResolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"}],"name":"getTextRecord","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lnrAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"primary","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_domain","type":"string"}],"name":"resolve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"resolveAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"setPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"},{"internalType":"string","name":"_value","type":"string"}],"name":"setTextRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"unsetController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unsetPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"string","name":"_key","type":"string"}],"name":"unsetTextRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"userTextRecords","outputs":[{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"address","name":"_addr","type":"address"}],"name":"verifyIsNameOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
  describe("DEPLOYED_V3", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    async function deployAndUpgradeTo(){

        //         //  impersonating multisig account
        // await network.provider.request({
        //     method: "hardhat_impersonateAccount",
        //     params: [multisig],
        // });

        // const signer = await ethers.getSigner(multisig);

        //   //   create  transaction
        // const tx = {
        //     to: masonAddress,
        //     value: ethers.utils.parseEther("10.0"),
        // };

        // const recieptTx = await signer.sendTransaction(tx);

        // await recieptTx.wait();

        //         //  stop impersonating multisig
        // await network.provider.request({
        //     method: "hardhat_stopImpersonatingAccount",
        //     params: [multisig],
        //   });


        //  impersonate mason
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [masonAddress],
          });
      
        const signerMason = await ethers.getSigner(masonAddress);
    
    
        //  reinitialize ogContract with signerMason
        const lnrResolverInstance = new ethers.Contract(resolver_contract, abi, signerMason)
    
        var lnrResolverAddress = await lnrResolverInstance.lnrAddress();
    
        //  initialize ogContract instance
        const lnrOgInstance = new ethers.Contract(og_contract, og_abi, signerMason)
    
    
        //console.log(lnrResolverAddress, lnrResolverInstance.address, lnrOgInstance.address )

        //console.log("first", lnrResolverInstance)



        return({lnrResolverInstance, lnrResolverAddress, lnrOgInstance, signerMason, masonog})
    
    
    }

    describe("Deployment", function () {
        it("Should return lnrAddress if deployed and upgraded", async function () {
          const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);
          const lnraddr = await lnrResolverInstance.lnrAddress()  
          //console.log(lnraddr, lnrOgInstance.address)
          expect(lnraddr).to.equal(lnrOgInstance.address);
        });
        describe("Setting to existing name owned by mason", function() {

            it("Should return the current primary()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                var primary = await lnrResolverInstance.primary(signerMason.address)

                expect(primary).to.equal(masonog);

            })

            it("Should return the current controller()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                var controller = await lnrResolverInstance.controller(masonog)
                expect(controller).to.equal(zero);

            })

            it("Should return the current resolveAddress()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                var resolveAddress = await lnrResolverInstance.resolveAddress(masonog)
                expect(resolveAddress).to.equal(signerMason.address);

            })

            it("Should return the current resolve()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                var resolve = await lnrResolverInstance.resolve("mason.og")
                expect(resolve).to.equal(signerMason.address);

            })

            it("Should set and return the set text records", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrResolverInstance.setTextRecord(masonog, "testkey1", "testvalue1")
                var userRecord1 = await lnrResolverInstance.getTextRecord(masonog, "testkey1")

                await lnrResolverInstance.setTextRecord(masonog, "testkey2", "testvalue2")
                var userRecord2 = await lnrResolverInstance.getTextRecord(masonog, "testkey2")

                expect(userRecord1).to.equal("testvalue1");
                expect(userRecord2).to.equal("testvalue2");



            })

            it("Should unset the text record and return nothing", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrResolverInstance.unsetTextRecord(masonog, "testkey1")
                var userRecord1 = await lnrResolverInstance.getTextRecord(masonog, "testkey1")

                await lnrResolverInstance.unsetTextRecord(masonog, "testkey2")
                var userRecord2 = await lnrResolverInstance.getTextRecord(masonog, "testkey2")

                expect(userRecord1).to.equal("");
                expect(userRecord2).to.equal("");



            })
    
            
        })


        //new name

        describe("Setting to a new name: 12mason12", function() {

            it("should deny setting/unsetting primary - not owned yet", async function () {

                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                
                await expect( 
                    lnrResolverInstance.setPrimary(mason12)
                    ).to.be.revertedWith("Not yours");


            })

            it("should deny setting/unsetting controller - not owned yet", async function () {

                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await expect( 
                    lnrResolverInstance.setController(mason12, signerMason.address)
                    ).to.be.revertedWith("Not yours");
                await expect( 
                    lnrResolverInstance.unsetController(mason12)
                    ).to.be.revertedWith("Not yours");

            })

            it("should deny setting/unsetting textrecord - not owned yet", async function () {

                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await expect( 
                    lnrResolverInstance.setTextRecord(mason12, "testkey1", "testvalue1")
                    ).to.be.revertedWith("Not yours")
                await expect( 
                    lnrResolverInstance.unsetTextRecord(mason12, "testkey1")
                    ).to.be.revertedWith("Not yours");

            })

            it("Should unset and set primary then return the current primary()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);


                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)
                var primary = await lnrResolverInstance.primary(signerMason.address)

                expect(primary).to.equal(mason12);

            })

            it("Should unset the current primary", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                
                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)
                await lnrResolverInstance.unsetPrimary()
                var primary = await lnrResolverInstance.primary(signerMason.address)
                expect(primary).to.equal(zeroBytes);

            })

            it("Should return the current controller()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);


                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.setController(mason12, signerMason.address)
                var controller = await lnrResolverInstance.controller(mason12)

                expect(controller).to.equal(signerMason.address);

            })

            it("Should unset the current controller", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.setController(mason12, signerMason.address)
                
                await lnrResolverInstance.unsetController(mason12)
                var controller = await lnrResolverInstance.controller(mason12)

                expect(controller).to.equal(zero);

            })


            it("Should return the current resolveAddress()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)
                var resolveAddress = await lnrResolverInstance.resolveAddress(mason12)
                expect(resolveAddress).to.equal(signerMason.address);

            })

            it("Should return the current resolve()", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)
                var resolve = await lnrResolverInstance.resolve("12mason12.og")
                expect(resolve).to.equal(signerMason.address);

            })

            it("Should set and return the set text records", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)

                await lnrResolverInstance.setTextRecord(mason12, "testkey1", "testvalue1")
                var userRecord1 = await lnrResolverInstance.getTextRecord(mason12, "testkey1")

                await lnrResolverInstance.setTextRecord(mason12, "testkey2", "testvalue2")
                var userRecord2 = await lnrResolverInstance.getTextRecord(mason12, "testkey2")

                expect(userRecord1).to.equal("testvalue1");
                expect(userRecord2).to.equal("testvalue2");

                await lnrResolverInstance.setTextRecord(mason12, "testkey1", "newtestvalue1")
                var userRecord1 = await lnrResolverInstance.getTextRecord(mason12, "testkey1")

                expect(userRecord1).to.equal("newtestvalue1");



            })

            it("Should unset the text record and return nothing", async function () {
                const { lnrResolverInstance, lnrResolverAddress, lnrOgInstance, lnrOgAddress, signerMason, masonog } = await loadFixture(deployAndUpgradeTo);

                await lnrOgInstance.reserve(mason12)
                await lnrResolverInstance.unsetPrimary()
                await lnrResolverInstance.setPrimary(mason12)

                await lnrResolverInstance.unsetTextRecord(mason12, "testkey1")
                var userRecord1 = await lnrResolverInstance.getTextRecord(mason12, "testkey1")

                await lnrResolverInstance.unsetTextRecord(mason12, "testkey2")
                var userRecord2 = await lnrResolverInstance.getTextRecord(mason12, "testkey2")

                expect(userRecord1).to.equal("");
                expect(userRecord2).to.equal("");



            })
    
            
        })





        });
    

  });