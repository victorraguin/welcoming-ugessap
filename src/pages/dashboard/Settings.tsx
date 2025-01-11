import { useState } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { SidebarProvider } from '@/components/ui/sidebar'

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Message envoyé',
      description: 'Votre message a bien été envoyé au webmaster.'
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <DashboardSidebar />
        <div className='flex-1 p-8'>
          <h1 className='text-3xl font-bold mb-8'>Contact Webmaster</h1>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium mb-1'
                    >
                      Nom
                    </label>
                    <Input
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium mb-1'
                    >
                      Email
                    </label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium mb-1'
                    >
                      Sujet
                    </label>
                    <Input
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium mb-1'
                    >
                      Message
                    </label>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className='min-h-[150px]'
                    />
                  </div>

                  <Button type='submit' className='w-full'>
                    Envoyer
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-primary' />
                  <a
                    href='tel:0662398343'
                    className='text-primary hover:underline'
                    target='_blank'
                  >
                    06.62.39.83.43
                  </a>
                </div>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-primary' />
                  <a
                    href='mailto:victor.raguin@live.fr'
                    className='text-primary hover:underline'
                    target='_blank'
                  >
                    Victor Raguin
                  </a>
                </div>
                <p className='text-sm text-muted-foreground mt-4'>
                  N'hésitez pas à me contacter pour toute question concernant le
                  site web.
                  <br /> <br />
                  <strong> Informations importante:</strong>
                  <ul className='list-disc list-inside'>
                    <li>
                      Toujours trouver l'icone sur{' '}
                      <a
                        href='https://lucide.dev/icons/'
                        className='underline text-primary'
                        target='_blank'
                      >
                        "Lucide Icons"
                      </a>{' '}
                      puis cliquer sur "Copy Component Name"
                    </li>
                    <li>
                      L'hébergement d'images ou de fichiers n'est pas géré mais
                      peut être réalisé sur un service de stockage (
                      <a
                        href='https://postimages.org/fr/'
                        className='underline text-primary'
                      >
                        PostImages
                      </a>{' '}
                      par exemple).{' '}
                      <strong>
                        Attention à copier l'URL généré qui pointe vers l'image
                        directement !
                      </strong>
                    </li>
                    <li>
                      Penser à vérifier l'utilisation du site internet après
                      chaque modificiation
                    </li>
                  </ul>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Settings
