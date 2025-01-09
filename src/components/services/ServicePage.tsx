import { ServiceData } from "@/types/service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as Icons from "lucide-react";

interface ServicePageProps {
  service: ServiceData;
}

const ServicePage = ({ service }: ServicePageProps) => {
  const IconComponent = Icons[service.icon];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <IconComponent className="w-12 h-12 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
                </div>
                <p className="text-lg text-gray-600">{service.description}</p>
                <div className="flex flex-wrap gap-4">
                  {service.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || "default"}
                      onClick={() => {
                        action.onClick();
                        toast.success("Action en cours de traitement");
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src={service.images[0].url}
                  alt={service.images[0].alt}
                  className="rounded-lg shadow-xl w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Notre Mission</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 whitespace-pre-line">
                {service.mission}
              </p>
            </div>
          </div>
        </section>

        {/* Images Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nos installations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.images.map((image, index) => (
                <div key={index} className="space-y-4">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                  <p className="text-center text-gray-600">{image.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adresse et Horaires Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Notre adresse</h2>
                <p className="text-lg text-gray-600">
                  {service.address.street}<br />
                  {service.address.postalCode} {service.address.city}
                </p>
              </div>
              
              {service.hours && (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-8">Nos horaires</h2>
                  <div className="space-y-2 text-lg text-gray-600">
                    {service.hours.monday && <p>Lundi : {service.hours.monday}</p>}
                    {service.hours.tuesday && <p>Mardi : {service.hours.tuesday}</p>}
                    {service.hours.wednesday && <p>Mercredi : {service.hours.wednesday}</p>}
                    {service.hours.thursday && <p>Jeudi : {service.hours.thursday}</p>}
                    {service.hours.friday && <p>Vendredi : {service.hours.friday}</p>}
                    {service.hours.saturday && <p>Samedi : {service.hours.saturday}</p>}
                    {service.hours.sunday && <p>Dimanche : {service.hours.sunday}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Points Clés */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Points clés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.keyPoints.map((point, index) => {
                const KeyPointIcon = Icons[point.icon];
                return (
                  <Card key={index} className="card-hover">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4">
                        <KeyPointIcon className="w-12 h-12 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{point.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;