import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
// ... autres imports

const Home = () => {
  return (
    <>
      <SEO
        title='UGESSAP - Votre santé, notre priorité'
        description="UGESSAP s'engage à fournir des services de santé accessibles et de qualité pour tous. Découvrez nos centres de santé et nos services spécialisés."
        url='/'
      />
      <Hero />
      <Services />
      {/* ... autres composants */}
    </>
  )
}

export default Home
