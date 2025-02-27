import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface RecruitmentModeToggleProps {
  isRecruiting: boolean
  onToggle: (value: boolean) => void
}

export const RecruitmentModeToggle = ({
  isRecruiting,
  onToggle
}: RecruitmentModeToggleProps) => {
  return (
    <Card>
      <CardContent className='pt-4'>
        <div className='flex items-center space-x-2'>
          <Switch
            id='recruitment-mode'
            checked={isRecruiting}
            onCheckedChange={onToggle}
          />
          <Label htmlFor='recruitment-mode'>
            Mode recrutement {isRecruiting ? 'activé' : 'désactivé'}
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
