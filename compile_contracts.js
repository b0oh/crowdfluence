const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'src', 'compiled');
fs.removeSync(buildPath);

const gamePath = path.resolve(__dirname, 'contracts', 'Crowdfluence.sol');
const source = fs.readFileSync(gamePath, 'utf8');
const output = solc.compile(source, 1).contracts

fs.ensureDirSync(buildPath)

for (let contract in output) {
  let contractPath = path.resolve(buildPath, contract.replace(':', '') + '.json')
  fs.outputJsonSync(contractPath, output[contract])
}
