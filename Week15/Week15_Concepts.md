# Week 15 Concepts: Game AI

> **How to use this module:** This document is the complete concept material for Week 15. You do not need the lectures to complete A14. Read this, then work through `Week15_Practice.md` in your engine, then check `A14_Spec.md` before you record. This is also deconstruction week: A12 presentations happen in studio, live or by video (`A12_Spec.md` has the delivery details). And a reunion is scheduled: the Week 10 gate guard reports for his upgrade.

---

## Start with a pizza delivery

Watch what actually happens when a pizza gets to your door, because three completely different kinds of thinking stack up to do it:

- Someone at the shop **decides**: this order next, that address. The decision doesn't know or care about traffic lights; it produces a *destination*.
- The GPS **routes**: given the destination, it finds the turns. It doesn't decide where to go or touch the pedals; it produces a *path*.
- The driver **drives**: hands on the wheel, feet on the pedals, easing around the cyclist the GPS never saw. The driving doesn't pick destinations or plan routes; it produces *motion, this instant*.

Swap any layer and the others don't care: new dispatcher, same GPS; new route, same driving. That stack (**decision, path, motion**) is game AI's whole architecture, and every enemy, villager, and boss you'll ever build is those three layers with the seams in the same places. Most beginner AI pain is smearing the layers together: steering code trying to make decisions, brains trying to steer. Keep the seams and each layer stays a small, tractable problem.

One reframe before the layers, because it corrects the instinct everyone imports from the word "AI": **game AI optimizes for interesting, not optimal.** An enemy that plays perfectly is a bad enemy: an aimbot is optimal and miserable. Your guard exists to create tension, telegraph danger, and *lose credibly*. He is a performer, not a competitor, and Week 4's vocabulary applies: his mechanics exist to produce an aesthetic. Design his flaws with the same care as his skills.

---

## 1. Motion: steering

The bottom layer answers one question, every frame: *given where I want to be, what's my velocity and facing right now?* The classic vocabulary (Craig Reynolds' steering behaviors, 1987 and still load-bearing):

- **Seek:** accelerate toward the target. **Flee:** the negation.
- **Arrive:** seek, but decelerate as you close, so agents settle instead of orbiting their destination in permanent overshoot. You already know this curve intimately: it's Week 7's camera damping applied to legs. Arrival *is* damping.
- **Wander:** small random heading drift for idle life.

And the one everyone feels immediately: **smooth rotation toward a moving target.** An agent that snaps its facing teleports its intent; an agent that turns through `Quaternion.RotateTowards` (bounded degrees per second, dt as always) telegraphs it. That telegraph is not cosmetic: it's the fairness mechanism. The player reads the guard's turn beginning and *reacts*; stealth games are made of that half-second. (Week 2's quaternion policy still stands: you never touch the four numbers; the engine's rotate-toward function does.)

---

## 2. Path: getting there without walking through the furniture

Seek walks into walls, because seek is motion, not planning. The middle layer plans: given a map of what's walkable, find the turns.

**A\* in one honest paragraph, no proofs:** explore outward from the start like flood-fill, but greedily, always extending the frontier node that scores best on *distance walked so far plus straight-line guess of distance remaining*. The guess (the heuristic) is a compass: it pulls exploration toward the goal so you search a corridor of the map instead of all of it, and as long as the compass never overestimates, the path found is optimal. That's the algorithm running inside every RTS click, every MOBA minion, and every navmesh query you'll ever make. You'll implement it someday (algorithms class, or the tutorial lane); this week you *operate* it.

