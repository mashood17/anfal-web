import Navbar      from '@/components/Navbar'
import Hero        from '@/components/Hero'
import Specialties from '@/components/Specialties'
import About       from '@/components/About'
import Cuisines    from '@/components/Cuisines'
import Gallery     from '@/components/Gallery'
import Reviews     from '@/components/Reviews'
import Contact     from '@/components/Contact'
import Footer      from '@/components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Specialties />
        <About />
        <Cuisines />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}