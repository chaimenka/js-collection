import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'; 
import Message from './Message';

function CityList(cities, isLoading) {

    //if (isLoading) return <Spinner />; 
    console.log(isLoading)
    const citiesFixed = cities.cities; 
    
    if (cities.isLoading) return <Spinner />; 

    // handle empty cities array
    if (!citiesFixed.length) return (<Message message="Add your first city" />);

    return (
      <ul className={styles.cityList}>
        {citiesFixed.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
}
export default CityList; 