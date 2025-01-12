import { Heart } from 'lucide-react'

/**
 * Composant Loader
 * Affiche un cœur animé (façon "pouls") et un texte de chargement.
 */
export default function Loader () {
  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      {/* 
        Conteneur principal du loader.
        Vous pouvez changer la couleur de fond (ici bg-white) 
        ou le remplacer par un overlay si vous préférez.
      */}
      <div className='flex flex-col items-center space-y-4'>
        {/* Icône Heart avec effet d'animation via Tailwind */}
        <Heart className='w-12 h-12 text-[#2C89C3] animate-pulse' />
        <p className='text-gray-700 text-lg font-medium'>
          Chargement en cours...
        </p>
      </div>
    </div>
  )
}
