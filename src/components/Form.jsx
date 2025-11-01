import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "./Spinner";
import ReactCountryFlag from "react-country-flag";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingCityName, setIsLoadingCityName] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return; // without this line, api will take our position as a default when we don't have lat or lng in the url, which we don't need
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
        } catch (err) {
          console.log("There is an error" , err.message);
        } finally {
          setIsLoadingCityName(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat,
        lng,
      },
    };
    e.preventDefault();
    createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingCityName) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag countryCode={emoji} svg />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
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
