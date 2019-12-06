import React, { Component } from 'react';
import Header from './Header'
import MapQuestSearch from './MapQuestSearch';
import Podcast from "./Podcast";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';


class App extends Component {
  constructor(){
    super();
    this.state = {
      startAndEndLocations: {},
      bikingTime: "",
      walkingTime: "",
    };
  };

  setBikeTime = (returnedBikingTime) => {
    this.setState({
      bikingTime: returnedBikingTime,
    })
  }

  setWalkTime = (returnedWalkingTime) => {
    this.setState({
      walkingTime: returnedWalkingTime,
    });
  }

  setLocations = (locationObject) => {
    this.setState({
      startAndEndLocations: locationObject,
    })
  }

  render(){
    const mapQuestApiKey = "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn";
    return (
      <Router>
        <Route path="/" component={Header} />
        <Route
          path="/mapquestsearch"
          render={() => {
            return (
              <MapQuestSearch
                setLocationsProp={this.setLocations}
                setBikeTimeProp={this.setBikeTime}
                setWalkTimeProp={this.setWalkTime}
                apiKey={mapQuestApiKey}
                stateProp={this.state}
              />
            );
          }}
        />
        
        <form onSubmit={this.getMapInfo}>
          <input type="text" placeholder="lmao" />
          <button type="submit">Search</button>
        </form>

        
        <Podcast/>
      </Router>
    );
  };
};

export default App;