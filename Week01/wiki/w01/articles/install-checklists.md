# Install Checklists

One checklist per engine. Do the one for the engine you chose in [[how-to-choose|How to Choose]], then verify with the [[hello-scene|Hello Scene]].

## Unity

1. Download **Unity Hub** from unity.com. The Hub manages engine versions; you'll never download "Unity" directly.
2. Create a Unity account (you'll need it for sign-in and, later, the Asset Store).
3. Through the Hub, install the current **LTS** version. LTS means Long Term Support, and it means "the version that doesn't surprise you mid-semester." Do not install a beta because the number is bigger.
4. In the install options, include **build support** for your platform (Windows/Mac). Skip everything else for now; the Hub adds modules later in minutes.
5. Disk and patience budget: ~10 GB and one coffee.

## Godot

1. Download the current **Godot 4.x** release from godotengine.org. It's under 100 MB and there is no installer; it's just a program you run. Enjoy the culture shock.
2. Decide GDScript vs. C#. If C#, download the **.NET edition** and install the .NET SDK it asks for. If you're unsure, GDScript; you can add C# later.
3. That's it. That's the checklist. This is a real selling point and [[godot|Godot]] knows it.

## Unreal

1. Install the **Epic Games Launcher**, create an Epic account, and install the current **Unreal Engine 5.x** through it.
2. Budget honestly: the install wants 50 to 100+ GB and the download takes an evening. Confirm your drive has room *before* starting.
3. If you'll use C++, you also need Visual Studio (Windows) or Xcode (Mac) with the C++ workloads Epic's docs specify. Blueprints-only students can skip this today.
4. First launch of the editor compiles thousands of shaders. This is normal. It is also long. Start it before dinner, not before class.

## Three.js

1. Install **Node.js** (LTS) and **VS Code**, if you somehow don't have them.
2. Scaffold with Vite: `npm create vite@latest my-game`, pick vanilla JS (or TS if that's home), then `npm install three`.
3. Alternative zero-tooling path: a single HTML file loading Three.js from a CDN. Fine for this week; you'll want the real toolchain by Week 3.
4. You will also be choosing a [[physics-engine|physics library]] eventually (rapier or cannon-es). Not this week's problem. It is Week 5's problem, and Future You should know it's coming.
