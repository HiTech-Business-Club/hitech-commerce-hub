import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Navbar } from "@/components/Navbar";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { CategoryList } from "@/components/CategoryList";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";
import { useCartStore } from "@/stores/cartStore";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const session = useSession();
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    if (session?.user?.id) {
      initializeCart(session.user.id);
    }
  }, [session?.user?.id, initializeCart]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", sortBy],
    queryFn: async () => {
      let query = supabase.from("products").select("*");

      if (sortBy) {
        const [field, direction] = sortBy.split("-");
        query = query.order(field, { ascending: direction === "asc" });
      }

      const { data, error } = await query;

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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesPrice = true;

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      const price = product.price || 0;
      matchesPrice = price >= min && price <= max;
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
          <h2 className="text-2xl font-bold font-heading mb-6">Produits Vedettes</h2>
          <FeaturedProducts />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-heading mb-6">Catégories</h2>
          <CategoryList />
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-6">Tous les produits</h2>
          <SearchAndFilter
            onSearch={handleSearch}
            onPriceFilter={handlePriceFilter}
            onSortChange={handleSortChange}
            maxPrice={Math.max(...(products?.map((p) => p.price || 0) || [0]))}
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
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