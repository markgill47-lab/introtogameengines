# The Final Project

**Tier:** 1 (A tier), the summit
**Paced:** proposal by ~Week 10, build through Week 16, demo Week 16
**Prerequisites for grading:** all Tier 3 and Tier 2 assignments passed; A13 and A14 in the queue or passed.

---

## Goal

The student will design, document, build, and present one complete project in the engine of their choice, in one of four lanes, demonstrating the course's full arc: a stated design, an architecture with patterns doing real work, and the discipline of shipping something small, finished, and polished.

## Description

Four lanes, one bar. The lane changes what you build; nothing changes how well. Every lane ships the same five artifacts (design doc, demo video, build, source, postmortem: the packing list in `Week16_Guide.md`), and every lane answers to the same architecture standard. The scope police patrol all four lanes equally, and their standing order hasn't changed since Week 4: small, finished, and polished beats big and broken. Every time.

---

## The Common Bar (all lanes)

**C1: The Design Doc, First.**
One to two pages, written before the build: the core loop (or system model, or topic plan) in one sentence, the systems list, and the scope ledger including what you are *not* building. Submitted with the final package as originally written, hindsight annotations welcome. A design doc reverse-engineered from the finished build reads exactly like what it is, and the Week 4 standard applies to the loop sentence.

**C2: The Architecture Standard.**
At least **two course patterns doing real work, named with addresses** in the demo's architecture segment: the state machines and where, the events and who listens, the data definitions and what varies through them, the command streams if any. The model/view line stated in Week 9's vocabulary. The counter-clause is also graded: a pattern applied to no wound counts *against*, per the pattern-fever rule; part of the standard is knowing what your project didn't need.

**C3: The Five Artifacts.**
Design doc, demo video (5–8 minutes, shaped per the Week 16 guide), runnable build or hosted link (tested on a machine that isn't yours), source, and the one-page postmortem (three movements: as-built, where it bent, the AI ledger).

**C4: It Ships.**
The project runs, completes, and does not require its author present to survive. A stranger can start it, use it, and reach its intended end. Known bugs are listed in the postmortem rather than discovered by me; a listed bug is engineering, an unlisted one is a surprise, and only one of those grades well.

---

## The Lanes

**Lane 1: The Game.**
A complete playable game: core loop, win and loss states, restart, the Tier 3 fundamentals evident (juice with etiquette, animation doing work, physics or deliberate scripted placement per the authority question). Content scope is the Micro-Game's bigger sibling, not its opposite: one to three verbs, a real difficulty arc, an actual ending. Procgen and AI from Tier 1 are welcome guests, not requirements; a tight authored game beats a sprawling generated one that needed the guardrails it didn't have.

**Lane 2: The Scientific / Engineering Visualization.**
Real data or a real model (meteorology, physics, orbital mechanics, whatever your other life provides), rendered interactively: camera navigation, interaction that interrogates the data (probe, filter, scrub time, toggle layers), and state/progress display. The authority question answered deliberately and stated in the demo: your math may own every transform in the scene, and saying so with a straight face is exactly the Week 5 lesson. The bar for "real": the data or model must be defensible to someone who knows the field; the rendering must add understanding a spreadsheet couldn't.

**Lane 3: The Simulation.**
An interactive system model: traffic, ecosystems, crowds, economies, epidemics. **Tunable parameters changeable at runtime** (Week 13: they're data), with the demo showing **two meaningfully different outcomes from two parameter sets**, narrated: what changed, why the system responded that way. Emergence is the lane's product: the demo should contain at least one behavior you didn't explicitly program and can explain anyway.

**Lane 4: The In-Depth Technical Tutorial.**
An advanced topic (shaders, PBR, inverse kinematics, netcode, ECS, compute, AR, advanced physics: the old tutorial list is the menu, and `CourseResources.md`'s Deeper Water shelf is the free reading for most of it), taught properly: **two working demo projects** in your engine (distinct demonstrations, not one project twice), and a produced **15–20 minute tutorial video** covering background (what problem, why it exists), technical base (how it works), implementation (how to build it, including the parts that fought you), and both demos running. The bar: a classmate who watched your video could start using the topic. Production quality counts here the way polish counts in Lane 1: this lane's craft *is* communication.

---

## Common failure modes (read this before the proposal, again before the build, again in November)

- The mansion. Every year, all lanes, without exception. The design doc's scope ledger is your contract with December-you; write it like you'll be tired then, because you will be.
- The design doc written last. C1 says first; the freshness of hindsight is always detectable, and the original doc with hindsight annotations is *worth more*, not less.
- Patterns as decoration: an event bus with one subscriber, a state machine with two states and no ceremony, installed to satisfy C2. The counter-clause exists precisely for this; the strongest architecture segments include one sentence about a pattern *considered and rejected*.
- Lane 2 with fake data, Lane 3 with no tunables, Lane 4 with one demo stretched thin. Each lane's specific bar is the lane's whole identity; reread yours before committing.
- The build that only runs on the machine that made it. Test the executable cold, on another computer, with no editor installed. Browser lanes: incognito window, different device, today.
- Sitting on a nearly-done project polishing while the queue closes. Shipped and imperfect beats polished and undelivered, and the queue does not care how close you were. Submit, then polish, then resubmit if there's runway. That's what the system was *for* all semester.

## Pass / Fail

Pass requires the common bar (C1 through C4) plus your lane's requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit while runway exists.

The queue is the queue. It closes once a year, and this is the assignment it closes on. Ship.
