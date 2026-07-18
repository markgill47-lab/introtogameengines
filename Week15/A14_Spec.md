# Assignment 14: Game AI

**Tier:** 1 (A tier)
**Paced:** Week 15
**Prerequisites for grading:** All Tier 3 and Tier 2 assignments passed.

---

## Goal

The student will build an agent with the three-layer architecture (decision, path, motion): a brain with at least three behaviors and memory, pathfinding through real obstacles, smooth steering, and perception with demonstrated limits the player can exploit.

## Description

Game AI optimizes for interesting, not optimal. This assignment proves you can build a performer: an agent whose decisions are legible, whose senses are fair, whose movement routes around the world instead of through it, and whose designed flaws give the player something to do. The layers stay separated, because that separation is the architecture, and smearing them is the failure this week exists to prevent.

Any engine. The natural build upgrades your existing guard or enemy; a fresh agent in a fresh scene is equally legal. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: A Brain with at Least Three Behaviors.**
A decision layer (FSM or behavior tree, both full-credit) with at least **three distinct behaviors** beyond idle (e.g., patrol, chase, attack, investigate, flee), diagrammed **before coding** and shown per house rules, with visible state/behavior indication on the agent. The video demonstrates a full behavioral loop with narration reading the agent's mind.

**R2: Pathfinding Through Real Obstacles.**
The agent reaches destinations by routing **around** obstacles (navmesh or grid search), demonstrated with at least one path that visibly bends around geometry. Straight-line seek into a wall, or a world with nothing to route around, does not satisfy this. The narration names what produces the path and what merely follows it (the layer seam, stated).

**R3: Smooth Steering.**
No teleport-turns: rotation eased toward headings (bounded turn rate), and arrival that decelerates rather than orbits or snaps. One sentence connecting arrive to damping earns its keep in the narration.

**R4: Perception with Limits, Exploited on Camera.**
At least one sense with a demonstrated **failure case the player can exploit**: vision as range + cone + **line-of-sight ray** (hiding behind cover breaks detection, shown), or hearing as event-driven noise (a distraction drawing the agent, shown), or both. An inspector-wired omniscient reference is the Week 10 cheat, and this is the week it's no longer legal.

**R5: Memory and the Designed Flaw.**
The agent carries simple memory (last known position, a give-up timer) so losing the player is a process, not a boolean flicker. The narration names at least one **deliberate limitation** (reaction delay, memory duration, cone edges) and what the player gets to do because it exists. "My enemy is beatable on purpose, here's how" is a required sentence, in your own words.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- The wrestling match: a pathfinding agent and a dynamic rigid body sharing one transform, twitching against each other. Week 5's authority question has one answer per object; agents are their own arrangement.
- Vision without the ray: guards who see through masonry, demonstrated proudly. R4's third clause is the entire stealth genre; the crate test in the practice guide is thirty seconds.
- Rays cast from the floor pivot, blinded by every pebble and doorsill. Eyes are at eye height; the practice guide's `eyes` transform exists for this.
- The strobing brain: perception with no memory or hysteresis, flickering between behaviors at a boundary. R5's memory requirement is the cure and the humanity.
- Decision logic smeared outside the machine: chase conditions in Update, attack checks in the steering code. Week 10's regression, checked in source; the brain decides, the layers below execute.
- The aimbot: instant reaction, permanent memory, maxed senses, no flaw named. R5 fails it even if everything technically works, because "technically works" was never the assignment. Interesting, not optimal.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
