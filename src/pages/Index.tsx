import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Navbar } from "@/components/Navbar";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { CategoryList } from "@/components/CategoryList";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        toast("Erreur", {
          description: "Impossible de charger les produits",
        });
        throw error;
      }
      return data;
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePriceFilter = (range: string) => {
    setPriceRange(range);
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;

    if (priceRange) {
      const price = product.price || 0;
      switch (priceRange) {
        case "0-100":
          matchesPrice = price <= 100;
          break;
        case "100-500":
          matchesPrice = price > 100 && price <= 500;
          break;
        case "500+":
          matchesPrice = price > 500;
          break;
      }
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-heading">Nos Produits</h1>
          <Cart />
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-6">Catégories</h2>
          <CategoryList />
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-6">Tous les produits</h2>
          <SearchAndFilter onSearch={handleSearch} onPriceFilter={handlePriceFilter} />
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Une erreur est survenue lors du chargement des produits.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  price={product.price || 0}
                  image={product.image_url || ''}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}