import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { supabase } from '@/integrations/supabase/client'

interface Image {
  id: string
  url: string
}

const ImageCarousel = () => {
  const [images, setImages] = useState<Image[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

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
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [emblaApi])

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Nos Activités en Images
        </h2>
        {images.length > 0 ? (
          <Carousel
            opts={{ loop: true }}
            className='w-full max-w-4xl mx-auto'
            ref={emblaRef}
          >
            <CarouselContent>
              {images.map(image => (
                <CarouselItem key={image.id}>
                  <div className='aspect-video w-full overflow-hidden rounded-lg'>
                    <img
                      src={image.url}
                      alt={`Image ${image.id}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
