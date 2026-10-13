# Niche Radar

Tell Claude what you want to post on Instagram, even vaguely ("content on Durga Puja looks", "learning system design with AI", "my job app Zpply"), and it builds a report page that shows:

- how big the audience is in that niche, locally and internationally
- which topics are rising or fading this week compared with the month
- the top 20 creators and top 50 reels, each linked to Instagram
- the top 20 templates: readymade reel formats (a reused audio, a copyable structure, or both) ranked by the views a typical reuse gets, each with a fill-in recipe for your brand
- what's working and what isn't, with numbers and examples
- 50 post ideas, each tied to the reels it's based on

## What's inside
- **instagram-niche-analyzer** (skill): the full method, covering 17 content types, local and international markets, the professional dashboard, location pages, audio and festival timing.
- **niche-analyst** (agent): runs the skill end to end and returns a built page.
- **radar-qa** (agent): checks the page before it's published. It recomputes every number from the raw data, checks every link and product claim, tests the page on desktop and phone, and checks the copy against your writing skill. The page goes live only after it passes, or after 3 fix rounds with the open issues listed.

## Needs
- Chrome with the Claude extension, logged in to Instagram. The run is read-only: it never likes, follows, comments or DMs.
- Optional: your `anti-ai-slop-writing` or `my-writing-style` skill for the writing check.
