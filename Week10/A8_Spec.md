# Assignment 8: State Machines

**Tier:** 2 (B tier)
**Pattern:** State
**Paced:** Week 10
**Prerequisites for grading:** All Tier 3 assignments (A1 through A7) passed.

---

## Goal

The student will model behavior as explicit finite state machines at two scales (game flow and an entity's behavior), implement the State pattern with enter/update/exit lifecycle at least once, and demonstrate that formerly-representable impossible states are now structurally unrepresentable.

## Description

A pile of booleans can represent every nonsense combination it makes possible, and eventually will. This assignment replaces guarding with structure: one explicit state, legal transitions, and ceremony that runs on every change. Diagrams are drawn before code and graded with it, because an arrow you can't justify on paper is a bug you're scheduling for later.

Any engine. The natural build is refactoring your Micro-Game's flow plus giving one entity a brain, but a fresh scene demonstrating both scales is equally valid. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: The Flow Machine.**
Game flow (at minimum: menu/playing/paused/game-over or equivalent) implemented as an explicit FSM with a single state variable. The prior boolean flags are **deleted, not shadowed**: the video shows the source contains one source of truth for flow, and the narration names one formerly-possible impossible state that is now unrepresentable.

**R2: The Behavior Machine.**
An entity (guard, creature, hazard, boss) with at least **three behavioral states** and legible transitions, demonstrated on camera through a full behavioral loop, with the narration describing which state the entity occupies as it changes. A visible state indicator (tint, icon, animation change) is required; behavior the player can't read might as well be random.

**R3: The Pattern Proper, Once.**
At least one of the two machines is implemented with **state objects carrying Enter/Update/Exit**, dispatched through a change-state method that guarantees exit-then-enter ordering. The code walkthrough shows one state class and names what lives in each lifecycle slot, and why the ceremony can't be skipped or misordered.

**R4: The Diagrams.**
Both machines drawn **before coding** (hand-drawn is fine and preferred over prettiness), shown in the video, and matching the code: every state in the drawing exists in code, every transition in code has an arrow in the drawing. At least one *deliberately absent* arrow is pointed at and justified.

**R5: The Handshake.**
If the entity is animated: the behavior FSM communicates with the animation state machine through parameters only (facts, not clip commands), stated in narration. If unanimated, the narration instead states the division in principle: your FSM decides behavior; the animator's decides pose. One sentence either way.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- Booleans surviving alongside the state variable, "for convenience." Two sources of truth disagree on schedule. R1 says deleted.
- The fully-connected graph: every state transitions to every state, which is the flag pile wearing circles. Sparse arrows are the design; justify the absences.
- States reaching into each other's internals instead of requesting transitions from the machine. States talk to the machine and their owner, never to each other's fields.
- Setup in Update instead of Enter (runs every frame), or Exit ceremonies missing entirely (the Week 6 frozen-restart bug's true name). R3's walkthrough is where this is checked.
- A diagram drawn after the code, faithfully documenting the spaghetti. The point of paper-first is catching arrows you can't justify *before* they're load-bearing; the video narration usually reveals which order actually happened.
- An entity whose states are visually identical, leaving the video narrating changes no viewer can see. R2's indicator requirement exists for the player, the grader, and your own debugging.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
