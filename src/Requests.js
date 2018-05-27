import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRequests, createRequest } from './mainContract';
import { fetchProjects } from './actions/projects';
import NoMatch from './NoMatch';
import Request from './Request';

const findProject = (projects, id) => projects.find(project => project.id === id);

class Requests extends Component {
  state = {
    loaded: false,
    project: null,
    requests: []
  }

  componentWillMount() {
    this.actOnProjects(this.props.projects);
  }

  componentWillReceiveProps({ network, projects }) {
    this.actOnNetwork(network);
    this.actOnProjects(projects);
  }

  actOnNetwork(network) {
    if (network) {
      const { dispatch, account, projects } = this.props;
      if (projects.loaded) {
         this.fetchRequests(projects.projects);
      }
      else {
        dispatch(fetchProjects(network, account));
      }
    }
  }

  actOnProjects(projects) {
    if (projects) {
      if (!this.state.loaded && projects.loaded) {
        this.fetchRequests(projects.projects);
      }
    }
  }

  render() {
    const { loaded, project, requests } = this.state;

    if (!loaded) {
      return (<div>Loading</div>);
    }
    else {
      return !project ? (
          <NoMatch />
        ) : (
          <div>
            <h3>{project.title}</h3>
            {project.url}

            {requests.map(request => <Request key={request.id} project={project} request={request} />)}

            <hr />
            <form onSubmit={this.onCreate}>
              Create request
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
  }

  fetchRequests = (projects) => {
    const { network, account, match } = this.props;
    const projectId = match.params.projectId;
    const project = findProject(projects, projectId);
    if (project) {
      getRequests(network, account, projectId).then(requests => {
        this.setState({ loaded: true, project: project, requests: requests });
      });
    }
    else {
      this.setState({ loaded: true, project: null });
    }
  }

  onCreate = (event) => {
    event.preventDefault();

    const { network, account } = this.props;
    const { project, title, url } = this.state;

    createRequest(network, account, project.id, title, url);
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
    projects: state.projects
  };
}

export default connect(mapStateToProps)(Requests);
