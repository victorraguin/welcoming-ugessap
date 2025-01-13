import { useEffect, useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ReviewForm } from '@/components/dashboard/reviews/ReviewForm'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

interface Review {
  id: string
  title: string
  date: string
  stars: number
  description: string
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch reviews from database on initial load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('avis').select('*')

        if (error) throw error

        if (data) {
          const formattedReviews = data.map(
            (review: {
              id: string
              title: string
              review_date: string
              stars: number
              description: string
            }) => ({
              id: review.id,
              title: review.title || '',
              date: review.review_date || '',
              stars: review.stars || 5,
              description: review.description || ''
            })
          )
          setReviews(formattedReviews)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        toast.error('Erreur lors du chargement des avis')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const addReview = () => {
    const newReview: Review = {
      id: crypto.randomUUID(),
      title: '',
      date: new Date().toISOString().split('T')[0],
      stars: 5,
      description: ''
    }
    setReviews([...reviews, newReview])
  }

  const removeReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id))
  }

  const updateReview = (
    id: string,
    field: keyof Review,
    value: string | number
  ) => {
    setReviews(
      reviews.map(review =>
        review.id === id ? { ...review, [field]: value } : review
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Delete reviews that were removed locally
      const existingIds = reviews.map(review => review.id)
      const { data: dbReviews, error: fetchError } = await supabase
        .from('avis')
        .select('id')

      if (fetchError) throw fetchError

      const idsToDelete = dbReviews
        ?.filter(dbReview => !existingIds.includes(dbReview.id))
        .map(dbReview => dbReview.id)

      if (idsToDelete?.length > 0) {
        const { error: deleteError } = await supabase
          .from('avis')
          .delete()
          .in('id', idsToDelete)

        if (deleteError) throw deleteError
      }

      // Upsert new and updated reviews
      const { error: upsertError } = await supabase.from('avis').upsert(
        reviews.map(review => ({
          id: review.id,
          title: review.title,
          review_date: review.date,
          stars: review.stars,
          description: review.description
        })),
        { onConflict: 'id' } // Prevent duplication by using the `id` column
      )

      if (upsertError) throw upsertError

      toast.success('Avis enregistrés avec succès')
    } catch (error) {
      console.error('Error saving reviews:', error)
      toast.error("Erreur lors de l'enregistrement des avis")
    }
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen bg-gray-100 w-full'>
        <DashboardSidebar />
        <div className='flex-1 overflow-auto p-8'>
          <div className='max-w-5xl mx-auto space-y-8'>
            <div className='flex justify-between items-center'>
              <h1 className='text-3xl font-bold'>Gestion des avis patients</h1>
              <Button onClick={addReview}>
                <Plus className='mr-2 h-4 w-4' /> Ajouter un avis
              </Button>
            </div>

            {loading ? (
              <p>Chargement des avis...</p>
            ) : (
              <div>
                <div className='grid gap-4'>
                  {reviews.map(review => (
                    <ReviewForm
                      key={review.id}
                      review={review}
                      onUpdate={updateReview}
                      onRemove={removeReview}
                    />
                  ))}
                </div>

                <Button
                  type='submit'
                  className='w-full mt-4'
                  onClick={handleSubmit}
                >
                  Enregistrer les modifications
                </Button>
              </div>
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}

export default ReviewsPage
