/* ============================================================
 * SE 266 · Week 05 wiki: manifest + widget data
 * Loaded by dynamic injection from the shell. Articles are
 * markdown files in w05/articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w05",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 05 · Physics, Collision, and Authority",
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

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 5 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "bowling-alley", title: "Start at the Bowling Alley" },
      { id: "what-physics-sees", title: "What the Simulation Sees" },
      { id: "body-types", title: "Body Types: Who Moves Whom" },
      { id: "choosing-colliders", title: "Choosing Colliders" },
      { id: "collision-vs-trigger", title: "Collision vs. Trigger" },
      { id: "forces-and-impulses", title: "Forces, Impulses, and the Handoff" },
      { id: "layers-and-masks", title: "Layers and Masks" },
      { id: "cross-engine-dictionary", title: "Cross-Engine Dictionary" },
      { id: "gotchas", title: "Gotchas and Judgment Calls" }
    ]},
    { name: "Supplemental", articles: [
      { id: "the-ragdoll", title: "The Ragdoll" },
      { id: "the-slingshot", title: "The Slingshot" }
    ]},
    { name: "Practice", articles: [
      { id: "gravity-on", title: "Exercise 1: Gravity On" },
      { id: "the-throw", title: "Exercise 2: The Throw" },
      { id: "silent-gate", title: "Exercise 3: The Silent Gate" },
      { id: "the-matrix", title: "Exercise 4: The Matrix" },
      { id: "other-engines", title: "Other Engines" }
    ]},
    { name: "Assignment", articles: [
      { id: "a3-spec", title: "Assignment 3: Physics & Collision" },
      { id: "recording-a3", title: "Recording Your Assignment 3 Video" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  widgets: {

    /* ragdoll: ten capsules, two authorities. Kinematic mode is scripted
       placement; ragdoll mode is a tiny Verlet simulation. The mode button
       hands over at rest (the thud); drag-and-release with the throw box
       checked hands over with inherited motion (the bowling release). */
    ragdoll: {
      instruction: "Grab a hand, foot, or the head to pose that limb. Grab the belly to move the whole figure. Pose it, then flip to ragdoll and watch it fall from exactly that shape. Or check the release box, drag fast, and let go.",
      kinematicLabel: "kinematic · your code",
      ragdollLabel: "ragdoll · the simulation",
      throwLabel: "release = the bowling release (inherit the swing)",
      resetLabel: "Stand it back up",
      kinematicBadge: "authority: your code",
      ragdollBadge: "authority: the simulation",
      kinematicNote: "Kinematic: the hand of god. Every joint goes exactly where you put it and holds that pose, gravity is not consulted, and it will hang in midair all day. This is your character while the animation system poses it. The mode switch below hands it over at rest, so expect the thud.",
      ragdollNote: "Ragdoll: authority surrendered. Gravity owns every joint, the bones only enforce their lengths, and a dragged wrist tows the rest like wet laundry. This is what death looks like to an engine: not an animation, a handoff."
    },

    /* slingshot: aim a launch vector (capped), release, and a projectile flies
       on a gravity arc into a stack of rigid boxes. The release is an impulse
       (one-shot velocity, no dt); the topple is collision response the sim
       resolves, not a scripted animation. Boxes are rigid Verlet quads (four
       particles, six sticks); collisions are point-out-of-box projections. */
    slingshot: {
      instruction: "Set the angle and power, then press Release. The ball leaves with exactly that velocity: one impulse, no second push. A flat, hard line knocks the most blocks over.",
      angleLabel: "launch angle",
      powerLabel: "launch power",
      releaseLabel: "Release",
      resetLabel: "Reset the blocks",
      aimBadge: "authority: your code",
      flyBadge: "authority: the simulation",
      aimNote: "You are aiming the impulse. Nothing has moved yet: the ball waits at the band holding the launch vector you drew, and gravity is not consulted until you let go.",
      flyNote: "Released. The ball got one shove, the launch velocity, and the simulation owns it now: gravity bends the arc, and whatever it strikes, the blocks resolve for themselves. No frame of this was scripted.",
      winNote: "All down. Those topples were the simulation resolving collisions, not an animation playing back. Reset and see if you can clear them in one line again."
    },

    quiz: [
      { q: "At the bowling alley, what exactly changes at the moment of release?",
        options: ["The ball becomes real; before release it was only a visual", "Authority over the ball's placement transfers from you to physics, and your remaining influence is whatever force you already spent", "The ball switches from kinematic to static", "Nothing: you steer the ball the whole way down the lane"],
        correct: 1,
        explain: "Carried and released are two arrangements of one question: who has authority over where this object is? Body english is the universal, useless attempt to keep influencing an object whose authority you already signed away." },
      { q: "You add a rigid body to a moving object and it drops straight down instead of continuing on. Why?",
        options: ["The collider is the wrong shape", "A body arrives with zero velocity and zero spin: the simulation cannot infer speed from the positions your script was writing, so it starts at rest unless you give it motion at the handoff", "Gravity is set too high", "The object needs a mass greater than one before it can travel"],
        correct: 1,
        explain: "The bowling metaphor has a seam here. A real release inherits the whole approach: momentum, arm swing, spin. Adding a rigid body inherits nothing, because a position is not a velocity. If it should be moving when you let go, you have to be the arm: set the velocity or apply an impulse at the moment of transfer." },
      { q: "Why does the simulation reason about a box instead of your 40,000-triangle mesh?",
        options: ["Boxes look better", "Cost: overlap between two boxes is a handful of comparisons, and the engine answers overlap questions for every moving pair, fifty times a second", "Meshes cannot be collided with at all", "The renderer requires it"],
        correct: 1,
        explain: "Physics runs on simple stand-in shapes called colliders. The simulation moves those, their transforms update, and your visible objects ride along as presentation." },
      { q: "A house, an elevator, and a thrown rock. Which citizenships, and who can push whom?",
        options: ["All dynamic; everything pushes everything", "Static, kinematic, dynamic: the elevator pushes the rock and nothing in the simulation pushes the elevator back", "Static, dynamic, kinematic", "Kinematic, dynamic, static"],
        correct: 1,
        explain: "A kinematic body is the hand of god: it shoves dynamics out of its way, ignores gravity, and cannot be deflected. The simulation reroutes everyone else around the fact that it goes where it is told." },
      { q: "Why is teleporting a dynamic body by writing its transform a bug even when it looks fine?",
        options: ["It is slower than using forces", "It rewrites reality between physics steps, so velocity and position disagree, objects jam into walls, and stacks explode", "Transforms are read-only on dynamic bodies", "It only breaks in builds, never in the editor"],
        correct: 1,
        explain: "You signed authority over. Grabbing the transform is running down the lane to reposition the ball mid-roll. If you need direct placement, that is a diagnosis, not a crime: the object wanted scripted placement or kinematic citizenship." },
      { q: "Your trigger zone fires nothing as the player walks through. First thing to check?",
        options: ["Whether the collider is large enough", "Whether at least one object in the pair has a rigid body, because most engines generate no events without one", "Whether the script compiled", "Whether the player is moving too fast"],
        correct: 1,
        explain: "The most-Googled physics failure in Unity's history, and it fails in total silence: no error, no warning, nothing. A trigger arch plus a player who is a bare collider equals two objects passing through each other with no opinion about it." },
      { q: "A wall and a checkpoint are the same component with one declaration flipped. What is that declaration really asking?",
        options: ["Whether the object is visible", "Does this thing exist to change motion, or to change game state?", "Whether the object is static or dynamic", "How much mass the object has"],
        correct: 1,
        explain: "Walls change motion. Checkpoints change state. A solid collider resolves physically and also reports the event; a trigger skips the physics entirely and only reports. One declaration, two design intents." },
      { q: "Throwing a rock: force or impulse, which update, and where did delta time go?",
        options: ["Continuous force in FixedUpdate, multiplied by delta time", "Impulse, fired once from the frame update, and no delta time anywhere because instantaneous things never get dt", "Impulse in FixedUpdate, multiplied by delta time", "Either one; the distinction is stylistic"],
        correct: 1,
        explain: "A throw is a shove, not a thrust. Week 3's rule wearing a physics jacket: continuous gets dt, instantaneous does not. A one-shot impulse is fine to fire from Update because the engine queues it sensibly; it is continuous force that must live on the metronome." },
      { q: "Your rocks keep hitting the player who threw them. What is the fix that is not code?",
        options: ["Check 'did I hit myself?' inside every collision handler", "Put Player and Projectile on separate layers and uncheck their pair in the collision matrix", "Spawn the rock further away and hope", "Make the player kinematic"],
        correct: 1,
        explain: "One checkbox, zero code. The alternative, testing for self-hits in code on every collision forever, is how projects grow barnacles. Week 15 points this same machinery at raycasts and turns it into the eyes of every guard in the valley." }
    ],

    checklist: {
      items: [
        { id: "r1", label: "Requirement 1 · Three citizenships present and named on camera: static, dynamic, and a kinematic that visibly pushes dynamics without being pushed", optional: false },
        { id: "r2", label: "Requirement 2 · A dynamic object set moving by force or impulse, application call shown, and no dynamic body anywhere moved by its transform", optional: false },
        { id: "r3", label: "Requirement 3 · Physical collision doing visible work: a stack toppling, an object knocked down, a real deflection (not scripted animation)", optional: false },
        { id: "r4", label: "Requirement 4 · A trigger event: free passage AND a visible game event, contrasted out loud with Requirement 3's physical response", optional: false },
        { id: "r5", label: "Requirement 5 · Two layers with a deliberately disabled interaction, demonstrated point-blank, named as configuration rather than code", optional: false },
        { id: "r6", label: "Requirement 6 · Deliverables: narrated video (2–5 min), source, one-paragraph build note", optional: false },
        { id: "silent", label: "The silent gate shown failing and then fixed live on camera (optional and recommended)", optional: true }
      ],
      note: "A personal tracker only: this browser, not the gradebook. Pass requires all six requirements; a failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue."
    }
  }
};
