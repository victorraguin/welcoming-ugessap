import { Heart, Baby, Building2, ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const services = [
  {
    icon: Heart,
    title: "Centre de santé",
    description: "Des soins de proximité avec des professionnels qualifiés",
    action: {
      label: "Prendre rendez-vous",
      onClick: () => toast.success("Redirection vers la prise de rendez-vous")
    }
  },
  {
    icon: Baby,
    title: "Santé en crèche",
    description: "Suivi médical des enfants avec des infirmières et pédiatres",
    action: {
      label: "Contacter le service",
      onClick: () => toast.success("Redirection vers le formulaire de contact")
    }
  },
  {
    icon: Building2,
    title: "Med'event",
    description: "Prise en charge médicale lors d'événements",
    action: {
      label: "Demander un devis",
      onClick: () => toast.success("Redirection vers le formulaire de devis")
    }
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <service.icon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button 
                  variant="secondary"
                  className="w-full"
                  onClick={service.action.onClick}
                >
                  {service.action.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;