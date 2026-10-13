# Instagram Niche Research for Claude

Tell Claude what you want to post on Instagram, even vaguely ("Durga Puja looks", "learning system design with AI", "my job-search app"), and Instagram Niche Research researches that niche on Instagram and builds an interactive report page. It shows:

- how big the audience is in that niche, locally and internationally
- which topics are rising or fading this week compared with the month
- the top 20 creators and top 50 reels, each linked to Instagram
- the top 20 templates: readymade reel formats (a reused audio, a copyable structure, or both) ranked by the views a typical reuse gets, each with a fill-in recipe for your brand
- what's working and what isn't, with numbers and examples
- 50 post ideas, each tied to the reels it's based on

It's for Instagram creators, small brands, founders and social media managers who want a content plan based on what's getting views right now.

## What's inside

- **instagram-niche-analyzer** (skill): the full method, covering 17 content types, local and international markets, the professional dashboard, location pages, audio and festival timing.
- **niche-analyst** (agent): runs the skill end to end and returns a built page.
- **radar-qa** (agent): checks the page before it's published. It recomputes every number from the raw data, checks every link and claim, tests the page on desktop and phone, and checks the copy against your writing skill. The page is published only after it passes, or after 3 fix rounds with the open issues listed.

## Requirements

- A paid Claude plan
- Google Chrome with the Claude in Chrome extension, logged in to Instagram
- Optional: an `anti-ai-slop-writing` or `my-writing-style` skill for the writing check

## How to use

Start a task and say something like "Analyze my Instagram niche: home workouts for busy parents, my handle is @yourhandle" or "What content should I post about budget travel in India?". A full run takes a while because it reads real profiles and reels.

## What the plugin accesses and runs

- **Instagram, through your own Chrome session.** Claude opens public Instagram pages (search results, profiles, reels, audio pages) in your logged-in browser and reads the numbers shown there. If you are logged in as the account being analysed and it is a professional account, it also reads that account's own Insights pages. It never logs in for you, and it never likes, follows, comments, saves, sends DMs or clicks Boost.
- **Two small in-page helper scripts** (`skills/instagram-niche-analyzer/references/boot.js` and `audio.js`). Claude runs them in the Instagram tab. `boot.js` keeps a copy of the JSON responses Instagram's own page already loads, so posts can be counted without extra requests. `audio.js` reads the reuse count and remake grid from an audio page. Neither script sends data anywhere; they keep results in that tab's `localStorage`, which the skill clears at the end of a run.
- **Your workspace and your Claude account only.** Run data is saved as files in your Claude workspace, and the finished report is published as a private artifact in your own Claude account. Nothing is sent to any other server or third party.
- **No MCP servers, hooks, package installs or credentials.**

## License

MIT. Made by [Anurag Nigam](https://anuragnigam.in).
