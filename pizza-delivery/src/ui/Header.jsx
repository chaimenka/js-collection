import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder"; 
import Username from "../features/user/Username";

function Header() {
  return (
  <header className="bg-orange-600 uppercase border-b border-zinc-700 px-4 py-3 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">Pizza Delivery Co.</Link>
      <Username/>
      <SearchOrder/>
    </header>
  )

}

export default Header;
