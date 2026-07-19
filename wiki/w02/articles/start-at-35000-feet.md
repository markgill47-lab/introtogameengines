# Start at 35,000 Feet

You're on a passenger flight, cruising at 550 miles an hour. A passenger unbuckles and walks back to the lavatory. Question: how fast is that passenger moving?

You want to say "about two miles an hour, annoyed." And relative to the plane, you're right: forty feet of aisle, a small wait, done. But that passenger is also crossing a state line mid-stride, because they're walking *inside a thing that's moving*. Both answers are correct. They're just answers to different questions: "where is the passenger relative to the plane?" and "where is the passenger relative to the world?"

Now watch the snack cart come down the aisle, because the cart adds the layer that makes this a data structure. The cart moves relative to the plane. The salty snacks on the cart do not move relative to the cart at all; they just sit there, being pretzels. And yet those pretzels are doing 550 miles an hour and climbing through the same time zone you are. Snack rides cart, cart rides plane, plane rides the sky. Nobody on board computes any of this. **Attachment does the math.**

That's this entire week. Every object in your game is riding something, everything ultimately rides the world itself, and the engine keeps track of "relative to my parent" versus "relative to the world" so nobody on board has to. The structure that does the bookkeeping is called the [[scene-graph|scene graph]], and it's the first of the three promises from Week 1 to get its own week.

*Next: [[scene-graph|The Scene Graph: everything is a tree]].*
