/* Miero — GSAP animations
   Subtle, editorial. 200–600ms, power2.out (matches brand cubic-bezier).
   Respects prefers-reduced-motion.

   Loaded after gsap + ScrollTrigger UMD bundles.
*/
(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('[miero] gsap not loaded — skipping animations');
    return;
  }
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Tell the FOUC guard we're alive — keeps .has-anim past the safety timer.
  document.documentElement.classList.add('anim-ready');

  // Set hidden initial states immediately so nothing flashes before the
  // first frame of the timeline. (CSS already had data-reveal hidden via
  // the old IO script — now we own that state.)
  gsap.set('[data-reveal]', { opacity: 0, y: 16 });
  gsap.set('.hero__eyebrow, .hero__headline, .hero__sub, .hero__actions', {
    opacity: 0, y: 18
  });
  gsap.set('.hero__corner', { opacity: 0 });

  // Single matchMedia → reduced-motion users get instant reveals, no tweens.
  const mm = gsap.matchMedia();

  mm.add(
    {
      isMotion: '(prefers-reduced-motion: no-preference)',
      isReduced: '(prefers-reduced-motion: reduce)'
    },
    (ctx) => {
      const { isMotion } = ctx.conditions;

      if (!isMotion) {
        // Instant reveal — no animation, no scroll-triggered work.
        gsap.set(
          '[data-reveal], .hero__eyebrow, .hero__headline, .hero__sub, .hero__actions, .hero__corner',
          { opacity: 1, y: 0, clearProps: 'transform' }
        );
        return;
      }

      // ──────── Hero entrance ────────
      // Eyebrow → headline → sub → actions, staggered, on load.
      const heroTl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.6 },
        delay: 0.1
      });
      heroTl
        .to('.hero__eyebrow', { opacity: 1, y: 0 })
        .to('.hero__headline', { opacity: 1, y: 0 }, '-=0.4')
        .to('.hero__sub', { opacity: 1, y: 0 }, '-=0.4')
        .to('.hero__actions', { opacity: 1, y: 0 }, '-=0.4')
        .to('.hero__corner', { opacity: 1, duration: 0.5 }, '-=0.3');

      // ──────── Section reveals via ScrollTrigger ────────
      // Each [data-reveal] block fades + rises 16px as it scrolls in.
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        });
      });

      // ──────── Pillars stagger ────────
      const pillars = gsap.utils.toArray('.pillar');
      if (pillars.length) {
        gsap.set(pillars, { opacity: 0, y: 14 });
        gsap.to(pillars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.pillars',
            start: 'top 85%',
            once: true
          }
        });
      }

      // ──────── Menu items stagger ────────
      // When the menu section enters, stagger the currently-visible panel's items.
      const menuSection = document.querySelector('.menu');
      if (menuSection) {
        const items = menuSection.querySelectorAll('.menu__panel.is-active .item');
        if (items.length) {
          gsap.set(items, { opacity: 0, y: 10 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: menuSection,
              start: 'top 75%',
              once: true
            }
          });
        }

        // Tab switch — fade incoming items in (small stagger, no out-tween:
        // the existing CSS class toggle handles hiding the old panel).
        const tabs = menuSection.querySelectorAll('[data-tab]');
        tabs.forEach((btn) => {
          btn.addEventListener('click', () => {
            // Defer one frame so .is-active has flipped on the new panel.
            requestAnimationFrame(() => {
              const active = menuSection.querySelector('.menu__panel.is-active');
              if (!active) return;
              const newItems = active.querySelectorAll('.item');
              gsap.fromTo(
                newItems,
                { opacity: 0, y: 8 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.35,
                  ease: 'power2.out',
                  stagger: 0.035,
                  overwrite: true
                }
              );
            });
          });
        });
      }

      // ──────── Gallery cells — fade + translateY (no scale: avoids compositor jank) ────────
      const cells = gsap.utils.toArray('.gallery__cell');
      if (cells.length) {
        gsap.set(cells, { opacity: 0, y: 12 });
        gsap.to(cells, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          onStart() { cells.forEach(c => { c.style.willChange = 'transform, opacity'; }); },
          onComplete() { cells.forEach(c => { c.style.willChange = 'auto'; }); },
          scrollTrigger: {
            trigger: '.gallery__grid',
            start: 'top 90%',
            once: true
          }
        });
      }

      // ──────── Hours rows ────────
      const hoursRows = gsap.utils.toArray('.hours__row');
      if (hoursRows.length) {
        gsap.set(hoursRows, { opacity: 0, x: -8 });
        gsap.to(hoursRows, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: '.hours',
            start: 'top 85%',
            once: true
          }
        });
      }

      // ──────── Section label underline grow ────────
      // Subtle: the eyebrow labels animate their tracking on enter.
      gsap.utils.toArray('.label').forEach((label) => {
        // Skip labels that are inside the hero (already animated) or the pill.
        if (label.closest('.hero, .open-pill, .drawer')) return;
        gsap.from(label, {
          opacity: 0,
          letterSpacing: '0.05em',
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 90%',
            once: true
          }
        });
      });

      // ScrollTrigger sometimes needs a refresh after layout/fonts settle.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      // ──────── Depth — walking-through system ────────
      // All scrubbed. prefers-reduced-motion handled by the mm.add wrapper above.

      // Section entrance: scale 0.96 → 1 as each section approaches (scrub:1 = weighted feel)
      gsap.utils.toArray('.concept, .gallery, .visit').forEach((section) => {
        gsap.fromTo(section,
          { scale: 0.96 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 95%', end: 'top 40%', scrub: 1 }
          }
        );
      });

      // Gallery image parallax — images scroll slower, each cell is a window onto a deeper scene
      gsap.utils.toArray('.gallery__cell img').forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.gallery__cell'),
            start: 'top bottom', end: 'bottom top', scrub: true
          }
        });
      });

      // Concept image parallax
      const conceptImg = document.querySelector('.concept__image img');
      if (conceptImg) {
        gsap.to(conceptImg, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: '.concept__image', start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }

      // Blob parallax — slowest layer (most "distant")
      const mintBlob = document.querySelector('.blob--mint');
      if (mintBlob) {
        gsap.to(mintBlob, {
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: mintBlob, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
      const creamBlob = document.querySelector('.blob--cream');
      if (creamBlob) {
        gsap.to(creamBlob, {
          y: -28,
          ease: 'none',
          scrollTrigger: { trigger: creamBlob, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
    }
  );
})();
