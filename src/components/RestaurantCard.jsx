import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    locality,
    costForTwo,
    areaName,
    avgRating,
    deliveryTime, // fallback/mock data
    cuisines,
    id,
    sla, // real API data
  } = resData?.info;

  // Handle both direct deliveryTime and nested sla.deliveryTime
  const actualDeliveryTime = deliveryTime || sla?.deliveryTime || "--";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={name}
          src={CDN_URL + cloudinaryImageId}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Restaurant+Image";
          }}
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-md">
          <div className="flex items-center text-sm font-semibold">
            <span className="text-yellow-500 mr-1">⭐</span>
            {avgRating}
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {name}
        </h3>

        {/* Cuisines */}
        {cuisines && cuisines.length > 0 && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {cuisines.join(", ")}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="line-clamp-1">{locality || areaName}</span>
        </div>

        {/* Cost and Delivery Info */}
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-gray-600 font-medium">{costForTwo}</span>
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{actualDeliveryTime} mins</span>
          </div>
        </div>

        {/* View Menu Button */}
        <div className="pt-3 border-t border-gray-100">
          <Link
            to={`/restaurants/${id}`}
            className="block w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 text-sm text-center"
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
