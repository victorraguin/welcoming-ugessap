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
    skipSnaps: false,
    inViewThreshold: 0,
    dragFree: true
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
        <h2 className='text-3xl font-bold text-center mb-4'>
          Nos Activités en Images
        </h2>
        <div className='w-20 h-1 bg-primary mx-auto rounded-full mb-12'></div>
        {images.length > 0 ? (
          <div
            className='w-full max-w-6xl mx-auto overflow-hidden'
            ref={emblaRef}
          >
            <div className='flex'>
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`min-w-[150px] md:min-w-[300px] max-w-[400px] aspect-square overflow-hidden rounded-lg shadow ${
                    index < images.length ? 'mr-4' : ''
                  }`}
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
