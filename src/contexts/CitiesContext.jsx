import { createContext, useState, useEffect, useContext } from "react";
// we create this file to separate the Context and Provider with their used logic from components
const URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error in Loading data..");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // we didn't use useEffect to fetch data here, because fetching here is trigger with button click (an event) not component mutation (we don't need data with first rendering)
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error in Loading data..");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity , getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider "); // this if useCities is called by non-child component
  return context;
}


export { CitiesProvider, useCities};
