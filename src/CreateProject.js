import React, { Component } from 'react';

export default class extends Component {
  render() {
    const { project } = this.props;

    return (
      <div key={project.id}>
        {project.title}<br />
        {project.homepage}
      </div>
    );
  }
};
