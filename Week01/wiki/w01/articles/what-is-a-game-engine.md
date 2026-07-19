# What Is a Game Engine, Actually?

Strip the marketing and an engine is three promises:

1. **A loop.** The engine runs your world many times a second: read input, update everything, draw the frame. You write the "update everything" part. (Week 3 is entirely about this loop, and it's a better week than that sentence makes it sound.)
2. **A scene.** The engine gives you a structured world to put things in: a tree of objects with positions, parents, and children. (Week 2 — see [[scene-system|The Scene System]].)
3. **A toolbox of subsystems** so that [[physics-engine|physics]], [[audio-system|audio]], [[ui-system|UI]], [[animation-system|animation]], and [[input-system|input]] are things you *configure and script* rather than things you *derive from mathematics*.

Everything else — the editors, the asset stores, the build pipelines — exists in service of those three promises.

## A definitional footnote that matters

An engine doesn't care whether you're making a game. A physics simulation, a data visualization, an architectural walkthrough, a meteorology demo: same loop, same scene, same subsystems. That's why the final project has four lanes and only one of them says "game."

*Next: [[common-anatomy|The Common Anatomy]] — a subsystem-by-subsystem tour of what every engine ships.*
