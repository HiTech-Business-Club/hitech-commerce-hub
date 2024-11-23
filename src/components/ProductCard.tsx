import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold">{name}</h3>
          <p className="text-accent font-semibold mt-2">${price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline">
          <Link to={`/product/${id}`}>View Details</Link>
        </Button>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}