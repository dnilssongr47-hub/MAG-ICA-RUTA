import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Newspaper, Church, ExternalLink, Info, X, Umbrella, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdvertisingModal } from "@/components/advertising-modal";

import huacachinaImg from "@assets/stock_images/huacachina_oasis_des_5b3bff04.jpg";
import piscoImg from "@assets/stock_images/playa_la_mina_paraca_d3564334.jpg";
import minaImg from "@assets/stock_images/playa_la_mina_paraca_d3564334.jpg";
import yumaqueImg from "@assets/stock_images/yumaque_beach_paraca_902357f9.jpg";
import rojaImg from "@assets/stock_images/playa_roja_paracas_df1aed75.jpg";
import nazcaImg from "@assets/stock_images/nazca_lines_aerial_v_69086813.jpg";
import chinchaImg from "@assets/stock_images/playa_totoritas_chin_e28f9c5e.jpg";
import palpaImg from "@assets/stock_images/palpa_lines_geoglyph_5b7a6c2e.jpg";
import moronImg from "@assets/stock_images/laguna_de_moron_pisc_fd219547.jpg";
import canonImg from "@assets/stock_images/canon_de_los_perdido_e79032a6.jpg";
import marconaImg from "@assets/stock_images/marcona_peru_rock_el_2ff1b832.jpg";
import lurenImg from "@assets/generated_images/procesion_del_señor_de_luren.png";
import cantallocImg from "@assets/stock_images/acueductos_de_cantal_9f515ff8.jpg";

