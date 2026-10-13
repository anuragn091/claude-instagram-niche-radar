---
name: instagram-niche-analyzer
description: Use when someone asks what to post on Instagram for a niche, product, brand or idea ("analyze my niche", "what content should I make about X", "top creators and reels for Y"). Finds top creators and reels, the top 20 templates to copy, trends, what works, and 50 post ideas, then QA-checks the interactive report before publishing.
---

# Instagram Niche Analyzer

Turn a vague idea ("content for my product X", "what should I post about Y") into an evidence-backed content plan. Output: one interactive artifact with the viewable market, topic trends, top 20 creators, top 50 reels (thumbnails + links), the top 20 templates to copy, what's working / not working, and 50 post ideas that each link to the reels they're based on. Every view can be switched between Local, International and All.

## Inputs (make reasonable assumptions; don't block)
- The idea / product. If a website exists, fetch it to learn audience, promise and taglines.
- The user's Instagram handle. Check memory for brand rules (e.g. "no logo in first 3 s").
- Market: by default cover BOTH the user's local market and the international (English, global) market, and report them side by side. Only narrow to one if the user asks.
- City or area, for place-led ideas (see Step 0c).
- Optional: competitor handles or creators the user already follows (add them to the creator list).
Only ask if the niche itself is unclear.

## Tools used
- Claude in Chrome on instagram.com, logged in as any account (it doesn't have to be the analysed brand; logging in as the brand's own professional account also unlocks its insights dashboard in Step 1A). If Instagram shows a login screen, ask the user to log in themselves; never type credentials.
- Cloud bash + Python (Pillow) for analysis and thumbnails.
- Artifact tool (load `artifact-design` first; `dataviz` before charts).
- Nothing else is required. No analytics connector, API key or paid scraper.

## Step 0. Classify the idea (do this before keywords)
**0a. Pick the archetype.** Match the idea to one primary archetype from the table below, plus an optional secondary one (many ideas blend two: a cafe owner is 4 + 5, a fitness coach is 3 + 8). Write down three things: the **hero** (product, place, person or topic), the **geography** (hyperlocal city, national, or global) and the **goal** (sales, footfall, followers/authority, or reach).

**0b. Broad idea? Scan sub-niches first.** If the idea is a single broad word or category ("food", "fitness", "travel", "tech", "fashion"), list 5-8 sub-niches that span different archetypes. Example for food: home recipes, restaurant/cafe reviews, street food, healthy/diet food, baking/desserts, budget meals, food comedy, food-business behind the scenes. Boot the collector first (Step 3), then run 1 local + 1 international keyword per sub-niche with `__kw` and score each on: median likes+comments of the top results, share of results posted in the last 30 days (freshness), number of distinct creators in the results (crowding), and fit with the user's handle and skills. Show the user a short score table, pick the best (or the one they lean towards), and say which one you picked in the report. If nobody is there to answer, pick the top score.

**0c. Place-led archetypes need a city.** For archetypes 4, 5, 6 and 17, get the city or area from the user's message, their handle's bio and post locations, or memory. Ask only if there's no clue. Then Local = that city plus nearby cities, National = the rest of the country, International = format inspiration only.

**0d. Festivals, seasons and yearly events.** If the idea is tied to a date that repeats (a festival like Durga Puja or Diwali, a sale season, an exam result day, an annual conference), look up this year's dates first and tell the user how many days are left. Then also pull **last year's edition**: run the same keywords and creators, and keep reels posted from 3 weeks before to 1 week after last year's dates, even though they're older than the usual 75-day cut. Report them as a separate "Last year" set that shows what peaked before, during and after the event, and use it to time this year's ideas.

### Archetype reference
Read `references/archetypes.md` for the 17 archetypes (consumer product, app/SaaS, service, local business, local discovery, travel, expert/educator, hobby and skill, lifestyle, fashion and beauty, family/pets/home, comedy, news, motivation and storytelling, affiliate, cause/community, events and launches). Each row gives examples, hero and geography, extra sources, starter topics and the metric that matters most.

