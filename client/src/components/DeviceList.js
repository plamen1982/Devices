import React, { Component } from 'react';
import { graphql } from 'react-apollo'; // graphql is the tool that helping us to bind the data from the query with the component
import { getDevicesQuery } from '../queries/queries';

//components
import DeviceDetails from './DeviceDetails';

class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    renderDevices() {
        const { data: { devices } } = this.props;
        console.log(`from renderDevises`);
        console.log(this.props);
        const { data: { loading } } = this.props;
        if(loading) {
            return <div>Loading Devices...</div>
        }

        return devices.map((device) => {
            return (<li key={device.id} onClick={(e) => { this.setState({selected: device.id}) }}>{device.name}</li>)
        })
    }
  render() {
    return (
        <div>
            <ul id="book-list">
                {this.renderDevices()}
            </ul>
            <DeviceDetails deviceId={ this.state.selected }/>
        </div>
    );
  }
}

export default graphql(getDevicesQuery)(DeviceList); //when component renders the data is requested with the query and the binding with the 
                                                //component and the information from the query is stored in the this.props

//1. constructing the query
//2. binding the query result with the component