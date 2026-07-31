# Cross-Engine Dictionary

Same anatomy, different spellings, as always.

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| UI layer | Canvas (uGUI) | Control nodes / CanvasLayer | UMG Widget Blueprints | HTML/CSS overlay (the DOM) |
| Label | Text / TextMeshPro | Label | Text Block | `<div>` |
| Bar | Image, fill amount | TextureProgressBar / ProgressBar | Progress Bar | `<div>` with a width style |
| Show/hide screen | SetActive on a panel | `visible` property / CanvasLayer | Add/Remove from viewport | `style.display` |
| Pause | `Time.timeScale = 0` | `get_tree().paused` (with per-node exemptions) | Set Game Paused | stop advancing your dt |
| Unscaled time | `Time.unscaledDeltaTime` | process_mode exemptions | time-dilation-immune tick | a second, unscaled clock |
| Restart | `SceneManager.LoadScene` | `get_tree().reload_current_scene()` | Open Level | re-run your init |
| World-space UI | Canvas in World Space mode | Sprite3D / SubViewport | Widget Component | CSS2DRenderer / sprite |

## Housekeeping notes

**Unity ships two UI systems.** Told you in Week 1: churn is the house style. We use **uGUI**, the Canvas-based one, because its bar-filling and world-space stories are simpler for this course.

**Godot's pause is unusually elegant.** The tree pauses and each node declares whether it obeys, which makes "UI keeps running" a checkbox instead of a second clock. Its billboarding is a checkbox too. Godot students get to be quietly smug this week.

**Unreal's property binding is polling, formalized.** A Progress Bar bound to a value reads it every frame, which is exactly the arrangement this week teaches. Use it with a clear conscience, and know that you are using it.

**Three.js students get the last laugh this week.** Your UI layer is the DOM, which is the most mature UI toolkit ever shipped. You will style a HUD faster than anyone in Unity. And your pause is just not advancing your own delta time, which by now you understand better than anyone in the room, because you have been [[w03:two-clocks|writing your own clock]] since Week 3.

*Next: [[gotchas|Gotchas and Judgment Calls]].*
