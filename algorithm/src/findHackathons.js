const fs = require("fs");
const nlp = require("nlp_compromise");
const mongoose = require("mongoose");
const request = require("request");
const Tweet = require("../models/Tweet");
const Hackathon = require("../models/Hackathon");

const isHackathon = (name, ifIsHackathon, ifIsNotHackathon) => request(
	`https://kmk26hrd6j.execute-api.us-east-1.amazonaws.com/prod/isHackathon?name=${name}`,
	(error, code, result) => {
		if (error) {
			console.log(error);
			return;
		}

		try {
			if (JSON.parse(result).isHackathon && ifIsHackathon) {
				ifIsHackathon(name);
			} else if (ifIsNotHackathon) {
				ifIsNotHackathon(name);
			}
		} catch (exception) {}
	}
);

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
});
