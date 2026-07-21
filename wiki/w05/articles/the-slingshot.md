# The Slingshot

Aim a launch vector, release, and watch a projectile arc into a row of blocks. Two concepts the [[the-ragdoll|ragdoll]] left on the table live here: the **impulse** and the **collision response**.

{{widget:slingshot}}

## What to do

1. **Set the angle and power, then press Release.** The arrow is your launch vector, and the power slider is capped, so there is a ceiling on how hard you can shove. Nothing moves until you commit.
2. **Watch the ball leave with exactly that velocity and no more.** That is an [[forces-and-impulses|impulse]]: one shove, applied once, at the instant of release. There is no second push mid-flight, and there is no delta time anywhere near it, because [[bowling-alley|instantaneous things do not get dt]]. From the moment it leaves the band, gravity owns the arc.
3. **Knock the blocks over.** A flat, hard line drives straight through them. The counter tracks how many have gone down. Clearing every last one in a single shot takes a good line.
4. **Reset and try again.** The blocks stand back up and you can re-aim.

## Where the concepts are

**The release is the handoff, again.** You have total authority while you aim: the ball sits at the band exactly where the vector says, gravity ignored, waiting. Release hands it to the simulation with one inherited velocity. This is [[bowling-alley|the bowling alley]] with a power slider: the launch vector is you being the arm, and everything after release is the ball no longer listening to you.

**The topple is not an animation.** No frame of the blocks falling was authored. The blocks are [[body-types|dynamic bodies]], the ball is a dynamic body, and when they meet, the simulation resolves the collision and each block does whatever the math says: tips, spins, slides. This is exactly what [[a3-spec|Requirement 3]] asks you to put on camera, and it is why the assignment warns that faked physics moves too smoothly. Real collision response has a specific, slightly chaotic texture that a keyframed animation cannot forge. Watch a block go over a few times and you will start to recognize the difference on sight.

## Pull back the curtain

There is no physics engine here either, and it is the same trick as the ragdoll one level up.

Each block is **four corner particles and six sticks**: four for the edges, two crossing the diagonals. The diagonals are what make it a rigid box instead of a floppy diamond, and that is the whole definition of "rigid body" on this page. Every particle falls with the same two lines from [[w03:the-loop|Week 3]], the sticks pull the corners back to their rest lengths, and collision is nothing more than noticing that a point has ended up inside a box and pushing it back out along the nearest wall. Push the point out, push the wall the other way, and Verlet turns those position nudges into velocities on the next step. Momentum, transferred, with no momentum math written anywhere.

**Notice that the blocks stand in a row on the ground, not stacked in a tower.** That is not an accident, and it is the most honest thing on this page. Resting one box stably on top of another is one of the genuinely hard problems in physics programming: the contact has to hold a load without jittering, sinking, or squirting out sideways, and the simple push-them-apart collision above cannot do it. A block sitting on the *ground* is easy, because the ground never moves. A block sitting on another *block* needs a real contact solver. So these blocks each rest on the floor, and only bump each other as they fall.

That gap is exactly what a real engine buys you, and now you can name the rest of it too: friction models so stacks do not slide, restitution so collisions can be bouncy or dead on purpose, rotational inertia so a long plank resists spin differently than a cube, and the stable stacking solver that would let you build the tower this widget cannot. The distance between these sixty lines and Box2D is that list. It is, one more time, what you are actually buying when you add a Rigidbody.
