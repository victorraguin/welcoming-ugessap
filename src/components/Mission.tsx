import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import DOMPurify from 'dompurify'

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
    <section id='mission' className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-4'>Notre Mission</h2>
        <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full '></div>
        <div className='max-w-4xl mx-auto space-y-6 text-gray-600 text-left'>
          {/* Texte principal avec données dynamiques */}
          <p className='text-lg'>
            Bienvenue sur le site de l'association{' '}
            <span className='text-primary font-semibold'>
              {association?.name || 'UGESSAP'}
            </span>
            , dédiée à la santé et au bien-être. <br />
            <br />
            <div
              className='text-lg'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(association?.description || '')
              }}
            ></div>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mission
