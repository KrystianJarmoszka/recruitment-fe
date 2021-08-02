import React from 'react';
import { useStyles } from './Styles';

export const NotFound = () => {
  const classes = useStyles();

  return <h1 className={classes.header}>404 Not found</h1>;
}
