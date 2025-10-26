import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h2>
        Positions:{lat}, {lng}
      </h2>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 22 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

export default Map;
