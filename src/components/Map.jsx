import styles from "./Map.module.css";
import { useNavigate} from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { isLoading, position, getPosition } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  // we use useEffect to let async position with lat & lng , as if we write setPosition without useEffect we will have an infinite loop of rendering
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (position) setMapPosition(position);
    },
    [position]
  );

  return (
    <div className={styles.mapContainer}>
      {/*here we construct map object */}
      <MapContainer
        center={mapPosition} // react renders the map for the initial time, then if position , zoom or any prop is changed, it will not re-render for performance issue leaflet keeps the same map even that react makes re-render... to change any prop of map we have to say this explicity by using setView()/setZoom...
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />{" "}
        {/* to set background layer of the map */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span> {city.emoji} </span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />{" "}
        {/* we have to use useMap inside a component that is a child for mapContainer to know which map object we have to point  */}
        <DetectClick />
        {!position && (
          <Button type="position" onClick={getPosition}>
            {isLoading ? "Loading..." : "Get My Location"}
          </Button>
        )}
      </MapContainer>
    </div>
  );
}

// In a component ?! because useMap is a hook, and we have to call it inside a component..
function ChangeCenter({ position }) {
  const map = useMap(); //gives us a reference to the map that we use
  map.setView(position);
  return null; //it should returns sth as it's a component
}

function DetectClick() {
  // same as center it uses hooks and should be inside a mapContainer
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), // here (e) is not event obj that comes from react , instead it is the one from leaflet, so it has a latlag attribute console.log(e)
  });
}
export default Map;
