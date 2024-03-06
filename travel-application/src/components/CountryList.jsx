import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from './Spinner'; 
import Message from './Message';
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities(); 

    if (isLoading) return <Spinner />; 

    // handle empty country array
    if (!cities?.length) return <Message message="Add your first country" />;

  // add new element to array, if its city is not already included
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []); 

    return (
      <ul className={styles.countriesList}>
        {countries.map((country) => (
          <CountryItem country={country} key={Math.random()}/>
        ))}
      </ul>
    );
}
export default CountryList; 