import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Navbar from '../Navbar/index.js';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function ChooseStyle() {
  const classes = useStyles();
  const [style, setStyle] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Button className={classes.button} onClick={handleOpen}>
        Choose your style
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Style</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={style}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div style={{display: 'flex', marginTop: '2em'}}>
      <input type="file"
             id="image"
             accept="image/png, image/jpeg" required/>
    </div>
    </div>
    
  );
}



export default class Style extends Component {
    render() {
        return (
          <div>
            <Navbar where={0}/>
            <ChooseStyle where={0} />   
          </div>
        );
    }
}