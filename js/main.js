/* =============================================================================
   DARRYL KINCY | MENTOR-COACH FOR TEEN BOYS  ·  site behavior
   ============================================================================= */

/* ---------------------------------------------------------------------------
   CONFIG — the only things you need to edit to wire up the site.
   --------------------------------------------------------------------------- */
const CONFIG = {
  // Where inquiry buttons and the contact form send email.
  CONTACT_EMAIL: "dkcoco1@gmail.com",

  // Optional: a real form service endpoint (e.g. Formspree). When set, the
  // contact form POSTs there instead of opening the visitor's email app.
  //   Formspree: https://formspree.io/f/YOUR_FORM_ID
  CONTACT_FORM_ACTION: "",
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
    iframe.title = btn.getAttribute("aria-label") || "Taking The Lead Generation video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    btn.replaceChildren(iframe);
  }, { once: true });
});

/* ---------------------------------------------------------------------------
   Inquiry buttons + contact email links → mailto
   --------------------------------------------------------------------------- */
document.querySelectorAll(".js-inquiry").forEach((a) => {
  const subject = encodeURIComponent(a.dataset.subject || "Working with Darryl Kincy");
  a.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${subject}`;
});

document.querySelectorAll(".js-contact-email").forEach((a) => {
  a.textContent = CONFIG.CONTACT_EMAIL;
  a.href = `mailto:${CONFIG.CONTACT_EMAIL}`;
});

/* ---------------------------------------------------------------------------
   Contact form — POSTs to CONTACT_FORM_ACTION when configured; otherwise
   composes a pre-filled email in the visitor's mail app.
   --------------------------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const first = contactForm.firstName.value.trim();
    const last = contactForm.lastName.value.trim();
    const email = contactForm.email.value.trim();
    const needs = contactForm.needs.value.trim();

    if (!first || !last || !needs || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      contactMsg.textContent = "Please fill in every field (and double-check the email address).";
      return;
    }

    if (CONFIG.CONTACT_FORM_ACTION) {
      // Provider configured: submit natively to the form action.
      contactForm.action = CONFIG.CONTACT_FORM_ACTION;
      contactForm.method = "POST";
      contactForm.target = "_blank";
      contactMsg.textContent = "Thank you — we'll be in touch soon.";
      return;
    }

    e.preventDefault();
    const subject = encodeURIComponent(`Partnership inquiry — ${first} ${last}`);
    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\n\n${needs}`
    );
    window.location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    contactMsg.textContent = "Opening your email app — just hit send.";
  });
}
