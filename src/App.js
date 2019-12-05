import React, { Component } from 'react';
import UserDestination from './UserDestination';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      startLocation: "",
      endLocation: "",
      travelTime: {},
    };
  };

  locationAndTime = (userStart, userDestination, calculatedTravelTime) => {
    this.setState({
      startLocation: userStart,
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
