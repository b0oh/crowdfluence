import web3 from '../web3';
import { fetchProjects } from './projects';

export const WEB3_PROVIDED = 'WEB3_PROVIDED';
export const WEB3_ACCOUNT = 'WEB3_ACCOUNT';

function accountChanged(account) {
  return dispatch => {
    dispatch(fetchProjects(account));

    return dispatch({
      type: WEB3_ACCOUNT,
      account: account
    });
  };
}

function checkAccount(oldAccount) {
  return async dispatch => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    if (oldAccount !== account) {
      dispatch(accountChanged(account));
    }

    setTimeout(() => { dispatch(checkAccount(account)) }, 5000);
  }
}

export function provideWeb3() {
  return dispatch => {
    const provided = web3Provided();

    if (provided) {
      dispatch(checkAccount());
    }

    return dispatch({
      type: WEB3_PROVIDED,
      status: provided
    });
  };
}

function web3Provided() {
  return typeof window.web3 !== 'undefined';
}
