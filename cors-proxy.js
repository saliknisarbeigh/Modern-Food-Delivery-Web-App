const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const target = "https://www.swiggy.com";

app.use(
  "/dapi",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/dapi": "/dapi",
    },
    onProxyRes: (proxyRes, req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
      );
    },
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`CORS Proxy running at http://localhost:${PORT}`);
});
