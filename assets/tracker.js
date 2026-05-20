(function () {
  'use strict';

  var KEY_START = 'getfit_start_date';
  var KEY_SKIPS = 'getfit_skips';

  // Day 1-5 = Mon-Fri. Index matches getDay() (1=Mon … 5=Fri).
  var DAY_NAMES = ['', 'Push', 'Pull', 'Legs', 'Upper', 'Lower'];
  var DAY_SUBS  = ['', 'Chest & Shoulders', 'Back & Biceps', 'Quads & Hamstrings', 'Shoulders & Arms', 'Deadlift & Glutes'];
  var WEEKDAYS  = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  function wKey(d, e, s) { return 'getfit_day' + d + '_' + e + '_set' + s + '_weight'; }
  function cKey(d, e, s) { return 'getfit_day' + d + '_' + e + '_set' + s + '_checked'; }

  function todayISO() { return new Date().toISOString().slice(0, 10); }

  function getStart() {
    var v = localStorage.getItem(KEY_START);
    if (!v) { v = todayISO(); localStorage.setItem(KEY_START, v); }
    return v;
  }

  function getSkips() {
    try { return JSON.parse(localStorage.getItem(KEY_SKIPS) || '[]'); }
    catch (_) { return []; }
  }

  function saveSkips(arr) { localStorage.setItem(KEY_SKIPS, JSON.stringify(arr)); }

  // Returns 1-5 for Mon-Fri, null for Sat/Sun.
  // If today is already skipped, returns the NEXT workday number so the
  // index highlights tomorrow's workout instead.
  function todayWorkoutDay() {
    var dow = new Date().getDay(); // 0=Sun 1=Mon … 5=Fri 6=Sat
    if (dow === 0 || dow === 6) return null; // weekend rest
    if (getSkips().indexOf(todayISO()) !== -1) {
      return dow >= 5 ? 1 : dow + 1; // skipped — show next workday
    }
    return dow; // Mon=1=Push … Fri=5=Lower
  }

  function skipDate(iso) {
    var skips = getSkips();
    if (skips.indexOf(iso) === -1) { skips.push(iso); saveSkips(skips); }
  }

  function resetSchedule() {
    saveSkips([]);
    localStorage.removeItem(KEY_START);
  }

  // ── Set log rendering ─────────────────────────────────────────────────────

  function renderSetLogs() {
    var logs = document.querySelectorAll('.set-log');
    for (var i = 0; i < logs.length; i++) {
      var el   = logs[i];
      var day  = el.dataset.day;
      var ex   = el.dataset.exercise;
      var sets = parseInt(el.dataset.sets || '3', 10);
      var reps = el.dataset.reps || '';

      var title = document.createElement('p');
      title.className = 'set-log-title';
      title.textContent = 'Set Log — track your weights';
      el.appendChild(title);

      var rows = document.createElement('div');
      rows.className = 'set-rows';

      for (var s = 1; s <= sets; s++) {
        var wk     = wKey(day, ex, s);
        var ck     = cKey(day, ex, s);
        var savedW = localStorage.getItem(wk) || '';
        var isDone = localStorage.getItem(ck) === 'true';

        var row = document.createElement('div');
        row.className = 'set-row' + (isDone ? ' done' : '');

        var cb = document.createElement('input');
        cb.type = 'checkbox'; cb.checked = isDone;
        cb.setAttribute('aria-label', 'Mark set ' + s + ' complete');
        (function (row, ck, cb, card) {
          cb.addEventListener('change', function () {
            localStorage.setItem(ck, String(cb.checked));
            row.classList.toggle('done', cb.checked);
            checkCardDone(card);
          });
        })(row, ck, cb, el.closest('.exercise-card'));

        var num = document.createElement('span');
        num.className = 'set-num'; num.textContent = 'Set ' + s;

        var rl = document.createElement('span');
        rl.className = 'set-reps-lbl'; rl.textContent = reps ? reps + ' reps' : '';

        var wWrap = document.createElement('div');
        wWrap.className = 'weight-wrap';

        var wIn = document.createElement('input');
        wIn.type = 'number'; wIn.value = savedW; wIn.placeholder = '0';
        wIn.setAttribute('aria-label', 'Weight in lbs for set ' + s);
        (function (wk, wIn) {
          wIn.addEventListener('input', function () { localStorage.setItem(wk, wIn.value); });
        })(wk, wIn);

        var unit = document.createElement('span');
        unit.className = 'unit'; unit.textContent = 'lbs';

        wWrap.appendChild(wIn); wWrap.appendChild(unit);
        row.appendChild(cb); row.appendChild(num); row.appendChild(rl); row.appendChild(wWrap);
        rows.appendChild(row);
      }
      el.appendChild(rows);
      checkCardDone(el.closest('.exercise-card'));
    }
  }

  function checkCardDone(card) {
    if (!card) return;
    var boxes = card.querySelectorAll('input[type="checkbox"]');
    var all = boxes.length > 0;
    for (var i = 0; i < boxes.length; i++) { if (!boxes[i].checked) { all = false; break; } }
    card.classList.toggle('completed', all);
  }

  // ── Skip button (day pages) ───────────────────────────────────────────────

  function bindSkipButton() {
    var btn    = document.getElementById('btn-skip');
    var notice = document.getElementById('skip-notice');
    if (!btn) return;

    var dow = new Date().getDay();
    var skips = getSkips();
    var alreadySkipped = skips.indexOf(todayISO()) !== -1;

    if (alreadySkipped) {
      btn.disabled = true;
      btn.textContent = '✓ Already skipped today';
    }

    btn.addEventListener('click', function () {
      skipDate(todayISO());
      btn.disabled = true;
      btn.textContent = '✓ Skipped';
      if (notice) {
        var skippedDay  = DAY_NAMES[dow]  || 'today\'s workout';
        var nextDow     = dow >= 5 ? 1 : dow + 1;
        var nextName    = DAY_NAMES[nextDow]  || '';
        var nextWeekday = WEEKDAYS[nextDow] || 'tomorrow';
        notice.textContent = skippedDay + ' skipped — next up: ' + nextName + ' (' + nextWeekday + ')';
        notice.classList.add('show');
      }
    });
  }

  function bindResetButton() {
    var btn = document.getElementById('btn-reset');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (confirm('Reset your schedule? This restarts from today.')) {
        resetSchedule(); location.reload();
      }
    });
  }

  // ── Index page ────────────────────────────────────────────────────────────
  // Minimal init — full index logic lives in workouts/index.html inline script.

  function initIndex() {
    var day   = todayWorkoutDay();
    var cards = document.querySelectorAll('.day-card[data-day]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (day !== null && parseInt(card.dataset.day) === day) {
        card.classList.add('today');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSetLogs();
    bindSkipButton();
    bindResetButton();
    initIndex();
  });

  // Public API
  window.GetFit = {
    skipDate      : skipDate,
    skipToday     : function () { skipDate(todayISO()); },
    resetSchedule : resetSchedule,
    todayDay      : todayWorkoutDay,
    dayName       : function (n) { return DAY_NAMES[n] || ''; },
    daySub        : function (n) { return DAY_SUBS[n]  || ''; }
  };
}());
