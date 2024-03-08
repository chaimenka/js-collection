import { useState } from "react";
import { useNavigate } from "react-router";

function SearchOrder() {
    const [query, setQuery] = useState(""); 
    const navigate = useNavigate(); 

    /** navigate to page with query id */
    function handleSubmit(e) {
        e.preventDefault(); 

        navigate(`/order/${query}`); 
        setQuery(""); 
    }
    

    return (
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    ); 
}

export default SearchOrder; 