const path = require("path");
const connectDb = require("./server/config/database");
require("colors");
require("dotenv").config(path.resolve(process.cwd(), "./.env"));
const express = require("express");
const port = process.env.PORT;
const cors = require("cors");
const moment = require("moment");
const multer = require("multer");
const Services = require("./server/service/network");
/////Data/////
const seeder = require("./server/seeder/index");
process.env.TZ = "UTC";
connectDb();
const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
// Require static assets from public folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("./public"));
// // Set 'views' directory for any views
// app.set('views', __dirname + '/server/views');
// // Set view engine as EJS
// app.engine('ejs', require('ejs').renderFile);
// app.set('view engine', 'ejs');
require("./routes")(app);
const server = require("http").createServer(app);
// const socket = io(server);
app.use(seeder);
app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err & (err.code === "LIMIT_UNEXPECTED_FILE")) {
      const errMsg =
        err & (err.field === "mainImage")
          ? `Max 1 image allowed for the ${err & err.field} field`
          : `Max 5 image allowed for the ${err & err.field} field`;
      return Services._validationError(res, errMsg, "Validation Error");
    }
  }
  return Services._handleError(res, err);
});
process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});
process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`.green.underline);
});
exports = module.exports = app;
