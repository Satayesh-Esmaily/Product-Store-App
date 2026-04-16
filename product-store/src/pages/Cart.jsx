import React from 'react';
import { useSelector } from "react-redux";

function Cart() {
    const { items } = useSelector((state) => state.cart);

    return (
        <div>
            <h1>Cart</h1>

            {items.lenght === 0 ? (
                <p>Your Cart is empty</p>
            ) : (
                items.map((item) => (
                    <div key={item.id}>
                    <p>{item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                   </div>
                ))
            )}
        </div>
    );
}

export default Cart;