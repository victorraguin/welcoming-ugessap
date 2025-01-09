import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

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
    description: "Union de Gestion des Établissements des Services de Santé et d'Aide à la Personne",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Saving data:", { associationData, partners, keyPoints });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations Générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'association</Label>
            <Input
              id="name"
              value={associationData.name}
              onChange={(e) => setAssociationData({ ...associationData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={associationData.description}
              onChange={(e) => setAssociationData({ ...associationData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={associationData.logoUrl}
              onChange={(e) => setAssociationData({ ...associationData, logoUrl: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partenaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.id} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removePartner(partner.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor={`partner-name-${partner.id}`}>Nom du partenaire</Label>
                <Input
                  id={`partner-name-${partner.id}`}
                  value={partner.name}
                  onChange={(e) => {
                    const updatedPartners = partners.map(p =>
                      p.id === partner.id ? { ...p, name: e.target.value } : p
                    );
                    setPartners(updatedPartners);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`partner-description-${partner.id}`}>Description</Label>
                <Input
                  id={`partner-description-${partner.id}`}
                  value={partner.description}
                  onChange={(e) => {
                    const updatedPartners = partners.map(p =>
                      p.id === partner.id ? { ...p, description: e.target.value } : p
                    );
                    setPartners(updatedPartners);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`partner-logo-${partner.id}`}>Logo URL</Label>
                <Input
                  id={`partner-logo-${partner.id}`}
                  value={partner.logoUrl}
                  onChange={(e) => {
                    const updatedPartners = partners.map(p =>
                      p.id === partner.id ? { ...p, logoUrl: e.target.value } : p
                    );
                    setPartners(updatedPartners);
                  }}
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addPartner} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Ajouter un partenaire
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Points Clés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyPoints.map((point) => (
            <div key={point.id} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeKeyPoint(point.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor={`point-title-${point.id}`}>Titre</Label>
                <Input
                  id={`point-title-${point.id}`}
                  value={point.title}
                  onChange={(e) => {
                    const updatedPoints = keyPoints.map(p =>
                      p.id === point.id ? { ...p, title: e.target.value } : p
                    );
                    setKeyPoints(updatedPoints);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`point-description-${point.id}`}>Description</Label>
                <Input
                  id={`point-description-${point.id}`}
                  value={point.description}
                  onChange={(e) => {
                    const updatedPoints = keyPoints.map(p =>
                      p.id === point.id ? { ...p, description: e.target.value } : p
                    );
                    setKeyPoints(updatedPoints);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`point-icon-${point.id}`}>Nom de l'icône</Label>
                <Input
                  id={`point-icon-${point.id}`}
                  value={point.iconName}
                  onChange={(e) => {
                    const updatedPoints = keyPoints.map(p =>
                      p.id === point.id ? { ...p, iconName: e.target.value } : p
                    );
                    setKeyPoints(updatedPoints);
                  }}
                />
              </div>
            </div>
          ))}
          <Button type="button" onClick={addKeyPoint} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Ajouter un point clé
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Enregistrer les modifications
      </Button>
    </form>
  );
};

export default AssociationEditor;