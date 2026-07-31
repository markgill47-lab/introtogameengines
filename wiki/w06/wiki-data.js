/* ============================================================
 * SE 266 · Week 06 wiki: manifest + widget data
 * Loaded by dynamic injection from the shell. Articles are
 * markdown files in w06/articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w06",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 06 · Interface and Game State",
  home: "home",

  /* sibling wikis at the content root, for [[peer:article|label]] links */
  peers: {
    res: "The Free Library.html",
    w01: "Week 01 - Engines, Anatomy, and Choosing Yours.html",
    w02: "Week 02 - Scene Graphs, Transforms, and Coordinate Spaces.html",
    w03: "Week 03 - The Game Loop, Time, and Input.html",
    w04: "Week 04 - Design Vocabulary, What Makes Games Games.html",
    w05: "Week 05 - Physics, Collision, and Authority.html",
    w06: "Week 06 - Interface and Game State.html"
  },

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 6 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "ballpark", title: "Start at the Ballpark" },
      { id: "game-state", title: "Game State: The Data That Is the Game" },
      { id: "hud-anatomy", title: "Anatomy of a HUD" },
      { id: "menus-and-flow", title: "Menus, Flow, and the Pause That Ships" },
      { id: "screen-vs-world", title: "Screen Space vs. World Space" },
      { id: "cross-engine-dictionary", title: "Cross-Engine Dictionary" },
      { id: "gotchas", title: "Gotchas and Judgment Calls" }
    ]},
    { name: "Supplemental", articles: [
      { id: "the-scoreboard", title: "The Scoreboard" },
      { id: "frozen-clock", title: "The Frozen Clock" }
    ]},
    { name: "Practice", articles: [
      { id: "official-scorer", title: "Exercise 1: The Official Scorer" },
      { id: "scoreboard-hud", title: "Exercise 2: The Scoreboard" },
      { id: "the-circuit", title: "Exercise 3: The Circuit" },
      { id: "floating-bar", title: "Exercise 4: The Floating Bar" },
      { id: "other-engines", title: "Other Engines" }
    ]},
    { name: "Assignment", articles: [
      { id: "a4-spec", title: "Assignment 4: Interface & Game State" },
      { id: "recording-a4", title: "Recording Your Assignment 4 Video" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  widgets: {

    /* the ballpark opener, playable: kill the display and watch the facts
       carry on without it */
    scoreboard: {
      instruction: "Change the facts. Then kill the scoreboard and change them some more. Repair it and see what it says.",
      damageLabel: "Take 10 damage",
      goldLabel: "Add 5 gold",
      killLabel: "Kill the scoreboard",
      repairLabel: "Repair the scoreboard",
      resetLabel: "Reset",
      deadText: "DISPLAY OFFLINE\nthe facts are still changing",
      liveNote: "Two displays, one fact. Information flows left to right and never back: the scorer does not consult the scoreboard to find out the score.",
      deadNote: "The scoreboard is dark and the game is fine. Nobody replayed the inning. Keep pressing the buttons: the facts are moving whether or not anything is drawing them. Repair it and it will tell the truth immediately, because it never owned the truth in the first place."
    },

    /* time scale, the free pause, and the two traps */
    pauselab: {
      instruction: "Slow the world, then stop it. Turn on the ghost. Then pause and press Restart, and read what happens.",
      fullLabel: "timeScale 1",
      halfLabel: "timeScale 0.5",
      pauseLabel: "timeScale 0 (pause)",
      ghostLabel: "add a mover that never met delta time",
      restartLabel: "Restart",
      runningNote: "The gold dot moves at 90 units per second, multiplied by delta time. Change the time scale and the world obeys for free, because Week 3 already did the work.",
      pausedNote: "Paused. Delta time reports zero, so everything that respects it has stopped. Notice the UI clock is still counting: menus run on unscaled time, which is why you can still click things in a frozen game.",
      trapNote: "There it is. You restarted while the clock was still stopped, so the fresh scene arrived frozen solid. Nothing is broken except that nobody set the time scale back to one. Every student ships this bug once. Press timeScale 1 to thaw it."
    },

    quiz: [
      { q: "The scoreboard in center field goes dark mid-inning. What is the score?",
        options: ["Unknown until the board is repaired", "Whatever it was: the score is a fact kept by the scorer, and the board was only ever a display of that fact", "It resets to zero", "Both teams replay the inning"],
        correct: 1,
        explain: "The score was never in the scoreboard. When the display dies, the fact survives; when it is repaired, it gets told the fact and resumes glowing. Every UI bug you will write comes from violating some clause of that sentence." },
      { q: "What is the save-file test, and what does it decide?",
        options: ["Whether a file is too large to serialize", "If you saved the game and loaded it tomorrow, what would need to be in the file? That is state. Everything else is display", "Whether the game should autosave", "Which scene loads first"],
        correct: 1,
        explain: "Health, gold, quest flags, and the paused flag go in the file. The health bar's red color, the font size, and which panel is visible do not. Week 13 makes this test literal, and students whose state lives in text labels have a very bad Week 13." },
      { q: "Which direction may information flow between game state and display?",
        options: ["Both ways, as long as it is consistent", "One way only: the display reads state and never writes it", "Display to state, so buttons can edit values directly", "Whichever is more convenient at the call site"],
        correct: 1,
        explain: "The HUD reads; it does not write. The moment a health bar script also applies damage, you have a scoreboard deciding the score. Menu buttons look like an exception but are not: the button requests a change and the state object makes it, through the same legal methods as everyone else." },
      { q: "This week the HUD polls state every frame. What is the honest description of that choice?",
        options: ["It is the correct final architecture", "It works, it is simple, it costs nothing at this scale, and it is scheduled debt with the payoff date printed on it", "It is a bug that should be fixed immediately", "It is required by every engine"],
        correct: 1,
        explain: "Sixty reads a second to catch a change that happens twice a minute is a strange arrangement, and it puts the display's hand permanently on the state. We do it anyway because the better arrangement needs a pattern you do not have yet. Week 11 renovates this exact code." },
      { q: "Why does setting the time scale to zero pause a well-built game for free?",
        options: ["The engine stops calling Update", "Delta time reports zero, so everything correctly multiplied by dt stops moving", "Rendering halts", "The physics engine unloads"],
        correct: 1,
        explain: "You already built pause in Week 3 without knowing it. This week you just add the button. The corollary: any movement someone snuck in without dt sails straight through the pause like a ghost, at which point the pause menu has caught a Week 3 bug for you." },
      { q: "You pause, then restart from the pause menu, and the fresh scene arrives frozen. Why?",
        options: ["The scene file is corrupt", "Time scale survives a scene reload, and nobody set it back to one", "The restart button double-fired", "The new scene loaded before the old one unloaded"],
        correct: 1,
        explain: "Reloading rebuilds the scene from the file, but the time scale is not part of the scene. The fix is one line at the top of Restart. Every student ships this bug once; the practice guide has you ship it in the cheap week, on purpose." },
      { q: "Why is reloading the scene the recommended restart, rather than resetting values by hand?",
        options: ["It is faster at runtime", "The engine rebuilds everything from the authored file, so nothing can be forgotten; hand-rolled resets fail the way memory always fails", "Hand resets are not supported by engines", "It avoids garbage collection"],
        correct: 1,
        explain: "Walking the world resetting values by hand means you will forget one thing, and the second run of the game will be haunted by the first. Reload the scene; let the file be the memory. Hand-rolled resets are legal, but you own every value you forget." },
      { q: "A health bar over an enemy's head vs. your own health bar on the glass. What decides which is which?",
        options: ["Whichever renders faster", "Whose information is this: the player's own information belongs on the glass, an object's information belongs in the world", "World space is always better", "The engine's UI system decides"],
        correct: 1,
        explain: "Screen space is a property of the player's view; world space is a property of an object, and it rides its parent's tree exactly like Week 2 said it would. Mixing them up does real UX damage: twelve enemy health bars pinned to the glass is a spreadsheet, not a battlefield." }
    ],

    checklist: {
      items: [
        { id: "r1", label: "Requirement 1 · A state object owns the facts and the legal methods that change them, with no UI references inside it, and the narration states the one-way street", optional: false },
        { id: "r2", label: "Requirement 2 · Two screen-space HUD elements bound to state, one of them a filled bar showing a fraction, both visibly updating during play", optional: false },
        { id: "r3", label: "Requirement 3 · The full circuit on camera, twice: start, play, end state, restart, play again with a genuinely clean reset", optional: false },
        { id: "r4", label: "Requirement 4 · A pause that freezes the world while the pause UI stays alive and interactive, and a resume that picks it back up", optional: false },
        { id: "r5", label: "Requirement 5 · One world-space element on a scene object, shown next to the screen-space HUD, with one sentence on whose information it is", optional: false },
        { id: "r6", label: "Requirement 6 · Deliverables: narrated video (2–5 min), source, one-paragraph build note", optional: false },
        { id: "trap", label: "The pause-then-restart freeze shown and fixed on camera (optional and recommended)", optional: true }
      ],
      note: "A personal tracker only: this browser, not the gradebook. Pass requires all six requirements; a failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue."
    }
  }
};
