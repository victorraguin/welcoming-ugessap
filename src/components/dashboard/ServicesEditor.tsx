/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ServiceForm } from './services/ServiceForm'
import { useServices } from '@/hooks/useServices'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import FloatingSaveButton from '@/components/FloatingSaveButton'

const ServicesEditor = (): JSX.Element => {
  const navigate = useNavigate()
  const {
    services,
    isLoading,
    fetchServices,
    addService,
    removeService,
    updateService,
    handleButtonsUpdate
  } = useServices()

  const [initialServices, setInitialServices] = useState<unknown[]>([])
  const [isModified, setIsModified] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    const loadServices = async (): Promise<void> => {
      await fetchServices()
    }

    loadServices()
  }, [])

  // Stocker les services initiaux après le chargement
  useEffect(() => {
    if (!isLoading && services.length > 0 && initialServices.length === 0) {
      setInitialServices(JSON.parse(JSON.stringify(services)))
    }
  }, [isLoading, services])

  // Vérifier si des modifications ont été apportées
  useEffect(() => {
    if (initialServices.length > 0) {
      const servicesChanged =
        JSON.stringify(services) !== JSON.stringify(initialServices)
      setIsModified(servicesChanged)
    }
  }, [services, initialServices])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setSaving(true)
    try {
      for (const service of services) {
        const { error } = await supabase.from('services').upsert({
          id: service.id,
          title: service.title,
          description: service.longDescription,
          short_description: service.shortDescription,
          icon_name: service.icon,
          key_points: service.keyPoints,
          image: service.images[0]?.url || null,
          address: JSON.stringify(service.address),
          schedule: service.hours,
          maps_url: service.maps_url,
          order_index: service.order_index,
          slug: service.slug
        })

        handleButtonsUpdate(service.id, service.buttons)

        if (error) throw error
      }

      toast.success('Services enregistrés avec succès')

      // Mettre à jour les services initiaux après sauvegarde
      setInitialServices(JSON.parse(JSON.stringify(services)))
      setIsModified(false)
    } catch (error) {
      console.error('Error saving services:', error)
      toast.error("Erreur lors de l'enregistrement des services")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex-1 overflow-auto p-8'>
        <div className='max-w-6xl mx-auto'>
          <p>Chargement des services...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='flex-1 overflow-auto md:p-8'>
        <div className='mx-auto space-y-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>Gestion des services</h1>
            <Button type='button' onClick={addService}>
              <Plus className='mr-2 h-4 w-4' /> Ajouter un service
            </Button>
          </div>

          <div className='grid gap-4 pb-16'>
            {services.map(service => (
              <ServiceForm
                key={service.id}
                service={service}
                onUpdate={updateService}
                onRemove={removeService}
              />
            ))}
          </div>

          {/* Bouton flottant pour enregistrer */}
          <FloatingSaveButton
            onClick={handleSubmit}
            loading={saving}
            initialModified={isModified}
            watchDependencies={[services]}
          />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default ServicesEditor
