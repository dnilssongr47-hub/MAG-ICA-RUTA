import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Utensils, Info, X, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const restaurants = [
  {
    name: "El Piloto",
    type: "Cevichería / Pescados",
    location: "Paracas",
    description: "Un clásico legendario en la entrada de Paracas. Famoso por su Tacu-Tacu con mariscos y su ceviche fresco del día.",
    specialty: "Tacu-Tacu con Salsa de Mariscos",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?q=80&w=1000&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/Restaurante+El+Piloto+Paracas",
    wazeUrl: "https://www.waze.com/ul?q=Restaurante+El+Piloto+Paracas"
  },
  {
    name: "El Catador",
    type: "Comida Criolla",
    location: "Ica",
    description: "Ubicado en una bodega tradicional de Pisco. La Carapulcra con Sopa Seca es la especialidad que atrae a todos.",
    specialty: "Carapulcra con Sopa Seca Iqueña",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/El+Catador+Ica",
    wazeUrl: "https://www.waze.com/ul?q=El+Catador+Ica"
  },
  {
    name: "La Olla de Juanita",
    type: "Comida Criolla / Tradicional",
    location: "Ica (Tres Esquinas)",
    description: "Reconocido por su sazón casera y auténtica. Un huarique que se convirtió en destino obligatorio para probar el verdadero sabor iqueño.",
    specialty: "Seco de Cordero",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/La+Olla+de+Juanita+Ica",
    wazeUrl: "https://www.waze.com/ul?q=La+Olla+de+Juanita+Ica"
  },
  {
    name: "Restaurante Morón",
    type: "Cevichería",
    location: "Pisco",
    description: "Lo mejor del mar de Pisco. El Jaleo de Mariscos es generoso y perfecto para compartir después de visitar la laguna.",
    specialty: "Ceviche Mixto Poderoso",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/Restaurante+Moron+Pisco",
    wazeUrl: "https://www.waze.com/ul?q=Restaurante+Moron+Pisco"
  }
];

export function SaborIqueno() {
  const [selectedRest, setSelectedRest] = useState<typeof restaurants[0] | null>(null);

  return (
    <section id="sabor-iqueno" className="py-24 container px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-amber-500">Sabor Iqueño</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          De la mar a la tierra. Disfruta de la mejor gastronomía de la región, desde ceviches frescos hasta la tradicional carapulcra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {restaurants.map((rest, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => setSelectedRest(rest)}
          >
            <div className="relative h-64 rounded-3xl overflow-hidden mb-4 border border-white/10">
              <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full font-bold">★ {rest.rating}</span>
                <h3 className="text-xl font-bold text-white mt-1">{rest.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedRest} onOpenChange={(open) => !open && setSelectedRest(null)}>
        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
          {selectedRest && (
            <ScrollArea className="max-h-[85vh]">
              <div className="relative h-64">
                <img src={selectedRest.image} alt={selectedRest.name} className="w-full h-full object-cover" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 text-white bg-black/20 rounded-full"
                  onClick={() => setSelectedRest(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-amber-500">{selectedRest.name}</h3>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Utensils className="w-4 h-4" /> {selectedRest.type} • {selectedRest.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">★ {selectedRest.rating}</div>
                    <p className="text-xs text-muted-foreground">Reseñas de Google</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-2">Sobre el restaurante</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedRest.description}</p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                    <h4 className="font-bold text-amber-500 mb-1 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" /> Especialidad de la Casa
                    </h4>
                    <p className="text-lg font-display italic">{selectedRest.specialty}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6"
                      onClick={() => window.open(selectedRest.mapsUrl, '_blank')}
                    >
                      <Navigation className="w-4 h-4 mr-2" /> Google Maps
                    </Button>
                    <Button 
                      className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl py-6"
                      onClick={() => window.open(selectedRest.wazeUrl, '_blank')}
                    >
                      <Navigation className="w-4 h-4 mr-2" /> Ir con Waze
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}