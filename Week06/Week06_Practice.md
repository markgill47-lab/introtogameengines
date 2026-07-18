# Week 6 Practice Guide: The Scoreboard and the Flow

> **How to use this guide:** The hands-on half of Week 6, mirroring the demo game's `W06_Interface` session: a GameState object, a HUD that reads it, the full start-play-die-restart circuit, and one health bar floating in the world. Read `Week06_Concepts.md` first, and have `A4_Spec.md` open before you record.

---

## What you're building

- **Exercise 1: The Official Scorer.** A GameState object that owns the facts.
- **Exercise 2: The Scoreboard.** A HUD that reads them, sixty times a second.
- **Exercise 3: The Circuit.** Start screen → playing → death → restart, plus pause, plus this week's scheduled trap.
- **Exercise 4: The Floating Bar.** World-space UI on a training dummy, billboarded.

Build onto your valley scene. Your Week 5 target range supplies convenient sources of damage.

---

## Exercise 1: The Official Scorer (15 minutes)

1. Create an empty named `GameState` and attach:

```csharp
using UnityEngine;

public class GameState : MonoBehaviour
{
    public float maxHealth = 100f;
    public float health = 100f;
    public int gold = 0;
    public bool isPaused = false;
    public bool isGameOver = false;

    public void TakeDamage(float amount)
    {
        if (isGameOver) return;
        health = Mathf.Max(0, health - amount);
        if (health <= 0) isGameOver = true;
    }

    public void AddGold(int amount)
    {
        gold += amount;
    }
}
```

Note what this script contains: facts, and the legal ways to change them. Note also what it doesn't contain: a single mention of text, bars, panels, or colors. This file wouldn't need to change if your game were a text adventure, and that's the test it will be held to all semester.

2. Wire some sources: your Week 5 trigger arch calls `AddGold(5)`; falling crates or a debug key (`K` for "ouch, 10 damage") call `TakeDamage`. Sources ask the scorer; nobody edits the book directly.

## Exercise 2: The Scoreboard (20 minutes)

1. Create a Canvas. Add a health bar: an Image set to **Filled** mode (a solid rectangle sprite works fine), plus a background rectangle behind it. Add a gold label (TextMeshPro).
2. One script, whose only job is converting facts to pixels:

```csharp
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class HudController : MonoBehaviour
{
    public GameState state;
    public Image healthFill;
    public TMP_Text goldLabel;

    void Update()
    {
        healthFill.fillAmount = state.health / state.maxHealth;
        goldLabel.text = "Gold: " + state.gold;
    }
}
```

3. Play. Take damage, collect gold, watch the glass tell the truth. Then deliver the scheduled line, out loud, for your future video and your future self: **"This HUD asks sixty times a second whether anything changed. Week 11 fixes that, and this script is the one it fixes."** The debt is real, the receipt is filed, and A9 will collect it.
4. Notice the one-way street while it's fresh: `HudController` reads state and writes pixels. It has no `TakeDamage` calls, no gold math, no opinions. If you feel the urge to put game logic here because the reference is handy, that urge is the whole reason Week 6 exists.

## Exercise 3: The Circuit (25 minutes)

