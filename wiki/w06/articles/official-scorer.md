# Exercise 1: The Official Scorer (15 minutes)

A `GameState` object that owns the facts.

Build onto your valley scene. Your [[w05:the-matrix|Week 5 target range]] supplies convenient sources of damage.

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

## Read what is and is not in there

Note what this script contains: facts, and the legal ways to change them.

Note what it doesn't contain: a single mention of text, bars, panels, or colors.

**This file wouldn't need to change if your game were a text adventure.** That's the test it will be held to all semester, and it is the fastest way to check your own work. Open your state script and look for the word "UI." If it's there, something is in the wrong file.

2. Wire some sources. Your [[w05:silent-gate|Week 5 trigger arch]] calls `AddGold(5)`. Falling crates or a debug key (`K` for "ouch, 10 damage") call `TakeDamage`.

Sources ask the scorer. Nobody edits the book directly.

*Next: [[scoreboard-hud|Exercise 2: The Scoreboard]].*
