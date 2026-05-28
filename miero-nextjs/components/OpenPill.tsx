'use client'

import { useEffect, useState } from 'react'
import { getOpenStatus, type OpenStatus } from '@/lib/hours'

export default function OpenPill() {
  const [status, setStatus] = useState<OpenStatus | null>(null)

  useEffect(() => {
    function update() {
      setStatus(getOpenStatus(new Date()))
    }
    update()
    const interval = setInterval(update, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const text = status
    ? status.isOpen
      ? `Open until ${status.closesAt}`
      : `Opens ${status.opensAt}`
    : 'Open until 10pm'

  return (
    <span
      className={`open-pill${status && !status.isOpen ? ' open-pill--closed' : ''}`}
      data-open-pill
      aria-live="polite"
    >
      <span className="open-pill__dot" aria-hidden="true" />
      <span>{text}</span>
    </span>
  )
}
