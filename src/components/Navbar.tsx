import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*, service_buttons(*)')
        .order('order_index', { ascending: true })

      if (error) throw error
      return data
    },
    staleTime: 0, // Force la query à devenir stale immédiatement
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-md backdrop-blur-sm py-1'
          : 'bg-white/80 py-2'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <a href='/' className='flex items-center space-x-2 group'>
            <span className='text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-105'>
              UGESSAP
            </span>
          </a>

          {/* Navigation pour desktop */}
          <nav
            className='hidden md:flex md:items-center md:space-x-6'
            aria-label='Navigation principale'
          >
            <a
              href='/'
              className={`text-sm font-medium transition-all duration-200 hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === '/'
                  ? 'text-primary after:w-full'
                  : 'text-gray-700'
              }`}
            >
              Accueil
            </a>
            <Link
              to='/association'
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/association'
                  ? 'text-primary'
                  : 'text-foreground/80'
              }`}
            >
              L'association
            </Link>

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Button variant='ghost' className='flex items-center gap-1'>
                  Nos services
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-48'>
                <div className='flex flex-col space-y-2'>
                  {isLoading
                    ? [...Array(3)].map((_, index) => (
                        <Skeleton key={index} className='h-8 w-full' />
                      ))
                    : services?.map(service => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className='text-sm hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent'
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                </div>
              </HoverCardContent>
            </HoverCard>

            <Link
              to='/contact'
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/contact'
                  ? 'text-primary'
                  : 'text-foreground/80'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(!isOpen)}
              className='relative z-50'
            >
              {isOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='fixed inset-0 bg-white z-40'>
            <div className='pt-20 pb-6 px-4 space-y-6'>
              <Link
                to='/'
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === '/'
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                Accueil
              </Link>
              <Link
                to='/association'
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === '/association'
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                L'association
              </Link>
              <div className='pt-4 border-t'>
                <p className='text-sm font-semibold text-gray-500 mb-3'>
                  Nos services
                </p>
                {isLoading
                  ? [...Array(3)].map((_, index) => (
                      <Skeleton key={index} className='h-8 w-full mb-2' />
                    ))
                  : services?.map(service => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        onClick={() => setIsOpen(false)}
                        className='block py-2  text-lg font-medium hover:text-primary'
                      >
                        {service.title}
                      </Link>
                    ))}
              </div>
              <Link
                to='/contact'
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === '/contact'
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
