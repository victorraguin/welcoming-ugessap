import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const healthCenterData: ServiceData = {
  id: "health-center",
  icon: "Stethoscope",
  title: "Centre de santé",
  description: "Notre centre de santé offre des soins de qualité et accessibles à tous, avec une équipe de professionnels dévoués à votre bien-être.",
  mission: `Notre centre de santé est bien plus qu'un simple lieu de consultation médicale. C'est un espace dédié à votre santé et votre bien-être, où chaque patient est accueilli avec attention et bienveillance. Notre équipe pluridisciplinaire de médecins généralistes, spécialistes et professionnels de santé travaille en étroite collaboration pour vous offrir une prise en charge complète et personnalisée.

Nous nous engageons à rendre les soins médicaux accessibles à tous, en pratiquant des tarifs conventionnés et en acceptant la carte vitale. Notre centre est équipé des dernières technologies médicales pour assurer des diagnostics précis et des traitements efficaces.

Que ce soit pour une consultation de routine, un suivi médical régulier ou une urgence, notre équipe est à votre disposition pour répondre à vos besoins de santé dans les meilleurs délais.`,
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
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  images: [
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      alt: "Consultation médicale",
      description: "Des consultations personnalisées dans un cadre professionnel et accueillant"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      alt: "Équipe médicale",
      description: "Notre équipe de professionnels de santé à votre service"
    },
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      alt: "Équipement médical",
      description: "Des équipements modernes pour des soins optimaux"
    }
  ],
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