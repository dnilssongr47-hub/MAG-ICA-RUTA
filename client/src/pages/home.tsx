import { Layout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { TourismContent } from "@/components/tourism-content";
import { SaborIqueno } from "@/components/sabor-iqueno";
import { ReviewsSection } from "@/components/reviews-section";
import { AIChatAssistant } from "@/components/chat-assistant";
import { AuthProvider } from "@/context/auth-context";
import { HotelModal } from "@/components/hotel-modal";
import { useState } from "react";

export default function Home() {
  const [isHotelOpen, setIsHotelOpen] = useState(false);

  return (
    <AuthProvider>
      <Layout>
        <Hero />
        <TourismContent />
        <SaborIqueno />
        <ReviewsSection />
        
        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container px-6">
            <div className="relative rounded-3xl bg-linear-to-r from-amber-600 to-orange-600 p-12 md:p-24 overflow-hidden text-center">
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
                  ¿Listo para vivir la experiencia?
                </h2>
                <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
                  Reserva tus tours, hoteles y experiencias con nosotros y obtén descuentos exclusivos.
                </p>
                <button 
                  onClick={() => setIsHotelOpen(true)}
                  className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full hover:bg-orange-50 transition-colors shadow-lg text-lg"
                >
                  Contáctanos Ahora
                </button>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
          </div>
        </section>

        <HotelModal isOpen={isHotelOpen} onClose={() => setIsHotelOpen(false)} />
        <AIChatAssistant />
      </Layout>
    </AuthProvider>
  );
}