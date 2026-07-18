# Assignment 9: Events & Decoupling

**Tier:** 2 (B tier)
**Pattern:** Observer
**Paced:** Week 11
**Prerequisites for grading:** All Tier 3 assignments passed; A8 passed.

---

## Goal

The student will implement the Observer pattern: subjects that announce changes through events while knowing nothing about their listeners, multiple independent observers reacting to one gameplay event, a new observer added without modifying the subject, and the subscription lifecycle managed without leaks.

## Description

The thing that knows should tell the things that care, once, at the moment there's something to know, without learning who they are. This assignment proves you can reverse the direction of coupling: displays stop gripping state, gameplay objects stop rummaging through the scene for each other, and features become additions instead of surgeries. It also proves you know the pattern's costs, because the unsubscribe discipline is graded alongside the subscriptions.

Any engine (Godot students: signals are this pattern; use them idiomatically). The natural build extends your Micro-Game. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: A Clean Subject.**
At least one gameplay component (health, score, a zone, an inventory) exposes events for its meaningful changes and **contains no knowledge of its observers**: no UI types, no audio references, no scene searches. The code walkthrough scrolls the subject and the narration inventories what isn't there.

**R2: Three Independent Observers.**
At least **three separate systems** react to one gameplay event (e.g., damage → bar, sound, death sequence) with no references to each other, demonstrated by **disabling one observer on camera** while the others keep working.

**R3: The Bolt-On.**
One observer added as a **new file with zero edits to the subject or the existing observers**, demonstrated with the subject's source visibly unmodified (git diff, file timestamps, or simply scrolling it while the new feature fires). This is the pattern's core claim; the video makes it checkable.

**R4: The Receipt.**
At least one formerly-polling display converted to event-driven updates, with the before/after stated: what asked every frame, what now waits to be told. (If your Week 6 HUD is the convert, say so; the course has been waiting for this since the receipt was issued.) The narration also states the counter-rule: one continuous readout in your project that correctly *remains* polled (a blend-tree speed, a needle), and why.

**R5: The Discipline.**
Subscription lifecycle is paired (subscribe/unsubscribe on opposite lifecycle edges) throughout, shown in the walkthrough, and the narration names the failure it prevents. Demonstrating the crash-and-cure from the practice guide is recommended and persuasive; shipping the crash in your own submission is memorable in the other direction.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- A "subject" that calls its observers by name: `hud.UpdateBar()` inside TakeDamage is not an event, it's a method call wearing a costume. R1's inventory-of-what-isn't-there is where this surfaces.
- Observers that secretly need each other's ordering (the sound checks a value the HUD handler updates). Subscription order is not yours; if B needs A first, that's a sequence, and it wants explicit code, not two subscriptions and hope.
- Events for continuous readouts: a Speed event firing every frame is polling with worse debugging, and R4's counter-rule exists to check you know the difference.
- Missing unsubscribes surfacing as MissingReferenceExceptions or zombie handlers. R5 is graded in source; "it didn't crash during the video" is not the same as paired lifecycles.
- Everything on a global bus, including components on the same object. Local relationships take direct subscriptions; the bus is for game-wide announcements. The roommate test from the materials applies.
- The bolt-on demonstrated by *describing* it rather than proving the subject unmodified. R3 says checkable, and the proof costs fifteen seconds of video.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
