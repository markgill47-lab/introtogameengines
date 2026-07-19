# Local vs. World

Vocabulary time, because these two words carry the whole week:

- **Local space:** an object's numbers relative to its parent. The pretzels' local position never changes; they're just sitting on the cart.
- **World space:** the object's final composed placement in the scene. The pretzels' world position changes constantly, because the cart's does, because the plane's does.

## Try it

{{widget:transformlab}}

## The inspector surprise

The inspector in your engine shows *local* numbers. This surprises everyone once. You'll select a chimney, read position (0, 2.5, 0), and wonder how a chimney can be at the origin when it's plainly across the map. It isn't at the origin. It's at (0, 2.5, 0) *relative to its roof*, and the roof has a parent, and so on up the tree until the world answer emerges.

Every engine gives you functions to convert between the two spaces (they're in the [[cross-engine-dictionary|dictionary]]); this week you mostly need to know which space you're reading. [[a1-spec|A1's R2]] asks you to demonstrate exactly this: an object whose local coordinates stay fixed while its world position changes, with the inspector visible.

*Next: [[the-pivot|The Pivot]] — the single most common source of Week 2 pain.*
