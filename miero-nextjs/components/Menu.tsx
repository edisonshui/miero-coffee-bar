'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { menuCategories, type MenuCategory } from '@/lib/menuData'

gsap.registerPlugin(useGSAP)

function Price({ value, single }: { value: string; single?: boolean }) {
  const [dollars, cents] = value.split('.')
  return (
    <span className={`price${single ? ' price--single' : ''}`}>
      {dollars}.<sup>{cents}</sup>
    </span>
  )
}

function MenuItem({ item }: { item: MenuCategory['items'][number] }) {
  return (
    <div className={`item${item.featured ? ' item--featured' : ''}`}>
      <div>
        <h4 className="item__name">
          {item.name}
          {item.featured && <span className="item__featured-tag">Featured</span>}
        </h4>
        {item.desc && <p className="item__desc">{item.desc}</p>}
      </div>
      <div className="item__prices">
        {item.prices.length === 1 ? (
          <Price value={item.prices[0]} single />
        ) : (
          <>
            <Price value={item.prices[0]} />
            <Price value={item.prices[1]} />
          </>
        )}
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('signatures')
  const containerRef = useRef<HTMLElement>(null)
  const prevTabRef = useRef('signatures')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (activeTab !== prevTabRef.current) {
          prevTabRef.current = activeTab
          requestAnimationFrame(() => {
            const panel = containerRef.current?.querySelector(
              `.menu__panel.is-active .item`
            )
            if (!panel) return
            const items = containerRef.current?.querySelectorAll(
              '.menu__panel.is-active .item'
            )
            if (!items?.length) return
            gsap.fromTo(
              items,
              { opacity: 0, y: 8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: 'power2.out',
                stagger: 0.035,
                overwrite: true,
              }
            )
          })
        }
      })
      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [activeTab] }
  )

  return (
    <section ref={containerRef} className="menu" id="menu" aria-label="Menu">
      <div className="wrap">
        <div className="menu__head">
          <div>
            <span className="label">The Menu</span>
            <h2 className="section-title" style={{ marginTop: '14px' }}>
              From the bar tonight.
            </h2>
            <p className="menu__intro">
              Sizes shown 12&nbsp;oz / 16&nbsp;oz. Signatures are iced only — we plan it that way.
              Substitute oat, almond or soy. Add a syrup if you&apos;d like.
            </p>
          </div>
        </div>

        <div className="menu__tabs" role="tablist" aria-label="Drink categories">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className="menu__tab"
              role="tab"
              data-tab={cat.id}
              aria-selected={activeTab === cat.id ? 'true' : 'false'}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
              <span className="count">{cat.count}</span>
            </button>
          ))}
        </div>

        {menuCategories.map((cat) => (
          <div
            key={cat.id}
            className={`menu__panel${activeTab === cat.id ? ' is-active' : ''}`}
            data-panel={cat.id}
            role="tabpanel"
          >
            <div className="cat__head">
              <h3>{cat.label}</h3>
              <span className="cat__sub">{cat.sub}</span>
            </div>
            <div className="items">
              {cat.items.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div className="menu__foot">
          <p>
            Extras — oat, almond or soy milk (+1.<sup style={{ fontSize: '.62em', verticalAlign: '.4em' }}>00</sup>) ·
            vanilla, hazelnut, caramel, cane sugar syrup (+0.<sup style={{ fontSize: '.62em', verticalAlign: '.4em' }}>75</sup>).
          </p>
          <p style={{ color: 'var(--fg-accent)' }}>
            Menu changes occasionally. The board at the bar is the source of truth.
          </p>
        </div>
      </div>
    </section>
  )
}
