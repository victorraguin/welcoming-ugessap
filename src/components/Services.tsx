import { Heart, Baby, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  if (error) {
    console.error('Error loading services:', error);
    toast.error("Erreur lors du chargement des services");
  }

  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case 'Heart':
        return Heart;
      case 'Baby':
        return Baby;
      case 'Building2':
        return Building2;
      default:
        return Heart;
    }
  };

  const handleServiceAction = (serviceId: string, action: string) => {
    // Pour le moment, on affiche juste un toast
    toast.success(`Action ${action} pour le service ${serviceId}`);
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 mx-auto" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-20 w-full mb-6" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : services?.map((service) => {
            const IconComponent = getIconComponent(service.icon_name);
            return (
              <Card key={service.id} className="card-hover">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <IconComponent className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">{service.short_description}</p>
                  <Button 
                    variant="secondary"
                    className="w-full"
                    onClick={() => handleServiceAction(service.id, 'contact')}
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;