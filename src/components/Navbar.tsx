import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <AuthModal />
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
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
              <AuthModal />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}