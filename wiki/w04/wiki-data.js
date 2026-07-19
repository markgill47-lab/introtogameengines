/* ============================================================
 * SE 266 · Week 04 wiki: manifest + widget data
 * Loaded by dynamic injection from the shell. Articles are
 * markdown files in w04/articles/, fetched by the shell.
 * ============================================================ */
window.SE266_WIKI = {

  weekId: "w04",
  courseTitle: "SE 266 · Intro to Game Engines",
  weekTitle: "Week 04 · Design Vocabulary, What Makes Games Games",
  home: "home",

  /* sibling wikis at the content root, for [[peer:article|label]] links */
  peers: {
    res: "The Free Library.html",
    w01: "Week 01 - Engines, Anatomy, and Choosing Yours.html",
    w02: "Week 02 - Scene Graphs, Transforms, and Coordinate Spaces.html",
    w03: "Week 03 - The Game Loop, Time, and Input.html",
    w04: "Week 04 - Design Vocabulary, What Makes Games Games.html"
  },

  sections: [
    { name: "Start Here", articles: [
      { id: "home", title: "Week 4 Overview" }
    ]},
    { name: "Concepts", articles: [
      { id: "start-with-a-joke", title: "Start with a Joke" },
      { id: "core-loop", title: "The Core Loop" },
      { id: "mda", title: "MDA: Mechanics, Dynamics, Aesthetics" },
      { id: "player-promises", title: "Player Promises" },
      { id: "bartle", title: "Bartle's Taxonomy" },
      { id: "verbs-resources-feedback", title: "Verbs, Resources, Feedback Loops" },
      { id: "genre-tour", title: "The Genre Tour" },
      { id: "malicious-design", title: "Malicious Design" },
      { id: "scope", title: "Scope: Small, Finished, Polished" }
    ]},
    { name: "Supplemental", articles: [
      { id: "promise-grid", title: "The Promise Grid" }
    ]},
    { name: "Practice", articles: [
      { id: "playing-analytically", title: "How to Play Analytically" },
      { id: "the-workshop", title: "The Deconstruction Workshop" },
      { id: "tetris-deconstruction", title: "Worked Example: Tetris" },
      { id: "a12-template", title: "The Assignment 12 Template" }
    ]},
    { name: "This Week", articles: [
      { id: "this-weeks-work", title: "This Week's Work" }
    ]},
    { name: "Check Yourself", articles: [
      { id: "check-yourself", title: "Check Yourself" }
    ]}
  ],

  widgets: {

    quiz: [
      { q: "What is a core loop?",
        options: ["The main storyline of a game", "The small cycle of actions a player repeats for the whole runtime, usually 5 to 30 seconds", "The rendering loop the engine runs each frame", "The final boss encounter"],
        correct: 1,
        explain: "Every game has a small cycle the player runs thousands of times. If the loop is satisfying, the game survives a lot of other flaws; if it is dull, no cutscene or skill tree rescues it. It is the first sentence of any design doc." },
      { q: "In MDA, who owns which end?",
        options: ["The designer owns aesthetics; the player owns mechanics", "The designer writes mechanics (rules); the player experiences aesthetics (feelings); dynamics is the misty middle where they negotiate", "Mechanics and aesthetics are the same layer", "The engine owns all three"],
        correct: 1,
        explain: "The designer works at the mechanics end, the player lives at the aesthetics end, and neither can touch the other's layer directly. That is why playtesting is not optional: your head is not where the dynamics happen." },
      { q: "A playtester says the game 'feels grindy.' How does the MDA trace run?",
        options: ["Grindy is an aesthetic; ignore it, feelings aren't data", "Feeling (grindy) to behavior (repeating the same safe action because it pays too well) to rule (the gold reward is a number in a file you can change)", "Add more content until it stops feeling grindy", "Rewrite the story"],
        correct: 1,
        explain: "The fundamental move of game design runs backward: from the aesthetic complaint, to the dynamic causing it, to the mechanic underneath. Assignment 12 grades whether you can perform this trace on someone else's game." },
      { q: "What is a positive feedback loop?",
        options: ["A loop that makes players feel good", "When winning makes winning easier: it creates momentum, blowouts, and ends games", "When losing gives you help to catch up", "Any loop the player enjoys"],
        correct: 1,
        explain: "Positive loops (Monopoly's rich-get-richer, an RTS economy snowball) create momentum and end games. Negative loops (Mario Kart's blue shell, rubber-band AI) create comebacks and keep games close. Most balance complaints are feedback-loop complaints." },
      { q: "What is Tetris's central resource?",
        options: ["Points", "Board space: every placement spends it, every cleared line refunds it", "Lives", "The next piece"],
        correct: 1,
        explain: "Almost nobody names it on the first try. Tetris's real resource is board space, and you manage a shrinking budget the whole game. Resource analysis reveals structure that themes hide: follow the resources and you find the actual game under the art." },
      { q: "How many verbs does Tetris have, and what school of design does that put it in?",
        options: ["Fourteen; the many-loose school", "Four (shift, rotate, drop, hold); the few-verbs-deeply-explored school", "One; too simple to analyze", "Zero; it plays itself"],
        correct: 1,
        explain: "Count a game's verbs and you know its shape. A tight game has few verbs deeply explored; a sprawling game has many loosely explored. A design doc that lists fourteen verbs for a one-semester project has already failed." },
      { q: "Your dream game has fourteen verbs. What's the move?",
        options: ["Build all fourteen; ambition is good", "Design the smallest version that still produces the aesthetic you're chasing, and build that. Small, finished, and polished beats big and broken", "Cut it to exactly seven verbs", "Add a fifteenth so it feels complete"],
        correct: 1,
        explain: "Every student proposal is too big, all of them. If the tension comes from being chased in the dark, you need one dark hallway and one chaser, not a mansion. You can always add the mansion; nobody has subtracted one in finals week." },
      { q: "A game teaches you that stealth is the way, then forces a loud mandatory boss fight the player cannot avoid. Why does this read as 'unfair' even when the fight is winnable?",
        options: ["It isn't unfair; the player is just bad at combat", "It broke a player promise: the game taught one approach, then punished the player for using it. The unfairness traces back through the contradiction to the rule that broke the earlier rule", "Boss fights are always unfair", "The difficulty was set too high"],
        correct: 1,
        explain: "That 'this feels cheap' reaction is almost always a broken promise. Most of design from the player's side is promise management: know what you are promising, keep it, and do not promise what your scope cannot cash." },
      { q: "You pre-order a game you have never seen played, on the strength of the studio's name alone. What did you actually buy?",
        options: ["The game itself", "A promise, backed by the studio's whole back catalog as collateral: player promises start before you install, made by the studio, the franchise name, the trailer, and the tags on the store page", "Nothing; pre-orders are irrational", "A refund waiting to happen"],
        correct: 1,
        explain: "The contract begins before the title screen. Pre-purchase promises are also the easiest to break, because the studio makes them to sell and the game has to keep them to satisfy. A pitch deck is that whole layer, formalized: promises exciting enough to greenlight and honest enough to ship." },
      { q: "In Bartle's taxonomy, what are the two axes that define the four player types?",
        options: ["Casual vs. hardcore, and single vs. multiplayer", "Acting vs. interacting, and the world vs. other players: Achievers act on the world, Explorers interact with the world, Killers act on players, Socializers interact with players", "Skill vs. luck, and offense vs. defense", "Winning vs. losing, and fast vs. slow"],
        correct: 1,
        explain: "Achievers want completion, Explorers want to understand, Socializers want the people, Killers want to win against a human. It is a lens not a law, nobody is one type, and its real use is a design check: which types am I serving, and is that on purpose?" },
      { q: "A free-to-play game is generous for its first few hours, then hits you with a daily energy cap you can skip for $10. What is this, in the vocabulary of this week?",
        options: ["Good onboarding: it respects the player's time", "MDA weaponized: the same mechanics tuned to produce compulsion instead of fun, manufacturing a pain (the wall) so it can sell the cure (the chest)", "A negative feedback loop that keeps the game fair", "Just pay-to-win, which is harmless"],
        correct: 1,
        explain: "The onboarding generosity was a loan; the wall is the collection. The tell of malicious design is how the game answers 'how do I get out of this pressure': an honest game says get better, a malicious one says get out your card." },
      { q: "What separates an honest loop of doom (Tetris) from a malicious one (a gacha game)?",
        options: ["Nothing; both are just difficulty", "In Tetris every escape from the spiral is skill you earned; in the malicious version the escape is your wallet, and the 'skill' being sold is a payment method", "Tetris is harder", "The malicious one has better graphics"],
        correct: 1,
        explain: "Both run a loop of doom, but one is honest and one is not. The line for your own designs is consent: are you producing an experience the player would thank you for, or manufacturing a behavior they would switch off if the game let them?" },
      { q: "Why is 'malicious design' in a design-vocabulary week and not a rant blog?",
        options: ["To scare students away from making games", "Because you are about to learn to build these exact mechanics (feedback loops, variable rewards, progression gates); they work, that is the danger, and naming the patterns is how you choose to build for the player who would thank you", "It isn't; it should be removed", "Because all monetization is evil"],
        correct: 1,
        explain: "The knife that carves your dinner is the knife that could do the other thing. The line is not the mechanic, it is consent. A game designed around an aesthetic the player consents to does not need a wall, a clock, or a chest; it needs to be good, and then to end." },
      { q: "Why is the core loop 'load-bearing'?",
        options: ["It uses the most CPU", "The player runs it thousands of times, so if it is dull, nothing bolted on top rescues it", "It holds up the game's physics", "It determines the frame rate"],
        correct: 1,
        explain: "Tetris has no story, no characters, and no ending, and it outsold most things with all three, because its seven-second loop is satisfying. No open world is beautiful enough to save a boring seven seconds repeated four thousand times." }
    ],

    checklist: {
      items: [
        { id: "catchup", label: "Catch up: Assignment 1 and Assignment 2 submitted, or resubmitted if they came back", optional: false },
        { id: "workshop", label: "Attend or watch the deconstruction workshop (remote students: post your template plus two replies)", optional: false },
        { id: "analytical", label: "Run the analytical-play method on one game you're already playing anyway", optional: false },
        { id: "shortlist", label: "Shortlist two candidate games for Assignment 12 and write each core loop in one sentence", optional: false },
        { id: "mda-paper", label: "Read the MDA paper (five pages) before Assignment 12", optional: true }
      ],
      note: "A personal tracker only: this browser, not the gradebook. No new assignment is paced this week; it is a catch-up week for Assignment 1 and Assignment 2. Everything here is a dress rehearsal for Assignment 12, which you present in Week 15 on a game you choose."
    },

    promisegrid: {
      axes: [
        { id: "d", label: "What you do", cells: [
          { id: "fight",   label: "Fight" },
          { id: "command", label: "Command" },
          { id: "explore", label: "Explore" },
          { id: "solve",   label: "Solve" }
        ]},
        { id: "w", label: "Who with", cells: [
          { id: "solo",    label: "Solo" },
          { id: "coop",    label: "Co-op" },
          { id: "versus",  label: "Versus" },
          { id: "massive", label: "Massive" }
        ]},
        { id: "s", label: "How it is shaped", cells: [
          { id: "campaign",   label: "Campaign" },
          { id: "persistent", label: "Persistent" },
          { id: "runbased",   label: "Run-based" },
          { id: "match",      label: "Match" }
        ]},
        { id: "f", label: "How it feels", cells: [
          { id: "mastery", label: "Mastery" },
          { id: "cozy",    label: "Cozy" },
          { id: "tension", label: "Tension" },
          { id: "power",   label: "Power" }
        ]}
      ],
      games: [
        { n: "Elden Ring",                      d: "fight",   w: "solo",    s: "persistent", f: "mastery" },
        { n: "Dark Souls III",                  d: "fight",   w: "solo",    s: "persistent", f: "mastery" },
        { n: "Sekiro",                          d: "fight",   w: "solo",    s: "campaign",   f: "mastery" },
        { n: "Bloodborne",                      d: "fight",   w: "solo",    s: "persistent", f: "mastery" },
        { n: "Hades",                           d: "fight",   w: "solo",    s: "runbased",   f: "mastery" },
        { n: "Dead Cells",                      d: "fight",   w: "solo",    s: "runbased",   f: "mastery" },
        { n: "Devil May Cry 5",                 d: "fight",   w: "solo",    s: "campaign",   f: "mastery" },
        { n: "God of War (2018)",               d: "fight",   w: "solo",    s: "campaign",   f: "power" },
        { n: "Doom (2016)",                     d: "fight",   w: "solo",    s: "campaign",   f: "power" },
        { n: "Vampire Survivors",               d: "fight",   w: "solo",    s: "runbased",   f: "power" },
        { n: "Path of Exile",                   d: "fight",   w: "solo",    s: "persistent", f: "power" },
        { n: "Resident Evil 4",                 d: "fight",   w: "solo",    s: "campaign",   f: "tension" },
        { n: "Cuphead",                         d: "fight",   w: "coop",    s: "campaign",   f: "mastery" },
        { n: "Diablo IV",                       d: "fight",   w: "coop",    s: "persistent", f: "power" },
        { n: "Destiny 2",                       d: "fight",   w: "coop",    s: "persistent", f: "power" },
        { n: "Borderlands 3",                   d: "fight",   w: "coop",    s: "campaign",   f: "power" },
        { n: "Left 4 Dead 2",                   d: "fight",   w: "coop",    s: "match",      f: "tension" },
        { n: "Counter-Strike 2",                d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Valorant",                        d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Overwatch 2",                     d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Rainbow Six Siege",               d: "fight",   w: "versus",  s: "match",      f: "tension" },
        { n: "Team Fortress 2",                 d: "fight",   w: "versus",  s: "match",      f: "power" },
        { n: "Halo Infinite",                   d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Street Fighter 6",                d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Super Smash Bros. Ultimate",      d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Tekken 8",                        d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Rocket League",                   d: "fight",   w: "versus",  s: "match",      f: "mastery" },
        { n: "Dead by Daylight",                d: "fight",   w: "versus",  s: "match",      f: "tension" },
        { n: "Mario Kart 8 Deluxe",             d: "fight",   w: "versus",  s: "match",      f: "power" },
        { n: "Call of Duty: Warzone",           d: "fight",   w: "massive", s: "match",      f: "tension" },
        { n: "Fortnite",                        d: "fight",   w: "massive", s: "match",      f: "tension" },
        { n: "Apex Legends",                    d: "fight",   w: "massive", s: "match",      f: "tension" },
        { n: "PUBG: Battlegrounds",             d: "fight",   w: "massive", s: "match",      f: "tension" },
        { n: "Escape from Tarkov",              d: "fight",   w: "massive", s: "match",      f: "tension" },
        { n: "StarCraft II",                    d: "command", w: "versus",  s: "match",      f: "mastery" },
        { n: "Age of Empires IV",               d: "command", w: "versus",  s: "match",      f: "mastery" },
        { n: "Clash Royale",                    d: "command", w: "versus",  s: "match",      f: "mastery" },
        { n: "EA Sports FC 24",                 d: "command", w: "versus",  s: "match",      f: "mastery" },
        { n: "Civilization VI",                 d: "command", w: "solo",    s: "match",      f: "mastery" },
        { n: "Into the Breach",                 d: "command", w: "solo",    s: "runbased",   f: "mastery" },
        { n: "Slay the Spire",                  d: "command", w: "solo",    s: "runbased",   f: "mastery" },
        { n: "Balatro",                         d: "command", w: "solo",    s: "runbased",   f: "power" },
        { n: "XCOM 2",                          d: "command", w: "solo",    s: "campaign",   f: "tension" },
        { n: "Fire Emblem: Three Houses",       d: "command", w: "solo",    s: "campaign",   f: "mastery" },
        { n: "Total War: Warhammer III",        d: "command", w: "solo",    s: "campaign",   f: "mastery" },
        { n: "Frostpunk",                       d: "command", w: "solo",    s: "campaign",   f: "tension" },
        { n: "Bloons TD 6",                     d: "command", w: "solo",    s: "match",      f: "tension" },
        { n: "Plants vs. Zombies",              d: "command", w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Cities: Skylines",                d: "command", w: "solo",    s: "persistent", f: "cozy" },
        { n: "Stardew Valley",                  d: "command", w: "solo",    s: "persistent", f: "cozy" },
        { n: "Animal Crossing: New Horizons",   d: "command", w: "solo",    s: "persistent", f: "cozy" },
        { n: "The Sims 4",                      d: "command", w: "solo",    s: "persistent", f: "cozy" },
        { n: "Two Point Hospital",              d: "command", w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Football Manager 2024",           d: "command", w: "solo",    s: "persistent", f: "mastery" },
        { n: "RimWorld",                        d: "command", w: "solo",    s: "persistent", f: "tension" },
        { n: "Oxygen Not Included",             d: "command", w: "solo",    s: "persistent", f: "tension" },
        { n: "Crusader Kings III",              d: "command", w: "solo",    s: "persistent", f: "tension" },
        { n: "Factorio",                        d: "command", w: "coop",    s: "persistent", f: "mastery" },
        { n: "Don't Starve Together",           d: "command", w: "coop",    s: "runbased",   f: "tension" },
        { n: "The Witcher 3",                   d: "explore", w: "solo",    s: "persistent", f: "power" },
        { n: "Skyrim",                          d: "explore", w: "solo",    s: "persistent", f: "power" },
        { n: "The Legend of Zelda: BOTW",       d: "explore", w: "solo",    s: "persistent", f: "power" },
        { n: "Tears of the Kingdom",            d: "explore", w: "solo",    s: "persistent", f: "power" },
        { n: "Red Dead Redemption 2",           d: "explore", w: "solo",    s: "persistent", f: "tension" },
        { n: "Cyberpunk 2077",                  d: "explore", w: "solo",    s: "persistent", f: "power" },
        { n: "Mass Effect 2",                   d: "explore", w: "solo",    s: "campaign",   f: "power" },
        { n: "Disco Elysium",                   d: "explore", w: "solo",    s: "campaign",   f: "tension" },
        { n: "Hollow Knight",                   d: "explore", w: "solo",    s: "persistent", f: "mastery" },
        { n: "Metroid Dread",                   d: "explore", w: "solo",    s: "persistent", f: "mastery" },
        { n: "Celeste",                         d: "explore", w: "solo",    s: "campaign",   f: "mastery" },
        { n: "Super Mario Odyssey",             d: "explore", w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Ori and the Will of the Wisps",   d: "explore", w: "solo",    s: "persistent", f: "mastery" },
        { n: "Outer Wilds",                     d: "explore", w: "solo",    s: "persistent", f: "tension" },
        { n: "Subnautica",                      d: "explore", w: "solo",    s: "persistent", f: "tension" },
        { n: "A Short Hike",                    d: "explore", w: "solo",    s: "persistent", f: "cozy" },
        { n: "Firewatch",                       d: "explore", w: "solo",    s: "campaign",   f: "tension" },
        { n: "Untitled Goose Game",             d: "explore", w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Amnesia: The Dark Descent",       d: "explore", w: "solo",    s: "campaign",   f: "tension" },
        { n: "Baldur's Gate 3",                 d: "explore", w: "coop",    s: "campaign",   f: "mastery" },
        { n: "It Takes Two",                    d: "explore", w: "coop",    s: "campaign",   f: "power" },
        { n: "Journey",                         d: "explore", w: "coop",    s: "campaign",   f: "cozy" },
        { n: "Terraria",                        d: "explore", w: "coop",    s: "persistent", f: "power" },
        { n: "Minecraft",                       d: "explore", w: "coop",    s: "persistent", f: "cozy" },
        { n: "No Man's Sky",                    d: "explore", w: "coop",    s: "persistent", f: "cozy" },
        { n: "Valheim",                         d: "explore", w: "coop",    s: "persistent", f: "tension" },
        { n: "Genshin Impact",                  d: "explore", w: "coop",    s: "persistent", f: "power" },
        { n: "Phasmophobia",                    d: "explore", w: "coop",    s: "match",      f: "tension" },
        { n: "World of Warcraft",               d: "explore", w: "massive", s: "persistent", f: "power" },
        { n: "Final Fantasy XIV",               d: "explore", w: "massive", s: "persistent", f: "power" },
        { n: "Old School RuneScape",            d: "explore", w: "massive", s: "persistent", f: "cozy" },
        { n: "Sea of Thieves",                  d: "explore", w: "massive", s: "persistent", f: "cozy" },
        { n: "Fall Guys",                       d: "explore", w: "massive", s: "match",      f: "cozy" },
        { n: "Tetris",                          d: "solve",   w: "solo",    s: "match",      f: "mastery" },
        { n: "The Witness",                     d: "solve",   w: "solo",    s: "persistent", f: "mastery" },
        { n: "Baba Is You",                     d: "solve",   w: "solo",    s: "campaign",   f: "mastery" },
        { n: "Return of the Obra Dinn",         d: "solve",   w: "solo",    s: "campaign",   f: "tension" },
        { n: "Inscryption",                     d: "solve",   w: "solo",    s: "runbased",   f: "tension" },
        { n: "Dorfromantik",                    d: "solve",   w: "solo",    s: "runbased",   f: "cozy" },
        { n: "Mini Metro",                      d: "solve",   w: "solo",    s: "match",      f: "cozy" },
        { n: "Wordle",                          d: "solve",   w: "solo",    s: "match",      f: "cozy" },
        { n: "2048",                            d: "solve",   w: "solo",    s: "match",      f: "cozy" },
        { n: "Candy Crush Saga",                d: "solve",   w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Unpacking",                       d: "solve",   w: "solo",    s: "campaign",   f: "cozy" },
        { n: "Portal 2",                        d: "solve",   w: "coop",    s: "campaign",   f: "mastery" },
        { n: "Human: Fall Flat",                d: "solve",   w: "coop",    s: "campaign",   f: "cozy" },
        { n: "Powerwash Simulator",             d: "solve",   w: "coop",    s: "campaign",   f: "cozy" },
        { n: "Among Us",                        d: "solve",   w: "versus",  s: "match",      f: "tension" },
        { n: "Jackbox Party Pack",              d: "solve",   w: "versus",  s: "match",      f: "cozy" },
        { n: "Tetris 99",                       d: "solve",   w: "massive", s: "match",      f: "tension" }
      ]
    }
  }
};
