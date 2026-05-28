/* Miero — site interactivity
   - Live open/closed pill (Pacific Time)
   - Menu tabs with URL hash sync
   - Header scroll states (over dark hero / scrolled)
   - Mobile drawer
   - Smooth in-view fade for sections
*/
(function () {
  'use strict';

  // ---- Hours: Mon-Thu + Sun 7am–10pm, Fri-Sat 7am–11pm ----
  function getOpenStatus(now) {
    // now is a JS Date; we want Pacific Time
    // 0=Sun, 1=Mon, ... 6=Sat
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'short',
      hour: 'numeric', minute: 'numeric', hour12: false
    });
    const parts = formatter.formatToParts(now);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
    const dayMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
    const day = dayMap[map.weekday];
    const hour = parseInt(map.hour, 10);
    const minute = parseInt(map.minute, 10);
    const mins = hour * 60 + minute;

    const lateNight = (day === 5 || day === 6); // Fri or Sat
    const openMin = 7 * 60;
    const closeMin = lateNight ? 23 * 60 : 22 * 60;
    const closeHour = lateNight ? 11 : 10;

    const isOpen = mins >= openMin && mins < closeMin;
    return {
      isOpen,
      closesAt: closeHour + 'pm',
      opensAt: '7am'
    };
  }

  function updatePill() {
    const pills = document.querySelectorAll('[data-open-pill]');
    if (!pills.length) return;
    const status = getOpenStatus(new Date());
    pills.forEach(pill => {
      if (status.isOpen) {
        pill.classList.remove('open-pill--closed');
        pill.querySelector('[data-pill-text]').textContent = 'Open until ' + status.closesAt;
      } else {
        pill.classList.add('open-pill--closed');
        pill.querySelector('[data-pill-text]').textContent = 'Opens ' + status.opensAt;
      }
    });
  }
  updatePill();
  setInterval(updatePill, 60 * 1000);

  // ---- Highlight today's row in hours table ----
  (function highlightToday() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles', weekday: 'short'
    });
    const today = formatter.format(new Date()); // "Mon"
    document.querySelectorAll('[data-day]').forEach(row => {
      const days = row.getAttribute('data-day').split(',');
      if (days.includes(today)) {
        row.classList.add('hours__row--today');
        const tag = row.querySelector('[data-today-tag]');
        if (tag) tag.style.display = 'inline';
      }
    });
  })();

  // ---- Menu tabs ----
  (function tabs() {
    const tabBtns = document.querySelectorAll('[data-tab]');
    const panels  = document.querySelectorAll('[data-panel]');
    function activate(key) {
      tabBtns.forEach(b => {
        const on = b.dataset.tab === key;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(p => {
        p.classList.toggle('is-active', p.dataset.panel === key);
      });
    }
    tabBtns.forEach(b => {
      b.addEventListener('click', () => activate(b.dataset.tab));
    });
    // default
    activate('signatures');
  })();

  // ---- Header scroll states ----
  (function header() {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    if (!header || !hero) return;

    function update() {
      const scrollY = window.scrollY;
      const heroBottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle('is-scrolled', scrollY > 20);
      header.classList.toggle('is-over-dark', heroBottom > 80);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  })();

  // ---- Drawer ----
  (function drawer() {
    const openBtn = document.querySelector('[data-drawer-open]');
    const closeBtn = document.querySelector('[data-drawer-close]');
    const drawer = document.querySelector('[data-drawer]');
    const backdrop = document.querySelector('[data-drawer-backdrop]');
    if (!openBtn || !drawer) return;
    function open() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  })();

  // ---- In-view fade: handled by animations.js (GSAP + ScrollTrigger) ----
  // No-op fallback for environments where GSAP fails to load: ensure
  // [data-reveal] is still visible.
  window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  });
})();
