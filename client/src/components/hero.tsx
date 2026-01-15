import { motion } from "framer-motion";
import { ArrowRight, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BookingModal } from "@/components/booking-modal";
import heroBg from "@assets/stock_images/huacachina_oasis_des_5b3bff04.jpg";

export function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={heroBg} 
          alt="Huacachina Oasis" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
      </div>

      <div className="container relative z-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-sm text-amber-200 mb-8 backdrop-blur-sm"
        >
          <MapPin className="w-4 h-4" />
          Descubre el encanto del desierto
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6"
        >
          Explora la Magia <br />
          <span className="text-gradient bg-linear-to-r from-amber-400 via-orange-400 to-red-400">de Ica, Perú</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-lg"
        >
          Un viaje inolvidable entre dunas doradas, viñedos históricos y misterios ancestrales.
          Tu aventura comienza aquí.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full h-12 px-8 text-base bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
          >
            <CalendarIcon className="mr-2 w-4 h-4" /> Agendar Destino
          </Button>
        </motion.div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
}