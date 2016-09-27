![](main.png)

# Find-A-Hack (Hack Cooper)
As hackers, we know how hard it is to find hackathons, so we designed a web app that scrapes the internet for hackathons. That way, people like us can just open up a website and it'll show ALL the hackathons on the internet, not just the ones that humans found.

# Features
Uses Geocoding from Google API's to use the users current location to only display hackathons that are nearby. We also have a feature that allows the user to choose the max distance from hackathons to display.

# A.I. Algorithm
We parsed through hundreds of recent tweets that include the word "hackathon" and extracted the nouns with NLP. Once we had the nouns, we Googled each noun and, if the results included the noun and had the word "hackathon" often, we assumed that the noun is a hackathon, which we found to be an accurate system. However, Google realized that we were using their search engine hundreds of times a second, so they blocked our IP. We then used AWS Lambda to spawn new virtual computers with various IP addresses; Google couldn't block all the addresses, so we managed to get around Google's anti-spam measures. Amazon 1 Google 0

# Problems/Issues
Our system works fairly well, but in order for this system to work well many requests need to be made. Google and Twitter (as well as many other valuable sources) have rate limits and we can not freely scrape without being resorted to paying for these queries. Our quick fix was trying to use AWS Lambda to generate fake IP-Addresses over a span of time so that we could fool the API's into to giving us more requests/queries... This albeit clever still did not solve the problem fully.

# Overall
We think that using A.I. to find hackathons is a great solution to the lack of a comprehensive list of hackathons.

# API's/Tools
Google Geocoding API
Google Custom Search API
AWS Lambda
Twitter API
Google Search
