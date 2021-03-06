import React from 'react';
import { compose, withProps } from 'recompose';
import MapDirection from './map-direction';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#64779e' }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry.stroke', stylers: [{ color: '#334e87' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#023e58' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6f9ba5' }] },
  { featureType: 'poi', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#023e58' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#3C7680' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
  { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2c6675' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b0d5ce' }] },
  { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#023e58' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
  { featureType: 'transit', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'transit.line', elementType: 'geometry.fill', stylers: [{ color: '#283d6a' }] },
  { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#3a4762' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4e6d70' }] }
];

const purpleMarker = { url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png' };
const pinkMarker = { url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png' };
const carMarker = { url: 'http://maps.google.com/mapfiles/ms/icons/cabs.png' };

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAC9Fi6o6spd5c8WnclK_FJj1z1wfkl26g&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  (
    <>
      {props.coordinates
        ? <GoogleMap
          defaultOptions={{
            styles: MapStyles
          }}
          zoom={props.zoom}
          defaultZoom={10}
          defaultCenter={props.coordinates}
          center={props.coordinates}>
          {props.marker && props.origin &&
            <Marker
              icon={purpleMarker}
              clickable={false}
              position={props.origin}
            /> }
          {props.marker && props.destination &&
            <Marker
              icon={pinkMarker}
              clickable={false}
              position={props.destination}
            />}
          {props.marker && props.rider &&
            <Marker
              icon={carMarker}
              clickable={false}
              position={props.rider}
            />}
          {props.origin && props.destination &&
            <MapDirection
              color={'#ea39ba'}
              places={[props.origin, props.destination]}
              travelMode={window.google.maps.TravelMode.DRIVING} />}
          {props.rider && props.origin &&
            <MapDirection
              color={'#af8cf4'}
              places={[props.rider, props.origin]}
              travelMode={window.google.maps.TravelMode.DRIVING} />}
        </GoogleMap>
        : ''}
    </>
  ));

function MapContainer(props) {
  return (
    <MapComponent
      zoom={props.zoom}
      marker={props.marker}
      origin={props.origin}
      rider={props.rider}
      destination={props.destination}
      coordinates={props.coordinates}
      key="map"
    />);
}

export default MapContainer;
