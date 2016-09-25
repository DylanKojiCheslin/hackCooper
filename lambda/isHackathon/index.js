// this is meant to by run on AWS Lambda

const request = require("request");

const findIfHackathon = (event, context, callback) => {
	if (!event.queryParams.name) {
		callback("Missing name parameter");
		return;
	}
	const name = event.queryParams.name.replace(/%20/g, " ");

	if (["hackathon", "hack"].indexOf(name) !== -1) {
		callback(null, { isHackathon: false, name });
		return;
	}

	request(`https://www.google.com/search?q=${name}`, (error, code, page) => {
		if (error) {
			console.log(error);
			callback(error, { error });
			return;
		}

		const containsName = new RegExp(name, "g");
		const containsHackathon = new RegExp("hackathon", "g");

		const occuranceOfNameInPage = (page.toLowerCase().match(containsName) || []).length;
		const occuranceOfHackathonInPage = (page.toLowerCase().match(containsHackathon) || []).length;

		const minimumOccuranceOfName = 15;
		const minimumOccuranceOfHackathon = 5;

		const mentionsNameOften = occuranceOfNameInPage >= minimumOccuranceOfName;
		const mentionsHackathonOften = occuranceOfHackathonInPage >= minimumOccuranceOfHackathon;
		const isHackathon = mentionsNameOften && mentionsHackathonOften;

		callback(null, { isHackathon, name });
		context.done();
	});
};

exports.handler = findIfHackathon;
