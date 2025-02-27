import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

interface Partner {
  id: string
  name: string
  description: string
  logoUrl: string
}

interface PartnersSectionProps {
  partners: Partner[]
  onAddPartner: () => void
  onRemovePartner: (id: string) => void
  onUpdatePartner: (id: string, field: string, value: string) => void
}

export const PartnersSection = ({
  partners,
  onAddPartner,
  onRemovePartner,
  onUpdatePartner
}: PartnersSectionProps) => {
  return (
    <CardContent>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
        {partners.map(partner => (
          <div
            key={partner.id}
            className='space-y-4 p-4 border rounded-lg relative bg-white shadow'
          >
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute top-2 right-2'
              onClick={() => onRemovePartner(partner.id)}
            >
              <X className='h-4 w-4' />
            </Button>
            <div className='space-y-2'>
              <Label htmlFor={`partner-name-${partner.id}`}>Nom</Label>
              <Input
                id={`partner-name-${partner.id}`}
                value={partner.name}
                onChange={e =>
                  onUpdatePartner(partner.id, 'name', e.target.value)
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor={`partner-description-${partner.id}`}>
                Description
              </Label>
              <Input
                id={`partner-description-${partner.id}`}
                value={partner.description}
                onChange={e =>
                  onUpdatePartner(partner.id, 'description', e.target.value)
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor={`partner-logo-${partner.id}`}>Logo URL</Label>
              <Input
                id={`partner-logo-${partner.id}`}
                value={partner.logoUrl}
                onChange={e =>
                  onUpdatePartner(partner.id, 'logoUrl', e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}
