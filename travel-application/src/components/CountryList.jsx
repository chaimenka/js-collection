import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from './Spinner'; 
import Message from './Message';

  /* eslint no-unused-vars: "warn" */

function CountryList(city, isLoading) {

    if (isLoading) return <Spinner />; 

    // handle empty country array
    if (!city?.length) return <Message message="Add your first country" />;

  // add new element to array, if its city is not already included
  const countries = city.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []); 

    return (
      <ul className={styles.countriesList}>
        {countries.map((country) => (
          <CountryItem country={country} key={Date()}/>
        ))}
      </ul>
    );
}
export default CountryList; 