import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const childcareHealthData: ServiceData = {
  id: "childcare-health",
  icon: "Baby",
  title: "Santé en crèche",
  description: "Un accompagnement médical personnalisé pour les tout-petits en crèche, assurant leur bien-être et leur développement.",
  address: {
    street: "45 avenue des Bambins",
    city: "Paris",
    postalCode: "75002"
  },
  keyPoints: [
    {
      title: "Suivi régulier",
      description: "Visites hebdomadaires en crèche",
      icon: "Calendar"
    },
    {
      title: "Équipe pédiatrique",
      description: "Infirmières et pédiatres spécialisés",
      icon: "Users"
    },
    {
      title: "Prévention",
      description: "Dépistage et conseils santé",
      icon: "Hospital"
    }
  ],
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  actions: [
    {
      label: "Contacter le service",
      onClick: () => console.log("Contact service"),
      variant: "default"
    },
    {
      label: "En savoir plus",
      onClick: () => console.log("Plus d'informations"),
      variant: "outline"
    }
  ]
};

const ChildcareHealth = () => {
  return <ServicePage service={childcareHealthData} />;
};

export default ChildcareHealth;