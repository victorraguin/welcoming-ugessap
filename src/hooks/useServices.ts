import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Service } from '@/types/service'
import { toast } from 'sonner'
import { transformServiceFromDb } from '@/utils/serviceTransformers'

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const QueryClient = useQueryClient()

  const fetchServices = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('services')
        .select(
          `
          *,
          service_buttons(*),
          team(*)
        `
        )
        .order('order_index', { ascending: true })

      console.log(data)

      if (error) throw error

      const formattedServices = data.map(transformServiceFromDb)
      setServices(formattedServices)
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Erreur lors du chargement des services')
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const addService = async () => {
    try {
      const { data: session, error: sessionError } =
        await supabase.auth.getSession()
      if (sessionError || !session?.session) {
        setIsError(true)
        throw new Error('Not authenticated')
      }

      const { data: newService, error } = await supabase
        .from('services')
        .insert({
          title: 'Nouveau service',
          icon_name: 'LayoutGrid',
          key_points: [],
          schedule: {
            lundi: null,
            mardi: null,
            mercredi: null,
            jeudi: null,
            vendredi: null,
            samedi: null,
            dimanche: null
          }
        })
        .select(`*, service_buttons(*)`)
        .single()

      if (error) {
        setIsError(true)
        throw error
      }

      const formattedService = transformServiceFromDb(newService)
      setServices([...services, formattedService])
      toast.success('Service créé avec succès')
    } catch (error) {
      console.error('Error adding service:', error)
      toast.error('Erreur lors de la création du service')
      setIsError(true)
    }
  }

  const removeService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) {
        setIsError(true)
        throw error
      }

      toast.success('Service supprimé avec succès')
      QueryClient.invalidateQueries({ queryKey: ['services'] })
      await fetchServices()
    } catch (error) {
      console.error('Error removing service:', error)
      toast.error('Erreur lors de la suppression du service')
      setIsError(true)
    }
  }

  const updateService = (
    id: string,
    field: keyof Service,
    value: string | number | boolean | object
  ) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    )
  }

  const handleButtonsUpdate = async (
    serviceId: string,
    buttons: Service['buttons']
  ) => {
    try {
      await supabase
        .from('service_buttons')
        .delete()
        .eq('service_id', serviceId)

      if (buttons.length > 0) {
        const buttonsData = buttons.map((button, index) => ({
          service_id: serviceId,
          label: button.text,
          url: button.link,
          order_index: index
        }))

        const { error } = await supabase
          .from('service_buttons')
          .insert(buttonsData)

        if (error) {
          setIsError(true)
          throw error
        }
      }
    } catch (error) {
      console.error('Error updating buttons:', error)
      throw error
    }
  }

  return {
    services,
    isLoading,
    fetchServices,
    addService,
    removeService,
    updateService,
    handleButtonsUpdate,
    isError
  }
}
