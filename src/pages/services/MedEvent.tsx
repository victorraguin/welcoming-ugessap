import ServicePage from "@/components/services/ServicePage";
import { ServiceData } from "@/types/service";

const medEventData: ServiceData = {
  id: "med-event",
  icon: "Ambulance",
  title: "Med'event",
  description: "Service médical professionnel pour vos événements sportifs, culturels et festifs, garantissant la sécurité de tous les participants.",
  mission: `Med'event est votre partenaire de confiance pour la sécurité médicale de vos événements. Notre service assure 
    une présence médicale professionnelle lors de manifestations sportives, culturelles ou festives, garantissant une 
    intervention rapide et efficace en cas de besoin.

    Nous disposons d'équipes mobiles composées de médecins urgentistes, d'infirmiers et de secouristes, équipées de 
    matériel médical professionnel. Notre expertise nous permet d'adapter notre dispositif en fonction de la nature et 
    de l'ampleur de votre événement.

    Nous prenons en charge l'analyse des risques, la mise en place du dispositif médical approprié, et assurons une 
    coordination efficace avec les services d'urgence locaux. Notre objectif est de permettre à vos participants de 
    profiter de l'événement en toute sérénité.`,
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
  images: [
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      alt: "Équipe médicale en intervention",
      description: "Notre équipe en action lors d'un événement sportif"
    },
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      alt: "Poste médical avancé",
      description: "Installation de notre dispositif médical"
    }
  ],
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