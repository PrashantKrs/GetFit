# GetFit

## What This Is
Self-contained HTML/CSS/JS workout artifacts for a lean hypertrophy program.
Goal: 134 lb → 150+ lb in 6 months, building visible muscle mass and size.
No backend, no build step, no framework. Open any HTML file in a browser.

## Schedule
- **Monday–Friday** workouts only (45 min, 9:30–10:15 am)
- **Weekends** = full rest
- 5-day split: Push / Pull / Legs / Upper / Lower

## User Profile
- Weight: 134 lb → 150+ lb | Experience: Intermediate | Equipment: Full commercial gym
- Goal: Hypertrophy — look big and muscular (aesthetic muscle gain, not just strength)

## File Map
```
workouts/
  index.html          weekly schedule
  day1-push.html      Mon — Chest, Shoulders, Triceps
  day2-pull.html      Tue — Back, Biceps, Forearms
  day3-legs.html      Wed — Quads, Hamstrings, Calves
  day4-upper.html     Thu — Shoulders, Arms (2nd hit)
  day5-lower.html     Fri — Deadlift, Glutes, Calves, Core
nutrition/
  calorie-targets.html  TDEE math, source of truth
  meal-templates.html   meal plan templates
assets/
  style.css  tracker.js  *.svg
```

## HTML Conventions
- `<!DOCTYPE html>` + semantic HTML5 (article, section, figure, details)
- 2-space indent, no inline styles
- Stylesheet: `<link rel="stylesheet" href="../assets/style.css">`
- Tracker: `<script src="../assets/tracker.js"></script>` at end of body

## Exercise Card Pattern
```html
<article class="exercise-card" data-day="1" data-exercise="bench-press" data-sets="4" data-reps="6-8">
  <div class="exercise-header">
    <h3>Barbell Bench Press</h3>
    <span class="exercise-meta">4 × 6-8 reps · 2.5 min rest</span>
  </div>
  <div class="exercise-body">
    <figure class="exercise-demo">
      <img src="../assets/exercise-placeholder.svg"
           alt="Barbell Bench Press — lower to mid-chest in 3s, press explosively"
           loading="lazy">
      <figcaption><a href="https://exrx.net/WeightExercises/PectoralMajor/BBBenchPress" target="_blank" rel="noopener">Watch demo on ExRx ↗</a></figcaption>
    </figure>
    <div class="exercise-info">
      <div class="muscles-line"><span class="label">Muscles</span>🟢 Chest · 🔵 Anterior Delt · 🔵 Tricep</div>
      <p class="cue">3-second eccentric. Squeeze chest at the top.</p>
    </div>
  </div>
  <details class="substitutes">
    <summary>Equipment not available? See alternatives</summary>
    <div class="substitutes-body">
      <div class="sub-item"><strong>Dumbbell Bench Press</strong><span>Same movement, greater ROM. Same sets/reps.</span></div>
    </div>
  </details>
  <div class="set-log" data-day="1" data-exercise="bench-press" data-sets="4" data-reps="6-8"></div>
</article>
```

## localStorage Key Spec
```
getfit_start_date                            → ISO date ("2026-05-18")
getfit_skips                                 → JSON array of ISO dates
getfit_day{N}_{exercise-slug}_set{M}_weight  → number string (lbs)
getfit_day{N}_{exercise-slug}_set{M}_checked → "true"|"false"
```

## GIF / Demo Rules
- Image src: always `../assets/exercise-placeholder.svg` (reliable fallback)
- Always add ExRx link below image for the actual demo video
- Never use Giphy, YouTube embeds, or third-party CDNs

## Equipment Substitution
Every exercise card includes a `<details class="substitutes">` with 2-3 alternatives.
When user reports unavailable equipment in chat, Claude references this section and
provides a personalized substitute based on what IS available.

## Nutrition Source of Truth
Macros defined in `nutrition/calorie-targets.html` — never duplicate hardcoded values.
- Workout days (Mon–Fri): **2,986 kcal** | 154g P / 326g C / 119g F
- Rest days (Sat–Sun): **2,786 kcal** | 154g P / 271g C / 121g F

## Color Theme
```
--bg: #0f0f0f    --surface: #1a1a1a    --border: #2d2d2d
--text: #e5e5e5  --muted: #9ca3af
--accent: #22c55e (green)  --accent2: #3b82f6 (blue)  --danger: #ef4444
```

## Hypertrophy Philosophy
- 6-12 reps for compounds, 12-20 for isolation/pump finishers
- 3-second eccentric on every lift (time under tension builds mass)
- Mind-muscle connection cues in every exercise card
- Progressive overload: +5 lb when you hit top of rep range for all sets

## Commands
- `/workout` — generate or update a workout day HTML artifact
