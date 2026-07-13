/* =============================================================================
   PROFILE — the student's own info, plus privacy and settings.
   Editing saves in place. "Start fresh" clears everything on this device,
   with a clear confirmation first.
   ============================================================================= */

import { store } from "../store.js";
import { esc, coachNote } from "./helpers.js";

export function renderProfile(container, { navigate }) {
  const profile = store.getProfile();

  container.innerHTML = `
    <section class="view">
      <p class="eyebrow">Your Profile</p>
      <h1 class="title">${esc(profile.firstName)}</h1>
      <p class="lede">This is your info — you're in charge of it.</p>

      <form id="profile-form" class="card">
        <h2 class="subtitle mt-0">About you</h2>

        <div class="field">
          <label for="firstName">First name</label>
          <input type="text" id="firstName" value="${esc(profile.firstName)}" required maxlength="40">
        </div>

        <div class="field">
          <label for="grade">Grade</label>
          <select id="grade">
            <option value="">Choose your grade</option>
            ${["7th","8th","9th","10th","11th","12th"].map((g) =>
              `<option ${profile.grade === g ? "selected" : ""}>${g}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label for="school">School</label>
          <input type="text" id="school" value="${esc(profile.school)}" maxlength="80">
        </div>

        <div class="field">
          <label for="coach">Your coach</label>
          <input type="text" id="coach" value="${esc(profile.coach)}" maxlength="60">
        </div>

        <div class="btn-row">
          <button type="submit" class="btn btn--primary">Save changes</button>
          <span class="small soft" id="saved-note" hidden>Saved.</span>
        </div>
      </form>

      <div class="card card--accent">
        <p class="card__label">Your privacy — and your team</p>
        <p>
          Right now, everything you write in The Corner — your reflections, your
          Replays, your commitments — is saved on this device and isn't uploaded
          anywhere. The deal stays the same as day one: this corner runs on
          trust, not secrecy. If it helps you grow or keeps you safe, your coach
          or another trusted adult may look at what you've written with you.
          Your parents are always your first team.
        </p>
      </div>

      <div class="card">
        <p class="card__label">Need to talk to someone?</p>
        <p>
          If something serious is going on — you're in danger, someone is hurting
          you, or you're having thoughts of hurting yourself — don't carry it
          alone, and don't let this app be the only place you say it. Tell your
          coach or a trusted adult, or call or text <strong>988</strong>
          (Suicide &amp; Crisis Lifeline) any time, day or night. When you share
          something like that, adults who can help will be brought in — that's
          care, not punishment. Asking for help is a strong decision.
        </p>
      </div>

      <div class="card">
        <p class="card__label">Start fresh</p>
        <p class="small soft">
          This erases your profile and everything you've written on this device
          and takes you back to the front door. There's no undo.
        </p>
        <div class="btn-row">
          <button class="btn btn--ghost" data-reset>Erase everything and start fresh</button>
        </div>
      </div>

      <div class="card">
        ${coachNote(profile.coach, "Whatever kind of week you're having, the door to The Corner is open. Same coach, same corner, every time.")}
      </div>
    </section>
  `;

  container.querySelector("#profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = container.querySelector("#firstName").value.trim();
    if (!firstName) {
      container.querySelector("#firstName").focus();
      return;
    }
    store.saveProfile({
      firstName,
      grade: container.querySelector("#grade").value,
      school: container.querySelector("#school").value,
      coach: container.querySelector("#coach").value,
    });
    const note = container.querySelector("#saved-note");
    note.hidden = false;
    setTimeout(() => { note.hidden = true; }, 2500);
  });

  container.querySelector("[data-reset]").addEventListener("click", () => {
    const sure = window.confirm(
      "Erase your profile and everything you've written on this device? There's no undo."
    );
    if (sure) {
      store.resetAll();
      navigate("#/welcome");
    }
  });
}
