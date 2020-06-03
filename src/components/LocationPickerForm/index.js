
import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';
 
/* Default position */
const defaultPosition = {
  lat: 24.822923,
  lng: 46.641962
};
 
class LocationPickerForm extends Component {
  constructor (props) {
    super(props);
 
    this.state = {
      address: "",
      position: {
         lat: 0,
         lng: 0
      }
    };
 
    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
 
  handleLocationChange ({ position, address, places }) {
 
    // Set new location
    this.setState({ position, address });
  }
 
  render () {
    return (
      <div>
        <span>{this.state.address}</span>
        <div style={{ width: '630px'}}>
          <LocationPicker
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '400px'} } /> }
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
          />
        </div>
      </div>
    )
  }
}

export default LocationPickerForm;