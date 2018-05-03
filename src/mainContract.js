import web3 from './web3';
import { unpack } from './utils';
import compiled from './compiled/Crowdfluence.json';

const contractAddress = '0x33e40f6934560aE3e9d33A688Cb6c89FFf0b9CC2';
let _contract;

export default function contract() {
  if (!_contract) {
    _contract = new web3.eth.Contract(
      JSON.parse(compiled.interface),
      contractAddress
    );
  }
  return _contract;
};

export function createProject(account, title, homepage) {
  return contract().methods.createProject(title, homepage).send({
    from: account
  });
};

export function getProjects(account) {
  return contract()
    .methods.getProjects()
    .call({ from: account })
    .then(processProjects);
};

export function processProjects(json) {
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
};
