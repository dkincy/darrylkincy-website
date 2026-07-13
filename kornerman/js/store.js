/* =============================================================================
   KORNERMAN STORE
   All student data lives in localStorage on the student's own device.
   Nothing is sent anywhere. This module is the single doorway to that data —
   when a real account system arrives, it replaces the internals here and
   every view keeps working unchanged.
   ============================================================================= */

const KEY = "kornerman.v1";

function blankState() {
  return {
    profile: null,        // { firstName, grade, school, coach, createdAt }
    lessons: {},          // { [lessonId]: { completedAt, reflections: {}, committed: bool } }
    replays: [],          // [{ completedAt, answers: { happened, thinking, feeling, choice, result, nextRight } }]
    commitments: [],      // [{ text, source: "lesson"|"replay", lessonId?, madeAt }]
  };
}

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blankState();
    return Object.assign(blankState(), JSON.parse(raw));
  } catch {
    return blankState();
  }
}

function write(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export const store = {
  /* ------------------------------ Profile -------------------------------- */

  getProfile() {
    return read().profile;
  },

  saveProfile({ firstName, grade, school, coach }) {
    const state = read();
    const existing = state.profile || {};
    state.profile = {
      firstName: firstName.trim(),
      grade: (grade || "").trim(),
      school: (school || "").trim(),
      coach: (coach || "Coach Daryl").trim() || "Coach Daryl",
      createdAt: existing.createdAt || new Date().toISOString(),
    };
    write(state);
    return state.profile;
  },

  /* ------------------------------ Lessons -------------------------------- */

  isLessonDone(lessonId) {
    return Boolean(read().lessons[lessonId]?.completedAt);
  },

  completeLesson(lessonId, reflections, committed) {
    const state = read();
    if (!state.lessons[lessonId]?.completedAt) {
      state.lessons[lessonId] = {
        completedAt: new Date().toISOString(),
        reflections: reflections || {},
        committed: Boolean(committed),
      };
      write(state);
    }
  },

  addCommitment(text, source, lessonId) {
    const clean = (text || "").trim();
    if (!clean) return;
    const state = read();
    state.commitments.push({
      text: clean,
      source,
      lessonId: lessonId || null,
      madeAt: new Date().toISOString(),
    });
    write(state);
  },

  /* ------------------------------ Replays -------------------------------- */

  saveReplay(answers) {
    const state = read();
    state.replays.push({
      completedAt: new Date().toISOString(),
      answers,
    });
    write(state);
    if (answers.nextRight && answers.nextRight.trim()) {
      this.addCommitment(answers.nextRight, "replay");
    }
  },

  /* ------------------------------ Progress ------------------------------- */

  counts() {
    const state = read();
    return {
      lessons: Object.values(state.lessons).filter((l) => l.completedAt).length,
      replays: state.replays.length,
      commitments: state.commitments.length,
    };
  },

  completedLessonIds() {
    const state = read();
    return Object.keys(state.lessons).filter((id) => state.lessons[id].completedAt);
  },

  recentCommitments(limit = 5) {
    return read().commitments.slice(-limit).reverse();
  },

  /* Growth milestones, phrased the way a coach would say them. */
  milestones() {
    const { lessons, replays, commitments } = this.counts();
    const reached = [];
    if (lessons >= 1) reached.push({
      title: "You showed up",
      note: "You stepped into The Corner and finished your first session. That's how every strong story starts.",
    });
    if (replays >= 1) reached.push({
      title: "You looked at a moment honestly",
      note: "Your first Replay is done. Slowing a moment down takes more strength than reacting to it.",
    });
    if (commitments >= 1) reached.push({
      title: "You made a decision on purpose",
      note: "You named your next right decision and put it into words. Your word matters.",
    });
    if (lessons >= 3) reached.push({
      title: "You keep coming back",
      note: "Three sessions in The Corner. Growth isn't one big moment — it's this.",
    });
    if (replays >= 3) reached.push({
      title: "Reflection is becoming a habit",
      note: "Three Replays. You're learning to pause, think, and choose — that's self-control being built.",
    });
    return reached;
  },

  /* --------------------------------- Reset -------------------------------- */

  resetAll() {
    localStorage.removeItem(KEY);
  },
};
