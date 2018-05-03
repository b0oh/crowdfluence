import { combineReducers } from 'redux';
import { WEB3_PROVIDED, WEB3_ACCOUNT } from './actions/web3';
import { PROJECTS_RECEIVED } from './actions/projects';

const web3InitialState = {
  provided: false,
  account: ''
};

function web3(state = web3InitialState, action) {
  switch (action.type) {
    case WEB3_PROVIDED:
      return {
        ...state,
        provided: action.status
      };
    case WEB3_ACCOUNT:
      return {
        ...state,
        account: action.account
      };
    default:
      return state;
  }
}

const projectsInitialState = {
  projects: []
};

function projects(state = projectsInitialState, action) {
  switch (action.type) {
    case PROJECTS_RECEIVED:
      return {
        ...state,
        projects: action.projects
      };
    default:
      return state;
  }
};

export default combineReducers({
  web3,
  projects
});
