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

interface DashboardSidebarProps {
  isMobile: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

const DashboardSidebar = ({
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen
}: DashboardSidebarProps) => {
  const location = useLocation()
  const isItemActive = (itemUrl: string) => {
    if (itemUrl === '/dashboard' && location.pathname === '/dashboard') {
      return true
    }

    return itemUrl !== '/dashboard' && location.pathname.startsWith(itemUrl)
  }

  return isMobile && isSidebarOpen ? (
    <div className='fixed top-0 left-0 h-full z-50'>
      <div className='fixed inset-0 bg-white z-30 md:hidden pt-16'>
        <div className='flex flex-col p-4 space-y-4 mt-2'>
          {menuItems.map(item => (
            <Link
              key={item.title}
              to={item.url}
              className={`px-4 py-3 rounded-md flex items-center gap-3 transition-colors ${
                isItemActive(item.url)
                  ? 'bg-accent/50 text-primary font-medium'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isItemActive(item.url) ? 'text-primary' : ''
                }`}
              />
              <span className='text-lg'>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Sidebar className='border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-lg font-semibold px-4 py-2'>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => {
                const isActive = isItemActive(item.url)
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
