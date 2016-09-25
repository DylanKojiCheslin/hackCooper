const mongoose = require("mongoose");
const nlp = require("nlp_compromise");
const request = require("request");

isHackathon = (name, callbackIfHackathon) => {
	const auth_token = process.env.SCRIPTR_AUTH_TOKEN;
	console.log(`https://api.scriptrapps.io/isHackathon?auth_token=${auth_token}&name=${name}`);
	request(`https://api.scriptrapps.io/isHackathon?auth_token=${auth_token}&name=${name}`, (error, code, res) => {
		if (error) {
			return;
		}
		try {
			const page = JSON.parse(res).response.result.body;
			const containsName = new RegExp(name, "g");
			const containsHackathon = new RegExp("hackathon", "g");

			const occuranceOfNameInPage = (page.toLowerCase().match(containsName) || []).length;
			const occuranceOfHackathonInPage = (page.toLowerCase().match(containsHackathon) || []).length;

			const minimumOccuranceOfName = 0;
			const minimumOccuranceOfHackathon = 2;

			const mentionsNameOften = occuranceOfNameInPage >= minimumOccuranceOfName;
			const mentionsHackathonOften = occuranceOfHackathonInPage >= minimumOccuranceOfHackathon;
			if (mentionsNameOften && mentionsHackathonOften && callbackIfHackathon) {
				callbackIfHackathon(name);
			}
		} catch (error) {
			return;
		}
	})
};

module.exports = isHackathon;
