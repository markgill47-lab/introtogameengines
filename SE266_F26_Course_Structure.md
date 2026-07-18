# SE 266 Fall 2026 Course Structure (Draft for Discussion)

**Working title:** Game Design & Engine Architecture
*(formerly "Game Engine Scripting")*

---

## 1. The Core Reframe

| | F24 | F25 | F26 (proposed) |
|---|---|---|---|
| Subject | Unity features | AI collaboration | Game design & architecture concepts |
| Engine | Unity required | Unity required | **Student's choice** (Unity, Godot, Unreal, Three.js, ...) |
| Grading | Tiered spec (pass/fail) | Weighted % + milestones | **Tiered spec restored** |
| AI role | Encouraged | The headline | **Woven in: a normal tool, used well** |

The organizing principle: **every assignment is specified by concept, not by engine feature.** "Materials and Textures" (an assignment about Unity menus) becomes "Rendering & Game Feel" (an assignment about a concept that exists in every engine). You lecture the concept engine-agnostically, demo it in Unity, and students implement it wherever they live. This is what makes the engine-optional promise real instead of "Unity class, but you're allowed to suffer alone in Godot."

**Why F25 struggled, and what this fixes:** AI became the subject instead of the instrument, so students prompted their way to output without building understanding. The weighted/milestone grading also fought your actual practice of flexible deadlines. F26 puts games back at the center and returns to the tier system, with AI expectations built into how the work is done and documented, not what the course is about.

---

## 2. How Engine-Agnostic Grading Works

This is the load-bearing mechanism. You can't be expected to install and run four engines' projects. So **every assignment will have the same three deliverables:**

1. **Demo Video (2–5 min):** a screen recording showing each spec item working, narrated. "Here's the collision response, and here's what happens when I disable it."
2. **Source:** repo link or zipped project.
3. **Build Note (one paragraph to half a page):** what approach they took, what AI produced versus what they wrote or fixed, and what they'd do differently.

You grade primarily from the video against a **checklist of observable behaviors** written in engine-neutral language. Example spec item: "Two objects collide; one responds physically, one triggers a non-physical game event." That's checkable in any engine, from a video, in under a minute. The source is your audit trail when a video looks suspicious. The build note is the lightweight descendant of F25's AI logs (one paragraph, not a reflection essay).

This also happens to be the perfect hyflex format: remote students' deliverables are identical to in-person students'. Nobody is doing an "online version" of anything.

---

## 3. Grading: Tiered Specification (Restored)

Pass/fail per assignment. Fail means missing spec items: fix and resubmit. No due dates enforced; resubmissions accepted until grades are due. Higher tiers not evaluated until lower tiers are complete.

### Tier 3 → C: Core Mechanics (7 assignments)
Concepts every game in every engine is built from.

| # | Assignment | Concept (engine-neutral) |
|---|---|---|
| 1 | **Scenes & Transforms** | Scene graph, parent/child hierarchies, coordinate spaces, placing a camera |
| 2 | **The Loop & Input** | Update cycle, frame-rate-independent movement, input handling |
| 3 | **Physics & Collision** | Rigid bodies, collision response vs. trigger events, forces |
| 4 | **Interface & Game State** | HUD, menus, score/progress display, start–play–end flow |
| 5 | **Cameras & Game Feel** | Follow/orbit rigs, particles, sound, screen shake ("juice") |
| 6 | **Animation** | Keyframes, state-driven animation, blending user input into motion |
| 7 | **Micro-Game** | Assemble 1–6 into one tiny complete playable loop (win/lose/restart) |

*The Micro-Game is the tier capstone. The C student walks away having shipped a complete, if tiny, game. That was missing from both prior versions.*

### Tier 2 → B: Thinking in Patterns (4 assignments + 1 analysis)
**The B tier is where students learn to think in patterns.** For most, this is their first course after Programming 2 and they have never seen a design pattern. Each pattern is taught through the game problem that makes it necessary, with **MVC as the lecture-level frame** holding the tier together: game state is the model, the rendered scene is the view, and the three patterns below are how the pieces talk without strangling each other.

