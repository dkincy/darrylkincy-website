/* =============================================================================
   KORNERMAN LESSON CONTENT
   Five sessions in The Corner™, written in the coaching voice.
   Every line here should pass one test:
   "Would Coach Daryl say this to Marcus while sitting across from him
    in The Corner?"

   To edit or add lessons, follow the shape of any lesson below. The full
   KOrnerman lesson carries: a growth area, a weekly focus, a coach
   introduction, a video slot, a story from Coach (optional until written),
   reflection questions, a practice prompt to run with a real person
   (optional until written), one action challenge for the week, and a
   "talk it over" prompt that points the student to his real coaching
   conversation. Screens for story/practice/talk-it-over appear
   automatically once the content exists.
   ============================================================================= */

/* The six growth qualities, from the founder's definition of growth:
   steady development and consistent practice until healthy behavior
   becomes the natural habit. */
export const GROWTH_AREAS = [
  { id: "self-control",            name: "Self-Control",            work: "Learning to pause, think, and choose — instead of react." },
  { id: "ownership",               name: "Ownership",               work: "My choices matter, and they belong to me." },
  { id: "decision-making",         name: "Decision-Making",         work: "Slowing down enough to see my options before I pick one." },
  { id: "integrity",               name: "Integrity",               work: "My word matters. My actions matter. Character matters." },
  { id: "emotional-regulation",    name: "Emotional Regulation",    work: "Naming what I feel so it works for me — instead of running me." },
  { id: "personal-responsibility", name: "Personal Responsibility", work: "My growth is mine to carry. Nobody can do my reps for me." },
];

/* =============================================================================
   THE KORNERMAN DECISION SYSTEM
   Founder-level working draft — this framework will keep evolving, so it
   lives here as plain data. Edit the steps and coach lines freely; every
   screen that shows the system reads from this one place.
   ============================================================================= */
export const DECISION_SYSTEM = [
  { id: "pause",      name: "Pause",                          coach: "Stop before the moment decides for you. The pause is where your power lives." },
  { id: "breathe",    name: "Breathe",                        coach: "One slow breath. It buys your mind the time it needs." },
  { id: "reset",      name: "Reset",                          coach: "Let the first reaction pass. That was the old default — you're not stuck with it." },
  { id: "look-ahead", name: "Look Ahead",                     coach: "Play the tape forward. Where does each choice take you?" },
  { id: "choose",     name: "Choose the Next Right Decision", coach: "Not the perfect decision. The next right one — and make it yours." },
  { id: "reflect",    name: "Reflect & Learn",                coach: "Afterward, look at the moment honestly — that's what a Replay is for. Every rep teaches you something." },
];

