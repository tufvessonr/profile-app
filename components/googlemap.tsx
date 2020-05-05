import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

const AnyReactComponent = ({ text, lat, lng }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '0.75em 0.5em',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);

interface ISimpleMap {
  lat: number;
  lng: number;
  zoom: number;
  text: string;
}
class SimpleMap extends Component<ISimpleMap> {
  
  render() {
    const {  text, zoom } = this.props;
    
    const lat = -33.934231 + Math.random()/10;
    const lng = 18.490831 + Math.random()/10;

    // The mock data had incalid coordinates so...
    const coordinates = {lat, lng};
    
    return (
      <GoogleMapReact defaultCenter={coordinates} defaultZoom={zoom}>
        <AnyReactComponent 
          lat={coordinates.lat} 
          lng={coordinates.lng} 
          text={text} 
        />
      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
