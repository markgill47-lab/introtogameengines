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
    }
  }
};
