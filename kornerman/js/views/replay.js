/* =============================================================================
   REPLAY™ — the signature KOrnerman reflection.
   One question per screen, unhurried. A moment gets slowed down and looked at
   with a coach — never investigated. Understanding → Learning → Growth.
   ============================================================================= */

import { store } from "../store.js";
import { esc, coachNote, stepDots } from "./helpers.js";

const STEPS = [
  {
    id: "happened",
    question: "What happened?",
    coach: "Just the story, the way you saw it. I'm listening.",
    placeholder: "Walk me through it...",
  },
  {
    id: "thinking",
    question: "What were you thinking?",
    coach: "Help me understand what was going through your mind in that moment.",
    placeholder: "In that moment I was thinking...",
  },
  {
    id: "feeling",
    question: "What were you feeling?",
    coach: "Feelings aren't wrong — they're information. Angry, embarrassed, disrespected, tired... name what was really there.",
    placeholder: "I was feeling...",
  },
  {
    id: "choice",
    question: "What choice did you make?",
    coach: "Somewhere in that moment there was a decision point. What did you choose to do?",
    placeholder: "I chose to...",
  },
  {
    id: "result",
    question: "What happened because of that choice?",
    coach: "Decisions create direction. Where did that one take things?",
    placeholder: "Because of that choice...",
  },
  {
    id: "nextRight",
    question: "What is your next right decision?",
    coach: "This is the one that matters most. The moment already happened — the next move is still yours.",
    placeholder: "My next right decision is...",
  },
];

export function renderReplay(container) {
  const profile = store.getProfile();
  const answers = {};
  let step = -1; // -1 = the framing screen before step 1

  function paint() {
    if (step === -1) paintStart();
    else if (step < STEPS.length) paintStep();
    else paintDone();
    window.scrollTo(0, 0);
  }

  function paintStart() {
    container.innerHTML = `
      <section class="view">
        <p class="eyebrow">Replay</p>
        <h1 class="title">Let's slow the moment down.</h1>
        <p class="lede">
          A Replay is what a coach and a fighter do between rounds — they look at
          what just happened so the next round goes better.
        </p>
        <div class="card card--accent">
          ${coachNote(profile.coach,
            "You're here to learn, not to be punished. You are not defined by this moment — we're just going to look at it together, one question at a time.")}
        </div>
        <div class="btn-row">
          <button class="btn btn--primary" data-start>Start the Replay</button>
          <a href="#/home" class="btn btn--quiet">Not right now</a>
        </div>
      </section>
    `;
    container.querySelector("[data-start]").addEventListener("click", () => {
      step = 0;
      paint();
    });
  }

  function paintStep() {
    const current = STEPS[step];
    container.innerHTML = `
      <section class="view">
        <p class="eyebrow">Replay</p>
        <h1 class="title">${esc(current.question)}</h1>
        ${stepDots(STEPS.length, step)}
        <p class="step-count">Step ${step + 1} of ${STEPS.length}</p>

        <div class="card">
          ${coachNote(profile.coach, current.coach)}
        </div>

        <form class="card" id="step-form">
          <div class="field">
            <label class="sr-only" for="answer">${esc(current.question)}</label>
            <textarea id="answer" placeholder="${esc(current.placeholder)}">${esc(answers[current.id] || "")}</textarea>
            <p class="hint">Take your time. Short and honest beats long and polished.</p>
          </div>
          <div class="btn-row btn-row--split">
            <button type="button" class="btn btn--quiet" data-back>
              ${step === 0 ? "‹ Start over" : "‹ Back"}
            </button>
            <button type="submit" class="btn btn--primary">
              ${step === STEPS.length - 1 ? "Lock in my decision" : "Next"}
            </button>
          </div>
        </form>
      </section>
    `;

    const textarea = container.querySelector("#answer");
    textarea.focus();

    container.querySelector("[data-back]").addEventListener("click", () => {
      answers[current.id] = textarea.value;
      step -= 1;
      paint();
    });

    container.querySelector("#step-form").addEventListener("submit", (event) => {
      event.preventDefault();
      answers[current.id] = textarea.value;
      if (step === STEPS.length - 1) {
        store.saveReplay({ ...answers });
      }
      step += 1;
      paint();
    });
  }

  function paintDone() {
    const decision = (answers.nextRight || "").trim();
    container.innerHTML = `
      <section class="view">
        <p class="eyebrow">Replay complete</p>
        <h1 class="title">That took real strength, ${esc(profile.firstName)}.</h1>
        <p class="lede">
          Reacting is easy. Sitting down and looking at a moment honestly —
          that's the harder thing, and you just did it.
        </p>

        ${decision ? `
          <div class="card card--accent">
            <p class="card__label">Your next right decision</p>
            <p class="coach-note__text">${esc(decision)}</p>
            <p class="soft small" style="margin-top:0.6rem;">
              Saved to your commitments. Your word matters — I know you can keep it.
            </p>
          </div>` : ""}

        <div class="card">
          ${coachNote(profile.coach,
            "This moment doesn't define you. What you do next is what counts — and you've already named it. I'm in your corner.")}
        </div>

        <div class="btn-row">
          <a href="#/home" class="btn btn--primary">Back to your Corner</a>
          <a href="#/progress" class="btn btn--ghost">See your growth</a>
        </div>
      </section>
    `;
  }

  paint();
}
