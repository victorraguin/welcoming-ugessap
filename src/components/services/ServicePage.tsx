import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Service } from '@/types/service'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { toast } from 'sonner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import * as Icons from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getButtonAction } from '@/lib/utils'
import { MapPin } from 'lucide-react'

interface TeamMember {
  id: string
  image: string
  person_name: string
  job_title: string
  service_id: string
}

interface ServicePageProps {
  service: Service
}

const ServicePage = ({ service }: ServicePageProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loadingTeam, setLoadingTeam] = useState(true)
  const [errorTeam, setErrorTeam] = useState<string | null>(null)

  const IconComponent = Icons[service.icon] || Icons.HelpCircle

  useEffect(() => {
    async function fetchTeam () {
      try {
        setLoadingTeam(true)
        setErrorTeam(null)

        const { data, error } = await supabase
          .from('team')
          .select('*')
          .eq('service_id', service.id)

        if (error) {
          throw error
        }

        if (data) {
          setTeamMembers(data)
        }
      } catch (err: unknown) {
        console.error(err)
        setErrorTeam((err as Error).message)
      } finally {
        setLoadingTeam(false)
      }
    }

    if (service.id) {
      fetchTeam()
    }
  }, [service.id])

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-b from-primary/5 to-white py-20 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-8'>
                <div className='flex items-center gap-4'>
                  <div className='p-3 bg-primary/10 rounded-xl'>
                    <IconComponent className='w-12 h-12 text-primary' />
                  </div>
                  <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                    {service.title}
                  </h1>
                </div>
                <p className='text-lg text-gray-600 leading-relaxed'>
                  {service.shortDescription}
                </p>

                {/* Boutons */}
                {service.buttons && service.buttons.length > 0 && (
                  <div className='flex flex-wrap gap-4'>
                    {service.buttons.map(button => {
                      const action = getButtonAction(button.link)
                      return (
                        <Button
                          key={button.id}
                          variant='default'
                          className='mb-2 w-fit hover:scale-105 transition-transform duration-200'
                          onClick={() => {
                            if (action !== '#') {
                              window.open(
                                action,
                                '_blank',
                                'noopener,noreferrer'
                              )
                            } else {
                              toast.error('Lien invalide')
                            }
                          }}
                        >
                          {button.text}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
              {service.images && service.images.length > 0 && (
                <div className='relative group'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>
                  <img
                    src={service.images[0].url}
                    alt={service.images[0].alt}
                    className='relative rounded-lg shadow-2xl w-full object-cover h-[400px] group-hover:scale-[1.01] transition duration-500'
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mission + Adresse et Horaires */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
              {/* Mission */}
              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <h2 className='text-2xl font-bold mb-6 text-primary'>
                  Notre Mission
                </h2>
                <div className='space-y-6 text-gray-600'>
                  <p className='text-lg leading-relaxed'>
                    {service.longDescription}
                  </p>
                </div>
              </div>

              {/* Adresse et Horaires */}
              {service.address && service.hours && (
                <div className='space-y-6'>
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    {/* Adresse */}
                    <div className='flex items-start space-x-6 mb-8'>
                      <div className='flex-grow'>
                        <h3 className='text-xl font-semibold text-primary mb-4 flex items-center gap-2'>
                          <MapPin className='h-5 w-5' />
                          Adresse
                        </h3>
                        <p className='text-gray-600 text-lg'>
                          {service.address.street}
                          <br />
                          {service.address.postalCode} {service.address.city}
                        </p>
                      </div>
                      {/* Bouton Localisation */}
                      {service.address.maps_url && (
                        <Button
                          variant='outline'
                          className='hover:scale-105 transition-transform duration-200'
                          onClick={() =>
                            window.open(
                              service.address.maps_url,
                              '_blank',
                              'noopener,noreferrer'
                            )
                          }
                        >
                          <MapPin className='mr-2 h-4 w-4' />
                          Localisez-nous
                        </Button>
                      )}
                    </div>

                    {/* Horaires */}
                    <div>
                      <h3 className='text-xl font-semibold text-primary mb-4 flex items-center gap-2'>
                        <Icons.Clock className='h-5 w-5' />
                        Horaires
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600'>
                        {service.hours.monday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Lundi:</span>{' '}
                            {service.hours.monday}
                          </div>
                        )}
                        {service.hours.tuesday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Mardi:</span>{' '}
                            {service.hours.tuesday}
                          </div>
                        )}
                        {service.hours.wednesday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Mercredi:</span>{' '}
                            {service.hours.wednesday}
                          </div>
                        )}
                        {service.hours.thursday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Jeudi:</span>{' '}
                            {service.hours.thursday}
                          </div>
                        )}
                        {service.hours.friday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Vendredi:</span>{' '}
                            {service.hours.friday}
                          </div>
                        )}
                        {service.hours.saturday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Samedi:</span>{' '}
                            {service.hours.saturday}
                          </div>
                        )}
                        {service.hours.sunday && (
                          <div className='p-3 bg-gray-50 rounded-lg'>
                            <span className='font-medium'>Dimanche:</span>{' '}
                            {service.hours.sunday}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Points clés */}
        {service.keyPoints && service.keyPoints.length > 0 && (
          <section className='py-16 bg-gradient-to-b from-white to-gray-50'>
            <div className='container mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {service.keyPoints.map(point => {
                  const KeyPointIcon = Icons[point.icon] || Icons.Info
                  return (
                    <Card
                      key={point.id}
                      className='group hover:shadow-xl transition-all duration-300 border-none bg-white/50 backdrop-blur-sm'
                    >
                      <CardHeader className='text-center'>
                        <div className='mx-auto mb-6 p-4 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300'>
                          <KeyPointIcon className='w-12 h-12 text-primary' />
                        </div>
                        <CardTitle className='text-xl mb-4'>
                          {point.title}
                        </CardTitle>
                        <CardDescription className='text-gray-600 text-base'>
                          {point.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Contenu additionnel si nécessaire */}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Équipe */}
        {teamMembers && teamMembers.length > 0 && (
          <section className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-4'>
                Notre Équipe
              </h2>
              <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full'></div>

              {loadingTeam && (
                <div className='text-center'>
                  <Icons.Loader2 className='animate-spin h-8 w-8 mx-auto text-primary' />
                  <p className='mt-2'>Chargement de l'équipe...</p>
                </div>
              )}

              {errorTeam && (
                <div className='text-center text-red-500 p-4 bg-red-50 rounded-lg'>
                  <Icons.AlertTriangle className='h-8 w-8 mx-auto mb-2' />
                  <p>Erreur chargement équipe : {errorTeam}</p>
                </div>
              )}

              {!loadingTeam && !errorTeam && teamMembers.length === 0 && (
                <p className='text-center text-gray-500'>
                  Aucun membre de l'équipe trouvé.
                </p>
              )}

              {!loadingTeam && !errorTeam && teamMembers.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                  {teamMembers.map(member => (
                    <Card
                      key={member.id}
                      className='group hover:shadow-xl transition-all duration-300 overflow-hidden'
                    >
                      <CardContent className='p-6 text-center'>
                        <Avatar className='w-32 h-32 mx-auto mb-6 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300'>
                          <AvatarImage
                            src={member.image}
                            alt={member.person_name}
                            className='object-cover'
                          />
                          <AvatarFallback className='bg-primary/10 text-primary text-xl'>
                            {member.person_name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300'>
                          {member.person_name}
                        </h3>
                        <p className='text-primary/80 font-medium'>
                          {member.job_title}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Installations / Images */}
        {service.images && service.images.length > 0 && (
          <section className='py-16 bg-gradient-to-b from-white to-gray-50'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-4'>
                Nos installations
              </h2>
              <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full'></div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {service.images.map(image => (
                  <div
                    key={image.id}
                    className='group relative overflow-hidden rounded-2xl shadow-lg'
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500'
                    />
                    {image.alt && (
                      <div className='absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                        <p className='text-sm font-medium'>{image.alt}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ServicePage
