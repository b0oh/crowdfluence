import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    network: state.web3.network,
    account: state.web3.account
  };
}

export default connect(mapStateToProps)(({ network, account}) => {
  return (
    <header>
      <Link to="/">Projects</Link> |
      Network: {network} |
      Account: {account}
    </header>
  );
});
