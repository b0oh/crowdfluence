import { getProjects, createProject as _createProject } from '../mainContract';

export const PROJECTS_RECEIVED = 'PROJECTS_RECEIVED';
export const PROJECTS_CREATE = 'PROJECTS_CREATE';
export const PROJECTS_CREATE_REQUESTED = 'PROJECTS_CREATE_REQUESTED';

function createProjectRequested() {
  return {
    type: PROJECTS_CREATE_REQUESTED
  };
}

function receiveProjects(projects) {
  console.log('PROJECTS', projects);

  return {
    type: PROJECTS_RECEIVED,
    projects: projects
  };
}

export function createProject(account, title, homepage) {
  return dispatch => {
    return _createProject(account, title, homepage).then(() => dispatch(createProjectRequested()));
  };
};

export function fetchProjects(account) {
  return dispatch => {
    return getProjects(account)
      .then(projects => dispatch(receiveProjects(projects)));
  };
};
