import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Building2, Navigation, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const hotelData = {
  ica: [
    { name: "Hotel Las Dunas", stars: 4, price: 450, location: "Av. La Angostura", maps: "https://www.google.com/maps/search/Hotel+Las+Dunas+Ica", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" },
    { name: "Viñas Queirolo", stars: 5, price: 750, location: "San José de los Molinos", maps: "https://www.google.com/maps/search/Hotel+Vinas+Queirolo", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop" },
    { name: "Huacachina Curasi", stars: 3, price: 180, location: "Huacachina Oasis", maps: "https://www.google.com/maps/search/Huacachina+Curasi+Hotel", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop" }
  ],
  pisco: [
    { name: "Hacienda Bahía Paracas", stars: 5, price: 820, location: "Bahía de Paracas", maps: "https://www.google.com/maps/search/Hacienda+Bahia+Paracas", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop" },
    { name: "Hotel San Agustín", stars: 4, price: 380, location: "Paracas", maps: "https://www.google.com/maps/search/Hotel+San+Agustin+Paracas", image: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1000&auto=format&fit=crop" },
    { name: "Paracas Guest House", stars: 3, price: 120, location: "Pueblo de Paracas", maps: "https://www.google.com/maps/search/Paracas+Guest+House", image: "https://images.unsplash.com/photo-1551882547-ff43c63efe81?q=80&w=1000&auto=format&fit=crop" }
  ],
  nazca: [
    { name: "DM Hoteles Nazca", stars: 3, price: 220, location: "Plaza de Armas", maps: "https://www.google.com/maps/search/DM+Hoteles+Nazca", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000&auto=format&fit=crop" },
    { name: "Hotel Casa Andina", stars: 4, price: 350, location: "Calle Bolognesi", maps: "https://www.google.com/maps/search/Casa+Andina+Standard+Nazca", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1000&auto=format&fit=crop" }
  ],
  chincha: [
    { name: "Casa Hacienda San José", stars: 5, price: 650, location: "El Carmen", maps: "https://www.google.com/maps/search/Casa+Hacienda+San+Jose+Chincha", image: "https://images.unsplash.com/photo-1590059530472-a4f66a01f786?q=80&w=1000&auto=format&fit=crop" },
    { name: "Qala Hotels", stars: 3, price: 160, location: "Chincha Alta", maps: "https://www.google.com/maps/search/Qala+Hotels+Chincha", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" }
  ],
  marcona: [
    { name: "Marcona Hotel", stars: 3, price: 140, location: "San Juan de Marcona", maps: "https://www.google.com/maps/search/Hotel+Marcona+Peru", image: "https://images.unsplash.com/photo-1517840901100-8179e982ad44?q=80&w=1000&auto=format&fit=crop" }
  ]
};

export function HotelModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-3xl font-display font-bold text-amber-500 flex items-center gap-2">
            <Building2 className="w-8 h-8" /> Hoteles en la Región Ica
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="ica" className="w-full">
          <div className="px-6 py-4 border-b border-white/10">
            <TabsList className="bg-white/5 w-full flex overflow-x-auto justify-start no-scrollbar p-1">
              {Object.keys(hotelData).map((city) => (
                <TabsTrigger 
                  key={city} 
                  value={city} 
                  className="capitalize rounded-full px-6 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  {city}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="h-[60vh]">
            <div className="p-6">
              {Object.entries(hotelData).map(([city, hotels]) => (
                <TabsContent key={city} value={city} className="mt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.sort((a, b) => a.price - b.price).map((hotel, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-colors"
                    >
                      <div className="h-48 relative">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-amber-500 font-bold flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> S/ {hotel.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg text-white">{hotel.name}</h4>
                          <div className="flex">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-amber-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                          <MapPin className="w-3 h-3" /> {hotel.location}
                        </p>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                          onClick={() => window.open(hotel.maps, '_blank')}
                        >
                          <Navigation className="w-4 h-4" /> Cómo llegar
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}