const request = require("request");

const get = () => request("https://duckduckgo.com/?q=noise+hackathon&t=h_&ia=web", (err, code, body) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(body);
	get();
});

get();
