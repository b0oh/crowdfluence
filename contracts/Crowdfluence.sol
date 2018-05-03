pragma solidity ^0.4.19;

contract Crowdfluence {
  struct Project {
    address owner;
    string title;
    string homepage;
  }

  Project[] projects;

  function getProjects() public view returns (uint[], address[], bytes32[], bytes32[]) {
    uint length = projects.length;
    uint[] memory ids = new uint[](length);
    address[] memory owners = new address[](length);
    bytes32[][4] memory titles = new bytes32[][4](length);
    bytes32[][4] memory homepages = new bytes32[][4](length);

    for (uint i = 0; i < length; i++) {
      Project storage project = projects[i];
      ids[i] = i;
      owners[i] = project.owner;
      titles[i] = packString(project.title);
      homepages[i] = packString(project.homepage);
    }

    return (ids, owners, titles, homepages);
  }

  function createProject(string title, string homepage) public returns (uint) {
    uint projectId = projects.push(Project({
      owner: msg.sender,
      title: title,
      homepage: homepage
      })) - 1;
    return projectId;
  }

  function packString(string memory source) internal pure returns (bytes32 result) {
    assembly {
      result := mload(add(source, 32))
    }
  }
}
