import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useFavorites } from "@/hooks/useFavorites";
import { usePrice } from "@/hooks/usePrice";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { formatPrice } = usePrice();
  const productId = parseInt(id);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/75"
            onClick={() => toggleFavorite(productId)}
          >
            <Heart
              className={cn("h-5 w-5", {
                "fill-red-500 stroke-red-500": isFavorite(productId),
              })}
            />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{formatPrice(price)}</p>
        </div>
        <Button
          className="w-full"
          onClick={() => addItem({ id, name, price, image }, 1)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}