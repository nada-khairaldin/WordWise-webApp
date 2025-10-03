import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
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
      {uniqueCities.map((city) => (
        <CountryItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CountryList;
