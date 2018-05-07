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

export function getProjects(account) {
  return contract()
    .methods.getProjects()
    .call({ from: account })
    .then(processProjects);
};

export function createProject(account, title, url) {
  return contract().methods.createProject(title, url).send({
    from: account
  });
};

export function getRequests(account, projectId) {
  return contract()
    .methods.getRequests(projectId)
    .call({ from: account })
    .then(processRequests);
};

export function createRequest(account, projectId, title, url) {
  return contract().methods.createRequest(projectId, title, url).send({
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
