const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  username: String,
	userDescription: String,
	userURL: String,
	text: { type: String, index: true }
});

module.exports = mongoose.model("tweet", TweetSchema);
