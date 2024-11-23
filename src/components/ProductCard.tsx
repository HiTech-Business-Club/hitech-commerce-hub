import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    try {
      addItem({
        id,
        name,
        price,
        image,
        quantity: 1,
      });
      toast("Produit ajouté au panier", {
        description: `${name} a été ajouté à votre panier`,
      });
    } catch (error) {
      toast("Erreur", {
        description: "Impossible d'ajouter le produit au panier",
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <CardContent className="p-0">
        <div className="relative group">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold line-clamp-2 mb-2">{name}</h3>
          <p className="text-accent font-semibold">{price.toFixed(2)} €</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/product/${id}`}>Détails</Link>
        </Button>
        <Button onClick={handleAddToCart} className="flex-1">
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}