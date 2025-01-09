import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface ServiceButton {
  id: string;
  text: string;
  link: string;
}

interface ServiceButtonsProps {
  buttons: ServiceButton[];
  onUpdate: (buttons: ServiceButton[]) => void;
}

export const ServiceButtons = ({ buttons, onUpdate }: ServiceButtonsProps) => {
  const addButton = () => {
    const newButton = {
      id: crypto.randomUUID(),
      text: "",
      link: "",
    };
    onUpdate([...buttons, newButton]);
  };

  const removeButton = (id: string) => {
    onUpdate(buttons.filter((btn) => btn.id !== id));
  };

  const updateButton = (id: string, field: keyof ServiceButton, value: string) => {
    onUpdate(
      buttons.map((btn) =>
        btn.id === id ? { ...btn, [field]: value } : btn
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Boutons</h3>
        <Button onClick={addButton}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>
      <div className="grid gap-4">
        {buttons.map((button) => (
          <div key={button.id} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Input
                value={button.text}
                onChange={(e) => updateButton(button.id, "text", e.target.value)}
                placeholder="Texte du bouton"
              />
              <Input
                value={button.link}
                onChange={(e) => updateButton(button.id, "link", e.target.value)}
                placeholder="Lien"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeButton(button.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};