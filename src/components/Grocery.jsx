import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import Modal from "./Modal";

const Grocery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const dispatch = useDispatch();
  const productsSectionRef = useRef(null);
  const { items, restaurantId } = useSelector((state) => state.cart);

  const categories = [
    {
      id: "All",
      title: "All Groceries",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      count: "1000+ items",
      color: "from-green-400 to-green-600",
    },
    {
      id: "fruits",
      title: "Fresh Fruits",
      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
      count: "150+ items",
      color: "from-orange-400 to-red-500",
    },
    {
      id: "vegetables",
      title: "Fresh Vegetables",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      count: "200+ items",
      color: "from-green-400 to-green-600",
    },
    {
      id: "dairy",
      title: "Dairy & Eggs",
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
      count: "100+ items",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "bakery",
      title: "Bakery",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      count: "80+ items",
      color: "from-amber-400 to-amber-600",
    },
    {
      id: "pantry",
      title: "Pantry Staples",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      count: "300+ items",
      color: "from-gray-400 to-gray-600",
    },
  ];

  const deals = [
    {
      id: 1,
      title: "Fresh Fruits Bundle",
      description: "Get 20% off on all fresh fruits",
      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=200&fit=crop",
      discount: "20% OFF",
      validUntil: "2 days left",
    },
    {
      id: 2,
      title: "Dairy Essentials",
      description: "Buy 2 get 1 free on dairy products",
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=200&fit=crop",
      discount: "B2G1",
      validUntil: "5 days left",
    },
  ];

  // Mock grocery data since Edamam API requires authentication
  const mockGroceryData = [
    {
      id: 1,
      title: "Organic Bananas",
      category: "fruits",
      price: 49,
      originalPrice: 69,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      description: "Fresh organic bananas, perfect for smoothies and snacks",
    },
    {
      id: 2,
      title: "Fresh Milk 1L",
      category: "dairy",
      price: 65,
      originalPrice: 75,
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 256,
      description: "Pure cow milk, rich in calcium and protein",
    },
    {
      id: 3,
      title: "Whole Wheat Bread",
      category: "bakery",
      price: 35,
      originalPrice: 45,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 89,
      description: "Freshly baked whole wheat bread",
    },
    {
      id: 4,
      title: "Organic Tomatoes",
      category: "vegetables",
      price: 40,
      originalPrice: 60,
      image:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 167,
      description: "Fresh organic tomatoes, perfect for salads",
    },
    {
      id: 5,
      title: "Fresh Apples",
      category: "fruits",
      price: 120,
      originalPrice: 150,
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 203,
      description: "Crisp and juicy red apples",
    },

    {
      id: 7,
      title: "Fresh Eggs (12)",
      category: "dairy",
      price: 80,
      originalPrice: 100,
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 342,
      description: "Farm fresh eggs, high in protein",
    },
    {
      id: 8,
      title: "Brown Rice 1kg",
      category: "pantry",
      price: 85,
      originalPrice: 110,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 78,
      description: "Organic brown rice, rich in fiber",
    },
    {
      id: 9,
      title: "Fresh Spinach",
      category: "vegetables",
      price: 25,
      originalPrice: 35,
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 156,
      description: "Fresh green spinach, packed with nutrients",
    },
    {
      id: 10,
      title: "Greek Yogurt",
      category: "dairy",
      price: 95,
      originalPrice: 120,
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 189,
      description: "Creamy Greek yogurt, high in protein",
    },
    {
      id: 11,
      title: "Whole Grain Pasta",
      category: "pantry",
      price: 55,
      originalPrice: 70,
      image:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 112,
      description: "Healthy whole grain pasta",
    },
    {
      id: 12,
      title: "Fresh Oranges",
      category: "fruits",
      price: 90,
      originalPrice: 120,
      image:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 134,
      description: "Sweet and juicy oranges, rich in vitamin C",
    },
  ];

  // Simulate API call with mock data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let filteredData = mockGroceryData;
        if (selectedCategory !== "All") {
          filteredData = mockGroceryData.filter(
            (product) => product.category === selectedCategory
          );
        }

        setProducts(filteredData);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Filter products based on search query and valid images
  const filteredProducts = products.filter((product) => {
    // Check if product matches search query
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if product has a valid image URL
    const hasValidImage =
      product.image &&
      product.image.startsWith("http") &&
      !product.image.includes("placeholder") &&
      !product.image.includes("1447175008436"); // Filter out problematic carrot image

    return matchesSearch && hasValidImage;
  });

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setSelectedCategory("All"); // Show all products when searching

      // Scroll to products section with smooth animation
      setTimeout(() => {
        productsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setIsSearching(false);
      }, 100);
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: "grocery",
    };

    if (items.length > 0 && restaurantId && restaurantId !== "grocery-store") {
      setPendingItem(cartItem);
      setModalOpen(true);
      return;
    }

    dispatch(
      addItem({
        item: cartItem,
        restaurantId: "grocery-store",
        restaurantName: "Fresh Groceries",
      })
    );

    // Show success feedback (you can add a toast notification here)
    console.log(`${product.title} added to cart!`);
  };

  const confirmReplaceCart = () => {
    dispatch({ type: "cart/clearCart" });
    dispatch(
      addItem({
        item: pendingItem,
        restaurantId: "grocery-store",
        restaurantName: "Fresh Groceries",
      })
    );
    setModalOpen(false);
    setPendingItem(null);
  };

  const cancelReplaceCart = () => {
    setModalOpen(false);
    setPendingItem(null);
  };

  const formatPrice = (price) => {
    return `₹${price}`;
  };

  const calculateDiscount = (price, originalPrice) => {
    const discount = ((originalPrice - price) / originalPrice) * 100;
    return `${Math.round(discount)}% OFF`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh Groceries Delivered
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get fresh fruits, vegetables, dairy, and household essentials
              delivered to your doorstep in minutes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for fruits, vegetables, dairy, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-gray-900 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <svg
                      className="w-6 h-6 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </form>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center text-green-100">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Free Delivery</span>
              </div>
              <div className="flex items-center text-green-100">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Fresh & Quality</span>
              </div>
              <div className="flex items-center text-green-100">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">30 Min Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find everything you need for your daily essentials
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(1).map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Category";
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsSectionRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "All"
                ? "All Groceries"
                : `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  }`}
            </h2>
            <p className="text-xl text-gray-600">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} products found`}
            </p>
          </div>

          {error && (
            <div className="text-center mb-8">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                {error}
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Product";
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {calculateDiscount(
                          product.price,
                          product.originalPrice
                        )}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button className="bg-white/90 text-gray-700 p-2 rounded-full hover:bg-white transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Special Deals
            </h2>
            <p className="text-xl text-gray-600">
              Limited time offers you don't want to miss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl overflow-hidden text-white"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                    {deal.discount}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-orange-100 mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-200">
                      {deal.validUntil}
                    </span>
                    <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>

                <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shop Fresh?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get fresh groceries delivered to your doorstep in minutes. Start
            shopping now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 shadow-lg">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
              Download App
            </button>
          </div>
        </div>
      </section>

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

export default Grocery;
