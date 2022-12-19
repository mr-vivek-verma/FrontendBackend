const base = "/api/v1";

module.exports = function (app) {
  app.use(`${base}/user`, require("./server/api/users/controllers"));
  app.use(`${base}/category`, require("./server/api/categories/controllers"));
  app.use(`${base}/product`, require("./server/api/products/controllers"));
};
