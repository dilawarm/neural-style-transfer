import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Navbar from '../Navbar/index.js';
import { createHashHistory } from 'history';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const history = createHashHistory();

const init_styles = [
  {
    "id": -1,
    "name": "Kadinsky", 
    "link": "https://storage.googleapis.com/download.tensorflow.org/example_images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg"
  },
  {
    "id": -1,
    "name": "van Gogh", 
    "link": "https://www.outland.no/media/catalog/product/cache/6f3b753be090e58846a92333dfe1de97/9/0/9001890540363_1.jpg"
  },
  {
    "id": -1,
    "name": "Picasso", 
    "link": "https://uploads4.wikiart.org/images/pablo-picasso/mediterranean-landscape-1952.jpg!Large.jpg"
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '25ch',
  },
}));

function ChooseStyle(styles) {
  const classes = useStyles();
  const [style, setStyle] = React.useState('');
  const [image, setImage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(0);

  const handleChange = (event) => {
    if (event.target.value === "add") {
      history.push("/add")
    } else {
      setStyle(event.target.value);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSend = (event) => {
    let form_data = new FormData();
    let extension = image.name.split(".")[1];
    let filename = image.name.split(".")[0];
    let timestamp = Date.now();
    form_data.append('image', image, filename + "-" + timestamp + "." + extension);
    form_data.append('link', style);
    setLoading(1);
    axios.post("http://localhost:8000/api/uploads/", form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
    <h2 style={{display: 'flex', justifyContent: 'center'}}>Style your image</h2>
    <div style={{display: 'flex', justifyContent: 'center'}}>
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
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {styles.styles.map(style => {return <MenuItem value={style.link}>{style.name}</MenuItem>})}
          <MenuItem href="/#add" value={"add"}>Add style</MenuItem>
        </Select>
      </FormControl>
      <div style={{display: 'flex', marginTop: '2em', marginLeft: '5em'}}>
      <input type="file"
             id="image"
             onChange={handleImageChange}
             accept="image/png, image/jpeg" required/>
    </div>
    <IconButton aria-label="delete" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </div>
    {loading === 1 ? <h1>Hei</h1> : <div></div>}
    </div>
  );
}

export default class Style extends Component {
    constructor(props) {
      super(props);
      this.state = {
        styles:[]
      };
      this.loadStyles = this.loadStyles.bind(this);
    }

    componentWillMount() {
      this.loadStyles();
    }

    async loadStyles() {
      const promise = await axios.get("http://localhost:8000/api/styles/");
      const status = promise.status;
      if (status === 200) {
        const data = promise.data;
        this.setState({styles: init_styles.concat(data)});
      }
    }

    render() {
        return (
          <div>
            <Navbar where={0}/>
            <ChooseStyle styles={this.state.styles}/>   
          </div>
        );
    }
}