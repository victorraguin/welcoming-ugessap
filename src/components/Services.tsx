import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import * as LucideIcons from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, LucideProps } from 'lucide-react'
import { useServices } from '@/hooks/useServices'
import { useEffect } from 'react'
import { getButtonAction } from '@/lib/utils'

const ServicesSection = () => {
  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices() // Assurez-vous de charger les services au montage
  }, [])

  console.log('Supabase raw data:', services)
  if (isError) {
    console.error('Error loading services')
    toast.error('Erreur lors du chargement des service')
  }

  const getOpeningStatus = (
    hours: Record<string, string | undefined>
  ): { status: string; color: string } | null => {
    const frenchToEnglishDays: Record<string, string> = {
      lundi: 'monday',
      mardi: 'tuesday',
      mercredi: 'wednesday',
      jeudi: 'thursday',
      vendredi: 'friday',
      samedi: 'saturday',
      dimanche: 'sunday'
    }

    const englishDays = Object.values(frenchToEnglishDays) // Liste ordonnée des jours en anglais
    const now = new Date()
    const frenchDay = now
      .toLocaleDateString('fr-FR', { weekday: 'long' })
      .toLowerCase() // Jour en français
    const day = frenchToEnglishDays[frenchDay] // Convertir en anglais
    const time = now.getHours() * 60 + now.getMinutes() // Convertir l'heure actuelle en minutes

    const todayHours = hours[day]

    if (!todayHours) return null // Retourner null si pas d'horaires pour aujourd'hui

    // Récupérer les périodes d'aujourd'hui
    const periods = todayHours
      ? todayHours.split(',').map(period => {
          const [start, end] = period.split('-').map(h => {
            const [hour, minute] = h.split('h').map(Number)
            return hour * 60 + (minute || 0) // Convertir l'heure en minutes
          })
          return { start, end }
        })
      : []

    for (const { start, end } of periods) {
      if (time >= start && time < end) {
        if (end - time <= 30) {
          const closingTime = `${Math.floor(end / 60)}h${end % 60 || '00'}`
          return {
            status: `Ferme bientôt (${closingTime})`,
            color: 'text-orange-400'
          }
        }
        const closingTime = `${Math.floor(end / 60)}h${end % 60 || '00'}`
        return {
          status: `Ouvert jusqu'à ${closingTime}`,
          color: 'text-lime-600'
        }
      }
      if (start - time > 0 && start - time <= 30) {
        const openingTime = `${Math.floor(start / 60)}h${start % 60 || '00'}`
        return {
          status: `Ouvre bientôt (${openingTime})`,
          color: 'text-lime-600'
        }
      }
    }

    // Si fermé aujourd'hui, trouver la prochaine ouverture
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (englishDays.indexOf(day) + i) % 7
      const nextDay = englishDays[nextDayIndex]
      const nextDayHours = hours[nextDay]

      if (nextDayHours) {
        const nextOpeningPeriod = nextDayHours.split(',')[0]
        const [nextStart] = nextOpeningPeriod.split('-').map(h => {
          const [hour, minute] = h.split('h').map(Number)
          return `${hour}h${minute || '00'}`
        })

        const nextOpeningDate = new Date()
        nextOpeningDate.setDate(now.getDate() + i)
        const formattedDate = nextOpeningDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long'
        })

        return {
          status: `Fermé - Prochaine ouverture le ${formattedDate} à ${nextStart}`,
          color: 'text-red-500'
        }
      }
    }

    // Par défaut, considéré comme fermé sans horaires définis
    return { status: 'Fermé', color: 'text-red-500' }
  }

  const getIconComponent = (
    iconName: string | null
  ): React.ElementType<LucideProps> | null => {
    if (!iconName) return null

    const formattedIconName = iconName.trim()
    const IconComponent =
      LucideIcons[formattedIconName as keyof typeof LucideIcons]

    if (!IconComponent) {
      console.warn(`Icon "${formattedIconName}" not found`)
      return null
    }

    return IconComponent as React.ElementType<LucideProps>
  }

  const handleServiceAction = (serviceId: string, action: string) => {
    toast.success(`Action ${action} pour le service ${serviceId}`)
  }

  console.log('services', services)

  return (
    <section id='services' className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Nos Services</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {isLoading
            ? // Skeleton loaders
              [...Array(3)].map((_, index) => (
                <Card key={index} className='card-hover'>
                  <CardHeader className='text-center'>
                    <div className='mx-auto mb-4'>
                      <Skeleton className='h-12 w-12 rounded-full' />
                    </div>
                    <Skeleton className='h-6 w-32 mx-auto' />
                  </CardHeader>
                  <CardContent className='text-center'>
                    <Skeleton className='h-20 w-full mb-6' />
                    <Skeleton className='h-10 w-full' />
                  </CardContent>
                </Card>
              ))
            : services?.map(service => {
                const IconComponent = getIconComponent(service.icon)
                const openingStatus = service.hours
                  ? getOpeningStatus(service.hours)
                  : null

                if (!IconComponent) {
                  console.warn(`No valid icon component for "${service.icon}"`)
                }

                return (
                  <Card key={service.id} className='card-hover'>
                    <CardHeader className='text-center'>
                      <div className='mx-auto mb-4'>
                        {IconComponent && (
                          <IconComponent className='w-12 h-12 text-primary' />
                        )}
                      </div>
                      <CardTitle className='text-xl mb-2'>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                      <p className='text-gray-600 mb-6'>
                        {service.shortDescription}
                      </p>

                      {/* Boutons associés */}

                      {service.buttons && service.buttons.length > 0 && (
                        <div className='flex flex-wrap gap-4'>
                          {service.buttons.map(button => {
                            const action = getButtonAction(button.link)
                            return (
                              <Button
                                key={button.id}
                                variant='default'
                                className='w-full mb-2'
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
                      {service.address && service.address.maps_url && (
                        <Button
                          key={service.id}
                          variant='default'
                          className='w-full mb-2'
                          onClick={() =>
                            window.open(
                              service.address.maps_url,
                              '_blank',
                              'noopener,noreferrer'
                            )
                          }
                        >
                          Localisation
                        </Button>
                      )}
                      {openingStatus && (
                        <p
                          className={`text-sm text-center pt-2 ${openingStatus.color}`}
                        >
                          {openingStatus.status}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
