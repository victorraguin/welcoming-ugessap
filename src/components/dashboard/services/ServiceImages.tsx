import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface ServiceImage {
  id: string;
  url: string;
  alt: string;
}

interface ServiceImagesProps {
  images: ServiceImage[];
  onUpdate: (images: ServiceImage[]) => void;
}

export const ServiceImages = ({ images, onUpdate }: ServiceImagesProps) => {
  const addImage = () => {
    const newImage = {
      id: crypto.randomUUID(),
      url: "",
      alt: "",
    };
    onUpdate([...images, newImage]);
  };

  const removeImage = (id: string) => {
    onUpdate(images.filter((img) => img.id !== id));
  };

  const updateImage = (id: string, field: keyof ServiceImage, value: string) => {
    onUpdate(
      images.map((img) =>
        img.id === id ? { ...img, [field]: value } : img
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Images</h3>
        <Button onClick={addImage}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>
      <div className="grid gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Input
                value={image.url}
                onChange={(e) => updateImage(image.id, "url", e.target.value)}
                placeholder="URL de l'image"
              />
              <Input
                value={image.alt}
                onChange={(e) => updateImage(image.id, "alt", e.target.value)}
                placeholder="Texte alternatif"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeImage(image.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};