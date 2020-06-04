import React, { Component } from 'react';
import City from "./city";
import axios from "axios";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>City Search</h1>
        <City />
      </div>
    );
  }
}

export default App;
