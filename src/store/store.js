import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import loginReducer from "./loginSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    login: loginReducer,
  },
});

export default store;
