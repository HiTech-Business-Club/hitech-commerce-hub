import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: "1",
    name: "MacBook Pro M2",
    price: 1299,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: "2",
    name: "DJI Drone Pro",
    price: 799,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc"
  },
  {
    id: "3",
    name: "iMac 27\"",
    price: 1799,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to HiTech Store
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover the latest in technology and innovation. Premium products for the modern lifestyle.
          </p>
          <Button size="lg" className="animate-fade-in">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Laptops", "Smartphones", "Accessories", "Gadgets"].map((category) => (
              <div
                key={category}
                className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;