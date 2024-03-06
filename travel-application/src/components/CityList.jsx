import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'; 
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

/**
 * 
 * @param {*} cities 
 * @param {*} isLoading 
 * @returns 
 */
function CityList() {
  const { cities, isLoading } = useCities(); 

    if (isLoading) return <Spinner />; 

    // handle empty cities array
    if (!cities?.length) return <Message message="Add your first city" />;

    // for each city return a city item
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
}
export default CityList; 