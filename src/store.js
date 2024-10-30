import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import carReducer from './features/cart/cartSlice';

console.log(carReducer);

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: carReducer
    }
})

export default store;