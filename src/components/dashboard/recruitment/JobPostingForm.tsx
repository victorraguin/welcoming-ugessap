import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface JobPostingFormProps {
  posting: JobPosting;
  onUpdate: (id: string, field: keyof JobPosting, value: string) => void;
  onRemove: (id: string) => void;
}

export const JobPostingForm = ({
  posting,
  onUpdate,
  onRemove,
}: JobPostingFormProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`image-${posting.id}`}>Image</Label>
          <Input
            id={`image-${posting.id}`}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle file upload here
                console.log("File selected:", file);
              }
            }}
          />
          {posting.imageUrl && (
            <img
              src={posting.imageUrl}
              alt={posting.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`title-${posting.id}`}>Titre du poste</Label>
          <Input
            id={`title-${posting.id}`}
            value={posting.title}
            onChange={(e) => onUpdate(posting.id, "title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`description-${posting.id}`}>Description</Label>
          <Textarea
            id={`description-${posting.id}`}
            value={posting.description}
            onChange={(e) => onUpdate(posting.id, "description", e.target.value)}
            rows={4}
          />
        </div>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={() => onRemove(posting.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </Button>
      </CardContent>
    </Card>
  );
};