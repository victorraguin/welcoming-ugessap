import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Service } from '@/types/service'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useServices } from '@/hooks/useServices'

interface Association {
  name: string
  short_description: string
  logo: string | null
}

const Footer = () => {
  const [association, setAssociation] = useState<Association | null>(null)

  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices() // Assurez-vous de charger les services au montage
  }, [])

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

  console.log('services', services)

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              {association?.name || 'UGESSAP'}
            </h3>
            <p className='text-sm'>
              Association dédiée à la santé et au bien-être à
              Montoir-de-Bretagne, proposant des services de proximité adaptés à
              vos besoins : centre de santé, suivi en crèche et soutien médical
              événementiel. Des solutions complètes, solidaires et proches de
              vous.
            </p>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              Nos Services
            </h3>
            <ul className='space-y-2'>
              {services.map((service: Service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className='hover:text-primary transition-colors'
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/contact?tab=contact'
                  className='hover:text-primary transition-colors'
                >
                  Page de contact
                </Link>
              </li>
              <li>
                <Link
                  to='/contact?tab=complaint'
                  className='hover:text-primary transition-colors'
                >
                  Réclamation
                </Link>
              </li>
              <li>
                <Link
                  to='/contact?tab=recruitment'
                  className='hover:text-primary transition-colors'
                >
                  Candidature
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>
              Mentions Légales
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/mentions-legales'
                  className='hover:text-primary transition-colors'
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to='/mentions-legales'
                  className='hover:text-primary transition-colors'
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center'>
          <p className='text-sm'>
            © {new Date().getFullYear()} UGESSAP. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
