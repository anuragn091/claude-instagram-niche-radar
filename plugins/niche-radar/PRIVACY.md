# Privacy policy: Instagram Niche Research

Effective 13 October 2026. This policy covers the Instagram Niche Research plugin for Claude (Cowork, Claude apps and Claude Code), made by Anurag Nigam.

## The short version

- The plugin has no server, account, analytics or tracking of its own. The author receives none of your data.
- It reads Instagram pages in your own Chrome browser, analyses them in your Claude workspace, and saves the report in your own Claude account.
- Nothing is sent to any third party other than Anthropic, which runs Claude.

## What the plugin reads

**Public Instagram data.** While a run is going, Claude opens public Instagram pages in your logged-in Chrome browser (keyword search results, creator profiles, reels and audio pages) and reads:

- creator usernames, follower counts and profile details shown on the page
- each reel's view, like and comment counts, caption, posting date and cover image
- the audio used on reels, and how many times an audio has been reused

To count posts without making extra requests, a small helper script (`boot.js`) keeps a copy of the data Instagram's own page already loads. A second script (`audio.js`) reads the reuse count from an audio page. Neither script sends data anywhere.

**Your own account's Insights (optional).** If the browser is logged in to the professional account being analysed, the plugin also reads that account's Insights pages: views, reach, follower and non-follower split, interactions, profile visits, link taps and per-post numbers. It skips this when you're logged in as a different account.

**What you tell Claude.** The niche, your handle, competitors you name, and brand rules you've saved in Claude's memory (for example "no logo in the first 3 seconds").

**What it never reads or does.**

- It never reads cookies, passwords or direct messages.
- It never types credentials. If Instagram asks you to log in, you do it yourself.
- It never likes, follows, comments, saves, sends messages, boosts posts or changes anything on your account.

## Where the data goes

- **Your browser.** The helper scripts keep their working data in your browser's local storage for instagram.com (the keys start with `__niche`). The main keys are cleared at the end of each run. The audio results key (`__nicheAudio`) can stay until you clear Instagram's site data in Chrome.
- **Your Claude workspace.** Run data is saved as files in the Claude session's workspace: tables of reels and profiles, the analysis, and small resized cover images.
- **Your Claude account.** The finished report is published as an artifact in your own Claude account. It's private until you choose to share it. It contains creator usernames, public reel numbers, links to Instagram and small cover thumbnails.
- **Anthropic.** Everything Claude reads and writes is processed by Anthropic under [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy) and your Claude plan's terms.

## How long it's kept

- The author keeps nothing.
- Workspace files and published reports stay in your Claude account until you delete them.
- Browser storage stays until the plugin clears it or you clear site data in Chrome.

## Other people's data

The reports include public information about other Instagram creators: usernames, public counts and cover images. Use it to research content trends, follow Instagram's terms and the laws that apply to you, and think before you share a report publicly.

## Children

The plugin isn't intended for anyone under 18.

## Changes and contact

Changes to this policy are published in this repository, and the commit history shows what changed. For questions or data requests, open an issue at https://github.com/anuragn091/claude-instagram-niche-research/issues.
