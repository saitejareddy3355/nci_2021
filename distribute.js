// create a method that will be called by the web server

// in this method:
// - read the accounts.txt file DONE
// put the N accounts into an array DONE
// get the totalsupply remaining for the token owner
// calculate 5% of that totalSupply
// loop N times, and execute N transactions transferring the token from owner to address in array
// collect tea and medals

let fs = require("fs");

let BigNumber = require("big-number")

let method = require('./method.js');
let contract = require('./contract.js');

// this sets up my .env file
require('dotenv').config()

// let's load our environment variables
infuraToken = "b23b66fbb842468885b2ec646a3d975d"
contractAddress = "0x0768f95e16a53d0f2febf5e1400a58390d855ed0"
ownerAddress = "0xd9945af8B4f107d6AF3c3eFc413E305aD3276f97"
privateKey = Buffer.from("7365c1c5b727b25c264b6396dc1dcfb858e7dfa2e764c64170d64d33c1e41596", 'hex')

const distribute = async() => {
    // read in the file
    let distributionAddresses = fs.readFileSync('./accounts.txt', 'utf8').split(' ');

    console.log(`distro addresses are: ${ distributionAddresses}`);

    // get the balance of the token owner
    let ownerBalance = await contract.getBalanceOfAccount(ownerAddress);
    let ob = new BigNumber(ownerBalance);
    console.log(`owner balance is ${ob}`);


    // get the symbol of the token
    let tokenSymbol = await contract.getSymbol();
    console.log(`symbol is ${tokenSymbol}`);

    // get five percent of this balance
    let fivePerCent = ob.div(20);
    console.log(`five per cent of owner balance is ${fivePerCent}`);

    // work out how many addresses in file (N)
    let numberOfAddresses = distributionAddresses.length;
    console.log(`number of addresses in file is ${numberOfAddresses}`);

    // divide the 5% by N to get distroAmount
    let distributionAmount = fivePerCent.div(numberOfAddresses)
    console.log(`distribution amount per address is ${distributionAmount}`);

    for (looper = 0; looper < numberOfAddresses; looper++) {
        console.log(`about to distribute ${tokenSymbol}, ${distributionAmount} tokens go to ${distributionAddresses[looper]}`)
        // execute a ERC20transfer(ownerAddress, distributionAddresss[looper], distributionAmount);
        let retval = await method.transferToken(distributionAddresses[looper], distributionAmount)
    }
    // loop through N accounts/addresses
    // for each account, do a transfer of distroAmount



    // let bal = new BigNumber(1000000000000000000000000000000) // this should be owner balance from smart contract
    // let fivePerCent = bal.div(20)
    // // then we need to divide fivePerCent by the number of addresses in the file
    // let accounts = distributionAddresses.length
    // console.log(` we have ${accounts} accounts in our file`) 

}

distribute()
//module.exports = { distribute }
