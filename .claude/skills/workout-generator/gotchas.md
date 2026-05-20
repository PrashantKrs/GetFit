# Workout Generator — Gotchas Log

## data-sets mismatch
**Failure:** `.set-log` rendered 3 rows but the exercise header said “4 × 6-8”
**Fix:** Always sync `data-sets` on `.set-log` with the set count in `exercise-meta`

## Substitutes section omitted
**Failure:** Created an exercise card without `<details class="substitutes">`
**Fix:** Every card needs a substitutes section — it’s the equipment-sub feature’s entry point

## Inline styles added
**Failure:** Used `style="color: red"` to highlight a value
**Fix:** Only use CSS classes from `assets/style.css`. Use `.text-accent`, `.text-muted`, `.text-sm`

## ExRx link missing
**Failure:** Used a YouTube link or no demo link at all
**Fix:** Always find the ExRx.net page for the specific exercise. Format:
`<a href="https://exrx.net/WeightExercises/[Muscle]/[ExerciseName]" target="_blank" rel="noopener">Watch demo on ExRx ↗</a>`

## Session over 45 minutes
**Failure:** Added a 6th exercise without checking time budget
**Fix:** Use the time formula: (sets×52s) + (sets×rest_s) + (exercises×120s) ≤ 2700s
