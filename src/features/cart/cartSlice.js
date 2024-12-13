import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Pepperoni',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32
    //     }
    // ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = newItem
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            // payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            // payload = pizzaId
            const item =  state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;

        },
        decreaseItemQuantity(state, action) {
            // payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;

            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state) {
            state.cart = [];
        }
    }
});

// Export action creators
export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

// Get the total Quantity in Cart
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Get the total Price of the Cart
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Get the Cart items
export const getCart = state => state.cart.cart;

// Get the username
export const getUser = state => state.user.user;

// Get the quantity by ID
export const getCurrentQuantityById = (id) => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

// Redux Reselect - recommended