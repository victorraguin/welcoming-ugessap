import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ComplaintFormData = {
  name: string;
  email: string;
  serviceType: string;
  complaintDetails: string;
};

type RecruitmentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  motivation: string;
};

const Contact = () => {
  const { toast } = useToast();
  
  // Contact Form
  const contactForm = useForm<ContactFormData>();
  const onContactSubmit = (data: ContactFormData) => {
    console.log("Contact form data:", data);
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    contactForm.reset();
  };

  // Complaint Form
  const complaintForm = useForm<ComplaintFormData>();
  const onComplaintSubmit = (data: ComplaintFormData) => {
    console.log("Complaint form data:", data);
    toast({
      title: "Réclamation enregistrée",
      description: "Nous traiterons votre réclamation dans les plus brefs délais.",
    });
    complaintForm.reset();
  };

  // Recruitment Form
  const recruitmentForm = useForm<RecruitmentFormData>();
  const onRecruitmentSubmit = (data: RecruitmentFormData) => {
    console.log("Recruitment form data:", data);
    toast({
      title: "Candidature envoyée",
      description: "Nous étudierons votre candidature avec attention.",
    });
    recruitmentForm.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Contactez-nous</h1>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="complaint">Réclamation</TabsTrigger>
                  <TabsTrigger value="recruitment">Recrutement</TabsTrigger>
                </TabsList>

                {/* Contact Form */}
                <TabsContent value="contact">
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input placeholder="Sujet de votre message" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Votre message" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Envoyer</Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Complaint Form */}
                <TabsContent value="complaint">
                  <Form {...complaintForm}>
                    <form onSubmit={complaintForm.handleSubmit(onComplaintSubmit)} className="space-y-6">
                      <FormField
                        control={complaintForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service concerné</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Centre de santé, Med'event..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={complaintForm.control}
                        name="complaintDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Détails de la réclamation</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Décrivez votre réclamation" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Envoyer la réclamation</Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Recruitment Form */}
                <TabsContent value="recruitment">
                  <Form {...recruitmentForm}>
                    <form onSubmit={recruitmentForm.handleSubmit(onRecruitmentSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={recruitmentForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre prénom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={recruitmentForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={recruitmentForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="votre@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={recruitmentForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre numéro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={recruitmentForm.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste recherché</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Médecin, Infirmier(e)..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recruitmentForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expérience professionnelle</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Décrivez votre expérience" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={recruitmentForm.control}
                        name="motivation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lettre de motivation</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Pourquoi souhaitez-vous nous rejoindre ?" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Envoyer ma candidature</Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;