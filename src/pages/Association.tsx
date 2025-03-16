import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import {
  Building2,
  Users,
  Trophy,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DOMPurify from 'dompurify'
import Loader from '@/components/Loader'
import { Link } from 'react-router-dom'
import { Service } from '@/types/service'
import { useServices } from '@/hooks/useServices'
import ServicesSection from '@/components/Services'
import { Helmet } from 'react-helmet-async'

// Types pour TypeScript (optionnel)
interface AssociationRecord {
  id: string
  name: string
  description: string
  logo: string
  partners: {
    name: string
    logoUrl: string
    description: string
  }[]
  key_points: {
    icon: string
    title: string
    description: string
  }[]
  is_open_for_recruitment: boolean
  short_description: string
}

interface AssociationJob {
  id: string
  association_id: string
  title: string
  description: string
  image: string
  created_at: string
  updated_at: string
}

interface TeamMember {
  id: string
  image: string
  person_name: string
  job_title: string
  service_id: string
  created_at: string
  updated_at: string
}

// Pour mapper icon string => composant Lucide
const iconsMap = {
  Building2,
  Users,
  Trophy,
  Briefcase
}

const Association = () => {
  // États pour nos données
  const [association, setAssociation] = useState<AssociationRecord | null>(null)
  const [jobs, setJobs] = useState<AssociationJob[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])

  // États chargement/erreurs
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // 1) Récupérer l'association (supposons qu'il n'y en ait qu'une)
        const { data: assocData, error: assocError } = await supabase
          .from('association')
          .select('*')
          .single() // single() => on prend la première occurrence
        if (assocError) throw assocError
        if (!assocData) {
          throw new Error('Aucune association trouvée dans la table.')
        }

        setAssociation({
          ...assocData,
          key_points: assocData.key_points as AssociationRecord['key_points'],
          partners: assocData.partners as AssociationRecord['partners']
        })

        // 2) Récupérer les jobs liés à association_id
        const { data: jobsData, error: jobsError } = await supabase
          .from('association_jobs')
          .select('*')
          .eq('association_id', assocData.id)
        if (jobsError) throw jobsError
        setJobs(jobsData || [])

        // 3) Récupérer l'équipe
        const { data: teamData, error: teamError } = await supabase
          .from('team')
          .select('*')
        if (teamError) {
          // On log l'erreur, mais on ne bloque pas
          console.error('Erreur fetch team:', teamError)
        } else {
          setTeam(teamData || [])
        }
      } catch (err: unknown) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Gestion des états
  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center p-8 max-w-md mx-auto bg-red-50 rounded-xl shadow-md'>
            <div className='flex justify-center mb-4'>
              <div className='p-3 bg-red-100 rounded-full'>
                <Briefcase className='w-8 h-8 text-red-500' />
              </div>
            </div>
            <h2 className='text-2xl font-bold text-red-700 mb-2'>Erreur</h2>
            <p className='text-red-600'>{error}</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!association) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-1 flex items-center justify-center'>
          <p className='p-8 text-center text-gray-500'>
            Aucune association à afficher.
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  // On déstructure l'association
  const {
    name,
    short_description,
    description,
    logo,
    key_points = [],
    partners = [],
    is_open_for_recruitment
  } = association

  return (
    <>
      <Helmet>
        <title>UGESSAP - L'association</title>
        <meta name='description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:title' content='UGESSAP - Association' />
        <meta property='og:description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:image' content='/ugessap-og-image.png' />
      </Helmet>
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
                      <Building2 className='w-12 h-12 text-primary' />
                    </div>
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                      {name}
                    </h1>
                  </div>
                  <p className='text-lg text-gray-600 leading-relaxed'>
                    {short_description}
                  </p>
                </div>
                {/* Image illustrant l'association */}
                <div className='relative group'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>
                  <img
                    src={logo}
                    alt={name}
                    className='relative rounded-lg shadow-2xl w-full object-cover h-[400px] group-hover:scale-[1.01] transition duration-500'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
                {/* Mission */}
                <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                  <h2 className='text-2xl font-bold mb-6 text-primary'>
                    Notre Mission
                  </h2>
                  <div className='space-y-6 text-gray-600'>
                    <div
                      className='text-lg leading-relaxed'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          association?.description || ''
                        )
                      }}
                    ></div>
                  </div>
                </div>

                {/* Points clés */}
                {key_points.length > 0 && (
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <h2 className='text-2xl font-bold mb-6 text-primary'>
                      Nos points clés
                    </h2>
                    <div className='space-y-6'>
                      {key_points.map((point, idx) => {
                        const IconComponent =
                          iconsMap[point.icon as keyof typeof iconsMap] ||
                          Building2
                        return (
                          <div key={idx} className='flex gap-4 items-start'>
                            <div className='p-2 bg-primary/10 rounded-lg'>
                              <IconComponent className='w-6 h-6 text-primary' />
                            </div>
                            <div>
                              <h3 className='text-lg font-semibold mb-1'>
                                {point.title}
                              </h3>
                              <p className='text-gray-600'>
                                {point.description}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Services */}
          <ServicesSection />

          {/* Équipe */}
          {team.length > 0 && (
            <section className='py-16 bg-white'>
              <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-4'>
                  Notre Équipe
                </h2>
                <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full'></div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                  {team.map(member => (
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
              </div>
            </section>
          )}

          {/* Partenaires */}
          {partners.length > 0 && (
            <section className='py-16 bg-gradient-to-b from-white to-gray-50'>
              <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-4'>
                  Nos partenaires
                </h2>
                <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full'></div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {partners.map((partner, index) => (
                    <Card
                      key={index}
                      className='group hover:shadow-xl transition-all duration-300 border-none bg-white/50 backdrop-blur-sm'
                    >
                      <CardHeader className='text-center'>
                        {partner.logoUrl && (
                          <div className='mx-auto mb-6 p-4 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300 w-24 h-24 flex items-center justify-center'>
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className='max-w-full max-h-full object-contain'
                            />
                          </div>
                        )}
                        <CardTitle className='text-xl mb-4'>
                          {partner.name}
                        </CardTitle>
                        <CardDescription className='text-gray-600 text-base'>
                          {partner.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Recrutement */}
          {is_open_for_recruitment && jobs.length > 0 && (
            <section className='py-16 bg-white'>
              <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-4'>
                  Nous recrutons
                </h2>
                <div className='w-20 h-1 bg-primary mx-auto mb-12 rounded-full'></div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
                  {jobs.map(job => (
                    <Card
                      key={job.id}
                      className='overflow-hidden group hover:shadow-xl transition-all duration-300'
                    >
                      {job.image && (
                        <div className='h-48 overflow-hidden'>
                          <img
                            src={job.image}
                            alt={job.title}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className='text-xl group-hover:text-primary transition-colors duration-300'>
                          {job.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-4'>
                        <p className='text-gray-600'>{job.description}</p>
                        <Link
                          to={`/contact?tab=recruitment&position=${job.title}`}
                        >
                          <Button className='w-full group'>
                            <span>Postuler maintenant</span>
                            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Association
