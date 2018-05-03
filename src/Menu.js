import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainMenu extends Component {
  render() {
    return (
      <div>Menu</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

export default connect(mapStateToProps)(MainMenu);
