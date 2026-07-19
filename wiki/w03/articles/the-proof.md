# Exercise 4: The Proof (15 minutes)

This is the demonstration [[a2-spec|Assignment 2's Requirement 3]] asks for on camera: same code, two framerates, same real-world speed.

1. Add this tiny utility somewhere in the scene:

```csharp
using UnityEngine;

public class FrameCap : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1)) Application.targetFrameRate = 15;
        if (Input.GetKeyDown(KeyCode.Alpha2)) Application.targetFrameRate = -1;  // uncapped
    }
}
```

(If vSync is on, turn it off in Quality settings, or the cap won't take. This is the most common reason "the demo didn't work.")

2. Pick a landmark run: village gate to windmill, or between two objects a known distance apart.
3. Run it uncapped with `PlayerMove` and count seconds. Cap to 15 fps with the 1 key, run it again, count again. Same duration, visibly chunkier picture. That's the whole proof: *choppier, not slower.*
4. Now the kicker for your video: do the same two runs with [[broken-twin|`BrokenMover`]]. At 15 fps it crawls; uncapped it rockets. Same scene, same key, honest code versus dishonest code, side by side. This contrast is the best 45 seconds your Assignment 2 video can contain.

*Engine translations for the cap technique: [[other-engines|Other Engines]].*
