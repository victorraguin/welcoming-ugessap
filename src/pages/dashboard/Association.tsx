import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { GeneralInfoSection } from "@/components/dashboard/association/GeneralInfoSection";
import { KeyPointsSection } from "@/components/dashboard/association/KeyPointsSection";
import { PartnersSection } from "@/components/dashboard/association/PartnersSection";
import { useState } from "react";

const AssociationPage = () => {
  const [generalInfo, setGeneralInfo] = useState({
    name: "UGESSAP",
    shortDescription: "Union de Gestion des Établissements des Services de Santé et d'Aide à la Personne",
    longDescription: "",
    logoUrl: "/placeholder.svg",
  });

  const [keyPoints, setKeyPoints] = useState([
    {
      id: "1",
      title: "Structure",
      description: "Association loi 1901 créée en 2020",
      iconName: "Building2",
    },
  ]);

  const [partners, setPartners] = useState([
    {
      id: "1",
      name: "ARS Île-de-France",
      description: "Agence Régionale de Santé",
      logoUrl: "/placeholder.svg",
    },
  ]);

  const handleGeneralInfoUpdate = (field: string, value: string) => {
    setGeneralInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddKeyPoint = () => {
    const newKeyPoint = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      iconName: "",
    };
    setKeyPoints([...keyPoints, newKeyPoint]);
  };

  const handleRemoveKeyPoint = (id: string) => {
    setKeyPoints(keyPoints.filter((point) => point.id !== id));
  };

  const handleUpdateKeyPoint = (id: string, field: string, value: string) => {
    setKeyPoints(
      keyPoints.map((point) =>
        point.id === id ? { ...point, [field]: value } : point
      )
    );
  };

  const handleAddPartner = () => {
    const newPartner = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      logoUrl: "",
    };
    setPartners([...partners, newPartner]);
  };

  const handleRemovePartner = (id: string) => {
    setPartners(partners.filter((partner) => partner.id !== id));
  };

  const handleUpdatePartner = (id: string, field: string, value: string) => {
    setPartners(
      partners.map((partner) =>
        partner.id === id ? { ...partner, [field]: value } : partner
      )
    );
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Gestion de l'association</h1>
          <div className="space-y-8">
            <GeneralInfoSection
              name={generalInfo.name}
              shortDescription={generalInfo.shortDescription}
              longDescription={generalInfo.longDescription}
              logoUrl={generalInfo.logoUrl}
              onUpdate={handleGeneralInfoUpdate}
            />
            <KeyPointsSection
              keyPoints={keyPoints}
              onAddKeyPoint={handleAddKeyPoint}
              onRemoveKeyPoint={handleRemoveKeyPoint}
              onUpdateKeyPoint={handleUpdateKeyPoint}
            />
            <PartnersSection
              partners={partners}
              onAddPartner={handleAddPartner}
              onRemovePartner={handleRemovePartner}
              onUpdatePartner={handleUpdatePartner}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AssociationPage;