/* ============================================================
 * SE 266 · Week 03 wiki: manifest + widget data
 * Loaded by dynamic injection from the shell. Articles are
 * markdown files in w03/articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w03",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 03 · The Game Loop, Time, and Input",
  home: "home",

  /* sibling wikis at the content root, for [[peer:article|label]] links */
  peers: {
    res: "The Free Library.html",
    w01: "Week 01 - Engines, Anatomy, and Choosing Yours.html",
    w02: "Week 02 - Scene Graphs, Transforms, and Coordinate Spaces.html",
    w03: "Week 03 - The Game Loop, Time, and Input.html"
  },

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 3 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "stop-motion-studio", title: "Start in a Stop-Motion Studio" },
      { id: "the-loop", title: "The Loop" },
      { id: "delta-time", title: "Delta Time" },
      { id: "two-clocks", title: "Two Clocks" },
      { id: "input-held-vs-pressed", title: "Input: Held vs. Pressed" },
      { id: "cross-engine-dictionary", title: "Cross-Engine Dictionary" },
      { id: "gotchas", title: "Gotchas and Judgment Calls" }
    ]},
    { name: "Supplemental", articles: [
      { id: "degrees-per-what", title: "Degrees per What?" }
    ]},
    { name: "Practice", articles: [
      { id: "broken-twin", title: "Exercise 1: The Broken Twin" },
      { id: "real-mover", title: "Exercise 2: The Real Mover" },
      { id: "the-sun", title: "Exercise 3: The Sun" },
      { id: "the-proof", title: "Exercise 4: The Proof" },
      { id: "other-engines", title: "Other Engines" }
    ]},
    { name: "Assignment", articles: [
      { id: "a2-spec", title: "Assignment 2: The Loop & Input" },
      { id: "recording-a2", title: "Recording Your Assignment 2 Video" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  widgets: {

    /* rate lab: a spinning square and an orbiting circle, in three.js
       (2D canvas fallback), with a per-second / per-frame toggle */
    ratelab: {
      instruction: "Drag the sliders, then flip the toggle and watch the same numbers mean different things. A frame is not a unit of time.",
      orbitLabel: "Circle orbit",
      spinLabel: "Square spin",
      perSecondLabel: "degrees per second",
      perFrameLabel: "degrees per frame",
      honestNote: "Honest: real units. Same speed on every machine, at every framerate.",
      bugNote: "The bug: speed now depends on framerate. On a 120 Hz monitor this runs twice as fast as on a 60 Hz one. Same slider, different game."
    },

    quiz: [
      { q: "In the stop-motion studio, what are the frame, the update, and delta time?",
        options: ["The camera, the set, and the director", "The photo, the nudge session, and the time since the last photo", "The film, the animator, and the frame counter", "The loop, the callback, and the framerate"],
        correct: 1,
        explain: "Sixty-ish times a second the engine freezes the world, lets your scripts nudge what they own (the update), photographs the result (the frame), and hands you the seconds since the last photo (delta time). Nothing in your game ever actually moves; there are only positions that differ slightly between photos." },
      { q: "Why did old PCs ship with a Turbo button?",
        options: ["To overclock the processor for demanding games", "To slow the machine down, because a generation of games nudged per frame and became unplayable on faster hardware", "To speed up floppy access", "Marketing: it did nothing"],
        correct: 1,
        explain: "Its real purpose was to make the machine worse, because frame-dependent games ran faster on faster hardware. The one-line fix that makes it unnecessary: multiply anything continuous by delta time." },
      { q: "A jump wired to GetKey and a walk wired to GetKeyDown: how does each misbehave?",
        options: ["Both work fine: the functions are interchangeable", "The jump fires every frame the key is held (about thirty times per press); the walk moves one nudge per press, like a sewing machine", "The jump never fires; the walk is too fast", "Both fire exactly once"],
        correct: 1,
        explain: "GetKey is a state, true every frame the key is held: right for movement, wrong for jumps. GetKeyDown is an edge, true only on the frame the key went down: right for jumps, wrong for movement." },
      { q: "Which clock does physics march to, and why?",
        options: ["The frame update, because physics should be as smooth as rendering", "The fixed update, a steady metronome, because simulation math accumulates error when the step size jitters", "Whichever is faster on the current machine", "Physics has no clock: it runs continuously"],
        correct: 1,
        explain: "Rendering wants to run as fast as possible; physics wants identical, predictable time slices. Enough jitter means objects tunneling through walls. So engines run two update streams, and physics marches to the metronome." },
      { q: "In transform.Translate(Vector3.forward * 6f * Time.deltaTime), what are the units, and what changes on a machine three times faster?",
        options: ["6 frames times seconds; the object moves three times as fast", "6 units per second times deltaTime seconds equals a distance; the faster machine takes three times as many smaller nudges and covers the same distance per second", "6 units per frame; nothing changes", "The units are arbitrary; speed depends on vSync"],
        correct: 1,
        explain: "Read the units out loud: units per second, times seconds, equals distance. The faster machine gets a smaller deltaTime more often; after one second of wall-clock time both objects are exactly 6 units along. That's frame-rate independence." },
      { q: "Why must your Update finish fast?",
        options: ["Slow scripts get skipped by the engine", "The loop can't take the next photo until every script's nudge is done, so a dawdling script slows the entire universe down", "Unity charges by the millisecond", "It doesn't matter: rendering runs on its own thread"],
        correct: 1,
        explain: "Frames-per-second is just how many trips through the loop your machine completes per second, and every script in the scene is standing between one photo and the next." },
      { q: "You multiplied a jump impulse by delta time. What happens?",
        options: ["Nothing: everything should be multiplied by delta time", "The jump height now depends on the framerate of the frame you jumped in", "The jump becomes smoother", "The compiler rejects it"],
        correct: 1,
        explain: "Continuous gets delta time; instantaneous does not. A jump happens once, not per second, and scaling it by a frame's length turns a jump into a framerate lottery. Knowing which of the two you're writing is most of this week's skill." },
      { q: "GetKeyDown polled inside FixedUpdate sometimes misses presses. Why?",
        options: ["FixedUpdate can't read input at all", "The fixed-step metronome doesn't beat every frame, so an edge that happened between beats is gone by the next one", "GetKeyDown only works in Start", "The keyboard buffer is cleared by physics"],
        correct: 1,
        explain: "Edges live for exactly one frame, and the metronome doesn't tick every frame. Read input in the frame update; Week 5 shows the clean handoff to physics." }
    ],

    checklist: {
      items: [
        { id: "r1", label: "Requirement 1 · Frame-rate-independent player motion in real units, with a held speed modifier, delta-time expression shown and narrated", optional: false },
        { id: "r2", label: "Requirement 2 · One continuous input (state) and one discrete input (edge), with which function backs each and why", optional: false },
        { id: "r3", label: "Requirement 3 · The framerate proof on camera: two framerates, similar distance per wall-clock second (choppier, not slower)", optional: false },
        { id: "r4", label: "Requirement 4 · Time-driven motion with no input (a sun, a windmill, a patrolling platform)", optional: false },
        { id: "r5", label: "Requirement 5 · Deliverables: narrated video (2–5 min), source, one-paragraph build note", optional: false },
        { id: "twin", label: "The Broken Twin shown misbehaving under the same test (optional and recommended)", optional: true }
      ],
      note: "A personal tracker only: this browser, not the gradebook. Pass requires all five requirements; a failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue."
    }
  }
};
