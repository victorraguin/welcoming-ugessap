import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate, useLocation } from 'react-router-dom'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

type ComplaintFormData = {
  name: string
  email: string
  serviceType: string
  complaintDetails: string
}

type RecruitmentFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience: string
  motivation: string
}

type Job = {
  id: string
  title: string
}

const Contact = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const currentTab = params.get('tab') || 'contact'
  const selectedPosition = params.get('position') || 'Candidature spontanée'

  const handleTabChange = (tab: string) => {
    navigate(`?tab=${tab}`)
  }

  const [jobs, setJobs] = useState<Job[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true)
        const { data, error } = await supabase
          .from('association_jobs')
          .select('id, title')
        if (error) throw error
        setJobs(data || [])
      } catch (error) {
        console.error('Erreur lors de la récupération des postes:', error)
      } finally {
        setLoadingJobs(false)
      }
    }
    fetchJobs()
  }, [])

  // Forms
  const contactForm = useForm<ContactFormData>()
  const complaintForm = useForm<ComplaintFormData>()
  const recruitmentForm = useForm<RecruitmentFormData>({
    defaultValues: {
      position: selectedPosition
    }
  })

  const onSubmit = (
    data: ContactFormData | ComplaintFormData | RecruitmentFormData,
    type: string
  ) => {
    const messages = {
      contact: {
        title: 'Message envoyé',
        description: 'Nous vous répondrons dans les plus brefs délais.'
      },
      complaint: {
        title: 'Réclamation enregistrée',
        description:
          'Nous traiterons votre réclamation dans les plus brefs délais.'
      },
      recruitment: {
        title: 'Candidature envoyée',
        description: 'Nous étudierons votre candidature avec attention.'
      }
    }
    toast(messages[type as keyof typeof messages])
    if (type === 'contact') contactForm.reset()
    if (type === 'complaint') complaintForm.reset()
    if (type === 'recruitment') recruitmentForm.reset()
  }

  const handlePositionChange = (position: string) => {
    recruitmentForm.setValue('position', position)
    navigate(`?tab=recruitment&position=${encodeURIComponent(position)}`)
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl font-bold text-center mb-12'>
            Contactez-nous
          </h1>

          <Card className='max-w-4xl mx-auto'>
            <CardContent className='p-6'>
              <Tabs
                defaultValue={currentTab}
                value={currentTab}
                onValueChange={handleTabChange}
                className='w-full'
              >
                <TabsList className='grid w-full grid-cols-3 mb-8'>
                  <TabsTrigger value='contact'>Contact</TabsTrigger>
                  <TabsTrigger value='complaint'>Réclamation</TabsTrigger>
                  <TabsTrigger value='recruitment'>Recrutement</TabsTrigger>
                </TabsList>

                {/* Contact Form */}
                <TabsContent value='contact'>
                  <Form {...contactForm}>
                    <form
                      onSubmit={contactForm.handleSubmit(data =>
                        onSubmit(data, 'contact')
                      )}
                      className='space-y-6'
                    >
                      <FormField
                        control={contactForm.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder='Votre nom' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='votre@email.com'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name='subject'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Sujet de votre message'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name='message'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Votre message'
                                className='min-h-[120px]'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' className='w-full'>
                        Envoyer
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Complaint Form */}
                <TabsContent value='complaint'>
                  <Form {...complaintForm}>
                    <form
                      onSubmit={complaintForm.handleSubmit(data =>
                        onSubmit(data, 'complaint')
                      )}
                      className='space-y-6'
                    >
                      <FormField
                        control={complaintForm.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder='Votre nom' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                placeholder='votre@email.com'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name='serviceType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service concerné</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Centre de santé, Med'event..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name='complaintDetails'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Détails de la réclamation</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Décrivez votre réclamation'
                                className='min-h-[120px]'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' className='w-full'>
                        Envoyer la réclamation
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Recruitment Form */}
                <TabsContent value='recruitment'>
                  <Form {...recruitmentForm}>
                    <form
                      onSubmit={recruitmentForm.handleSubmit(data =>
                        onSubmit(data, 'recruitment')
                      )}
                      className='space-y-6'
                    >
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={recruitmentForm.control}
                          name='firstName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder='Votre prénom' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={recruitmentForm.control}
                          name='lastName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder='Votre nom' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={recruitmentForm.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type='email'
                                  placeholder='votre@email.com'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={recruitmentForm.control}
                          name='phone'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder='Votre numéro' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={recruitmentForm.control}
                        name='position'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste recherché</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={handlePositionChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  {field.value || 'Sélectionnez un poste'}
                                </SelectTrigger>
                                <SelectContent>
                                  {loadingJobs ? (
                                    <SelectItem value='loading' disabled>
                                      Chargement des postes...
                                    </SelectItem>
                                  ) : (
                                    <>
                                      {jobs
                                        .filter(job => job.title) // Filtre les titres vides ou indéfinis
                                        .map(job => (
                                          <SelectItem
                                            key={job.id}
                                            value={job.title}
                                          >
                                            {job.title}
                                          </SelectItem>
                                        ))}
                                      <SelectItem value='Candidature spontanée'>
                                        Candidature spontanée
                                      </SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recruitmentForm.control}
                        name='experience'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expérience professionnelle</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Décrivez votre expérience'
                                className='min-h-[100px]'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recruitmentForm.control}
                        name='motivation'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lettre de motivation</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Pourquoi souhaitez-vous nous rejoindre ?'
                                className='min-h-[120px]'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' className='w-full'>
                        Envoyer ma candidature
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
