# The UI System

> **Covered:** Week 6 · **Organ of:** [[common-anatomy|the Common Anatomy]]

The part of the picture that isn't the world: menus, health bars, buttons.

The distinction is worth a sentence: the [[renderer|renderer]] draws the world through a camera; the UI system draws *over* it, in screen space. Week 6 is about keeping those layers decoupled — and "how do I decouple my UI from my player?" is the canonical example of a concept question under the [[engine-policy|engine policy]].

In [[threejs|Three.js]], UI is another assemble-it-yourself subsystem — typically plain HTML/CSS layered over the canvas, which is either a limitation or a superpower depending on how much CSS you know.
