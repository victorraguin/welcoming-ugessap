import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, Home, Settings, Users, Briefcase, LayoutGrid, Image, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Association",
    url: "/dashboard/association",
    icon: Building2,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: LayoutGrid,
  },
  {
    title: "Images",
    url: "/dashboard/images",
    icon: Image,
  },
  {
    title: "Avis",
    url: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    title: "Équipe",
    url: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Recrutement",
    url: "/dashboard/recruitment",
    icon: Briefcase,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;