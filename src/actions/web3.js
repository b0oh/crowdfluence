import web3 from '../web3';

export const WEB3_PROVIDED = 'WEB3_PROVIDED';
export const WEB3_ACCOUNT = 'WEB3_ACCOUNT';

function accountChanged(account, network) {
  return {
    type: WEB3_ACCOUNT,
    account: account,
    network: network
  };
}

function checkAccount(oldAccount, oldNetwork) {
  return async dispatch => {

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const network = await web3.eth.net.getNetworkType();


    if (oldAccount !== account || oldNetwork !== network) {
      dispatch(accountChanged(account, network));
    }

    setTimeout(() => { dispatch(checkAccount(account, network)) }, 5000);
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
