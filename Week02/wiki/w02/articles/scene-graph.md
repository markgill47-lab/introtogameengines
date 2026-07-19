# The Scene Graph: Everything Is a Tree

Open any engine and make a few objects, and you'll notice you're not making a *list*. You're making a *tree*: objects can contain objects, which contain objects. The village contains houses, a house contains walls and a roof, the roof contains a chimney. This tree is the **scene graph**, and it's the engine's answer to a real problem: position is relational.

Think about how you actually describe where things are. The watch is on your wrist. The wrist is on your arm. Your arm is on you, and you are in a room. Nobody, ever, has described a wristwatch by its coordinates relative to the center of the Earth, even though it has some. You describe things relative to what they're attached to, and when you walk across the room, you do not recompute the watch. It's attached. It comes along.

The scene graph makes that intuition executable:

- Every object has a **parent** (except the root things sitting directly in the world).
- Every object stores its position, rotation, and scale **relative to its parent** — its [[transforms|transform]].
- Moving a parent moves its entire subtree, automatically, recursively, for free.

And the "for free" is the point. When the plane banks, the engine walks down the tree (plane, then cabin, then cart, then the pretzels on the cart) and composes each object's "relative to my parent" numbers into a final "relative to the world" answer. You will never write that code. You'll just arrange the tree so that it produces the right answer, which turns out to be a design skill, and it's the skill [[a1-spec|A1]] grades.

## One direction matters

Influence flows *down* the tree, never up. Bank the plane and the cart comes along. Roll the cart down the aisle and the plane does not veer. **Children ride parents. Parents do not ride children.** Half your future hierarchy bugs are this sentence, ignored.

*See it with your own eyes in [[hierarchy-basics|Exercise 1: Hierarchy Basics]], or play with the live demo in [[local-vs-world|Local vs. World]].*
