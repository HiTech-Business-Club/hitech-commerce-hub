import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

const categories = [
  {
    id: "1",
    name: "Smartphones",
    slug: "smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  },
  {
    id: "2",
    name: "Laptops",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  },
  {
    id: "3",
    name: "Tablettes",
    slug: "tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
  },
  {
    id: "4",
    name: "Accessoires",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
];

export function CategoryList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.id} to={`/category/${category.slug}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}