import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRestaurantMenu, clearMenu } from "../store/restaurantSlice";
import { addItem } from "../store/cartSlice";
import Shimmer from "./shimmer";
import ErrorDisplay from "./ErrorDisplay";
import { CDN_URL } from "../utils/constants";
import Modal from "./Modal";

const RestaurantMenu = () => {
  const dispatch = useDispatch();
  const { resId } = useParams();
  const { menu, menuLoading, menuError } = useSelector(
    (state) => state.restaurants
  );
  const { items, restaurantId } = useSelector((state) => state.cart);

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    if (resId) {
      dispatch(fetchRestaurantMenu(resId));
    }

    return () => {
      dispatch(clearMenu());
    };
  }, [dispatch, resId]);

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.card.info.id,
      name: item.card.info.name,
      price: (item.card.info.price || item.card.info.defaultPrice) / 100,
      description: item.card.info.description,
      imageId: item.card.info.imageId,
    };

    if (items.length > 0 && restaurantId && restaurantId !== resId) {
      setPendingItem(cartItem);
      setModalOpen(true);
      return;
    }

    dispatch(
      addItem({
        item: cartItem,
        restaurantId: resId,
        restaurantName: menu?.cards[2]?.card?.card?.info?.name || "Restaurant",
      })
    );
  };

  const confirmReplaceCart = () => {
    dispatch({ type: "cart/clearCart" });
    dispatch(
      addItem({
        item: pendingItem,
        restaurantId: resId,
        restaurantName: menu?.cards[2]?.card?.card?.info?.name || "Restaurant",
      })
    );
    setModalOpen(false);
    setPendingItem(null);
  };

  const cancelReplaceCart = () => {
    setModalOpen(false);
    setPendingItem(null);
  };

  const getItemQuantity = (itemId) => {
    const cartItem = items.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Helper function to extract menu items from different possible data structures
  const extractMenuItems = (menuData) => {
    if (!menuData || !menuData.cards) return [];

    // Try different possible structures for menu items
    const possiblePaths = [
      // Standard structure
      menuData.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
        ?.card?.itemCards,
      // Alternative structure 1
      menuData.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
        ?.card?.itemCards,
      // Alternative structure 2
      menuData.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[0]?.card
        ?.card?.itemCards,
      // Alternative structure 3
      menuData.cards?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
        ?.card?.itemCards,
      // Alternative structure 4
      menuData.cards?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
        ?.card?.itemCards,
      // Alternative structure 5
      menuData.cards?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[0]?.card
        ?.card?.itemCards,
      // Direct itemCards structure
      menuData.cards?.[4]?.card?.card?.itemCards,
      menuData.cards?.[3]?.card?.card?.itemCards,
    ];

    for (const path of possiblePaths) {
      if (path && Array.isArray(path) && path.length > 0) {
        console.log("Found menu items at path:", path);
        return path;
      }
    }

    // If no items found, try to find any itemCards in the entire structure
    const findItemCards = (obj) => {
      if (!obj || typeof obj !== "object") return null;

      if (Array.isArray(obj)) {
        for (const item of obj) {
          const result = findItemCards(item);
          if (result) return result;
        }
      } else {
        if (
          obj.itemCards &&
          Array.isArray(obj.itemCards) &&
          obj.itemCards.length > 0
        ) {
          return obj.itemCards;
        }

        for (const key in obj) {
          const result = findItemCards(obj[key]);
          if (result) return result;
        }
      }

      return null;
    };

    const foundItems = findItemCards(menuData);
    if (foundItems) {
      console.log("Found menu items using recursive search:", foundItems);
      return foundItems;
    }

    console.log("No menu items found in any structure");
    return [];
  };

  if (menuLoading) {
    return <Shimmer />;
  }

  if (menuError) {
    return (
      <ErrorDisplay
        error={menuError}
        onRetry={() => dispatch(fetchRestaurantMenu(resId))}
        title="Failed to load menu"
      />
    );
  }

  if (!menu) {
    return <Shimmer />;
  }

  const restaurantInfo =
    menu.cards[2]?.card?.card?.info ||
    menu.cards[1]?.card?.card?.info ||
    menu.cards[0]?.card?.card?.info;
  const menuItems = extractMenuItems(menu);

  if (!restaurantInfo) {
    return (
      <ErrorDisplay
        error="Restaurant information not available"
        onRetry={() => dispatch(fetchRestaurantMenu(resId))}
        title="Restaurant not found"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {restaurantInfo.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  {restaurantInfo.avgRating} (
                  {restaurantInfo.totalRatingsString})
                </span>
                <span className="hidden md:inline">•</span>
                <span>{restaurantInfo.costForTwoMessage}</span>
                <span className="hidden md:inline">•</span>
                <span>{restaurantInfo.areaName}</span>
              </div>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {restaurantInfo.cuisines?.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              Menu
            </h2>

            {menuItems.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {menuItems.map((item) => {
                  const itemInfo = item.card.info;
                  const quantity = getItemQuantity(itemInfo.id);

                  return (
                    <div
                      key={itemInfo.id}
                      className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3 md:gap-4">
                        {/* Item Image */}
                        {itemInfo.imageId && (
                          <div className="flex-shrink-0">
                            <img
                              src={`${CDN_URL}${itemInfo.imageId}`}
                              alt={itemInfo.name}
                              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                            {itemInfo.name}
                          </h3>
                          {itemInfo.description && (
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {itemInfo.description}
                            </p>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-base md:text-lg font-semibold text-gray-900">
                              ₹{(itemInfo.price || itemInfo.defaultPrice) / 100}
                            </span>

                            {/* Add to Cart Button */}
                            <div className="flex items-center gap-2">
                              {quantity > 0 && (
                                <span className="text-sm text-gray-600">
                                  Qty: {quantity}
                                </span>
                              )}
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="px-3 py-2 md:px-4 md:py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-sm text-sm"
                                aria-label={`Add ${itemInfo.name} to cart`}
                              >
                                {quantity > 0 ? "Add More" : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No menu items available
                </h3>
                <p className="text-gray-600">
                  This restaurant doesn't have any menu items listed at the
                  moment.
                </p>
              </div>
            )}
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Cart
              </h3>

              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate text-sm">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹
                        {items
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => (window.location.href = "/cart")}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md"
                    >
                      View Cart (
                      {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                      items)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">Your cart is empty</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Add items to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title="Replace Cart Items?"
        message="Your cart contains items from another restaurant or grocery. Do you want to clear the cart and add this item?"
        onConfirm={confirmReplaceCart}
        onCancel={cancelReplaceCart}
        confirmText="Yes, Replace"
        cancelText="No, Keep Cart"
      />
    </div>
  );
};

export default RestaurantMenu;
