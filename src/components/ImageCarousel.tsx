import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { supabase } from '@/integrations/supabase/client'

interface Image {
  id: string
  url: string
}

const ImageCarousel = () => {
  const [images, setImages] = useState<Image[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false
  })

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from('images').select('id, url')

      if (error) {
        console.error('Erreur lors de la récupération des images:', error)
      } else {
        setImages(data || [])
      }
    }

    fetchImages()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, 4000) // Défilement toutes les 4 secondes

      return () => clearInterval(intervalId)
    }
  }, [emblaApi])

  if (images.length === 0) return null

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Nos Activités en Images
        </h2>
        {images.length > 0 ? (
          <div
            className='w-full max-w-4xl mx-auto overflow-hidden'
            ref={emblaRef}
          >
            <div className='flex space-x-4'>
              {images.map(image => (
                <div
                  key={image.id}
                  className='min-w-[150px] md:min-w-[200px] max-w-[300px] aspect-square overflow-hidden rounded-lg shadow'
                >
                  <img
                    src={image.url}
                    alt={`Image ${image.id}`}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className='text-center text-gray-500'>
            Aucune image disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  )
}

export default ImageCarousel
