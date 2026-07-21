/* ============================================================
 * SE 266 · The Free Library (Welcome and Resources) wiki
 * Manifest + widget data. Loaded by dynamic injection from the
 * shell. Articles are markdown files in res/articles/.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "res",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "The Free Library · Welcome and Resources",
  home: "home",

  /* sibling wikis at the content root, for [[peer:article|label]] links */
  peers: {
    res: "The Free Library.html",
    w01: "Week 01 - Engines, Anatomy, and Choosing Yours.html",
    w02: "Week 02 - Scene Graphs, Transforms, and Coordinate Spaces.html",
    w03: "Week 03 - The Game Loop, Time, and Input.html",
    w05: "Week 05 - Physics, Collision, and Authority.html"
  },

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "The Free Library" },
      { id: "wheres-the-textbook", title: "Where's the Textbook?" }
    ]},
    { name: "The Core Stack", articles: [
      { id: "nystrom", title: "Game Programming Patterns" },
      { id: "pcg-book", title: "Procedural Content Generation in Games" },
      { id: "ai-and-games", title: "Artificial Intelligence and Games" },
      { id: "mda", title: "The MDA Paper" },
      { id: "2dgd", title: "2D Game Development: From Zero To Hero" }
    ]},
    { name: "The Reference Shelf", articles: [
      { id: "red-blob", title: "Red Blob Games" },
      { id: "gamemath", title: "3D Math Primer" },
      { id: "gaffer", title: "Gaffer On Games" },
      { id: "godot-docs", title: "Godot's Documentation" }
    ]},
    { name: "Deeper Water", articles: [
      { id: "shaders", title: "Shaders" },
      { id: "pbr", title: "PBR Materials" },
      { id: "ik", title: "Inverse Kinematics" },
      { id: "game-feel", title: "Game Feel, On Video" },
      { id: "lague", title: "Sebastian Lague" }
    ]},
    { name: "The Map", articles: [
      { id: "reading-by-week", title: "Reading by Week" }
    ]}
  ],

  /* no interactive widgets in this wiki: it is a library, not a lab */
  widgets: {}
};
