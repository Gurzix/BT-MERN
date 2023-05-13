const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCat: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
