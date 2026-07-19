# The Asset Pipeline

> **Covered:** Week 8 · **Organ of:** [[common-anatomy|the Common Anatomy]]

Imports models, textures, sounds, and fonts into engine-usable form.

> **Meanwhile, in 2002:** *This was me, writing loaders by hand. You're welcome.*

You'll fight it exactly once, in Week 8, when a Mixamo character comes in T-posing sideways at forty times the correct scale. Everyone does. It's a rite of passage.

The shape of the pipeline is the same everywhere:

```
sword.png → import → sword.mesh → build → world.pak
raw asset    decode     engine format    bake · pack
```

Raw art from the outside world gets decoded into the engine's own formats, then baked and packed into what actually ships. When your model comes in sideways, this pipeline — not your scene — is where you fix it.
