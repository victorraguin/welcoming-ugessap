import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GeneralInfoSection } from "./association/GeneralInfoSection";
import { PartnersSection } from "./association/PartnersSection";
import { KeyPointsSection } from "./association/KeyPointsSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Json } from "@/integrations/supabase/types";

interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
}

interface KeyPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

const AssociationEditor = () => {
  const [associationData, setAssociationData] = useState({
    name: "UGESSAP",
    shortDescription: "Union de Gestion des Établissements des Services de Santé et d'Aide à la Personne",
    longDescription: "L'UGESSAP est une association loi 1901 créée en 2020, dédiée à la santé de proximité. Notre mission est d'améliorer l'accès aux soins et aux services d'aide à la personne dans les zones urbaines et rurales, en favorisant la coordination entre les différents acteurs de santé.",
    logoUrl: "/placeholder.svg",
  });

  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "ARS Île-de-France",
      description: "Agence Régionale de Santé",
      logoUrl: "/placeholder.svg",
    },
  ]);

  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([
    {
      id: "1",
      title: "Structure",
      description: "Association loi 1901 créée en 2020, dédiée à la santé de proximité",
      iconName: "Building2",
    },
  ]);

  const handleGeneralInfoUpdate = (field: string, value: string) => {
    setAssociationData((prev) => ({ ...prev, [field]: value }));
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: "",
      description: "",
      logoUrl: "/placeholder.svg",
    };
    setPartners([...partners, newPartner]);
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter(partner => partner.id !== id));
  };

  const updatePartner = (id: string, field: string, value: string) => {
    setPartners(partners.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const addKeyPoint = () => {
    const newKeyPoint: KeyPoint = {
      id: Date.now().toString(),
      title: "",
      description: "",
      iconName: "Building2",
    };
    setKeyPoints([...keyPoints, newKeyPoint]);
  };

  const removeKeyPoint = (id: string) => {
    setKeyPoints(keyPoints.filter(point => point.id !== id));
  };

  const updateKeyPoint = (id: string, field: string, value: string) => {
    setKeyPoints(keyPoints.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform partners and keyPoints to match the Json type
      const partnersJson = partners.map(partner => ({
        ...partner,
        logo_url: partner.logoUrl
      })) as Json[];

      const keyPointsJson = keyPoints.map(point => ({
        ...point,
        icon_name: point.iconName
      })) as Json[];

      const { error } = await supabase
        .from('association')
        .update({
          name: associationData.name,
          description: associationData.longDescription,
          logo: associationData.logoUrl,
          partners: partnersJson,
          key_points: keyPointsJson,
        })
        .eq('id', '1');

      if (error) throw error;
      toast.success("Modifications enregistrées avec succès");
    } catch (error) {
      console.error('Error saving association data:', error);
      toast.error("Erreur lors de l'enregistrement des modifications");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <GeneralInfoSection
          {...associationData}
          onUpdate={handleGeneralInfoUpdate}
        />
        <PartnersSection
          partners={partners}
          onAddPartner={addPartner}
          onRemovePartner={removePartner}
          onUpdatePartner={updatePartner}
        />
        <KeyPointsSection
          keyPoints={keyPoints}
          onAddKeyPoint={addKeyPoint}
          onRemoveKeyPoint={removeKeyPoint}
          onUpdateKeyPoint={updateKeyPoint}
        />
        <Button type="submit" className="w-full">
          Enregistrer les modifications
        </Button>
      </form>
      <Toaster />
    </>
  );
};

export default AssociationEditor;