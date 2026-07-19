# Exercise 3: The Windmill (20 minutes)

The deliberate mistake, then [[the-pivot|the universal fix]].

1. Make another [[standard-prefab|Standard Prefab]], `Windmill`: a tall stretched cube for the tower inside Visuals, and a blade assembly (two long thin crossed cubes) near the top.
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

*This is [[a1-spec|A1's R3]]. Flailing counts as a fail, and yes, I can tell. Next: [[the-shot|Exercise 4: The Shot]].*
