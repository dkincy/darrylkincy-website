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
| Welcome | The front door: introduction, the trust & safety promises (stated up front, framed as care), profile creation |
| Home | "What is my next right step?" — weekly focus, coach message, the KOrnerman Decision System, Continue, Replay, growth summary |
| The Corner™ | The session journey; each session: coach intro → video slot → (story) → reflection → (practice) → action challenge → talk it over with your coach |
| Replay™ | The six-step guided reflection, one question per screen, ending on the next right decision — the "Reflect & Learn" step of the Decision System |
| Growth | The six growth qualities (Self-Control, Ownership, Decision-Making, Integrity, Emotional Regulation, Personal Responsibility), milestones, commitments |
| Me | Profile editing, privacy & trust explanation, crisis-support pointer (988), start-fresh reset |

## Where the student's data lives — and what the student is told

In this prototype, everything a student writes stays in his browser's local
storage, on his own device — nothing is uploaded. That's the right shape for a
prototype (no real accounts for minors), and `js/store.js` is the single
doorway to that data — when a real account system arrives, it replaces the
internals of that one file and every screen keeps working.

The **promise shown to the student** is deliberately ahead of the technology:
per the founder's Trust & Confidentiality and Safety decisions, students are
told from the first screen that this corner runs on trust, not secrecy — that
trusted adults may review what they write when it supports their growth or
protects their safety, and that disclosures involving danger, abuse, or harm
bring in adults who can help, as an act of care. Never re-promise total
secrecy; that promise can only be made once.

## Editing the coaching content

All lesson content, the six growth qualities, the KOrnerman Decision System
(a founder-level working draft — edit it as it evolves), and Coach's rotating
dashboard messages live in **`js/data/lessons.js`**. Each lesson is a plain
block of text fields — title, focus, coach introduction, reflection questions,
weekly challenge, plus optional `story`, `practice`, and `talkAboutIt` fields
whose screens appear automatically once the content is written.
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
