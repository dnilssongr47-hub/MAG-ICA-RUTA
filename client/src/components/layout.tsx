import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, Zap, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden font-sans">
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-orange-400 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_0%,_transparent_70%)] opacity-50" />
                </motion.div>
                <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-white/30 rounded-full"
                />
              </div>
              <span>MAG-ICA RUTA</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('destinos')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Destinos</button>
            <button onClick={() => scrollToSection('noticias')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Noticias</button>
            <button onClick={() => scrollToSection('sabor-iqueno')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Sabor Iqueño</button>
            <button onClick={() => scrollToSection('resenas')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Reseñas</button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="w-8 h-8 border border-white/20 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border-white/10">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400 focus:text-red-400">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Ingresar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <button onClick={() => scrollToSection('destinos')} className="text-lg font-medium text-left">Destinos</button>
            <button onClick={() => scrollToSection('noticias')} className="text-lg font-medium text-left">Noticias</button>
            <button onClick={() => scrollToSection('sabor-iqueno')} className="text-lg font-medium text-left">Sabor Iqueño</button>
            <button onClick={() => scrollToSection('resenas')} className="text-lg font-medium text-left">Reseñas</button>
            {user ? (
              <Button onClick={logout} variant="destructive" className="w-full rounded-full">Cerrar Sesión</Button>
            ) : (
              <Button onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }} className="w-full rounded-full">Ingresar</Button>
            )}
          </motion.div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <main className="flex-1 pt-16">
        {children}
      </main>

      <a 
        href="https://wa.me/51907914415" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
      >
        <Phone className="w-7 h-7 fill-current" />
      </a>

      <footer className="border-t border-white/10 py-12 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
             <div className="col-span-2">
                <div className="flex items-center gap-2 font-display font-bold text-2xl tracking-tighter mb-4">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-orange-400 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_0%,_transparent_70%)] opacity-50" />
                    </motion.div>
                    <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                  <span>MAG-ICA RUTA</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Tu guía definitiva para explorar los tesoros ocultos de Ica. Desde dunas infinitas hasta playas vírgenes, te acompañamos en cada paso de tu aventura.
                </p>
             </div>
             <div>
                <h4 className="font-bold mb-4">Más sobre nosotros</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                   <li><a href="#" className="hover:text-amber-500">Quiénes somos</a></li>
                   <li><a href="#" className="hover:text-amber-500">Misión y Visión</a></li>
                   <li><a href="#" className="hover:text-amber-500">Trabaja con nosotros</a></li>
                   <li><a href="#" className="hover:text-amber-500">Contacto</a></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                   <li><a href="#" className="hover:text-amber-500">Términos y condiciones</a></li>
                   <li><a href="#" className="hover:text-amber-500">Política de privacidad</a></li>
                   <li><a href="#" className="hover:text-amber-500">Libro de reclamaciones</a></li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
            <div className="text-sm text-muted-foreground">
              © 2024 MAG-ICA RUTA. Todos los derechos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}