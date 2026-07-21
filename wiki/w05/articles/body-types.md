# Body Types: Who Moves Whom

Every physical object declares one of three citizenships, and most physics confusion is a citizenship error.

## Static

Never moves, ever: ground, houses, the castle gate's frame.

The engine exploits this promise hard (precomputed, cached, cheap by the hundreds), which is why you *declare* it rather than just not moving the thing. Moving a static object anyway breaks the promise, and the engine quietly pays a cost re-checking the world. Do not.

## Kinematic

Moved by *you* (code, animation), not by the simulation: moving platforms, doors, elevators.

A kinematic body is the hand of god. It pushes dynamic objects out of its way, and nothing in the simulation can push back. Gravity does not apply. Collisions do not deflect it. It goes where it is told, and the simulation reroutes everyone else around the fact.

This is the citizenship students forget exists, and then reinvent badly. If you find yourself wanting an object that collides properly but obeys your code rather than gravity, you do not need a clever workaround. You need this checkbox.

## Dynamic

The full citizens: gravity pulls them, forces shove them, collisions deflect them. Crates, rocks, ragdolls.

You influence a dynamic body by *asking the simulation* (apply a force, set a velocity), never by grabbing its transform.

## The cardinal rule

That last sentence is the rule of the week, so here it is with the emphasis it deserves:

**Never move a dynamic body by writing to its transform.**

You signed authority over. Grabbing the transform is running down the lane and repositioning the ball mid-roll. It does not move the object through the world; it *rewrites reality between physics steps*, and the simulation responds the way the bowling alley would: badly. Objects jam into walls. Velocity and position disagree. Stacks explode.

And if you find yourself needing to place an object directly, that is not a crime. It is a diagnosis. This object wanted scripted placement or kinematic citizenship, and the fix is changing the authority arrangement, not cheating the one you chose.

[[the-throw|Exercise 2]] has you break this rule on purpose and watch what happens, which is a faster teacher than this paragraph.

## The awkward case: players

Player characters sit in a genuinely awkward spot in this taxonomy. You want them to collide like citizens but obey input like a kinematic.

Every engine ships a purpose-built compromise, the **character controller**, and Week 8's demo game upgrade will use one. This week our player can stay simple and our projectiles do the physics. You will meet the compromise properly when the animation work needs it.

*Next: [[choosing-colliders|Choosing Colliders]], and why a house is a box.*
