const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const uuid = require("uuid").v4;
const mongoose = require("mongoose");

const cors = require("cors");
const { s3Uploadv2 } = require("./s3Service");
app.use(cors());

// multiple file upload

const multer = require("multer");
const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });
const upload = multer({ storage });

// const multiUpload = upload.fields([
//   { name: "img", maxCount: 1 },
//   { name: "img2", maxCount: 1 },
// ]);
app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const result = await s3Uploadv2(req.files);
    console.log(result);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
});

const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Podłączono do bazy danych"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoriesRoute);

app.listen("5000", () => {
  console.log("Serwer 5000 działaaa");
});
