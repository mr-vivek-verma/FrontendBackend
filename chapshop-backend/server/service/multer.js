const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(req);
//     cb(null, "./public/upldiskStorageoads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;
