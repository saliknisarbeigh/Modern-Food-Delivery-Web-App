const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Shimmer */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center">
            {/* Search Bar Shimmer */}
            <div className="flex-1 max-w-md">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Filter Buttons Shimmer */}
            <div className="flex flex-wrap gap-3">
              <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Results Count Shimmer */}
        <div className="mb-6">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Restaurant Cards Grid Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Image Shimmer */}
              <div className="h-48 bg-gray-200 animate-pulse"></div>

              {/* Content Shimmer */}
              <div className="p-4">
                {/* Title Shimmer */}
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>

                {/* Cuisines Shimmer */}
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>

                {/* Location Shimmer */}
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>

                {/* Cost and Time Shimmer */}
                <div className="flex justify-between items-center mb-3">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Button Shimmer */}
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