| # | Assignment | Pattern | Motivating problem |
|---|---|---|---|
| 8 | **State Machines** | State | Game flow and character behavior as explicit FSMs. "Why is my player jumping while dead?" |
| 9 | **Events & Decoupling** | Observer | "The UI shouldn't poll the player's health every frame." Event bus, subscriptions, why systems shouldn't reference each other directly |
| 10 | **Input as Commands** | Command | "Input shouldn't directly move the character." Command objects, plus **one of:** key rebinding, replay, or undo |
| 11 | **Data & Persistence** | Data-driven design | Behavior/tuning defined in data (ScriptableObjects / Resources / JSON) going in, save/load serialization going out. Data in both directions |
| 12 | **Game Deconstruction** | | Pick a shipped game (any genre); analyze its core loop, its systems, and **where the patterns are hiding**: spot the state machines, the observers, the command streams. Paper or video. |

*#12 is where "design topics spanning the whole range of games" gets teeth. Students collectively deconstruct platformers, roguelikes, RTS, sims, and puzzle games, and now it doubles as pattern-recognition practice in the wild.*

### Tier 1 → A: Synthesis (2 assignments + final project)

| # | Assignment | Concept |
|---|---|---|
| 13 | **Procedural Generation** | Algorithmic content: levels, terrain, loot. Seeded and tunable |
| 14 | **Game AI** | Steering, pathfinding, and/or behavior trees for non-player entities |
| | **Final Project** | One of four lanes, in the engine of choice (see below) |

**Final project: four lanes, one bar.** Students pick the lane that fits them; deliverables and rigor are equivalent across all four:

1. **Game:** a complete playable experience with a core loop, win/lose states, and the Tier 3 fundamentals on display.
2. **Scientific / Engineering Visualization:** for the meteorology and physics folks. Real data or a real model, rendered interactively. Interaction, camera navigation, and progress/state display still required.
3. **Simulation:** an interactive system model (traffic, ecosystems, orbital mechanics...) with tunable parameters.
4. **In-Depth Technical Tutorial:** pick an advanced topic (the F24 tutorial list is the menu: shaders, multiplayer, AR, ECS, compute...), build **two working demo projects** in your engine, and produce a 15–20 minute produced tutorial video. Research, architecture, working code, and communication: synthesis aimed at teaching instead of shipping.

**Deliverables (all lanes):** short design doc up front (one to two pages: core loop / system model / topic plan, systems list, scope), demo video, build/executable or hosted link, source, and a one-page postmortem (what the architecture was, where it bent, what AI did well and badly). The design doc keeps F25's best idea, spec-first thinking, at a sane size.

---

## 4. The AI Thread (Woven, Not the Headline)

