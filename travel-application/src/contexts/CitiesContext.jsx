import {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};


function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); 

  /** load on mount */
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error in getting cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);


  async function getCity(id) {
    try {
      setIsLoading(true); 
      const res = await fetch(`${BASE_URL}/cities/${id}`); 
      const data = await res.json(); 
      setCurrentCity(data); 
    } catch {
      alert("error loading city data"); 
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) /** is place child fct of provider? */
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
