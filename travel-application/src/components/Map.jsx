import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'

function Map() {
    // get navigate hook for imparative navigation
    const navigate = useNavigate(); 

    // get latitude and logitude from search params
    const [searchParams, setSearchParams] = useSearchParams(); 
    
    const lat = searchParams.get("lat"); 
    const lng = searchParams.get("lng"); 

    return (
        <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
            Map
        </div>
    )
    
}

export default Map; 