import React, { Component } from 'react';
import './App.css';

import { HashRouter, Route } from 'react-router-dom';

import Homepage from './Component/Homepage/index.js';
import Style from './Component/Style/index.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Homepage} />
          <Route path="/style" excact component={Style} />
        </div>
      </HashRouter>
    );
  }
}

export default App;