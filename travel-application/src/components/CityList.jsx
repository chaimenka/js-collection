import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'; 
import Message from './Message';

/**
 * 
 * @param {*} cities 
 * @param {*} isLoading 
 * @returns 
 * @todo fix prop issue
 */
function CityList(cities, isLoading) {

    console.log(cities)
    if (cities.isLoading) return <Spinner />; 

    // handle empty cities array
    if (!cities?.cities?.length) return <Message message="Add your first city" />;

    // for each city return a city item
    return (
      <ul className={styles.cityList}>
        {cities?.cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
}
export default CityList; 