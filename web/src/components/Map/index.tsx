import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { AiFillHeart, AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import CoffeeImg from '../../assets/coffee.png';
import { BiWorld } from 'react-icons/bi';
import './styles.scss';
import { Link } from 'react-router-dom';


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
  }, [setLocalization]);

  return (
    latitude && longitude ? (
      <MapContainer
        center={[latitude, longitude]}
        zoom={16} scrollWheelZoom={true} className="w-screen h-screen mobile:min-w-min">
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX}`}
        />
        <Marker position={[latitude, longitude]}>
          <Popup closeButton={false}>
            <div className="leaflet-popup-container">
                <div className="leaflet-popup-icon-like">
                  <AiFillHeart className="icon-heart" size={18} />
                </div>
                <Link to="/business">
                  <div className="leaflet-popup-image-container">
                    <img src={CoffeeImg} alt="Coffee" className="image" />
                  </div>
                  <div className="leaflet-popup-description">
                    <h1>Singhtglass Coffee</h1>
                    <span>Cafeteria</span>
                  </div>
              </Link>
              <div className="leaflet-social-icons">
                <BiWorld size={16} />
                <AiOutlineWhatsApp size={16} />
                <AiOutlineMail size={16} />
                <MdOutlineChatBubbleOutline size={16} />
                <AiOutlineCalculator size={16} />
              </div>
            </div>
          </Popup>
        </Marker>

        <Marker position={[-19.6020179, -43.2177258]}>
          <Popup closeButton={false}>
            <div className="leaflet-popup-container">
              <div className="leaflet-popup-icon-like">
                <AiFillHeart className="icon-heart" size={18} />
              </div>
              <div className="leaflet-popup-image-container">
                <img src={CoffeeImg} alt="Coffee" className="image" />
              </div>
              <div className="leaflet-popup-description">
                <h1>Singhtglass Coffee</h1>
                <span>Cafeteria</span>
              </div>
              <div className="leaflet-social-icons">
                <BiWorld size={16} />
                <AiOutlineWhatsApp size={16} />
                <AiOutlineMail size={16} />
                <MdOutlineChatBubbleOutline size={16} />
                <AiOutlineCalculator size={16} />
              </div>
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    ) : (
      <div></div>
    )
  )
}