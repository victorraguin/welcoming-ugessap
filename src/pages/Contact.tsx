/* eslint-disable no-irregular-whitespace */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  AlertTriangle,
  UserPlus,
  Send,
  ExternalLink,
  Clock
} from 'lucide-react'

const Contact = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const currentTab = params.get('tab') || 'contact'
  const position = params.get('position') || ''

  const handleTabChange = (tab: string) => {
    navigate(`?tab=${tab}${position ? `&position=${position}` : ''}`)
  }

  return (
    <>
      <Helmet>
        <title>UGESSAP - Contact</title>
        <meta
          name='description'
          content='Contactez UGESSAP pour toute question, réclamation ou candidature.'
        />
        <meta property='og:title' content='UGESSAP - Contact' />
        <meta
          property='og:description'
          content='Contactez UGESSAP pour toute question, réclamation ou candidature.'
        />
        <meta property='og:image' content='/ugessap-og-image.png' />
      </Helmet>
      <div className='min-h-screen flex flex-col'>
        <Navbar />

        {/* Hero Section */}
        <section className='bg-gradient-to-b from-primary/5 to-white py-16 md:py-20'>
          <div className='container mx-auto px-4'>
            <div className='text-center max-w-3xl mx-auto'>
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-8 mb-6'>
                Contactez-nous
              </h1>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Nous sommes à votre écoute pour toute question, réclamation ou
                candidature. N'hésitez pas à nous contacter par le moyen qui
                vous convient le mieux.
              </p>
            </div>
          </div>
        </section>

        <main className='flex-grow py-6 bg-white'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
              {/* Informations de contact */}
              <div className='md:col-span-1 space-y-6'>
                <Card className='overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300'>
                  <CardContent className='p-0'>
                    <div className='bg-primary/10 p-6'>
                      <h2 className='text-xl font-bold text-primary mb-4 flex items-center gap-2'>
                        <Phone className='h-5 w-5' />
                        Coordonnées
                      </h2>
                      <div className='space-y-4'>
                        <div className='flex items-start gap-3'>
                          <MapPin className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                          <div>
                            <p className='font-medium'>Adresse</p>
                            <p className='text-gray-600'>
                              123 Rue de la Santé, 44550 Montoir-de-Bretagne
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <Phone className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                          <div>
                            <p className='font-medium'>Téléphone</p>
                            <p className='text-gray-600'>+33 2 40 XX XX XX</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <Mail className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                          <div>
                            <p className='font-medium'>Email général</p>
                            <a
                              href='mailto:contact@ugessap.org'
                              className='text-primary hover:underline'
                            >
                              contact@ugessap.org
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='p-6'>
                      <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
                        <Clock className='h-5 w-5 text-primary' />
                        Horaires d'ouverture
                      </h2>
                      <div className='space-y-2 text-gray-600'>
                        <p>
                          <span className='font-medium'>Lundi - Vendredi:</span>{' '}
                          9h00 - 18h00
                        </p>
                        <p>
                          <span className='font-medium'>Samedi:</span> 9h00 -
                          12h00
                        </p>
                        <p>
                          <span className='font-medium'>Dimanche:</span> Fermé
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Formulaire de contact avec onglets */}
              <div className='md:col-span-2'>
                <Card className='overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300'>
                  <CardContent className='p-6'>
                    <Tabs
                      defaultValue={currentTab}
                      value={currentTab}
                      onValueChange={handleTabChange}
                      className='w-full'
                    >
                      <TabsList className='grid w-full grid-cols-3 mb-8'>
                        <TabsTrigger
                          value='contact'
                          className='flex items-center gap-2'
                        >
                          <MessageSquare className='h-4 w-4' />
                          <span>Contact</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value='complaint'
                          className='flex items-center gap-2'
                        >
                          <AlertTriangle className='h-4 w-4' />
                          <span>Réclamation</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value='recruitment'
                          className='flex items-center gap-2'
                        >
                          <UserPlus className='h-4 w-4' />
                          <span>Recrutement</span>
                        </TabsTrigger>
                      </TabsList>

                      {/* Onglet Contact */}
                      <TabsContent value='contact'>
                        <div className='space-y-6'>
                          <div className='bg-primary/5 p-6 rounded-xl'>
                            <h2 className='text-2xl font-semibold mb-4 text-primary flex items-center gap-2'>
                              <MessageSquare className='h-5 w-5' />
                              Contactez-nous
                            </h2>
                            <p className='text-gray-600 mb-4'>
                              Pour toute question ou demande d'information,
                              n'hésitez pas à nous contacter. Notre équipe vous
                              répondra dans les plus brefs délais.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                              <a href='mailto:contact@ugessap.org'>
                                <Button className='w-full sm:w-auto group'>
                                  <Mail className='mr-2 h-4 w-4' />
                                  <span>Envoyer un email</span>
                                  <ExternalLink className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                </Button>
                              </a>
                              <a href='tel:+33240XXXXXX'>
                                <Button
                                  variant='outline'
                                  className='w-full sm:w-auto'
                                >
                                  <Phone className='mr-2 h-4 w-4' />
                                  <span>Nous appeler</span>
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Onglet Réclamation */}
                      <TabsContent value='complaint'>
                        <div className='space-y-6'>
                          <div className='bg-orange-50 p-6 rounded-xl'>
                            <h2 className='text-2xl font-semibold mb-4 text-orange-600 flex items-center gap-2'>
                              <AlertTriangle className='h-5 w-5' />
                              Réclamation
                            </h2>
                            <p className='text-gray-600 mb-4'>
                              Pour toute réclamation, veuillez contacter notre
                              direction. Nous nous engageons à traiter votre
                              demande avec la plus grande attention.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                              <a href='mailto:direction@ugessap.org'>
                                <Button className='w-full sm:w-auto bg-orange-600 hover:bg-orange-700 group'>
                                  <Mail className='mr-2 h-4 w-4' />
                                  <span>Contacter la direction</span>
                                  <ExternalLink className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Onglet Recrutement */}
                      <TabsContent value='recruitment'>
                        <div className='space-y-6'>
                          <div className='bg-green-50 p-6 rounded-xl'>
                            <h2 className='text-2xl font-semibold mb-4 text-green-600 flex items-center gap-2'>
                              <UserPlus className='h-5 w-5' />
                              Recrutement
                            </h2>
                            <p className='text-gray-600 mb-4'>
                              {position
                                ? `Vous souhaitez postuler pour le poste de "${position}". Envoyez-nous votre CV et lettre de motivation.`
                                : "Pour toute candidature ou information sur les postes ouverts, n'hésitez pas à nous contacter."}
                            </p>
                            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                              <a href='mailto:aurelien.noguet@ugessap.org'>
                                <Button className='w-full sm:w-auto bg-green-600 hover:bg-green-700 group'>
                                  <Send className='mr-2 h-4 w-4' />
                                  <span>Envoyer ma candidature</span>
                                  <ExternalLink className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* Section carte */}
        <section className='py-12 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <h2 className='text-2xl font-bold text-center mb-8'>
                Nous trouver
              </h2>
              <div className='relative rounded-xl overflow-hidden shadow-lg h-[400px] group'>
                <div className='absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.2616727205864!2d-2.1535839233828216!3d47.3287607071221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48057b8f35fa03b9%3A0x93eabcea7afeb7ce!2sCentre%20de%20Sant%C3%A9%20Polyvalent%20de%20l&#39;Ugessap!5e0!3m2!1sfr!2sfr!4v1742165684220!5m2!1sfr!2sfr'
                  width='100%'
                  height='400'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='relative rounded-xl'
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default Contact
