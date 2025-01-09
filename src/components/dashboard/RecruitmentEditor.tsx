import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { JobPostingForm } from "./recruitment/JobPostingForm";
import { RecruitmentModeToggle } from "./recruitment/RecruitmentModeToggle";

const ASSOCIATION_ID = "d129aa9c-c316-4cea-b3dc-45699cac3be5";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const RecruitmentEditor = () => {
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    const fetchRecruitmentData = async () => {
      try {
        // Fetch association recruitment status
        const { data: associationData, error: associationError } = await supabase
          .from('association')
          .select('is_open_for_recruitment')
          .eq('id', ASSOCIATION_ID)
          .single();

        if (associationError) throw associationError;
        
        if (associationData) {
          setIsRecruiting(associationData.is_open_for_recruitment || false);
        }

        // Fetch job postings
        const { data: jobsData, error: jobsError } = await supabase
          .from('association_jobs')
          .select('*')
          .eq('association_id', ASSOCIATION_ID);

        if (jobsError) throw jobsError;

        if (jobsData) {
          const formattedJobs = jobsData.map(job => ({
            id: job.id,
            title: job.title,
            description: job.description || "",
            imageUrl: job.image || "/placeholder.svg",
          }));
          setJobPostings(formattedJobs);
        }
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchRecruitmentData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update recruitment status
      const { error: recruitmentError } = await supabase
        .from('association')
        .update({ is_open_for_recruitment: isRecruiting })
        .eq('id', ASSOCIATION_ID);

      if (recruitmentError) throw recruitmentError;

      // Delete existing jobs
      const { error: deleteError } = await supabase
        .from('association_jobs')
        .delete()
        .eq('association_id', ASSOCIATION_ID);

      if (deleteError) throw deleteError;

      // Insert new jobs
      if (jobPostings.length > 0) {
        const { error: jobsError } = await supabase
          .from('association_jobs')
          .insert(
            jobPostings.map(job => ({
              association_id: ASSOCIATION_ID,
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
    <>
      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion du recrutement</h2>
          </div>

          <RecruitmentModeToggle
            isRecruiting={isRecruiting}
            onToggle={setIsRecruiting}
          />

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
                  <JobPostingForm
                    key={posting.id}
                    posting={posting}
                    onUpdate={updateJobPosting}
                    onRemove={removeJobPosting}
                  />
                ))}
              </div>
            </>
          )}

          <Button type="submit" className="w-full">
            Enregistrer les modifications
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default RecruitmentEditor;