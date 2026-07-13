/* =============================================================================
   THE CORNER™
   Where sessions happen. #/corner shows the journey; #/corner/<id> runs a
   session: coach intro → (story) → reflection → (practice) → challenge → done.
   Story and practice stages appear only when the lesson provides them —
   the full KOrnerman lesson shape lives in js/data/lessons.js.
   A session never ends on the screen: the close points the student to his
   real coaching conversation.
   ============================================================================= */

import { store } from "../store.js";
import { LESSONS, lessonById, currentLesson, growthAreaById } from "../data/lessons.js";
import { esc, coachNote, stepDots } from "./helpers.js";

export function renderCorner(container, ctx) {
  const lesson = ctx.param ? lessonById(ctx.param) : null;
  if (lesson) {
    renderSession(container, ctx, lesson);
  } else {
    renderJourney(container);
  }
}

/* ------------------------------- The journey ------------------------------- */

function renderJourney(container) {
  const completed = store.completedLessonIds();
  const current = currentLesson(completed);

  const items = LESSONS.map((lesson) => {
    const done = completed.includes(lesson.id);
    const isCurrent = lesson.id === current.id && !done;
    const area = growthAreaById(lesson.growthArea);
    return `
      <a href="#/corner/${lesson.id}"
         class="lesson-item ${done ? "is-done" : ""} ${isCurrent ? "is-current" : ""}">
        <span class="lesson-item__step">${done ? "✓" : lesson.order}</span>
        <span class="lesson-item__body">
          <span class="lesson-item__title">${esc(lesson.title)}</span>
          <span class="lesson-item__meta">
            ${esc(area ? area.name : "")}${done ? " · Completed — revisit any time" : isCurrent ? " · Your next session" : ""}
          </span>
        </span>
        <span class="lesson-item__go" aria-hidden="true">›</span>
      </a>`;
  }).join("");

  container.innerHTML = `
    <section class="view">
      <p class="eyebrow">The Corner</p>
      <h1 class="title">Take a seat.</h1>
      <p class="lede">
        This is where the work happens. One session at a time, no rush.
        Finished sessions stay open — come back to them whenever you need to.
      </p>
      ${items}
    </section>
  `;
}

/* -------------------------------- A session -------------------------------- */

/* Stages flex with the lesson: story and practice only appear when the
   curriculum provides them. */
function stagesFor(lesson) {
  const stages = ["intro"];
  if (lesson.story) stages.push("story");
  stages.push("reflect");
  if (lesson.practice) stages.push("practice");
  stages.push("challenge", "done");
  return stages;
}

