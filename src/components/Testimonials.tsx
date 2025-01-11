import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'

interface Testimonial {
  id: string
  title: string
  review_date: string
  stars: number
  description: string | null
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  // Fetch testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('avis')
        .select('id, title, review_date, stars, description')
        .order('review_date', { ascending: false })

      if (error) {
        console.error('Erreur lors de la récupération des avis :', error)
      } else {
        setTestimonials(data || [])
      }
    }

    fetchTestimonials()
  }, [])

  console.log('testimonials', testimonials)
  if (testimonials.length === 0) return null

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12'>Avis Patients</h2>
        {testimonials.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className='card-hover'>
                <CardHeader>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='font-semibold text-lg'>
                      {testimonial.title}
                    </h3>
                    <span className='text-sm text-gray-500'>
                      {new Date(testimonial.review_date).toLocaleDateString(
                        'fr-FR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                      )}
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className='w-4 h-4 fill-primary text-primary'
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>
                    {testimonial.description || 'Aucune description fournie.'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500'>
            Aucun avis disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  )
}

export default Testimonials
