import React, { Component } from 'react';
import './App.css';

import { HashRouter, Route } from 'react-router-dom';

import Navbar from './Component/Navbar/index.js';
import Homepage from './Component/Homepage/index.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
      </div>
      </HashRouter>
    );
  }
}

export default App;
