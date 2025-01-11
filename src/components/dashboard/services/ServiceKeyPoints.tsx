import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'

interface KeyPoint {
  id: string
  icon: string
  description: string
  title: string
}

interface ServiceKeyPointsProps {
  keyPoints: KeyPoint[]
  onUpdate: (keyPoints: KeyPoint[]) => void
}

export const ServiceKeyPoints = ({
  keyPoints,
  onUpdate
}: ServiceKeyPointsProps) => {
  const addKeyPoint = () => {
    const newKeyPoint: KeyPoint = {
      id: crypto.randomUUID(),
      icon: 'Check',
      description: '',
      title: ''
    }
    onUpdate([...keyPoints, newKeyPoint])
  }

  const removeKeyPoint = (id: string) => {
    onUpdate(keyPoints.filter(kp => kp.id !== id))
  }

  const updateKeyPoint = (id: string, field: keyof KeyPoint, value: string) => {
    onUpdate(
      keyPoints.map(kp => (kp.id === id ? { ...kp, [field]: value } : kp))
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Points clés</h3>
        <Button onClick={addKeyPoint}>
          <Plus className='mr-2 h-4 w-4' /> Ajouter
        </Button>
      </div>
      <div className='grid gap-4'>
        {keyPoints.map(keyPoint => (
          <div key={keyPoint.id} className='flex gap-4 items-start'>
            <div className='flex-1 space-y-2'>
              <Input
                value={keyPoint.icon}
                onChange={e =>
                  updateKeyPoint(keyPoint.id, 'icon', e.target.value)
                }
                placeholder="Nom de l'icône"
              />
              <Input
                value={keyPoint.title}
                onChange={e =>
                  updateKeyPoint(keyPoint.id, 'title', e.target.value)
                }
                placeholder='Titre'
              />
              <Input
                value={keyPoint.description}
                onChange={e =>
                  updateKeyPoint(keyPoint.id, 'description', e.target.value)
                }
                placeholder='Description'
              />
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => removeKeyPoint(keyPoint.id)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
