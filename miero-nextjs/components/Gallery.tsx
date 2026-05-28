export default function Gallery() {
  return (
    <section className="gallery" id="gallery" aria-label="The space">
      <div className="wrap">
        <header className="gallery__head" data-reveal>
          <div>
            <span className="label label--mint">The Space</span>
            <h2 className="section-title" style={{ marginTop: '14px' }}>
              Plant-filled.<br />Low-lit. <em>Late.</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,247,241,0.6)', fontSize: '14.5px', lineHeight: '1.55', maxWidth: '32ch', margin: '0' }}>
            Black hexagon tile. Stained walnut shelving. Globe pendants.
            Encaustic floor. Steel-frame industrial windows over King Street.
          </p>
        </header>

        <div className="gallery__grid" data-reveal>
          <figure className="gallery__cell gallery__cell--1">
            <img
              src="/assets/photos/architectural-window.jpg"
              alt="Double-height steel-frame industrial windows above the door, looking onto King Street."
            />
          </figure>
          <figure className="gallery__cell gallery__cell--2">
            <img
              src="/assets/photos/back-bar-globes.jpg"
              alt="Back bar with the lit cursive miero sign, amber globe pendants, hex tile backsplash."
            />
          </figure>
          <figure className="gallery__cell gallery__cell--3">
            <img
              src="/assets/photos/cabinet-still-life.jpg"
              alt="Cabinet still life — monstera, a brass lamp, a contemporary houses book."
            />
          </figure>
          <figure className="gallery__cell gallery__cell--4">
            <img
              src="/assets/photos/floor-tile-detail.jpg"
              alt="Black, grey and white encaustic floor tile pattern, close up."
            />
          </figure>
          <figure className="gallery__cell gallery__cell--5">
            <img
              src="/assets/photos/wide-interior.jpg"
              alt="Wide daylight interior — pendants, plants, hex tile backsplash, walnut shelving."
              style={{ objectPosition: 'center 55%' }}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
