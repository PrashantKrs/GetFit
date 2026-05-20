---
name: schedule-manager
description: Manage skipped workouts and reschedule the 5-day weekday program
triggers:
  - user says they skipped a workout or missed a day
  - user says "I skipped Monday" or similar
  - user wants to reset or restart their schedule
  - user asks what day they should do today
  - user wants to see their current progress in the plan
---

# Schedule Manager Skill

## How the Schedule Works
- The app tracks `getfit_start_date` and `getfit_skips` in browser localStorage
- `todayWorkoutDay()` = `(calendarDays - skips.length) % 5 + 1`
- Pressing **Skip Today** on any workout page pushes today’s ISO date to `getfit_skips`
- The index page auto-highlights today’s card based on this calculation

## When User Reports a Skip in Chat

If user says “I skipped Monday” (and today is not Monday):
1. Calculate the ISO date of that day (e.g., “2026-05-18”)
2. Tell the user to run this in their browser console on any GetFit page:
   ```javascript
   GetFit.skipDate("2026-05-18");
   ```
3. Tell them to refresh `workouts/index.html` to see the updated schedule

If user says “I skipped today”:
```javascript
GetFit.skipToday();
```

If user wants to **reset everything and start fresh from today**:
```javascript
GetFit.resetSchedule();
```

## Schedule Rules
- **Weekends are always rest** — skipping a Saturday/Sunday has no effect on the plan
- The plan cycles: Day 1 → 2 → 3 → 4 → 5 → 1 → ...
- Skips accumulate indefinitely — the plan doesn’t “miss” days, it just shifts
- Each week is Mon Push / Tue Pull / Wed Legs / Thu Upper / Fri Lower (ideally)
