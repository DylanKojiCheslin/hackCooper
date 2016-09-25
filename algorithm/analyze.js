const fs = require("fs");
const nlp = require("nlp_compromise");
const tweets = require("./tweets.json").statuses;

const flatten = (a, b) => a.concat(b);

const isHackathonName = noun =>
	(noun !== "hackathon" && noun !== "hack") && (noun.includes("hackathon") || noun.includes("hack"));

const nouns = tweets
	.map(tweet => tweet.text) // extract just the text of the tweet
	.map(text => nlp.text(text)) // analyze the text
	.map(analysis => analysis.sentences)
	.reduce(flatten, [])
	.map(sentences => sentences.nouns())
	.reduce(flatten, [])
	.map(noun => noun.normal)
	.filter(isHackathonName)

console.log(nouns);
