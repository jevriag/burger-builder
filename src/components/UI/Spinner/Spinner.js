import React from 'react';

import classes from './Spinner.css';
// showing spinner to the user while the request is on its way
const spinner = () => (
  <div className={classes.Loader}>Loading...</div>
);

export default spinner;
