# Hack-a-find
Monitors Twitter for new hackathons

To collect tweets, run

```shell
node . \
	--consumer_key WHATEVER \
	--consumer_secret WHATEVER \
	--access_token_key WHATEVER \
	--access_token_secret WHATEVER
```

To find hackathons from the saved tweets, run `node src/findHackathons.js`
