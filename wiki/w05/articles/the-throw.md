# Exercise 2: The Throw (20 minutes)

An impulse-driven projectile, built as a [[w02:standard-prefab|Standard Prefab]].

1. Make a `Rock` Standard Prefab: parent with Sphere Collider + Rigidbody, sphere in Visuals scaled to fit. Make it small; make it dense-feeling (mass ~2).
2. Attach a thrower to your player or camera:

```csharp
using UnityEngine;

public class RockThrower : MonoBehaviour
{
    public Rigidbody rockPrefab;
    public float throwPower = 12f;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.F))
        {
            Rigidbody rock = Instantiate(rockPrefab,
                transform.position + transform.forward,
                Quaternion.identity);
            rock.AddForce(transform.forward * throwPower, ForceMode.Impulse);
        }
    }
}
```

## Read it before you run it

Four decisions from three different weeks, one function:

- `GetKeyDown` because throwing is [[w03:input-held-vs-pressed|an edge, not a state]].
- `ForceMode.Impulse` because it is [[forces-and-impulses|a shove, not a thrust]].
- No delta time anywhere, because instantaneous things do not get dt.
- It is legal in `Update` because it is a one-shot handed to the simulation, not a continuous push.

If you can say those four sentences out loud, you have most of [[a3-spec|Requirement 2]] already narrated.

## Why the impulse line is not optional

`Instantiate` hands you a rock hanging in midair with no velocity and no spin. Stop there and it drops straight down and lands at your feet, which is [[bowling-alley|the seam in the bowling metaphor]] arriving exactly on schedule.

`AddForce` is the arm swing. It is the only reason the rock goes anywhere at all.

Delete that line for ten seconds and watch what happens, because this is the clearest demonstration in the whole week of what "the state at the moment of transfer" actually means. A rigid body does not remember being thrown. It only knows what you told it.

3. Throw rocks at your crate tower until it stops being research. It takes a while. That is game feel doing its job two weeks early.

## One deliberate bug, for your education

Comment out the `AddForce`. Instead, try to fling the rock by setting its transform position forward each frame from `Update` or a coroutine.

Watch it stutter through crates without properly hitting them. Positions get rewritten between physics steps, so the simulation never sees a moving object; it sees an object that keeps teleporting, and teleporting objects do not collide with anything on the way.

That is [[body-types|the cardinal rule]] demonstrated in the wild, and it is the single most useful thirty seconds in this week's practice. Restore the impulse when you are done.

*Next: [[silent-gate|Exercise 3: The Silent Gate]].*
