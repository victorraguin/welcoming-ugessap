/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import ServicePage from '@/components/services/ServicePage'
import { useServices } from '@/hooks/useServices'
import { Service } from '@/types/service'
import { useEffect } from 'react'
import Loader from '@/components/Loader'

function DynamicServicePage () {
  const { slug } = useParams()
  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices()
  }, [])

  if (isLoading) return <Loader />
  if (isError)
    return <p>Une erreur est survenue lors du chargement des services.</p>

  const service: Service | undefined = services.find(s => s.slug === slug)

  if (!service) {
    return <p>Le service demandé est introuvable.</p>
  }

  return <ServicePage service={service} />
}

export default DynamicServicePage
