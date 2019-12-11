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
      mapQuestApiKey: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
      startAndEndLocations: {},
      bikingTime: "",
      walkingTime: "",
      podcastTime: "",
      podcastEpisode: {},
      map: ""
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

  directionsMap = (userMap) => {
    this.setState({
      map: userMap
    });
  }

  render(){
    return (
      <Router>
        <Route path="/" component={Header} />

        <div className="Search__formArea">
          <MapQuestSearch
            setLocationsProp={this.setLocations}
            setBikeTimeProp={this.setBikeTime}
            setWalkTimeProp={this.setWalkTime}
            apiKey={this.state.mapQuestApiKey}
            stateProp={this.state}
            mapProp={this.directionsMap}
          />
  
          { this.state.bikingTime ?
            <Podcast
              setPodcastTime={this.setPodcastTime}
              selectedEpisodeProp={this.selectedEpisode}
            />
            : null }
          
  
          { this.state.podcastEpisode ? 
          <ComparisonResults 
            results={this.state}
            closeResultsProp={this.closeResults}
          />
          : null }
        </div>

        <Route path="/" component={Footer}/>
      </Router>
    );
  };
};

export default App;