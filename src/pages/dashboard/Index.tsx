import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Building2, Users, Briefcase, LayoutGrid, Image, MessageSquare, Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardIndex = () => {
  const dashboardCards = [
    {
      title: "Association",
      description: "Gérer les informations de l'association",
      icon: Building2,
      href: "/dashboard/association",
    },
    {
      title: "Services",
      description: "Gérer les services proposés",
      icon: LayoutGrid,
      href: "/dashboard/services",
    },
    {
      title: "Images",
      description: "Gérer les images du carousel",
      icon: Image,
      href: "/dashboard/images",
    },
    {
      title: "Avis",
      description: "Gérer les avis clients",
      icon: MessageSquare,
      href: "/dashboard/reviews",
    },
    {
      title: "Équipe",
      description: "Gérer l'équipe",
      icon: Users,
      href: "/dashboard/team",
    },
    {
      title: "Recrutement",
      description: "Gérer les offres d'emploi",
      icon: Briefcase,
      href: "/dashboard/recruitment",
    },
    {
      title: "Contact Webmaster",
      description: "Contacter le développeur",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => (
            <Link key={card.href} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <card.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;