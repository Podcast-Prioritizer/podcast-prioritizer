import React, { Component } from 'react';
import Axios from 'axios';

class UserDestination extends Component{
    getMapInfo = (event) => {
        event.preventDefault();
        this.makeAxiosCall(this.refs.userDestination.value);
    };

    makeAxiosCall = (userDestination) => {
        Axios({
            url: "https://www.mapquestapi.com/directions/v2/route",
            method: "GET",
            dataType: "json",
            params: {
                key: "uMDO6BJLrXNNrJI5BZ7A0tFS6AojdBjn",
                from: "483 Queen St W, Toronto, ON",
                to: userDestination,
                routeType: "bicycle"
            },
        }).then((data) => {
            this.props.locationAndTimeProp(data.data.route.locations[1].adminArea5, data.data.route.formattedTime)
        });
    };

    render(){
        return(
            <div>
                <form onSubmit={this.getMapInfo}>
                    <input 
                        type="text" 
                        placeholder="lmao"
                        ref="userDestination" />
                    <button type="submit">Search</button>
                </form>
                <p>Ur going to {this.props.stateProp.endLocation} from 483 Queen St W, Toronto, ON and it will take {this.props.stateProp.travelTime.toString()}</p>
            </div>
        );
    };
};

export default UserDestination;