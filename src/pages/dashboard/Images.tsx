import { useEffect, useState } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ImageForm } from '@/components/dashboard/images/ImageForm'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

interface CarouselImage {
  id: string
  url: string
  alt: string
}

const ImagesPage = () => {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch des images existantes
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('images').select('*')

        if (error) throw error

        if (data) {
          const formattedImages = data.map(
            (image: { id: string; url?: string; alt?: string }) => ({
              id: image.id,
              url: image.url || '/placeholder.svg',
              alt: image.alt || 'Image sans description'
            })
          )
          setImages(formattedImages)
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

  const addImage = () => {
    const newImage: CarouselImage = {
      id: crypto.randomUUID(),
      url: '',
      alt: ''
    }
    setImages([...images, newImage])
  }

  const removeImage = (id: string) => {
    setImages(images.filter(image => image.id !== id))
  }
  const updateImage = (
    id: string,
    field: keyof CarouselImage,
    value: string
  ) => {
    setImages(
      images.map(image =>
        image.id === id ? { ...image, [field]: value } : image
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des images :", error)
      toast.error("Erreur lors de l'enregistrement des images")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen bg-gray-100 w-full'>
        <DashboardSidebar />
        <>
          <div className='p-6 w-full space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Gestion des images</h2>
              <Button onClick={addImage}>
                <Plus className='mr-2 h-4 w-4' /> Ajouter une image
              </Button>
            </div>

            <div className='space-y-6'>
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

              <Button type='submit' className='w-full' onClick={handleSubmit}>
                {loading
                  ? 'Enregistrement en cours...'
                  : 'Enregistrer les modifications'}
              </Button>
            </div>
          </div>
          <Toaster />
        </>
      </div>
    </SidebarProvider>
  )
}

export default ImagesPage
