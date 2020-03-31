import React from "react";
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
  const [value, setValue] = React.useState(where.where);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction href = "#/style" label="Style" icon={<BrushIcon />} />
      <BottomNavigationAction href = "#/" label="Home" icon={<Home />} />
      <BottomNavigationAction href = "#/add" label="Add style" icon={<AssignmentIcon />} />
    </BottomNavigation>
  );
}