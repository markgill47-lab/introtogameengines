# Exercise 3: The Silent Gate (15 minutes)

The trigger, and [[collision-vs-trigger|the gotcha]] you are hitting on purpose.

1. Build a `GateZone`: an empty with a Box Collider sized like a doorway, **isTrigger checked**. Put it somewhere the player walks through. No Rigidbody yet. That is the trap, set knowingly.
2. Attach:

```csharp
using UnityEngine;

public class GateZone : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Entered gate: " + other.name);
        GetComponentInChildren<Renderer>().material.color = Color.green;
    }
}
```

(Give the zone a translucent cube in Visuals so the color change is visible. A trigger you can see is a trigger you can debug.)

3. Walk your player through it. If your player is a bare collider with no Rigidbody: *silence*. Nothing fires. No error, no warning, nothing.

Sit in that silence for a second. This is the most-Googled physics failure in Unity's history and you are currently reproducing it in laboratory conditions. Notice what makes it so expensive: there is nothing to search for. A crash gives you a stack trace. This gives you an absence.

4. **The fix:** add a Rigidbody to the player and check **isKinematic**. Input still drives it; the simulation just needs to know it exists. Walk through again: log fires, gate goes green.

At least one body in the pair. Forever.

## Narration material

[[a3-spec|Assignment 3's Requirement 4]] wants the concept, not just the effect. So film both halves back to back:

- Walk through the gate: passes through freely, event fires.
- Throw a rock at a crate: bounces, physical.

One tripwire, one wall. Say which is which and why.

And if you are feeling brave, show the silent version first and add the Rigidbody live on camera. The fix landing in real time is excellent evidence that you understand the mechanism rather than having copied a working scene.

*Next: [[the-matrix|Exercise 4: The Matrix]].*
