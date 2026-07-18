# Week 7 Practice Guide: The Rig and the Juice

> **How to use this guide:** The hands-on half of Week 7, mirroring the demo game's `W07_Feel` session: the static camera retires, impacts learn to speak, torches learn to crackle, and one keypress separates the tech demo from the game. Read `Week07_Concepts.md` first, and have `A5_Spec.md` open before you record.

---

## What you're building

- **Exercise 1: The Rig.** A damped third-person follow camera, structured so shake can join it.
- **Exercise 2: The Impact.** Dust, thunk, and flinch on your Week 5 collisions. Effects and Audio children finally earn their slots.
- **Exercise 3: The Shake.** Trauma-based, decaying, with an off switch.
- **Exercise 4: The Torch.** Decorative juice: looping fire and crackle for the valley at night.
- **Exercise 5: The Toggle.** One key, dry versus juiced, the whole argument of the week on camera.

You'll want your Week 5 target range and your Week 6 GameState; both get juicier today.

---

## Exercise 1: The Rig (20 minutes)

Structure first, because shake is coming and the two concerns need separate nodes:

```
CameraRig          <- FollowCamera script writes THIS transform
└── Main Camera    <- CameraShake (Exercise 3) writes this LOCAL transform
```

1. Create an empty `CameraRig`, parent your Main Camera under it, and zero the camera's local position. The Week 2 empty-parent trick, third appearance this semester.
2. Attach to the rig:

```csharp
using UnityEngine;

public class FollowCamera : MonoBehaviour
{
    public Transform target;                       // the player
    public Vector3 offset = new Vector3(0f, 4f, -7f);
    public float smoothTime = 0.3f;
    private Vector3 velocity;

    void LateUpdate()
    {
        Vector3 desired = target.position + offset;
        transform.position = Vector3.SmoothDamp(transform.position, desired, ref velocity, smoothTime);
        transform.LookAt(target.position + Vector3.up * 1.5f);
    }
}
```

3. Play and walk the valley. The camera pursues and breathes. Now the two diagnostic experiments, both worth showing in your video:
   - Set `smoothTime` to 0.001 (effectively welded): every twitch of input hits your eyes. Back to 0.3: the difference *is* damping, demonstrated.
   - Move the script's code into `Update` temporarily: at speed, the target visibly jitters against the frame. Back to `LateUpdate`: smooth. That's frame ordering, witnessed, and now you'll never wonder.
4. **Optional orbit upgrade:** rotate the offset with mouse X (`offset = Quaternion.AngleAxis(mouseX * sensitivity, Vector3.up) * offset;` fed by `Input.GetAxis("Mouse X")`). Fifteen extra minutes, real third-person credentials, not required by A5.

## Exercise 2: The Impact (25 minutes)

The crate learns to say *thunk*. Open your `Crate` prefab (Week 2 skeleton, Week 5 physics) and finally furnish the two empty children:

1. **Effects child:** add a Particle System configured for a burst: Duration 0.5, Looping off, Play On Awake **off**, one Burst of 12–20 particles, short lifetime (0.3–0.5s), some start speed, a size-over-lifetime curve tapering to zero, dust-ish gray. Small and shaped beats big and square.
2. **Audio child:** add an AudioSource, assign a thunk clip (Kenney's free impact packs are the course pantry; any short percussive sound works), **Play On Awake off**, Spatial Blend 1.0 (3D: the range should thunk over *there* when you're over here).
3. On the prefab parent, the conductor:

```csharp
using UnityEngine;

public class ImpactJuice : MonoBehaviour
{
    public ParticleSystem dust;        // wire from Effects
    public AudioSource thunk;          // wire from Audio
    public float minImpactSpeed = 2f;
    public float maxImpactSpeed = 10f;

    void OnCollisionEnter(Collision c)
    {
        float speed = c.relativeVelocity.magnitude;
        if (!JuiceMaster.On || speed < minImpactSpeed) return;

        dust.transform.position = c.GetContact(0).point;
        dust.Play();

        thunk.pitch = Random.Range(0.9f, 1.1f);
        thunk.PlayOneShot(thunk.clip, Mathf.Clamp01(speed / maxImpactSpeed));

        Object.FindFirstObjectByType<CameraShake>()?.AddTrauma(0.25f * Mathf.Clamp01(speed / maxImpactSpeed));
    }
}
```

