# darrylkincy.com — Taking The Lead Generation

Single-page site for **Darryl Kincy | Mentor-Coach for Teen Boys**, the face of
**Taking The Lead Generation**, his 501(c)(3) non-profit. Clean white-and-gold
design: hero → who we are → watch & learn → workshop topics → experience →
testimonies → how the program works → ways to work together → contact.

Zero dependencies. No build step. Plain HTML + CSS + JS.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Things to finish wiring up (one-time)

### 1. Swap in the black-and-white headshot
The hero currently uses a stand-in photo (`assets/img/hero-skills-camp.jpg`).
When the headshot is ready, upload it to `assets/img/` (GitHub → this branch →
**Add file → Upload files**), then in `index.html` find the comment marked
`PHOTO SWAP: headshot` and change the `src` to the new filename. A 4:5
vertical crop looks best in the frame.

### 2. YouTube videos (done — easy to swap)
The four **Watch & Learn** slots are wired to Darryl's videos and load right
on the page when a visitor clicks play. To change one, edit its slot in
`index.html`: swap the YouTube video ID in `data-video-id` (the part of the
link after `watch?v=` or `shorts/`) and in the thumbnail URL on the line
below it.

### 3. Contact email & form
Open `js/main.js` — everything lives in the `CONFIG` block at the top:

- `CONTACT_EMAIL` — already set to `dkcoco1@gmail.com`. The inquiry buttons
  and the contact form both use it.
- `CONTACT_FORM_ACTION` — optional upgrade. Right now the contact form opens
  the visitor's email app with a pre-filled message. To collect submissions
  without relying on the visitor's email app, create a free form at
  [formspree.io](https://formspree.io), and paste the form's endpoint URL
  (looks like `https://formspree.io/f/XXXXXXXX`) here.

### 4. Social links
The contact section shows YouTube and LinkedIn circles. Instagram/Facebook
can be added the same way in `index.html` (search for `contact__social`)
once those page URLs exist.

### 5. Publish with GitHub Pages
One-time repo setting (already done): **Settings → Pages → Source: GitHub
Actions**. Every push to `main` deploys automatically via
`.github/workflows/deploy-pages.yml`. The site appears at
`https://dkincy.github.io/darrylkincy-website/`.

### 6. Connect darrylkincy.com (after the Ionos migration finishes)
GitHub Pages keeps hosting the site for free; Ionos only holds the domain
and points it at GitHub. Do this once the domain has fully moved from
GoDaddy to Ionos (and after step 5 — the site must be deployed first):

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
All copy lives in `index.html` in clearly-labeled sections (Who We Are,
Watch & Learn, Workshop Topics, Experience, Testimonies, How the Program
Works, Ways to Work Together, Contact). Edit freely.
