import { icons } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const LucideIcon: LucideIcon = icons[name];
  return <LucideIcon className={className} />;
};