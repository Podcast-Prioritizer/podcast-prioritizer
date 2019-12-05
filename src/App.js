import React, { Component } from 'react';
import UserDestination from './UserDestination';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      endLocation: "",
      travelTime: {},
    };
  };

  locationAndTime = (userDestination, calculatedTravelTime) => {
    this.setState({
      endLocation: userDestination,
      travelTime: calculatedTravelTime,
    })
  }

  render(){
    return(
      <UserDestination 
        locationAndTimeProp={this.locationAndTime}
        stateProp={this.state}
      />
    );
  };
};

export default App;
