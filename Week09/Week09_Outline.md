# Week 9: Architecture I: MVC and Why Patterns Exist, plus the Micro-Game

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The pivot week. Tier 3 closes with the Micro-Game, and the architecture tier opens with the question every growing project eventually forces: how do I keep this from becoming spaghetti? If your Micro-Game code already feels tangled, good. That's the lesson arriving on schedule.

## Learning objectives
- Describe Model-View-Controller and map it onto a game (state = model, scene = view, input handling = controller).
- Explain composition over inheritance and why engines are component-based.
- Recognize coupling, and explain why "everything references everything" fails at scale.
- Use an AI to review architecture, then judge whether its critique is right.

## Concept material (to be written)
1. **The Wall:** why your Micro-Game code already feels tangled, and why that's normal.
2. **Coupling and Cohesion,** in game terms.
3. **MVC:** simulation vs. presentation. Headless testing and multiplayer both depend on this split, which is why it matters beyond tidiness. And the curtain-pull: the Standard Prefab was MVC all along. Colliders and logic are the model, Visuals is the view, and you've been building it since Week 2.
4. **Composition over Inheritance:** why `Player extends Vehicle extends Entity` collapses, and components don't.
5. What a design pattern is (and isn't), plus a preview map of Weeks 10 through 12: State, Observer, Command.
6. **AI Code Review:** prompting an LLM to critique your Micro-Game architecture, then deciding whether it's right. That second step is the skill.

## Practice guide (to be written)
- Micro-Game assembly studio: a checklist-driven walkthrough of gluing A1 through A6 into one playable loop.
- A worked before/after refactor of one tangled script into components.

## Assignment paced this week: A7, Micro-Game (Tier 3 capstone)
Assemble assignments 1 through 6 into one small, complete, playable loop: win/lose states and restart. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
