const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: false,
    },
    img2: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    subcategories: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: true,
    },
    howManyPlayers: {
      type: String,
      required: false,
    },
    partOfTraining: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    coachingPoints: {
      type: String,
      require: false,
    },
    field: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
