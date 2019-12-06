import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Podcast from './Podcast'
import Episode from './Episode'
import {BrowserRouter as Router, Route} from 'react-router-dom'

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
    return(
      <Router>
          <div>
            <form onSubmit={this.getMapInfo}>
              <input type="text" placeholder="lmao" />
              <button type="submit">Search</button>
            </form>
            <Podcast/>
        </div>
      </Router>
    );
  };
};

export default App;
