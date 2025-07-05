import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";
import userReducer from "./userSlice";

// Persist configuration for cart
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: [
    "items",
    "totalItems",
    "totalAmount",
    "restaurantId",
    "restaurantName",
  ],
};

// Persist configuration for user preferences
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["preferences"],
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    restaurants: restaurantReducer,
    user: persistReducer(userPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
