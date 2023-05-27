const dotenv = require("dotenv");
dotenv.config();
const Post = require("./models/Post");
const express = require("express");
const app = express();
const uuid = require("uuid").v4;
const mongoose = require("mongoose");
const cors = require("cors");
const { s3Uploadv2 } = require("./s3Service");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const path = require("path");
// multiple file upload

const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

app.post("/upload", upload.array("file", 2), async (req, res) => {
  const {
    title,
    desc,
    coachingPoints,
    time,
    howManyPlayers,
    categories,
    subcategories,
    subcategories2,
    field,
    author,
  } = req.body;

  const categories2 = categories
    .split(" ")
    .filter((word) => word.trim() !== ",");

  // const subcategories2 = subcategories
  //   .split(" ")
  //   .filter((word) => word.trim() !== ",");

  try {
    const result = await s3Uploadv2(req.files);
    const post = new Post({
      title,
      author,
      desc,
      coachingPoints,
      time,
      howManyPlayers,
      categories: categories2,
      subcategories,
      subcategories2,
      field,
      img: result[0].Location,
      img2: result[1] && result[1].Location,
    });
    const savedPost = await post.save();
    console.log(savedPost);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.log(error);
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

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoriesRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen("5000", () => {
  console.log("Serwer 5000 działaaa");
});
