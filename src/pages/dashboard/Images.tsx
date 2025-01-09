import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ImageForm } from "@/components/dashboard/images/ImageForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, delete existing images
      const { error: deleteError } = await supabase
        .from('images')
        .delete()
        .neq('id', '0');

      if (deleteError) throw deleteError;

      // Then insert new images
      if (images.length > 0) {
        const { error: insertError } = await supabase
          .from('images')
          .insert(
            images.map(image => ({
              url: image.url,
            }))
          );

        if (insertError) throw insertError;
      }

      toast.success("Images enregistrées avec succès");
    } catch (error) {
      console.error('Error saving images:', error);
      toast.error("Erreur lors de l'enregistrement des images");
    }
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

            <form onSubmit={handleSubmit}>
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

export default ImagesPage;