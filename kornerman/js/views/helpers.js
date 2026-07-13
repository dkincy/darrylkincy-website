/* Shared view helpers. */

export function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* Coach's words always appear the same way, everywhere in the app. */
export function coachNote(coachName, text, label = "") {
  const initials = coachName
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return `
    <div class="coach-note">
      <div class="coach-note__badge" aria-hidden="true">${esc(initials)}</div>
      <div>
        <p class="coach-note__who">${esc(label || coachName)}</p>
        <p class="coach-note__text">${esc(text)}</p>
      </div>
    </div>`;
}

export function stepDots(total, current) {
  let dots = "";
  for (let i = 0; i < total; i++) {
    const cls = i < current ? "is-done" : i === current ? "is-now" : "";
    dots += `<span class="steps__dot ${cls}"></span>`;
  }
  return `<div class="steps" aria-hidden="true">${dots}</div>`;
}

export function friendlyDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}
