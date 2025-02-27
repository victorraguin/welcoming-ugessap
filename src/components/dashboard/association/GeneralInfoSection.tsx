import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import RichTextEditor from '../RichTextEditor'

interface GeneralInfoProps {
  name: string
  shortDescription: string
  longDescription: string
  logoUrl: string
  onUpdate: (field: string, value: string) => void
}

export const GeneralInfoSection = ({
  name,
  shortDescription,
  longDescription,
  logoUrl,
  onUpdate
}: GeneralInfoProps) => {
  return (
    <Card className='shadow'>
      <CardContent className='space-y-4 p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nom de l'association</Label>
            <Input
              id='name'
              value={name}
              onChange={e => onUpdate('name', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='logo'>Logo URL</Label>
            <Input
              id='logo'
              value={logoUrl}
              onChange={e => onUpdate('logoUrl', e.target.value)}
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='shortDescription'>Description courte</Label>
          <Input
            id='shortDescription'
            value={shortDescription}
            onChange={e => onUpdate('shortDescription', e.target.value)}
            placeholder="Une brève description de l'association (1-2 phrases)"
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='longDescription'>Description détaillée</Label>
          <RichTextEditor
            value={longDescription}
            onChange={value => onUpdate('longDescription', value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
