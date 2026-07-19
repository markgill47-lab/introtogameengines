# Exercise 2: The Real Mover (20 minutes)

1. Create your player object (capsule, or your [[w02:the-house|Week 2 scene's]] player) and attach:

```csharp
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    public float walkSpeed = 4f;     // units per second. Real units now.
    public float sprintSpeed = 8f;

    void Update()
    {
        float speed = Input.GetKey(KeyCode.LeftShift) ? sprintSpeed : walkSpeed;

        Vector3 dir = Vector3.zero;
        if (Input.GetKey(KeyCode.W)) dir += Vector3.forward;
        if (Input.GetKey(KeyCode.S)) dir += Vector3.back;
        if (Input.GetKey(KeyCode.A)) dir += Vector3.left;
        if (Input.GetKey(KeyCode.D)) dir += Vector3.right;

        transform.Translate(dir.normalized * speed * Time.deltaTime);
    }
}
```

Two details worth noticing out loud: the speeds are in *units per second*, numbers you can reason about, and `dir.normalized` stops diagonal movement from being faster than straight movement (W and D together sum to a longer vector; normalizing fixes the oldest movement bug in games).

2. Now add one **discrete** action, because [[a2-spec|Assignment 2]] requires an edge, not just a state:

```csharp
        if (Input.GetKeyDown(KeyCode.Space))
            GetComponent<Renderer>().material.color = Random.ColorHSV();
```

A jump, a color change, a dropped marker, a horn honk: anything that happens *once per press*. While you're here, run the experiment from [[input-held-vs-pressed|the concepts]]: change `GetKeyDown` to `GetKey`, hold Space, watch it strobe, feel the difference in your teeth, change it back.

*Next: [[the-sun|Exercise 3: The Sun]].*
