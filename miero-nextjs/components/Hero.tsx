'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          isMotion: '(prefers-reduced-motion: no-preference)',
          isReduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isMotion } = ctx.conditions as { isMotion: boolean }

          document.documentElement.classList.add('anim-ready')

          if (!isMotion) {
            gsap.set(
              '.hero__eyebrow, .hero__headline, .hero__sub, .hero__actions, .hero__corner',
              { opacity: 1, y: 0, clearProps: 'transform' }
            )
            return
          }

          gsap.set('.hero__eyebrow, .hero__headline, .hero__sub, .hero__actions', {
            opacity: 0,
            y: 18,
          })
          gsap.set('.hero__corner', { opacity: 0 })

          const tl = gsap.timeline({
            defaults: { ease: 'power2.out', duration: 0.6 },
            delay: 0.1,
          })
          tl.to('.hero__eyebrow', { opacity: 1, y: 0 })
            .to('.hero__headline', { opacity: 1, y: 0 }, '-=0.4')
            .to('.hero__sub', { opacity: 1, y: 0 }, '-=0.4')
            .to('.hero__actions', { opacity: 1, y: 0 }, '-=0.4')
            .to('.hero__corner', { opacity: 1, duration: 0.5 }, '-=0.3')
        }
      )
      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="hero" aria-label="Welcome">
      <div className="hero__video" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
          <img src="/assets/video/hero-poster.jpg" alt="" />
        </video>
      </div>

      <div className="hero__vignette" aria-hidden="true" />

      <div className="wrap hero__content">
        <span className="label hero__eyebrow">Specialty coffee · Seattle Chinatown/ID</span>
        <h1 className="display hero__headline">
          Open daily,<br />
          <em>until late.</em>
        </h1>
        <p className="hero__sub">
          Espresso pulled fresh. Ceremonial matcha, whisked. Toffee miso lattes
          and sparkling Cieros — made to order, all day, all night.
        </p>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--primary">
            See the menu
            <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a href="#visit" className="btn btn--ghost">Find us</a>
        </div>
      </div>

      <div className="hero__corner" aria-hidden="true">
        665 King · Seattle
      </div>
    </section>
  )
}
