/* =============================================================================
   HOME DASHBOARD
   Answers one question: "What is my next right step?"
   ============================================================================= */

import { store } from "../store.js";
import { LESSONS, currentLesson, coachMessageForToday, DECISION_SYSTEM } from "../data/lessons.js";
import { esc, coachNote } from "./helpers.js";

export function renderHome(container) {
  const profile = store.getProfile();
  const counts = store.counts();
  const completed = store.completedLessonIds();
  const lesson = currentLesson(completed);
  const firstVisit = counts.lessons === 0 && counts.replays === 0;
  const milestones = store.milestones();

  const welcomeLine = firstVisit
    ? `Welcome, ${esc(profile.firstName)}.`
    : `Welcome back, ${esc(profile.firstName)}.`;

  container.innerHTML = `
    <section class="view">
      <p class="eyebrow">Your Corner</p>
      <h1 class="title">${welcomeLine}</h1>
      <p class="lede">Your next right decision starts today.</p>

      <div class="card card--accent">
        <p class="card__label">This week's focus</p>
        <h2 class="subtitle mt-0">${esc(lesson.focus)}</h2>
        <p class="soft small">Session ${lesson.order} of ${LESSONS.length} · ${esc(lesson.title)}</p>
      </div>

      <div class="card">
        ${coachNote(profile.coach, coachMessageForToday(), `${profile.coach} · Today`)}
      </div>

      <div class="btn-row">
        <a href="#/corner/${lesson.id}" class="btn btn--primary">
          ${store.isLessonDone(lesson.id) ? "Revisit your session" : firstVisit ? "Start your first session" : "Continue your session"}
        </a>
        <a href="#/replay" class="btn btn--ghost">Run a Replay</a>
      </div>
      <p class="small soft" style="margin-top:0.7rem;">
        Something happen recently? A Replay helps you slow the moment down and look at it with your coach.
      </p>

      <div class="card">
        <p class="card__label">Your corner tool · The KOrnerman Decision System</p>
        <ol class="decision-system">
          ${DECISION_SYSTEM.map((s) => `
            <li>
              <strong>${esc(s.name)}</strong>
              <span>${esc(s.coach)}</span>
            </li>`).join("")}
        </ol>
        <p class="small soft" style="margin-top:0.8rem;">
          Old default: react. New default: decide. Six steps that work in any
          moment — carry them with you.
        </p>
      </div>

      <hr class="rule">

      <h2 class="subtitle">Your growth so far</h2>
      <div class="stat-row">
        <div class="stat">
          <div class="stat__num">${counts.lessons}</div>
          <div class="stat__label">Sessions completed</div>
        </div>
        <div class="stat">
          <div class="stat__num">${counts.replays}</div>
          <div class="stat__label">Replays completed</div>
        </div>
        <div class="stat">
          <div class="stat__num">${counts.commitments}</div>
          <div class="stat__label">Commitments made</div>
        </div>
      </div>

      ${milestones.length ? `
        <div class="card">
          <p class="card__label">Latest milestone</p>
          <p><strong>${esc(milestones[milestones.length - 1].title)}</strong></p>
          <p class="soft small">${esc(milestones[milestones.length - 1].note)}</p>
        </div>` : `
        <p class="small soft space-top">
          Growth happens one decision at a time. Your first session is waiting for you in The Corner.
        </p>`}
    </section>
  `;
}