- **Policy:** AI use is expected and unremarkable, like using a compiler or Stack Overflow. Not using it is also fine.
- **Accountability, not ceremony:** the per-assignment build note (one paragraph) replaces prompt logs and reflection essays. It answers: what did AI produce, what did you have to fix, and do you understand what shipped?
- **The oral-defense backstop:** because every submission includes a narrated video, a student who prompted their way to code they don't understand has to explain it out loud anyway. This is your cheapest, most humane defense against hollow AI submissions. No proctoring, no accusation, just "walk me through it."
- **Two or three dedicated moments, not sixteen:** e.g., Week 1 (using AI to learn an unfamiliar engine), Week 9-ish (AI code review: have it critique your architecture, decide if it's right), and the final postmortem. Everywhere else it's just ambient.

---

## 5. Sixteen-Week Arc (2 sessions/week, hyflex)

Rhythm: **Session A = concept** (engine-agnostic design/architecture lecture, cross-engine comparisons, game deconstructions). **Session B = practice** (Unity implementation demo plus open lab / studio time, where students work in their own engines and you float). All sessions recorded; lab time doubles as help-desk hours for remote students via Discord/Zoom.

| Wk | Session A: Concept | Session B: Practice | Tier pace* |
|---|---|---|---|
| 1 | What an engine is: anatomy of Unity, Godot, Unreal, Three.js; how to choose | Environment setup in your engine; AI as engine-learning tutor | |
| 2 | Scene graphs, transforms, coordinate spaces | Unity demo: scenes & hierarchy | A1 |
| 3 | The game loop; time, frames, and input | Unity demo: movement & input | A2 |
| 4 | Design vocabulary: core loops, MDA, what makes games *games* | Deconstruction workshop (play & analyze together) | |
| 5 | Physics & collision concepts across engines | Unity demo: physics | A3 |
| 6 | UI, game state, and flow | Unity demo: UI & state | A4 |
| 7 | Game feel: cameras, juice, feedback | Unity demo: cameras, particles, audio | A5 |
| 8 | Animation systems | Unity demo: animation | A6 |
| 9 | Architecture I: MVC, simulation vs. presentation, composition & components (why patterns exist); AI code review | Studio: Micro-Game assembly | A7 |
| 10 | The State pattern: FSMs for game flow & characters | Unity demo + studio | A8 |
| 11 | The Observer pattern: events & decoupling | Unity demo + studio | A9 |
| 12 | The Command pattern: input, replay, undo | Unity demo + studio | A10 |
| 13 | Data-driven design & persistence; balancing & tuning | Unity demo + studio | A11 |
| 14 | Procedural generation | Unity demo + studio | A13 |
| 15 | Game AI: steering, pathfinding, behavior trees | Project studio (deconstructions presented live or as video) | A12, A14 |
| 16 | Final project demos (live or recorded) | Demos & wrap | Final |

\* *"Tier pace" is the suggested-pace guide, not a deadline. See below.*

---

## 6. Deadline Philosophy: Pace Without Police

Keeping your practice: no enforced due dates, resubmissions until grades are due. Two light mechanisms to blunt the end-of-semester pile-up without becoming a deadline cop:

- **Published pace guide** (the table above): "if you're on pace for a C, assignment 4 should be done around week 6." Purely informational, printed on the syllabus and D2L.
- **Resubmission as the incentive:** no turnaround promises (a "graded within a week" guarantee is a footgun). Instead: the queue is graded in arrival order, and staying on pace is what buys a failed submission enough runway for the fix-and-resubmit cycle. Late-semester submissions still count, but may simply run out of time to resubmit. The incentive is structural, not punitive. And it's true.

---

## 7. Open Questions for Our Next Pass

1. Micro-Game at Tier 3: right call, or does it make the C too heavy? (Could swap: Micro-Game to Tier 2, drop one architecture assignment.)
2. Engine support policy wording. "I teach Unity; your engine is your responsibility" needs a friendly but firm phrasing.
3. Should Tier 1 require *both* ProcGen and Game AI, or one-of-two plus the project?
4. Any topics from the F24 tutorial list you want promoted into the main arc (shaders, multiplayer, AR)?
5. Team option for the final project, or keep everything individual per F24 policy?

### Resolved
- **Tier 2 is the patterns tier.** State, Observer, and Command as named assignments; MVC as the framing lecture (Week 9). Data-Driven Design and Persistence merged into one assignment (A11) to keep the B tier at five items.
- **Standalone tutorial dropped.** The weekly narrated demo videos already make every student a tutorial producer. The tutorial survives as **final-project lane 4**: advanced topic, two working demos, produced 15–20 min video, same design doc + postmortem as every other lane.
- **Final project has four equal lanes:** game, scientific/engineering visualization, simulation, or technical tutorial.
- **All documents follow marks-voice-guide.md.** Register matched to content type, and no em-dashes, anywhere, ever.
