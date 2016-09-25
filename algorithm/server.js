const Twitter = require("twitter");
const commandLineArgs = require("command-line-args");

const flags = commandLineArgs([
	{ name: "consumer_key" },
	{ name: "consumer_secret" },
	{ name: "access_token_key" },
	{ name: "access_token_secret" },
	{ name: "port", type: Number, defaultOption: 80 }
]);

// connect to Twitter with the arguments passed from the shell
const client = new Twitter(flags);

client.get("statuses/user_timeline", {username: "abhinavmadahar"}, function(error, tweets, response) {
  if (error) {
		console.log(error);
		return;
	}
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});
