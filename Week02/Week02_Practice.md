# Week 2 Practice Guide: Building the Valley's First Prefabs

> **How to use this guide:** The hands-on half of Week 2. It follows the same build the live session performs on the demo game (a house, a village, a windmill, a camera), because that build touches every concept A1 grades. Unity steps first, other engines after. Read `Week02_Concepts.md` first, and have `A1_Spec.md` open before you record.

---

## What you're building

Four exercises, each feeding the next:

- **Exercise 1: Hierarchy Basics.** Parents, children, and what the inspector's numbers actually mean.
- **Exercise 2: The House.** Your first Standard Prefab, cubes and all.
- **Exercise 3: The Windmill.** The pivot problem, suffered on purpose, then fixed properly.
- **Exercise 4: The Shot.** A camera placed like you meant it.

A1 doesn't require a house or a windmill specifically; it requires the concepts these four exercises install. Build these, then build your own scene, or build these *as* your scene. Both are fine. The spec is the spec.

---

## Exercise 1: Hierarchy Basics (10 minutes)

1. New scene. Create three cubes and scatter them.
2. In the Hierarchy panel, drag cube B onto cube A. B is now A's child. Move A: B comes along. Move B: A doesn't care. Influence flows down. You've now seen the week's most important rule with your own eyes.
3. Select B and look at its position in the inspector. It changed the moment you parented it, even though B didn't move on screen. The inspector shows *local* numbers, and B's frame of reference just became "relative to A." Nothing moved except the meaning of the numbers.
4. Rotate A and watch B orbit. B's local position isn't changing at all while its world position sweeps a circle. Say the snack cart sentence out loud if it helps. Nobody's listening.
5. Create an Empty (GameObject → Create Empty), parent both cubes to it, and move the empty. Congratulations: you've grouped objects, which is 80% of what empties are for. The other 20% is Exercise 3.

## Exercise 2: The House (20 minutes)

Build it as a **Standard Prefab** from the first click:

1. Create an Empty named `House`. Position it at a sensible spot on your ground plane. This is the parent, the truth, and its scale stays (1, 1, 1) forever.
2. Add a Box Collider to `House` and size it to the footprint the house will occupy, roughly 4 × 3 × 4. The collider doesn't *do* anything yet (Week 5 wakes it up); this week it's the object's declared footprint, and Visuals will be built to fit it.
3. Create an empty child named `Visuals`. Inside it: a stretched cube for the body, a second cube rotated 45° for the roof, small cubes for the chimney and door. Ugly is fine. Gray is fine. This is greyboxing, and it's a professional practice, not a placeholder for shame.
4. Add empty children `Effects` and `Audio` next to Visuals. They hold nothing. They're reserved parking, and Week 7 fills them.
5. Drag `House` from the Hierarchy into your Project folder. It's now a prefab. Stamp four more into the scene: that's a village, and it took four drags.
6. Now the payoff demo. Open the prefab (double-click it), change the roof's color or swap a cube for a differently-shaped one *inside Visuals*, and watch every house in the village update. Then say the important part out loud for your future video: nothing outside Visuals knew anything happened.

## Exercise 3: The Windmill (20 minutes)

The deliberate mistake, then the universal fix.

1. Make another Standard Prefab, `Windmill`: a tall stretched cube for the tower inside Visuals, and a blade assembly (two long thin crossed cubes) near the top.
2. Attach this rotation script to the blade assembly:

```csharp
using UnityEngine;

public class Spin : MonoBehaviour
{
    public float degreesPerSecond = 45f;

    void Update()
    {
        transform.Rotate(0f, 0f, degreesPerSecond * Time.deltaTime);
    }
}
```

(That `Time.deltaTime` is a piece of Week 3 arriving early. Copy it on faith today; next week it gets a whole module and the faith gets replaced with understanding.)

3. Press play. If your crossed cubes were positioned by dragging them up the tower, there's a good chance they're now flailing in a wide circle instead of spinning in place, because they're rotating around their own origin, which is not at the hub. If you got lucky and they spin fine, drag the blade cubes a little off-center and break it on purpose. You need to *see* this failure once while it's cheap.
4. The fix: create an Empty named `BladePivot`, position it exactly at the hub (where the blades should spin), parent the blade cubes to it, and move the `Spin` script to the pivot. Play again. It spins like a windmill, because now "its own origin" is exactly where you decided it should be.
5. File the lesson where you'll find it again: **you didn't fix the blades. You wrapped them in a parent whose origin was correct.** That maneuver works on every misbehaving asset you will ever import.

## Exercise 4: The Shot (10 minutes)

1. Place the camera to frame your village and windmill deliberately: slightly elevated, looking down the main street, windmill breaking the skyline. Use the scene view to fly somewhere that looks good, then align the camera to your view (GameObject → Align With View, and learn that hotkey).
2. Adjust field of view once, just to see what it does: 40 is a calm lens, 90 is a wide anxious one.
3. For your narration, have one sentence ready about *why* the camera is where it is. "I wanted the windmill visible over the roofline" is a design decision, and it's precisely the sentence A1 asks for.

---

## Other Engines

Same four exercises, different spellings. The dictionary table in the concepts doc has the terminology; these are the notes beyond it.

- **Godot:** Node3D is your empty, and the Scene dock's drag-to-parent works like Unity's Hierarchy. For the Standard Prefab, build the skeleton and use "Save Branch as Scene" on the `House` node: instancing that saved scene is Godot's prefab workflow, and editing the saved scene updates every instance. Blades: a Node3D pivot with the spin in `_process(delta)`, `rotate_z(deg_to_rad(45) * delta)`.
- **Unreal:** Build the house as a Blueprint class: the Blueprint *is* the prefab. Components in the Blueprint editor form the hierarchy (a SceneComponent as pivot, StaticMesh cubes under it). Rotation via a Rotating Movement component, which is Unreal handing you the Spin script for free. The empty-parent trick is "add a SceneComponent and nest the meshes under it."
- **Three.js:** `THREE.Group()` is your empty; `group.add(mesh)` is parenting; a `makeHouse()` function returning a group is your prefab, and calling it five times is your village. The pivot fix is verbatim: put blade meshes in a group positioned at the hub, rotate the group in the render loop. You're also about to appreciate why engines have editors, because placing a village numerically builds character.

---

## Recording your A1 video

A shape that works inside 2–5 minutes:

1. **The tree (45 sec):** show your hierarchy panel and your compound object. Move the parent, children ride along. Move a child, parent stays. Show the child's local coordinates while its world position changes (rotate the parent slowly and let the inspector make your point).
2. **The prefab (45 sec):** show the Standard Prefab skeleton in one object. Edit something inside Visuals in the prefab, show every instance updating, and say where logic would live versus where looks live.
3. **Parented motion (45 sec):** the windmill or your equivalent: a child animating in local space while belonging to a larger object. Bonus narration: point at the pivot empty and say why it exists.
4. **The shot (30 sec):** show the camera's placement in the scene view, then the framed result in play mode, and give your one sentence of intent.
5. **Wrap (15 sec):** anything that fought you, and what fixed it. (If nothing fought you, the windmill was too easy. Break something and fix it on camera; it makes a better video and a better engineer.)

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
