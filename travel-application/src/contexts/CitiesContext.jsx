import {
  createContext,
  useEffect,
  useState,
  useContext,
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
        console.log("*** fetch all cities")
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
      console.log(`*** get city with id:${id}` )
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

  async function createCity(newCity) {

    try {
      console.log("***creating city");
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // setCurrentCity(data)
      setCities((cities) => [...cities, data]); 

    } catch {
      alert("Error loading data ...");
    }
    finally {
      setIsLoading(false);
    }
  }

    return (
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          currentCity,
          getCity,
          createCity,
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
