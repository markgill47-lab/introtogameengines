/* ============================================================
 * SE 266 · Week 01 wiki: manifest + widget data
 * Loaded by dynamic injection (static <script src> is inert in
 * D2L topics). Articles themselves are markdown files in
 * articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w01",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 01 · Engines, Anatomy, and Choosing Yours",
  home: "home",

  /* sibling wikis at the content root, for [[peer:article|label]] links */
  peers: {
    res: "The Free Library.html",
    w01: "Week 01 - Engines, Anatomy, and Choosing Yours.html",
    w02: "Week 02 - Scene Graphs, Transforms, and Coordinate Spaces.html",
    w03: "Week 03 - The Game Loop, Time, and Input.html",
    w04: "Week 04 - Design Vocabulary, What Makes Games Games.html",
    w05: "Week 05 - Physics, Collision, and Authority.html"
  },

  /* ---- article manifest: sidebar order, grouped ---- */
  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 1 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "start-with-2002", title: "Start with 2002" },
      { id: "what-is-a-game-engine", title: "What Is a Game Engine, Actually?" },
      { id: "engine-policy", title: "The Engine Policy, in Practice" },
      { id: "llm-tutor", title: "Using an LLM to Learn an Engine" }
    ]},
    { name: "The Common Anatomy", articles: [
      { id: "common-anatomy", title: "The Common Anatomy" },
      { id: "renderer", title: "The Renderer" },
      { id: "scene-system", title: "The Scene System" },
      { id: "scripting-runtime", title: "The Scripting Runtime" },
      { id: "physics-engine", title: "The Physics Engine" },
      { id: "input-system", title: "The Input System" },
      { id: "ui-system", title: "The UI System" },
      { id: "animation-system", title: "The Animation System" },
      { id: "audio-system", title: "The Audio System" },
      { id: "asset-pipeline", title: "The Asset Pipeline" }
    ]},
    { name: "Supplemental", articles: [
      { id: "the-render-pipeline", title: "The Render Pipeline" },
      { id: "unity-lifecycle", title: "The Unity Lifecycle" }
    ]},
    { name: "Engines", articles: [
      { id: "unity", title: "Unity" },
      { id: "godot", title: "Godot" },
      { id: "unreal", title: "Unreal" },
      { id: "threejs", title: "Three.js" },
      { id: "honorable-mentions", title: "Honorable Mentions" },
      { id: "how-to-choose", title: "How to Choose" }
    ]},
    { name: "Practice", articles: [
      { id: "install-checklists", title: "Install Checklists" },
      { id: "hello-scene", title: "Hello Scene" },
      { id: "demo-game-w01", title: "The Demo Game: W01_Anatomy" },
      { id: "recording-setup", title: "Recording Setup: OBS" },
      { id: "this-weeks-work", title: "This Week's Work" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  /* ---- widget data ---- */
  widgets: {

    /* the render pipeline: five stages, stacked; each opens a modal */
    renderpipeline: {
      instruction: "Select a stage to open it up.",
      stages: [
        { id: "logic", name: "Logic", tag: "what exists, and where",
          body: "Before anything draws, the game decides what the world even contains this frame: which objects exist, where their transforms put them, which camera is looking, and what can be skipped entirely. Culling lives here. If the castle is behind the camera, the stages below never hear about it.\n\nThis stage is the handoff from the scene tree (Week 2's whole subject) to the machinery below. Nothing here has a color yet: it's all positions, visibility, and lists." },
        { id: "sort", name: "Sort", tag: "what draws in which order",
          body: "The renderer doesn't draw things in the order you created them; it draws them in the order that's correct and fast. Opaque objects sort roughly front to back, so pixels hidden behind closer objects get rejected early instead of computed and thrown away. Transparent objects sort the other way, back to front, because glass has to draw over what's behind it.\n\nMaterials also get grouped here so the GPU changes state as rarely as possible. When a see-through effect draws in the wrong order in Week 7, this stage is where you'll come looking." },
        { id: "color", name: "Color", tag: "the surface's base look",
          body: "Every surface starts with an answer to \"what color is this before any lighting?\" That's the material's base color: texture maps, tints, the flat gray of your greybox cubes. No lights involved yet. Think of it as the object's opinion of itself.\n\nThe material sliders you'll set all semester (Metallic, Smoothness) live at this stage and the next. What they actually mean, derived, is a Deeper Water topic: [[res:pbr|PBR Materials]] in the library." },
        { id: "shade", name: "Shade", tag: "light gets its vote",
          body: "Now every light that reaches the surface changes the answer: direction, distance, falloff, shadow. In 2002 I decided how light fell off across a surface, mathematically, and then implemented it. Today it's a dropdown, and this stage is the dropdown doing its work.\n\nShaders are the small programs that run this math, and writing your own is the classic show-off layer on a final project. The gentle way in is [[res:shaders|The Book of Shaders]], in the library." },
        { id: "rasterize", name: "Rasterize", tag: "triangles become pixels",
          body: "The final translation: lit triangles become the actual pixels of this frame. The rasterizer walks each triangle, works out which pixels it covers, checks depth so nearer surfaces win, and writes the result into the framebuffer your monitor displays.\n\nEverything above this was geometry and math. This is where it becomes a picture, sixty-ish times a second, and then the loop starts over. Week 3 is about that loop." }
      ]
    },

    /* Unity's lifecycle: startup methods, the loop, and coroutines */
    unitylifecycle: {
      instruction: "Select a method to open it up.",
      startup: {
        label: "Startup · once, in this order",
        caption: "runs when an object arrives",
        methods: [
          { id: "awake", name: "Awake", tag: "first word, once",
            body: "The engine calls Awake exactly once per object, the moment the object exists in a loaded scene, before anything else runs. This is the place for self-setup: caching references to your own components, initializing internal state.\n\nOne rule saves real debugging: don't talk to other objects here. Their Awake may not have run yet, and the order between objects is not guaranteed. Set yourself up; introductions come later, in Start." },
          { id: "onenable", name: "OnEnable", tag: "every time you wake up",
            body: "Awake runs once. OnEnable runs every time the object or component becomes enabled: once at startup, and again whenever something switches it back on. Its mirror is OnDisable, called on the way out.\n\nThe professional habit that starts here: subscribe to events in OnEnable, unsubscribe in OnDisable, always as a pair. Week 11 makes that sentence load-bearing when the Observer pattern arrives. For now, file the symmetry." },
          { id: "start", name: "Start", tag: "safe introductions, once",
            body: "Start runs once, just before the object's first Update, and only if the object is enabled. By the time Start runs, every object in the scene has finished Awake, which makes this the safe place for introductions: find the player, register with a manager, read another object's state.\n\nSelf-setup in Awake, introductions in Start. That split resolves most first-semester initialization bugs before they happen." }
        ]
      },
      loop: {
        label: "The Loop · every frame, forever",
        caption: "one revolution ≈ 16 ms",
        methods: [
          { id: "fixedupdate", name: "FixedUpdate", tag: "the physics clock",
            body: "The visible loop runs as fast as the frame allows. Physics refuses to live that way: it runs on its own fixed clock, every 0.02 seconds by default, and the engine calls FixedUpdate zero, one, or several times per frame to keep the two clocks aligned.\n\nForces, rigidbody movement, anything physical belongs here, and Week 5 lives here. Why an engine needs two clocks at all is a genuinely great question, and the classic answer is in the library: [[res:gaffer|Fix Your Timestep!]]" },
          { id: "update", name: "Update", tag: "once per frame",
            body: "The heartbeat. The engine calls Update on every enabled script, once per frame, forever, and this is where most gameplay lives: reading input, moving things, deciding things.\n\nFrames are not all the same length, which is why the windmill script in Week 2's practice guide multiplies by Time.deltaTime. That one idea, per-frame time made explicit, is most of Week 3, and it's the difference between a game that runs the same speed on every machine and one that doesn't." },
          { id: "lateupdate", name: "LateUpdate", tag: "the last word each frame",
            body: "After every script's Update has run, the engine makes one more pass: LateUpdate. It exists for work that needs to see the frame's finished state, and the canonical tenant is the camera: let the player move first, then have the camera follow, so it never films where the target used to be.\n\nWeek 7 builds that follow rig, and this is where it will live." }
        ]
      },
      coroutine: {
        name: "Coroutines", tag: "one task, across many frames",
        caption: "one pass of this arrow spans many turns of the loop",
        body: "Sometimes a task is bigger than a frame: fade the screen over two seconds, open a door at a fixed speed, spawn a wave one enemy at a time. A coroutine is Unity's way to write that as one readable function that politely borrows a slice of many frames.\n\nThe magic word is yield. \"yield return null\" pauses the function until next frame; \"yield return new WaitForSeconds(2f)\" pauses it across however many frames two seconds turns out to be. Each frame the engine resumes the function exactly where it left off, until it runs out. That's the slow arrow under the loop: one pass of the task, many revolutions of the engine.\n\nOne caveat before Week 3 formalizes all of this: a coroutine is not a thread. It runs on the main loop, in its turn, like everything else. It just remembers where it was." }
    },

    /* organ navigation grid: items link to their articles */
    anatomy: [
      { id: "renderer", name: "The Renderer", week: "Always on",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><rect x="6" y="12" width="22" height="17" rx="3"/><path d="M28 18 L35 14 V27 L28 23"/><circle cx="17" cy="20.5" r="4.5" stroke="#D8A24A"/></g></svg>' },
      { id: "scene-system", name: "The Scene System", week: "Week 2",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><circle cx="20" cy="8" r="4" stroke="#D8A24A"/><circle cx="10" cy="24" r="4"/><circle cx="30" cy="24" r="4"/><circle cx="30" cy="35" r="3"/><path d="M17 11 L12 20 M23 11 L28 20 M30 28 L30 32"/></g></svg>' },
      { id: "scripting-runtime", name: "The Scripting Runtime", week: "Week 3 →",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.4" stroke-linecap="round"><path d="M13 10 L5 20 L13 30" stroke="#D8A24A"/><path d="M27 10 L35 20 L27 30" stroke="#D8A24A"/><line x1="23" y1="8" x2="17" y2="32"/></g></svg>' },
      { id: "physics-engine", name: "The Physics Engine", week: "Week 5",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2"><rect x="7" y="24" width="11" height="11" rx="2"/><rect x="20" y="24" width="11" height="11" rx="2"/><rect x="13" y="11" width="11" height="11" rx="2" stroke="#D8A24A" transform="rotate(12 18.5 16.5)"/></g></svg>' },
      { id: "input-system", name: "The Input System", week: "Week 12",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><path d="M10 14 H30 C35 14 37 19 36 25 C35 30 30 31 27 27 L25 24 H15 L13 27 C10 31 5 30 4 25 C3 19 5 14 10 14 Z"/><line x1="12" y1="19" x2="12" y2="23" stroke="#D8A24A"/><line x1="10" y1="21" x2="14" y2="21" stroke="#D8A24A"/><circle cx="28" cy="21" r="1.6" fill="#D8A24A" stroke="none"/></g></svg>' },
      { id: "ui-system", name: "The UI System", week: "Week 6",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2"><rect x="6" y="8" width="28" height="24" rx="3"/><line x1="6" y1="15" x2="34" y2="15"/><rect x="11" y="20" width="10" height="7" rx="1.5" stroke="#D8A24A"/></g></svg>' },
      { id: "animation-system", name: "The Animation System", week: "Week 8 · 10",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="10" width="9" height="20" rx="2"/><rect x="16" y="10" width="9" height="20" rx="2"/><rect x="27" y="10" width="9" height="20" rx="2" stroke="#D8A24A"/><circle cx="9.5" cy="17" r="1.5" fill="#C9C0B2" stroke="none"/><circle cx="20.5" cy="19" r="1.5" fill="#C9C0B2" stroke="none"/><circle cx="31.5" cy="22" r="1.5" fill="#D8A24A" stroke="none"/></g></svg>' },
      { id: "audio-system", name: "The Audio System", week: "Week 7",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><path d="M8 16 H14 L21 9 V31 L14 24 H8 Z" fill="#241F18"/><path d="M26 14 C29 17 29 23 26 26" stroke="#D8A24A"/><path d="M30 10 C35 14 35 26 30 30" stroke="#D8A24A"/></g></svg>' },
      { id: "asset-pipeline", name: "The Asset Pipeline", week: "Week 8",
        icon: '<svg viewBox="0 0 40 40" width="28" height="28"><g fill="none" stroke="#C9C0B2" stroke-width="2.2" stroke-linecap="round"><path d="M8 14 L20 8 L32 14 L20 20 Z"/><path d="M8 14 V26 L20 32 V20"/><path d="M32 14 V26 L20 32" stroke="#D8A24A"/></g></svg>' }
    ],

    /* engine chooser: the four questions */
    chooser: {
      questions: [
        { id: "hw", q: "What does your hardware say?",
          note: "Weigh this first. Be realistic before you be ambitious.",
          options: [
            { label: "An older or modest laptop", scores: { unity: 1, godot: 2, unreal: -3, three: 1 } },
            { label: "A solid, recent machine", scores: { unity: 2, godot: 2, unreal: 1, three: 1 } },
            { label: "A gaming rig or workstation", scores: { unity: 2, godot: 1, unreal: 3, three: 1 } }
          ] },
        { id: "lang", q: "What language do you want to live in?",
          note: "You'll write a lot of it.",
          options: [
            { label: "C#", scores: { unity: 3, godot: 1, unreal: 0, three: 0 } },
            { label: "Something Python-flavored (GDScript)", scores: { unity: 0, godot: 3, unreal: 0, three: 0 } },
            { label: "C++", scores: { unity: 0, godot: 0, unreal: 3, three: 0 } },
            { label: "JavaScript", scores: { unity: 0, godot: 0, unreal: 0, three: 3 },
              foot: "Also worth a look: Phaser: 2D, browser, lovely for a 2D final project." },
            { label: "No strong preference", scores: { unity: 1, godot: 0, unreal: 0, three: 0 } }
          ] },
        { id: "lane", q: "What's your final project lane, roughly?",
          note: "Nothing is locked; directionally it matters.",
          options: [
            { label: "A browser-shippable visualization or sim", scores: { unity: 0, godot: 1, unreal: 0, three: 3 } },
            { label: "A gorgeous 3D showpiece", scores: { unity: 1, godot: 0, unreal: 3, three: 0 } },
            { label: "A 2D game", scores: { unity: 2, godot: 2, unreal: 0, three: 1 },
              foot: "If you're also a JavaScript person, ask me about Phaser. The answer is usually yes." },
            { label: "Not sure yet, I want maximum help", scores: { unity: 3, godot: 1, unreal: 0, three: 0 } }
          ] },
        { id: "support", q: "How much support do you want?",
          note: "I demo in Unity. Everyone else translates: a skill, and a tax.",
          options: [
            { label: "I want my exact problem solved on screen", scores: { unity: 3, godot: 0, unreal: 0, three: 0 } },
            { label: "I'm happy translating from the Unity demos", scores: { unity: 0, godot: 1, unreal: 1, three: 1 } }
          ] }
      ],
      engines: {
        unity: { name: "Unity", lang: "C#", chip: "course default", article: "unity",
          agree: "You're taking the most-supported path: the demos I grade are built in exactly this engine, and the VizLab machines have it installed." },
        godot: { name: "Godot", lang: "GDScript / C#", chip: "open source", article: "godot",
          agree: "You're agreeing to translate the Unity demos, a skill this course explicitly values, but a real tax. Choose it on purpose." },
        unreal: { name: "Unreal", lang: "C++ / Blueprints", chip: "AAA", article: "unreal",
          agree: "You're agreeing to the hardware bill and the C++ learning curve. “It looks cool” is a reason; just budget the hours." },
        three: { name: "Three.js", lang: "JavaScript", chip: "the asterisk", article: "threejs",
          agree: "You're agreeing to assemble the subsystems the other engines hand you: physics via rapier or cannon-es, UI via HTML/CSS, and your own loop via requestAnimationFrame." }
      },
      closing: "Decide this week. Switching engines in Week 3 costs a weekend. Switching in Week 9 costs the micro-game.",
      tiebreak: "When in doubt: Unity, the most-supported path, and the VizLab machines have it installed."
    },

    /* self-check quiz */
    quiz: [
      { q: "Every engine makes three promises. Which of these is NOT one of them?",
        options: ["A loop that runs your world many times a second", "A scene, a structured world of parented objects", "An asset store", "A toolbox of subsystems you configure rather than derive"],
        correct: 2,
        explain: "The three promises are the loop, the scene, and the toolbox. Everything else (editors, asset stores, build pipelines) exists in service of those three." },
      { q: "Which subsystem is “a parallel simulation of forces, bodies, and collisions that the renderer takes pictures of”?",
        options: ["The Animation System", "The Physics Engine", "The Scene System", "The Input System"],
        correct: 1,
        explain: "That's the physics engine, covered in Week 5. The renderer doesn't simulate anything; it photographs the simulation." },
      { q: "You rotate the Player object in the scene hierarchy. What happens to the Sword parented under it?",
        options: ["Nothing: objects transform independently", "It rotates too: transforms cascade from parent to child", "It detaches and falls", "It rotates the opposite way to compensate"],
        correct: 1,
        explain: "Parent/child transforms are the point of the scene tree: move a parent and its children follow. Week 2 is all about this." },
      { q: "Best fit for a browser-shippable data visualization, and what's the catch?",
        options: ["Unity, no catch", "Unreal: the catch is the install size", "Three.js: the catch is you assemble physics, UI, and the loop yourself", "Godot: the catch is no browser export"],
        correct: 2,
        explain: "Three.js ships as a URL anyone can open, but it's a rendering library, not a full engine: you build small versions of the subsystems the others hand you." },
      { q: "The chatbot hands you a Godot script and it errors on the very first line. The most likely culprit?",
        options: ["Godot is broken; reinstall it", "Version drift: it gave you Godot 3 syntax in a Godot 4 project (or invented an API)", "Your machine can't run GDScript", "The script is too short"],
        correct: 1,
        explain: "The two classic failures are version drift and invented APIs, and the model sounds equally confident either way. First move: tell it your engine and version, and treat API names as claims to verify. The compiler is the referee." },
      { q: "Why install Unity's LTS version instead of the newest beta with the bigger number?",
        options: ["LTS has better graphics", "Betas cost money", "LTS means Long Term Support: the version that doesn't surprise you mid-semester", "LTS downloads faster"],
        correct: 2,
        explain: "Do not install a beta because the number is bigger. LTS is the version that doesn't surprise you mid-semester." },
      { q: "“Why does my Godot export template fail on Windows?” Under the engine policy, whose problem is this?",
        options: ["The instructor's: all questions are course questions", "Yours: it's a tooling question, and your tooling is yours", "Godot's: file a bug", "Nobody's: exports are optional"],
        correct: 1,
        explain: "Concept questions (“how do I decouple my UI from my player?”) are the course, in any engine. Tooling questions are yours: sympathy included, ownership not transferred." },
      { q: "“Elevation of cognitive labor” means:",
        options: ["Engines make games run faster", "Thinking harder produces better games", "The engine absorbed the machinery layer, so your thinking moves up to the behavior layer, and AI is now doing the same thing one floor up", "Senior engineers get the interesting work"],
        correct: 2,
        explain: "The engine didn't remove the work; it absorbed a layer of it. You stop deciding how photons attenuate and start deciding how a guard behaves, and AI is repeating the move on the behavior layer right now." }
    ],

    /* finish-line checklist */
    checklist: {
      items: [
        { id: "engine", label: "Engine chosen, on purpose, using the four questions", optional: false },
        { id: "install", label: "Engine installed; Hello Scene renders", optional: false },
        { id: "obs", label: "OBS installed; 30-second narrated test recorded and played back", optional: false },
        { id: "repo", label: "Repo or backed-up project folder exists", optional: false },
        { id: "tour", label: "Five-station anatomy tour rebuilt in your engine", optional: true },
        { id: "discord", label: "Introduced yourself on the course Discord with your engine pick", optional: true }
      ],
      note: "This checklist lives in this browser only: a personal tracker, not the gradebook. Assignment 1 lands next week and assumes the four required boxes are checked."
    }
  }
};
