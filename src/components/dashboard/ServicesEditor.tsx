import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ServiceForm } from "./services/ServiceForm";
import { Service } from "@/types/service";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select(`
          *,
          service_buttons(*)
        `)
        .order('order_index', { ascending: true });

      if (error) throw error;

      const formattedServices = data.map(service => ({
        id: service.id,
        icon: service.icon_name || "LayoutGrid",
        title: service.title,
        shortDescription: service.short_description || "",
        longDescription: service.description || "",
        address: service.address ? JSON.parse(service.address) : undefined,
        hours: service.schedule || {},
        keyPoints: service.key_points || [],
        images: service.image ? [{ id: crypto.randomUUID(), url: service.image, alt: service.title }] : [],
        buttons: service.service_buttons.map(button => ({
          id: button.id,
          text: button.label,
          link: button.url
        }))
      }));

      setServices(formattedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Erreur lors du chargement des services");
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async () => {
    try {
      const { data: newService, error } = await supabase
        .from("services")
        .insert({
          title: "Nouveau service",
          icon_name: "LayoutGrid",
          key_points: [],
          schedule: {}
        })
        .select()
        .single();

      if (error) throw error;

      const formattedService: Service = {
        id: newService.id,
        icon: "LayoutGrid",
        title: "Nouveau service",
        shortDescription: "",
        longDescription: "",
        keyPoints: [],
        images: [],
        buttons: [],
      };

      setServices([...services, formattedService]);
      toast.success("Service créé avec succès");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Erreur lors de la création du service");
    }
  };

  const removeService = async (id: string) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setServices(services.filter((service) => service.id !== id));
      toast.success("Service supprimé avec succès");
    } catch (error) {
      console.error("Error removing service:", error);
      toast.error("Erreur lors de la suppression du service");
    }
  };

  const updateService = async (id: string, field: keyof Service, value: any) => {
    try {
      const service = services.find(s => s.id === id);
      if (!service) return;

      // Update local state first for better UX
      setServices(services.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      ));

      // Prepare data for Supabase update
      const updateData: any = {};
      
      switch (field) {
        case "icon":
          updateData.icon_name = value;
          break;
        case "title":
          updateData.title = value;
          break;
        case "shortDescription":
          updateData.short_description = value;
          break;
        case "longDescription":
          updateData.description = value;
          break;
        case "address":
          updateData.address = JSON.stringify(value);
          break;
        case "hours":
          updateData.schedule = value;
          break;
        case "keyPoints":
          updateData.key_points = value;
          break;
        case "images":
          if (value.length > 0) {
            updateData.image = value[0].url;
          } else {
            updateData.image = null;
          }
          break;
        case "buttons":
          // Handle buttons separately through service_buttons table
          await handleButtonsUpdate(id, value);
          return;
      }

      const { error } = await supabase
        .from("services")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Erreur lors de la mise à jour du service");
      // Revert local state on error
      fetchServices();
    }
  };

  const handleButtonsUpdate = async (serviceId: string, buttons: Service["buttons"]) => {
    try {
      // First, delete all existing buttons for this service
      await supabase
        .from("service_buttons")
        .delete()
        .eq("service_id", serviceId);

      // Then, insert all new buttons
      if (buttons.length > 0) {
        const buttonsData = buttons.map((button, index) => ({
          service_id: serviceId,
          label: button.text,
          url: button.link,
          order_index: index
        }));

        const { error } = await supabase
          .from("service_buttons")
          .insert(buttonsData);

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error updating buttons:", error);
      throw error;
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