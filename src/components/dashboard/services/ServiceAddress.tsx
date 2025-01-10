import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Address {
  maps_url: string
  street?: string
  city?: string
  postalCode?: string
}

interface ServiceAddressProps {
  address?: Address
  onUpdate: (address: Address) => void
}

export const ServiceAddress = ({ address, onUpdate }: ServiceAddressProps) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Adresse (optionnelle)</h3>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label>Rue</Label>
          <Input
            value={address?.street || ''}
            onChange={e =>
              onUpdate({
                ...address,
                street: e.target.value
              })
            }
          />
        </div>
        <div className='grid gap-2'>
          <Label>Ville</Label>
          <Input
            value={address?.city || ''}
            onChange={e =>
              onUpdate({
                ...address,
                city: e.target.value
              })
            }
          />
        </div>
        <div className='grid gap-2'>
          <Label>Code postal</Label>
          <Input
            value={address?.postalCode || ''}
            onChange={e =>
              onUpdate({
                ...address,
                postalCode: e.target.value
              })
            }
          />
        </div>
        <div className='grid gap-2'>
          <Label>Lien vers Google Maps</Label>
          <Input
            value={address?.maps_url || ''}
            onChange={e =>
              onUpdate({
                ...address,
                maps_url: e.target.value
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
