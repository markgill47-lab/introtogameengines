/* ============================================================
 * SE 266 · Week 02 wiki — manifest + widget data
 * Loaded by dynamic injection from the shell. Articles are
 * markdown files in w02/articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w02",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 02 · Scene Graphs, Transforms, and Coordinate Spaces",
  home: "home",

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 2 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "start-at-35000-feet", title: "Start at 35,000 Feet" },
      { id: "scene-graph", title: "The Scene Graph" },
      { id: "transforms", title: "Transforms" },
      { id: "local-vs-world", title: "Local vs. World" },
      { id: "the-pivot", title: "The Pivot" },
      { id: "rotations-without-tears", title: "Rotations Without Tears" },
      { id: "camera-as-object", title: "The Camera Is Just an Object" },
      { id: "standard-prefab", title: "The Standard Prefab" },
      { id: "cross-engine-dictionary", title: "Cross-Engine Dictionary" }
    ]},
    { name: "Practice", articles: [
      { id: "hierarchy-basics", title: "Exercise 1: Hierarchy Basics" },
      { id: "the-house", title: "Exercise 2: The House" },
      { id: "the-windmill", title: "Exercise 3: The Windmill" },
      { id: "the-shot", title: "Exercise 4: The Shot" },
      { id: "other-engines", title: "Other Engines" }
    ]},
    { name: "Assignment", articles: [
      { id: "a1-spec", title: "A1: Scenes & Transforms" },
      { id: "recording-a1", title: "Recording Your A1 Video" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  widgets: {

    /* transformlab and pivotdemo are self-contained in the shell */
    transformlab: {},
    pivotdemo: {},

    quiz: [
      { q: "The cart rolls thirty feet down the aisle while the plane crosses a state line. What happens to the pretzels' numbers?",
        options: ["Local and world both change", "Local (relative to the cart) is unchanged; world changes constantly", "World is unchanged; local changes", "Neither changes — they're just pretzels"],
        correct: 1,
        explain: "The pretzels just sit there, being pretzels: their local position never changes. Their world position is composed up the tree — cart, plane, sky — and changes constantly. Attachment does the math." },
      { q: "Your windmill blade orbits wildly instead of spinning in place. What's wrong, and what's the fix?",
        options: ["The rotation script is too fast — lower the speed", "Gimbal lock — switch to quaternions", "Wrong pivot: it's rotating around its own misplaced origin. Wrap it in an empty parent positioned at the hub and rotate that", "The blade needs a collider"],
        correct: 2,
        explain: "Objects rotate around their own origin. You can't always move a model's origin, but you can always give it a new parent: the empty's origin becomes the pivot. The empty parent is the universal fix." },
      { q: "Why does the Standard Prefab keep the parent's scale at (1, 1, 1) and put all stretching inside Visuals?",
        options: ["It renders faster", "Non-uniform scale on a parent shears and skews every child rotating inside it", "Colliders can't be scaled", "It's just convention with no consequence"],
        correct: 1,
        explain: "Stretch a parent to (1, 3, 1) and rotating children shear, skew, and melt. Scale lives in Visuals; logic parents stay (1, 1, 1)." },
      { q: "The inspector says your chimney is at (0, 2.5, 0) but it's visibly across the map. Reconcile these facts.",
        options: ["The inspector is buggy — restart the editor", "The chimney is at the world origin and the map moved", "The inspector shows local numbers: (0, 2.5, 0) relative to its roof, whose parents compose the world answer", "The chimney's transform hasn't refreshed"],
        correct: 2,
        explain: "The inspector shows local space. The chimney is at (0, 2.5, 0) relative to its roof, and the roof has a parent, and so on up the tree until the world answer emerges. This surprises everyone once." },
      { q: "What's the policy on quaternions?",
        options: ["Learn the four numbers — you'll edit them weekly", "Read and write Euler angles, let the engine keep quaternions, never edit the four numbers by hand", "Avoid rotation entirely until Week 8", "Convert everything to degrees at startup"],
        correct: 1,
        explain: "Quaternions exist because four numbers dodge gimbal lock. When code combines rotations, use the engine's rotation functions — rotations compose by multiplication, not addition." },
      { q: "You roll the snack cart down the aisle. What happens to the plane?",
        options: ["It veers slightly — physics", "Nothing. Influence flows down the tree, never up: children ride parents, parents do not ride children", "It gains the cart's momentum", "Depends on the engine"],
        correct: 1,
        explain: "Bank the plane and the cart comes along; roll the cart and the plane does not veer. Half of all future hierarchy bugs are this sentence, ignored." },
      { q: "Rotate-then-translate versus translate-then-rotate produces:",
        options: ["The same transform — order is cosmetic", "A slightly offset transform", "A different transform entirely: different place, size, and facing. Engines apply one fixed order (scale, rotation, translation) for consistency", "A runtime error"],
        correct: 2,
        explain: "Transforms don't commute. Hold your arm out and turn your body, versus turn first and then raise your arm: same operations, different order, your hand ends up somewhere else entirely." },
      { q: "Under the hood, the camera is:",
        options: ["A special system object outside the scene graph", "A node in the tree with a transform like everything else, plus lens properties — it can be moved, rotated, and parented", "A render pass", "A shader"],
        correct: 1,
        explain: "The camera is just an object. Placement is a decision, not a default — and a parented camera inherits motion, which is the seed of Week 7's third-person rig." }
    ],

    checklist: {
      items: [
        { id: "r1", label: "R1 · A real hierarchy: 4+ primitives, 3+ levels deep, moving the parent moves the assembly — shown live", optional: false },
        { id: "r2", label: "R2 · Local vs. world demonstrated: inspector visible, local frozen while world changes, one sentence of why", optional: false },
        { id: "r3", label: "R3 · Parented motion around a correct pivot — no flailing", optional: false },
        { id: "r4", label: "R4 · Standard Prefab: two instances in scene + an edit inside Visuals propagating to all", optional: false },
        { id: "r5", label: "R5 · Deliberate camera + one sentence of intent", optional: false },
        { id: "r6", label: "R6 · Deliverables: narrated video (2–5 min), source, one-paragraph build note", optional: false }
      ],
      note: "A personal tracker only — this browser, not the gradebook. Pass requires all six; a failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue."
    }
  }
};
