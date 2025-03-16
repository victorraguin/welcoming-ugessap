/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import { Service } from '@/types/service'
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useServices } from '@/hooks/useServices'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

interface Association {
  name: string
  short_description: string
  logo: string | null
}

const Footer = () => {
  const [association, setAssociation] = useState<Association | null>(null)

  const { services, fetchServices } = useServices()

  useEffect(() => {
    fetchServices()
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

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='animate-fade-in-up animation-delay-100'>
            <h2 className='text-white text-xl font-semibold mb-4 flex items-center'>
              <span
                className='bg-primary h-5 w-1 mr-2 rounded-full'
                aria-hidden='true'
              ></span>
              {association?.name || 'UGESSAP'}
            </h2>
            <p className='text-sm leading-relaxed'>
              Association dédiée à la santé et au bien-être à
              Montoir-de-Bretagne, proposant des services de proximité adaptés à
              vos besoins : centre de santé, suivi en crèche et soutien médical
              événementiel. Des solutions complètes, solidaires et proches de
              vous.
            </p>
            <div className='mt-6 flex space-x-4'>
              <a
                href='#'
                className='bg-gray-800 hover:bg-primary text-white p-2 rounded-full transition-colors duration-300'
                aria-label='Facebook'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </a>
              <a
                href='#'
                className='bg-gray-800 hover:bg-primary text-white p-2 rounded-full transition-colors duration-300'
                aria-label='Twitter'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
                </svg>
              </a>
              <a
                href='#'
                className='bg-gray-800 hover:bg-primary text-white p-2 rounded-full transition-colors duration-300'
                aria-label='LinkedIn'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <nav
            className='animate-fade-in-up animation-delay-300'
            aria-labelledby='services-navigation'
          >
            <h2
              id='services-navigation'
              className='text-white text-xl font-semibold mb-4 flex items-center'
            >
              <span
                className='bg-primary h-5 w-1 mr-2 rounded-full'
                aria-hidden='true'
              ></span>
              Nos Services
            </h2>
            <ul className='space-y-3'>
              {services.map((service: Service) => (
                <li key={service.id} className='group'>
                  <Link
                    to={`/services/${service.id}`}
                    className='hover:text-primary transition-colors flex items-center group'
                  >
                    <ArrowRight className='h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1' />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='animate-fade-in-up animation-delay-500'>
            <h2 className='text-white text-xl font-semibold mb-4 flex items-center'>
              <span
                className='bg-primary h-5 w-1 mr-2 rounded-full'
                aria-hidden='true'
              ></span>
              Contact
            </h2>
            <address className='not-italic'>
              <ul className='space-y-3'>
                <li className='flex items-start space-x-3'>
                  <MapPin className='h-5 w-5 text-primary mt-0.5' />
                  <span className='text-sm'>
                    123 Rue de la Santé, 44550 Montoir-de-Bretagne
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Phone className='h-5 w-5 text-primary' />
                  <span className='text-sm'>+33 2 40 XX XX XX</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Mail className='h-5 w-5 text-primary' />
                  <span className='text-sm'>contact@ugessap.fr</span>
                </li>
                <li className='mt-4'>
                  <Link
                    to='/contact?tab=contact'
                    className='inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300'
                  >
                    <span>Nous contacter</span>
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </li>
              </ul>
            </address>
          </div>

          <nav
            className='animate-fade-in-up animation-delay-700'
            aria-labelledby='legal-navigation'
          >
            <h2
              id='legal-navigation'
              className='text-white text-xl font-semibold mb-4 flex items-center'
            >
              <span
                className='bg-primary h-5 w-1 mr-2 rounded-full'
                aria-hidden='true'
              ></span>
              Liens Utiles
            </h2>
            <ul className='space-y-3'>
              <li className='group'>
                <Link
                  to='/mentions-legales'
                  className='hover:text-primary transition-colors flex items-center group'
                >
                  <ArrowRight className='h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1' />
                  <span>Politique de confidentialité</span>
                </Link>
              </li>
              <li className='group'>
                <Link
                  to='/mentions-legales'
                  className='hover:text-primary transition-colors flex items-center group'
                >
                  <ArrowRight className='h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1' />
                  <span>Conditions d'utilisation</span>
                </Link>
              </li>
              <li className='group'>
                <Link
                  to='/contact?tab=recruitment'
                  className='hover:text-primary transition-colors flex items-center group'
                >
                  <ArrowRight className='h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1' />
                  <span>Recrutement</span>
                </Link>
              </li>
              <li className='group'>
                <Link
                  to='/contact?tab=complaint'
                  className='hover:text-primary transition-colors flex items-center group'
                >
                  <ArrowRight className='h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1' />
                  <span>Réclamation</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center flex flex-col items-center space-y-2'>
          <p className='text-sm'>
            © {new Date().getFullYear()} UGESSAP. Tous droits réservés.
          </p>
          <p className='text-sm text-gray-500'>
            Réalisé par{' '}
            <a
              href='https://www.victor-raguin.fr/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:text-primary/80 transition-colors'
            >
              Victor Raguin
            </a>
          </p>
          <p className='text-sm mt-2'>
            <a
              href='/login'
              className='text-primary hover:text-primary/80 transition-colors'
            >
              Connexion administrateur
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
