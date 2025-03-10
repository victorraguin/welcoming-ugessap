import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from '@/pages/Index'
import Association from '@/pages/Association'
import Contact from '@/pages/Contact'
import DashboardIndex from '@/pages/dashboard/Index'
import ImagesPage from '@/pages/dashboard/Images'
import ReviewsPage from '@/pages/dashboard/Reviews'
import Settings from '@/pages/dashboard/Settings'
import RecruitmentPage from '@/pages/dashboard/Recruitment'
import AssociationPage from '@/pages/dashboard/Association'
import ServicesPage from '@/pages/dashboard/Services'
import TeamPage from '@/pages/dashboard/Team'
import Login from '@/pages/Login'
import DynamicServicePage from './pages/services/DynamicServicePage'
import ScrollToTop from './components/ScrollToTop'
import { HelmetProvider } from 'react-helmet-async'
import PrivateRoute from './components/PrivateRoute' // Importez le composant PrivateRoute
import ResetPassword from './pages/ResetPassword'
import DashboardLayout from './components/dashboard/DashboardLayout'

const queryClient = new QueryClient()
queryClient.clear()

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Routes publiques */}
            <Route path='/' element={<Index />} />
            <Route path='/association' element={<Association />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/services/:slug' element={<DynamicServicePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            {/* Routes protégées du dashboard */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path='/dashboard' element={<DashboardIndex />} />
                <Route
                  path='/dashboard/association'
                  element={<AssociationPage />}
                />
                <Route path='/dashboard/services' element={<ServicesPage />} />
                <Route path='/dashboard/images' element={<ImagesPage />} />
                <Route path='/dashboard/reviews' element={<ReviewsPage />} />
                <Route path='/dashboard/team' element={<TeamPage />} />
                <Route
                  path='/dashboard/recruitment'
                  element={<RecruitmentPage />}
                />
                <Route path='/dashboard/settings' element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