export const LESSONS = [
  {
    id: "next-right-decision",
    order: 1,
    title: "Making the Next Right Decision",
    focus: "Your Next Right Decision",
    growthArea: "decision-making",
    coachIntro:
      "Every decision creates a direction. You don't have to fix everything at once — nobody can. Today we're practicing one skill: how to slow down, think, and choose wisely. Not the perfect decision. The next right one.",
    videoNote: "Coach's video for this session is coming soon. For now, read his words above like he's sitting across from you.",
    reflections: [
      {
        id: "slow-down",
        prompt: "Think about your week. What's one situation where slowing down could help you make a better choice?",
      },
      {
        id: "direction",
        prompt: "Decisions create direction. Where do you want your decisions to be taking you?",
      },
    ],
    challenge:
      "Practice pausing before reacting once this week. Just once. When something heats up, take one breath before you respond — and notice what changes.",
  },
  {
    id: "the-pause",
    order: 2,
    title: "The Pause",
    focus: "Self-Control",
    growthArea: "self-control",
    coachIntro:
      "Between what happens to you and what you do about it, there's a space. Most people never use it. A fighter who swings at everything gets worn down — a fighter who picks his moments wins rounds. The pause is where your power lives. Let's build it.",
    videoNote: "Coach's video for this session is coming soon. For now, read his words above like he's sitting across from you.",
    reflections: [
      {
        id: "trigger",
        prompt: "What kinds of moments make it hardest for you to stay calm? Help me understand what's usually happening right before you react.",
      },
      {
        id: "in-the-space",
        prompt: "Picture the last time you reacted fast and wished you hadn't. If you could put three seconds of pause into that moment, what might you have done with them?",
      },
    ],
    challenge:
      "This week, when you feel the heat rising, name it to yourself: \"This is the space.\" Then take one slow breath before you say or do anything.",
  },
  {
    id: "owning-it",
    order: 3,
    title: "Owning It",
    focus: "Taking Ownership",
    growthArea: "ownership",
    coachIntro:
      "Everyone makes mistakes. What matters is what you do next. Blame hands your power to somebody else — ownership keeps it with you. When you can say \"that was my choice,\" you also get to say \"and the next choice is mine too.\" That's not weakness. That's the strongest move there is.",
    videoNote: "Coach's video for this session is coming soon. For now, read his words above like he's sitting across from you.",
    reflections: [
      {
        id: "my-part",
        prompt: "Think of something that didn't go the way you wanted recently. Without beating yourself up — what part of it was in your control?",
      },
      {
        id: "power-back",
        prompt: "When you own a choice instead of blaming someone else for it, what do you get back?",
      },
    ],
    challenge:
      "One time this week, when something goes sideways, say the words — out loud or to yourself — \"That was my choice, and my next choice is mine.\" Then make the next one count.",
  },
  {
    id: "your-word",
    order: 4,
    title: "Your Word Matters",
    focus: "Integrity",
    growthArea: "integrity",
    coachIntro:
      "Who you are when nobody's watching — that's the real you. Integrity means your word and your actions point the same direction. Every time you keep your word, even in something small, you're building a man people can count on. Starting with you counting on yourself.",
    videoNote: "Coach's video for this session is coming soon. For now, read his words above like he's sitting across from you.",
    reflections: [
      {
        id: "count-on",
        prompt: "Who counts on you right now — at home, at school, on a team? What do they count on you for?",
      },
      {
        id: "kept-word",
        prompt: "Tell me about a time you kept your word when it would have been easier not to. What did that take?",
      },
    ],
    challenge:
      "Make one small promise this week — to yourself or to someone else — and keep it completely. Notice how it feels to be a man of your word.",
  },
  {
    id: "coming-back-stronger",
    order: 5,
    title: "Coming Back Stronger",
    focus: "Learning From Mistakes",
    growthArea: "ownership",
    coachIntro:
      "A fighter doesn't win because he never gets hit. He wins because he knows what to do after he gets hit. Failure is information — it tells you something about the moment, the choice, and what to work on. You are not defined by your worst moment. You're defined by what you build from it.",
    videoNote: "Coach's video for this session is coming soon. For now, read his words above like he's sitting across from you.",
    reflections: [
      {
        id: "the-lesson",
        prompt: "Think about a mistake that still bothers you. If you look at it like a coach instead of a judge — what is it teaching you?",
      },
      {
        id: "next-round",
        prompt: "The next round is coming, and you get to fight it differently. What's one thing you'll do differently because of what you learned?",
      },
    ],
    challenge:
      "This week, when you catch yourself replaying a mistake, finish the sentence out loud: \"Next time, I will...\" — then let the round be over.",
  },
];

export function lessonById(id) {
  return LESSONS.find((l) => l.id === id) || null;
}

export function growthAreaById(id) {
  return GROWTH_AREAS.find((g) => g.id === id) || null;
}

/* The student's current lesson: first one not yet completed
   (or the last lesson once everything is done). */
export function currentLesson(completedIds) {
  const next = LESSONS.find((l) => !completedIds.includes(l.id));
  return next || LESSONS[LESSONS.length - 1];
}

/* Rotating dashboard encouragement from Coach — steady, honest, hopeful. */
export const COACH_MESSAGES = [
  "Everyone makes mistakes. What matters is what you do next.",
  "You don't have to win the whole fight today. Just this round.",
  "Growth happens one decision at a time. You're in the right place.",
  "I'm not here to fix you. I'm here to coach you — there's a difference.",
  "The strongest thing you'll do today might be pausing before you react.",
  "Your story is not over. The next chapter is yours to write.",
  "Showing up counts. You showed up. Let's get to work.",
];

export function coachMessageForToday() {
  // Same message all day; rotates daily so The Corner feels alive but steady.
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  return COACH_MESSAGES[daysSinceEpoch % COACH_MESSAGES.length];
}