1. Add three panels under the canvas: `StartPanel` ("click to play"), `PausePanel`, `GameOverPanel` (with a Restart button). A tiny flow controller toggles them:

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameFlow : MonoBehaviour
{
    public GameState state;
    public GameObject startPanel, pausePanel, gameOverPanel;
    bool started = false;

    void Start()
    {
        Time.timeScale = 0f;            // world holds still behind the start screen
        startPanel.SetActive(true);
    }

    public void BeginGame()             // wired to the start button
    {
        started = true;
        startPanel.SetActive(false);
        Time.timeScale = 1f;
    }

    void Update()
    {
        if (started && Input.GetKeyDown(KeyCode.Escape) && !state.isGameOver)
        {
            state.isPaused = !state.isPaused;
            pausePanel.SetActive(state.isPaused);
            Time.timeScale = state.isPaused ? 0f : 1f;
        }
        if (state.isGameOver && !gameOverPanel.activeSelf)
            gameOverPanel.SetActive(true);
    }

    public void Restart()               // wired to the restart button
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

2. Run the full circuit twice: start → play → take fatal damage → game over → restart → play again. Twice matters: the second lap is the one that catches leftover state, and A4 requires both laps on camera.
3. Now the scheduled trap, walked into on purpose: pause the game, then restart *from paused* (add a Restart button to the pause panel, or just call it). The fresh scene arrives frozen: start screen up, world dead, nothing responding to the time scale you never reset. Diagnose it out loud, then fix it: `Time.timeScale = 1f` at the top of `Restart()` (our `Start()` immediately re-freezes for the start screen, which is fine: the point is that *no scene ever inherits a stale clock*). Every student ships this bug once; you just shipped it in the cheap week.
4. Sit with the flow controller's shape for one moment: two booleans, a `started` flag, and if-statements guarding each other. It works. It is also visibly *about* to stop scaling: add a settings screen, a cutscene, a shop, and count the guards you'd need. File the feeling; Week 10 is its appointment.

## Exercise 4: The Floating Bar (15 minutes)

1. Give your Week 5 training dummy (any crate with hit points will do: add a small `DummyHealth` script with its own health value and `TakeDamage`) a **world-space canvas**: a small Canvas child set to World Space, scaled way down (0.01-ish), holding a filled bar like the HUD's. In the Standard Prefab, it lives under the parent alongside Visuals: it's presentation attached to the object, and it rides the tree like everything else.
2. Bind its fill to the dummy's health the same polling way. Throw rocks; watch the bar drain over the dummy's head while your own HUD sits still on the glass. That contrast, narrated (whose information is on the glass, whose floats in the world), is A4's R5 in one shot.
3. Turn the dummy. The bar turns with it and vanishes edge-on, exactly as promised. The cure:

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

On the canvas, one line of consequence, and the bar faces the camera forever. (`LateUpdate` so it runs after everything else has moved; a small Week 3 fact earning rent.)

---

## Other Engines

- **Godot:** UI is Control nodes under a `CanvasLayer` (which ignores the world camera for free). Bar: `TextureProgressBar`. Flow panels: toggle `visible`. Pause is the elegant one: `get_tree().paused = true`, then set your UI's `process_mode` to Always so menus keep working: the "UI runs on unscaled time" idea as a per-node checkbox. Restart: `get_tree().reload_current_scene()`, and yes, the paused flag survives reloads: same trap, same lesson, set `paused = false` on restart. World-space bar: a `Sprite3D` with a `SubViewport`, or cheat with a `Label3D`; billboarding is a property on Sprite3D (checkbox, no script, quietly smug).
- **Unreal:** UMG Widget Blueprint for the HUD; a Progress Bar widget bound to your GameState values (Unreal's property binding *is* polling, formalized: it reads the bound value every frame, which is exactly the arrangement we're teaching this week, so use it with a clear conscience). Flow panels: add/remove widgets from viewport. Pause: `Set Game Paused`, with your menu widget's tick set to run while paused. Restart: `Open Level` on the current level. World-space bar: a Widget Component on the dummy, screen-space or world-space per its setting; world-space needs the billboard treatment via its rotation or the component's Screen mode.
- **Three.js:** your HUD is HTML floating over the canvas: a flex container, a `<div>` whose width percentage is your health fraction, a gold counter, and you will style it faster than anyone in Unity. Panels are `display: none` toggles. Pause: stop advancing your own dt (keep `clock.getDelta()` running but multiply by your own timescale, and now you own the concept end to end). Restart: re-run your scene-building init function, which is why the practice of *having* an init function instead of top-level soup pays off today. World-space bar: `CSS2DRenderer` glues DOM elements to 3D positions and billboards them for free.

---

## Recording your A4 video

A shape that fits 2–5 minutes:

1. **The scorer and the scoreboard (60 sec):** code walkthrough of GameState (facts and legal changes, zero UI) and HudController (pixels, zero logic). Say the direction of the street. Deliver the Week 11 debt line; it's part of the story.
2. **The circuit, twice (60–90 sec):** start → play (bars and gold moving) → death → restart → play again, on camera, with the second lap proving clean reset.
3. **Pause (30 sec):** world frozen, menu alive. Bonus points: show the pause-restart trap and its fix, since you built both anyway.
4. **The floating bar (30 sec):** dummy bar draining in the world, your HUD on the glass, one sentence on whose information lives where, billboard doing its job as the dummy turns.
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
