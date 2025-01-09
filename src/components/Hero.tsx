import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight slide-up">
            Votre santé, notre priorité
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 slide-up">
            UGESSAP s'engage à fournir des services de santé accessibles et de qualité pour tous.
            Découvrez nos centres de santé et nos services spécialisés.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base"
            >
              Nos services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;