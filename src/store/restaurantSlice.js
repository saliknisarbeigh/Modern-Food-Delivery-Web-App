import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../utils/apiService";

// Async thunk for fetching restaurants
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const restaurants = await apiService.getRestaurants();
      return restaurants;
    } catch (error) {
      console.warn(
        "Using fallback restaurant data due to API error:",
        error.message
      );
      // Return fallback data instead of rejecting
      return apiService.getFallbackRestaurants();
    }
  }
);

// Async thunk for fetching restaurant menu
export const fetchRestaurantMenu = createAsyncThunk(
  "restaurants/fetchRestaurantMenu",
  async (resId, { rejectWithValue }) => {
    try {
      const menuData = await apiService.getRestaurantMenu(resId);
      return menuData;
    } catch (error) {
      console.warn("Using fallback menu data due to API error:", error.message);
      // Return fallback data instead of rejecting
      return apiService.getFallbackMenu();
    }
  }
);

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  selectedRestaurant: null,
  menu: null,
  loading: false,
  menuLoading: false,
  error: null,
  menuError: null,
  searchText: "",
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    filterRestaurants: (state, action) => {
      const { searchText, filterType } = action.payload;
      state.searchText = searchText;

      let filtered = [...state.restaurants];

      // Search filter
      if (searchText.trim()) {
        filtered = filtered.filter((res) =>
          res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      // Rating filter
      if (filterType === "topRated") {
        filtered = filtered.filter((res) => res.info.avgRating > 4.2);
      }

      state.filteredRestaurants = filtered;
    },

    clearError: (state) => {
      state.error = null;
      state.menuError = null;
    },

    clearMenu: (state) => {
      state.menu = null;
      state.selectedRestaurant = null;
      state.menuError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
        state.filteredRestaurants = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      })

      // Fetch restaurant menu
      .addCase(fetchRestaurantMenu.pending, (state) => {
        state.menuLoading = true;
        state.menuError = null;
      })
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        state.menuLoading = false;
        state.menu = action.payload;
        state.menuError = null;
      })
      .addCase(fetchRestaurantMenu.rejected, (state, action) => {
        state.menuLoading = false;
        state.menuError = action.payload || "Failed to fetch menu";
      });
  },
});

export const { setSearchText, filterRestaurants, clearError, clearMenu } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
