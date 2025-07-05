import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error?.status === 404 ? "Page Not Found" : "Something went wrong"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.status === 404
              ? "The page you're looking for doesn't exist."
              : "We're sorry, but something unexpected happened. Please try again."}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md"
          >
            Go Back
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
          >
            Go Home
          </button>
        </div>

        {process.env.NODE_ENV === "development" && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium">
              Error Details (Development)
            </summary>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">
                <strong>Status:</strong> {error.status}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                <strong>Message:</strong> {error.statusText || error.message}
              </p>
              {error.data && (
                <pre className="text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {JSON.stringify(error.data, null, 2)}
                </pre>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default Error;
