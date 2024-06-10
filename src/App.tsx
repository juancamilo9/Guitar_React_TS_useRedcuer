
import { useEffect, useReducer } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { cartReducer,initialstate } from "./reducers/cart-reducer";


const App = () => {
 

  const [state,dispatch] = useReducer(cartReducer,initialstate)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />
      <Main 
        data={state.data} 
        dispatch={dispatch} 
      />
      <Footer />
    </>
  );
};

export default App;
