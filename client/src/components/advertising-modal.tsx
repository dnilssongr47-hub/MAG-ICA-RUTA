import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode, Smartphone, Building2, User, Phone, Receipt, CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AdvertisingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvertisingModal({ isOpen, onClose }: AdvertisingModalProps) {
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const [formData, setFormData] = useState({
    brandName: "",
    ownerName: "",
    ruc: "",
    phone: "",
    type: "restaurante"
  });

  const pricePerDay = 50;
  const totalDays = dates?.length || 0;
  const totalPrice = totalDays * pricePerDay;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePayment = () => {
    alert("¡Pago procesado con éxito! Tu publicidad ha sido agendada.");
    onClose();
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-center text-amber-500">
            Publicita con Nosotros
          </DialogTitle>
          <DialogDescription className="text-center">
            Impulsa tu negocio en la guía más visitada de Ica.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center">
              <p className="text-sm font-medium">Tarifa Especial</p>
              <p className="text-3xl font-bold text-amber-500">S/ 50 <span className="text-sm font-normal text-muted-foreground">/ día</span></p>
              <p className="text-xs text-muted-foreground mt-1">S/ 250 por cada 5 días de exposición</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre de la Marca / Restaurante</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Ej. El Catador Ica" 
                    className="pl-9 bg-white/5" 
                    value={formData.brandName}
                    onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Negocio</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                    <SelectTrigger className="bg-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurante">Restaurante</SelectItem>
                      <SelectItem value="huarique">Huarique</SelectItem>
                      <SelectItem value="dulceria">Dulcería</SelectItem>
                      <SelectItem value="marca">Marca Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>RUC (Opcional)</Label>
                  <div className="relative">
                    <Receipt className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="10XXXXXXXXX" 
                      className="pl-9 bg-white/5"
                      value={formData.ruc}
                      onChange={(e) => setFormData({...formData, ruc: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Datos del Propietario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Nombre Completo" 
                    className="pl-9 bg-white/5"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Número de Celular</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="999 999 999" 
                    className="pl-9 bg-white/5"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" onClick={handleNext}>
              Siguiente: Seleccionar Fechas
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2 text-center">
              <Label className="text-lg">Selecciona los días de tu publicidad</Label>
              <p className="text-xs text-muted-foreground">Puedes escoger días específicos o consecutivos.</p>
              <div className="flex justify-center bg-white/5 rounded-xl p-2 mt-4 border border-white/10">
                <Calendar
                  mode="multiple"
                  selected={dates}
                  onSelect={setDates}
                  className="rounded-md"
                  locale={es}
                />
              </div>
            </div>

            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
              <div className="flex justify-between items-center mb-2">
                <span>Días seleccionados:</span>
                <span className="font-bold">{totalDays}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-amber-500">
                <span>Total a pagar:</span>
                <span>S/ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Atrás</Button>
              <Button 
                className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white" 
                onClick={handleNext}
                disabled={totalDays === 0}
              >
                Siguiente: Método de Pago
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 py-4">
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid grid-cols-3 bg-white/5 p-1">
                <TabsTrigger value="card"><CreditCard className="w-4 h-4 mr-2" /> Tarjeta</TabsTrigger>
                <TabsTrigger value="qr"><QrCode className="w-4 h-4 mr-2" /> Yape/Plin</TabsTrigger>
                <TabsTrigger value="bank"><Smartphone className="w-4 h-4 mr-2" /> Banca</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Número de Tarjeta</Label>
                  <Input placeholder="0000 0000 0000 0000" className="bg-white/5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha Venc.</Label>
                    <Input placeholder="MM/YY" className="bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" className="bg-white/5" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="qr" className="py-8 flex flex-col items-center space-y-4">
                <div className="w-48 h-48 bg-white p-2 rounded-xl">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MAGICA-RUTA-PAY" alt="QR Payment" />
                </div>
                <p className="text-sm text-center text-muted-foreground">Escanea para pagar con Yape o Plin</p>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start h-12 border-white/10 hover:bg-blue-500/10">
                    <div className="w-8 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center text-[10px] font-bold">BCP</div>
                    Banca Móvil BCP
                  </Button>
                  <Button variant="outline" className="justify-start h-12 border-white/10 hover:bg-green-500/10">
                    <div className="w-8 h-8 bg-green-600 rounded mr-3 flex items-center justify-center text-[10px] font-bold">INT</div>
                    Interbank App
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-sm space-y-1">
                <p className="flex justify-between"><span>Subtotal:</span> <span>S/ {totalPrice.toFixed(2)}</span></p>
                <p className="flex justify-between text-amber-500 font-bold text-lg pt-2 border-t border-white/5">
                  <span>Total Final:</span> <span>S/ {totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Atrás</Button>
              <Button className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white font-bold" onClick={handlePayment}>
                PAGAR PUBLICIDAD
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}