### How the archetype changes the run
- **Keywords (Step 2):** product archetypes lean on angles 3 and 7 (category and competitors). Place archetypes put an area or city name in angles 1-5 ("best biryani in Indiranagar") and turn angle 5 into occasions (date night, birthday, weekend, rain, festivals). Entertainment leans on angle 6. News leans on angle 7.
- **Time windows (Step 8):** news and events use a 14-day "month" and a 3-day "week". Evergreen archetypes (7, 8) can stretch the month to 60 days if the sample is thin.
- **Market weighting:** hyperlocal niches rank local creators first and use international reels only for format ideas. Global niches weight local and international equally.
- **Report emphasis:** lead the "you vs niche" section with the archetype's metric that matters most (from the Step 1A dashboard when available; otherwise comments for keyword CTAs and likes per view).

## Step 1. Own baseline (browser only)
**1A. Professional dashboard (run first, before the boot script in Step 3).** Use this when the logged-in account owns the handle and it's a professional (creator or business) account. These are full page loads, so do them before booting the collector, or re-run the boot script afterwards. If a page redirects or comes back empty, skip 1A.
1. **Account overview:** navigate to `https://www.instagram.com/accounts/insights/?timeframe=30`, wait 4 s, then `get_page_text`. Read: Views, % of views from followers vs non-followers, Viewers (accounts reached), views by content type (Reels vs Stories), Interactions and their follower %, Accounts engaged, Profile visits, External link taps, Total followers, and the top content by views and by interactions (values + dates). Repeat with `timeframe=7` for the this-week view (if that value doesn't load, use the date dropdown on the page).
2. **Content ranking:** navigate to `https://www.instagram.com/accounts/insights/content/?media_type=all&metric=accounts_engaged&sort_by=highest&timeframe=30&view_type=card`. The metric dropdown offers Accounts engaged, Interactions, Shares, Viewers and Views; pick one and the URL's `metric=` changes to match (e.g. `metric=shares`). Card values come back from `get_page_text` in card order; take a screenshot to match each value to its post.
3. **Per-post insights:** click a card. It opens `/insights/media/MEDIA_ID/`. `get_page_text` returns nothing on this page, so read it with `javascript_tool`: `[...document.querySelectorAll('[role=dialog]')].pop().innerText` (keep the output under ~950 characters). You get Views, follower/non-follower % of views, Viewers, Interactions, Likes, Comments, Saves, Shares, Accounts engaged, Profile activity and Follows. Press Escape and repeat for the user's recent reels (up to ~15). Never click "Boost this Reel" or any other button that changes something.
Derived metrics for the report: non-follower share of views (how much Instagram pushes the account to new people), saves + shares per 100 viewers, follows per reel, and profile visits and link taps per 1,000 views (conversion). Use them in the "you vs niche" section and the not-working list.

**1B. Public numbers (always; run right after the boot script in Step 3).** Treat the user's handle like any other creator: `await window.__creator('HANDLE')` then `await window.__timeline('HANDLE')`. That gives followers, each recent reel's views (play_count), likes, comments, captions and dates. Compute: reel count, average and median views, best and worst reel, and the opening line of each caption (the hook). These feed the "you vs niche" ladder, the outlier scores and the not-working list. If 1A wasn't possible, these public numbers are enough.

## Step 2. Expand the idea into 16-24 search keywords (local + international)
Build the list from these 7 angles, 2-3 keywords each, weighted the way the archetype in Step 0 says. Use the words the audience types, not industry jargon. Make two sets:
- **International**: plain global English terms ("skincare routine", "freelance tips").
- **Local**: the same angles in the local language, script or slang, or with local names, places, platforms and currency (e.g. Hinglish terms, "in India", local brands or apps).
Roughly half and half. Tag each keyword `L` or `I` so results can be traced.
1. **Core problem**: the pain the audience feels before they find a solution.
2. **Desired outcome**: the result they want.
3. **Solution category**: what products or methods like the user's are called.
4. **How-to and tips**: "how to …", "… tips", "… mistakes".
5. **Adjacent moments**: life events or situations around the problem (seasons, milestones, money, relationships, work).
6. **Relatable / humour**: the memes and in-jokes of this audience.
7. **News and competitors**: current events in the space, and competitor or alternative product categories.

Examples of how the angles map:
| Angle | Fitness supplement (1) | Freelancer invoicing app (2) | Restaurant reviews in Bangalore (5) | Comedy skits (12) |
| --- | --- | --- | --- | --- |
| Core problem | not building muscle | late client payments | where to eat in bangalore | bored at work |
| Outcome | lean bulk | get paid on time | best biryani bangalore | funny reels |
| Solution category | whey protein | invoice software | bangalore food blogger | comedy skits |
| How-to | high protein meals | how to price freelance work | what to order at [place] | how to make skits |
| Adjacent moments | gym beginner | quitting 9 to 5 | date night cafe bangalore | office life, family life |
| Relatable | gym memes | freelancer life | expectation vs reality cafe | relatable memes |
| News / competitors | supplement review | upwork fees | new cafe opening bangalore | trending audio, viral trend |

After the sweep, drop keywords whose results are mostly off-topic and replace them once.
Note: Instagram search is personalised to the logged-in account's country, so international results can be under-represented. Compensate with global English keywords and by adding well-known international creators in the niche to the creator list.

## Step 2b. Define the topic codes for this niche
Start from the archetype's starter topics (in `references/archetypes.md`), then read the captions from the keyword sweep and adjust them into 8-10 topic codes that fit this niche (one letter each), plus `X` for off-niche. Good topics name a content theme the audience recognises (e.g. for skincare: routines, ingredient explainers, before/after, product reviews, myths, budget dupes, dermatologist takes, relatable fails). Keep the code list in the analysis script so the artifact labels stay consistent.

## Step 3. Boot the in-page collector (Chrome)
1. `tabs_context_mcp` (createIfEmpty), navigate the tab to `https://www.instagram.com/`, wait 3 s.
   For a new niche, first clear old run data: `['__nicheKW','__nicheGrid','__nicheProf'].forEach(k=>localStorage.removeItem(k))`. Clear them again at the end of the run once the data is in the cloud files. If the user has no handle yet, skip the baseline and compare against small creators only.
2. Run this boot script with `javascript_tool`. It hooks XHR/fetch to capture Instagram's own GraphQL responses while you navigate inside the app (no extra API calls), stores everything in localStorage so a page reload loses nothing, and exposes helpers.

The script is in `references/boot.js`. Read the file and pass its full contents to `javascript_tool` unchanged.

Helpers: `__kw(q)` keyword search posts (owner, date, likes, comments, caption; no views) · `__loc(path)` location page posts (same fields) · `__creator(user)` reels tab (views=play_count, likes, comments, followers) · `__timeline(user)` profile posts (captions, dates, audio, tagged place) · `__queue('kw'|'loc'|'cr', list)` / `__tlq(list)` run lists in the background · `__dump(text)` writes text into an article element for export.

### Hard-won gotchas
- Navigation must be SPA (`history.pushState` + `popstate`, done by `__nav`). A full `navigate` wipes the hooks; re-run the boot script after any reload (data survives in localStorage).
- Instagram sometimes reloads the page by itself mid-queue. Check `window.__log`; if undefined, re-boot and queue only what's missing.
- The tab is hidden, so timers get throttled. Keep it active while a queue runs: poll with `browser_batch` of tiny screenshots (`scale: 0.1`) and 3-4 s waits, then read `window.__log` / `window.__busy`.
- `browser_batch` times out around 30-60 s. Never await long work inside it; start queues fire-and-forget and poll.
- `javascript_tool` returns only ~1,000 characters and blocks output that looks like cookies, query strings or base64. Never read `document.cookie`. Strip URLs and `= & ?` from captions (`__clean`). Export bulk data with `__dump(...)` then `get_page_text` (50,000-character limit, so chunk at ~40k).
- `/api/v1/users/web_profile_info/` gets 429s. Don't call private endpoints directly; let the app make its own requests.
- Likes shown as `3` mean the creator hid likes.
- Audio pages (`/reels/audio/ID/`) only render while the tab is active. They load 12 remakes at a time, and the grid is Instagram's own pick of remakes, so treat medians from it as slightly optimistic. The web has no template browser (`/reels/templates/` returns "page isn't available") and no "Use template" button.

## Step 4. Keyword sweep and creator shortlist
- `window.__queue('kw', KEYWORDS)` and poll until `__busy` is false (~5-8 s per keyword).
- In-page, group posts by owner: posts count, total likes+comments, last post date. Keep owners active in the last 75 days, then pick 40-60 creators by engagement and relevance (read handles/captions; drop off-niche). Add known niche accounts and direct competitors.
- Tag every creator's market: `L` local or `I` international, from caption language and slang, currency, place names, bio and which keyword set found them. Aim for at least 15 of each so both sides can be ranked.

## Step 4b. Extra discovery sources (only when the archetype calls for them)
- **Location pages (archetypes 4, 5, 6, 17).** The directory starts at `/explore/locations/CC/country-slug/` (e.g. `/explore/locations/IN/india/`), which lists cities as `/explore/locations/cID/slug/`. A city page lists about 100 popular places as `/explore/locations/PK/slug/`. A place page shows its total post count and Top / Recent / "In the area" tabs. Its posts load with owner, date, likes, comments, caption and location, but no views. Load a place with `await window.__loc('/explore/locations/PK/slug/')` or queue many with `__queue('loc', PATHS)`. If one times out, click that place's link on the city page instead; the click is captured the same way. Use place pages to rank places by post count and recent activity, find local creators (the owners of top posts), and spot popular places nobody has covered recently (gaps).
- **Audio (archetypes 8-12 and 14).** `__timeline` records each post's audio (song title and artist, or "Original audio"). In Step 8, count niche reels from the last 30 days per audio and their median outlier multiple. That gives the audio that's working right now, and original audio vs trending songs.
- **Location tags.** `__timeline` also records each post's tagged place. For place-led niches, add up which places creators tag and the views those reels get.

## Step 5. Collect creator data
- `__queue('cr', CREATORS)` then `__tlq(CREATORS)`; poll with screenshot batches. Expect ~12 reels and ~12 captions per creator.
- Build export rows in-page for reels aged 75 days or less: `code ¦ user ¦ views ¦ likes ¦ comments ¦ pinned ¦ keyword-sources ¦ audio ¦ audioId ¦ audioTrend ¦ place ¦ caption(190)`. Shortcode to time: `ms = (BigInt id >> 23) + 1314220021721`, where id decodes the 11-char shortcode in base64url (A-Z a-z 0-9 - _). Also dump followers per creator and per-keyword stats (top-24 results posted in last 7 / 30 days, median likes, median comments).

## Step 6. Transcribe + tag in the cloud
Write `data.psv` one line per reel: `code|user|views|likes|comments|pinned|TOPIC|CTA|MARKET|AUDIO|AUDIOID|PLACE|TEMPLATE|short caption` (MARKET = the creator's `L` or `I`; AUDIO, AUDIOID, PLACE and TEMPLATE may be blank; TEMPLATE is filled in Step 7). Tag while transcribing:
- TOPIC: the codes from Step 2b, plus `X` for off-niche (many creators found by search also post unrelated content; exclude those from niche numbers).
- CTA: C comment-keyword-for-DM · B link in bio/channel · S save/share/tag · N none.
Dates: decode from the shortcode in Python:
```python
A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
def sc2date(sc):
    n=0
    for ch in sc[:11]: n=n*64+A.index(ch)
    return datetime.datetime.utcfromtimestamp(((n>>23)+1314220021721)/1000)
```

## Step 7. Thumbnails and visual tagging
- Download covers from the public endpoint: `curl -sSL "https://www.instagram.com/p/CODE/media/?size=m"` (320x568 JPEG). No login needed.
- Make 5x5 contact sheets with Pillow, `Read` them, and tag FORMAT (Talking head · Faceless B-roll + text · Screen/document · Graphic/poster · Meme · Skit · Podcast clip) plus the on-screen hook text. Fix topic tags where the cover reveals the real topic. Captions alone miss a lot.
- Also tag a TEMPLATE label: the copyable structure of the reel, named so a creator could rebuild it (e.g. "Old film clip + 'X after seeing me work on <date>' text", "Face to camera + deadline in big text", "Screen recording with red arrows", "Two-person POV skit", "Faceless B-roll listicle", "Green-screen reaction to a screenshot"). Use the same label for reels that share a structure. Tag every niche reel from the last 35 days, not only the top 50, so each label has enough reels to rank.

## Step 7b. Templates (readymade formats the user can fill with their own content)
A template is a reel format other people copy with their own clips: the same audio, the same structure, or both. Instagram's "Use template" button and template browser exist only in the mobile app, so on the web measure templates two ways.
- **Audio templates (measured reuse).** Pick candidate audios: any `audioId` used by 2 or more niche reels, used by a top-50 reel, flagged `audioTrend`, or on a reel at 3x or more its creator's norm. Skip original audio that is just the poster's own voiceover (talking heads): in the first run all 7 such pages showed 1 to 3 uses. Keep original audio when someone else owns it or the reel is a meme or skit. Cap at 30 per run. Do this after Step 5's export is safely in the cloud files, because `navigate` is a full page load that wipes the collector (its localStorage data survives). For each, open `https://www.instagram.com/reels/audio/AUDIO_ID/` with `navigate` (original audio uses `original_sound_info.audio_asset_id`; songs use `music_asset_info.audio_cluster_id`, and both open the same way). **Keep the tab active:** take tiny screenshots (`scale: 0.1`) between 2 s waits until the grid shows, scroll down 10 ticks twice with a tiny screenshot after each, then run `references/audio.js` with `javascript_tool`. To save context, scroll with `javascript_tool` (`window.scrollTo(0,document.body.scrollHeight)`) instead of the `computer` scroll action, which returns a full screenshot, and store the reader once in localStorage (`localStorage.setItem('__ar', <audio.js source>)`) so each page only needs `eval(localStorage.getItem('__ar'))`. Three pages fit in one `browser_batch`. It reads the "N reels" reuse count and every remake's code and views from the page and saves them in localStorage under `__nicheAudio`. A page that only shows a spinner is a hidden tab, not a dead page; take more screenshots. At the end, re-run `references/boot.js` (for `__dump`), export `__nicheAudio` with `__dump(JSON.stringify(...))` and `get_page_text`, and save it as `audio.json` in the run folder.
- **Format templates (structure without a fixed audio).** The TEMPLATE labels from Step 7, measured on the niche reels that use them.
- **Recipes need eyes on the reels.** Download covers of each audio template's niche uses plus its top 2 and 2 median copies, build one contact sheet per 4 templates, and `Read` them before writing what the template looks like.

## Step 8. Analysis (Python)
- Outlier multiple: `x = views / median(views of that creator's non-pinned reels in last 60 days)`, needs at least 4 reels.
- Niche set: topic != X, not pinned. Month = age 30 days or less.
- Top 20 creators: niche share at least 50%, at least 3 niche reels in 30 days; rank by total niche views in 30 days; show followers, reels, median, best reel.
- Top 50 reels: niche, age 35 days or less, ranked by views, max 4 per creator.
- Topic momentum: week = reels aged 1.5-9 days, prior = 9-35 days. Ratio = median x (week) / median x (prior). Rising at 1.2 or more, Fading at 0.8 or less, else Steady; "Too few posts" if either side has fewer than 3 reels.
- CTA and format tables: count, median views, median x, median comments.
- Market (state as a floor from the sample): total niche views in 30 days, reel count, median reel, top-10% reel, reels over 100K and over 1M, followers across top 20, median views for small creators (under 25K followers) as the realistic target.
- Keyword freshness: share of top search results posted in last 7/30 days = what Instagram search is pushing now.
- Month at a glance: bucket niche, non-pinned reels aged 35 days or less into 5 weeks by `floor(age / 7)` from the run time. For each week give reel count, average views and median views; mark the latest week "still growing". Also give the 30-day average and median views per niche reel. The user's own account appears only as one reference number (their average views per reel); don't chart their day-by-day data.
- Top 20 templates. For each audio template: reuse count, number of remakes read, median views of the remakes (leave out reels by the audio's owner, matched by handle where the code is in `data.psv`, and the top-left grid reel when it's the original), best remake, share of remakes posted in the last 7 and 30 days (dates from shortcodes), and the niche reels in the sample that use it. For each format template with 3 or more niche reels: reel count, median views, median outlier multiple, best reel. Rank both together by median views (what a typical reuse gets), keep at least 5 of each type when available, and label each Rising (most remakes or uses in the last 7 days), Steady or Fading (no uses in the last 14 days). Drop audio templates with fewer than 6 remakes read, under 50 uses, or no niche reel at 1.5x its creator's norm or more (copies come from all of Instagram, so this keeps only audio that has worked in this niche). For layouts, Rising means their share of reels from the last 7 days is at least 1.25x the whole sample's 7-day share, and Fading means half of it or none in 14 days; for audio, Fading means under 10% of copies in the last 14 days. Say in the section lead that audio medians count copies from all of Instagram, and add a Templates paragraph to Method with these rules.
- Run every metric above three ways: All, Local, International. Rank top 20 creators and top 50 reels within each market too (show the market on every row).
- Cross-market gaps: topics or formats that are Rising or high-performing internationally but rare or absent locally (and the reverse). These are the best early-mover ideas.
- Archetype extras: for place-led niches, a places table (place, posts on its location page, reels in the sample, total and median views, creators who covered it, best reel) and a list of busy places with no recent coverage. For audio-led niches, an audio table (audio, reels using it in the last 30 days, median outlier multiple, example reels) and original audio vs trending songs. Use the time windows set by the archetype in Step 0.

## Step 9. Insights and ideas
- "This week" cards: 3-4 rising or hot patterns, each with 2-3 reel links and a market tag.
- Local vs international: a short comparison of what each side rewards (topics, formats, hooks, length, CTA) and 3-5 cross-market gaps to exploit.
- Working / not working: 5-6 each, every claim backed by numbers and reel links (e.g. reposting the same reel, fake-sounding testimonials, brand accounts posting alone, format fatigue, the user's own weak posts).
- Template recipes: for each of the top 20 templates write a fill-in recipe: what the original shows, the slots to swap (clip, on-screen text, last line), length, the audio, and one filled example for the user's brand. Say how to get it in the app: open the audio page and tap "Use audio", or open a remake and tap "Use template" if Instagram shows it.
- 50 ideas: hook (on-screen first line), format, topic + its trend label, audience, what to show, last line (product only at the end, per brand rules), and 1-2 reference reels. Mix: ~60% rising/steady high-view topics, some evergreen, a few timely (festivals, seasons, news, launches), at least one series and one collab idea, at least one idea using the user's own data. Tag each idea with the market it's aimed at and where its evidence comes from (local reel, international reel, or a cross-market gap); adapt at least 10 ideas from international winners.

## Step 10. Build the artifact
Load `artifact-design` (and `dataviz`). One self-contained HTML page with data inline as JSON and thumbnails as JPEG data URIs (resize to 240 px wide, 4:5 crop, quality ~58; keeps the page under ~1 MB). Put a Local / International / All switch at the top that filters every section. Sections: Overview (archetype and sub-niche chosen, verdict list, KPI tiles, you-vs-niche log ladder, viewable market per market) · Month at a glance (one log-scale line chart of weekly average and median views per niche reel, the latest week shaded as still growing, the user's average as a dashed reference line, plus tiles for the 30-day average, median and the user's average) · Trends (momentum bubble map: x = median views log, y = week/prior ratio log, size = share of views, colour = trend status with labels; topic table; keyword-freshness bars) · This week · Local vs international (comparison + cross-market gaps) · Working / not (+ CTA and format tables) · Top 50 reels (filters by topic/format, sort by views / x / comments / newest, every card links to the reel) · Top 20 creators (table with best-reel thumb and profile link) · Top 20 templates (cards: example thumbnail, type chip Audio or Format, name, median views when reused, uses, trend label, the fill-in recipe, the brand example, links to the audio page and 2-3 remakes; filter by type) · Places or Audio (only when the archetype uses them) · 50 ideas (filters, "Planned" ticks in localStorage, copy hook) · Method and limits. Render with Playwright at 1280 light and 400 dark: no console errors and `scrollWidth` equal to the viewport. Then go to Step 11 before publishing.

**Headline and copy rules.**
- The H1 names the brand (or handle) and the content topic, e.g. "Zpply's job-search content on Instagram" or "Bong Eats' Durga Puja look content on Instagram". Someone opening the page must know whose plan it is and what it covers before reading anything else. Put the recommendation directly under the H1 as one line starting "What to post:", in plain words (say "a person on camera", not "made by a face").
- The first screen also shows the handle, niche, market, data date and sample size.
- Write all copy with the user's writing skill: load `my-writing-style` if it exists, otherwise `anti-ai-slop-writing` if it exists. If neither does, follow these: no em dashes or double hyphens, no banned AI words, no reflexive groups of three, no runs of short choppy sentences, active voice, specific numbers instead of adjectives. Idea hooks are on-screen text, so short punchy lines are fine there.
- Only write claims the data shows. Shares, saves and recruiter or customer behaviour aren't in the collected data, so don't claim them. Say "median" or "average" correctly. A claim like "X reels did Y" needs at least one linked example from the same time window.
- Label cards only with the method's trend labels (Rising, Steady, Fading, Too few posts). Any other chip ("Most views", "New this week", "One-off") gets a one-line note explaining it.
- Check every product claim in idea last lines against the brand's website, and drop anything the site marks "coming soon".
- UI details QA keeps catching: put wide SVG charts in a horizontal scroller under 600px with readable axis text, show a "No reels match these filters" message for empty results, use singular counts ("1 reel"), keep ideas tagged "All" under every audience filter, and keep chart labels the same as the legend and table (e.g. "Fading", not "Cooling").
- Build the page from a template plus a data file (e.g. `template.html` with `__DATA__` replaced by `data.json`), so QA fixes are quick rebuilds.

## Step 11. QA before publishing (required)
- **Who runs it.** If you're the main conversation, do this step yourself. If you're running as the `niche-analyst` subagent, stop after the Playwright render check and return the page path, the run folder and the brand and niche; the main conversation runs QA and publishes.
- **Launch the reviewer.** Use the Agent tool with the `radar-qa` agent (or, if it isn't available, a general-purpose agent given the instructions in this plugin's `agents/radar-qa.md`). Pass it the page path, the run folder (data.psv, prof.tsv, analysis.json, data.json, thumbs/, scripts), the brand, niche and run date, the path of the user's writing skill, and any facts it can't check from files (e.g. where the own-account stats came from).
- **Fix and repeat.** Fix every blocker and major, and every minor that's cheap to fix. Fix the source (template, analysis script or ideas file), not the built page, then rebuild and re-render. If a finding is wrong, say why in the next round instead of changing the page. Send the reviewer the changes with SendMessage so it keeps its context, and repeat until it returns PASS, up to 3 rounds. If it still fails after 3 rounds, publish anyway and list the open findings to the user.
- **Publish** only after PASS (or round 3), then tell the user in one or two lines what QA caught and what's still "not verified".

## Rules
- Read-only: never like, follow, comment, DM or save on the user's account. Keep volume human-like (at most 24 keywords, 60 creators, 30 location pages and 30 audio pages per run). Tell the user the run uses their logged-in session.
- Every number in the artifact comes from the collected data; every example links to its reel.
- State limits: Instagram search leans toward the logged-in account's country, ~12 reels per creator (heavy posters cover 1-3 weeks), reels under 3 days old are still growing, paid boosts are invisible, small weekly samples are directional.
- Re-running weekly on the same keyword and creator lists gives the trend line; keep the files (`data.psv`, `prof.tsv`, `analysis.json`) in a folder named after the niche.