import web3 from './web3';
import { unpack } from './utils';
import compiled from './compiled/Crowdfluence.json';


const addresses = {
  ropsten: '0xf0ea450441d67b501f769adb10fc43ecfdf251dc',
  private: '0x33e40f6934560aE3e9d33A688Cb6c89FFf0b9CC2',
};

const _contracts = {};

export default function contract(network) {
  if (!_contracts[network]) {
    _contracts[network] = new web3.eth.Contract(
      JSON.parse(compiled.interface),
      addresses[network],
    );
  }
  return _contracts[network];
}

export function getProjects(network, account) {
  return contract(network)
    .methods.getProjects()
    .call({ from: account })
    .then(processProjects);
}

export function createProject(network, account, title, url) {
  return contract(network).methods.createProject(title, url).send({
    from: account,
  });
}

export function getRequests(network, account, projectId) {
  return contract(network)
    .methods.getRequests(projectId)
    .call({ from: account })
    .then(processRequests);
}

export function createRequest(network, account, projectId, title, url) {
  return contract(network).methods.createRequest(projectId, title, url).send({
    from: account,
  });
}

export function processProjects(json) {
  const ids = json[0];
  const owners = json[1];
  const titles = json[2];
  const urls = json[3];

  const projects = [];

  for (const id in ids) {
    projects.push({
      id,
      owner: owners[id],
      title: unpack(titles[id]),
      url: unpack(urls[id]),
    });
  }

  return projects;
}

export function processRequests(json) {
  const ids = json[0];
  const titles = json[1];
  const urls = json[2];

  const requests = [];

  for (const id in ids) {
    requests.push({
      id,
      title: unpack(titles[id]),
      url: unpack(urls[id]),
    });
  }

  return requests;
}