Three professional touches are hiding in those few lines, and your narration should point at each: the **threshold** (resting contacts don't machine-gun thunks; only real hits speak), **volume scaled by impact speed** (your physics just became audible), and **pitch variance** (the same clip stays alive at throw number forty). And one admission, filed openly: that `FindFirstObjectByType` reaching across the scene to poke the camera is coupling of exactly the kind Week 11 exists to eliminate. Today we take the shortcut and file the debt next to Week 6's polling receipt. The pile is growing on purpose.

4. Because this all lives in the *prefab*, every crate in the scene just learned to thunk. Week 2 continues to pay rent.

## Exercise 3: The Shake (15 minutes)

On the Main Camera (the child, not the rig):

```csharp
using UnityEngine;

public class CameraShake : MonoBehaviour
{
    public bool shakeEnabled = true;    // A5's required off switch
    public float maxOffset = 0.25f;
    public float decay = 1.2f;
    private float trauma;

    public void AddTrauma(float amount)
    {
        trauma = Mathf.Min(1f, trauma + amount);
    }

    void LateUpdate()
    {
        float shake = trauma * trauma;
        transform.localPosition = shakeEnabled
            ? Random.insideUnitSphere * maxOffset * shake
            : Vector3.zero;
        trauma = Mathf.Max(0f, trauma - decay * Time.deltaTime);
    }
}
```

Throw rocks. The camera flinches in proportion and settles fast. Now the three demonstrations that make it *polite*, all camera-ready: light tap versus hard throw (squared trauma making small events whisper), the decay visibly returning calm within a second, and the `shakeEnabled` toggle doing its accessibility job. Note what made this trivially clean: shake writes `localPosition` on the child while follow writes the rig. Two nodes, no wrestling.

## Exercise 4: The Torch (15 minutes)

Decorative juice, for contrast with the communicative kind:

1. New Standard Prefab `Torch`: a thin stretched cube in Visuals, a **looping** particle system in Effects (continuous emission ~10/sec, upward drift, orange-to-transparent color over lifetime, slight size taper: fire-ish is plenty; this is greybox fire and it reads fine), and a **looping** 3D AudioSource in Audio with a crackle clip, Play On Awake on.
2. Place four around the village. Let the Week 3 sun roll to night and walk among them: pockets of light, sound swelling and fading with distance. Nothing happened, no event fired, and the place feels inhabited. That's the decorative half of the taxonomy, on camera in one slow walk.

## Exercise 5: The Toggle (10 minutes)

The week's thesis, made interactive:

```csharp
using UnityEngine;

public static class JuiceMaster
{
    public static bool On = true;
}

public class JuiceToggle : MonoBehaviour
{
    public CameraShake shake;
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.J))
        {
            JuiceMaster.On = !JuiceMaster.On;
            shake.shakeEnabled = JuiceMaster.On;
        }
    }
}
```

(Have torches check `JuiceMaster.On` in Update to pause/resume their systems if you want the toggle total; impacts already check it.) Then perform the experiment: thirty seconds of throwing rocks dry, press J, the same thirty seconds juiced. Do not skip actually doing this yourself before recording: the difference lands harder in your own hands than in any video, and your narration will be better for having felt it.

---

## Other Engines

- **Godot:** rig as a Node3D with the camera child, or use `SpringArm3D` (follow with collision handling as a stock node). Smooth with `position.lerp(desired, 1.0 - exp(-k * delta))` for dt-correct damping. Particles: `GPUParticles3D`, `one_shot` on for bursts, off for torches. Audio: `AudioStreamPlayer3D`, `pitch_scale` for variance. Shake: same trauma script on the camera child, offsets on its local position.
- **Unreal:** the Spring Arm component is the rig, damping knobs included (set lag speeds and feel the same tradeoffs). Impacts: `OnComponentHit` → spawn a Niagara burst at the hit location, `Play Sound at Location` with a Sound Cue that randomizes pitch (cues do the variance for you). Shake: Unreal ships `CameraShake` as a first-class asset class, trauma-style falloff included; make one and trigger it, and appreciate that the pattern is so universal it's a product feature.
- **Three.js:** camera follow is your loop's exp-decay lerp toward `target.position.clone().add(offset)`, run *after* movement updates (you control the order; that's your LateUpdate). Particles: three-nebula, or roll a burst with `THREE.Points` and fifty vertices you animate out and fade: educational and sufficient for dust. Audio: `THREE.AudioListener` on the camera, `THREE.PositionalAudio` on objects, `playbackRate` for pitch variance. Shake: add a decaying random offset to the camera after the follow lerp, same trauma math verbatim.

---

## Recording your A5 video

A shape that fits 2–5 minutes:

1. **The rig (60 sec):** walk the valley with the damped camera; show the welded-camera comparison and say the word damping; mention LateUpdate and what the jitter looked like.
2. **The impact suite (60–90 sec):** rocks into crates with dust, speed-scaled thunk, and flinch. Show the code's three touches (threshold, volume scaling, pitch variance) in the walkthrough. Point at Effects and Audio in the prefab hierarchy: the Week 2 slots, occupied.
3. **The shake etiquette (30 sec):** tap vs. slam, the decay, and the off switch flipped on camera.
4. **The dry/juiced toggle (45 sec):** the same action both ways. Let the contrast do the talking, then say one sentence about matching feedback to meaning.
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
