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
    }

    fetchAssociationData()
  }, [])

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background image with overlay */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url('${association?.logo || '/placeholder.svg'}')`, // Use logo as background if available
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50' />
      </div>

      <div className='container mx-auto px-4 pt-20 pb-16 relative z-10'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-white slide-up'>
            {association?.name || 'Votre santé, notre priorité'}
          </h1>

          <p className='mt-6 text-lg md:text-xl text-gray-200 slide-up'>
            {association?.short_description ||
              "UGESSAP s'engage à fournir des services de santé accessibles et de qualité pour tous. Découvrez nos centres de santé et nos services spécialisés."}
          </p>

          <div className='mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center fade-in'>
            <Button
              size='lg'
              className='w-full sm:w-auto text-base'
              onClick={() => (window.location.href = '#services')}
            >
              Nos services
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto text-base bg-white/10 hover:bg-white/20 text-white border-white/20'
              onClick={() => (window.location.href = '#about')}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
