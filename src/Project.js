import React from 'react';
import { Link } from 'react-router-dom';

export default ({ project }) => (
  <div>
    <hr />
    <Link to={`/projects/${project.id}`}>{project.title} ({project.url})</Link>
  </div>
);
