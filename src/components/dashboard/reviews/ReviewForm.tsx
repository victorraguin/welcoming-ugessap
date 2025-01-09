import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Star, X } from "lucide-react";

interface Review {
  id: string;
  title: string;
  date: string;
  stars: number;
  description: string;
}

interface ReviewFormProps {
  review: Review;
  onUpdate: (id: string, field: keyof Review, value: string | number) => void;
  onRemove: (id: string) => void;
}

export const ReviewForm = ({ review, onUpdate, onRemove }: ReviewFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <CardTitle className="flex-1">
            {review.title || "Nouvel avis"}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(review.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Titre</Label>
              <Input
                value={review.title}
                onChange={(e) =>
                  onUpdate(review.id, "title", e.target.value)
                }
                placeholder="Titre de l'avis"
              />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={review.date}
                onChange={(e) =>
                  onUpdate(review.id, "date", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Nombre d'étoiles</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdate(review.id, "stars", star)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        star <= review.stars
                          ? "fill-primary text-primary"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={review.description}
                onChange={(e) =>
                  onUpdate(review.id, "description", e.target.value)
                }
                placeholder="Description de l'avis"
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};