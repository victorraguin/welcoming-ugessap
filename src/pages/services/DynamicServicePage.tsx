// src/pages/services/DynamicServicePage.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import ServicePage from '@/components/services/ServicePage'
import { useServices } from '@/hooks/useServices'
import { Service } from '@/types/service'
import { useEffect } from 'react'
import Loader from '@/components/Loader'
import { Helmet } from 'react-helmet-async'

function DynamicServicePage () {
  const { slug } = useParams()
  const { services, isLoading, isError, fetchServices } = useServices()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  if (isLoading) return <Loader />
  if (isError)
    return <p>Une erreur est survenue lors du chargement des services.</p>

  const service: Service | undefined = services.find(s => s.slug === slug)

  if (!service) {
    return <p>Le service demandé est introuvable.</p>
  }

  return (
    <>
      <Helmet>
        <title>UGESSAP - Nos services</title>
        <meta name='description' content='Bienvenue sur UGESSAP. ' />
        <meta property='og:title' content='UGESSAP - Nos services' />
        <meta property='og:description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:image' content={'/ugessap-default-image.png'} />
      </Helmet>
      <ServicePage service={service} />
    </>
  )
}

export default DynamicServicePage
