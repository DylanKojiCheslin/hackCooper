// collects a list of tweets

const Twitter = require("twitter");
const commandLineArgs = require("command-line-args");
const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");

mongoose.connect('mongodb://localhost/hackafind');

const flags = commandLineArgs([
	{ name: "consumer_key" },
	{ name: "consumer_secret" },
	{ name: "access_token_key" },
	{ name: "access_token_secret" },
	{ name: "port", type: Number, defaultOption: 80 }
]);

// connect to Twitter with the arguments passed from the shell
const client = new Twitter(flags);

const collect = (query, afterAPICall, afterSave) => {
	const params = {
		count: 100,
		q: query
	};
	client.get("search/tweets", params, (error, tweetData, response) => {
	  if (error) {
			console.log(error);
			return;
		}

		const extractTweetData = tweet => ({
			username: tweet.user.screen_name,
			userDescription: tweet.user.description,
			userURL: tweet.user.url,
			text: tweet.text
		});

		const tweets = tweetData.statuses.map(extractTweetData)
		tweets.map((tweet) => Tweet.create(tweet).then(afterSave));
		if (afterAPICall) {
			afterAPICall(tweets);
		}
	});
};

collect("hackathon", () => console.log("Downloaded"), () => console.log("Saved"));

module.exports = collect;