const destinations = [
  {
    id: "moron",
    title: "Laguna de Morón",
    description: "Un oasis virgen en Pisco, rodeado de dunas blancas y vegetación. Menos concurrido que Huacachina, ideal para conectar con la naturaleza.",
    fullDescription: "La Laguna de Morón es un oasis escondido ubicado en el distrito de Humay, provincia de Pisco. A diferencia de Huacachina, conserva un estado más salvaje y natural. Sus aguas son alimentadas por corrientes subterráneas y está rodeada de totorales y dunas de arena blanca.",
    curiousFact: "Su forma se asemeja al contorno del mapa del Perú vista desde el aire.",
    image: moronImg,
    tag: "Naturaleza",
    location: "Pisco",
    mapsUrl: "https://www.google.com/maps/search/Laguna+de+Moron+Pisco"
  },
  {
    id: "canon",
    title: "Cañón de los Perdidos",
    description: "Impresionante formación geológica en el desierto de Ocucaje. Un viaje al pasado geológico de la región con paisajes de otro mundo.",
    fullDescription: "Ubicado en el sector de Montegrande, distrito de Santiago, Ica. Tiene una extensión de 5 km y una profundidad de entre 200 a 300 metros. Es un escenario geológico fascinante donde el río Seco ha erosionado el suelo durante millones de años.",
    curiousFact: "En esta zona se han encontrado numerosos fósiles marinos, incluyendo ballenas y tiburones gigantes (Megalodón), ya que todo esto fue fondo marino hace millones de años.",
    image: canonImg,
    tag: "Aventura",
    location: "Ica",
    mapsUrl: "https://www.google.com/maps/search/Cañon+de+los+Perdidos+Ica"
  },
  {
    id: "marcona",
    title: "Playas de Marcona",
    description: "Conocida por sus formaciones rocosas como el Elefante y playas hermosas como Playa Hermosa y Acapulco.",
    fullDescription: "Marcona es la ciudad del viento y el hierro, pero también posee un litoral espectacular. Destacan figuras pétreas esculpidas por la erosión como la Trompa de Elefante y la Tortuga. Además, cuenta con la Reserva de Punta San Juan, hogar de la mayor colonia de pingüinos de Humboldt.",
    curiousFact: "La Reserva de Punta San Juan en Marcona alberga la mayor concentración de pingüinos de Humboldt en todo el Perú.",
    image: marconaImg,
    tag: "Playas",
    location: "Nazca",
    mapsUrl: "https://www.google.com/maps/search/Playas+de+Marcona"
  },
  {
    id: "cantalloc",
    title: "Acueductos de Cantalloc",
    description: "Ingeniería hidráulica ancestral de la cultura Nazca que sigue funcionando hoy en día. Un testimonio de sabiduría antigua.",
    fullDescription: "Ubicados a 4 km de la ciudad de Nazca, son una red de acueductos subterráneos y canales a cielo abierto construidos por la cultura Nazca (200-700 d.C.). Se caracterizan por sus respiraderos en forma de espiral ('ojos') que permitían el mantenimiento.",
    curiousFact: "Aún hoy, después de 1500 años, los agricultores locales siguen utilizando el agua de estos acueductos para regar sus cultivos.",
    image: cantallocImg,
    tag: "Arqueología",
    location: "Nazca",
    mapsUrl: "https://www.google.com/maps/search/Acueductos+de+Cantalloc"
  },
  {
    id: "pisco",
    title: "Playas de Pisco",
    description: "Desde La Mina hasta El Raspón. Aguas turquesas y arena tranquila dentro de la Reserva Nacional.",
    fullDescription: "El litoral de Pisco, especialmente dentro de la Reserva Nacional de Paracas, ofrece algunas de las playas más bellas del Perú. Aguas cristalinas, fauna marina abundante y paisajes desérticos que contrastan con el azul del mar.",
    curiousFact: "Paracas significa 'lluvia de arena' en quechua, haciendo referencia a los fuertes vientos que azotan la zona por las tardes.",
    image: piscoImg,
    tag: "Playas",
    location: "Pisco",
    mapsUrl: "https://www.google.com/maps/search/Playas+de+Pisco",
    subDestinations: [
       {
         name: "Playa La Mina",
         desc: "Aguas turquesas y tranquilas, ideal para nadar.",
         image: minaImg,
         rating: 4.9,
         reviews: 120,
         mapsUrl: "https://www.google.com/maps/search/Playa+La+Mina"
       },
       {
         name: "Playa Yumaque",
         desc: "Extensa playa ideal para acampar y ver atardeceres.",
         image: yumaqueImg,
         rating: 4.7,
         reviews: 85,
         mapsUrl: "https://www.google.com/maps/search/Playa+Yumaque"
       },
       {
         name: "Playa Roja",
         desc: "Única por el color de su arena. Espectacular para fotos.",
         image: rojaImg,
         rating: 4.8,
         reviews: 200,
         mapsUrl: "https://www.google.com/maps/search/Playa+Roja+Paracas"
       }
    ]
  },
  {
    id: "chincha",
    title: "Playas de Chincha",
    description: "Wakama y Jahuay ofrecen refugios ecológicos y olas perfectas para el verano, lejos del bullicio.",
    fullDescription: "Chincha no es solo cultura afroperuana. Sus playas como Wakama ofrecen un concepto de ecoturismo con cabañas frente al mar. Es un destino perfecto para desconectar y disfrutar de atardeceres tranquilos. Playa Totoritas es la favorita de los locales.",
    curiousFact: "En Chincha se encuentra la Hacienda San José, que cuenta con catacumbas subterráneas que servían para evadir impuestos por esclavos en la época colonial.",
    image: chinchaImg,
    tag: "Playas",
    location: "Chincha",
    mapsUrl: "https://www.google.com/maps/search/Playas+de+Chincha"
  },
  {
    id: "hacienda",
    title: "Hacienda San José",
    description: "Un viaje al pasado colonial de Chincha. Arquitectura majestuosa y catacumbas llenas de historia.",
    fullDescription: "La Casa Hacienda San José es una de las edificaciones coloniales más hermosas de la costa peruana. Construida en el siglo XVII, destaca por su capilla barroca y su red de túneles subterráneos.",
    curiousFact: "Los túneles conectaban la hacienda con el puerto de Chincha para el ingreso clandestino de esclavos.",
    image: "https://images.unsplash.com/photo-1590059530472-a4f66a01f786?q=80&w=1000&auto=format&fit=crop",
    tag: "Cultura",
    location: "Chincha",
    mapsUrl: "https://www.google.com/maps/search/Casa+Hacienda+San+Jose+Chincha"
  },
  {
    id: "pampa-galeras",
    title: "Pampa Galeras",
    description: "Reserva Nacional donde habita la vicuña. Paisajes andinos en la parte alta de la región.",
    fullDescription: "Ubicada en la provincia de Lucanas pero accesible desde Nazca, es el principal centro de recuperación de la vicuña en el Perú. Aquí se realiza el tradicional Chaccu.",
    curiousFact: "La vicuña posee la fibra animal más fina del mundo.",
    image: "https://images.unsplash.com/photo-1603566233074-68831966289d?q=80&w=1000&auto=format&fit=crop",
    tag: "Naturaleza",
    location: "Nazca",
    mapsUrl: "https://www.google.com/maps/search/Reserva+Nacional+Pampa+Galeras"
  }
];

const news = [
  {
    title: "Procesión del Señor de Luren",
    date: "Octubre",
    category: "Religión",
    excerpt: "La festividad religiosa más importante de Ica. Miles de fieles acompañan al patrón de la ciudad en un recorrido de más de 16 horas.",
    image: lurenImg
  },
  {
    title: "Fiesta de la Virgen del Rosario de Yauca",
    date: "Octubre",
    category: "Tradición",
    excerpt: "Peregrinación multitudinaria hacia el desierto de Yauca. Fieles caminan kilómetros para cumplir promesas y agradecer favores.",
    image: null
  },
  {
    title: "Festival Internacional de la Vendimia",
    date: "Marzo",
    category: "Eventos",
    excerpt: "La fiesta de la uva celebra la cosecha con reinados, conciertos y la tradicional pisa de uvas en las bodegas.",
    image: null
  },
  {
    title: "Semana Turística de Nazca",
    date: "Mayo",
    category: "Turismo",
    excerpt: "Celebración del nacimiento de Maria Reiche con actividades culturales, ferias gastronómicas y sobrevuelos.",
    image: null
  }
];

