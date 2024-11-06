import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder';
import Order, { loader as OrderLoader } from './features/order/Order';
import AppLayout from "./ui/AppLayout";
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/menu",
        element: <Menu/>,
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/order/new",
        action: createOrderAction,
        element: <CreateOrder/>
      },
      {
        path: "/order/:orderId",
        loader: OrderLoader,
        errorElement: <Error/>,
        element: <Order/>,
        action: updateOrderAction
      },
    ]
  },
  
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
