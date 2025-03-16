import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Association {
  name: string
  short_description: string
  logo: string | null
}

const Hero = () => {
  const [association, setAssociation] = useState<Association | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchAssociationData = async () => {
      const { data, error } = await supabase
        .from('association')
        .select('name, short_description, logo')
        .single() // Assuming there is only one association entry

      if (error) {
        console.error("Erreur lors de la récupération de l'association:", error)
      } else {
        setAssociation(data)
      }
      setIsLoaded(true)
    }

    fetchAssociationData()
  }, [])

  // Fonction utilitaire pour effectuer un smooth scroll
  const handleSmoothScroll = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section
      aria-labelledby='hero-heading'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background image with overlay */}
      <div
        className='absolute inset-0 z-0 transition-transform duration-700 ease-out scale-105 hover:scale-100'
        style={{
          backgroundImage: `url('${association?.logo || '/placeholder.svg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        aria-hidden='true'
      >
        <div className='absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-sm' />
      </div>

      <div className='container mx-auto px-4 pt-20 pb-16 relative z-10'>
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1
            id='hero-heading'
            className='text-4xl md:text-6xl font-bold tracking-tight text-white mb-2'
          >
            <span className='inline-block animate-fade-in-up animation-delay-100'>
              {association?.name || 'Votre santé, notre priorité'}
            </span>
          </h1>

          <div className='w-24 h-1 bg-primary mx-auto my-6 rounded-full animate-pulse'></div>

          <p className='mt-6 text-lg md:text-xl text-gray-200 animate-fade-in-up animation-delay-300'>
            {association?.short_description ||
              "UGESSAP s'engage à fournir des services de santé accessibles et de qualité pour tous. Découvrez nos centres de santé et nos services spécialisés."}
          </p>

          <div className='mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in-up animation-delay-500'>
            <Button
              size='lg'
              className='w-full sm:w-auto text-base group'
              onClick={() => handleSmoothScroll('#services')} // Smooth scroll vers #services
            >
              Nos services
              <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
            </Button>

            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto text-base bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300'
              onClick={() =>
                // link to /association page
                (window.location.href = '/association')
              } // Smooth scroll vers #about
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
