import React, { Component } from 'react';
import Axios from 'axios';

class UserDestination extends Component {
    getMapInfo = event => {
        event.preventDefault();

    Axios.all(
    [this.makeAxiosCallBike(this.refs.userStart.value,
      this.refs.userDestination.value), 
      this.makeAxiosCallWalk(this.refs.userStart.value,
      this.refs.userDestination.value)]
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
    });
  };

  makeAxiosCallBike = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
        from: userStart,
        to: userDestination,
        routeType: "bicycle",
      }
    });
  };

    makeAxiosCallWalk = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
        from: userStart,
        to: userDestination,
        routeType: "pedestrian",
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.getMapInfo}>
          <label htmlFor="userStart">Enter Your Location</label>
          <input
            type="text"
            placeholder="lmao"
            id="userStart"
            ref="userStart"
          />
          <label htmlFor="userDestination">Enter Your Destination</label>
          <input
            type="text"
            placeholder="lmao"
            id="userDestination"
            ref="userDestination"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
};

export default UserDestination;