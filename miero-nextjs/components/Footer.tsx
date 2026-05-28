import MieroScript from './MieroScript'

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="wrap">
        <div className="site-footer__left">
          <span className="site-footer__sig">
            <MieroScript />
          </span>
          <span>665 S King St, Seattle</span>
        </div>
        <div className="site-footer__right">
          <a href="https://www.instagram.com/miero.coffeebar" target="_blank" rel="noopener noreferrer">
            @miero.coffeebar
          </a>
          <span className="sep">·</span>
          <span>© 2026 Miero Coffee Bar</span>
        </div>
      </div>
    </footer>
  )
}
