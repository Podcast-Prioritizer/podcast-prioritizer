import React, { Component } from 'react';
import Header from './Header'
import MapQuestSearch from './MapQuestSearch';
import Podcast from "./Podcast";
import ComparisonResults from './ComparisonResults';
import Footer from "./Footer";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';

class App extends Component {
  constructor(){
    super();
    this.state = {
      startAndEndLocations: {},
      bikingTime: "",
      walkingTime: "",
      podcastTime: "",
      podcastEpisode: {},
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

  setPodcastTime = (returnedPodcastTime) => {
    this.setState({
      podcastTime: returnedPodcastTime,
    })
  }

  selectedEpisode = (podcastEpisode) => {
    this.setState({
      podcastEpisode: podcastEpisode,
    })
  }

  closeResults = () => {
    this.setState({
      podcastTime: ""
    });
  }

  render(){
    const mapQuestApiKey = "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn";
    console.log(this.state)
    return (
      <Router>
        <Route path="/" component={Header} />

        <MapQuestSearch
          setLocationsProp={this.setLocations}
          setBikeTimeProp={this.setBikeTime}
          setWalkTimeProp={this.setWalkTime}
          apiKey={mapQuestApiKey}
          stateProp={this.state}
        />

        
        <Podcast
          setPodcastTime={this.setPodcastTime}
          selectedEpisodeProp={this.selectedEpisode}
        />

        { this.state.podcastEpisode ? 
        <ComparisonResults 
          results={this.state}
          closeResultsProp={this.closeResults}
        />
        : null }

        <Route path="/" component={Footer}/>
      </Router>
    );
  };
};

export default App;