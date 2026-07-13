/* =============================================================================
   WELCOME — the front door of The Corner.
   First visit: a short, respectful introduction and profile creation.
   No passwords, no accounts — the student's info stays on his own device.
   ============================================================================= */

import { store } from "../store.js";

export function renderWelcome(container, { navigate }) {
  container.innerHTML = `
    <section class="view">
      <div class="welcome-hero">
        <div class="corner-mark" aria-hidden="true"></div>
        <p class="eyebrow">Welcome to The Corner</p>
        <h1 class="title">KOrnerman</h1>
        <p class="lede">
          Between rounds, a fighter sits down in his corner. His coach listens,
          tells him the truth, and sends him back out stronger.
          This is your corner.
        </p>
      </div>

      <div class="card card--accent">
        <p class="card__label">Before we start — how The Corner works</p>
        <p>
          This is a place where you can be honest. Nobody here is grading you,
          and nobody is judging you. What you write here matters, because you
          matter — and this corner runs on trust, not secrecy. If it ever helps
          you grow or keeps you safe, your coach or another trusted adult may
          look at what you've written with you. Your parents are still your
          first team, and everyone in your corner works together for you.
        </p>
      </div>

      <div class="card">
        <p class="card__label">One promise up front</p>
        <p>
          If you ever share that you're in danger, that someone is hurting you,
          or that someone else could get hurt, Coach will bring in the adults
          who can help. Not as punishment — because you matter too much to be
          left carrying that alone.
        </p>
      </div>

      <form id="welcome-form" class="card" novalidate>
        <h2 class="subtitle mt-0">Tell me who's in my corner today</h2>

        <div class="field">
          <label for="firstName">First name</label>
          <input type="text" id="firstName" name="firstName" autocomplete="given-name" required maxlength="40">
          <p class="hint">What should Coach call you?</p>
        </div>

        <div class="field">
          <label for="grade">Grade</label>
          <select id="grade" name="grade">
            <option value="">Choose your grade</option>
            <option>7th</option>
            <option>8th</option>
            <option>9th</option>
            <option>10th</option>
            <option>11th</option>
            <option>12th</option>
          </select>
        </div>

        <div class="field">
          <label for="school">School</label>
          <input type="text" id="school" name="school" maxlength="80">
        </div>

        <div class="field">
          <label for="coach">Your coach</label>
          <input type="text" id="coach" name="coach" value="Coach Daryl" maxlength="60">
          <p class="hint">Your coach will be assigned to you. For now, Coach Daryl has your corner.</p>
        </div>

        <div class="btn-row">
          <button type="submit" class="btn btn--primary btn--block">Step into The Corner</button>
        </div>
      </form>
    </section>
  `;

  const form = container.querySelector("#welcome-form");
  const nameInput = container.querySelector("#firstName");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = nameInput.value.trim();
    if (!firstName) {
      // No red alarms — just a steady nudge from Coach.
      nameInput.focus();
      let hint = nameInput.parentElement.querySelector(".hint");
      hint.textContent = "Start with your first name — that's all Coach needs to get going.";
      return;
    }
    store.saveProfile({
      firstName,
      grade: form.grade.value,
      school: form.school.value,
      coach: form.coach.value,
    });
    navigate("#/home");
  });
}
