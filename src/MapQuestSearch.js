import React, { Component } from 'react';
import Axios from 'axios';

class MapQuestSearch extends Component {
    // On form submit, take both user inputs and make axios call to retrieve travel time (walking and biking)
    getMapInfo = event => {
        event.preventDefault();

      Axios.all(
      [
        this.makeAxiosCallBike(this.refs.userStart.value,
        this.refs.userDestination.value), 
        this.makeAxiosCallWalk(this.refs.userStart.value,
        this.refs.userDestination.value)
      ]
      // When axios data is returned, set locations and formatted time to state
    ).then((responseArray) => {
        const returnLocationInfo = responseArray[0].data.route.locations;

        let locationObject = {
          startAddress: returnLocationInfo[0].street,
          startCity: returnLocationInfo[0].adminArea5,
          endAddress: returnLocationInfo[1].street,
          endCity: returnLocationInfo[1].adminArea5,
        };

        this.props.setLocationsProp(locationObject);
        this.props.setBikeTimeProp(responseArray[0].data.route.formattedTime);
        this.props.setWalkTimeProp(responseArray[1].data.route.formattedTime);
        console.log(this.props.stateProp);
        // Very simple (and flawed) catch if either call fails
    }).catch(() => {
      console.log(`Don't go to ${this.refs.userDestination.value}`);
    });
  };

  makeAxiosCallBike = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        from: userStart,
        to: userDestination,
        routeType: "bicycle",
      },
    });
  };

    makeAxiosCallWalk = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        from: userStart,
        to: userDestination,
        routeType: "pedestrian",
      },
    });
  };

  // Autocomplete axios call on input keydown (US only 😫)
  autoCompleteDestination = () => {
    return Axios({
      url: "http://www.mapquestapi.com/search/v3/prediction",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        q: this.refs.userDestination.value,
        collection: "address",
      },
    }).then((data) => {
      let slicedSuggestionArray = data.data.results.slice(0, 3);

      slicedSuggestionArray.map((suggestion) => {
        console.log(suggestion.displayString);
      });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.getMapInfo}>
          <label htmlFor="userStart" className="visuallyHidden">
            Enter Your Location
          </label>
          <input
            type="text"
            placeholder="Ur location"
            id="userStart"
            ref="userStart"
          />
          <label htmlFor="userDestination" className="visuallyHidden">
            Enter Your Destination
          </label>
          <input
            type="text"
            placeholder="Ur destination"
            id="userDestination"
            ref="userDestination"
            onKeyDown={this.autoCompleteDestination}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  };
};

export default MapQuestSearch;