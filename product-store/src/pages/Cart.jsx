import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';

function Cart() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    return (
        <div>
            <h1>Cart</h1>

            {items.length === 0 ? (
                <p>Your Cart is empty</p>
            ) : (
                items.map((item) => (
                    <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}> - </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}> + </button>
                    <button onClick={() => dispatch(removeFromCart(item.id))}> Remove </button>
                   </div>
                ))
            )}

            <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
}

export default Cart;