import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from './actions/projects';
import Project from './Project';

class Projects extends Component {
  render() {
    const { projects } = this.props;

    return (
      <div>
        <form onSubmit={this.onCreate}>
          Create project
          <div>
            <label>Title
              <input type='text' name='title' onChange={this.onChange} />
            </label>
          </div>
          <div>
            <label>Homepage
              <input type='text' name='homepage' onChange={this.onChange} />
            </label>
          </div>
          <div>
            <input type='submit' value='Create' />
          </div>
        </form>
        {projects.map(project => <Project key={project.id} project={project} />)}
      </div>
    );
  }

  onCreate = (event) => {
    event.preventDefault();
    const { account } = this.props;
    const { title, homepage } = this.state;

    this.props.dispatch(createProject(account, title, homepage));
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
    projects: state.projects.projects
  };
}

export default connect(mapStateToProps)(Projects);
