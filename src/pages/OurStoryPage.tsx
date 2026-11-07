import React from 'react';
import { ArrowRight, Globe, Shield, Sparkles, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OurStoryPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#F4F0E8] text-[#171717] min-h-screen">
      {/* Hero Manifesto */}
      <section className="bg-[#171717] text-[#FFFFFF] py-24 sm:py-32 px-6 sm:px-12 border-b border-[#8B8176]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#B49A78] font-bold block">
            The Atelier Manifesto
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-[#FFFFFF]">
            ONE WORLD. MANY CULTURES. <br />
            <span className="italic text-[#B49A78]">INFINITE STYLE.</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#F4F0E8]/85 font-light leading-relaxed max-w-2xl mx-auto pt-2">
            TARA BY MABROOR was envisioned as a living bridge between civilizations. In an era of fleeting trends and disposable fashion, we celebrate timeless garments that carry the soul, history, and craftsmanship of the world's greatest textile traditions.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A78] font-bold block">
              Provenance & Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] leading-tight">
              Beyond Borders, Beyond Conventions.
            </h2>
            <p className="text-sm text-[#171717]/85 leading-relaxed font-light">
              Founded on the belief that beauty knows no nationality, TARA BY MABROOR brings together clothing and fashion expressions from around the globe. From the timeless elegance of Indian ethnic wear to the architectural sophistication of European fashion, from Middle Eastern modest wear to the vibrant creativity of African prints and the contemplative minimalism of East Asian design.
            </p>
            <p className="text-sm text-[#171717]/85 leading-relaxed font-light">
              We reject the homogenization of global fashion. Rather than standardizing silhouettes into fast-fashion replicas, we honor the genuine origin garments: the six-yard Banarasi handloom saree, the hand-embroidered Bisht and Abaya, the double-breasted Neapolitan suit, the flowing Agbada, and the Kyoto chirimen silk haori.
            </p>

            <div className="pt-4 flex items-center space-x-6 text-xs text-[#8B8176]">
              <div>
                <span className="font-serif text-2xl font-bold text-[#171717] block">6</span>
                <span>Civilizational Guilds</span>
              </div>
              <div className="w-[1px] h-8 bg-[#8B8176]/30" />
              <div>
                <span className="font-serif text-2xl font-bold text-[#171717] block">45+</span>
                <span>Generational Looms</span>
              </div>
              <div className="w-[1px] h-8 bg-[#8B8176]/30" />
              <div>
                <span className="font-serif text-2xl font-bold text-[#171717] block">100%</span>
                <span>Direct Artisan Trade</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/5] bg-[#EAE5DC] overflow-hidden border border-[#8B8176]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
              alt="Artisan loom in Varanasi"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/90 backdrop-blur-xs p-4 text-[#FFFFFF] text-xs">
              <span className="text-[#B49A78] uppercase text-[9px] tracking-widest block font-bold">Jaipur & Varanasi Guild</span>
              Master weaver Mohammed Aslam threading pure tested gold zari on the pit-loom.
            </div>
          </div>
        </div>
      </section>

      {/* Global Ateliers Directory */}
      <section className="bg-[#FFFFFF] border-y border-[#8B8176]/25 py-20 px-6 sm:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B49A78] font-bold block">
              The Geographical Guilds
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717]">
              Six Ateliers Across Three Continents
            </h2>
            <p className="text-xs text-[#8B8176] leading-relaxed">
              Every garment in our catalog is born in its true cultural homeland, preserving local heritage techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Atelier 1 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Varanasi & Jaipur, India</span>
              <h3 className="font-serif text-xl">The Silk Mark & Zardozi Looms</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                Dedicated to Katan silk Kadwa weaving, real gold zari tested under spectrography, and generational Zardozi metal needlework on velvet.
              </p>
            </div>

            {/* Atelier 2 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Sharjah & Fez, Middle East</span>
              <h3 className="font-serif text-xl">The Modest Architecture Studio</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                Architectural abayas in French crepe and Japanese Toyobo weaves, paired with Moroccan sfifa and hand-braided aakad silk knots.
              </p>
            </div>

            {/* Atelier 3 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Como & Florence, Italy</span>
              <h3 className="font-serif text-xl">The Sartoriale Workshop</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                Super 150s wool double-breasted suiting, double-faced cashmere blazers, and bias-cut silk column gowns draped on vintage wooden mannequins.
              </p>
            </div>

            {/* Atelier 4 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Bonwire & Lagos, West Africa</span>
              <h3 className="font-serif text-xl">The Royal Kente & Agbada Forge</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                Narrow-strip handloom Kente bands and ceremonial Yoruba grand agbadas crafted in lustrous Egyptian Giza cotton with brass buckle finishes.
              </p>
            </div>

            {/* Atelier 5 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Kyoto, Japan</span>
              <h3 className="font-serif text-xl">The Yuzen & Chirimen Loom</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                80-year-old studio in the Nishijin district preserving Kyo-Yuzen resist dyeing and textured chirimen silk haori coats.
              </p>
            </div>

            {/* Atelier 6 */}
            <div className="border border-[#8B8176]/20 p-6 bg-[#FDF9F1] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B49A78] font-bold block">Wakayama & Tokyo, Japan</span>
              <h3 className="font-serif text-xl">The Heavyweight Loopwheel Lab</h3>
              <p className="text-xs text-[#8B8176] leading-relaxed">
                Vintage circular loopwheel knitting producing indestructible 500 GSM French terry hoodies and bonded waterproof wool streetwear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-6 sm:px-12 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl text-[#171717]">
            Experience Fashion Without Borders
          </h3>
          <p className="text-xs text-[#8B8176] leading-relaxed">
            Every purchase supports verified generational master weavers and upholds intangible cultural heritage worldwide.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => navigateTo('women')}
              className="bg-[#171717] text-[#FFFFFF] text-[10px] uppercase tracking-[0.25em] font-bold py-3.5 px-8 hover:bg-[#B49A78] hover:text-[#171717] transition"
            >
              Shop Women's Heritage
            </button>
            <button
              onClick={() => navigateTo('men')}
              className="border border-[#171717] text-[#171717] text-[10px] uppercase tracking-[0.25em] font-bold py-3.5 px-8 hover:bg-[#171717] hover:text-[#FFFFFF] transition"
            >
              Shop Men's Sartorial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
