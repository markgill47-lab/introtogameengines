# Assignment 11: Data & Persistence

**Tier:** 2 (B tier)
**Pattern:** Data-driven design (definitions in, state out)
**Paced:** Week 13
**Prerequisites for grading:** All Tier 3 assignments passed; A8 and A9 passed.

---

## Goal

The student will externalize gameplay definitions into authorable data assets that visibly change behavior, demonstrate new content authored with zero code changes, and implement save/load that survives a full application restart, restoring identity-resolved references and world state.

## Description

Code defines what things can do; data defines each thing that exists. This assignment proves both arrows: definitions flowing in (a new card, enemy variant, or item authored in the inspector with the code editor closed) and state flowing out (the model, serialized, surviving a quit to desktop). It is also where the Week 6 discipline gets its final exam: what's in your save file is what you decided your model was, and the file doesn't lie.

Any engine. Cards, enemy variants, items, towers, spells: the noun is yours; the structure is the assignment. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: Definitions as Data.**
At least **two gameplay entities or behaviors defined purely in data assets** sharing one code path (two cards through one slot system, two enemy variants through one brain, two weapons through one combat script). The code walkthrough shows the consulting code containing **no per-variant logic**: the differences live entirely in the data.

**R2: The Printing Press.**
A **third variant authored on camera with zero code changes**: created, configured, put into play, and visibly working, with the narration stating who could have done this (someone with no code access). Measurable gameplay change is required: a timed run, a hit count, a health total, something checkable, not vibes.

**R3: The Round Trip.**
Save/load demonstrated across a **full application restart on camera** (quit to desktop, relaunch, load): player position plus at least **three other facts** restored (resources, equipped/collected definitions, world state like opened containers, progress flags). In-session restore alone does not satisfy this; memory doesn't count as persistence.

**R4: The File, Read Aloud.**
The save file opened in a text editor on camera, its contents narrated: what's in it, and *deliberately* what isn't (nothing from the view, in Week 9's vocabulary, stated as such). A save file that can't be read and explained is a save file that can't be debugged.

**R5: Identity, Not References.**
At least one saved fact is stored as an **ID resolved at load time** (definition names looked up in a registry, container IDs matched to scene objects), shown in the walkthrough, with one sentence on why references can't go in files. One version-drift consideration (a new field's designed default, or a version stamp) is named in narration.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- Data assets as glorified constants: one definition per code path, so the "data" is just fields moved sideways. R1's word is *sharing*: one system, multiple definitions through it.
- The printing-press moment staged with code edits hidden off-camera. R2's zero-code claim is the assignment; the video makes it checkable, and the source is the audit trail.
- Save/load demonstrated without the restart. R3 is explicit: desktop, relaunch, load. The taskbar appears in strong submissions.
- View state in the file: panel visibility, camera velocities, particle states. R4's read-aloud is where this surfaces, and it reads as exactly what it is: the model-view line, unlearned.
- Object references serialized (or engine objects dumped wholesale into JSON), producing files full of instance IDs that mean nothing on relaunch. R5 exists because this lesson costs a career if learned late.
- Runtime mutation of shared definition assets (the buffed-forever card). Definitions are read-only at runtime; live changes belong to instances or owned state. Checked in source.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
