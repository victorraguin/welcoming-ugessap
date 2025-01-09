import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const childcareHealthData: ServiceData = {
  id: "childcare-health",
  icon: "Baby",
  title: "Santé en crèche",
  description: "Un accompagnement médical personnalisé pour les tout-petits en crèche, assurant leur bien-être et leur développement.",
  mission: `Notre service de santé en crèche propose un accompagnement médical complet et personnalisé pour les établissements 
    d'accueil de jeunes enfants. Nous assurons une présence régulière d'infirmières et de pédiatres pour veiller à la santé 
    et au développement harmonieux des tout-petits.

    Notre équipe intervient dans la mise en place des protocoles sanitaires, la formation du personnel, le suivi médical 
    préventif et la gestion des situations d'urgence. Nous travaillons en étroite collaboration avec les équipes des crèches 
    pour créer un environnement sain et sécurisant.

    Nous accompagnons également les parents en leur proposant des conseils personnalisés et en assurant une communication 
    transparente sur le suivi médical de leur enfant.`,
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
  images: [
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      alt: "Consultation pédiatrique",
      description: "Suivi médical attentif des tout-petits"
    },
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      alt: "Formation du personnel de crèche",
      description: "Formation continue de nos équipes"
    }
  ],
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