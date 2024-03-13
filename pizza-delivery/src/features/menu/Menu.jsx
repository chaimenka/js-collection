import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  /** render-as-you fetch approach */
  const menu = useLoaderData(); /** hook, uses loader, which is associated to page in router */

  return (
    <ul>
    {menu.map(pizza => (<MenuItem pizza={pizza} key={pizza.id} />))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu(); 
  return menu; 
}
export default Menu;
