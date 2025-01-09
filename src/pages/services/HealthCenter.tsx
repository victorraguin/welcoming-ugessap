import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const healthCenterData: ServiceData = {
  id: "health-center",
  icon: "Stethoscope",
  title: "Centre de santé",
  description: "Notre centre de santé offre des soins de qualité et accessibles à tous, avec une équipe de professionnels dévoués à votre bien-être.",
  address: {
    street: "123 rue de la Santé",
    city: "Paris",
    postalCode: "75001"
  },
  keyPoints: [
    {
      title: "Accessibilité",
      description: "Ouvert 6/7j, avec ou sans rendez-vous",
      icon: "Calendar"
    },
    {
      title: "Équipe qualifiée",
      description: "Médecins et spécialistes expérimentés",
      icon: "Users"
    },
    {
      title: "Soins complets",
      description: "De la prévention au suivi personnalisé",
      icon: "Hospital"
    }
  ],
  image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  actions: [
    {
      label: "Prendre rendez-vous",
      onClick: () => console.log("Prise de rendez-vous"),
      variant: "default"
    },
    {
      label: "Nos horaires",
      onClick: () => console.log("Affichage des horaires"),
      variant: "outline"
    }
  ]
};

const HealthCenter = () => {
  return <ServicePage service={healthCenterData} />;
};

export default HealthCenter;