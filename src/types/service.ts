export type ServiceAction = {
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline";
};

export type KeyPoint = {
  title: string;
  description: string;
  icon: string;
};

export type ServiceData = {
  id: string;
  icon: string;
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  keyPoints: KeyPoint[];
  image: string;
  actions: ServiceAction[];
};