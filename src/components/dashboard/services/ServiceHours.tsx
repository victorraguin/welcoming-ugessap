import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Hours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

interface ServiceHoursProps {
  hours?: Hours;
  onUpdate: (hours: Hours) => void;
}

export const ServiceHours = ({ hours = {}, onUpdate }: ServiceHoursProps) => {
  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Horaires</h3>
      <div className="grid gap-4">
        {days.map((day) => (
          <div key={day.key} className="grid gap-2">
            <Label>{day.label}</Label>
            <Input
              value={hours[day.key] || ""}
              onChange={(e) =>
                onUpdate({
                  ...hours,
                  [day.key]: e.target.value,
                })
              }
              placeholder="ex: 9h-18h"
            />
          </div>
        ))}
      </div>
    </div>
  );
};