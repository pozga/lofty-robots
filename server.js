const express = require("express");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = process.env.PORT || 5000;
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000/",
    changeOrigin: true,
    // selfHandleResponse: true,
    pathRewrite: {
      "^/api": "/", // remove base path
    },
    // subscribe to http-proxy's proxyRes event and allow CORS on request, adding * for simplicity
    // @TODO: change '*' to specific domains
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "POST";
      proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));
