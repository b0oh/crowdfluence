import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import Projects from './Projects';
import { provideWeb3 } from './actions/web3';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(provideWeb3());
  }

  render() {
    return (
      <Layout>
        {this.props.web3.provided ? (
          <Projects />
        ) : (
          <div>Please use MetaMask, Mist, Cipher</div>
        )}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

export default connect(mapStateToProps)(App);
