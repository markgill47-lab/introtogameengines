# Exercise 2: The Scoreboard (20 minutes)

A HUD that reads the facts, sixty times a second.

1. Create a Canvas. Add a health bar: an Image set to **Filled** mode (a solid rectangle sprite works fine), plus a background rectangle behind it. Add a gold label (TextMeshPro).
2. One script, whose only job is converting facts to pixels:

```csharp
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class HudController : MonoBehaviour
{
    public GameState state;
    public Image healthFill;
    public TMP_Text goldLabel;

    void Update()
    {
        healthFill.fillAmount = state.health / state.maxHealth;
        goldLabel.text = "Gold: " + state.gold;
    }
}
```

3. Play. Take damage, collect gold, watch the glass tell the truth.

Then deliver the scheduled line, out loud, for your future video and your future self:

> **"This HUD asks sixty times a second whether anything changed. Week 11 fixes that, and this script is the one it fixes."**

The debt is real, the receipt is filed, and Assignment 9 will collect it.

4. Notice the one-way street while it's fresh. `HudController` reads state and writes pixels. It has no `TakeDamage` calls, no gold math, no opinions.

If you feel the urge to put game logic here because the reference is handy, **that urge is the whole reason Week 6 exists.** The convenience is real. So is the bill.

*Next: [[the-circuit|Exercise 3: The Circuit]].*