function renderSession(container, ctx, lesson) {
  const profile = store.getProfile();
  const STAGES = stagesFor(lesson);
  const answers = {};
  let stage = 0;

  function paint() {
    const name = STAGES[stage];
    if (name === "intro") paintIntro();
    else if (name === "story") paintStory();
    else if (name === "reflect") paintReflect();
    else if (name === "practice") paintPractice();
    else if (name === "challenge") paintChallenge();
    else paintDone();
    window.scrollTo(0, 0);
  }

  function shell(inner, stepLabel) {
    container.innerHTML = `
      <section class="view">
        <p class="eyebrow">The Corner · Session ${lesson.order}</p>
        <h1 class="title">${esc(lesson.title)}</h1>
        ${stepDots(STAGES.length - 1, stage)}
        <p class="step-count">${stepLabel}</p>
        ${inner}
      </section>
    `;
  }

  function paintIntro() {
    shell(`
      <div class="card card--accent">
        ${coachNote(profile.coach, lesson.coachIntro)}
      </div>

      <div class="video-slot" role="img" aria-label="Video placeholder">
        <div>
          <div class="video-slot__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <p>${esc(lesson.videoNote)}</p>
        </div>
      </div>

      <div class="btn-row btn-row--split">
        <a href="#/corner" class="btn btn--quiet">‹ Back to The Corner</a>
        <button class="btn btn--primary" data-next>I'm ready — let's talk</button>
      </div>
    `, "Sit down · Coach has something for you");
    container.querySelector("[data-next]").addEventListener("click", next);
  }

  function paintStory() {
    shell(`
      <div class="card card--accent">
        <p class="card__label">A story from Coach</p>
        ${coachNote(profile.coach, lesson.story)}
      </div>
      <div class="btn-row btn-row--split">
        <button type="button" class="btn btn--quiet" data-back>‹ Back</button>
        <button class="btn btn--primary" data-next>What that means for me</button>
      </div>
    `, "Listen · A real moment, worth learning from");
    container.querySelector("[data-back]").addEventListener("click", back);
    container.querySelector("[data-next]").addEventListener("click", next);
  }

  function paintPractice() {
    shell(`
      <div class="card card--accent">
        <p class="card__label">Practice it</p>
        <p class="coach-note__text">${esc(lesson.practice)}</p>
      </div>
      <div class="card">
        ${coachNote(profile.coach, "You don't build a new default by knowing it — you build it by running it. Try this out loud, with your coach or someone you trust.")}
      </div>
      <div class="btn-row btn-row--split">
        <button type="button" class="btn btn--quiet" data-back>‹ Back</button>
        <button class="btn btn--primary" data-next>I'll run it</button>
      </div>
    `, "Practice · Run the rep before life throws it");
    container.querySelector("[data-back]").addEventListener("click", back);
    container.querySelector("[data-next]").addEventListener("click", next);
  }

  function paintReflect() {
    const fields = lesson.reflections.map((r, i) => `
      <div class="field">
        <label for="ref-${i}">${esc(r.prompt)}</label>
        <textarea id="ref-${i}" data-ref="${esc(r.id)}"
          placeholder="Take your time. There's no wrong way to say it.">${esc(answers[r.id] || "")}</textarea>
      </div>
    `).join("");

    shell(`
      <div class="card">
        ${coachNote(profile.coach, "No grades here — just an honest conversation. Say it the way you'd say it to me.")}
      </div>
      <form class="card" id="reflect-form">
        ${fields}
        <div class="btn-row btn-row--split">
          <button type="button" class="btn btn--quiet" data-back>‹ Back</button>
          <button type="submit" class="btn btn--primary">Take your next step</button>
        </div>
      </form>
    `, "Reflect · Your turn to talk");

    container.querySelector("[data-back]").addEventListener("click", back);
    container.querySelector("#reflect-form").addEventListener("submit", (event) => {
      event.preventDefault();
      container.querySelectorAll("[data-ref]").forEach((area) => {
        answers[area.dataset.ref] = area.value;
      });
      next();
    });
  }

  function paintChallenge() {
    shell(`
      <div class="card card--accent">
        <p class="card__label">This week's challenge</p>
        <p class="coach-note__text">${esc(lesson.challenge)}</p>
      </div>
      <div class="card">
        ${coachNote(profile.coach, "A challenge isn't homework. It's one real rep, in your real life. That's how this becomes yours.")}
      </div>
      <div class="btn-row btn-row--split">
        <button type="button" class="btn btn--quiet" data-back>‹ Back</button>
        <button class="btn btn--primary" data-commit>I'm taking this on</button>
      </div>
    `, "Step up · One rep this week");

    container.querySelector("[data-back]").addEventListener("click", back);
    container.querySelector("[data-commit]").addEventListener("click", () => {
      store.completeLesson(lesson.id, answers, true);
      store.addCommitment(lesson.challenge, "lesson", lesson.id);
      next();
    });
  }

  function paintDone() {
    shell(`
      <div class="card card--accent">
        ${coachNote(profile.coach,
          `Good work today, ${profile.firstName}. You sat down, you told the truth, and you picked up a challenge. ` +
          `That's the new default we're building — deciding instead of reacting, one rep at a time. I'll see you back here.`)}
      </div>
      <div class="card">
        <p class="card__label">Talk it over</p>
        <p>${esc(lesson.talkAboutIt ||
          "A session isn't finished on a screen. Bring today's challenge into your next conversation with your coach — what you wrote, or just how it went. That's where it becomes real.")}</p>
      </div>
      <div class="btn-row">
        <a href="#/home" class="btn btn--primary">Back to your Corner</a>
        <a href="#/progress" class="btn btn--ghost">See your growth</a>
      </div>
    `, "Session complete");
  }

  function next() { stage = Math.min(stage + 1, STAGES.length - 1); paint(); }
  function back() { stage = Math.max(stage - 1, 0); paint(); }

  paint();
}
