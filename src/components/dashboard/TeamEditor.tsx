import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  service: string;
  photoUrl: string;
}

const services = [
  "Centre de santé",
  "Santé en crèche",
  "Med Event",
  "Administration",
];

const TeamEditor = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Dr. Sarah Martin",
      role: "Médecin généraliste",
      service: "Centre de santé",
      photoUrl: "/placeholder.svg",
    },
  ]);

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      role: "",
      service: services[0],
      photoUrl: "/placeholder.svg",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First, delete all existing team members without using neq
      const { error: deleteError } = await supabase
        .from('team')
        .delete()
        .is('id', null);  // This will match all rows since we're not using a where clause

      if (deleteError) throw deleteError;

      // Then insert all current team members
      const { error: insertError } = await supabase
        .from('team')
        .insert(
          teamMembers.map(member => ({
            person_name: member.name,
            job_title: member.role,
            image: member.photoUrl,
            service_id: null, // You might want to map this to actual service IDs
          }))
        );

      if (insertError) throw insertError;
      toast.success("Équipe mise à jour avec succès");
    } catch (error) {
      console.error('Error saving team data:', error);
      toast.error("Erreur lors de la mise à jour de l'équipe");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Gestion de l'équipe</h2>
          <Button type="button" onClick={addTeamMember}>Ajouter un membre</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`photo-${member.id}`}>Photo</Label>
                  <Input
                    id={`photo-${member.id}`}
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
                  {member.photoUrl && (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`name-${member.id}`}>Nom</Label>
                  <Input
                    id={`name-${member.id}`}
                    value={member.name}
                    onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`role-${member.id}`}>Fonction</Label>
                  <Input
                    id={`role-${member.id}`}
                    value={member.role}
                    onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`service-${member.id}`}>Service</Label>
                  <Select
                    value={member.service}
                    onValueChange={(value) => updateTeamMember(member.id, "service", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => removeTeamMember(member.id)}
                  type="button"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full">
          Enregistrer les modifications
        </Button>
      </div>
      </form>
      <Toaster />
    </>
  );
};

export default TeamEditor;