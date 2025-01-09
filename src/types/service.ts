import { icons } from "lucide-react";

export interface Service {
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