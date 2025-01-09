import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface KeyPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface KeyPointsSectionProps {
  keyPoints: KeyPoint[];
  onAddKeyPoint: () => void;
  onRemoveKeyPoint: (id: string) => void;
  onUpdateKeyPoint: (id: string, field: string, value: string) => void;
}

export const KeyPointsSection = ({
  keyPoints,
  onAddKeyPoint,
  onRemoveKeyPoint,
  onUpdateKeyPoint,
}: KeyPointsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Points Clés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyPoints.map((point) => (
            <div key={point.id} className="space-y-4 p-4 border rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => onRemoveKeyPoint(point.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label htmlFor={`point-title-${point.id}`}>Titre</Label>
                <Input
                  id={`point-title-${point.id}`}
                  value={point.title}
                  onChange={(e) => onUpdateKeyPoint(point.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`point-description-${point.id}`}>Description</Label>
                <Input
                  id={`point-description-${point.id}`}
                  value={point.description}
                  onChange={(e) => onUpdateKeyPoint(point.id, "description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`point-icon-${point.id}`}>Nom de l'icône</Label>
                <Input
                  id={`point-icon-${point.id}`}
                  value={point.iconName}
                  onChange={(e) => onUpdateKeyPoint(point.id, "iconName", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <Button type="button" onClick={onAddKeyPoint} className="w-full mt-4">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un point clé
        </Button>
      </CardContent>
    </Card>
  );
};