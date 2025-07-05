import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, filterRestaurants } from "../store/restaurantSlice";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import ErrorDisplay from "./ErrorDisplay";
import CategoryCarousel from "./CategoryCarousel";

const Body = () => {
  const dispatch = useDispatch();
  const { restaurants, filteredRestaurants, loading, error, searchText } =
    useSelector((state) => state.restaurants);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    if (onlineStatus && restaurants.length === 0) {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, onlineStatus, restaurants.length]);

  const handleSearch = (searchValue) => {
    dispatch(filterRestaurants({ searchText: searchValue, filterType: null }));
  };

  const handleTopRated = () => {
    dispatch(
      filterRestaurants({ searchText: searchText, filterType: "topRated" })
    );
  };

  const handleClearFilters = () => {
    dispatch(filterRestaurants({ searchText: "", filterType: null }));
  };

  if (!onlineStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-red-500 mb-2">
            You're Offline
          </h1>
          <p className="text-gray-600">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => dispatch(fetchRestaurants())}
        title="Failed to load restaurants"
      />
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Category Carousel */}
      <CategoryCarousel />

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for restaurants..."
                aria-label="Search restaurants"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleTopRated}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md"
              aria-label="Show top rated restaurants"
            >
              ⭐ Top Rated
            </button>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredRestaurants.length > 0 ? (
            <span>
              Showing {filteredRestaurants.length} restaurant
              {filteredRestaurants.length !== 1 ? "s" : ""}
            </span>
          ) : (
            <span>No restaurants found</span>
          )}
        </div>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
