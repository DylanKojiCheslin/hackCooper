// collects a list of tweets

const Twitter = require("twitter");
const commandLineArgs = require("command-line-args");
const fs = require("fs");

const flags = commandLineArgs([
	{ name: "consumer_key" },
	{ name: "consumer_secret" },
	{ name: "access_token_key" },
	{ name: "access_token_secret" },
	{ name: "port", type: Number, defaultOption: 80 }
]);

// connect to Twitter with the arguments passed from the shell
const client = new Twitter(flags);

const params = {
	count: 100,
	q: "hackathon"
};
client.get("search/tweets", params, (error, tweets, response) => {
  if (error) {
		console.log(error);
		return;
	}

  fs.writeFile("tweets.json", JSON.stringify(tweets), "utf-8");
});
