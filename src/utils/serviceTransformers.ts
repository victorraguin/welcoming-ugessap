import { Database } from '@/integrations/supabase/types'
import { Service } from '@/types/service'

type DbService = Database['public']['Tables']['services']['Row']
type DbServiceButton = Database['public']['Tables']['service_buttons']['Row']

export const transformServiceFromDb = (
  service: DbService & { service_buttons: DbServiceButton[] }
): Service => {
  const schedule = service.schedule as Record<string, string | null>

  return {
    id: service.id,
    icon: service.icon_name || 'LayoutGrid',
    title: service.title,
    shortDescription: service.short_description || '',
    longDescription: service.description || '',
    address: service.address ? JSON.parse(service.address) : undefined,
    maps_url: service.maps_url || undefined,
    order_index: service.order_index,
    slug: service.slug,
    hours: {
      monday: schedule.monday || undefined,
      tuesday: schedule.tuesday || undefined,
      wednesday: schedule.wednesday || undefined,
      thursday: schedule.thursday || undefined,
      friday: schedule.friday || undefined,
      saturday: schedule.saturday || undefined,
      sunday: schedule.sunday || undefined
    },
    keyPoints: service.key_points as Array<{
      id: string
      icon: string
      text: string
    }>,
    images: service.image
      ? [{ id: crypto.randomUUID(), url: service.image, alt: service.title }]
      : [],
    buttons: service.service_buttons.map(button => ({
      id: button.id,
      text: button.label,
      link: button.url
    }))
  }
}
