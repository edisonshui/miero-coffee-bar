'use client'

import { useEffect } from 'react'
import OpenPill from './OpenPill'
import MieroScript from './MieroScript'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <>
      <div
        className={`drawer-backdrop${isOpen ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`drawer${isOpen ? ' is-open' : ''}`} aria-label="Mobile menu">
        <div className="drawer__head">
          <OpenPill />
          <button className="drawer__close" type="button" aria-label="Close menu" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
        <nav className="drawer__nav">
          <a className="drawer__link" href="#concept" onClick={onClose}>Concept</a>
          <a className="drawer__link" href="#menu" onClick={onClose}>Menu</a>
          <a className="drawer__link" href="#gallery" onClick={onClose}>Space</a>
          <a className="drawer__link" href="#visit" onClick={onClose}>Visit</a>
        </nav>
        <div className="drawer__foot">
          <div className="drawer__sig">
            <MieroScript />
          </div>
          <p className="drawer__meta">
            665 S King St, Seattle WA 98104<br />
            (206)&nbsp;222-1690 · @miero.coffeebar
          </p>
        </div>
      </aside>
    </>
  )
}
