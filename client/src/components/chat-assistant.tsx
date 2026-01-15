import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Bot, User, X, Loader2, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const KNOWLEDGE_BASE = {
  "clima": "En Ica el sol brilla todo el año. La temperatura promedio es de 24°C. En verano (Ene-Mar) puede llegar a 32°C, perfecto para la playa. En invierno las noches son frescas. ¡Siempre trae bloqueador solar!",
  "huacachina": "La Huacachina es un oasis en medio del desierto, a solo 5km de la ciudad de Ica. Es famosa por sus dunas gigantes perfectas para el sandboarding y paseos en tubulares. Dato curioso: ¡Aparece en el billete de 50 soles!",
  "paracas": "La Reserva Nacional de Paracas protege ecosistemas marinos y costeros. Es ideal para ver lobos marinos, pingüinos de Humboldt y flamencos. También puedes visitar las Islas Ballestas en bote.",
  "nazca": "Las Líneas de Nazca son antiguos geoglifos en el desierto de Ica. Fueron creadas por la cultura Nazca y representan figuras como el colibrí, el mono y la araña. La mejor forma de verlas es en sobrevuelo.",
  "chincha": "Chincha es rica en cultura afroperuana. Es famosa por su música, danzas como el festejo, y su gastronomía, especialmente la carapulcra con sopa seca. Visita la Hacienda San José para conocer su historia.",
  "palpa": "Palpa alberga geoglifos aún más antiguos que los de Nazca. Sus figuras se encuentran en las laderas de los cerros y representan seres antropomorfos y deidades. ¡Se pueden ver desde miradores terrestres!",
  "moron": "La Laguna de Morón es un oasis escondido en Pisco, mucho más tranquilo que Huacachina. Sus aguas son limpias y está rodeada de dunas blancas y vegetación. Ideal para desconectar.",
  "canon": "El Cañón de los Perdidos es una joya geológica en Ocucaje. Tiene unos 5km de extensión y profundidades de hasta 200m. Es como un viaje a la prehistoria, donde se han encontrado fósiles de ballenas.",
  "marcona": "Marcona tiene playas hermosas y formaciones rocosas únicas como el Elefante y la Tortuga. Es un paraíso para los amantes de la fotografía de naturaleza.",
  "comida": "La gastronomía iqueña es deliciosa. No puedes dejar de probar la Carapulcra con Sopa Seca, las Tejas (dulces de pecana y manjarblanco), y por supuesto, el Pisco peruano.",
  "pisco": "El Pisco es el aguardiente de uva bandera del Perú. En Ica existen numerosas bodegas artesanales e industriales donde puedes hacer el recorrido del Pisco y degustar sus variedades.",
  "agendar": "Puedes usar el botón 'Agendar Destino' en la página principal para planificar tu viaje. Te mostraremos festivales y datos curiosos según la fecha que elijas.",
  "resenas": "En la sección de Reseñas puedes ver fotos reales de otros viajeros y compartir tu propia experiencia. ¡Necesitas registrarte para publicar!",
  "default": "Soy IcaBot, tu guía experto en Ica. Puedo hablarte del clima, destinos ocultos, comida, historia o ayudarte a planificar tu viaje. ¡Pregúntame lo que quieras!"
};

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! Soy IcaBot. ¿En qué puedo ayudarte hoy? Puedo darte el clima, recomendarte playas o contarte historias de Ica." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    // AI logic powered by knowledge base (simulating Gemini utility)
    setTimeout(() => {
      let response = "¡Hola! Como tu asistente experto en Ica, he consultado mis fuentes y puedo decirte que...";
      const lowerMsg = userMessage.toLowerCase();

      // Priority responses for utility
      if (lowerMsg.includes("hola") || lowerMsg.includes("buenos") || lowerMsg.includes("quien eres")) {
        response = "¡Hola! Soy IcaBot, tu guía inteligente. Estoy aquí para que tu viaje a Ica sea inolvidable. ¿Qué aventura buscamos hoy?";
      } else if (lowerMsg.includes("clima") || lowerMsg.includes("tiempo") || lowerMsg.includes("calor")) {
        response = "Ica es la ciudad del sol eterno. Hoy tenemos un cielo despejado con 26°C. ¡No olvides el protector solar y mucha agua!";
      } else if (lowerMsg.includes("donde comer") || lowerMsg.includes("hambre") || lowerMsg.includes("restaurante")) {
        response = "En Ica comer es un placer. Te recomiendo ir a 'El Catador' para una buena carapulcra, o si buscas ceviche, 'El Piloto' en Paracas es legendario. ¿Te gustaría ver cómo llegar?";
      } else if (lowerMsg.includes("precio") || lowerMsg.includes("cuanto cuesta") || lowerMsg.includes("barato")) {
        response = "Hay opciones para todos los bolsillos. Los tours a las Islas Ballestas suelen estar entre S/ 40 y S/ 60. Si vas a Huacachina, los tubulares están S/ 50 promedio. ¿Deseas agendar con una agencia de confianza?";
      } else {
        // Fallback to existing knowledge base
        const match = Object.entries(KNOWLEDGE_BASE).find(([key]) => lowerMsg.includes(key));
        response = match ? match[1] : "Esa es una excelente pregunta. Ica tiene tantos secretos que siempre estoy aprendiendo. Lo que sí te puedo asegurar es que te encantará. ¿Te gustaría que te ayude a agendar tu visita?";
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white hover:bg-amber-600 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        onClick={() => setIsOpen(true)}
      >
        <Bot className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px]"
          >
            <Card className="w-full h-full flex flex-col overflow-hidden border-amber-500/30 shadow-2xl bg-background/95 backdrop-blur-xl">
              <div className="p-4 bg-amber-500 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <div>
                    <span className="font-bold block leading-none">IcaBot</span>
                    <span className="text-xs opacity-90">En línea • Clima: 26°C ☀️</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-amber-600 text-white h-8 w-8">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                          msg.role === "user"
                            ? "bg-amber-500 text-white rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-2 rounded-bl-none">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border bg-background/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Pregunta sobre Ica..."
                    className="bg-background/50 focus-visible:ring-amber-500"
                  />
                  <Button type="submit" size="icon" className="bg-amber-500 hover:bg-amber-600 text-white shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}