/* =============================================================================
   DARRYL KINCY — "In His Corner"  ·  scroll engine + site behavior
   ============================================================================= */

/* ---------------------------------------------------------------------------
   CONFIG — the only things you need to edit to wire up the site.
   --------------------------------------------------------------------------- */
const CONFIG = {
  // Email signup: paste your provider's form-action URL here.
  //   Mailchimp:   https://YOURLIST.usX.list-manage.com/subscribe/post?u=...&id=...
  //   Kit:         https://app.kit.com/forms/FORM_ID/subscriptions
  //   Beehiiv:     use your publication's embed endpoint
  // Leave empty ("") until you have one — the form shows a friendly
  // "coming soon" message instead of failing.
  EMAIL_FORM_ACTION: "",

  // The email address inquiry buttons should open a message to.
  // Leave empty ("") to send inquiries to your LinkedIn profile instead.
  CONTACT_EMAIL: "dkcoco1@gmail.com",

  // Fallback for inquiries while CONTACT_EMAIL is empty.
  LINKEDIN_URL: "https://www.linkedin.com/in/darryl-kincy-10448619/",
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------------
   Hero entrance
   --------------------------------------------------------------------------- */
window.addEventListener("load", () => document.body.classList.add("is-loaded"));
// Fonts can land after `load`; if load already fired (cached), still trigger.
if (document.readyState === "complete") document.body.classList.add("is-loaded");

/* ---------------------------------------------------------------------------
   Reveal-on-scroll
   --------------------------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------------------
   The corner rope — one red line drawn through every round of the journey.
   Built at runtime from the positions of the .rope-anchor elements so it
   survives any viewport size or copy change.
   --------------------------------------------------------------------------- */
const ropeSvg = document.getElementById("ropeSvg");
const ropePath = document.getElementById("ropePath");
const ropeGhost = document.getElementById("ropePathGhost");
let ropeLength = 0;
let ropeFirstY = 0;
let ropeLastY = 1;

function buildRope() {
  if (!ropeSvg || prefersReducedMotion) return;

  const anchors = [...document.querySelectorAll(".rope-anchor")];
  if (anchors.length < 2) return;

  const docHeight = document.documentElement.scrollHeight;
  const docWidth = document.documentElement.clientWidth;
  ropeSvg.setAttribute("width", docWidth);
  ropeSvg.setAttribute("height", docHeight);
  ropeSvg.setAttribute("viewBox", `0 0 ${docWidth} ${docHeight}`);

  const pts = anchors.map((el) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 + window.scrollX,
      y: r.top + r.height / 2 + window.scrollY,
    };
  });

  // Start the line at the hero scroll cue so it "drops" out of the hero.
  const heroCue = document.querySelector(".hero__scrollcue");
  if (heroCue) {
    const r = heroCue.getBoundingClientRect();
    pts.unshift({ x: r.left + r.width / 2 + window.scrollX, y: r.bottom + window.scrollY });
  }

  // Smooth S-curves between anchor points.
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const dy = (p1.y - p0.y) * 0.5;
    d += ` C ${p0.x.toFixed(1)} ${(p0.y + dy).toFixed(1)}, ${p1.x.toFixed(1)} ${(p1.y - dy).toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  ropeGhost.setAttribute("d", d);
  ropePath.setAttribute("d", d);
  ropeLength = ropePath.getTotalLength();
  ropePath.style.strokeDasharray = `${ropeLength}`;
  ropeFirstY = pts[0].y;
  ropeLastY = pts[pts.length - 1].y;
  drawRope();
}

function drawRope() {
  if (!ropeLength) return;
  // The line draws toward a "focus point" 65% down the viewport.
  const focus = window.scrollY + window.innerHeight * 0.65;
  const t = Math.min(1, Math.max(0, (focus - ropeFirstY) / (ropeLastY - ropeFirstY)));
  ropePath.style.strokeDashoffset = `${ropeLength * (1 - t)}`;
}

/* ---------------------------------------------------------------------------
   Scroll loop: progress bar, rope draw, hero parallax, nav pin
   --------------------------------------------------------------------------- */
const progressFill = document.getElementById("progressFill");
const nav = document.getElementById("siteNav");
const heroSpotlight = document.querySelector(".hero__spotlight");
const hero = document.getElementById("hero");
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (progressFill) progressFill.style.transform = `scaleX(${p})`;

    if (nav && hero) {
      nav.classList.toggle("is-pinned", window.scrollY > hero.offsetHeight * 0.75);
    }

    if (heroSpotlight && !prefersReducedMotion && window.scrollY < window.innerHeight * 1.5) {
      heroSpotlight.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }

    drawRope();
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

/* Rebuild the rope whenever layout can shift. */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildRope, 180);
});
window.addEventListener("load", buildRope);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildRope);
buildRope();
onScroll();

/* ---------------------------------------------------------------------------
   Mobile menu
   --------------------------------------------------------------------------- */
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------------------------------------------------------------------------
   Lazy YouTube embeds (facade → iframe on click)
   --------------------------------------------------------------------------- */
document.querySelectorAll(".yt-facade[data-video-id]").forEach((btn) => {
  const id = btn.dataset.videoId;
  if (!id) return; // empty slot
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = "KOrnerman podcast video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    btn.replaceChildren(iframe);
  }, { once: true });
});

/* ---------------------------------------------------------------------------
   Inquiry buttons — mailto when CONTACT_EMAIL is set, LinkedIn otherwise
   --------------------------------------------------------------------------- */
document.querySelectorAll(".js-inquiry").forEach((a) => {
  const subject = encodeURIComponent(a.dataset.subject || "Working with Darryl Kincy");
  if (CONFIG.CONTACT_EMAIL) {
    a.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${subject}`;
  } else {
    a.href = CONFIG.LINKEDIN_URL;
    a.target = "_blank";
    a.rel = "noopener";
  }
});

/* ---------------------------------------------------------------------------
   Email signup
   --------------------------------------------------------------------------- */
const signupForm = document.getElementById("signupForm");
const signupMsg = document.getElementById("signupMsg");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    const email = signupForm.email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      e.preventDefault();
      signupMsg.textContent = "That email doesn't look right — give it one more shot.";
      return;
    }

    if (!CONFIG.EMAIL_FORM_ACTION) {
      e.preventDefault();
      signupMsg.textContent =
        "The corner is still being set up — this list opens soon. Come back shortly!";
      return;
    }

    // Provider configured: submit natively to the form action.
    signupForm.action = CONFIG.EMAIL_FORM_ACTION;
    signupForm.method = "POST";
    signupForm.target = "_blank";
    signupMsg.textContent = "You're in. Welcome to the corner.";
  });
}
