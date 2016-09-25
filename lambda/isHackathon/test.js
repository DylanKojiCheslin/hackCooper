const assert = require("chai").assert;
const findIfHackathon = require("./").handler;

describe("isHackathon", () => {
	it("correctly determines hackathons", (done) => {
		var run = 0;
		const n = 6;
		const confirmIsHackathon = (error, result) => {
			assert(!error);
			assert(result.isHackathon, `${result.name} is a hackathon`);
			run++;
			if (run === n) {
				done();
			}
		};
		const confirmIsNotHackathon = (error, result) => {
			assert(!error);
			assert(!result.isHackathon, `${result.name} is not a hackathon`);
			run++;
			if (run === n) {
				done();
			}
		};

		findIfHackathon({ name: "noise hackathon" }, {}, confirmIsHackathon);
		findIfHackathon({ name: "hackmhs" }, {}, confirmIsHackathon);
		findIfHackathon({ name: "pennapps" }, {}, confirmIsHackathon);

		findIfHackathon({ name: "cool hackathon" }, {}, confirmIsNotHackathon);
		findIfHackathon({ name: "hackathon" }, {}, confirmIsNotHackathon);
		findIfHackathon({ name: "hack" }, {}, confirmIsNotHackathon);
	});
});
