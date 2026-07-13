/* =============================================================================
   KORNERMAN APP
   Hash router + view mounting. Each view module exports render(container, ctx).
   ============================================================================= */

import { store } from "./store.js";
import { renderWelcome } from "./views/welcome.js";
import { renderHome } from "./views/home.js";
import { renderCorner } from "./views/corner.js";
import { renderReplay } from "./views/replay.js";
import { renderProgress } from "./views/progress.js";
import { renderProfile } from "./views/profile.js";

const app = document.getElementById("app");
const topbar = document.getElementById("topbar");

const routes = {
  welcome: { render: renderWelcome, nav: false },
  home: { render: renderHome, nav: "home" },
  corner: { render: renderCorner, nav: "corner" },
  replay: { render: renderReplay, nav: "replay" },
  progress: { render: renderProgress, nav: "progress" },
  profile: { render: renderProfile, nav: "profile" },
};

function parseHash() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return { name: parts[0] || "", param: parts[1] || null };
}

function navigate(path) {
  location.hash = path;
}

function route() {
  let { name, param } = parseHash();
  const profile = store.getProfile();

  // First visit: everything leads to The Corner's front door.
  if (!profile && name !== "welcome") {
    location.replace("#/welcome");
    return;
  }
  if (profile && (name === "welcome" || !routes[name])) {
    location.replace("#/home");
    return;
  }
  if (!routes[name]) name = "welcome";

  const view = routes[name];

  topbar.hidden = !view.nav;
  document.body.classList.toggle("has-nav", Boolean(view.nav));
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === view.nav);
  });

  app.innerHTML = "";
  view.render(app, { param, navigate });
  app.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
