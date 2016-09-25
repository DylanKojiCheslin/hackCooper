# Hack-a-find
Monitors Twitter for new hackathons

To start the server, run the following line:

```shell
node . \
	--consumer_key WHATEVER \
	--consumer_secret WHATEVER \
	--access_token_key WHATEVER \
	--access_token_secret WHATEVER \
	--port WHATEVER
```

## Server endpoints

**/api/hackathon/**: list of hackathons in JSON. Example:
```json
{
	"hackathons": [{
		"name": "PennApps XII",
		"month": 11,
		"day": 12,
		"year": 2017,
		"location": "University of Pennsylvania",
		"popularity": 100
	}]
}
```

Popularity is an integer percentage from 0 to 100 that ranks the popularity of a hackathon based on
how many people are tweeting about it.
