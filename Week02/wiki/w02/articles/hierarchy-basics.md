# Exercise 1: Hierarchy Basics (10 minutes)

Parents, children, and what the inspector's numbers actually mean. Unity steps; other engines translate via [[other-engines|Other Engines]].

1. New scene. Create three cubes and scatter them.
2. In the Hierarchy panel, drag cube B onto cube A. B is now A's child. Move A: B comes along. Move B: A doesn't care. Influence flows down. You've now seen [[scene-graph|the week's most important rule]] with your own eyes.
3. Select B and look at its position in the inspector. It changed the moment you parented it, even though B didn't move on screen. The inspector shows *[[local-vs-world|local]]* numbers, and B's frame of reference just became "relative to A." Nothing moved except the meaning of the numbers.
4. Rotate A and watch B orbit. B's local position isn't changing at all while its world position sweeps a circle. Say the snack cart sentence out loud if it helps. Nobody's listening.
5. Create an Empty (GameObject → Create Empty), parent both cubes to it, and move the empty. Congratulations: you've grouped objects, which is 80% of what empties are for. The other 20% is [[the-windmill|Exercise 3]].

*Next: [[the-house|Exercise 2: The House]].*
