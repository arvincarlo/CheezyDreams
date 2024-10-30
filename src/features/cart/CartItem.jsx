import { useDispatch } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, } = item;
  const dispatch = useDispatch();
  console.log(item);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
        <button onClick={() => dispatch(deleteItem(pizzaId))}>Remove {pizzaId}</button>
      </div>
    </li>
  );
}

export default CartItem;
