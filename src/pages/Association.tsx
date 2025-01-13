import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Building2, Users, Trophy, Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DOMPurify from 'dompurify'
import Loader from '@/components/Loader'
import { Link } from 'react-router-dom'
import { Service } from '@/types/service'
import { useServices } from '@/hooks/useServices'
import ServicesSection from '@/components/Services'

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

        // 1) Récupérer l’association (supposons qu’il n’y en ait qu’une)
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

        // 3) Récupérer l’équipe
        const { data: teamData, error: teamError } = await supabase
          .from('team')
          .select('*')
        if (teamError) {
          // On log l’erreur, mais on ne bloque pas
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
      <p className='p-8 text-center text-red-500'>
        Erreur lors du chargement : {error}
      </p>
    )
  }

  if (!association) {
    return <p className='p-8 text-center'>Aucune association à afficher.</p>
  }

  // On déstructure l’association
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
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-primary/5 py-20 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div>
                <h1 className='text-4xl md:text-5xl font-bold mb-6 slide-up'>
                  {name}
                </h1>
                <p className='text-lg text-gray-600 mb-8 slide-up'>
                  {short_description}
                </p>
              </div>
              {/* Image illustrant l’association (à adapter selon vos besoins) */}
              <div className='relative'>
                <img
                  src={logo}
                  alt={name}
                  className='rounded-lg shadow-xl w-full fade-in'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className='py-16 bg-white'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Notre Mission
            </h2>
            <div className='max-w-4xl mx-auto space-y-6 text-gray-600'>
              <div
                className='text-lg'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(association?.description || '')
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Services */}
        <ServicesSection />

        {/* Points clés */}
        {key_points.length > 0 && (
          <section className='py-16'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Nos points clés
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {key_points.map((point, idx) => {
                  const IconComponent =
                    iconsMap[point.icon as keyof typeof iconsMap] || Building2
                  return (
                    <Card key={idx} className='card-hover'>
                      <CardContent className='p-6'>
                        <IconComponent className='w-12 h-12 text-primary mb-4' />
                        <h3 className='text-xl font-semibold mb-2'>
                          {point.title}
                        </h3>
                        <p className='text-gray-600'>{point.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Équipe */}
        {team.length > 0 && (
          <section className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Notre Équipe
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {team.map(member => (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Partenaires */}
        {partners.length > 0 && (
          <section className='bg-gray-50 py-16'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Nos partenaires
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {partners.map((partner, index) => (
                  <Card key={index} className='card-hover'>
                    <CardContent className='p-6 text-center'>
                      {partner.logoUrl && (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className='w-24 h-24 object-contain mx-auto mb-4'
                        />
                      )}
                      <h3 className='text-xl font-semibold mb-2'>
                        {partner.name}
                      </h3>
                      <p className='text-gray-600'>{partner.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recrutement */}
        {/* On n’affiche cette section que si is_open_for_recruitment === true */}
        {is_open_for_recruitment && jobs.length > 0 && (
          <section className='py-16'>
            <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-12'>
                Nous recrutons
              </h2>
              <div className='max-w-2xl mx-auto'>
                {jobs.map(job => (
                  <Card key={job.id} className='mb-4 card-hover'>
                    <CardContent className='p-6'>
                      <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                        <div className='mb-4 md:mb-0'>
                          <h3 className='text-xl font-semibold'>{job.title}</h3>
                          <p className='text-gray-600'>{job.description}</p>
                        </div>
                        <Link
                          to={`/contact?tab=recruitment&position=${job.title}`}
                          className='text-primary hover:underline mt-4 md:mt-0 md:ml-4'
                        >
                          Postuler
                        </Link>
                      </div>
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
  )
}

export default Association
