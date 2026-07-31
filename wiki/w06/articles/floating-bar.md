# Exercise 4: The Floating Bar (15 minutes)

World-space UI on a training dummy, billboarded.

1. Give your [[w05:gravity-on|Week 5 crate]] hit points (a small `DummyHealth` script with its own health value and `TakeDamage` will do) and a **world-space canvas**: a small Canvas child set to World Space, scaled way down (0.01-ish), holding a filled bar like the HUD's.

In the [[w02:standard-prefab|Standard Prefab]], it lives under the parent alongside Visuals. It's presentation attached to the object, and it rides the tree like everything else.

2. Bind its fill to the dummy's health the same polling way. Throw rocks and watch the bar drain over the dummy's head while your own HUD sits still on the glass.

That contrast, narrated (whose information is on the glass, whose floats in the world), is [[a4-spec|Requirement 5]] in one shot.

3. Turn the dummy. The bar turns with it and vanishes edge-on, exactly as [[screen-vs-world|promised]]. The cure:

```csharp
using UnityEngine;

public class Billboard : MonoBehaviour
{
    void LateUpdate()
    {
        transform.rotation = Camera.main.transform.rotation;
    }
}
```

On the canvas. One line of consequence, and the bar faces the camera forever.

`LateUpdate` so it runs after everything else has moved, which is a small Week 3 fact earning rent.

*Next: [[other-engines|Other Engines]] if you are not in Unity, or [[a4-spec|Assignment 4]] if your four exercises are done.*
