import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  Building2,
  Home,
  Settings,
  Users,
  Briefcase,
  LayoutGrid,
  Image,
  MessageSquare
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  {
    title: 'Accueil',
    url: '/dashboard',
    icon: Home
  },
  {
    title: 'Association',
    url: '/dashboard/association',
    icon: Building2
  },
  {
    title: 'Services',
    url: '/dashboard/services',
    icon: LayoutGrid
  },
  {
    title: 'Images',
    url: '/dashboard/images',
    icon: Image
  },
  {
    title: 'Avis',
    url: '/dashboard/reviews',
    icon: MessageSquare
  },
  {
    title: 'Équipe',
    url: '/dashboard/team',
    icon: Users
  },
  {
    title: 'Recrutement',
    url: '/dashboard/recruitment',
    icon: Briefcase
  },
  {
    title: 'Contact Webmaster',
    url: '/dashboard/settings',
    icon: Settings
  }
]

const DashboardSidebar = () => {
  const location = useLocation()

  return (
    <Sidebar className='border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-lg font-semibold px-4 py-2'>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-accent hover:text-accent-foreground ${
                        isActive
                          ? 'bg-accent/50 font-semibold border-b-2 border-primary'
                          : ''
                      }`}
                    >
                      <Link
                        to={item.url}
                        className='flex items-center gap-3 px-4 py-2'
                      >
                        <item.icon
                          className={`h-5 w-5 ${
                            isActive ? 'text-primary' : ''
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default DashboardSidebar
