import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Eye, EyeOff, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { ServiceKeyPoints } from './ServiceKeyPoints'
import { ServiceImages } from './ServiceImages'
import { ServiceButtons } from './ServiceButtons'
import { ServiceAddress } from './ServiceAddress'
import { ServiceHours } from './ServiceHours'
import { Service } from '@/types/service'

interface ServiceFormProps {
  service: Service
  onUpdate: (id: string, field: keyof Service, value: any) => void
  onRemove: (id: string) => void
}

export const ServiceForm = ({
  service,
  onUpdate,
  onRemove
}: ServiceFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className='relative'>
        <div className='flex justify-between items-center'>
          <CardTitle className='flex-1'>
            {service.title || 'Nouveau service'}
          </CardTitle>
          <div className='flex gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <EyeOff className='h-4 w-4' />
              ) : (
                <Eye className='h-4 w-4' />
              )}
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                onRemove(service.id)
              }}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className='space-y-6'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <a
                href='https://lucide.dev/icons/'
                target='_blank'
                rel='noreferrer'
                className='text-primary hover:underline cursor-pointer w-fit'
              >
                <Label className='cursor-pointer'>Icône</Label>
              </a>
              <Input
                value={service.icon}
                onChange={e => onUpdate(service.id, 'icon', e.target.value)}
                placeholder="Nom de l'icône (ex: LayoutGrid)"
              />
            </div>
            <div className='grid gap-2'>
              <Label>Titre</Label>
              <Input
                value={service.title}
                onChange={e => onUpdate(service.id, 'title', e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Description courte</Label>
              <Input
                value={service.shortDescription}
                onChange={e =>
                  onUpdate(service.id, 'shortDescription', e.target.value)
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label>Description longue</Label>
              <Textarea
                value={service.longDescription}
                onChange={e =>
                  onUpdate(service.id, 'longDescription', e.target.value)
                }
              />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label>Ordre</Label>
            <Input
              type='number'
              value={service.order_index}
              onChange={e =>
                onUpdate(
                  service.id,
                  'order_index',
                  parseInt(e.target.value, 10) || 0
                )
              }
              placeholder="Entrez l'ordre du service"
            />
          </div>

          <ServiceAddress
            address={service.address}
            onUpdate={address => onUpdate(service.id, 'address', address)}
          />

          <ServiceHours
            hours={service.hours}
            onUpdate={hours => onUpdate(service.id, 'hours', hours)}
          />

          <ServiceKeyPoints
            keyPoints={service.keyPoints}
            onUpdate={keyPoints => onUpdate(service.id, 'keyPoints', keyPoints)}
          />

          <ServiceImages
            images={service.images}
            onUpdate={images => onUpdate(service.id, 'images', images)}
          />

          <ServiceButtons
            buttons={service.buttons}
            onUpdate={buttons => onUpdate(service.id, 'buttons', buttons)}
          />
        </CardContent>
      )}
    </Card>
  )
}
