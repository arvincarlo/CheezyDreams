import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/emptyCart";
import store from '../../store';
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const PRIORITY_CHARGE = 0.2;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const formErrors = useActionData();
    const {username} = useSelector(state => state.user);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * (PRIORITY_CHARGE) : 0;
    const totalPrice = totalCartPrice + priorityPrice;

    const cart = useSelector(getCart);
    console.log(withPriority);

    if (!cart.length) return <EmptyCart/>;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button type="primary" disabled={isSubmitting}>
                        {isSubmitting ? "Placing Order..." : `Order now from ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateOrder;

export async function action({ request }) {
    // Define the order object
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    };

    // Error Handing
    const errors = {};
    if (!isValidPhone(order.phone)) {
        errors.phone =
            "Please give us your correct phone number. We might need to contact you.";
    }

    if (Object.keys(errors).length > 0) return errors;

    // Creating the data and redirect - Do NOT overuse
    console.log(order);
    const newOrder = await createOrder(order);

    // Calling the store directly
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
}
