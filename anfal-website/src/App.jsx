import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'
import About    from '@/components/About'
import Cuisines from '@/components/Cuisines'
import MenuCTA  from '@/components/MenuCTA'
import Gallery  from '@/components/Gallery'
import Reviews  from '@/components/Reviews'
import Contact  from '@/components/Contact'
import Footer   from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Cuisines />
        <MenuCTA />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}