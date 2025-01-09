import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReviewForm } from "@/components/dashboard/reviews/ReviewForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface Review {
  id: string;
  title: string;
  date: string;
  stars: number;
  description: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = () => {
    const newReview: Review = {
      id: crypto.randomUUID(),
      title: "",
      date: new Date().toISOString().split("T")[0],
      stars: 5,
      description: "",
    };
    setReviews([...reviews, newReview]);
  };

  const removeReview = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const updateReview = (id: string, field: keyof Review, value: string | number) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, [field]: value } : review
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, delete all existing reviews without using neq
      const { error: deleteError } = await supabase
        .from('avis')
        .delete()
        .is('id', 'is not', null); // This will match all rows

      if (deleteError) throw deleteError;

      // Then insert new reviews
      if (reviews.length > 0) {
        const { error: insertError } = await supabase
          .from('avis')
          .insert(
            reviews.map(review => ({
              title: review.title,
              review_date: review.date,
              stars: review.stars,
              description: review.description,
            }))
          );

        if (insertError) throw insertError;
      }

      toast.success("Avis enregistrés avec succès");
    } catch (error) {
      console.error('Error saving reviews:', error);
      toast.error("Erreur lors de l'enregistrement des avis");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Gestion des avis clients</h1>
              <Button onClick={addReview}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter un avis
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <ReviewForm
                    key={review.id}
                    review={review}
                    onUpdate={updateReview}
                    onRemove={removeReview}
                  />
                ))}
              </div>

              <Button type="submit" className="w-full mt-4">
                Enregistrer les modifications
              </Button>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default ReviewsPage;