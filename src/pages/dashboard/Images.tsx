import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ImageForm } from "@/components/dashboard/images/ImageForm";

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

const ImagesPage = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);

  const addImage = () => {
    const newImage: CarouselImage = {
      id: crypto.randomUUID(),
      url: "",
      alt: "",
    };
    setImages([...images, newImage]);
  };

  const removeImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const updateImage = (id: string, field: keyof CarouselImage, value: string) => {
    setImages(
      images.map((image) =>
        image.id === id ? { ...image, [field]: value } : image
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
              <h1 className="text-3xl font-bold">Gestion des images du carrousel</h1>
              <Button onClick={addImage}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter une image
              </Button>
            </div>

            <div className="grid gap-4">
              {images.map((image) => (
                <ImageForm
                  key={image.id}
                  image={image}
                  onUpdate={updateImage}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ImagesPage;