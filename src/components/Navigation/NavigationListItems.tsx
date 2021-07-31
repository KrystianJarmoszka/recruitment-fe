import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HouseIcon from '@material-ui/icons/House';
import BuildIcon from '@material-ui/icons/Build';

export const NavigationListItems = () => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem button component={Link} to={"/jobs"}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Jobs" />
      </ListItem>
      <ListItem button component={Link} to={"/properties"}>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Properties" />
      </ListItem>
    </List>
  );
}
