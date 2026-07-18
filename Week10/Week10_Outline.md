# Week 10: The State Pattern

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The first named pattern. Why is my player jumping while dead? Because its behavior is a pile of boolean flags instead of explicit states. This week we fix that, permanently.

## Learning objectives
- Model behavior as a finite state machine: states, transitions, guards.
- Implement the State pattern in code (not just a diagram): enter/update/exit.
- Apply FSMs at two scales: game flow (menu/playing/paused/game-over) and character behavior (idle/running/jumping).
- Recognize when a boolean flag pile is secretly a state machine begging to exist.

## Concept material (to be written)
1. **The Flag-Pile Failure:** `isJumping && !isDead && canMove`, and how it rots.
2. **FSMs:** states, transitions, events. Draw one before you code one.
3. **The State Pattern proper:** state objects with enter/update/exit, plus the switch-statement version and when it's fine.
4. Two worked examples: a game flow FSM and a character FSM.
5. Callback to Week 8: your Animator/AnimationTree was an FSM all along.
6. Engine-neutral by nature. This is a code pattern; the per-engine dictionary is just "where scripts live."

## Practice guide (to be written)
- Unity walkthrough: refactor a flag-based character controller into a clean FSM, at both scales.
- Notes on doing the same in GDScript / C++ / JavaScript.

## Assignment paced this week: A8, State Machines
Implement explicit FSMs for game flow AND for a character/entity, with a diagram of each. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
