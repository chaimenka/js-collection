import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'; 
import Message from './Message';

  /* eslint no-unused-vars: "warn" */
function CityList(cities, isLoading) {
    console.log(isLoading)
    if (isLoading) return <Spinner />; 

    // handle empty cities array
    if (!cities.length) return <Message message="Add your first city" />;

    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
}
export default CityList; 