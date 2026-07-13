# KOrnerman — Version 1 Prototype

The first working prototype of **KOrnerman**: a coaching space where a young
man enters The Corner™, hears from his coach, reflects on real moments with
Replay™, and practices making the next right decision.

Built to the five foundation documents (Project Brief, V1 Product
Specification, Build Instructions, Voice & Personality Guide, AI Behavior
Guide). Version 1 is the **student experience only** — no mentor dashboard,
no parent portal, no reporting, no AI engine. Those are future phases.

## Run it locally

Zero dependencies, no build step — same as the main site. From the repo root:

```bash
python3 -m http.server 8000
# open http://localhost:8000/kornerman/
```

Once the branch is merged to `main`, GitHub Pages serves it automatically at
`https://darrylkincy.com/kornerman/`. It is intentionally **not linked** from
the public site — share the direct URL with whoever you want feedback from.

## What's inside

| Screen | What it does |
| --- | --- |
| Welcome | The front door: short introduction + profile creation (first name, grade, school, coach) |
| Home | "What is my next right step?" — weekly focus, coach message, Continue, Replay, growth summary |
| The Corner™ | The five-session journey; each session: coach intro → video slot → reflection → action challenge |
| Replay™ | The six-step guided reflection, one question per screen, ending on the next right decision |
| Growth | Growth areas (Self-Control, Ownership, Decision-Making, Integrity), milestones, commitments |
| Me | Profile editing, privacy explanation, crisis-support pointer (988), start-fresh reset |

## Where the student's data lives

Everything a student writes stays in his browser's local storage, on his own
device. Nothing is uploaded or shared. That's the right shape for a prototype
(no real accounts for minors), and `js/store.js` is the single doorway to that
data — when a real account system arrives, it replaces the internals of that
one file and every screen keeps working.

## Editing the coaching content

All lesson content, growth areas, and Coach's rotating dashboard messages live
in **`js/data/lessons.js`**. Each lesson is a plain block of text fields —
title, focus, coach introduction, reflection questions, weekly challenge.
Edit freely; the only rule is the voice test:

> "Would Coach Daryl say this to Marcus while sitting across from him in
> The Corner?"

When session videos are ready, the dashed "video slot" in each session is
where they'll go.

## File map

```
kornerman/
  index.html            app shell + navigation
  css/kornerman.css     the KOrnerman design system
  js/app.js             screen routing
  js/store.js           on-device storage (profile, sessions, replays, commitments)
  js/data/lessons.js    ← all coaching content lives here
  js/views/             one file per screen (welcome, home, corner, replay, progress, profile)
```
