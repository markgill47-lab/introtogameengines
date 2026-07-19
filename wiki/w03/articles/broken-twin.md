# Exercise 1: The Broken Twin (10 minutes)

Yes, we're writing [[delta-time|the bug]] on purpose. You need to *see* frame dependence once while it's cheap, and you need the broken version on hand for [[the-proof|Exercise 4's]] comparison.

1. Create a cube named `BrokenMover`. Attach:

```csharp
using UnityEngine;

public class BrokenMove : MonoBehaviour
{
    public float step = 0.1f;   // units per FRAME. That's the bug.

    void Update()
    {
        if (Input.GetKey(KeyCode.W)) transform.Translate(Vector3.forward * step);
    }
}
```

2. Play. Hold W. Feels fine, probably. That's what makes this bug dangerous: it *passes the vibe check* on the machine that wrote it.
3. Leave this cube and script in the project, disabled when you don't need it. It's your control group, and it has a starring role in your video.

*Next: [[real-mover|Exercise 2: The Real Mover]].*
