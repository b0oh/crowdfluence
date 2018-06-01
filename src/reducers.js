import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { WEB3_PROVIDED, WEB3_ACCOUNT } from './actions/web3';
import { PROJECTS_RECEIVED } from './actions/projects';

const web3InitialState = {
  provided: false,
  account: '',
  network: '',
};

function web3(state = web3InitialState, action) {
  switch (action.type) {
    case WEB3_PROVIDED:
      return {
        ...state,
        provided: action.status,
      };
    case WEB3_ACCOUNT:
      return {
        ...state,
        account: action.account,
        network: action.network,
      };
    default:
      return state;
  }
}

const projectsInitialState = {
  projects: [],
  loaded: false,
};

function projects(state = projectsInitialState, action) {
  switch (action.type) {
    case PROJECTS_RECEIVED:
      return {
        ...state,
        projects: action.projects,
        loaded: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  web3,
  projects,
  routing: routerReducer,
});
