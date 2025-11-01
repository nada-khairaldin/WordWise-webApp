import { createContext, useEffect, useContext, useReducer } from "react";
// we create this file to separate the Context and Provider with their used logic from components
const URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  //we don't use break with switch here , because we have used return :)
  switch (action.type) {
    // we have to choose a meaningful name for cases, not like setSth! name with /  and past simple time, shows the meaning correctly
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Unknown action type");
  }
}
function CitiesProvider({ children }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data ...",
        });
      }
    }
    fetchCities();
  }, []);

  // we didn't use useEffect to fetch data here, because fetching here is trigger with button click (an event) not component mutation (we don't need data with first rendering)
  async function getCity(id) {
    if(Number (id) === currentCity.id) return;  // to prevent city fetching with every clicking if it already exists in the list , convert id to number as it is a string coming from URL (everything in url is a string)
    
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city ...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating a city ...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
      // we use filter to delete data in a state
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error in deleting a city ...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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

export { CitiesProvider, useCities };
