const mongoose = require("mongoose");

const HackathonSchema = new mongoose.Schema({
  name: String,
	popularity: Number
});

module.exports = mongoose.model("hackathon", HackathonSchema);
