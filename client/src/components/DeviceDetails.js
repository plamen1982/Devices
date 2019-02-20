import React, { Component } from "react";
import { graphql } from "react-apollo"; // graphql is the tool that helping us to bind the data from the query with the component
import { getDeviceQuery } from '../queries/queries';

class DeviceDetails extends Component {

    renderDeviceDetails() {
        const { data: { device } } = this.props;
        console.log('from renderDevideDetails');
        console.log(this.props);
        if(device) {
        const { data: { device: { user: { devices } } } } = this.props;
            return (
                <div>
                    <h2>Device name: {device.name}</h2>
                    <p>Model: {device.model}</p>
                    <p>Created by User: {device.user.name}</p>
                    <p>All Devices created by this user:</p>
                    <ul className="other-books">
                        {devices.map(device => <li key={device.id}>{device.name}</li>)}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No Device selected...</div>
            )
        }
    }

  render() {


    return (
        <div id="book-details">
            {this.renderDeviceDetails()}
        </div>
    );
  }
}

export default graphql(getDeviceQuery, {
    options: (props) => { 
        return {
            variables: {
                id: props.deviceId
            }
        }
     }
})(DeviceDetails); //when component renders the data is requested with the query and the binding with the 
                                                //component and the information from the query is stored in the this.props

//1. constructing the query - getDeviceQuery
//2. binding the query result with the component - graphql(getDeviceQuery)(DeviceDetails)