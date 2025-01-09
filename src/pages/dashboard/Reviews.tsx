import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReviewForm } from "@/components/dashboard/reviews/ReviewForm";

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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ReviewsPage;