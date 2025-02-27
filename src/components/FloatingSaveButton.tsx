import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface FloatingSaveButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  loading?: boolean
  initialModified?: boolean
  watchDependencies?: unknown[]
  className?: string
}

/**
 * Bouton de sauvegarde flottant qui apparaît lorsque des modifications sont détectées
 * @param onClick - Fonction à exécuter lors du clic sur le bouton
 * @param loading - État de chargement (affiche "Enregistrement..." lorsque true)
 * @param initialModified - État initial de modification (false par défaut)
 * @param watchDependencies - Tableau de dépendances à surveiller pour détecter les modifications
 * @param className - Classes CSS supplémentaires pour le bouton
 */
function FloatingSaveButton ({
  onClick,
  loading = false,
  initialModified = false,
  watchDependencies = [],
  className = ''
}: FloatingSaveButtonProps): JSX.Element | null {
  const [isModified, setIsModified] = useState(initialModified)
  const [initialRender, setInitialRender] = useState(true)

  // Surveille les changements dans les valeurs pour détecter les modifications
  useEffect(() => {
    if (initialRender) {
      setInitialRender(false)
      return
    }

    setIsModified(true)
  }, watchDependencies)

  // Si aucune modification n'est détectée, ne pas afficher le bouton
  if (!isModified) {
    return null
  }

  return (
    <div className='fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all animate-fade-in'>
      <Button
        type='button'
        onClick={e => {
          onClick(e)
          // Réinitialiser l'état de modification après la sauvegarde
          if (!loading) {
            setIsModified(false)
          }
        }}
        className={`shadow-lg flex items-center gap-2 ${className}`}
        disabled={loading}
        aria-label='Enregistrer les modifications'
      >
        <Save className='w-4 h-4' />
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </div>
  )
}

export default FloatingSaveButton
