import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import * as Icons from "lucide-react";

interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  keyPoints: Array<{
    id: string;
    icon: string;
    text: string;
  }>;
  images: Array<{
    id: string;
    url: string;
    alt: string;
  }>;
  buttons: Array<{
    id: string;
    text: string;
    link: string;
  }>;
}

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);

  const addService = () => {
    const newService: Service = {
      id: crypto.randomUUID(),
      icon: "LayoutGrid",
      title: "",
      shortDescription: "",
      longDescription: "",
      keyPoints: [],
      images: [],
      buttons: [],
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: any) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const addKeyPoint = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      const newKeyPoint = {
        id: crypto.randomUUID(),
        icon: "Check",
        text: "",
      };
      updateService(serviceId, "keyPoints", [...service.keyPoints, newKeyPoint]);
    }
  };

  const removeKeyPoint = (serviceId: string, keyPointId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      updateService(
        serviceId,
        "keyPoints",
        service.keyPoints.filter((kp) => kp.id !== keyPointId)
      );
    }
  };

  const addImage = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      const newImage = {
        id: crypto.randomUUID(),
        url: "",
        alt: "",
      };
      updateService(serviceId, "images", [...service.images, newImage]);
    }
  };

  const removeImage = (serviceId: string, imageId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      updateService(
        serviceId,
        "images",
        service.images.filter((img) => img.id !== imageId)
      );
    }
  };

  const addButton = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      const newButton = {
        id: crypto.randomUUID(),
        text: "",
        link: "",
      };
      updateService(serviceId, "buttons", [...service.buttons, newButton]);
    }
  };

  const removeButton = (serviceId: string, buttonId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      updateService(
        serviceId,
        "buttons",
        service.buttons.filter((btn) => btn.id !== buttonId)
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Gestion des services</h1>
            <Button onClick={addService}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un service
            </Button>
          </div>

          <div className="grid gap-8">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => removeService(service.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardTitle>Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Icône</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) =>
                          updateService(service.id, "icon", e.target.value)
                        }
                        placeholder="Nom de l'icône (ex: LayoutGrid)"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Titre</Label>
                      <Input
                        value={service.title}
                        onChange={(e) =>
                          updateService(service.id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Description courte</Label>
                      <Input
                        value={service.shortDescription}
                        onChange={(e) =>
                          updateService(service.id, "shortDescription", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Description longue</Label>
                      <Textarea
                        value={service.longDescription}
                        onChange={(e) =>
                          updateService(service.id, "longDescription", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Adresse (optionnelle)</h3>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Rue</Label>
                        <Input
                          value={service.address?.street || ""}
                          onChange={(e) =>
                            updateService(service.id, "address", {
                              ...service.address,
                              street: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Ville</Label>
                        <Input
                          value={service.address?.city || ""}
                          onChange={(e) =>
                            updateService(service.id, "address", {
                              ...service.address,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Code postal</Label>
                        <Input
                          value={service.address?.postalCode || ""}
                          onChange={(e) =>
                            updateService(service.id, "address", {
                              ...service.address,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Points clés</h3>
                      <Button onClick={() => addKeyPoint(service.id)}>
                        <Plus className="mr-2 h-4 w-4" /> Ajouter
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {service.keyPoints.map((keyPoint) => (
                        <div key={keyPoint.id} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <Input
                              value={keyPoint.icon}
                              onChange={(e) => {
                                const updatedKeyPoints = service.keyPoints.map((kp) =>
                                  kp.id === keyPoint.id
                                    ? { ...kp, icon: e.target.value }
                                    : kp
                                );
                                updateService(service.id, "keyPoints", updatedKeyPoints);
                              }}
                              placeholder="Nom de l'icône"
                            />
                            <Input
                              value={keyPoint.text}
                              onChange={(e) => {
                                const updatedKeyPoints = service.keyPoints.map((kp) =>
                                  kp.id === keyPoint.id
                                    ? { ...kp, text: e.target.value }
                                    : kp
                                );
                                updateService(service.id, "keyPoints", updatedKeyPoints);
                              }}
                              placeholder="Texte"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeKeyPoint(service.id, keyPoint.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Images</h3>
                      <Button onClick={() => addImage(service.id)}>
                        <Plus className="mr-2 h-4 w-4" /> Ajouter
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {service.images.map((image) => (
                        <div key={image.id} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <Input
                              value={image.url}
                              onChange={(e) => {
                                const updatedImages = service.images.map((img) =>
                                  img.id === image.id
                                    ? { ...img, url: e.target.value }
                                    : img
                                );
                                updateService(service.id, "images", updatedImages);
                              }}
                              placeholder="URL de l'image"
                            />
                            <Input
                              value={image.alt}
                              onChange={(e) => {
                                const updatedImages = service.images.map((img) =>
                                  img.id === image.id
                                    ? { ...img, alt: e.target.value }
                                    : img
                                );
                                updateService(service.id, "images", updatedImages);
                              }}
                              placeholder="Texte alternatif"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(service.id, image.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Boutons</h3>
                      <Button onClick={() => addButton(service.id)}>
                        <Plus className="mr-2 h-4 w-4" /> Ajouter
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {service.buttons.map((button) => (
                        <div key={button.id} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <Input
                              value={button.text}
                              onChange={(e) => {
                                const updatedButtons = service.buttons.map((btn) =>
                                  btn.id === button.id
                                    ? { ...btn, text: e.target.value }
                                    : btn
                                );
                                updateService(service.id, "buttons", updatedButtons);
                              }}
                              placeholder="Texte du bouton"
                            />
                            <Input
                              value={button.link}
                              onChange={(e) => {
                                const updatedButtons = service.buttons.map((btn) =>
                                  btn.id === button.id
                                    ? { ...btn, link: e.target.value }
                                    : btn
                                );
                                updateService(service.id, "buttons", updatedButtons);
                              }}
                              placeholder="Lien"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeButton(service.id, button.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesEditor;