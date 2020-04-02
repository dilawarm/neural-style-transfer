import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Navbar from '../Navbar/index.js';
import { createHashHistory } from 'history';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import LinearProgress from '@material-ui/core/LinearProgress';

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

export default class findIdentity extends Component {

  state = {
    image: null,
    result: null,
    waiting: false,
    style: '',
    styles: [],
    open:'',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({waiting: true});
    this.forceUpdate();
    let form_data = new FormData();
    let extension = this.state.image.name.split(".")[1];
    let filename = this.state.image.name.split(".")[0];
    let timestamp = Date.now();
    form_data.append('image', this.state.image, filename + "-" + timestamp + "." + extension);
    form_data.append('link', this.state.style)
    let url = 'http://localhost:8000/api/uploads/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          this.setState({result: res.data.image.split("/media/upload_images/")[1]});
          console.log(this.state.result);
          this.setState({waiting: false});
          this.forceUpdate();
        })
        .catch(err => console.log(err))
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleChange = (event) => {
    if (event.target.value === "add") {
      history.push("/add")
    } else {
      this.setState({style: event.target.value});
    }
  };

  render() {
    if (this.state.waiting) {
      return (
        <div>
        <Navbar where={0} />
        <LinearProgress variant="query" />
        </div>
      );
    }
    else if (!this.state.result) {
      return (
        <div>
          <Navbar where={0} />
          <h1 style={{display: 'flex', justifyContent: 'center'}}>Style your image</h1>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '6em'}}>
            <FormControl style={{margin: '1', minWidth: 120, width: '25ch'}}>
              <InputLabel id="demo-controlled-open-select-label">Style</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.style}
                onChange={this.handleChange}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem href="/#add" value={"add"}><em>Add style</em></MenuItem>
                {this.state.styles.map(style => {return <MenuItem value={style.link}>{style.name}</MenuItem>})}
              </Select>
            </FormControl>
            <div style={{display: 'flex', marginTop: '2em', marginLeft: '5em'}}>
            <input type="file"
                  id="image"
                  onChange={this.handleImageChange}
                  accept="image/png, image/jpeg" required/>
          </div>
          <IconButton aria-label="delete" onClick={this.handleSubmit}>
              <SendIcon />
            </IconButton>
          </div>
          </div>
      );
    } else {
      return (
        <div className="App">
        <Navbar where={0}/>
        <h1>Result</h1>
        <img alt="styled result" src={"ai_uploads/"+this.state.result}/>
        </div>
      );
    }
  }
}