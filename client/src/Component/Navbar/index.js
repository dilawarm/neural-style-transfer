import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import BrushIcon from '@material-ui/icons/Brush';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles({
  root: {
  },
});

export default function Navbar(where) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction ompi={0} label="Style" icon={<BrushIcon />} />
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Add style" icon={<AssignmentIcon />} />
    </BottomNavigation>
  );
}