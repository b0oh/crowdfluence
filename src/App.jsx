import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import NoMatch from './NoMatch';
import Menu from './Menu';
import Projects from './Projects';
import Requests from './Requests';
import { provideWeb3 } from './actions/web3';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(provideWeb3());
  }

  render() {
    return this.props.web3.provided ? (
      <Fragment>
        <Menu />

        <main>
          <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/projects/:projectId" component={Requests} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </Fragment>
    ) : (
      <div>Please use MetaMask, Mist, Cipher</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

export default withRouter(connect(mapStateToProps)(App));
