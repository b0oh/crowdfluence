import web3 from './web3';
import { unpack } from './utils';
import compiled from './compiled/Crowdfluence.json';


const addresses = {
  'ropsten': '0xf0ea450441d67b501f769adb10fc43ecfdf251dc',
  'private': '0x33e40f6934560aE3e9d33A688Cb6c89FFf0b9CC2'
};

let _contracts = {};

export default function contract(network) {
  if (!_contracts[network]) {
    _contracts[network] = new web3.eth.Contract(
      JSON.parse(compiled.interface),
      addresses[network]
    );
  }
  return _contracts[network];
};

export function getProjects(network, account) {

  return contract(network)
    .methods.getProjects()
    .call({ from: account })
    .then(processProjects);
};

export function createProject(network, account, title, url) {
  return contract(network).methods.createProject(title, url).send({
    from: account
  });
};

export function getRequests(network, account, projectId) {
  return contract(network)
    .methods.getRequests(projectId)
    .call({ from: account })
    .then(processRequests);
};

export function createRequest(network, account, projectId, title, url) {
  return contract(network).methods.createRequest(projectId, title, url).send({
    from: account
  });
};

export function processProjects(json) {
  let ids = json[0];
  let owners = json[1];
  let titles = json[2];
  let urls = json[3];

  let projects = [];

  for (let id in ids) {
    projects.push({
      id: id,
      owner: owners[id],
      title: unpack(titles[id]),
      url: unpack(urls[id])
    });
  }

  return projects;
};

export function processRequests(json) {
  let ids = json[0];
  let titles = json[1];
  let urls = json[2];

  let requests = [];

  for (let id in ids) {
    requests.push({
      id: id,
      title: unpack(titles[id]),
      url: unpack(urls[id])
    });
  }

  return requests;
};
