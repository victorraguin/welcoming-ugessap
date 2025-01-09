import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface ImageFormProps {
  image: CarouselImage;
  onUpdate: (id: string, field: keyof CarouselImage, value: string) => void;
  onRemove: (id: string) => void;
}

export const ImageForm = ({ image, onUpdate, onRemove }: ImageFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <CardTitle className="flex-1">
            {image.alt || "Nouvelle image"}
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
              onClick={() => onRemove(image.id)}
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
              <Label>URL de l'image</Label>
              <Input
                value={image.url}
                onChange={(e) =>
                  onUpdate(image.id, "url", e.target.value)
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label>Texte alternatif</Label>
              <Input
                value={image.alt}
                onChange={(e) =>
                  onUpdate(image.id, "alt", e.target.value)
                }
                placeholder="Description de l'image"
              />
            </div>
            {image.url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};