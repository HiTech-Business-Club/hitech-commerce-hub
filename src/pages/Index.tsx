import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Navbar } from "@/components/Navbar";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { useState } from "react";

// Mock data - à remplacer par une vraie API plus tard
const products = [
  {
    id: "1",
    name: "Smartphone Pro Max",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  },
  {
    id: "2",
    name: "Laptop Ultra",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  },
  {
    id: "3",
    name: "Tablette Air",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
  },
  {
    id: "4",
    name: "Écouteurs Sans Fil",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
];

export default function Index() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handlePriceFilter = (range: string) => {
    let filtered = [...products];
    switch (range) {
      case "0-100":
        filtered = products.filter((p) => p.price <= 100);
        break;
      case "100-500":
        filtered = products.filter((p) => p.price > 100 && p.price <= 500);
        break;
      case "500+":
        filtered = products.filter((p) => p.price > 500);
        break;
      default:
        filtered = products;
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-heading">Nos Produits</h1>
          <Cart />
        </div>
        <SearchAndFilter onSearch={handleSearch} onPriceFilter={handlePriceFilter} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}