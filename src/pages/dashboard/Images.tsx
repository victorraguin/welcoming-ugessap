import { useEffect, useState } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ImageForm } from '@/components/dashboard/images/ImageForm'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import FloatingSaveButton from '@/components/FloatingSaveButton'

interface ImageRecord {
  id: string
  url?: string | null
  alt?: string | null
}

interface CarouselImage {
  id: string
  url: string
  alt: string
}

const ImagesPage = (): JSX.Element => {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [initialImages, setInitialImages] = useState<CarouselImage[]>([])
  const [isModified, setIsModified] = useState<boolean>(false)

  // Fetch des images existantes
  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('images').select('*')

        if (error) throw error

        if (data) {
          const formattedImages = data.map(
            (image: ImageRecord): CarouselImage => ({
              id: image.id,
              url: image.url || '/placeholder.svg',
              alt: image.alt || 'Image sans description'
            })
          )
          setImages(formattedImages)
          // Stocker les images initiales pour comparer les changements
          setInitialImages(JSON.parse(JSON.stringify(formattedImages)))
        }
      } catch (error) {
        console.error('Erreur lors du fetch des images :', error)
        toast.error('Erreur lors du chargement des images')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Vérifier si des modifications ont été apportées
  useEffect(() => {
    if (initialImages.length > 0) {
      // Comparaison pour détecter les changements
      const isChanged =
        images.length !== initialImages.length ||
        JSON.stringify(images) !== JSON.stringify(initialImages)

      setIsModified(isChanged)
    }
  }, [images, initialImages])

  const addImage = (): void => {
    const newImage: CarouselImage = {
      id: crypto.randomUUID(),
      url: '',
      alt: ''
    }
    setImages([...images, newImage])
  }

  const removeImage = (id: string): void => {
    setImages(images.filter(image => image.id !== id))
  }

  const updateImage = (
    id: string,
    field: keyof CarouselImage,
    value: string
  ): void => {
    setImages(
      images.map(image =>
        image.id === id ? { ...image, [field]: value } : image
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from('images')
        .delete()
        .not('id', 'is', null)
      if (deleteError) throw deleteError

      if (images.length > 0) {
        const { error: insertError } = await supabase.from('images').insert(
          images.map(image => ({
            id: image.id,
            url: image.url,
            alt: image.alt
          }))
        )
        if (insertError) throw insertError
      }

      toast.success('Images enregistrées avec succès')

      // Mettre à jour l'état initial après sauvegarde
      setInitialImages(JSON.parse(JSON.stringify(images)))
      setIsModified(false)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des images :", error)
      toast.error("Erreur lors de l'enregistrement des images")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <div className='p-8 w-full space-y-6 overflow-auto'>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl font-bold'>Gestion des images</h2>
            <Button onClick={addImage}>
              <Plus className='mr-2 h-4 w-4' /> Ajouter une image
            </Button>
          </div>

          <div className='space-y-6 pb-16'>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {images.map(image => (
                <ImageForm
                  key={image.id}
                  image={image}
                  onUpdate={updateImage}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </div>

          {/* Bouton flottant pour enregistrer */}
          <FloatingSaveButton
            onClick={handleSubmit}
            loading={loading}
            initialModified={isModified}
            watchDependencies={[images]}
          />
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}

export default ImagesPage
