# Week 11: The Observer Pattern

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The decoupling pattern. The UI should not poll the player's health every frame. The player should announce when it changes, and everyone who cares should listen. Remember Week 6, when we polled and I said it would bother us later? It's later.

## Learning objectives
- Explain the Observer pattern: subjects, observers, subscribe/notify.
- Implement events so systems react without referencing each other directly.
- Contrast polling vs. events.
- Weigh the tradeoffs: hidden control flow, unsubscribe bugs, debugging events.

## Concept material (to be written)
1. **The Problem:** UI polls player, achievements poll score, audio polls everything. N systems times M queries, every frame, forever.
2. **Observer:** don't call us, we'll call you. Subjects, subscribers, notifications.
3. **Implementations:** language events/delegates, signal systems, and a simple event bus.
4. Worked example: health changes, and a UI bar, a damage sound, and a death sequence all react, none of which the player script knows exist.
5. **The Costs:** leaks from forgotten unsubscribes, ordering surprises, and "who fired this?" debugging.
6. **Cross-Engine Dictionary:** C# events/UnityEvents (Unity), signals, which are the idiomatic heart of Godot, delegates/dispatchers (Unreal), EventTarget/emitter (Three.js/JS).

## Practice guide (to be written)
- Unity walkthrough: refactor Week 6's polling HUD into event-driven updates, then add an observer no other system knows about.
- Equivalent sketches for the other engines (Godot's signals shine here).

## Assignment paced this week: A9, Events & Decoupling
An event system where at least three independent systems react to one gameplay event without direct references. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
