const mongoose = require("mongoose");
const Hackathon = require("../models/Hackathon");
const Tweet = require("../models/Tweet");

mongoose.connect('mongodb://localhost/hackafind');

Hackathon.find({}).then(hackathons => {
	const sortedByPopularity = hackathons.sort((a, b) => b.popularity - a.popularity);
	console.log(sortedByPopularity);
});
