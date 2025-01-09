import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Notre Mission</h2>
        
        <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
          <p className="text-lg">
            Bienvenue sur le site de l'association <span className="text-primary font-semibold">UGESSAP</span>, 
            dédiée à la santé et au bien être. Nous proposons <span className="text-primary font-semibold">trois services principaux</span> : 
            le centre de santé, où des professionnels qualifiés offrent des soins de proximité ; 
            notre accompagnement en crèches, avec des infirmières et des pédiatres intervenant directement pour 
            assurer le suivi médical des enfants; et Med'event, un service spécialisé dans la prise en charge 
            médicale lors d'événement sportifs, culturels et festifs.
          </p>
          
          <p className="text-lg">
            Notre missions est d'<span className="text-primary font-semibold">assurer une prise en charge adaptée et accessible</span>, 
            que ce soit dans un cadre quotidien ou lors de grands rassemblements.
          </p>
          
          <p className="text-lg font-medium text-primary text-center mt-8">
            <Link to="/services" className="hover:underline">
              Parcourez notre site pour découvrir nos engagements, équipe et nos solutions pour répondre à vos besoins !
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;