pragma solidity ^0.4.19;

contract Crowdfluence {
  struct Project {
    address owner;
    string title;
    string url;
  }

  struct Request {
    string title;
    string url;
  }

  Project[] projects;
  Request[] requests;

  mapping (uint => uint[]) projectRequests;

  function getProjects() public view returns (uint[], address[], bytes32[], bytes32[]) {
    uint length = projects.length;
    uint[] memory ids = new uint[](length);
    address[] memory owners = new address[](length);
    bytes32[] memory titles = new bytes32[](length);
    bytes32[] memory urls = new bytes32[](length);

    for (uint i = 0; i < length; i++) {
      Project storage project = projects[i];
      ids[i] = i;
      owners[i] = project.owner;
      titles[i] = packString(project.title);
      urls[i] = packString(project.url);
    }

    return (ids, owners, titles, urls);
  }

  function createProject(string title, string url) public returns (uint) {
    uint projectId = projects.push(Project({
      owner: msg.sender,
      title: title,
      url: url
      })) - 1;
    return projectId;
  }

  function getRequests(uint projectId) public view returns (uint[], bytes32[], bytes32[]) {
    uint[] memory ids = projectRequests[projectId];
    uint length = ids.length;
    bytes32[] memory titles = new bytes32[](length);
    bytes32[] memory urls = new bytes32[](length);

    for (uint i = 0; i < length; i++) {
      uint id = ids[i];
      Request storage request = requests[id];
      ids[i] = id;
      titles[i] = packString(request.title);
      urls[i] = packString(request.url);
    }

    return (ids, titles, urls);
  }

  function createRequest(uint projectId, string title, string url) public returns (uint) {
    uint requestId = requests.push(Request({
      title: title,
      url: url
      })) - 1;

    projectRequests[projectId].push(requestId);
    return requestId;
  }

  function packString(string memory source) internal pure returns (bytes32 result) {
    assembly {
      result := mload(add(source, 32))
    }
  }
}
