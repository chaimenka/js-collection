import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity); 
  const totalCartPrice = useSelector(getTotalCartPrice); 

  if (!totalCartQuantity) return null; 

  return (
    <div className="bg-zinc-700 text-gray-100 uppercase px-4 py-4 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-gray-200 font-semibold space-x-4 sm:space-x-6 ">
        <span>{totalCartQuantity} pizzas</span>
        <span>{totalCartPrice}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
