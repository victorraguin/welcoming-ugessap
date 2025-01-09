import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const medEventData: ServiceData = {
  id: "med-event",
  icon: "Ambulance",
  title: "Med'event",
  description: "Service médical professionnel pour vos événements sportifs, culturels et festifs, garantissant la sécurité de tous les participants.",
  address: {
    street: "78 rue des Événements",
    city: "Paris",
    postalCode: "75003"
  },
  keyPoints: [
    {
      title: "Disponibilité",
      description: "Intervention 7j/7, 24h/24",
      icon: "Calendar"
    },
    {
      title: "Équipe mobile",
      description: "Personnel médical qualifié sur site",
      icon: "Users"
    },
    {
      title: "Équipement complet",
      description: "Matériel médical professionnel",
      icon: "Hospital"
    }
  ],
  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  actions: [
    {
      label: "Demander un devis",
      onClick: () => console.log("Demande de devis"),
      variant: "default"
    },
    {
      label: "Nos prestations",
      onClick: () => console.log("Liste des prestations"),
      variant: "outline"
    }
  ]
};

const MedEvent = () => {
  return <ServicePage service={medEventData} />;
};

export default MedEvent;