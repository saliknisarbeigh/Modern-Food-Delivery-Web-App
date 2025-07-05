// API Service with error handling and retry logic
class ApiService {
  constructor() {
    // Direct API calls to Swiggy
    this.baseURL = "https://www.swiggy.com/dapi";
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  async request(url, options = {}) {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries) {
          throw new Error(
            `Request failed after ${this.maxRetries} attempts: ${error.message}`
          );
        }

        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryDelay * attempt)
        );
      }
    }

    throw lastError;
  }

  async getRestaurants(lat = 34.0866, lng = 74.8063) {
    try {
      const url = `${this.baseURL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
      const data = await this.request(url);

      const restaurants =
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (!restaurants || restaurants.length === 0) {
        throw new Error("No restaurants found in the area");
      }

      return restaurants;
    } catch (error) {
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }
  }

  async getRestaurantMenu(resId, lat = 21.9974, lng = 79.0011) {
    try {
      const url = `${this.baseURL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
      const data = await this.request(url);

      if (!data.data) {
        throw new Error("Menu data not available");
      }

      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch restaurant menu: ${error.message}`);
    }
  }

  // Fallback data for when API is unavailable
  getFallbackRestaurants() {
    return [
      {
        info: {
          id: "1",
          name: "Pizza Palace",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Downtown",
          areaName: "City Center",
          costForTwo: "₹400 for two",
          cuisines: ["Pizza", "Italian"],
          avgRating: 4.2,
          deliveryTime: 30,
        },
      },
      {
        info: {
          id: "2",
          name: "Burger House",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Mall Road",
          areaName: "Shopping District",
          costForTwo: "₹300 for two",
          cuisines: ["Burgers", "Fast Food"],
          avgRating: 4.0,
          deliveryTime: 25,
        },
      },
      {
        info: {
          id: "3",
          name: "Sushi Express",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Riverside",
          areaName: "Waterfront",
          costForTwo: "₹600 for two",
          cuisines: ["Japanese", "Sushi"],
          avgRating: 4.5,
          deliveryTime: 35,
        },
      },
      {
        info: {
          id: "4",
          name: "Tandoori Nights",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Old City",
          areaName: "Heritage District",
          costForTwo: "₹500 for two",
          cuisines: ["Indian", "Tandoori"],
          avgRating: 4.3,
          deliveryTime: 40,
        },
      },
      {
        info: {
          id: "5",
          name: "Chinese Wok",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Chinatown",
          areaName: "International Quarter",
          costForTwo: "₹450 for two",
          cuisines: ["Chinese", "Asian"],
          avgRating: 4.1,
          deliveryTime: 28,
        },
      },
      {
        info: {
          id: "6",
          name: "Cafe Milano",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Arts District",
          areaName: "Cultural Hub",
          costForTwo: "₹350 for two",
          cuisines: ["Coffee", "Desserts"],
          avgRating: 4.4,
          deliveryTime: 20,
        },
      },
      {
        info: {
          id: "7",
          name: "Spice Garden",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Spice Market",
          areaName: "Traditional Quarter",
          costForTwo: "₹550 for two",
          cuisines: ["Indian", "Spicy"],
          avgRating: 4.6,
          deliveryTime: 45,
        },
      },
      {
        info: {
          id: "8",
          name: "Fresh Bites",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Health District",
          areaName: "Wellness Zone",
          costForTwo: "₹380 for two",
          cuisines: ["Healthy", "Salads"],
          avgRating: 4.0,
          deliveryTime: 22,
        },
      },
      {
        info: {
          id: "9",
          name: "Dessert Paradise",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Sweet Street",
          areaName: "Dessert Lane",
          costForTwo: "₹250 for two",
          cuisines: ["Desserts", "Ice Cream"],
          avgRating: 4.3,
          deliveryTime: 15,
        },
      },
      {
        info: {
          id: "10",
          name: "Seafood Delight",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Harbor View",
          areaName: "Marina District",
          costForTwo: "₹700 for two",
          cuisines: ["Seafood", "Coastal"],
          avgRating: 4.7,
          deliveryTime: 50,
        },
      },
      {
        info: {
          id: "11",
          name: "Street Food Hub",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Food Street",
          areaName: "Street Food Zone",
          costForTwo: "₹200 for two",
          cuisines: ["Street Food", "Local"],
          avgRating: 4.2,
          deliveryTime: 18,
        },
      },
      {
        info: {
          id: "12",
          name: "Royal Biryani",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Royal Plaza",
          areaName: "Luxury District",
          costForTwo: "₹650 for two",
          cuisines: ["Biryani", "Hyderabadi"],
          avgRating: 4.8,
          deliveryTime: 55,
        },
      },
      {
        info: {
          id: "13",
          name: "Quick Bites",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Business Park",
          areaName: "Corporate Zone",
          costForTwo: "₹280 for two",
          cuisines: ["Fast Food", "Quick Meals"],
          avgRating: 3.8,
          deliveryTime: 12,
        },
      },
      {
        info: {
          id: "14",
          name: "Veggie Delight",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Green Valley",
          areaName: "Organic District",
          costForTwo: "₹320 for two",
          cuisines: ["Vegetarian", "Organic"],
          avgRating: 4.1,
          deliveryTime: 25,
        },
      },
      {
        info: {
          id: "15",
          name: "BBQ House",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "BBQ Street",
          areaName: "Grill District",
          costForTwo: "₹580 for two",
          cuisines: ["BBQ", "Grilled"],
          avgRating: 4.4,
          deliveryTime: 42,
        },
      },
      {
        info: {
          id: "16",
          name: "Noodle Bar",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Asian Quarter",
          areaName: "International Zone",
          costForTwo: "₹420 for two",
          cuisines: ["Noodles", "Asian"],
          avgRating: 4.0,
          deliveryTime: 30,
        },
      },
      {
        info: {
          id: "17",
          name: "Sweet Treats",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Candy Lane",
          areaName: "Sweet District",
          costForTwo: "₹180 for two",
          cuisines: ["Sweets", "Candies"],
          avgRating: 4.2,
          deliveryTime: 10,
        },
      },
      {
        info: {
          id: "18",
          name: "Fusion Kitchen",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Fusion Plaza",
          areaName: "Modern District",
          costForTwo: "₹480 for two",
          cuisines: ["Fusion", "Modern"],
          avgRating: 4.3,
          deliveryTime: 35,
        },
      },
      {
        info: {
          id: "19",
          name: "Breakfast Club",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Morning Street",
          areaName: "Breakfast Zone",
          costForTwo: "₹220 for two",
          cuisines: ["Breakfast", "Morning"],
          avgRating: 4.1,
          deliveryTime: 20,
        },
      },
      {
        info: {
          id: "20",
          name: "Late Night Bites",
          cloudinaryImageId: "b2edbc28b7b8219d6e0a",
          locality: "Night Market",
          areaName: "Late Night Zone",
          costForTwo: "₹350 for two",
          cuisines: ["Late Night", "Snacks"],
          avgRating: 3.9,
          deliveryTime: 25,
        },
      },
    ];
  }

  getFallbackMenu() {
    return {
      cards: [
        {
          card: {
            card: {
              info: {
                name: "Sample Restaurant",
                cuisines: ["Indian", "Chinese"],
                costForTwoMessage: "₹400 for two",
                city: "Sample City",
                avgRating: 4.2,
                totalRatingsString: "1K+",
                areaName: "Sample Area",
              },
            },
          },
        },
        {},
        {
          card: {
            card: {
              info: {
                name: "Sample Restaurant",
                cuisines: ["Indian", "Chinese"],
                costForTwoMessage: "₹400 for two",
                city: "Sample City",
                avgRating: 4.2,
                totalRatingsString: "1K+",
                areaName: "Sample Area",
              },
            },
          },
        },
        {},
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: [
                  {},
                  {},
                  {
                    card: {
                      card: {
                        itemCards: [
                          {
                            card: {
                              info: {
                                id: "1",
                                name: "Butter Chicken",
                                price: 25000,
                                description: "Creamy and rich butter chicken",
                                imageId: "b2edbc28b7b8219d6e0a",
                              },
                            },
                          },
                          {
                            card: {
                              info: {
                                id: "2",
                                name: "Chicken Biryani",
                                price: 30000,
                                description:
                                  "Aromatic biryani with tender chicken",
                                imageId: "b2edbc28b7b8219d6e0a",
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    };
  }
}

export default new ApiService();
