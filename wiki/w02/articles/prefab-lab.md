# The Prefab Lab

> **Supplemental** · deepens [[standard-prefab|The Standard Prefab]] · the payoff demo, playable

[[the-house|Exercise 2]] ends with a payoff demo: edit something inside the prefab and watch every house in the village update. This page is that demo with the file cabinet open, so you can see who is actually in charge.

The scene on top holds three Buildings. None of them owns its own look. All three are **instances** of the one asset in the middle of the project folder below, and that asset is the truth. Change the truth and the scene has no choice.

{{widget:prefablab}}

Two experiments worth running deliberately:

- **Recolor the Cube while the prefab holds the Cube.** One click in the Assets folder, three updates in the scene. That's the edit-once contract, and it's what [[a1-spec|Assignment 1's Requirement 4]] asks you to show on camera: two or more instances, one propagating edit.
- **Drag the House onto the prefab.** The gray box becomes a building with a roof, in all three places, and nothing else in the scene knew anything happened. That drag is **Bottom-Up Asset Replacement** from [[standard-prefab|The Standard Prefab]]: your greybox this week, real art when it arrives. Week 8 performs exactly this swap on the demo game's player character, and it takes five minutes because the seam was built in Week 2.

One professional detail to notice: dragging the House into the prefab didn't consume the House. Assets are definitions, not objects. The project folder is a library of truths; the scene is where their copies live. Keep those two ideas in separate pockets and the [[w01:asset-pipeline|asset pipeline]] will never surprise you.
