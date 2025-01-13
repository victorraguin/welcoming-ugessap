/* eslint-disable no-irregular-whitespace */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Contact = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const currentTab = params.get('tab') || 'contact'

  const handleTabChange = (tab: string) => {
    navigate(`?tab=${tab}`)
  }

  return (
    <>
      <Helmet>
        <title>UGESSAP - Contact</title>
        <meta name='description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:title' content='UGESSAP - Contact' />
        <meta property='og:description' content='Bienvenue sur UGESSAP.' />
        <meta property='og:image' content='/ugessap-og-image.png' />
      </Helmet>
      <div className='min-h-screen flex flex-col'>
        <Navbar />

        <main className='flex-grow py-20 bg-gray-50'>
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

                  {/* Onglet Contact */}
                  <TabsContent value='contact'>
                    <div className='text-center'>
                      <h2 className='text-2xl font-semibold mb-4'>
                        Contactez-nous
                      </h2>
                      <p>
                        Pour toute question ou demande d'information,
                        envoyez-nous un email à :
                      </p>
                      <p className='text-blue-500 font-medium'>
                        <a href='mailto:contact@ugessap.org'>
                          contact@ugessap.org
                        </a>
                      </p>
                    </div>
                  </TabsContent>

                  {/* Onglet Réclamation */}
                  <TabsContent value='complaint'>
                    <div className='text-center'>
                      <h2 className='text-2xl font-semibold mb-4'>
                        Réclamation
                      </h2>
                      <p>
                        Pour toute réclamation, veuillez contacter notre
                        direction à :
                      </p>
                      <p className='text-blue-500 font-medium'>
                        <a href='mailto:direction@ugessap.org'>
                          direction@ugessap.org
                        </a>
                      </p>
                    </div>
                  </TabsContent>

                  {/* Onglet Recrutement */}
                  <TabsContent value='recruitment'>
                    <div className='text-center'>
                      <h2 className='text-2xl font-semibold mb-4'>
                        Recrutement
                      </h2>
                      <p>
                        Pour toute candidature ou information sur les postes
                        ouverts, écrivez à :
                      </p>
                      <p className='text-blue-500 font-medium'>
                        <a href='mailto:aurelien.noguet@ugessap.org'>
                          aurelien.noguet@ugessap.org
                        </a>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Contact
