# The Pivot

The **pivot** is the spot an object rotates and scales around, and it is the single most common source of Week 2 pain. Rotate a windmill blade and it rotates around *its own origin*, wherever that happens to be. If the model's origin is at the blade tip instead of the hub, your windmill doesn't spin; it flails.

## See the failure

{{widget:pivotdemo}}

## The universal fix

You can't always move a model's origin, but you can always give it a new parent: create an empty object exactly where the rotation should happen, parent the visuals to it, and rotate the empty. The empty's origin becomes the pivot, and the flailing stops.

Write this down somewhere you'll find it in Week 8: **the empty parent is the universal fix.** Wrong pivot, wrong scale, model imported facing backward at the wrong size: don't fight the asset, wrap it in an empty and correct it one level up. This trick is most of what "rigging up a prefab" means in practice, and you'll use it every week for the rest of the semester.

*Suffer this failure on purpose, then fix it properly, in [[the-windmill|Exercise 3: The Windmill]]. It's also graded: [[a1-spec|A1's R3]] says "flailing counts as a fail, and yes, I can tell."*
