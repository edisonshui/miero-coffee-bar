/* Miero — menu data
   Edit this array to update menu items. No other file changes needed.
   Tags: 'Best Seller' | 'Iced Only' | 'Hot or Iced' | 'Vegetarian' | 'Caffeinated'
*/
const MENU_DATA = [
  {
    id: 'signatures', name: 'Signatures', sub: 'Iced only',
    items: [
      { name: 'Toffee Miso',      desc: 'Espresso, vanilla syrup, milk, toffee miso cream top',          tags: ['Best Seller'] },
      { name: 'Vanilla Bean',     desc: 'Espresso, vanilla syrup, milk, vanilla cream top',              tags: [] },
      { name: 'Matcha Matcha',    desc: 'Ceremonial grade matcha, vanilla syrup, milk, matcha cream top', tags: [] },
      { name: 'Strawberry Matcha',desc: 'Ceremonial grade matcha, milk, strawberry puree',               tags: [] }
    ]
  },
  {
    id: 'coffee', name: 'Coffee', sub: 'Hot or iced',
    items: [
      { name: 'Latte',       desc: 'Espresso, milk',                              tags: ['Hot or Iced'] },
      { name: 'Americano',   desc: 'Espresso, water',                             tags: ['Hot or Iced'] },
      { name: 'Mocha',       desc: 'Espresso, milk, chocolate',                   tags: ['Hot or Iced'] },
      { name: 'Espresso',    desc: '2 shots',                                     tags: [] },
      { name: 'Cappuccino',  desc: 'Espresso, steamed milk, milk foam',           tags: ['12 oz only'] },
      { name: 'Cortado',     desc: 'Espresso, steamed milk',                      tags: ['4 oz only'] },
      { name: 'Flat White',  desc: 'Espresso, steamed milk, thin microfoam',      tags: ['12 oz only'] },
      { name: 'Macchiato',   desc: 'Espresso, dollop of milk foam',               tags: ['4 oz only'] }
    ]
  },
  {
    id: 'not-coffee', name: 'Not Coffee', sub: 'Hot or iced',
    items: [
      { name: 'Matcha Latte',      desc: 'Ceremonial grade matcha, milk',                                          tags: ['Hot or Iced'] },
      { name: 'Strawberry Milk',   desc: 'Milk, strawberry puree',                                                 tags: ['Iced Only'] },
      { name: 'Chai Latte',        desc: 'Sweetened chai, milk',                                                   tags: ['Hot or Iced'] },
      { name: 'Beet Latte',        desc: 'Beetroot, cinnamon, ginger, cloves, milk',                               tags: ['Hot or Iced'] },
      { name: 'Turmeric Latte',    desc: 'Turmeric, cinnamon, ginger, cardamom, black pepper, milk',               tags: ['Hot or Iced'] },
      { name: 'Hot Chocolate',     desc: 'Milk, chocolate',                                                        tags: [] },
      { name: 'Black Tea',         desc: 'Steven Smith British Brunch',                                            tags: [] },
      { name: 'Peppermint Tea',    desc: 'Steven Smith Peppermint Leaves',                                         tags: [] },
      { name: 'Jasmine Green Tea', desc: 'Steven Smith Jasmine Silver Tip',                                        tags: [] }
    ]
  },
  {
    id: 'cieros', name: 'Cieros', sub: 'Iced, sparkling — caffeinated cream top (~34mg)',
    items: [
      { name: 'Strawberry Ciero',  desc: 'Strawberry puree, sparkling water, Ciero cream top',    tags: ['Best Seller'] },
      { name: 'White Peach Ciero', desc: 'White peach syrup, sparkling water, Ciero cream top',   tags: [] }
    ]
  },
  {
    id: 'cream-tops', name: 'Cream Tops', sub: 'Add-on, served in cup',
    items: [
      { name: 'Vanilla Cream',    desc: '', tags: [] },
      { name: 'Toffee Miso Cream',desc: '', tags: [] },
      { name: 'Matcha Cream',     desc: '', tags: [] },
      { name: 'Ciero Cream',      desc: '', tags: ['Caffeinated'] }
    ]
  },
  {
    id: 'pastries', name: 'Pastries', sub: '',
    items: [
      { name: 'Spinach & Cheese Roll', desc: 'Brioche, spinach, fromage blanc, goat cheese, parmesan',                     tags: ['Vegetarian'] },
      { name: 'Everything Croissant',  desc: 'Caramelized onions, parmesan, olive oil, sesame, fennel, poppy seeds',       tags: [] },
      { name: 'Cinnamon Roll',         desc: 'Cinnamon, brown sugar, cream cheese glaze',                                  tags: ['Vegetarian'] },
      { name: 'Chocolate Chip Cookie', desc: '',                                                                            tags: [] },
      { name: 'Chocolate Twist',       desc: 'Puff pastry, chocolate cream',                                               tags: [] }
    ]
  },
  {
    id: 'desserts', name: 'Desserts', sub: '',
    items: [
      { name: 'Tiramisu',               desc: '', tags: [] },
      { name: 'Pistachio Ricotta Cake', desc: '', tags: [] },
      { name: 'Macarons', desc: 'Vietnamese Coffee, Ube, Matcha Green Tea, Cap\'n Crunch Berry, Thai Tea, Pistachio', tags: [] }
    ]
  }
];

