import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

interface DbService {
  id: string
  title: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  service: string // Titre du service (par ex. "Centre de santé")
  photoUrl: string
  isDeleted?: boolean // Marqueur pour suppression
}

export default function TeamEditor () {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [servicesMap, setServicesMap] = useState<Record<string, string>>({})
  const [servicesList, setServicesList] = useState<string[]>([])

  // Charger les services depuis Supabase
  useEffect(() => {
    async function fetchServices () {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title')

        if (error) throw error

        if (data) {
          const map: Record<string, string> = {}
          const list: string[] = []
          data.forEach((service: DbService) => {
            map[service.title] = service.id
            list.push(service.title)
          })
          setServicesMap(map)
          setServicesList(list)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
        toast.error('Erreur lors de la récupération des services')
      }
    }
    fetchServices()
  }, [])

  // Charger l'équipe depuis Supabase
  useEffect(() => {
    async function fetchTeam () {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('id, person_name, job_title, service_id, image')

        if (error) throw error

        if (data) {
          const members = data.map(
            (member: {
              id: string
              person_name: string
              job_title: string
              service_id: string
              image: string
            }) => ({
              id: member.id,
              name: member.person_name,
              role: member.job_title,
              service:
                Object.keys(servicesMap).find(
                  key => servicesMap[key] === member.service_id
                ) ||
                servicesList[0] ||
                'Service inconnu',
              photoUrl: member.image || 'https://placehold.co/128'
            })
          )
          setTeamMembers(members)
        }
      } catch (err) {
        console.error('Error fetching team:', err)
        toast.error("Erreur lors de la récupération de l'équipe")
      }
    }

    if (Object.keys(servicesMap).length > 0) {
      fetchTeam()
    }
  }, [servicesMap, servicesList])

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      service: servicesList[0] || 'Service inconnu', // Par défaut, le premier service valide
      photoUrl: 'https://placehold.co/128'
    }
    setTeamMembers(prev => [...prev, newMember])
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, isDeleted: true } : member
      )
    )
  }

  const updateTeamMember = (
    id: string,
    field: keyof TeamMember,
    value: string
  ) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const rowsToInsert = []
      const rowsToDelete = []

      for (const member of teamMembers) {
        const serviceId = servicesMap[member.service]
        if (!serviceId) {
          throw new Error(`Le service "${member.service}" n'existe pas en BDD`)
        }

        if (member.isDeleted) {
          rowsToDelete.push(member.id) // Ajouter à la liste de suppression
        } else {
          rowsToInsert.push({
            id: member.id,
            person_name: member.name,
            job_title: member.role,
            image: member.photoUrl,
            service_id: serviceId
          })
        }
      }

      // Supprimer les membres marqués pour suppression
      if (rowsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('team')
          .delete()
          .in('id', rowsToDelete)

        if (deleteError) throw deleteError
      }

      // Insérer ou mettre à jour les membres
      if (rowsToInsert.length > 0) {
        const { error: upsertError } = await supabase
          .from('team')
          .upsert(rowsToInsert, { onConflict: 'id' })

        if (upsertError) throw upsertError
      }

      toast.success('Équipe mise à jour avec succès')
    } catch (error: unknown) {
      console.error('Error saving team data:', error)
      toast.error(
        `Erreur lors de la mise à jour de l'équipe: ${(error as Error).message}`
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex-1 p-6 overflow-auto'>
        <div className='max-w-6xl mx-auto space-y-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>Gestion de l'équipe</h2>
            <Button type='button' onClick={addTeamMember}>
              Ajouter un membre
            </Button>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {teamMembers
              .filter(member => !member.isDeleted)
              .map(member => (
                <Card key={member.id}>
                  <CardContent className='pt-6 space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor={`photoUrl-${member.id}`}>
                        URL de la photo
                      </Label>
                      <Input
                        id={`photoUrl-${member.id}`}
                        type='text'
                        placeholder='https://...'
                        value={member.photoUrl}
                        onChange={e =>
                          updateTeamMember(
                            member.id,
                            'photoUrl',
                            e.target.value
                          )
                        }
                      />
                      {member.photoUrl && (
                        <img
                          src={member.photoUrl}
                          alt={`Photo de ${member.name}`}
                          className='w-32 h-32 object-cover rounded-lg mx-auto'
                        />
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`name-${member.id}`}>Nom</Label>
                      <Input
                        id={`name-${member.id}`}
                        value={member.name}
                        onChange={e =>
                          updateTeamMember(member.id, 'name', e.target.value)
                        }
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`role-${member.id}`}>Fonction</Label>
                      <Input
                        id={`role-${member.id}`}
                        value={member.role}
                        onChange={e =>
                          updateTeamMember(member.id, 'role', e.target.value)
                        }
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`service-${member.id}`}>Service</Label>
                      <Select
                        value={member.service}
                        onValueChange={value =>
                          updateTeamMember(member.id, 'service', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {servicesList.map(title => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant='destructive'
                      size='sm'
                      className='w-full'
                      onClick={() => removeTeamMember(member.id)}
                      type='button'
                    >
                      <Trash2 className='w-4 h-4 mr-2' />
                      Supprimer
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Button type='submit' className='w-full'>
            Enregistrer les modifications
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  )
}
