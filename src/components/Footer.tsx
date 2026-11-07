import React, { useState } from 'react';
import { Mail, ArrowRight, Shield, Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'info');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Atelier Circle. Private trunk show access granted.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#171717] text-[#F4F0E8] border-t border-[#8B8176]/30">
      {/* Brand Value Pillars */}
      <div className="border-b border-white/10 py-10 px-6 sm:px-8">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <Globe className="w-5 h-5 text-[#B49A78] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#F4F0E8]">
                Fashion Without Borders
              </h4>
              <p className="text-[12px] text-[#8B8176] mt-1 leading-relaxed">
                Direct curation from authentic artisan guilds across India, Italy, the UAE, Ghana, and Japan.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Award className="w-5 h-5 text-[#B49A78] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#F4F0E8]">
                Certified Craftsmanship
              </h4>
              <p className="text-[12px] text-[#8B8176] mt-1 leading-relaxed">
                Every Banarasi and Kanchipuram is Silk Mark certified. Tested 24k micro-gold zari weaves.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Sparkles className="w-5 h-5 text-[#B49A78] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#F4F0E8]">
                Bespoke Made-to-Measure
              </h4>
              <p className="text-[12px] text-[#8B8176] mt-1 leading-relaxed">
                Custom bridal and groom fitting appointments available with our senior atelier tailors.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Shield className="w-5 h-5 text-[#B49A78] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#F4F0E8]">
                Insured Global Transit
              </h4>
              <p className="text-[12px] text-[#8B8176] mt-1 leading-relaxed">
                Handled by DHL Express Concierge with climate-controlled, protective wooden atelier casing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-serif text-2xl tracking-[0.16em] uppercase block font-normal text-[#F4F0E8]">
            TARA BY MABROOR
          </span>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B49A78] font-semibold">
            One World. Many Cultures. Infinite Style.
          </p>
          <p className="text-xs text-[#8B8176] leading-relaxed max-w-md pt-2">
            TARA BY MABROOR was envisioned as a global celebration of fashion without borders. We bridge centuries of heritage craftsmanship with contemporary silhouettes, serving patrons across 45 countries.
          </p>

          <div className="pt-4 flex items-center space-x-4 text-xs tracking-wider text-[#B49A78]">
            <span>NEW DELHI</span>
            <span>•</span>
            <span>DUBAI</span>
            <span>•</span>
            <span>MILAN</span>
            <span>•</span>
            <span>LONDON</span>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B49A78] mb-5">
            Couture Archives
          </h4>
          <ul className="space-y-3 text-xs text-[#F4F0E8]/70">
            <li>
              <button
                onClick={() => navigateTo('women', { category: 'Banarasi Sarees' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Banarasi & Silk Sarees
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('women', { category: 'Lehengas' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Bridal Zardozi Lehengas
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('women', { category: 'Abayas' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                French Crepe Abayas
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('men', { category: 'Sherwanis' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Raw Silk Royal Sherwanis
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('men', { category: 'Suits' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Milano Double-Breasted Suits
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('men', { category: 'Thobes & Kanduras' })}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Emirati Royal Kanduras
              </button>
            </li>
          </ul>
        </div>

        {/* Concierge & Client Care */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B49A78] mb-5">
            Client Concierge
          </h4>
          <ul className="space-y-3 text-xs text-[#F4F0E8]/70">
            <li>
              <button
                onClick={() => navigateTo('account')}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Track Consignment
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('story')}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Our Ateliers & Looms
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('account')}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Saved Wishlist
              </button>
            </li>
            <li>
              <button
                onClick={() => addToast('Concierge desk: concierge@tarabymabroor.com', 'info')}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Bespoke Bridal Appointment
              </button>
            </li>
            <li>
              <button
                onClick={() => addToast('Silk Mark Verification code check available on garment label.', 'info')}
                className="hover:text-[#FFFFFF] transition hover:underline underline-offset-4"
              >
                Certificate of Authenticity
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B49A78] mb-3">
            Be Part of Our World
          </h4>
          <p className="text-xs text-[#8B8176] mb-4 leading-relaxed">
            Receive private invitations to seasonal collection releases, bespoke drops, and atelier stories.
          </p>

          {subscribed ? (
            <div className="bg-[#FFFFFF]/10 border border-[#B49A78] p-3 flex items-center space-x-2 text-xs text-[#B49A78]">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Privilege membership confirmed.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#FFFFFF]/5 border border-[#8B8176]/40 px-3 py-2.5 text-xs text-[#F4F0E8] placeholder:text-[#8B8176] focus:outline-none focus:border-[#B49A78]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#B49A78] text-[#171717] text-[10px] uppercase tracking-[0.24em] font-bold py-2.5 px-4 hover:bg-[#FFFFFF] transition duration-200"
              >
                Subscribe to Atelier
              </button>
            </form>
          )}

          <div className="mt-6 flex space-x-4 text-xs text-[#8B8176]">
            <a href="#instagram" onClick={(e) => { e.preventDefault(); addToast('Opening @tarabymabroor on Instagram', 'info'); }} className="hover:text-[#F4F0E8] transition">Instagram</a>
            <a href="#pinterest" onClick={(e) => { e.preventDefault(); addToast('Opening Tara Pinterest Lookbook', 'info'); }} className="hover:text-[#F4F0E8] transition">Pinterest</a>
            <a href="#facebook" onClick={(e) => { e.preventDefault(); addToast('Opening Tara Facebook Atelier', 'info'); }} className="hover:text-[#F4F0E8] transition">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-6 sm:px-8 text-[11px] text-[#8B8176]">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <p>© {new Date().getFullYear()} TARA BY MABROOR. All rights reserved.</p>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="hidden sm:inline">Fashion Without Borders™</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-wider">
            <button
              onClick={() => addToast('Privacy Policy: All client data is encrypted and strictly confidential.', 'info')}
              className="hover:text-[#F4F0E8] transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => addToast('Terms of Service: Luxury handmade garments subject to master artisanal policy.', 'info')}
              className="hover:text-[#F4F0E8] transition"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#B49A78] hover:text-[#FFFFFF] transition font-semibold"
            >
              Brand Owner Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
