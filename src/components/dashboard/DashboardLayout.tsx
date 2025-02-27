import { useEffect, useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    handleResize() // Vérifier au chargement
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        {isMobile && (
          <div className='fixed top-4 left-4 z-50'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='h-8 w-8'
            >
              <Menu className='h-4 w-4' />
            </Button>
          </div>
        )}
        <DashboardSidebar
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className='flex-1 p-4 mt-12 md:pt-0'>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
