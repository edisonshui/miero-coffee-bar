export default function Concept() {
  return (
    <section className="concept" id="concept" aria-label="Concept">
      <div className="wrap">
        <div className="concept__grid">
          <div className="concept__text" data-reveal>
            <span className="label">The Concept</span>
            <h2 className="section-title">
              A coffee bar, considered{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--fg-accent)', fontVariationSettings: "'opsz' 96, 'WONK' 0" }}>
                to the inch.
              </em>
            </h2>
            <p className="concept__body">
              Miero is a small specialty bar on the corner of King and Maynard.
              Nation and Nicole opened it in 2025 — espresso pulled at the bar,
              ceremonial matcha whisked to order, Korean-leaning flavors that
              don&apos;t announce themselves.
            </p>
            <p className="concept__body">
              The space is plant-filled, low-lit, late. The drinks are the point.
            </p>
          </div>

          <div className="concept__image" data-reveal>
            <img
              src="/assets/photos/concept-storefront.jpg"
              alt="Miero interior — daylight through the steel-frame storefront window, the painted MIERO wordmark in mint sage, plants and walnut shelving lining the back bar."
            />
          </div>
        </div>

        <div className="pillars" data-reveal>
          <article className="pillar">
            <span className="pillar__num">— 01</span>
            <h3 className="pillar__name">Sourcing</h3>
            <p className="pillar__desc">
              Single-origin espresso, ceremonial-grade matcha, dairy and oat
              from producers we&apos;ve stood across from in person.
            </p>
          </article>
          <article className="pillar">
            <span className="pillar__num">— 02</span>
            <h3 className="pillar__name">Recipes</h3>
            <p className="pillar__desc">
              Built in-house — toffee miso cream, vanilla, strawberry purée.
              Restrained sweetness. Korean-leaning, never branded as fusion.
            </p>
          </article>
          <article className="pillar">
            <span className="pillar__num">— 03</span>
            <h3 className="pillar__name">Preparation</h3>
            <p className="pillar__desc">
              Made to order on a two-group La Marzocco. Iced when the recipe
              asks for it. No sequence is shortcut.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
