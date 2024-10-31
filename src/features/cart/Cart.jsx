import { useSelector, useDispatch } from "react-redux";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { getCart, getUser, clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
    // const cart = fakeCart;
    const username = useSelector(getUser);
    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    if (!cart.length) return <EmptyCart/>

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

            <ul className="mt-3 divide-y divide-stone-200 border-b">
                {cart.map((item, index) => (
                    <CartItem key={index} item={item}></CartItem>
                ))}
            </ul>

            <div className="mt-6 space-x-2">
                <Button type="primary" to="/order/new">
                    Order pizzas
                </Button>
                <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
            </div>
        </div>
    );
}

export default Cart;
