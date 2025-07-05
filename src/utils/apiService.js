// API Service with error handling and retry logic
class ApiService {
  constructor() {
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
