/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as LucideIcons from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, LucideProps, Clock, MapPin } from 'lucide-react'
import { useServices } from '@/hooks/useServices'
import { useEffect } from 'react'
import { getButtonAction } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const ServicesSection = () => {
  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices()
  }, [])

  if (isError) {
    console.error('Error loading services')
    toast.error('Erreur lors du chargement des service')
  }

  const getOpeningStatus = (
    hours: Record<string, string | undefined>
  ): { status: string; color: string; icon: string } | null => {
    const frenchToEnglishDays: Record<string, string> = {
      lundi: 'monday',
      mardi: 'tuesday',
      mercredi: 'wednesday',
      jeudi: 'thursday',
      vendredi: 'friday',
      samedi: 'saturday',
      dimanche: 'sunday'
    }

    const englishDays = Object.values(frenchToEnglishDays)
    const now = new Date()
    const frenchDay = now
      .toLocaleDateString('fr-FR', { weekday: 'long' })
      .toLowerCase()
    const day = frenchToEnglishDays[frenchDay]
    const time = now.getHours() * 60 + now.getMinutes()

    const allUndefined = Object.values(hours).every(
      value => value === undefined
    )
    if (allUndefined) {
      return null
    }

    const todayHours = hours[day]

    // Fonction pour trouver la prochaine ouverture
    const findNextOpening = (startDay: string, startIndex: number = 0) => {
      for (let i = startIndex; i <= 7; i++) {
        const nextDayIndex = (englishDays.indexOf(startDay) + i) % 7
        const nextDay = englishDays[nextDayIndex]
        const nextDayHours = hours[nextDay]

        if (nextDayHours && nextDayHours !== 'Fermé') {
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
            status: `Fermé - Ouvre le ${formattedDate} à ${nextStart}`,
            color: 'text-red-500 bg-red-50',
            icon: 'Clock'
          }
        }
      }
      return null
    }

    // Si fermé aujourd'hui, chercher la prochaine ouverture
    if (!todayHours || todayHours === 'Fermé') {
      const nextOpening = findNextOpening(day, 1)
      return (
        nextOpening || {
          status: 'Fermé',
          color: 'text-red-500 bg-red-50',
          icon: 'Clock'
        }
      )
    }

    const periods = todayHours.split(',').map(period => {
      const [start, end] = period.split('-').map(h => {
        const [hour, minute] = h.split('h').map(Number)
        return hour * 60 + (minute || 0)
      })
      return { start, end }
    })

    // Vérifier les périodes d'ouverture d'aujourd'hui
    let isBeforeFirstPeriod = true
    for (const { start, end } of periods) {
      if (time >= start && time < end) {
        if (end - time <= 30) {
          const closingTime = `${Math.floor(end / 60)}h${end % 60 || '00'}`
          const nextOpening = findNextOpening(day)
          return (
            nextOpening || {
              status: `Ferme bientôt (${closingTime})`,
              color: 'text-orange-500 bg-orange-50',
              icon: 'AlertCircle'
            }
          )
        }
        const closingTime = `${Math.floor(end / 60)}h${end % 60 || '00'}`
        return {
          status: `Ouvert jusqu'à ${closingTime}`,
          color: 'text-green-600 bg-green-50',
          icon: 'CheckCircle'
        }
      }
      if (time < start && isBeforeFirstPeriod) {
        const openingTime = `${Math.floor(start / 60)}h${start % 60 || '00'}`
        return {
          status: `Fermé - Ouvre à ${openingTime}`,
          color: 'text-red-500 bg-blue-50',
          icon: 'Clock'
        }
      }
      isBeforeFirstPeriod = false
    }

    // Si on est après la dernière période, chercher la prochaine ouverture
    const nextOpening = findNextOpening(day, 1)
    return (
      nextOpening || {
        status: 'Fermé',
        color: 'text-red-500 bg-red-50',
        icon: 'Clock'
      }
    )
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

  return (
    <section id='services' className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Nos Services
          </h2>
          <div className='w-20 h-1 bg-primary mx-auto mb-6 rounded-full'></div>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Découvrez les services de santé que nous proposons pour répondre à
            vos besoins
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {isLoading
            ? [...Array(3)].map((_, index) => (
                <Card
                  key={index}
                  className='border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full'
                >
                  <div className='h-48'>
                    <Skeleton className='h-full w-full' />
                  </div>
                  <CardHeader className='text-center'>
                    <div className='mx-auto mb-4'>
                      <Skeleton className='h-12 w-12 rounded-full' />
                    </div>
                    <Skeleton className='h-6 w-32 mx-auto' />
                  </CardHeader>
                  <CardContent className='text-center flex-grow'>
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

                const StatusIcon = openingStatus?.icon
                  ? (LucideIcons[
                      openingStatus.icon as keyof typeof LucideIcons
                    ] as React.ElementType<LucideProps>)
                  : null

                return (
                  <Card
                    key={service.id}
                    className='flex flex-col h-full border shadow-md hover:shadow-xl transition-all duration-300 group'
                  >
                    <div className='h-48 relative overflow-hidden'>
                      {service.images[0] ? (
                        <img
                          src={service.images[0].url}
                          alt={service.images[0].alt}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                      ) : (
                        <div className='w-full h-full bg-gray-100' />
                      )}
                      {openingStatus && (
                        <div className='absolute top-3 left-3 md:right-3'>
                          <Badge
                            className={`${openingStatus.color} shadow-sm w-fit backdrop-blur-sm border px-3 py-1 rounded-full flex items-center gap-2`}
                          >
                            {StatusIcon && (
                              <StatusIcon className='h-3.5 w-3.5' />
                            )}
                            <span className='font-medium text-xs'>
                              {openingStatus.status}
                            </span>
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <div className='flex items-center gap-3 h-12'>
                        {IconComponent && (
                          <div className='p-2.5 rounded-full bg-primary/10 text-primary'>
                            <IconComponent className='h-5 w-5' />
                          </div>
                        )}
                        <CardTitle className='text-xl'>
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className='flex-grow flex flex-col'>
                      <div className='flex-grow'>
                        <p className='text-gray-600 mb-4'>
                          {service.shortDescription}
                        </p>

                        {service.address && (
                          <div className='flex items-start gap-2 text-sm text-gray-500 mb-4'>
                            <MapPin className='h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400' />
                            <span>
                              {service.address.street},{' '}
                              {service.address.postalCode}{' '}
                              {service.address.city}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='space-y-2 mt-4'>
                        {service.buttons && service.buttons.length > 0 && (
                          <div className='flex flex-wrap gap-2'>
                            {service.buttons.map(button => {
                              const action = getButtonAction(button.link)
                              return (
                                <Button
                                  key={button.id}
                                  variant='default'
                                  size='sm'
                                  className='group w-full'
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
                                  <ArrowRight className='ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform' />
                                </Button>
                              )
                            })}
                          </div>
                        )}

                        {service.address && service.address.maps_url && (
                          <Button
                            variant='outline'
                            size='sm'
                            className='w-full group'
                            onClick={() =>
                              window.open(
                                service.address.maps_url,
                                '_blank',
                                'noopener,noreferrer'
                              )
                            }
                          >
                            <MapPin className='mr-1.5 h-3.5 w-3.5' />
                            Localisez-nous
                          </Button>
                        )}

                        <Link
                          to={`/services/${service.slug}`}
                          className='w-full'
                        >
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-primary hover:text-primary/80 w-full justify-between mt-2'
                          >
                            <span>En savoir plus</span>
                            <ArrowRight className='ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform' />
                          </Button>
                        </Link>
                      </div>
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
