# darrylkincy.com — "In His Corner"

Single-page personal-brand site for **Darryl Kincy**, youth mentor & educator.
A cinematic scroll journey built on the cornerman metaphor: hero → story →
the fight → the KOrnerman podcast → offers → email signup, all stitched
together by a red "corner rope" line that draws itself as you scroll.

Zero dependencies. No build step. Plain HTML + CSS + JS.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Things to finish wiring up (one-time)

### 1. Photos (done — easy to swap)
Real photos live in `assets/img/` and are already placed: hero
(`hero-skills-camp.jpg`), Story timeline (`story-speaking.jpg`,
`story-student.jpg`), photo band (`band-classroom-group.jpg`), and The Fight
(`fight-session.jpg`). To change any of them, drop a new image in
`assets/img/` and update the matching `src` in `index.html` (the hero one is
marked `PHOTO SWAP`; a 4:5 vertical crop looks best there).

### 2. Connect the email signup
Open `js/main.js` — everything lives in the `CONFIG` block at the top:

- `EMAIL_FORM_ACTION` — paste your Mailchimp / Kit / Beehiiv form action URL.
  Until it's set, the form shows a friendly "coming soon" message.
- `CONTACT_EMAIL` — the address the "Start the Conversation" buttons should
  email. Until it's set, those buttons link to Darryl's LinkedIn instead.

### 3. Add podcast episodes
In `index.html`, find the two `EPISODE SLOT` buttons and paste a YouTube video
ID into `data-video-id` (the part after `watch?v=`). Remove the `disabled`
attribute and the `yt-facade--empty` class, and add a thumbnail span like the
featured episode has.

### 4. Publish with GitHub Pages
One-time repo setting: **Settings → Pages → Source: GitHub Actions**.
After that, every push to `main` deploys automatically via
`.github/workflows/deploy-pages.yml`. The site appears at
`https://dkincy.github.io/darrylkincy-website/`.

### 5. Connect darrylkincy.com (after the Ionos migration finishes)
GitHub Pages keeps hosting the site for free; Ionos only holds the domain
and points it at GitHub. Do this once the domain has fully moved from
GoDaddy to Ionos (and after step 4 — the site must be deployed first):

**A. In Ionos** — log in at ionos.com → **Domains & SSL** →
`darrylkincy.com` → **DNS** (or "Adjust DNS settings"):

1. Delete any leftover A records or website-forwarding records that came
   over from GoDaddy for `@` (the bare domain).
2. Add four **A records**, each with host `@`, pointing to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add one **CNAME record**: host `www` → value `dkincy.github.io`
   (delete any existing `www` record first).

Leave MX/email records alone — this only touches where the website points.

**B. In GitHub** — repo → **Settings → Pages → Custom domain** → type
`darrylkincy.com` → **Save**. GitHub runs a DNS check (green check when the
Ionos records have propagated — minutes to a few hours). When the
**Enforce HTTPS** checkbox becomes clickable, tick it. The free security
certificate can take up to ~24 hours; after that the site is live at
`https://darrylkincy.com` and `https://www.darrylkincy.com`.

## Editing copy
All copy lives in `index.html` in clearly-labeled sections (ROUND 1–4).
The bio timeline in ROUND 1 was drafted from public sources — edit freely.
