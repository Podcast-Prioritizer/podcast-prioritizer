import React, { Component } from 'react';
import Axios from 'axios';

class UserDestination extends Component{
    getMapInfo = (event) => {
        event.preventDefault();
        this.makeAxiosCall(
          this.refs.userStart.value,
          this.refs.userDestination.value
        );
    };

    makeAxiosCall = (userStart, userDestination) => {
        Axios({
            url: "https://www.mapquestapi.com/directions/v2/route",
            method: "GET",
            dataType: "json",
            params: {
                key: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
                from: userStart,
                to: userDestination,
                routeType: "bicycle"
            },
        }).then((data) => {
            this.props.locationAndTimeProp(data.data.route.locations[0].adminArea5, data.data.route.locations[1].adminArea5, data.data.route.formattedTime);
        });
    };

    render(){
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
            <p>
              {`Ur going to ${this.props.stateProp.endLocation} from
              ${this.props.stateProp.startLocation} and it will take ${this.props.stateProp.travelTime.toString()}`}
            </p>
          </div>
        );
    };
};

export default UserDestination;