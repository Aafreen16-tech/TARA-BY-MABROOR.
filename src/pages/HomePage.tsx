import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CULTURAL_STORIES } from '../data/products';
import { CulturalCategory } from '../types';

export const HomePage: React.FC = () => {
  const { products, navigateTo } = useShop();

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const trendingItems = products.filter((p) => p.isTrending).slice(0, 4);

  const womenHighlights = products.filter((p) => p.gender === 'women').slice(0, 4);
  const menHighlights = products.filter((p) => p.gender === 'men').slice(0, 4);

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#171717] text-[#FFFFFF] overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=90"
            alt="Tara by Mabroor Global Fashion Campaign"
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.08] scale-102 transition-transform duration-1000"
          />
          {/* Subtle gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-[#171717]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-[#171717]/30 to-transparent" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-12 py-24 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-1.5 border border-[#B49A78]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#B49A78]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-medium text-[#F4F0E8]">
                L’Atelier International • Volume I
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FFFFFF] leading-[1.04]">
              FASHION <br />
              <span className="italic font-light text-[#B49A78]">WITHOUT</span> BORDERS.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#F4F0E8]/90 font-light leading-relaxed max-w-xl">
              From timeless traditions to contemporary expressions, discover fashion from every corner of the world. Bridging Indian silk heritage, Middle Eastern majesty, and European sartorial precision.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
              <button
                onClick={() => navigateTo('collections', { culture: 'all' })}
                className="bg-[#FFFFFF] text-[#171717] text-[11px] uppercase tracking-[0.25em] font-semibold py-4 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition duration-250 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('story')}
                className="border border-[#FFFFFF] text-[#FFFFFF] text-[11px] uppercase tracking-[0.25em] font-semibold py-4 px-8 hover:bg-[#FFFFFF] hover:text-[#171717] transition duration-250 cursor-pointer text-center"
              >
                Discover Our World
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hero Ticker */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#171717]/85 backdrop-blur-xs border-t border-white/15 py-3 px-6 text-[10px] uppercase tracking-[0.3em] text-[#B49A78] flex items-center justify-between overflow-hidden">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            <span>INDIAN HERITAGE SILKS</span>
            <span>•</span>
            <span>MIDDLE EASTERN BISHT & ABAYAS</span>
            <span>•</span>
            <span>EUROPEAN SARTORIALE</span>
            <span>•</span>
            <span>WEST AFRICAN KENTE COUTURE</span>
            <span>•</span>
            <span>EAST ASIAN SILK HAORIS</span>
            <span>•</span>
            <span>INTERNATIONAL STREETWEAR</span>
          </div>
        </div>
      </section>

      {/* 2. NEW ARRIVALS */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-12 py-20 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#8B8176]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-2">
              Curated Releases
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717]">
              New Arrivals
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigateTo('women', { category: 'Banarasi Sarees' })}
              className="text-xs uppercase tracking-[0.22em] font-semibold text-[#171717] hover:text-[#B49A78] underline underline-offset-8 transition flex items-center space-x-1"
            >
              <span>View All New Garments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. A WORLD OF STYLE — GLOBAL FASHION COLLECTIONS */}
      <section className="bg-[#171717] text-[#FFFFFF] py-24 lg:py-32 border-y border-[#8B8176]/30">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.38em] text-[#B49A78] font-bold block">
              Editorial Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFFFFF]">
              A WORLD OF STYLE.
            </h2>
            <p className="text-sm text-[#8B8176] font-light leading-relaxed">
              We reject borders in design. Experience six distinct sartorial traditions reimagined through fine fabrics, master drapes, and architectural cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CULTURAL_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => navigateTo('collections', { culture: story.title as CulturalCategory })}
                className="group cursor-pointer bg-[#212121] border border-white/10 hover:border-[#B49A78] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 left-3 bg-[#171717]/80 backdrop-blur-xs text-[#B49A78] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 border border-white/15">
                    {story.tagline}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B49A78] font-semibold block mb-1">
                      {story.subheading}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#FFFFFF] group-hover:text-[#B49A78] transition">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#8B8176] leading-relaxed mt-3">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#F4F0E8] group-hover:text-[#B49A78] font-medium">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WOMEN'S COLLECTION SPOTLIGHT */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block">
              Drapes & Grace
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
              Women's Haute Couture
            </h2>
            <p className="text-sm text-[#8B8176] leading-relaxed">
              From heavy Banarasi silk sarees and royal zardozi lehengas to French crepe abayas, Moroccan sfifa kaftans, and bias-cut evening gowns. Every garment honors the heritage of female elegance.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
              {['Sarees', 'Lehengas', 'Kurtis', 'Abayas', 'Kaftans', 'Gowns'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigateTo('women', { category: cat })}
                  className="px-3 py-1.5 border border-[#8B8176]/30 bg-[#FFFFFF] hover:bg-[#171717] hover:text-[#FFFFFF] transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-end">
            <button
              onClick={() => navigateTo('women')}
              className="bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.24em] font-semibold py-4 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition flex items-center space-x-2"
            >
              <span>Explore All Women's Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {womenHighlights.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL CAMPAIGN SPREAD */}
      <section className="bg-[#EAE5DC] py-20 px-6 sm:px-12 border-y border-[#8B8176]/20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] bg-[#FFFFFF] overflow-hidden border border-[#8B8176]/30 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=85"
              alt="Tara Bespoke Tailoring"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-4 left-4 bg-[#171717] text-[#FFFFFF] px-4 py-2 text-[10px] uppercase tracking-[0.25em]">
              The Sovereign Achkan • Handloom Matka Silk
            </div>
          </div>

          <div className="space-y-6 lg:pl-8">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B49A78] font-bold block">
              Generational Guilds
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
              Crafted in Looms Preserved for Generations.
            </h2>
            <p className="text-sm text-[#171717]/80 leading-relaxed font-light">
              We work directly with generational weavers in Varanasi, Kanchipuram, Fez, and Florence. By bypassing intermediaries, TARA ensures that master artisans receive dignified livelihoods while our patrons acquire genuine museum-grade garments.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#8B8176]/20 text-xs">
              <div>
                <span className="font-serif text-2xl text-[#171717] block font-medium">100%</span>
                <span className="text-[#8B8176] uppercase tracking-wider text-[10px]">Silk Mark Certified</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#171717] block font-medium">45 Days</span>
                <span className="text-[#8B8176] uppercase tracking-wider text-[10px]">Average Loom Weaving Time</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('story')}
                className="bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.24em] font-semibold py-3.5 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition"
              >
                Read Atelier Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEN'S COLLECTION SPOTLIGHT */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block">
              Sartorial Authority
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
              Men's Sartorial Mastery
            </h2>
            <p className="text-sm text-[#8B8176] leading-relaxed">
              Royal Matka silk sherwanis, Tussar silk kurta sets, Super 150s double-breasted suits, pristine Emirati thobes, and heavyweight Japanese loopwheel streetwear.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
              {['Sherwanis', 'Kurtas', 'Suits', 'Thobes & Kanduras', 'Jackets', 'Streetwear'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigateTo('men', { category: cat })}
                  className="px-3 py-1.5 border border-[#8B8176]/30 bg-[#FFFFFF] hover:bg-[#171717] hover:text-[#FFFFFF] transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-end">
            <button
              onClick={() => navigateTo('men')}
              className="bg-[#171717] text-[#F4F0E8] text-[11px] uppercase tracking-[0.24em] font-semibold py-4 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition flex items-center space-x-2"
            >
              <span>Explore All Men's Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {menHighlights.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. BRAND STORY HERO MANIFESTO */}
      <section className="bg-[#171717] text-[#FFFFFF] py-28 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#B49A78] font-bold block">
            Our Core Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#FFFFFF]">
            ONE WORLD. MANY CULTURES. <br />
            <span className="italic text-[#B49A78]">INFINITE STYLE.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F4F0E8]/80 leading-relaxed font-light max-w-2xl mx-auto">
            "TARA BY MABROOR was envisioned as a celebration of fashion without borders. Inspired by the diversity of cultures, traditions, and contemporary lifestyles, we bring together clothing and fashion expressions from around the world. From the timeless elegance of Indian ethnic wear to the sophistication of European fashion, from Middle Eastern modest wear to the creativity of African and Asian designs, TARA celebrates the beauty of global fashion."
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('story')}
              className="border border-[#B49A78] text-[#B49A78] hover:bg-[#B49A78] hover:text-[#171717] text-[11px] uppercase tracking-[0.25em] font-semibold py-4 px-10 transition duration-200"
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* 8. TRENDING NOW SECTION */}
      <section className="max-w-[1500px] mx-auto px-6 sm:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#8B8176]/20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block mb-2">
              Patron Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717]">
              Trending Now
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigateTo('collections', { culture: 'all' })}
              className="text-xs uppercase tracking-[0.22em] font-semibold text-[#171717] hover:text-[#B49A78] underline underline-offset-8 transition flex items-center space-x-1"
            >
              <span>View Global Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trendingItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
