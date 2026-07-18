# Week 9 Concepts: Architecture I. MVC and Why Patterns Exist

> **How to use this module:** This document is the complete concept material for Week 9, the pivot week: Tier 3 closes with the Micro-Game (A7), and the architecture tier opens. You do not need the lectures. Read this, then work through `Week09_Practice.md` (the refactor and the assembly studio), then check `A7_Spec.md` before you record. Several IOUs from earlier weeks get acknowledged in this document. None of them get paid yet. That's Weeks 10 through 12.

---

## Start in a cabin you wired yourself

Picture a cabin whose owner did his own electrical work, one weekend at a time, over years. It started fine: one outlet, one lamp. Then a cord stapled along the baseboard to reach the kitchen. Then a splitter, because the kitchen needed two things. Then a splitter into the splitter, a cord through a hole in the wall to the porch, and an extension reel feeding the refrigerator *through* the porch circuit because that was the closest live wire on the day the fridge arrived.

Every single connection in that cabin works. That's what makes the story instructive: there is no broken wire anywhere. And yet: the porch light dims when the fridge compressor kicks in, one blown bulb once took out the freezer, and when the owner wants to move a lamp, he has to trace cords by flashlight for an hour because he no longer knows what feeds what. An electrician's verdict wouldn't name a single faulty part. The fault is the *arrangement*: everything connected to whatever was closest at the moment of need.

If your project is six weeks old and assembling the Micro-Game feels like flashlight-tracing, congratulations: you're exactly on schedule. Your scripts all work. The arrangement is what's rotting, it rots in every project ever built by adding-the-next-thing-to-whatever's-closest, and this week is about the vocabulary and the tools for wiring on purpose. Nothing you feel right now is a personal failing. It's the wall, everyone hits it, and hitting it *with a small project in week nine* is the cheapest this lesson is ever going to be.

---

## 1. Coupling and cohesion: the two words that diagnose everything

