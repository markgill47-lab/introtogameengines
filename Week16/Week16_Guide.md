# Week 16: Ship It

> **How to use this module:** This is the final week's complete guide: how to demo, how to write the postmortem, the submission checklist for every final-project lane, and the real logistics of the closing queue. There is no new material to learn this week, which is its own kind of lesson: the last skill of the semester is *finishing*, and finishing is mostly the discipline of not starting anything else.

---

## The Demo

Live in studio (5–8 minutes) or recorded (same length, same weight, per the season-long rule). Either way, the shape that works:

1. **The pitch (30 seconds).** Your core loop sentence, Week 4 standard, and the lane you built in. That's it. Resist the biography of the project; the demo is the biography.
2. **The demo proper (3–4 minutes).** *Play it.* The win path, at least one interesting failure, and the systems doing their jobs where we can see them. Narrate like your assignment videos taught you to: the thinking, not the visible ("here's where the mine generator guaranteed this exit" beats "now I'm walking in a cave").
3. **The architecture (1–2 minutes).** The systems map: where the model lives, where the view lives, which patterns are doing real work and *where* (the Week 9 standard: names and addresses). Two patterns minimum, per the final project spec, and "I used the Standard Prefab everywhere and here's the swap to prove it" is a legitimate exhibit.
4. **The postmortem beat (30–60 seconds).** The one thing that bent, the one thing you'd redesign, and the best and worst of what the LLM contributed. Candor plays better than polish here, every year.

**The demo-day rule, learned by every presenter in history:** live demos summon demons. The project that ran flawlessly for two weeks will, in front of an audience, discover a bug with theatrical timing. So: **record your demo video before demo day, no matter what.** If you're presenting live, the recording is your understudy: demon appears, you narrate over the video, the room learns something about professionalism. If you're remote, the recording *is* the deliverable, and you get to do seven takes. Nobody will know it took seven. That's not cheating; that's production.

---

## The Postmortem (one page, and mean it)

One page. Not a diary, not an apology, an engineering document, in three movements:

1. **The architecture as built.** Not as planned: as *built*. A systems diagram (boxes and arrows, hand-drawn is fine) plus a paragraph naming the load-bearing structures: the state machines, the events, the data definitions, the model/view line. If the diagram embarrasses you anywhere, that's the next section's opening sentence.
2. **Where it bent.** The specific place the architecture groaned when the design changed: the system you'd redesign, the coupling you regretted, the pattern you applied that treated no wound (it happens; naming it is the growth). Specificity is the whole currency here: "the quest system and the save system ended up sharing state through GameState in a way that made both harder to change" is a postmortem; "some code got messy" is a horoscope.
3. **The AI ledger.** What the LLM did well, concretely (name a task it nailed). What it did badly, concretely (name the worst thing it produced *that you caught*, and how you caught it). This paragraph, candidly written across a whole class, is the most useful document this course produces, including for me.

The postmortem is graded on candor and specificity, not on how well the project went. A clear-eyed postmortem of a troubled build outranks a victory lap every single time, and I've read enough of both to promise that's not a platitude.

---

## The Submission Checklist (all four lanes)

Every lane ships the same five artifacts. `FinalProject_Spec.md` has the per-lane requirements; this is the packing list:

- [ ] **Design doc** (1–2 pages, written *before* the build, whatever it now gets wrong: shipping the original with a line of hindsight beats laundering it)
- [ ] **Demo video** (5–8 min, per the shape above), or your live slot plus the understudy recording
- [ ] **The build:** executable, install-free if possible, or hosted link (browser lanes: the URL is the build; test it logged out, on a different machine, today, not the night the queue closes)
- [ ] **Source:** repo link or zip, the audit trail as always
- [ ] **Postmortem** (one page, three movements, per above)

Five boxes. If any box is empty, the project isn't submitted; it's *described*.

---

## The Queue Closes: Real Logistics

The rules haven't changed all semester, and this is their final form:

- Everything (final projects, and any outstanding resubmission from any tier) is accepted until grades are due. After that: nothing, from anyone, for any reason. The date is on D2L in red.
- The queue is graded in arrival order, same as always. Here's the arithmetic nobody enjoys in December: a submission that arrives the last day and fails has **zero** resubmission runway. A submission that arrives two weeks early and fails gets feedback, a fix, and a second lap. The pace guide was never about my convenience; it was about *your* margin, and this is the week the margin either exists or doesn't.
- Tier math, one last time: higher tiers aren't considered until lower tiers are complete. If A3 is still failed in the queue, the final project is scenery. Check your own ledger on D2L *this week*, not finals week.

---

## Where to Go From Here

Sixteen weeks ago most of you had never placed a cube. This week you shipped a game with an architecture you can defend. Some directions worth pointing that momentum, all field-tested by students before you:

- **Game jams.** Ludum Dare, the GMTK Jam, Global Game Jam (January, on campus most years). A jam is the Micro-Game assignment with strangers and adrenaline, and it's the fastest way to find out the course habits are now instincts. Scope police travel with you free of charge.
- **The portfolio.** You have *two shipped, architected projects* (the Micro-Game and the final) with demo videos already produced. Put them on itch.io, put the videos somewhere linkable, and put both on the resume. "Shipped two games solo, here's the postmortem" is a stronger interview artifact than most graduates carry, in any software field, because it proves finishing, and finishing is the rare skill.
- **The deeper water.** The topics this course waved at are all real fields: shaders and rendering, PBR, inverse kinematics, netcode, ECS at scale. `CourseResources.md` has the free library, including the Deeper Water shelf built for exactly this moment, and your engine-translation habit (concept first, dictionary second) is the skill that opens all of it.
- **And the transferable part**, said plainly one last time: state machines, observers, commands, data-driven design, model-view separation, coupling and cohesion, and the discipline of shipping small finished things. None of that is game knowledge. That's software engineering, learned in the one domain where the bugs are visible, the feedback is instant, and the test suite occasionally topples over and makes a satisfying thunk.

It was a privilege watching these projects grow. The queue is the queue, and then it closes. Ship.
