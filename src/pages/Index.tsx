import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Mission from '@/components/Mission'
import ImageCarousel from '@/components/ImageCarousel'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { Helmet } from 'react-helmet-async'

const Index = () => {
  return (
    <>
      <Helmet>
        <title>UGESSAP - Accueil</title>
        <meta name='description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:title' content='UGESSAP - Accueil' />
        <meta property='og:description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:image' content='/ugessap-og-image.png' />
      </Helmet>
      <main className='min-h-screen'>
        <Navbar />
        <Hero />
        <Services />
        <Mission />
        <ImageCarousel />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}

export default Index
