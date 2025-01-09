import { Building2, Users, Trophy, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Association = () => {
  const keyPoints = [
    {
      icon: Building2,
      title: "Structure",
      description: "Association loi 1901 créée en 2020, dédiée à la santé de proximité"
    },
    {
      icon: Users,
      title: "Équipe",
      description: "Plus de 50 professionnels de santé engagés"
    },
    {
      icon: Trophy,
      title: "Impact",
      description: "Plus de 10 000 patients accompagnés depuis notre création"
    },
    {
      icon: Briefcase,
      title: "Expertise",
      description: "Services de santé innovants et accessibles"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sophie Martin",
      role: "Directrice Médicale",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      description: "Médecin généraliste avec 15 ans d'expérience"
    },
    {
      name: "Jean Dupont",
      role: "Directeur Administratif",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "Expert en gestion d'établissements de santé"
    },
    {
      name: "Marie Lambert",
      role: "Responsable des Opérations",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "Coordinatrice des services et des équipes"
    },
    {
      name: "Dr. Thomas Bernard",
      role: "Responsable Med'event",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      description: "Spécialiste en médecine du sport et événementielle"
    }
  ];

  const partners = [
    {
      name: "ARS Île-de-France",
      logo: "/placeholder.svg",
      description: "Agence Régionale de Santé"
    },
    {
      name: "CPAM",
      logo: "/placeholder.svg",
      description: "Caisse Primaire d'Assurance Maladie"
    },
    {
      name: "Ville de Paris",
      logo: "/placeholder.svg",
      description: "Mairie de Paris"
    }
  ];

  const positions = [
    {
      title: "Médecin généraliste",
      type: "CDI",
      location: "Paris"
    },
    {
      title: "Infirmier(e)",
      type: "CDI",
      location: "Paris"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 slide-up">
                  UGESSAP
                </h1>
                <p className="text-lg text-gray-600 mb-8 slide-up">
                  Union de Gestion des Établissements des Services de Santé et d'Aide à la Personne
                </p>
                <div className="flex items-center gap-4 fade-in">
                  <img
                    src="/placeholder.svg"
                    alt="Logo UGESSAP"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Équipe UGESSAP"
                  className="rounded-lg shadow-xl w-full fade-in"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Notre Mission
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
              <p className="text-lg">
                UGESSAP est une association dédiée à la santé et au bien-être, proposant trois services principaux : 
                le centre de santé, où des professionnels qualifiés offrent des soins de proximité ; 
                notre accompagnement en crèches, avec des infirmières et des pédiatres intervenant directement pour 
                assurer le suivi médical des enfants ; et Med'event, un service spécialisé dans la prise en charge 
                médicale lors d'événements sportifs, culturels et festifs.
              </p>
              <p className="text-lg">
                Notre mission est d'assurer une prise en charge adaptée et accessible, que ce soit dans un cadre 
                quotidien ou lors de grands rassemblements. Nous nous engageons à fournir des services de santé 
                de qualité, tout en maintenant une approche humaine et personnalisée.
              </p>
            </div>
          </div>
        </section>

        {/* Points Clés */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos points clés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyPoints.map((point, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <point.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                    <p className="text-gray-600">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Notre Équipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partenaires */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos partenaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-24 h-24 object-contain mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                    <p className="text-gray-600">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recrutement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nous recrutons
            </h2>
            <div className="max-w-2xl mx-auto">
              {positions.map((position, index) => (
                <Card key={index} className="mb-4 card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{position.title}</h3>
                        <p className="text-gray-600">
                          {position.type} - {position.location}
                        </p>
                      </div>
                      <a
                        href="mailto:contact@ugessap.fr"
                        className="text-primary hover:underline"
                      >
                        Postuler
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Association;