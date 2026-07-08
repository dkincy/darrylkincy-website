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

### 1. Swap in real photos
Search `index.html` for `PHOTO SWAP`. Replace the `photo-placeholder` div
inside each `photo-frame` with a real image, e.g.:

```html
<img src="assets/img/darryl-hero.jpg" alt="Darryl Kincy">
```

Put images in `assets/img/` (create the folder). The hero portrait looks best
as a 4:5 vertical crop.

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
`.github/workflows/deploy-pages.yml`. To use the `darrylkincy.com` domain,
add it under **Settings → Pages → Custom domain** and point the domain's DNS
at GitHub Pages.

## Editing copy
All copy lives in `index.html` in clearly-labeled sections (ROUND 1–4).
The bio timeline in ROUND 1 was drafted from public sources — edit freely.
