# Assignment 12: Game Deconstruction

**Tier:** 2 (B tier)
**Paced:** assigned Week 4, due/presented Week 15
**Prerequisites for grading:** All Tier 3 assignments passed.

---

## Goal

The student will deconstruct a shipped game using the course's design vocabulary (core loops, MDA, verbs, resources, feedback loops) and the course's architecture vocabulary (patterns, state, data-driven structure), producing an analysis that traces felt experience back to rules and locates the software structures hiding under the design.

## Description

Week 4 taught the vocabulary and handed you the template; the semester since taught you what games are made of on the inside. A12 is where both halves meet: pick a shipped game, play it like a designer, and take it apart on paper: not a review, not a score, an autopsy. The architecture paragraph is written with your patterns-tier knowledge and is expected to name structures by name and by location: *where* is the state machine, *what* is almost certainly data-driven, *which* systems must be observers of which events.

Any shipped game, any genre, any platform. Small and dense beats huge and skimmed: a two-hour indie fully deconstructed outranks a hundred-hour epic described from the lobby. If you choose something enormous, deconstruct a *slice* (one system, one loop) and say so.

---

## Requirements (all must pass)

**R1: The Game, Actually Played.**
Game, genre, platform, and hours played stated up front. Minimum two hours of play, past first impressions. Skimming a Let's Play is detectable and disqualifying; the MDA trace (R5) requires feelings you personally had.

**R2: The Loops.**
The core loop in one sentence with its real duration in seconds, plus nested loops labeled by scale (session, meta) where they exist. The Week 4 standard: if the sentence describes a session instead of a cycle, it isn't the loop.

**R3: Verbs and Resources.**
The verb list, counted, with a sentence on few-deep versus many-loose; the resource list including at least **one non-obvious resource** (time, space, information) with its spend/earn cycle described.

**R4: A Feedback Loop, Labeled.**
At least one feedback loop identified, labeled positive or negative, with the aesthetic it produces named. Bonus respect, no bonus points, for finding one the designers clearly built on purpose to solve a problem you can articulate.

**R5: One MDA Trace.**
One trace from a feeling you actually had (timestamped in your play, ideally) back through the dynamic that produced it to the mechanic underneath. The full move: aesthetic → dynamic → mechanic, in that order, with the mechanic specific enough to be a number or a rule someone typed.

**R6: The Architecture Paragraph, With Names and Addresses.**
A best-guess architecture analysis using the course's vocabulary, naming at least **two structures with their locations**: the state machines (game flow? enemy brains? animation?), the almost-certainly-data-driven content (cards? items? waves? and what the definition schema probably holds), the observer relationships (what must announce, what must listen), command streams if the genre implies them (replays, input buffers, turn queues). "It probably has code" is the named failure; "the ability system is data-driven, and here's the evidence: they ship balance patches that change numbers without a client download" is the standard.

**R7: The Theft.**
One design lesson you are stealing for your final project, stated as a decision, not an admiration ("I'm copying Celeste's instant respawn because my loop is also die-and-retry," not "the game feel is great").

**R8: Delivery.**
Paper (2–4 pages) or video (5–8 minutes), presented live in the Week 15 studio or submitted as a recording by the same week. Same weight either way, as always. The Week 4 template is the expected skeleton; deviations that improve the analysis are welcome and should announce themselves.

---

## Common failure modes (read this before you record or write)

- The review: opinions about fun with a score at the end. A12 asks how the machine works, not whether you liked the ride.
- The core loop that's actually a synopsis ("you explore the world and fight bosses" is a back-of-box, not a loop). Duration in seconds is the tripwire; use it.
- Pattern name-dropping without addresses: "it probably uses Observer" floats free; R6 wants the *where* and the *evidence*.
- The non-obvious resource that's just gold with a different name. Time, space, information: the interesting economies are the ones without a counter on screen.
- An MDA trace that starts from the mechanic and works forward (that's design, not diagnosis; the assignment runs the arrow backward from a feeling).
- Deconstructing your favorite 300-hour game from memory and fondness. R1's hours are recent and analytical, and the freshness shows either way.

## Pass / Fail

Pass requires all eight requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
