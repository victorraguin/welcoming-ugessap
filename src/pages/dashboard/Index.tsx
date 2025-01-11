import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
  Building2,
  Users,
  Briefcase,
  LayoutGrid,
  Image,
  MessageSquare,
  Settings
} from 'lucide-react'

const menuItems = [
  {
    title: 'Association',
    description: "Gérer les informations de l'association",
    icon: Building2,
    url: '/dashboard/association'
  },
  {
    title: 'Services',
    description: 'Gérer les services proposés',
    icon: LayoutGrid,
    url: '/dashboard/services'
  },
  {
    title: 'Images',
    description: "Gérer la galerie d'images",
    icon: Image,
    url: '/dashboard/images'
  },
  {
    title: 'Avis',
    description: 'Gérer les avis patients',
    icon: MessageSquare,
    url: '/dashboard/reviews'
  },
  {
    title: 'Équipe',
    description: "Gérer l'équipe",
    icon: Users,
    url: '/dashboard/team'
  },
  {
    title: 'Recrutement',
    description: "Gérer les offres d'emploi",
    icon: Briefcase,
    url: '/dashboard/recruitment'
  },
  {
    title: 'Contact Webmaster',
    description: 'Contacter le créateur du site',
    icon: Settings,
    url: '/dashboard/settings'
  }
]

const DashboardIndex = () => {
  return (
    <SidebarProvider>
      <div className='min-h-screen flex w-full'>
        <DashboardSidebar />
        <main className='flex-1 p-8 bg-gray-50'>
          <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold mb-8'>Tableau de bord</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {menuItems.map(item => (
                <Link key={item.title} to={item.url}>
                  <Card className='hover:shadow-lg transition-shadow'>
                    <CardContent className='p-6'>
                      <div className='flex items-center space-x-4'>
                        <div className='p-3 bg-primary/10 rounded-lg'>
                          <item.icon className='w-6 h-6 text-primary' />
                        </div>
                        <div>
                          <h2 className='text-xl font-semibold'>
                            {item.title}
                          </h2>
                          <p className='text-sm text-gray-500'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <Link to='/'>
                <Card className='hover:shadow-lg transition-shadow'>
                  <CardContent className='p-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='p-3 bg-primary/10 rounded-lg'>
                        <Building2 className='w-6 h-6 text-primary' />
                      </div>
                      <div>
                        <h2 className='text-xl font-semibold'>
                          Retour au site
                        </h2>
                        <p className='text-sm text-gray-500'>
                          Voir le site public
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardIndex
