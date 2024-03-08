import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

/**
 * parent of other elements
 * @returns 
 */
function AppLayout() {
  // get browser state
  const navigation = useNavigation(); 
  const isLoading = navigation.state === "loading"; 


  return (
    <div className="layout">
      {isLoading && <Loader/>}  {/** conditional rendering */}
      <Header />
      <main>
        <h1> Content </h1>
        <Outlet/> {/** render children */}
      </main>
          <CartOverview/>
    </div>
  );
}

export default AppLayout;
