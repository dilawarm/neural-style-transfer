import React, { Component } from "react";
import Navbar from '../Navbar/index.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function MultilineTextFields() {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleURLChange = (event) => {
      setUrl(event.target.value);
  };

  const handleSend = (event) => {
      console.log(name);
      console.log(url);
      let form_data = new FormData();
      form_data.append('name', name);
      form_data.append('link', url);
      axios.post('http://localhost:8000/api/styles/', form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          setName('');
          setUrl('');
          handleClick();
        })
        .catch(err => console.log(err));
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Style uploaded
        </Alert>
      </Snackbar>
      <ThemeProvider theme={theme}>
            <Typography variant="h2">Upload style</Typography>
        </ThemeProvider>
      </div>
      <br></br>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <TextField
          id="outlined-textarea"
          label="Style name"
          placeholder="Kadinsky"
          value={name}
          multiline
          variant="outlined"
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-textarea"
          label="URL to style image"
          value={url}
          multiline
          variant="outlined"
          onChange={handleURLChange}
        />
        <IconButton aria-label="delete" onClick={handleSend}>
        <SendIcon />
      </IconButton>
      </div>
    </form>
  );
}

export default class Add extends Component {
    render() {
        return (
          <div>
            <Navbar where={2}/>
            <MultilineTextFields />
          </div>
        );
    }
}