import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clientsSlice";
import productsReducer from "./productsSlice";

// global store with all slices
export const store = configureStore({
  reducer: {
    clients: clientsReducer, // slice "clients"
    products: productsReducer, // slice "products"
  },
  devTools: process.env.NODE_ENV !== "production", // redux devtools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
