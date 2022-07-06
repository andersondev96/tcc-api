import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { fetchLocalMapBox } from '../utils/apiMapBox';

interface Position {
  latitude: number | undefined;
  longitude: number | undefined;
}

export const Map: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function setLocalization() {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  useEffect(() => {
    setLocalization();
    console.log(latitude);
    console.log(longitude);
  }, [setLocalization]);

  return (
    latitude && longitude ? (
      <MapContainer
        center={[latitude, longitude]}
        zoom={13} scrollWheelZoom={true} style={{ width: '100vw', height: '100vh' }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX}`}
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Latitude: {latitude} <br/>
            Longitude: {longitude}
          </Popup>
        </Marker>

        <Marker position={[-19.6020179,-43.2177258]}>
          <Popup>
            Latitude: {latitude} <br/>
            Longitude: {longitude}
          </Popup>
        </Marker>
        
      </MapContainer>
    ) : (
      <div></div>
    )
  )
}