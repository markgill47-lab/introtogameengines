# The Scene System

> **Covered:** Week 2 · **Organ of:** [[common-anatomy|the Common Anatomy]]

The tree of everything: objects, their transforms, their parent/child relationships.

```
▸ World
  ├─ ▸ Environment
  │    ├─ Castle · Tower · Gate
  │    └─ Terrain · Trees · River
  └─ ▸ Actors
       ├─ Player · Sword · Shield
       └─ Goblin · AI · HealthBar
```

Move a parent and its children follow — rotate the Player and the Sword rotates too. That cascade is the second of the [[what-is-a-game-engine|three promises]], and Week 2 is entirely about it: the Week 2 session opens by building the demo game's first **Standard Prefab**.

*See also: [[demo-game-w01|The Demo Game: W01_Anatomy]].*
