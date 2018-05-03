const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const compiled = require('./src/compiled/Crowdfluence.json');

(async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log('Attempting to deploy from account', account);

  const result = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode })
    .send({ gas: '10000000', from: account });

  console.log('Contract deployed to:', result.options.address);
})();
