'use client'

import { useEffect, useState } from 'react'
import { getTodayAbbrev } from '@/lib/hours'

const hoursRows = [
  { day: 'Sun', label: 'Sunday',    time: '7am – 10pm' },
  { day: 'Mon', label: 'Monday',    time: '7am – 10pm' },
  { day: 'Tue', label: 'Tuesday',   time: '7am – 10pm' },
  { day: 'Wed', label: 'Wednesday', time: '7am – 10pm' },
  { day: 'Thu', label: 'Thursday',  time: '7am – 10pm' },
  { day: 'Fri', label: 'Friday',    time: '7am – 11pm' },
  { day: 'Sat', label: 'Saturday',  time: '7am – 11pm' },
]

export default function Visit() {
  const [today, setToday] = useState<string | null>(null)

  useEffect(() => {
    setToday(getTodayAbbrev(new Date()))
  }, [])

  return (
    <section className="visit" id="visit" aria-label="Visit">
      <div className="wrap">
        <div className="visit__grid">
          <div className="visit__intro" data-reveal>
            <span className="label label--accent">Visit</span>
            <h2 className="visit__address">
              665 S King St,<br />
              Seattle WA 98104.
            </h2>
            <p className="visit__neighborhood">
              Three blocks from Chinatown/ID light rail. Street parking on King.
              Bike racks out front. Corner of King &amp; Maynard.
            </p>

            <div className="hours" aria-label="Hours">
              {hoursRows.map(({ day, label, time }) => {
                const isToday = today === day
                return (
                  <div
                    key={day}
                    className={`hours__row${isToday ? ' hours__row--today' : ''}`}
                    data-day={day}
                  >
                    <span className="hours__day">{label}</span>
                    <span />
                    <span className="hours__time">
                      {time}{' '}
                      {isToday && (
                        <span className="hours__today-tag">· today</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="contact-row">
              <a className="contact-row__item" href="tel:+12062221690">
                <span className="contact-row__label">Phone</span>
                <span className="contact-row__value">(206) 222-1690</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="contact-row__item"
                href="https://www.instagram.com/miero.coffeebar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row__label">Instagram</span>
                <span className="contact-row__value">@miero.coffeebar</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="contact-row__item"
                href="https://maps.google.com/?q=665+S+King+St,+Seattle,+WA+98104"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-row__label">Directions</span>
                <span className="contact-row__value">Google Maps</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="map" data-reveal>
            <iframe
              title="Map of Miero Coffee Bar, 665 S King St, Seattle"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=665%20S%20King%20St%2C%20Seattle%2C%20WA%2098104&z=16&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
