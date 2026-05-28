'use client'

import { useEffect, useRef, useState } from 'react'
import MieroWordmark from './MieroWordmark'
import OpenPill from './OpenPill'

interface HeaderProps {
  onMenuOpen: () => void
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverDark, setIsOverDark] = useState(true)

  useEffect(() => {
    function update() {
      const hero = document.querySelector('.hero')
      if (!hero) return
      const scrollY = window.scrollY
      const heroBottom = hero.getBoundingClientRect().bottom
      setIsScrolled(scrollY > 20)
      setIsOverDark(heroBottom > 80)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const classes = [
    'site-header',
    isScrolled ? 'is-scrolled' : '',
    isOverDark ? 'is-over-dark' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header ref={headerRef} className={classes} role="banner">
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label="Miero — Home">
          <MieroWordmark />
        </a>

        <nav className="nav" aria-label="Primary">
          <a className="nav-link" href="#concept">Concept</a>
          <a className="nav-link" href="#menu">Menu</a>
          <a className="nav-link" href="#gallery">Space</a>
          <a className="nav-link" href="#visit">Visit</a>
          <OpenPill />
        </nav>

        <button
          className="nav-menu-btn"
          type="button"
          aria-label="Open menu"
          onClick={onMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
