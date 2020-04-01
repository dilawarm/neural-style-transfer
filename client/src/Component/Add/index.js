import React, { Component } from "react";
import Navbar from '../Navbar/index.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleError = () => {
    setError(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
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
        .catch(err => {
          handleError();
        });
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <br></br><br></br>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Style uploaded
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          Something went wrong
        </Alert>
      </Snackbar>
      <h2>Add Style</h2>
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