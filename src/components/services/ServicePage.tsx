import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client' // ou votre client supabase
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
        <section className='bg-primary/5 py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <IconComponent className='w-12 h-12 text-primary' />
                  <h1 className='text-4xl md:text-5xl font-bold'>
                    {service.title}
                  </h1>
                </div>
                <p className='text-lg text-gray-600'>
                  {service.shortDescription}
                </p>

                {/* Boutons (si besoin) */}
                {service.buttons && service.buttons.length > 0 && (
                  <div className='flex flex-wrap gap-4'>
                    {service.buttons.map(button => {
                      const action = getButtonAction(button.link)
                      return (
                        <Button
                          key={button.id}
                          variant='default'
                          className='mb-2 w-fit'
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
                <div className='relative'>
                  <img
                    src={service.images[0].url}
                    alt={service.images[0].alt}
                    className='rounded-lg shadow-xl w-full object-cover h-[400px]'
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
              <div>
                <h2 className='text-2xl font-bold mb-4'>Notre Mission</h2>
                <div className='space-y-6 text-gray-600'>
                  <p className='text-lg'>{service.longDescription}</p>
                </div>
              </div>

              {/* Adresse et Horaires */}
              {service.address && service.hours && (
                <div className='space-y-6'>
                  <div className='bg-gray-100 p-6 rounded-lg shadow-lg space-y-4'>
                    {/* Adresse */}
                    <div className='flex items-start space-x-4'>
                      <div>
                        <h3 className='text-lg font-semibold'>Adresse</h3>
                        <p className='text-gray-600'>
                          {service.address.street}
                          <br />
                          {service.address.postalCode} {service.address.city}
                        </p>
                      </div>
                      {/* Bouton Localisation */}
                      {service.address.maps_url && (
                        <Button
                          variant='default'
                          className='ml-auto'
                          onClick={() =>
                            window.open(
                              service.address.maps_url,
                              '_blank',
                              'noopener,noreferrer'
                            )
                          }
                        >
                          Localisez-nous
                        </Button>
                      )}
                    </div>

                    {/* Horaires */}
                    <div>
                      <h3 className='text-lg font-semibold'>Horaires</h3>
                      <div className='grid grid-cols-2 gap-2 text-gray-600'>
                        {service.hours.monday && (
                          <p>Lundi: {service.hours.monday}</p>
                        )}
                        {service.hours.tuesday && (
                          <p>Mardi: {service.hours.tuesday}</p>
                        )}
                        {service.hours.wednesday && (
                          <p>Mercredi: {service.hours.wednesday}</p>
                        )}
                        {service.hours.thursday && (
                          <p>Jeudi: {service.hours.thursday}</p>
                        )}
                        {service.hours.friday && (
                          <p>Vendredi: {service.hours.friday}</p>
                        )}
                        {service.hours.saturday && (
                          <p>Samedi: {service.hours.saturday}</p>
                        )}
                        {service.hours.sunday && (
                          <p>Dimanche: {service.hours.sunday}</p>
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
          <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {service.keyPoints.map(point => {
                  const KeyPointIcon = Icons[point.icon] || Icons.Info
                  return (
                    <Card key={point.id} className='card-hover'>
                      <CardHeader className='text-center'>
                        <div className='mx-auto mb-4'>
                          <KeyPointIcon className='w-12 h-12 text-primary' />
                        </div>
                        <CardTitle className='text-xl'>{point.title}</CardTitle>
                        <CardDescription className='text-gray-600'>
                          {point.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Ajoutez plus d'infos si besoin */}
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
          <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Notre Équipe
              </h2>

              {loadingTeam && <p>Chargement de l'équipe...</p>}
              {errorTeam && (
                <p className='text-center text-red-500'>
                  Erreur chargement équipe : {errorTeam}
                </p>
              )}
              {!loadingTeam && !errorTeam && teamMembers.length === 0 && (
                <p className='text-center'>Aucun membre de l'équipe trouvé.</p>
              )}

              {!loadingTeam && !errorTeam && teamMembers.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                  {teamMembers.map(member => (
                    <Card key={member.id} className='card-hover'>
                      <CardContent className='p-6 text-center'>
                        <Avatar className='w-24 h-24 mx-auto mb-4'>
                          <AvatarImage
                            src={member.image}
                            alt={member.person_name}
                          />
                          <AvatarFallback>
                            {member.person_name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className='text-xl font-semibold mb-1'>
                          {member.person_name}
                        </h3>
                        <p className='text-primary font-medium mb-2'>
                          {member.job_title}
                        </p>
                        {/* Si vous avez une description en BDD, vous pouvez l'afficher ici */}
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
          <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Nos installations
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {service.images.map(image => (
                  <div key={image.id} className='space-y-4'>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className='rounded-lg shadow-md w-full h-64 object-cover'
                    />
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
