/* =============================================================================
   GROWTH — personal progress over time.
   Growth areas, activity, milestones, commitments. No grades, no rankings,
   no percentages. Just evidence that the work is happening.
   ============================================================================= */

import { store } from "../store.js";
import { GROWTH_AREAS, LESSONS } from "../data/lessons.js";
import { esc, coachNote, friendlyDate } from "./helpers.js";

const MAX_MARKS = 5;

export function renderProgress(container) {
  const profile = store.getProfile();
  const counts = store.counts();
  const completed = store.completedLessonIds();
  const milestones = store.milestones();
  const commitments = store.recentCommitments(4);

  const growthCards = GROWTH_AREAS.map((area) => {
    // Each session finished in an area is one mark of work put in.
    // Replays build decision-making and self-control every time.
    let work = LESSONS.filter(
      (l) => l.growthArea === area.id && completed.includes(l.id)
    ).length;
    if (area.id === "decision-making" || area.id === "self-control") {
      work += counts.replays;
    }
    const lit = Math.min(work, MAX_MARKS);
    const marks = Array.from({ length: MAX_MARKS }, (_, i) =>
      `<span class="${i < lit ? "lit" : ""}"></span>`).join("");
    return `
      <div class="growth-card">
        <p class="growth-card__name">${esc(area.name)}</p>
        <p class="growth-card__work">${esc(area.work)}</p>
        <div class="growth-card__marks" aria-label="${lit} of ${MAX_MARKS} reps in ${esc(area.name)}">${marks}</div>
      </div>`;
  }).join("");

  const milestoneList = milestones.length
    ? milestones.map((m) => `
        <div class="milestone">
          <span class="milestone__dot" aria-hidden="true"></span>
          <p class="milestone__text">
            <strong>${esc(m.title)}</strong>
            <small>${esc(m.note)}</small>
          </p>
        </div>`).join("")
    : `<p class="soft small">Your milestones will show up here as you put in the work. The first one is one session away.</p>`;

  const commitmentList = commitments.length
    ? commitments.map((c) => `
        <div class="commitment">
          <p>${esc(c.text)}</p>
          <small>${c.source === "replay" ? "From a Replay" : "Session challenge"} · ${friendlyDate(c.madeAt)}</small>
        </div>`).join("")
    : `<p class="soft small">When you take on a challenge or lock in a next right decision, it lands here — so you can see the promises you're keeping.</p>`;

  container.innerHTML = `
    <section class="view">
      <p class="eyebrow">Your Growth</p>
      <h1 class="title">Look how far you've come.</h1>
      <p class="lede">Growth happens one decision at a time. This page is the proof.</p>

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

      <hr class="rule">

      <h2 class="subtitle">What you're building</h2>
      <p class="soft small">Every session and Replay is a rep. Reps build the man.</p>
      <div class="growth-grid">${growthCards}</div>

      <hr class="rule">

      <h2 class="subtitle">Milestones</h2>
      <div class="card mt-0" style="margin-top:0.9rem;">${milestoneList}</div>

      <hr class="rule">

      <h2 class="subtitle">Your commitments</h2>
      ${commitmentList}

      <div class="card space-top">
        ${coachNote(profile.coach,
          counts.lessons + counts.replays > 0
            ? `Keep going, ${profile.firstName}. Nobody builds this overnight — but you're building it.`
            : `This page fills up one decision at a time, ${profile.firstName}. Head to The Corner and let's get your first rep in.`)}
      </div>
    </section>
  `;
}
