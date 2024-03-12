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
          className=" w-28 rounded-full bg-orange-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        />
      </form>
    ); 
}

export default SearchOrder; 