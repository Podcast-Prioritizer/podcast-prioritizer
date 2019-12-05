import React, { Component } from 'react';
import UserDestination from './UserDestination';
import './App.css';

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
    return(
      <UserDestination 
        setLocationsProp={this.setLocations}
        setBikeTimeProp={this.setBikeTime}
        setWalkTimeProp={this.setWalkTime}
        stateProp={this.state}
      />
    );
  };
};

export default App;
