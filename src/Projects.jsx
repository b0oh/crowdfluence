import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, createProject } from './actions/projects';
import Project from './Project';

class Projects extends Component {
  componentWillMount() {
    //const { dispatch, network, account, loaded } = this.props;

    //if (!loaded && network) {
    //  dispatch(fetchProjects(network, account));
    //}
  }

  componentWillReceiveProps({ network }) {
    if (network) {
      const { dispatch, account, loaded } = this.props;
      if (!loaded) {
        dispatch(fetchProjects(network, account));
      }
    }
  }

  render() {
    const { projects } = this.props;

    return (
      <div>
        {projects.map(project => <Project key={project.id} project={project} />)}

        <hr />
        <form onSubmit={this.onCreate}>
          Create project
          <div>
            <label>Title
              <input type='text' name='title' onChange={this.onChange} />
            </label>
          </div>
          <div>
            <label>Url
              <input type='text' name='url' onChange={this.onChange} />
            </label>
          </div>
          <div>
            <input type='submit' value='Create' />
          </div>
        </form>
      </div>
    );
  }

  onCreate = (event) => {
    event.preventDefault();
    const { dispatch, network, account } = this.props;
    const { title, url } = this.state;

    dispatch(createProject(network, account, title, url));
  };

  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
}

function mapStateToProps(state) {
  return {
    network: state.web3.network,
    account: state.web3.account,
    loaded: state.projects.loaded,
    projects: state.projects.projects
  };
}

export default connect(mapStateToProps)(Projects);
