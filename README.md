# Niche Radar: Instagram niche research plugin for Claude

**Find out what to post on Instagram, backed by real data.** Niche Radar is a free, open source plugin for **Claude Cowork** and **Claude Code** that researches any Instagram niche and turns it into an interactive report: audience size, rising trends, the top creators and reels, reel templates you can copy, and 50 post ideas.

Give it a vague idea like *"Durga Puja looks"*, *"learning system design with AI"* or *"my fitness app"*, and it does the Instagram research for you.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Claude Cowork](https://img.shields.io/badge/Claude-Cowork-d97757)
![Claude Code](https://img.shields.io/badge/Claude-Code-d97757)
![Instagram](https://img.shields.io/badge/Instagram-Reels-E4405F)

## What you get

- **Market size:** how many people view content in your niche, locally and internationally
- **Trends:** which topics are rising or fading this week compared with the month
- **Top 20 Instagram creators and top 50 reels** in the niche, each linked to Instagram
- **Top 20 reel templates to copy:** reused audios and copyable structures, ranked by the views a typical reuse gets, each with a fill-in recipe for your brand
- **What works and what doesn't,** with numbers and examples
- **50 Instagram post ideas,** each tied to the reels it's based on
- **A built-in QA check** that recomputes every number and checks every link before the report is published

## Who it's for

Instagram creators, small brands, founders, social media managers and marketers who want a **content strategy** based on what's actually getting views, not guesses.

## Install

### Claude desktop app (Cowork)

1. Open **Customize** in the left sidebar, then **Plugins**.
2. Click **Add**, then **Add marketplace**, then **Add from a repository**.
3. Paste `anuragn091/claude-instagram-niche-radar`
4. Find **niche-radar** and click **Install**. Turn on **Sync automatically** to get updates.

### Claude Code

```
/plugin marketplace add anuragn091/claude-instagram-niche-radar
/plugin install niche-radar@niche-radar
```

## Requirements

- A paid Claude plan (Pro, Max, Team or Enterprise)
- Google Chrome with the Claude extension, logged in to Instagram
- The research is **read-only**: it never likes, follows, comments or sends DMs

## How to use

Start a new task and say something like:

> Analyze my Instagram niche: home workouts for busy parents. My handle is @yourhandle.

> What content should I post about budget travel in India?

> Find the top creators and reels for AI productivity tips.

The run takes a while because it looks through real profiles and reels. You get back a report page you can open again and share.

## What's inside

| Part | What it does |
| - | - |
| `instagram-niche-analyzer` skill | The full research method: 17 content types, local and international markets, audio and festival timing |
| `niche-analyst` agent | Runs the research end to end and builds the report |
| `radar-qa` agent | Checks every number, link and claim before the report is published |

## FAQ

**Is it free?** Yes. The plugin is free and MIT licensed. You need a paid Claude plan to run plugins.

**Does it post or engage on my Instagram account?** No. It only reads public pages.

**Does it use the Instagram API?** No. It browses Instagram in your Chrome the way you would.

## Author

Made by [Anurag Nigam](https://anuragnigam.in), founder of [Zpply](https://zpply.in). If it helps you, star the repo so others can find it.

## License

[MIT](LICENSE)
