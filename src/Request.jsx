import React from 'react';

export default ({ project, request }) => (
  <div>
    <hr />
    {request.title} (<a href={request.url}>discussion</a>)
  </div>
);
