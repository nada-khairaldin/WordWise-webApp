import styles from "./City.module.css";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams(); // we destructure it with the name of the parameter that we gave in router i.e id in cities/:id
  const { getCity, currentCity, isLoading } = useCities();

  // here we use the useEffect as we need it to fetch data directly with city component mutation(city mutation -with-> click button )
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  // if we didn't write this line, then in the beginning of each load the last city info will be displayed until the info of the new city is fetched
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
