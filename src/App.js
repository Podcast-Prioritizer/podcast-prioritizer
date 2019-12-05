import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link, Navlink } from 'react-router-dom';

import MapQuestSearch from './MapQuestSearch'
import Header from './Header'

class App extends Component {
  constructor(){
    super();
    this.state = {
      directionInfo: {},
      endLocation: "",
    };
  };

  componentDidMount() {
    Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
        from: "Toronto",
        // Current location
        to: "Ottawa",
        // End location
        routeType: "fastest",
        // Route types will have to be "pedestrian" and "bicycle"
      },
    }).then((data) => {
      this.setState({
        directionInfo: data.data.route
      });
    });
  };
  
  getMapInfo = (event) => {
    event.preventDefault(event);
    this.setState({
      endLocation: "",
    });

    console.log(this.state.directionInfo.formattedTime);
    console.log(this.state.directionInfo.locations[0].adminArea5);
    console.log(this.state.directionInfo.locations[1].adminArea5);
  };

  render(){
    return (
      <Router>
        <Route path="/" component={Header}/>
        <Route path="/mapquestsearch" component={MapQuestSearch}/>
        
        <form onSubmit={this.getMapInfo}>
          <input type="text" placeholder="lmao" />

          <button type="submit">Search</button>
        </form>

      </Router>
    );
  };
};

export default App;
