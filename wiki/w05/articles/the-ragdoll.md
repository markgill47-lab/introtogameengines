# The Ragdoll

Ten capsules, eleven joints, two authorities. This is the whole week in one figure.

{{widget:ragdoll}}

## What to do

1. **Drag the figure around.** Grab the belly and it moves as a whole, exactly where your pointer says, instantly, hanging in midair all day because gravity is never consulted. This is your character while the animation system is in charge of it.
2. **Grab a hand, a foot, or the head and pose it.** The limb bends to follow, the bones keep their length, and whatever shape you leave it in, it holds. You are the animation system now, placing joints by authored intent. Raise both arms, splay the legs, tip the head back: build a pose.
3. **Now press ragdoll.** It falls from *exactly the shape you posed*, and crumples. Notice it falls from *rest*: the mode switch is [[bowling-alley|the thud]], an authority handoff that inherits nothing. The pose was yours; the collapse is the simulation's.
4. **Drag a wrist in ragdoll mode.** The rest of the body hangs limp and follows. That is not an animation; nothing in this page knows what an "arm" is. It is ten bones refusing to change length while gravity pulls on every joint they share.
5. **Press kinematic mid-fall.** The figure freezes mid-crumple, in the air. Authority reclaimed, gravity dismissed. This is also why a badly timed authority switch in a real game leaves a corpse floating above the staircase.
6. **Check the release box, drag fast, and let go.** Now releasing the pointer *is* the handoff, and it inherits your swing. The figure sails instead of thudding. You are [[bowling-alley|being the arm]].

## Why games do exactly this

While a character is alive, its limbs are placed by the animation system: authored motion, played back, fully scripted. Kinematic authority, in this week's vocabulary. The moment it dies, the game flips the switch you just flipped: animator off, simulation on, and the body becomes ten [[body-types|dynamic citizens]] joined at the hinges. The crumple you see in every modern game is not a death animation. It is the absence of one.

And the seam follows the ragdoll everywhere. A game that flips the switch and does nothing else gets a corpse that collapses straight down, regardless of the rocket that just hit it, which reads as wrong to every player instantly even if they cannot say why. So the death code *is the arm*: it hands the killing blow's impulse to the newly dynamic body as part of the switch. Authority transfer plus inherited motion, exactly the two controls on this widget.

One more thing worth filing: "alive" and "dead" here are states, and the handoff happens on the transition between them. Week 10 gives that shape a name and makes you build it on purpose.

## Pull back the curtain

There is no physics engine on this page.

The figure is eleven points. Each point falls with `v += g * dt; p += v * dt`, the same two lines your [[w03:the-loop|Week 3 mover]] was built from. Each bone is one rule: *these two points stay this far apart*, enforced by nudging both toward the right distance a few times per frame. Gravity plus ten distance constraints is the entire simulation, and limp is not programmed anywhere; limp is just what that math does when nothing else is holding the points up.

This is not a toy version of how games do ragdolls. It is approximately *the* technique: Verlet integration with relaxed constraints, published by Thomas Jakobsen from his work on the first Hitman game, in a paper called "Advanced Character Physics." It is one search away and surprisingly readable.

What a real engine's ragdoll adds is everything this one is missing, and now you can name the missing things: joint limits (these elbows cheerfully bend both ways), self-collision (limbs ghost through the torso), mass ratios, and stable rest. That gap, between sixty lines of Verlet and a simulation you can hand a whole game to, is what you are actually buying when you add a Rigidbody.
