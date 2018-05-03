import React, { Component } from 'react';

export default class extends Component {
  render() {
    const { project } = this.props;

    return (
      <div>
        <hr />
        {project.title}<br />
        {project.homepage}
      </div>
    );
  }
};
