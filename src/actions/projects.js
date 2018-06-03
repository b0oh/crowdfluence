import { getProjects, createProject as _createProject } from '../mainContract';

export const PROJECTS_RECEIVED = 'PROJECTS_RECEIVED';
export const PROJECTS_CREATE = 'PROJECTS_CREATE';
export const PROJECTS_CREATE_REQUESTED = 'PROJECTS_CREATE_REQUESTED';

function createProjectRequested() {
  return {
    type: PROJECTS_CREATE_REQUESTED,
  };
}

function receiveProjects(projects) {
  return {
    type: PROJECTS_RECEIVED,
    projects,
  };
}

export function createProject(network, account, title, homepage) {
  return dispatch => _createProject(network, account, title, homepage)
    .then(() => dispatch(createProjectRequested()));
}

export function fetchProjects(network, account) {
  return dispatch => getProjects(network, account)
    .then(projects => dispatch(receiveProjects(projects)));
}
