import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModal } from "./AuthModal";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "./ui/use-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt!",
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-heading font-bold">
            HiTech Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="hover:text-accent transition-colors">
              Produits
            </Link>
            <Link to="/categories" className="hover:text-accent transition-colors">
              Catégories
            </Link>
            <Link to="/about" className="hover:text-accent transition-colors">
              À propos
            </Link>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {session ? (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={session.user.user_metadata.avatar_url} />
                  <AvatarFallback>
                    {session.user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <AuthModal />
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Produits
              </Link>
              <Link
                to="/categories"
                className="hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catégories
              </Link>
              <Link
                to="/about"
                className="hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {session ? (
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={session.user.user_metadata.avatar_url} />
                    <AvatarFallback>
                      {session.user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" onClick={handleLogout}>
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                <AuthModal />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}