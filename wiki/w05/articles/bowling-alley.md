# Start at the Bowling Alley

Watch what happens to your relationship with a bowling ball over the course of one frame of bowling.

In the approach, you have total authority. The ball is exactly where your hand says it is, at every instant, no negotiation. Then you release. And the moment it leaves your fingers, your authority ends completely. The lane, the oil, the spin you gave it, and the laws of motion own that ball now. Every bowler leans, twists, and pleads with it anyway (body english is a beautiful, universal, completely useless behavior), and the ball does not care. All the influence you were ever going to have got spent before release.

Nobody thinks the released ball is more real than the carried one. They are two arrangements of the same question:

**Who has authority over where this object is?**

## You have been answering this all semester

That question is this entire week, because it is a design choice you make per object, and you have been answering it without the vocabulary since Week 2. [[w02:the-windmill|The windmill blades]], [[w03:the-sun|the sun pivot]], your [[w03:real-mover|Week 3 player]]: every one of them is **scripted transform** placement. Your code computes where the object belongs and puts it there, explicitly, every frame. Full authority, carried in your hand.

Whole games ship this way. And outside games it is often the only correct answer: a scientific visualization of storm-cell data does not hand placement to a game physics engine, because its own math *is* the physics, and the visible artifacts are the physical artifacts. If your final project lands in the visualization or simulation lane, this paragraph is for you.

Scripted placement is not the beginner mode you graduate out of. It is a legitimate authority arrangement you should keep using wherever the math is yours.

## The new option is the release

For any object, you can **turn authority over to the physics engine**. Place it, give it a shove, and let it go. From then on gravity, collisions, and momentum decide where it is. Your transform-writing days for that object are over, and your influence arrives the way the bowler's does: through forces, applied while you legitimately have the ball.

In Unity, the component that signs authority over is the **Rigidbody**. Adding one to an object is the release. Everything else this week is learning what you can and cannot do after you have let go.

## Where the metaphor has a seam

Every metaphor has a seam, and this one is worth finding on purpose, because you will walk into it in the first ten minutes of [[the-throw|Exercise 2]].

When the bowler releases, **the ball is already moving.** It inherited the whole approach: four steps of momentum, the arm swing, the spin rolling off the fingers. Release is not the beginning of the ball's motion. It is the moment authority changes hands over motion that already exists.

Your engine does not do that.

When you add a rigid body, the simulation receives an object with **no velocity and no spin.** Zero, both. It does not look at where the object was last frame and work out that it was traveling. It does not know the object was ever moving, because scripted transform placement never told it anything about speed. Your code was setting positions, and a position is not a velocity.

So the first thing most students see is a bowling ball that drops straight down and thuds on the floor when they expected it to sail down the lane.

Nothing is broken. You handed the simulation an object at rest, and it obliged.

**Whatever state the body has at the moment of transfer is whatever you explicitly gave it, and nothing more.** If you want the ball to leave your hand moving, you have to *be the arm*: set the velocity, or apply an impulse, at the instant you hand it over.

That is precisely what the line after `Instantiate` is doing in [[the-throw|the rock thrower]]. The rock is born motionless in midair, and the impulse is the arm swing. Comment it out and your rock drops at your feet.

The same seam shows up when you flip a kinematic body to dynamic partway through a game. A platform that has been sliding along for ten seconds does not keep sliding when you hand it over; it starts from a standstill and falls. If continuity matters there, set the velocity yourself as part of the switch rather than counting on the engine to carry it across for you.

*Next: [[what-physics-sees|What the Simulation Sees]], because the engine does not take your object as-is.*
