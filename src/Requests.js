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
    const { dispatch, account, projects, match } = this.props;
    if (projects.loaded) {
      this.fetchRequests(projects.projects, match.params.projectId);
    }
    else {
      dispatch(fetchProjects(account));
    }
  }

  componentWillReceiveProps({ projects }) {
    const { loaded } = this.state;
    if (!loaded && projects && projects.loaded) {
      this.fetchRequests(projects.projects, this.props.match.params.projectId);
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

  fetchRequests = (projects, projectId) => {
    const { account } = this.props;
    const project = findProject(projects, projectId);
    if (project) {
      getRequests(account, projectId).then(requests => {
        this.setState({ loaded: true, project: project, requests: requests });
      });
    }
    else {
      this.setState({ loaded: true, project: null });
    }
  }

  onCreate = (event) => {
    event.preventDefault();

    const { account } = this.props;
    const { project, title, url } = this.state;

    createRequest(account, project.id, title, url);
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
    account: state.web3.account,
    projects: state.projects
  };
}

export default connect(mapStateToProps)(Requests);
