# Exercise 3: The Circuit (25 minutes)

Start screen → playing → death → restart, plus pause, plus this week's scheduled trap.

1. Add three panels under the canvas: `StartPanel` ("click to play"), `PausePanel`, `GameOverPanel` (with a Restart button). A tiny flow controller toggles them:

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameFlow : MonoBehaviour
{
    public GameState state;
    public GameObject startPanel, pausePanel, gameOverPanel;
    bool started = false;

    void Start()
    {
        Time.timeScale = 0f;            // world holds still behind the start screen
        startPanel.SetActive(true);
    }

    public void BeginGame()             // wired to the start button
    {
        started = true;
        startPanel.SetActive(false);
        Time.timeScale = 1f;
    }

    void Update()
    {
        if (started && Input.GetKeyDown(KeyCode.Escape) && !state.isGameOver)
        {
            state.isPaused = !state.isPaused;
            pausePanel.SetActive(state.isPaused);
            Time.timeScale = state.isPaused ? 0f : 1f;
        }
        if (state.isGameOver && !gameOverPanel.activeSelf)
            gameOverPanel.SetActive(true);
    }

    public void Restart()               // wired to the restart button
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

2. **Run the full circuit twice:** start → play → take fatal damage → game over → restart → play again.

Twice matters. The second lap is the one that catches leftover state, and [[a4-spec|Requirement 3]] requires both laps on camera.

## The scheduled trap, walked into on purpose

3. Pause the game, then restart *from paused* (add a Restart button to the pause panel, or just call it).

The fresh scene arrives frozen. Start screen up, world dead, nothing responding, because of the time scale you never reset.

Diagnose it out loud, then fix it: `Time.timeScale = 1f` at the top of `Restart()`. Our `Start()` immediately re-freezes for the start screen, which is fine. The point is that **no scene ever inherits a stale clock.**

Every student ships this bug once. You just shipped it in the cheap week. ([[frozen-clock|The Frozen Clock]] lets you spring it without writing any code, if you want to see it twice.)

## One moment of foreshadowing

4. Sit with the flow controller's shape for a second. Two booleans, a `started` flag, and if-statements guarding each other.

It works. It is also visibly *about* to stop scaling. Add a settings screen, a cutscene, and a shop, then count the guards you'd need and how many illegal combinations become representable.

File the feeling. Week 10 is its appointment.

*Next: [[floating-bar|Exercise 4: The Floating Bar]].*
