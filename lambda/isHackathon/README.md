# isHackathon

This AWS Lambda function accepts a name URL parameter and determines if the name is the name of a
hackathon. It determines this by Googling the name and, if the results mention the exact name often
and the word "hackathon" often, it is a hackathon.

To deploy, run `npm run zip && npm run deploy`
