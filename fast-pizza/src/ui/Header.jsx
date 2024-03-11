import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder"; 
import Username from "../features/user/Username";

function Header() {
  return (
  <header className="bg-orange-700 uppercase border-b border-zinc-700 px-4 py-3 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
      <SearchOrder/>
      <Username/>
    </header>
  )

}

export default Header;
