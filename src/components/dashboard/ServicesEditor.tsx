import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ServiceForm } from "./services/ServiceForm";
import { Service } from "@/types/service";

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);

  const addService = () => {
    const newService: Service = {
      id: crypto.randomUUID(),
      icon: "LayoutGrid",
      title: "",
      shortDescription: "",
      longDescription: "",
      keyPoints: [],
      images: [],
      buttons: [],
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: any) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
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
      </div>
    </SidebarProvider>
  );
};

export default ServicesEditor;