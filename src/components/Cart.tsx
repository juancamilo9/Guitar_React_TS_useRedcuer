import { CartActions } from "../reducers/cart-reducer";
import { CartItemType } from "../types/types";

type CartProps = {
  guitar: CartItemType
  dispatch: React.Dispatch<CartActions>
}

const Cart = ({ guitar,
  dispatch,
}: CartProps) => {
  const { id, name, price, image, quantity } = guitar
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </td>
      <td>{name}</td>
      <td className="fw-bold">{price}</td>
      <td className="flex align-items-start gap-4">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => dispatch({ type:'remove-quantity-from-cart',payload: { id: id }  })}
        >
          -
        </button>
        {quantity}
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => dispatch({ type: 'increase-quantity-from-cart', payload: { id: id } })}>
          +
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="button" onClick={() => dispatch({ type: 'remove-from-cart', payload: { id: id } })}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default Cart;
