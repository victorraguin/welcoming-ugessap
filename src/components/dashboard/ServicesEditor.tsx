import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServiceForm } from "./services/ServiceForm";
import { useServices } from "@/hooks/useServices";

const ServicesEditor = () => {
  const { 
    services, 
    isLoading, 
    fetchServices, 
    addService, 
    removeService, 
    updateService 
  } = useServices();

  useEffect(() => {
    fetchServices();
  }, []);

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
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des services</h1>
          <Button onClick={addService}>
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
      </div>
    </div>
  );
};

export default ServicesEditor;