**Grids vs. navmeshes:** a grid discretizes the world into cells (natural for your Week 14 mine, which is *already* a grid: pathfind on the carve array). A **navmesh** instead describes the walkable *surface* as connected polygons: fewer, bigger regions, natural handling of agent radius (the mesh is baked shrunk by the agent's girth, so paths never hug walls into clipping). Engines ship the whole stack: Unity bakes a navmesh from your static geometry, and a **NavMeshAgent** component both queries paths and follows them with built-in arrive-style steering. Which means the engine just handed you layers two *and* three, and your remaining job is the one it can't do: the brain. (Dynamic obstacles, one paragraph as promised: agents avoid each other locally; a door or new wall needs the mesh updated around it, engines provide carve/obstacle components, and that's as deep as this course goes.)

---

## 3. Decision: from FSM to behavior tree

The top layer is the one you already half-own. Week 10's guard *is* a decision layer: Patrol, Suspicious, Chase, Return, an FSM producing destinations for the layers below. For four states it's clean. Now watch it sprawl: add Attack (in range), Flee (low health), Investigate (heard a noise), and Alert-others, and every new state must negotiate transitions with most of the old ones. The arrow count grows roughly quadratically, and the diagram that made four states legible makes eight states a wiring closet. The FSM doesn't break; it *scales badly in arrows*.

The industry's next tool up is the **behavior tree**: instead of states and transitions, a tree of tasks read top-to-bottom like a prioritized to-do list, re-evaluated every tick:

```
Selector (first success wins)
├── Sequence: [low health?] → [flee to safety]
├── Sequence: [enemy in attack range?] → [attack]
├── Sequence: [can see enemy?] → [chase]
├── Sequence: [heard something?] → [investigate last noise]
└── Patrol
```

Two node types do nearly everything: a **Sequence** runs children in order and fails when one fails ("if this, then do that"), a **Selector** tries children in order and takes the first that succeeds (priority). The transition explosion simply vanishes: there are no arrows, because *priority is the structure*. "Fleeing beats attacking beats chasing beats patrolling" is written once, as the order of branches, and adding Investigate is inserting a branch, not renegotiating a diagram. That readability at scale is why Unreal ships behavior trees as a first-class visual editor and why nearly every shipped enemy of the last fifteen years runs one.

The mature take for A14: **FSMs and BTs are both decision layers, and both are legal.** An FSM is excellent at few-states-with-strong-identity; a BT is excellent at many-conditions-with-priority. The demo game upgrades the gate guard from his Week 10 FSM to a BT on camera (same guard, same senses, brain swapped) precisely so the class sees it's a *refactor of the same layer*, not a new religion.

---

## 4. Perception: senses with limits (the stealth section)

A brain is only as fair as its inputs. Week 10's guard cheated with an inspector-wired `player` reference and a distance check: omniscience with a radius. Stealth begins when senses get **limits**:

- **Vision** is a cone plus a line-of-sight check: within range, within angle of facing (a dot product), *and* a raycast from the guard's eyes to the player that arrives without hitting a wall. That third clause is the one beginners skip, and it's the entire difference between hiding and hoping: no ray, and guards see through masonry. (The Week 5 sentence, arrived on schedule: raycasts with layer masks are the collision matrix pointed at *perception*.)
- **Hearing** is an event, not a query, and you already own the machinery: the thrown rock's impact fires a `NoiseEvent(position, loudness)` on the Week 11 bus; guards within loudness-range subscribe and *investigate the position*. Read that again: perception as Observer. The rock doesn't know guards exist; guards react to announcements. Your distraction mechanic (throw a rock past the guard, slip through the gate behind him) is three course weeks composing: physics throws it (5), events announce it (11), the brain investigates it (15).
- **Memory** is the humane touch: a guard who instantly forgets the player at cone's-edge flickers between states; a guard who chases a *last known position* for a few seconds, then gives up and grumbles back, reads as a mind. One Vector3 and a timer, and players will swear he's thinking.

And the fairness ledger, stated as design: senses exist to be *evaded*. The cone has edges you can skirt, the ray means walls work, hearing means noise is a resource the player spends or avoids. A14 requires demonstrating a sense's **failure case** (sneaking past, breaking line of sight) because an enemy whose senses can't fail isn't an enemy; he's a cutscene with a sword.

---

## 5. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Navmesh bake | Navigation window, static geometry | NavigationRegion3D | Nav Mesh Bounds Volume (auto) | three-pathfinding (from a mesh) |
| The agent | NavMeshAgent (`SetDestination`) | NavigationAgent3D | AIController `MoveTo` | follow the returned path yourself |
| Line-of-sight ray | Physics.Raycast + layer mask | RayCast3D node | LineTraceByChannel | THREE.Raycaster |
| Vision cone math | Vector3.Angle / Dot | angle_to / dot | dot in BP or C++ | .angleTo |
| Behavior trees | hand-roll (this course) or assets | hand-roll or LimboAI (excellent) | **first-class visual editor** | hand-roll |
| Hearing / stimuli | your Week 11 event bus | signals (naturally) | AI Perception component (sight & hearing shipped) | your emitter |

Culture notes. Unreal is the AAA answer key this week: behavior trees, blackboards, and an AI Perception component with sight and hearing as configurable stimuli: everything this module builds by hand exists there as product, which is the strongest possible evidence the architecture is the industry's. Godot's LimboAI plugin is a genuinely good BT editor if you want one; hand-rolling the four node classes is also an hour. Three.js students: pathfind on your own Week 14 grid with your own A* if you're feeling complete, or use three-pathfinding on a navmesh you export; either way you'll understand the middle layer better than anyone who clicked "bake."

---

## 6. Gotchas and judgment calls

- **The agent-versus-physics wrestling match.** A NavMeshAgent moves its transform; a dynamic Rigidbody on the same object is a second authority (Week 5's word) fighting the first. Agents are their own authority arrangement: kinematic body or no body, and let the agent drive.
- **Rays from the feet.** A raycast from the guard's pivot (the floor) hits every curb and pebble. Eyes are at eye height; cast from there, to the player's center, and mind both layer masks.
- **The stale bake.** Edit the level, forget to re-bake, and agents path through the new wall or refuse the new door. If an agent acts haunted, check the bake date first.
- **Twitchy senses.** Perception evaluated with no hysteresis (seen! lost! seen! lost!) makes the brain strobe. Memory (section 4) is the fix, and it's also the humanity.
- **The unbeatable brain.** All senses maxed, zero reaction delay, permanent memory: congratulations, you built the aimbot. A reaction beat (a half-second Suspicious pause before Chase: which your Week 10 guard already has) is the difference between tension and resignation. Design the flaws.

---

## Check yourself

1. Name the three layers of the pizza, then of your guard, and state what each layer produces for the one below.
2. Arrive versus seek: what's the difference at the destination, and which Week 7 idea is arrive wearing legs?
3. Why does the FSM sprawl at eight states, and what does the behavior tree replace the arrows with?
4. Write the three clauses of a fair vision check, and name what players get to do about each one.
5. The rock lands behind the guard and he turns to look: trace the machinery by course week (who threw, who announced, who subscribed, who decided, who steered).

---

## Going deeper

- **Red Blob Games, [Introduction to A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html):** the interactive version of section 2's paragraph. The single best pathfinding explainer anywhere, free, and you can poke it.
- **The [AI and Games textbook](https://gameaibook.org/)** (Yannakakis and Togelius): the complete PDF, free from the authors. The behavior-authoring chapter extends this module; the rest of the book is where game AI becomes a research field.
- **Fiedler's [networking articles](https://gafferongames.com/)** aren't AI, but they're the other place your command streams and deterministic simulations lead, and this is the week students usually start asking.
