import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    text: string
    type: 'success' | 'error'
  } | null>(null)
  const [hash, setHash] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Récupérer le hash depuis l'URL
    const url = new URL(window.location.href)
    const hashFromUrl = url.hash.substring(1) // Enlever le # au début

    if (hashFromUrl) {
      // Extraire le 'access_token' du hash
      const params = new URLSearchParams(hashFromUrl)
      const accessToken = params.get('access_token')

      if (accessToken) {
        setHash(accessToken)
      } else {
        setMessage({
          text: 'Lien de réinitialisation invalide ou expiré.',
          type: 'error'
        })
      }
    } else {
      setMessage({
        text: 'Lien de réinitialisation invalide ou expiré.',
        type: 'error'
      })
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage({
        text: 'Les mots de passe ne correspondent pas.',
        type: 'error'
      })
      return
    }

    if (password.length < 6) {
      setMessage({
        text: 'Le mot de passe doit contenir au moins 6 caractères.',
        type: 'error'
      })
      return
    }

    if (!hash) {
      setMessage({
        text: 'Lien de réinitialisation invalide ou expiré.',
        type: 'error'
      })
      return
    }

    try {
      setLoading(true)

      // Utiliser le token pour mettre à jour le mot de passe
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        throw error
      }

      setMessage({
        text: 'Votre mot de passe a été réinitialisé avec succès.',
        type: 'success'
      })

      // Rediriger vers la page de connexion après quelques secondes
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      console.error(
        'Erreur lors de la réinitialisation du mot de passe:',
        error
      )
      setMessage({
        text:
          error.message ||
          'Une erreur est survenue lors de la réinitialisation du mot de passe.',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold'>
            Réinitialisation du mot de passe
          </h1>
          <p className='text-muted-foreground'>
            Veuillez saisir votre nouveau mot de passe
          </p>
        </div>

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className='bg-card p-6 rounded-lg shadow-sm border'>
          <form onSubmit={handleResetPassword} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='password'>Nouveau mot de passe</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirmer le mot de passe</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'En cours...' : 'Réinitialiser le mot de passe'}
            </Button>

            <div className='text-center'>
              <Button
                variant='link'
                onClick={() => navigate('/login')}
                className='text-sm'
              >
                Retour à la connexion
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