**Coupling** is how much one part knows about, and depends on, other parts. The fridge-through-the-porch is coupling: two things that have no business being connected, connected, because it was convenient once. In your project it looks like: the movement script that also updates the HUD, the crate that reaches across the scene to poke the camera (Week 7's `FindFirstObjectByType`, receipt on file), the health bar that knows the player's field names. The test: *if I change this, what else breaks?* High coupling means the answer is "you'll find out."

**Cohesion** is the mirror twin: how much the stuff *inside* one part belongs together. A script called `PlayerMotor` that moves the player is cohesive. A script called `Player` that moves, fights, banks gold, updates three UI elements, and plays audio is a junk drawer with a class name: everything's in there because there was room, not because it belongs.

The goal, and it's the goal of every architecture decision you'll ever make: **low coupling between parts, high cohesion within them.** Small pieces with one job each, connected narrowly and deliberately. You've been living one version of this since Week 2: the Standard Prefab is low coupling between logic and presentation (swap Visuals, nothing breaks) with high cohesion inside each child. Which brings us to the curtain.

---

## 2. MVC: the curtain-pull

There's a classic architecture called **Model-View-Controller**, and it splits a program into three responsibilities:

- **The Model** is the state of things and the rules for changing it. No pixels, no sounds. Facts.
- **The View** presents the model: draws it, plays it, shows it. It reads facts and produces presentation, and it never changes the facts.
- **The Controller** interprets intent: it takes raw input and turns it into requests the model understands.

Now, the curtain: **you've been building MVC since Week 2, one piece at a time, without being told.** The Standard Prefab's parent (logic and colliders, the object as far as rules are concerned) is model; Visuals, Effects, and Audio are view, riding along, replaceable without touching the rules, which is the entire reason the Week 8 Ceremony broke nothing. Week 6's scoreboard rule (`GameState` owns facts, the HUD reads and never writes) is model-view separation stated as etiquette. Even the Week 5 authority question was a model question: who owns *the fact of* this object's position. The controller is the one seat still half-empty: right now your input code interprets *and* acts in the same breath, and Week 12 has a pattern that fills that seat properly. Consider that the last receipt of the tier.

Why this separation is load-bearing rather than tidy, two proofs from the real world:

- **Headless operation.** A model with no view still runs: you can simulate the game with no rendering at all. That's what a dedicated multiplayer server *is*: your game's model, running in a data center, with zero pixels. If your rules are tangled into your UI, this is impossible, and so is the next bullet.
- **Many views, one truth.** Multiplayer is N machines each drawing a view of one shared model. Replays (Week 12) are a view of recorded inputs re-fed to the model. Saves (Week 13) are the model, serialized: you will write `Save(model)` in five weeks and it will be easy or miserable in exact proportion to how strictly you kept this separation.

Games rarely ship textbook MVC with classes named `Controller`. What ships is the *instinct*: simulation and presentation, kept apart, connected narrowly. That instinct is the deliverable of this entire course, and you're two-thirds of the way to owning it.

---

## 3. Composition over inheritance: why engines look the way they do

Programming 2 taught you inheritance, and your instinct will be to architect games with it. Here's the collapse, sped up:

`Entity` has a position. `MovingEntity extends Entity` adds velocity. `Character extends MovingEntity` adds health. `Player extends Character` adds input. Clean, for a week. Then the design asks for a turret: it has health and shoots but doesn't move, so... `Character` minus moving? New branch. Then a drivable cart: moves, has health, no input, *carries a player*. Then a destructible crate: health, no movement, no brain, and suddenly `Health` logic lives in a base class that crates can't inherit from without also inheriting an inventory. Every new design idea becomes a negotiation with a family tree, and the tree always loses: base classes swell into gods, branches duplicate code, and the hierarchy calcifies into the *reason* features are hard.

The industry's answer, arrived at through exactly this pain: **composition.** Don't build taxonomies of what things *are*; assemble bundles of what things *have*. A `Health` component, a `Mover` component, a `PlayerInput` component, an `Inventory` component. The player is a bundle of all four; the turret is `Health` plus a `Shooter`; the crate is `Health` on a box, and adding "destructible windmill" to the game is a drag-and-drop, not a family negotiation.

And here's the quiet punchline: **your engine has been forcing this on you all semester.** A Unity GameObject *is* an empty bundle; every Rigidbody, Collider, Animator, and script you've attached was composition. The engine's designers hit the inheritance wall decades ago and built the tool so you'd compose from day one. This week you just start doing it *on purpose*, at the script level: the practice guide takes one junk-drawer god script and breaks it into single-job components, and A7 requires your player to be a bundle, not a monolith.

(The industry's extreme version, **ECS** (entity-component-system), pushes this to its logical end for performance at massive scale: components become pure data, systems process them in bulk. It's a Tier 1 tutorial-lane topic and a Week 14-adjacent curiosity; for this course, know it's composition taken seriously, not a different idea.)

---

## 4. What a design pattern is, and the map of the next three weeks

A **design pattern** is a named, reusable *shape* for solving a problem that recurs across wildly different programs. Not a library you install, not code you copy: a shape you recognize and then implement in your own materials. The name is half the value: say "that's an Observer" to any engineer on Earth and you've transmitted a paragraph of design in a word. Patterns are the trade's shared vocabulary for arrangements that survived contact with decades of rotting cabins.

You've already met one without the introduction: Week 8's animator graph (boxes in charge one at a time, arrows with conditions) is a **state machine**, and the fact that your engine ships a visual editor for one tells you how load-bearing the shape is. Here's the tier map, with each pattern pinned to a wound you already have:

- **Week 10, State:** your game flow is boolean soup (`isPaused`, `isGameOver`, `started`, guarding each other in an if-thicket: Week 6's controller, which you were told to sit with and feel). State makes "what is this thing doing right now" an explicit, drawable structure. You've seen the shape in the animator; next week you build it in code.
- **Week 11, Observer:** the polling HUD (Week 6's receipt) and the crate that gropes across the scene for the camera (Week 7's). Observer lets facts announce themselves so nobody polls and nobody gropes.
- **Week 12, Command:** input welded to action (with you since Week 3). Command makes requests into objects, fills MVC's controller seat, and hands you rebinding, replay, and undo as loose change.

One warning before the tier starts, because it's the failure mode of every student who learns patterns and enjoys it: **patterns are for recurring problems you actually have.** A pattern applied to a problem you don't have is coupling with a diploma. The Micro-Game needs maybe two of them. The skill being graded for the next month is not "used the most patterns"; it's "recognized which wound is which."

---

## 5. Reviewing architecture with an LLM

Weeks 1 through 8 used the chatbot as tutor and code generator. This week adds the third use, and it's the one that pays best per minute: **critic.** Paste your worst script, ask for an architecture review, and then perform the step that is the actual skill: *decide whether the critique is right.*

What LLMs are good at here, and it's real: spotting god objects, naming coupling you've stopped seeing (familiarity blinds you to your own wiring; the model has no familiarity), and suggesting decompositions with sensible names. A prompt shape that works: state the context first ("a 6-week student Unity project, one developer, a small complete game due"), paste the script, and ask for *the three worst coupling problems, ranked, with one-sentence justifications*, not a rewrite. Asking for problems instead of solutions keeps you in the judge's seat.

What to distrust, and this is the sharp edge this week's build note asks you to write about: **LLMs season to taste with patterns, and their taste is a fourteen-course meal.** Ask about a 200-line game and you may be advised toward dependency injection, service locators, an event bus, and interfaces for everything, which is impeccable advice for a codebase forty times your size and sandbagging for yours. The model has no sense of *scale*: it read the whole industry's architecture and prescribes from all of it at once. Section 4's warning is your filter: does this pattern treat a wound I actually have? A useful second prompt, always: "argue against your own suggestion for a project this size." Watching the model competently argue both sides teaches you the real lesson: the decision was always yours, and now you have the vocabulary to make it. Your A7 build note documents one accepted critique and one rejected one, with reasons, and the rejection is the more interesting half.

---

## Check yourself

1. Nothing in the cabin is broken. What's wrong with it, in this week's two vocabulary words, and what's the test that reveals it?
2. Pull the curtain yourself: name the model, view, and controller pieces you've already built, and the one seat still half-empty.
3. Walk the inheritance collapse: why does the drivable, destructible cart break the `Entity` family tree, and what does the composition version look like as a parts list?
4. Why does a dedicated multiplayer server prove the model-view split is real, not just tidy?
5. The chatbot recommends a service locator and event-driven everything for your Micro-Game. What's your filter, what's your second prompt, and who makes the call?

---

## Going deeper

- **Nystrom, [Architecture, Performance, and Games](https://gameprogrammingpatterns.com/architecture-performance-and-games.html) and [Component](https://gameprogrammingpatterns.com/component.html):** the free book the patterns tier stands on, opening with the best short essay on why architecture matters in games, and the Component chapter is this module's section 3 with another decade of scars behind it. Assigned reading in spirit for the entire B tier.
