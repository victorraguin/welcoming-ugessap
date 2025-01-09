import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Centre de santé", path: "/services/health-center" },
    { name: "Santé en crèche", path: "/services/childcare-health" },
    { name: "Med'event", path: "/services/med-event" },
  ];

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "L'association", path: "/association" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">UGESSAP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/association"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/association" ? "text-primary" : "text-foreground/80"
              }`}
            >
              L'association
            </Link>
            
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Nos services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-48">
                <div className="flex flex-col space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="text-sm hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/contact" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-white z-40">
            <div className="pt-20 pb-6 px-4 space-y-6">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === "/" ? "text-primary" : "text-foreground/80"
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/association"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === "/association" ? "text-primary" : "text-foreground/80"
                }`}
              >
                L'association
              </Link>
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold text-gray-500 mb-3">Nos services</p>
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-foreground/80 hover:text-primary"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors hover:text-primary ${
                  location.pathname === "/contact" ? "text-primary" : "text-foreground/80"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;