import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Calendar as CalendarIcon, Info, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "@/context/auth-context";
import { AuthModal } from "@/components/auth-modal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENTS = [
  { month: 2, title: "Festival de la Vendimia", description: "Marzo es el mes de la uva y el pisco. Disfruta de la pisa de uvas y conciertos." },
  { month: 9, title: "Señor de Luren", description: "En Octubre se celebra la procesión más grande de Ica. Fe y tradición." },
  { month: 1, title: "Verano Negro", description: "Febrero en Chincha es pura fiesta afroperuana. Música, danza y gastronomía." },
  { month: 8, title: "Semana Turística", description: "Septiembre es ideal para visitar Ica, con clima perfecto y actividades culturales." }
];

const DESTINATIONS = [
  "Huacachina",
  "Paracas / Islas Ballestas",
  "Líneas de Nazca",
  "Chincha / Hacienda San José",
  "Cañón de los Perdidos",
  "Laguna de Morón",
  "Playas de Marcona",
  "Ruta del Pisco"
];

const AGENCIES = [
  { name: "Ica Tours Express", price: 85, rating: 4.8, perks: ["Guía bilingüe", "Recojo en hotel"] },
  { name: "Dunas & Sol Travel", price: 70, rating: 4.5, perks: ["Snacks incluidos", "Seguro de viaje"] },
  { name: "Aventura Paracas", price: 95, rating: 4.9, perks: ["Fotos Pro", "Equipos nuevos"] }
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [destination, setDestination] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const getEventForDate = (selectedDate: Date) => {
    const month = selectedDate.getMonth() + 1; // 0-indexed
    return EVENTS.find(e => e.month === month);
  };

  const selectedEvent = date ? getEventForDate(date) : null;

  const handleConfirm = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    const agency = AGENCIES.find(a => a.name === selectedAgency);
    alert(`¡Reserva confirmada con ${selectedAgency} para ${destination}!\nFecha: ${date ? format(date, 'dd/MM/yyyy') : ''}\nPrecio: S/ ${agency?.price}\nTe contactaremos por WhatsApp.`);
    onClose();
  };

  if (showAuth) {
    return <AuthModal isOpen={true} onClose={() => setShowAuth(false)} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <CalendarIcon className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-display font-bold">Agendar Tu Aventura</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Compara precios y agencias en tiempo real.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Destino</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="¿A dónde vamos?" />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((dest) => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha</label>
              <div className="relative">
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-xs">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar</span>}
                </Button>
              </div>
            </div>
          </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Selecciona la Agencia</label>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Seleccionar agencia..." />
                </SelectTrigger>
                <SelectContent>
                  {AGENCIES.map((agency) => (
                    <SelectItem key={agency.name} value={agency.name}>{agency.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-2">
              {AGENCIES.map((agency) => (
                <div 
                  key={agency.name}
                  onClick={() => setSelectedAgency(agency.name)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedAgency === agency.name 
                      ? 'bg-amber-500/10 border-amber-500' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{agency.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {agency.perks.map(p => (
                          <span key={p} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-500">S/ {agency.price}</div>
                      <div className="text-[10px] text-muted-foreground">Rating: ★ {agency.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-center scale-90">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
              locale={es}
            />
          </div>

          {date && selectedEvent && (
             <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
               <Info className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-amber-500 text-sm">Evento del Mes</h4>
                 <p className="text-xs text-muted-foreground">{selectedEvent.description}</p>
               </div>
             </div>
          )}

          <Button 
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl mt-2 text-lg shadow-lg shadow-amber-500/20" 
            onClick={handleConfirm}
            disabled={!date || !destination || !selectedAgency}
          >
            {isAuthenticated ? "Reservar con " + (selectedAgency || "Agencia") : "Ingresar para Reservar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}