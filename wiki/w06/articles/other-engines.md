# Other Engines

Same four exercises, different spellings. The [[cross-engine-dictionary|dictionary]] has the terminology. These are the notes beyond it.

## Godot

UI is Control nodes under a `CanvasLayer`, which ignores the world camera for free. Bar: `TextureProgressBar`. Flow panels: toggle `visible`.

Pause is the elegant one. `get_tree().paused = true`, then set your UI's `process_mode` to Always so menus keep working. That is the "UI runs on unscaled time" idea as a per-node checkbox, which is a genuinely better design than a second clock.

Restart: `get_tree().reload_current_scene()`. And yes, the paused flag survives reloads: same trap, same lesson, set `paused = false` on restart.

World-space bar: a `Sprite3D` with a `SubViewport`, or cheat with a `Label3D`. Billboarding is a property on Sprite3D. A checkbox, no script, quietly smug.

## Unreal

UMG Widget Blueprint for the HUD, with a Progress Bar widget bound to your GameState values.

Worth knowing what you are using: **Unreal's property binding is polling, formalized.** It reads the bound value every frame, which is exactly the arrangement this week teaches. So use it with a clear conscience, and know that when Week 11 arrives, the thing being renovated is this.

Flow panels: add and remove widgets from the viewport. Pause: `Set Game Paused`, with your menu widget's tick set to run while paused. Restart: `Open Level` on the current level.

World-space bar: a Widget Component on the dummy, screen-space or world-space per its setting. World-space needs the billboard treatment via its rotation or the component's Screen mode.

## Three.js

Your HUD is HTML floating over the canvas. A flex container, a `<div>` whose width percentage is your health fraction, a gold counter, and you will style it faster than anyone in Unity. Panels are `display: none` toggles.

Pause: stop advancing your own dt. Keep `clock.getDelta()` running but multiply by your own timescale, and now you own the concept end to end, including the fact that your UI keeps animating because it never asked the game clock for permission.

Restart: re-run your scene-building init function. Which is why the practice of *having* an init function instead of top-level soup pays off today. If your setup code is scattered across the module, this is the week it costs you.

World-space bar: `CSS2DRenderer` glues DOM elements to 3D positions and billboards them for free.