/* Miero — site interactivity
   - Menu rendered from MENU_DATA
   - Live open/closed pill (Pacific Time)
   - Header scroll states (over dark hero / scrolled)
   - Mobile drawer
   - Events inquiry form → mailto
*/
(function () {
  'use strict';

  // ---- Render menu from MENU_DATA ----
  (function renderMenu() {
    const root = document.getElementById('menu-root');
    if (!root) return;

    // Tag CSS class map
    const tagClass = { 'Best Seller': 'item__tag--best-seller', 'Caffeinated': 'item__tag--caffeinated', 'Vegetarian': 'item__tag--vegetarian' };

    // Tabs
    const tabsEl = document.createElement('div');
    tabsEl.className = 'menu__tabs';
    tabsEl.setAttribute('role', 'tablist');
    tabsEl.setAttribute('aria-label', 'Menu categories');

    MENU_DATA.forEach(function (cat, i) {
      const btn = document.createElement('button');
      btn.className = 'menu__tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-tab', cat.id);
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.innerHTML = cat.name + '<span class="count">' + cat.items.length + '</span>';
      tabsEl.appendChild(btn);
    });

    // Panels
    const panels = MENU_DATA.map(function (cat, i) {
      const panel = document.createElement('div');
      panel.className = 'menu__panel' + (i === 0 ? ' is-active' : '');
      panel.setAttribute('data-panel', cat.id);
      panel.setAttribute('role', 'tabpanel');

      const catSubHtml = cat.sub ? '<span class="cat__sub">' + cat.sub + '</span>' : '';

      const itemsHtml = cat.items.map(function (item) {
        const isBestSeller = item.tags.includes('Best Seller');
        const tagsHtml = item.tags.map(function (tag) {
          const cls = tagClass[tag] ? ' ' + tagClass[tag] : '';
          return '<span class="item__tag' + cls + '">' + tag + '</span>';
        }).join('');
        const descHtml = item.desc ? '<p class="item__desc">' + item.desc + '</p>' : '';
        return '<div class="item' + (isBestSeller ? ' item--featured' : '') + '">'
          + '<h4 class="item__name">' + item.name + tagsHtml + '</h4>'
          + descHtml
          + '</div>';
      }).join('');

      panel.innerHTML = '<div class="cat__head"><h3>' + cat.name + '</h3>' + catSubHtml + '</div>'
        + '<div class="items">' + itemsHtml + '</div>';
      return panel;
    });

    root.appendChild(tabsEl);
    panels.forEach(function (p) { root.appendChild(p); });
  })();

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

  // ---- Menu tabs (operates on renderMenu output) ----
  (function tabs() {
    const root = document.getElementById('menu-root');
    if (!root) return;
    const tabBtns = root.querySelectorAll('[data-tab]');
    const panels  = root.querySelectorAll('[data-panel]');
    function activate(key) {
      tabBtns.forEach(function (b) {
        b.setAttribute('aria-selected', b.dataset.tab === key ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.dataset.panel === key);
      });
    }
    tabBtns.forEach(function (b) {
      b.addEventListener('click', function () { activate(b.dataset.tab); });
    });
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

  // ---- Events inquiry form → mailto ----
  (function inquiryForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = new FormData(form);
      const lines = [
        'Name: '                     + (d.get('name')    || ''),
        d.get('org')    ? 'Business / Organization: ' + d.get('org')    : null,
        'Email: '                    + (d.get('email')   || ''),
        d.get('phone')  ? 'Phone: '  + d.get('phone')  : null,
        d.get('type')   ? 'Type of event: '            + d.get('type')   : null,
        d.get('date')   ? 'Preferred date: '           + d.get('date')   : null,
        d.get('guests') ? 'Estimated guests: '         + d.get('guests') : null,
        d.get('message')? '\nMessage:\n'               + d.get('message'): null
      ].filter(Boolean).join('\n');
      window.location.href = 'mailto:miero@endlessgrp.com'
        + '?subject=' + encodeURIComponent('Event Inquiry — Miero Coffee Bar')
        + '&body='    + encodeURIComponent(lines);
    });
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
