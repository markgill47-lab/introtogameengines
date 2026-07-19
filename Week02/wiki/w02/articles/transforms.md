# Transforms: The Three Numbers Every Object Carries

Each node in the [[scene-graph|tree]] carries a **transform**: position, rotation, and scale. Three properties, and every visual thing you ever place has exactly one set of them.

- **Position:** where the object sits, relative to its parent.
- **Rotation:** how it's turned, relative to its parent.
- **Scale:** how it's sized, relative to its parent. A scale of 1 means "as authored."

## Order matters

The subtlety worth learning this week rather than during a 2 AM debugging session: these three operations do not commute. Rotate-translate-scale is a *different transform* than scale-translate-rotate. Not a slightly different transform: a different one, with the object in a different place, at a different size, facing a different way. Your engine applies them in one fixed order (scale, then rotation, then translation, composed child-under-parent up the tree), and that consistency is the only reason your scenes behave the same way twice.

Feel it physically: hold your arm straight out and turn your body: your hand traces a big arc. Now turn your body first and *then* raise your arm: your hand is somewhere else entirely. Same two operations, different order, different result. This is also why the hierarchy placement of an operation matters: scaling a parent then rotating a child is not the same as rotating then scaling, which is precisely how the non-uniform-scale shear below happens. When an object ends up somewhere that seems insane, order of operations is suspect number two. (Suspect number one is [[the-pivot|the pivot]].)

## The scale landmine

Scale has one landmine all its own: **non-uniform scale on a parent**. Stretch a parent to (1, 3, 1) and every child rotating inside it will shear, skew, and generally look like it's melting. The fix is the same fix as most hierarchy problems: an extra empty parent, so the stretch applies to visuals and not to the things trying to rotate. **Scale your Visuals; leave your logic parents at (1, 1, 1).** The [[standard-prefab|Standard Prefab]] bakes this rule in so you stop having to remember it.

*Next: [[local-vs-world|Local vs. World]] — which numbers the inspector is actually showing you.*
