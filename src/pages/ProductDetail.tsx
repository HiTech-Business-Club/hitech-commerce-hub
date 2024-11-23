import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/stores/cartStore";

// Mock data - à remplacer par une vraie API plus tard
const product = {
  id: "1",
  name: "Smartphone Pro Max",
  price: 999.99,
  description: "Un smartphone haut de gamme avec les dernières technologies.",
  specs: [
    "Écran 6.7 pouces OLED",
    "Processeur dernière génération",
    "256GB de stockage",
    "Batterie 5000mAh"
  ],
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80"
  ],
  stock: 10
};

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity
    );
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} ${product.name} ajouté(s) au panier`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg border overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">{product.price} €</p>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-2">
            <h3 className="font-semibold">Caractéristiques :</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md p-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <Button onClick={handleAddToCart} className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Ajouter au panier</span>
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Stock disponible : {product.stock} unités
          </p>
        </div>
      </div>
    </div>
  );
}
