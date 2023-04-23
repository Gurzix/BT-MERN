const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Musisz podać nazwę użytkownika"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Musisz wpisać email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      type: Boolean,
    },
    subscription_expiration: {
      type: Date,
    },
    verified: { type: Boolean },
  },
  { timestamps: true }
);

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error.errors = {
      username: { message: "Ta nazwa jest już zajęta" },
      email: { message: "Ten email jest już w naszej bazie" },
    };
  }
  next(error);
});

module.exports = mongoose.model("User", UserSchema);
