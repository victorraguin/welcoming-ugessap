import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    title: "Service exceptionnel",
    date: "15 Mars 2024",
    stars: 5,
    description: "Une équipe professionnelle et attentionnée. Je recommande vivement leurs services.",
  },
  {
    title: "Prise en charge rapide",
    date: "10 Mars 2024",
    stars: 5,
    description: "Intervention efficace lors de notre événement sportif. Merci à toute l'équipe !",
  },
  {
    title: "Équipe compétente",
    date: "5 Mars 2024",
    stars: 4,
    description: "Personnel qualifié et à l'écoute. Un vrai plus pour notre crèche.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Avis Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{testimonial.title}</h3>
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{testimonial.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;