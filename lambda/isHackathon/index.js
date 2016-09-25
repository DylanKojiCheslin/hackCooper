// this is meant to by run on AWS Lambda

const request = require("request");

const findIfHackathon = (event, context, callback) => {
	const name = event.name;

	if (["hackathon", "hack"].indexOf(name) !== -1) {
		callback(null, { isHackathon: false, name });
		return;
	}

	request(`https://www.google.com/search?q=${name}`, (error, code, page) => {
		if (error) {
			console.log(error);
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
	});
};

exports.handler = findIfHackathon;
