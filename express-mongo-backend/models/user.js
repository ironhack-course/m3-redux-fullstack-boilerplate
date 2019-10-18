const mongoose = require("mongoose");
const Schema   = require("mongoose").Schema;

const userSchema = new Schema({
<<<<<<< HEAD
=======
  firstname: String,
  lastname: String,
>>>>>>> a2718c9
  username: String,
  password: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
