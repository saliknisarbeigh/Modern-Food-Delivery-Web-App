// Vercel serverless function to proxy Swiggy API requests
export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Get the full URL path after /api/proxy
    const fullPath = req.url.replace("/api/proxy", "");

    // Construct the target URL
    const targetUrl = `https://www.swiggy.com/dapi${fullPath}`;

    console.log("Proxying request to:", targetUrl);

    // Make the request to Swiggy
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      console.error("Swiggy API error:", response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Successfully proxied response");

    // Send the response
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);

    res.status(500).json({
      error: "Proxy request failed",
      message: error.message,
      fallback: "Using fallback data",
    });
  }
}
