import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/service";
import { toast } from "sonner";
import { transformServiceFromDb } from "@/utils/serviceTransformers";

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      const formattedServices = data.map(transformServiceFromDb);
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
          schedule: {
            lundi: null,
            mardi: null,
            mercredi: null,
            jeudi: null,
            vendredi: null,
            samedi: null,
            dimanche: null
          }
        })
        .select(`*, service_buttons(*)`)
        .single();

      if (error) throw error;

      const formattedService = transformServiceFromDb(newService);
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
          updateData.schedule = {
            lundi: value.monday,
            mardi: value.tuesday,
            mercredi: value.wednesday,
            jeudi: value.thursday,
            vendredi: value.friday,
            samedi: value.saturday,
            dimanche: value.sunday
          };
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

  return {
    services,
    isLoading,
    fetchServices,
    addService,
    removeService,
    updateService
  };
};