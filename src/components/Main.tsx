import Guitar from "./Guitar";
import { GuitarType } from "../types/types";
import { CartActions } from "../reducers/cart-reducer";

type MainProps = {
  data: GuitarType[],
  dispatch: React.Dispatch<CartActions>
}
const Main = ({ data,dispatch}: MainProps) => {
  return (
    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>

      <div className="row mt-5">
        {data.map((guitar) => (
          <Guitar
            key={guitar.id}
            guitar={guitar}
            addToCart={()=>dispatch({type:'add-to-cart',payload:{item:guitar}})} />
        )
        )}
      </div>
    </main>
  );
};


export default Main;