export function TourismContent() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);

  return (
    <div className="space-y-32 py-24">
      {/* Destinations Section */}
      <section id="destinos" className="container px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Joyas Ocultas y Destinos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Más allá de lo conocido. Descubre lagunas, cañones y playas que te dejarán sin aliento.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl h-[450px] cursor-pointer border border-white/10"
              onClick={() => setSelectedDest(dest)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
              <img 
                src={dest.image} 
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/40 to-transparent">
                <div className="flex justify-between items-center mb-2">
                   <span className="inline-block px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold backdrop-blur-sm">
                    {dest.tag}
                  </span>
                  <span className="flex items-center text-xs font-medium text-white/90 bg-black/50 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3 mr-1" /> {dest.location}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{dest.title}</h3>
                <p className="text-white/80 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300 mb-4">
                  {dest.description}
                </p>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Button variant="outline" size="sm" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Destination Details Modal */}
        <Dialog open={!!selectedDest} onOpenChange={(open) => !open && setSelectedDest(null)}>
          <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-white/10 overflow-hidden p-0 max-h-[90vh]">
            {selectedDest && (
              <ScrollArea className="h-full max-h-[90vh]">
                <div className="relative h-64 w-full">
                   <img src={selectedDest.image} alt={selectedDest.title} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/20" />
                   <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-white hover:bg-black/20 rounded-full z-50"
                      onClick={() => setSelectedDest(null)}
                   >
                     <X className="w-5 h-5" />
                   </Button>
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/80 to-transparent">
                      <h3 className="text-3xl font-display font-bold text-white">{selectedDest.title}</h3>
                      <span className="inline-flex items-center text-white/90 text-sm font-bold mt-1">
                        <MapPin className="w-4 h-4 mr-1" /> {selectedDest.location}
                      </span>
                   </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-amber-500">Sobre este destino</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedDest.fullDescription}</p>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                     <Info className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                     <div>
                       <h4 className="font-bold text-blue-500 text-sm">¿Sabías qué?</h4>
                       <p className="text-sm text-muted-foreground">{selectedDest.curiousFact}</p>
                     </div>
                  </div>

                  {/* Sub Destinations for Pisco */}
                  {selectedDest.subDestinations && (
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-amber-500 flex items-center gap-2">
                        <Umbrella className="w-5 h-5" /> Playas Recomendadas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDest.subDestinations.map((sub, idx) => (
                          <div key={idx} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-colors">
                            <div className="h-32 w-full">
                              <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3">
                              <div className="flex justify-between items-start">
                                <h5 className="font-bold">{sub.name}</h5>
                                <span className="text-xs bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded-md font-medium">★ {sub.rating}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub.desc}</p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-amber-500 p-0 h-auto mt-2 text-xs"
                                onClick={() => window.open(sub.mapsUrl, '_blank')}
                              >
                                Ver en Mapa <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20"
                    onClick={() => window.open(selectedDest.mapsUrl, '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Cómo Llegar con Google Maps
                  </Button>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
        
        <div className="mt-12 text-center">
           <p className="text-muted-foreground mb-4">Explora todos los rincones de Ica en Google Maps</p>
           <div className="flex flex-wrap justify-center gap-4">
              {["Ica", "Pisco", "Nazca", "Chincha", "Palpa"].map((province) => (
                <Button 
                  key={province}
                  variant="secondary" 
                  className="rounded-full hover:bg-amber-500 hover:text-white transition-colors"
                  onClick={() => window.open(`https://www.google.com/maps/search/turismo+en+${province}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Turismo en {province}
                </Button>
              ))}
           </div>
        </div>
      </section>

      {/* News Section */}
      <section id="noticias" className="bg-white/5 border-y border-white/10 py-24 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="container px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 flex items-center gap-3 text-foreground">
                <Church className="w-8 h-8 text-amber-500" />
                Tradiciones & Noticias
              </h2>
              <p className="text-muted-foreground text-lg">
                Fe, cultura y actualidad de nuestra región.
              </p>
            </div>
            <Button 
              onClick={() => setIsAdsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center gap-2 px-6"
            >
              <Megaphone className="w-4 h-4" />
              PUBLICITA CON NOSOTROS
            </Button>
          </div>

          <AdvertisingModal isOpen={isAdsModalOpen} onClose={() => setIsAdsModalOpen(false)} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-black/20 border-white/10 hover:border-amber-500/30 transition-all hover:bg-black/40 p-0 group flex flex-col overflow-hidden">
                  {item.image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-amber-500 mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-muted-foreground">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-4">
                      {item.excerpt}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}