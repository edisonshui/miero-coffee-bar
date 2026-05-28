'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PageAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        isMotion: '(prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { isMotion } = ctx.conditions as { isMotion: boolean }

        if (!isMotion) {
          gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'transform' })
          return
        }

        // Section reveals — each [data-reveal] fades + rises on scroll
        gsap.set('[data-reveal]', { opacity: 0, y: 16 })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          })
        })

        // Pillars stagger
        const pillars = gsap.utils.toArray<HTMLElement>('.pillar')
        if (pillars.length) {
          gsap.set(pillars, { opacity: 0, y: 14 })
          gsap.to(pillars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.pillars',
              start: 'top 85%',
              once: true,
            },
          })
        }

        // Menu items — stagger the initially-visible panel on scroll entry
        const menuSection = document.querySelector('.menu')
        if (menuSection) {
          const items = menuSection.querySelectorAll('.menu__panel.is-active .item')
          if (items.length) {
            gsap.set(items, { opacity: 0, y: 10 })
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power2.out',
              stagger: 0.05,
              scrollTrigger: {
                trigger: menuSection,
                start: 'top 75%',
                once: true,
              },
            })
          }
        }

        // Gallery cells — fade + tiny scale
        const cells = gsap.utils.toArray<HTMLElement>('.gallery__cell')
        if (cells.length) {
          gsap.set(cells, { opacity: 0, scale: 1.02 })
          gsap.to(cells, {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.gallery__grid',
              start: 'top 82%',
              once: true,
            },
          })
        }

        // Hours rows — slide in from left
        const hoursRows = gsap.utils.toArray<HTMLElement>('.hours__row')
        if (hoursRows.length) {
          gsap.set(hoursRows, { opacity: 0, x: -8 })
          gsap.to(hoursRows, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: '.hours',
              start: 'top 85%',
              once: true,
            },
          })
        }

        // Section label tracking animation on enter
        gsap.utils.toArray<HTMLElement>('.label').forEach((label) => {
          if (label.closest('.hero, .open-pill, .drawer')) return
          gsap.from(label, {
            opacity: 0,
            letterSpacing: '0.05em',
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              once: true,
            },
          })
        })

        // Refresh after fonts settle
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh())
        }

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill())
        }
      }
    )

    return () => mm.revert()
  })

  return null
}
