import { icons } from "lucide-react";

export type ServiceAction = {
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline";
};

export type KeyPoint = {
  title: string;
  description: string;
  icon: keyof typeof icons;
};

export type ServiceImage = {
  url: string;
  alt: string;
  description: string;
};

export type ServiceData = {
  id: string;
  icon: keyof typeof icons;
  title: string;
  description: string;
  mission: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  keyPoints: KeyPoint[];
  images: ServiceImage[];
  actions: ServiceAction[];
};