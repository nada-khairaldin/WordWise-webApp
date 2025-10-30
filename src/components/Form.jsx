import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "./Spinner";
import ReactCountryFlag from "react-country-flag";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingCityName, setIsLoadingCityName] = useState(false);
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      async function fetchCity() {
        try {
          setIsLoadingCityName(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch {
          console.log("There is an error");
        } finally {
          setIsLoadingCityName(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );

  if (isLoadingCityName) return <Spinner />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag countryCode={emoji} svg />{" "}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
