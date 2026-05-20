(function () {
  'use strict';

  var KEY_START = 'getfit_start_date';
  var KEY_SKIPS = 'getfit_skips';
  var TOTAL_DAYS = 5; // Mon-Fri split

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

  function todayWorkoutDay() {
    var start = new Date(getStart() + 'T00:00:00');
    var now   = new Date(todayISO()  + 'T00:00:00');
    var calDays = Math.floor((now - start) / 86400000);
    var effective = Math.max(0, calDays - getSkips().length);
    return (effective % TOTAL_DAYS) + 1;
  }

  function skipDate(iso) {
    var skips = getSkips();
    if (skips.indexOf(iso) === -1) { skips.push(iso); saveSkips(skips); }
  }

  function resetSchedule() {
    localStorage.setItem(KEY_START, todayISO());
    saveSkips([]);
  }

  // Render set log rows inside every .set-log element
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
        var wk = wKey(day, ex, s);
        var ck = cKey(day, ex, s);
        var savedW  = localStorage.getItem(wk) || '';
        var isDone  = localStorage.getItem(ck) === 'true';

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

  function bindSkipButton() {
    var btn    = document.getElementById('btn-skip');
    var notice = document.getElementById('skip-notice');
    if (!btn) return;
    btn.addEventListener('click', function () {
      skipDate(todayISO());
      btn.disabled = true; btn.textContent = '✓ Skipped';
      if (notice) notice.classList.add('show');
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

  function initIndex() {
    var day  = todayWorkoutDay();
    var cards = document.querySelectorAll('.day-card[data-day]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (parseInt(card.dataset.day) === day) {
        card.classList.add('today');
        var lbl = document.createElement('span');
        lbl.className = 'today-lbl'; lbl.textContent = "Today's Workout";
        card.prepend(lbl);
      }
    }
    var fill = document.getElementById('progress-fill');
    var lbl2 = document.getElementById('progress-lbl');
    if (fill) fill.style.width = ((day / TOTAL_DAYS) * 100) + '%';
    if (lbl2) lbl2.textContent = 'Week progress: Day ' + day + ' of ' + TOTAL_DAYS;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSetLogs();
    bindSkipButton();
    bindResetButton();
    initIndex();
  });

  // Public API — use from browser console or Claude can inject via script tag
  window.GetFit = {
    skipDate: skipDate,
    skipToday: function () { skipDate(todayISO()); },
    resetSchedule: resetSchedule,
    todayDay: todayWorkoutDay
  };
}());
