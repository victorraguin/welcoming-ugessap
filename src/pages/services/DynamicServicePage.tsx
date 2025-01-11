import { useParams } from 'react-router-dom'
import ServicePage from '@/components/services/ServicePage'
import { useServices } from '@/hooks/useServices'
import { Service, ServiceData } from '@/types/service'
import { useEffect } from 'react'

function DynamicServicePage () {
  const { slug } = useParams()
  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices()
  }, [])

  console.log('slug', slug)
  console.log('services', services)

  // Pendant le chargement ou s'il y a une erreur
  if (isLoading) return <p>Chargement en cours...</p>
  if (isError)
    return <p>Une erreur est survenue lors du chargement des services.</p>

  // Trouver le service correspondant au slug
  const service: Service | undefined = services.find(s => s.slug === slug)

  // Gérer le cas où aucun service ne correspond au slug
  if (!service) {
    return <p>Le service demandé est introuvable.</p>
  }

  // Rendre le composant de service avec les données
  return <ServicePage service={service} />
}

export default DynamicServicePage
