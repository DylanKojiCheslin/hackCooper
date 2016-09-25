const fs = require("fs");
const nlp = require("nlp_compromise");
const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");
const Hackathon = require("../models/Hackathon");
const isHackathon = require("./isHackathon");

mongoose.connect('mongodb://localhost/hackafind');

const flatten = (a, b) => a.concat(b);

Tweet.find({}).then((tweets) => {
	const hackathonNames = tweets
		.map(tweet => tweet.text) // extract just the text of the tweet
		.map(text => nlp.text(text)) // analyze the text
		.map(analysis => analysis.sentences)
		.reduce(flatten, [])
		.map(sentences => sentences.nouns())
		.reduce(flatten, [])
		.map(noun => noun.normal)
		.forEach(name => isHackathon(name, console.log));

	const popularity = (name) => hackathonNames
		.reduce((count, hackathon) => hackathon === name ? count + 1 : count, 0);

	const save = name => Hackathon.create({
		name,
		popularity: popularity(name),
		tweets: []
	});
});
