import styles from "./CountryList.module.css";
import Spinner from "../spinner/Spinner";
import Message from "../message/Message";
import CountryItem from "../countryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext"

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  const uniqueCities = cities.filter(
    (city, index, self) =>
      index === self.findIndex((c) => c.country === city.country)
  );

  return (
    <ul className={styles.countryList}>
      {uniqueCities &&
        uniqueCities.map((city) => <CountryItem key={city.id} city={city} />)}
    </ul>
  );
}

export default CountryList;
