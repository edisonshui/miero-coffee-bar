import HeaderDrawer from '@/components/HeaderDrawer'
import Hero from '@/components/Hero'
import Concept from '@/components/Concept'
import Menu from '@/components/Menu'
import Gallery from '@/components/Gallery'
import Visit from '@/components/Visit'
import Footer from '@/components/Footer'
import PageAnimations from '@/components/PageAnimations'

export default function Home() {
  return (
    <>
      <HeaderDrawer />
      <main id="top">
        <Hero />
        <Concept />
        <Menu />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <PageAnimations />
    </>
  )
}
