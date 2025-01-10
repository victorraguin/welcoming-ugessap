import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'

interface Association {
  name: string
  description: string
}

const Mission = () => {
  const [association, setAssociation] = useState<Association | null>(null)

  useEffect(() => {
    const fetchAssociationData = async () => {
      const { data, error } = await supabase
        .from('association')
        .select('name, description')
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
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Notre Mission</h2>

        <div className='max-w-4xl mx-auto space-y-6 text-gray-600'>
          {/* Texte principal avec données dynamiques */}
          <p className='text-lg'>
            Bienvenue sur le site de l'association{' '}
            <span className='text-primary font-semibold'>
              {association?.name || 'UGESSAP'}
            </span>
            , dédiée à la santé et au bien-être.{' '}
            {association?.description || (
              <>
                Nous proposons{' '}
                <span className='text-primary font-semibold'>
                  trois services principaux
                </span>
                : le centre de santé, où des professionnels qualifiés offrent
                des soins de proximité ; notre accompagnement en crèches, avec
                des infirmières et des pédiatres intervenant directement pour
                assurer le suivi médical des enfants ; et Med'event, un service
                spécialisé dans la prise en charge médicale lors d'événements
                sportifs, culturels et festifs.
              </>
            )}
          </p>

          <p className='text-lg'>
            Notre mission est{' '}
            <span className='text-primary font-semibold'>
              d'assurer une prise en charge adaptée et accessible
            </span>
            , que ce soit dans un cadre quotidien ou lors de grands
            rassemblements.
          </p>

          {/* Lien dynamique */}
          <p className='text-lg font-medium text-primary text-center mt-8'>
            <Link to='/services' className='hover:underline'>
              Parcourez notre site pour découvrir nos engagements, notre équipe
              et nos solutions pour répondre à vos besoins !
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mission
