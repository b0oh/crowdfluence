import ganache from 'ganache-cli';
import Web3 from 'web3';
import { unpack } from '../utils';
import compiled from '../compiled/Crowdfluence.json';

const provider = ganache.provider({ gasLimit: 10000000 });
const web3 = new Web3(provider);

let accounts;
let contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  contract = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode })
    .send({ gas: '10000000', from: accounts[0] });

  contract.setProvider(provider);
});

describe('Crowdfluence', () => {
  it('deploys a contract', () => {
    expect(contract.options.address).toBeTruthy();
  });

  it('smoke', async () => {
    await contract.methods.createProject("Crowdfluence", "https://crowdfluence.io").send({ from: accounts[1], gas: '1000000' });
    const [project] = processProjects(await contract.methods.getProjects().call({ from: accounts[1] }));
    console.log(project);
    expect(project.homepage).toEqual("https://crowdfluence.io");
  });
});

function processProjects(json) {
  let ids = json[0];
  let owners = json[1];
  let titles = json[2];
  let homepages = json[3];

  let projects = [];

  for (let id in ids) {
    projects.push({
      id: id,
      owner: owners[id],
      title: unpack(titles[id]),
      homepage: unpack(homepages[id])
    });
  }

  return projects;
}
