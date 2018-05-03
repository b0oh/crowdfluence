import React, { Fragment } from 'react';
import Menu from './Menu.js';

export default props => {
  return (
    <Fragment>
      <Menu />
      <div>
        {props.children}
      </div>
    </Fragment>
  );
};
