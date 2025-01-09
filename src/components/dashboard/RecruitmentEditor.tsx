import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">
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
                  <Button onClick={addJobPosting}>
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

                <Button type="submit" className="w-full">
                  Enregistrer les modifications
                </Button>
              </>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RecruitmentEditor;