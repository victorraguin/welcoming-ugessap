import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServiceForm } from "./services/ServiceForm";
import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ServicesEditor = () => {
  const navigate = useNavigate();
  const { 
    services, 
    isLoading, 
    fetchServices, 
    addService, 
    removeService, 
    updateService 
  } = useServices();

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
        return;
      }
      fetchServices();
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save all services
      for (const service of services) {
        const { error } = await supabase
          .from('services')
          .upsert({
            id: service.id,
            title: service.title,
            description: service.longDescription,
            short_description: service.shortDescription,
            icon_name: service.icon,
            key_points: service.keyPoints,
            image: service.images[0]?.url,
            address: JSON.stringify(service.address),
            schedule: service.hours
          });

        if (error) throw error;
      }

      toast.success("Services enregistrés avec succès");
    } catch (error) {
      console.error('Error saving services:', error);
      toast.error("Erreur lors de l'enregistrement des services");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          <p>Chargement des services...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des services</h1>
          <Button type="button" onClick={addService}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un service
          </Button>
        </div>

        <div className="grid gap-4">
          {services.map((service) => (
            <ServiceForm
              key={service.id}
              service={service}
              onUpdate={updateService}
              onRemove={removeService}
            />
          ))}
        </div>

        <Button type="submit" className="w-full">
          Enregistrer les modifications
        </Button>
      </div>
    </form>
  );
};

export default ServicesEditor;