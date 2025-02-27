import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier l'état d'authentification au chargement
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          setAuthenticated(true)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error(`Erreur de vérification d'authentification:`, error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // S'abonner aux changements d'état d'authentification
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login')
      } else if (event === 'SIGNED_IN' && session) {
        setAuthenticated(true)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Chargement...
      </div>
    )
  }

  return authenticated ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
