# Exercise 2: The House (20 minutes)

Your first [[standard-prefab|Standard Prefab]], cubes and all. Build it as one from the first click:

1. Create an Empty named `House`. Position it at a sensible spot on your ground plane. This is the parent, the truth, and its scale stays (1, 1, 1) forever.
2. Add a Box Collider to `House` and size it to the footprint the house will occupy, roughly 4 × 3 × 4. The collider doesn't *do* anything yet (Week 5 wakes it up); this week it's the object's declared footprint, and Visuals will be built to fit it.
3. Create an empty child named `Visuals`. Inside it: a stretched cube for the body, a second cube rotated 45° for the roof, small cubes for the chimney and door. Ugly is fine. Gray is fine. This is greyboxing, and it's a professional practice, not a placeholder for shame.
4. Add empty children `Effects` and `Audio` next to Visuals. They hold nothing. They're reserved parking, and Week 7 fills them.
5. Drag `House` from the Hierarchy into your Project folder. It's now a prefab. Stamp four more into the scene: that's a village, and it took four drags.
6. Now the payoff demo. Open the prefab (double-click it), change the roof's color or swap a cube for a differently-shaped one *inside Visuals*, and watch every house in the village update. Then say the important part out loud for your future video: **nothing outside Visuals knew anything happened.**

*This is [[a1-spec|A1's R4]] almost verbatim: two instances plus a propagating edit. Next: [[the-windmill|Exercise 3: The Windmill]].*
