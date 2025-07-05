import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  restaurantId: null,
  restaurantName: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, restaurantId, restaurantName } = action.payload;

      // If adding from a different restaurant, clear cart
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      }

      state.restaurantId = restaurantId;
      state.restaurantName = restaurantName;

      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }

        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        } else {
          item.quantity = quantity;
        }

        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.restaurantId = null;
      state.restaurantName = "";
    },

    loadCartFromStorage: (state, action) => {
      const savedCart = action.payload;
      if (savedCart) {
        state.items = savedCart.items || [];
        state.totalItems = savedCart.totalItems || 0;
        state.totalAmount = savedCart.totalAmount || 0;
        state.restaurantId = savedCart.restaurantId || null;
        state.restaurantName = savedCart.restaurantName || "";
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
