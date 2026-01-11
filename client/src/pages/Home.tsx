import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  
  // Featured products (take first 3)
  const featuredProducts = products?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: dark moody streetwear fashion shoot */}
          <img 
            src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter text-white mb-6 leading-none">
              Boom<span className="text-primary text-stroke">erangs</span>
            </h1>
            <p className="font-mono text-lg md:text-xl text-zinc-300 mb-10 max-w-xl mx-auto">
              WE MAKE THINGS WE WEAR OURSELVES. <br/>
              RUSSIAN STREETWEAR ORIGINALS.
            </p>
            <Link href="/products">
              <button className="bg-primary hover:bg-red-600 text-white px-8 py-4 font-display text-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                Shop Collection
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] -rotate-90 origin-center mb-8">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-8 leading-tight">
                NOT JUST <br/><span className="text-stroke">CLOTHING</span>. <br/>IDENTITY.
              </h2>
              <p className="font-mono text-zinc-400 mb-8 leading-relaxed">
                Born in the streets of Russia, BMGBRAND represents the raw energy of youth culture. 
                We don't follow trends; we document our reality through fabric and print.
                Every piece tells a story of the concrete jungle.
              </p>
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-white transition-colors group">
                READ MANIFESTO <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-primary/20 z-0" />
              {/* Unsplash image: graffiti wall texture urban */}
              <img 
                src="https://images.unsplash.com/photo-1496360938681-9a918960fa03?q=80&w=1000&auto=format&fit=crop" 
                alt="Brand Philosophy" 
                className="relative z-10 w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl text-white">Latest Drops</h2>
            <Link href="/products" className="hidden md:block font-mono text-zinc-500 hover:text-white text-sm">
              VIEW ALL PRODUCTS
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-zinc-900 aspect-[3/4] mb-4" />
                  <div className="h-6 bg-zinc-900 w-2/3 mb-2" />
                  <div className="h-4 bg-zinc-900 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {featuredProducts?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="btn-outline">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* Marquee/Ticker */}
      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-display text-2xl font-bold mx-8 uppercase tracking-widest">
              New Collection Available Now • Free Shipping on Orders Over 5000₽ • 
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
