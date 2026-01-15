import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, ThumbsDown, MessageCircle, Image as ImageIcon, Send, User as UserIcon, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
}

interface Review {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  location: string;
  image?: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  date: Date;
}

// Mock initial data
const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    author: "María González",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    content: "¡Increíble experiencia en las dunas de Huacachina! El atardecer es simplemente mágico. Recomiendo ir a partir de las 4pm para ver la puesta de sol.",
    image: "https://images.unsplash.com/photo-1589556264800-08ae9e129086?q=80&w=1000&auto=format&fit=crop",
    location: "Oasis de Huacachina",
    likes: 45,
    dislikes: 2,
    comments: [
      { id: 1, author: "Carlos Ruiz", content: "¿Qué tour contrataste?", date: new Date(Date.now() - 10000000) }
    ],
    date: new Date(Date.now() - 86400000)
  },
  {
    id: 2,
    author: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    content: "Las Islas Ballestas son hermosas, vimos muchos lobos marinos. El paseo en bote vale totalmente la pena.",
    location: "Paracas",
    likes: 32,
    dislikes: 0,
    comments: [],
    date: new Date(Date.now() - 172800000)
  }
];

export function ReviewsSection() {
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newReview = {
      id: Date.now(),
      author: user.name,
      avatar: user.avatar,
      content: newReviewContent,
      location: newReviewLocation,
      image: selectedImage || undefined,
      likes: 0,
      dislikes: 0,
      comments: [],
      date: new Date()
    };

    setReviews([newReview, ...reviews]);
    setNewReviewContent("");
    setNewReviewLocation("");
    setSelectedImage(null);
  };

  const handleLike = (id: number) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, likes: review.likes + 1 } : review
    ));
  };

  const handleDislike = (id: number) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, dislikes: review.dislikes + 1 } : review
    ));
  };

  const handleComment = (reviewId: number) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!commentText.trim() || !user) return;

    const newComment = {
      id: Date.now(),
      author: user.name,
      content: commentText,
      date: new Date()
    };

    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, comments: [...review.comments, newComment] }
        : review
    ));
    setCommentText("");
    setActiveCommentBox(null);
  };

  return (
    <section id="resenas" className="py-24 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Reseñas de Viajeros
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comparte tus experiencias, fotos y consejos con la comunidad de viajeros.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Create Post Section */}
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            {!isAuthenticated ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">¿Visitaste Ica recientemente?</h3>
                <p className="text-muted-foreground mb-4">Inicia sesión para compartir tu experiencia y fotos.</p>
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                >
                  Iniciar Sesión / Registrarse
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Input 
                      placeholder="¿Dónde estuviste? (ej. Huacachina, Paracas)"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="bg-white/5 border-white/10"
                      required
                    />
                    <Textarea 
                      placeholder="Cuéntanos tu experiencia..."
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      className="bg-white/5 border-white/10 min-h-[100px]"
                      required
                    />
                    
                    {selectedImage && (
                      <div className="relative rounded-xl overflow-hidden h-48 w-full">
                        <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                        <Button 
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setSelectedImage(null)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-amber-500"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Agregar Foto
                        </Button>
                      </div>
                      <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">
                        Publicar Reseña
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Card>

          {/* Feed */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/20 border-white/10 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-foreground">{review.author}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{review.location}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(review.date, { addSuffix: true, locale: es })}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      {review.content}
                    </p>

                    {review.image && (
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img src={review.image} alt="Review attachment" className="w-full h-auto max-h-[400px] object-cover" />
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                      <button 
                        onClick={() => handleLike(review.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${review.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{review.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleDislike(review.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
                      >
                        <ThumbsDown className={`w-5 h-5 ${review.dislikes > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
                        <span>{review.dislikes}</span>
                      </button>
                      <button 
                        onClick={() => setActiveCommentBox(activeCommentBox === review.id ? null : review.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-500 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{review.comments.length} Comentarios</span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {activeCommentBox === review.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pt-4 mt-4 border-t border-white/5"
                        >
                          <div className="space-y-4 mb-4">
                            {review.comments.map(comment => (
                              <div key={comment.id} className="bg-white/5 rounded-lg p-3 text-sm">
                                <span className="font-bold text-amber-500 block mb-1">{comment.author}</span>
                                <p className="text-white/80">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                          
                          {isAuthenticated ? (
                            <div className="flex gap-2">
                              <Input 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="bg-white/5 border-white/10 h-10"
                              />
                              <Button 
                                size="icon" 
                                onClick={() => handleComment(review.id)}
                                className="bg-amber-500 hover:bg-amber-600 shrink-0"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-xs text-center text-muted-foreground">
                              <button onClick={() => setIsAuthModalOpen(true)} className="text-amber-500 hover:underline">Inicia sesión</button> para comentar
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}