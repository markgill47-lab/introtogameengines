# Layers and Masks

The last tool is bureaucratic and indispensable: the **collision matrix**.

Every collider belongs to a **layer** (Player, Projectile, Environment, PickupZone), and the matrix declares which layers interact at all.

Uncheck Projectile × Player and your thrown rocks pass through you like you are a ghost, while still cracking satisfyingly into crates. No code. One checkbox.

## Why this is worth a whole section

The alternative is checking "did I hit myself?" in code, on every collision, forever.

That check is small the first time. Then it is small in three places. Then somebody adds a second projectile type and copies the check, imperfectly. This is how projects grow barnacles: not through one bad decision, but through a hundred reasonable ones that each declined to use the configuration the engine already gave you.

Filtering is configuration, not code. Say that sentence in your [[a3-spec|Assignment 3 video]], because it is [[a3-spec|Requirement 5]]'s whole point.

## Design your layers on purpose

Design your layers like you designed your [[w02:scene-graph|scene graph]]: deliberately, this week, while there are four of them.

The demo game's set is a reasonable default:

- `Player`
- `NPC`
- `Projectile`
- `Environment`
- `Zones`

That set survives to Week 15, where a cousin of this machinery becomes the eyes of every guard in the valley: **masks on raycasts**, asking "what would I hit if I looked this way?" Same matrix, pointed at perception instead of collision. A guard that can see through walls is a guard whose raycast mask includes the wrong layer.

That is a Week 15 sentence. File it.

*Next: [[cross-engine-dictionary|the Cross-Engine Dictionary]], or straight to [[gravity-on|the practice exercises]] if your hands are itching.*
