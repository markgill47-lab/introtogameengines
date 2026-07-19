# Three.js

> **Language:** JavaScript · **License:** open source · **Status in this course:** the asterisk on the list, included deliberately

Three.js is not a full engine; it's a rendering library for the browser, and you assemble the rest:

- [[physics-engine|Physics]] via a library like **rapier** or **cannon-es**
- [[ui-system|UI]] via HTML/CSS
- Your own loop via `requestAnimationFrame`

Choosing it means building small versions of subsystems the other engines hand you, which is more work and, for the right student, more education.

**It is unbeatable for two things:** procedural geometry (Week 14 will be your show-off week), and *shipping* — because your final project is a URL anyone can open. Best suited to students already comfortable in JavaScript.

There's a moment waiting for you in the [[hello-scene|Hello Scene]]: the classic ~15-line starter has you hand-write the loop every other engine hides. Remember that moment in Week 3.

*Install steps: [[install-checklists|Install Checklists]] · 2D-in-the-browser alternative: [[honorable-mentions|Phaser]]*
