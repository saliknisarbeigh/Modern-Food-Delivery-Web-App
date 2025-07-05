import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const target = "https://www.swiggy.com";

const proxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy": "/dapi", // /api/proxy/xxx -> /dapi/xxx
  },
  onProxyRes: (proxyRes, req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
  },
});

export default function handler(req, res) {
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
