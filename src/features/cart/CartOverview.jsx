import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-pizza px-4 py-4 text-sm uppercase text-stone-800 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-800 sm:space-x-6">
        <span>{`${totalCartQuantity} ${totalCartQuantity > 1 ? ' pizzas' : ' pizza'}`}</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
