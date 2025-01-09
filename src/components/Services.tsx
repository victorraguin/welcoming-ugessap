import { Heart, Baby, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Centre de santé",
    description: "Des soins de proximité avec des professionnels qualifiés",
  },
  {
    icon: Baby,
    title: "Santé en crèche",
    description: "Suivi médical des enfants avec des infirmières et pédiatres",
  },
  {
    icon: Building2,
    title: "Med'event",
    description: "Prise en charge médicale lors d'événements",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
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
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
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