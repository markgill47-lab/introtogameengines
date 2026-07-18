# Week 1 Practice Guide: Setup and Hello Scene

> **How to use this guide:** This is the hands-on half of Week 1. By the end of it you will have chosen an engine, installed it, made an object appear on screen, and recorded thirty seconds of yourself narrating it. That last one is not a joke task; it's a dry run of how you'll submit every assignment this semester.

---

## The finish line for this week

Four boxes to check, in order:

1. **Engine chosen.** Read section 4 of the concepts doc if you haven't. Deciding is the assignment.
2. **Engine installed and verified** via the Hello Scene below.
3. **OBS installed** and a 30-second narrated test recording made.
4. **Somewhere to put your work:** a Git repo (GitHub is fine) or at minimum a project folder you back up. Your first zipped-project submission will thank you.

No paced assignment this week, but A1 lands next week and assumes all four boxes are checked. A student debugging their install during Week 2 is a student doing Week 1 late.

---

## Install checklists

### Unity
1. Download **Unity Hub** from unity.com. The Hub manages engine versions; you'll never download "Unity" directly.
2. Create a Unity account (you'll need it for sign-in and, later, the Asset Store).
3. Through the Hub, install the current **LTS** version. LTS means Long Term Support, and it means "the version that doesn't surprise you mid-semester." Do not install a beta because the number is bigger.
4. In the install options, include **build support** for your platform (Windows/Mac). Skip everything else for now; the Hub adds modules later in minutes.
5. Disk and patience budget: ~10 GB and one coffee.

### Godot
1. Download the current **Godot 4.x** release from godotengine.org. It's under 100 MB and there is no installer; it's just a program you run. Enjoy the culture shock.
2. Decide GDScript vs. C#. If C#, download the **.NET edition** and install the .NET SDK it asks for. If you're unsure, GDScript; you can add C# later.
3. That's it. That's the checklist. This is a real selling point and Godot knows it.

### Unreal
1. Install the **Epic Games Launcher**, create an Epic account, and install the current **Unreal Engine 5.x** through it.
2. Budget honestly: the install wants 50 to 100+ GB and the download takes an evening. Confirm your drive has room *before* starting.
3. If you'll use C++, you also need Visual Studio (Windows) or Xcode (Mac) with the C++ workloads Epic's docs specify. Blueprints-only students can skip this today.
4. First launch of the editor compiles thousands of shaders. This is normal. It is also long. Start it before dinner, not before class.

### Three.js
1. Install **Node.js** (LTS) and **VS Code**, if you somehow don't have them.
2. Scaffold with Vite: `npm create vite@latest my-game`, pick vanilla JS (or TS if that's home), then `npm install three`.
3. Alternative zero-tooling path: a single HTML file loading Three.js from a CDN. Fine for this week; you'll want the real toolchain by Week 3.
4. You will also be choosing a physics library eventually (rapier or cannon-es). Not this week's problem. It is Week 5's problem, and Future You should know it's coming.

---

## Hello Scene: the verification ritual

Same test in every engine: make a project, put an object in the world, press play, see it render. Five minutes, and it proves the whole toolchain end to end.

- **Unity:** New 3D project in the Hub → GameObject → 3D Object → Cube → press Play. A cube in a void, softly lit. That void is where the semester happens.
- **Godot:** New project → 3D scene → add a `MeshInstance3D` child, assign a BoxMesh → add a `Camera3D` and a `DirectionalLight3D` → press Play. Godot makes you add your own camera and light, which is a better first lesson than getting them free.
- **Unreal:** New project → Games → Third Person template → press Play. You get a whole playable character for free, which feels like cheating because it slightly is. For the truer test: drag a cube from the shapes panel into the level first.
- **Three.js:** the classic ~15-line starter: scene, camera, renderer, `BoxGeometry` with a basic material, a render loop. Run the dev server, open the browser, behold the cube. You just hand-wrote the loop every other engine hides. Remember this moment in Week 3.

If your cube renders, your install works. If it doesn't, this is the ideal week to hit the problem: nothing is due, and my Discord is open. Paste the actual error, not a description of the vibes.

---

## The demo game: W01_Anatomy

In class (live and recorded), I build the semester's Unity project from File → New Project and set up the **W01_Anatomy** scene: five stations on a plane, one per subsystem from the concepts doc.

1. **Rendering station:** a lit, slowly rotating cube. One material, one light.
2. **Physics station:** a stack of cubes that collapses when the scene starts. Zero code.
3. **Scripting/input station:** a cube that changes color on keypress. One five-line script.
4. **Audio station:** a cube that hums, louder as the camera gets closer. One audio source.
5. **UI station:** a floating label. One text element.

The point is not the stations, which are deliberately trivial. The point is watching a project go from empty to organized: folders, version control, scene naming. If you want the same tour in your own engine, rebuilding these five stations is a fine optional exercise and covers every organ you'll use this semester. Total code involved: about ten lines.

Starting next week, this project grows into an actual game, one concept per week, and the Week 2 session opens by building its first **Standard Prefab**. Come watch.

---

## Recording setup: OBS in fifteen minutes

Every assignment you submit this semester is a narrated screen recording. Set that up now, while nothing depends on it.

1. Download **OBS Studio** (free, obsproject.com). Mac's built-in recorder or Windows Game Bar are acceptable fallbacks; OBS is the recommendation because it records your voice and screen together without drama and you'll stop thinking about it by Week 3.
2. Add a **Display Capture** source (your screen) and an **Audio Input Capture** source (your microphone).
3. Settings → Output: 1080p is plenty. Nobody is grading your bitrate.
4. **Record the 30-second test:** your Hello Scene running, while you narrate what engine you chose and why, out loud, in sentences. Play it back. Confirm you can hear yourself and see the screen.

If you can't stand hearing your own voice, welcome to the club; nobody can. It stops mattering by the third recording, and being able to narrate a technical demo while driving it is a professional skill this course is quietly installing in you, one video at a time.

No recording hardware? The VizLab (ISELF 101) has machines with everything installed. Come see me.

---

## This week, in one list

- [ ] Engine chosen, on purpose, using the four questions
- [ ] Engine installed; Hello Scene renders
- [ ] OBS installed; 30-second narrated test recorded and played back
- [ ] Repo or backed-up project folder exists
- [ ] Optional: five-station anatomy tour rebuilt in your engine
- [ ] Optional but smart: introduce yourself on the course Discord and say which engine you picked, so the Godot students can find each other
