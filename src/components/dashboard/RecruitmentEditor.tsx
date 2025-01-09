import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const RecruitmentEditor = () => {
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: "1",
      title: "Médecin généraliste",
      description: "Nous recherchons un médecin généraliste pour notre centre de santé.",
      imageUrl: "/placeholder.svg",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update recruitment status
      const { error: recruitmentError } = await supabase
        .from('association')
        .update({ is_open_for_recruitment: isRecruiting })
        .eq('id', '1');

      if (recruitmentError) throw recruitmentError;

      // Delete existing jobs
      const { error: deleteError } = await supabase
        .from('association_jobs')
        .delete()
        .neq('id', '0');

      if (deleteError) throw deleteError;

      // Insert new jobs
      if (jobPostings.length > 0) {
        const { error: jobsError } = await supabase
          .from('association_jobs')
          .insert(
            jobPostings.map(job => ({
              association_id: '1',
              title: job.title,
              description: job.description,
              image: job.imageUrl
            }))
          );

        if (jobsError) throw jobsError;
      }

      toast.success("Modifications enregistrées avec succès");
    } catch (error) {
      console.error('Error saving recruitment data:', error);
      toast.error("Erreur lors de l'enregistrement des modifications");
    }
  };

  const addJobPosting = () => {
    const newPosting: JobPosting = {
      id: Date.now().toString(),
      title: "",
      description: "",
      imageUrl: "/placeholder.svg",
    };
    setJobPostings([...jobPostings, newPosting]);
  };

  const removeJobPosting = (id: string) => {
    setJobPostings(jobPostings.filter(posting => posting.id !== id));
  };

  const updateJobPosting = (id: string, field: keyof JobPosting, value: string) => {
    setJobPostings(postings =>
      postings.map(posting =>
        posting.id === id ? { ...posting, [field]: value } : posting
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Gestion du recrutement</h2>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="recruitment-mode"
                checked={isRecruiting}
                onCheckedChange={setIsRecruiting}
              />
              <Label htmlFor="recruitment-mode">
                Mode recrutement {isRecruiting ? "activé" : "désactivé"}
              </Label>
            </div>
          </CardContent>
        </Card>

        {isRecruiting && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Offres d'emploi</h3>
              <Button type="button" onClick={addJobPosting}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une offre
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {jobPostings.map((posting) => (
                <Card key={posting.id}>
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
                        onChange={(e) => updateJobPosting(posting.id, "title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${posting.id}`}>Description</Label>
                      <Textarea
                        id={`description-${posting.id}`}
                        value={posting.description}
                        onChange={(e) => updateJobPosting(posting.id, "description", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => removeJobPosting(posting.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          Enregistrer les modifications
        </Button>
      </div>
    </form>
  );
};

export default RecruitmentEditor;