import { Product, CurrencyConfig, Coupon } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rateAgainstINR: 1, name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', rateAgainstINR: 0.012, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rateAgainstINR: 0.011, name: 'Euro' },
  AED: { code: 'AED', symbol: 'AED ', rateAgainstINR: 0.044, name: 'UAE Dirham' },
  GBP: { code: 'GBP', symbol: '£', rateAgainstINR: 0.0094, name: 'British Pound' },
};

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GLOBAL15',
    discountPercentage: 15,
    minOrderINR: 15000,
    description: '15% off on your global couture order above ₹15,000'
  },
  {
    code: 'FIRSTTARA',
    discountPercentage: 10,
    minOrderINR: 5000,
    description: '10% welcome privilege on first luxury purchase'
  },
  {
    code: 'HERITAGE20',
    discountPercentage: 20,
    minOrderINR: 35000,
    description: '20% off on Indian Heritage & Middle Eastern Couture'
  }
];

export const PRODUCTS: Product[] = [
  // 1. WOMEN'S - BANARASI SILK SAREE
  {
    id: 'tara-w-001',
    name: 'Kashi Imperial Kadwa Banarasi Silk Saree',
    subtitle: 'Woven in pure Katan silk with gold & silver Ganga-Jamuna zari motifs',
    fabricTag: 'Pure Katan Silk & Real Zari',
    priceINR: 42500,
    originalPriceINR: 48000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Banarasi Sarees',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Imperial Crimson', hex: '#8B1E2D' },
      { name: 'Royal Emerald', hex: '#1C4A38' },
      { name: 'Antique Gold', hex: '#C5A059' }
    ],
    sizes: ['Unstitched (Includes Blouse Piece)', 'Pre-Stitched Custom Sizing'],
    description: 'An heirloom Banarasi masterpiece handwoven over 45 days by master weavers in Varanasi. Featuring intricate floral jaal motifs and an opulent pallu woven with real tested zari.',
    details: [
      'Origin: Varanasi, Uttar Pradesh, India',
      'Weave: Traditional Kadwa Handloom Technique',
      'Includes 1 meter unstitched blouse piece in matching silk with zari border',
      'Silk Mark Certified 100% Pure Katan Silk',
      'Length: 5.5 meters saree + 1 meter blouse piece',
      'Weight: 890 grams'
    ],
    fabricCare: [
      'Strictly dry clean only by certified luxury fabric specialists',
      'Store wrapped in breathable muslin fabric, avoid plastic covers',
      'Air garment periodically in indirect sunlight',
      'Iron on reverse with low heat over a cotton cloth'
    ],
    artisanStory: 'Crafted in the historic looms of Madanpura, Varanasi. Master weaver Mohammed Aslam represents the fourth generation preserving the authentic Kadwa interlock technique.',
    isNewArrival: true,
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 6,
    rating: 4.95,
    reviewCount: 42,
    reviews: [
      {
        id: 'rev-01',
        author: 'Ananya Singhania',
        location: 'Mumbai & London',
        rating: 5,
        date: 'October 14, 2026',
        comment: 'The drape and sheen of this Banarasi is breathtaking. Real zari work that catches the light like molten gold.',
        verified: true
      },
      {
        id: 'rev-02',
        author: 'Dr. Sarah Al-Maktoum',
        location: 'Dubai, UAE',
        rating: 5,
        date: 'September 28, 2026',
        comment: 'Exquisite craftsmanship. The packaging in the bespoke wooden atelier box was truly five-star luxury.',
        verified: true
      }
    ]
  },

  // 2. WOMEN'S - KANCHIPURAM SILK SAREE
  {
    id: 'tara-w-002',
    name: 'Suryakanthi Korvai Kanchipuram Silk Saree',
    subtitle: 'Heavy mulberry silk with contrast temple border and pure gold zari',
    fabricTag: 'Pure Mulberry Silk (3-Ply)',
    priceINR: 56000,
    originalPriceINR: 62000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Kanchipuram Sarees',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Saffron & Peacock Blue', hex: '#DE6B35' },
      { name: 'Rani Pink & Forest Green', hex: '#C2185B' }
    ],
    sizes: ['Free Size (Includes Blouse)'],
    description: 'Renowned for its heavy mulberry silk and interlocking Korvai temple border, this bridal Kanchipuram reflects the architectural splendour of ancient Dravidian temples.',
    details: [
      'Origin: Kanchipuram, Tamil Nadu, India',
      'Technique: Korvai interlocking double-shuttle handloom',
      'Tested 24k micro-gold plating zari with silk core',
      'GI Tagged & Silk Mark Certified',
      'Length: 6.2 meters total'
    ],
    fabricCare: [
      'Dry clean only',
      'Fold along original creases every 3 months'
    ],
    artisanStory: 'Woven in the temple town of Kanchipuram by our generational guild. Over 320 hours of meticulous hand-manipulated shuttle work.',
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 4,
    rating: 5.0,
    reviewCount: 29
  },

  // 3. WOMEN'S - ROYAL BRIDAL LEHENGA
  {
    id: 'tara-w-003',
    name: 'Noor-e-Jahan Hand-Embroidered Zardozi Lehenga',
    subtitle: 'Silk velvet and tissue organza adorned with dabka, pearls, and cut-dana',
    fabricTag: 'Silk Velvet & Metallic Tissue',
    priceINR: 115000,
    originalPriceINR: 130000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Lehengas',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Nocturne Plum', hex: '#3E1F30' },
      { name: 'Champagne Ivory', hex: '#EDE3D2' },
      { name: 'Vintage Rose', hex: '#A85A65' }
    ],
    sizes: ['XS (UK 6)', 'S (UK 8)', 'M (UK 10)', 'L (UK 12)', 'Bespoke Made-to-Measure'],
    description: 'A monument to bridal opulence. Layered silk velvet flared skirt featuring Mughal jali architecture, matched with an intricately embroidered blouse and two sheer organza dupattas.',
    details: [
      'Complete 3-piece set: Skirt, Blouse, and Dual Dupattas',
      'Skirt Flare: 6.5 meters monumental sweep',
      'Hand-sewn with cultured seed pearls and Japanese cut beads',
      'Lined in pure mulberry habotai silk with built-in can-can'
    ],
    fabricCare: [
      'Specialist bridal couture dry cleaning only',
      'Complimentary archive garment box provided'
    ],
    artisanStory: 'Embroidered over 120 days across ateliers in Lucknow and Jaipur, harmonizing centuries of Zardozi metal thread craft.',
    isNewArrival: false,
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 3,
    rating: 4.98,
    reviewCount: 31
  },

  // 4. WOMEN'S - MIDDLE EASTERN LUXURY ABAYA
  {
    id: 'tara-w-004',
    name: 'Al-Thuraya French Crepe & Gold Silk Abaya',
    subtitle: 'Flowing bisht silhouette with hand-appliqued gold filigree embroidery',
    fabricTag: 'Heavyweight Nida Silk & French Crepe',
    priceINR: 28500,
    originalPriceINR: 32000,
    gender: 'women',
    culturalCategory: 'Middle Eastern Elegance',
    category: 'Abayas',
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Midnight Obsidian', hex: '#111111' },
      { name: 'Desert Dune', hex: '#C2B29D' },
      { name: 'Olive Khaki', hex: '#4B5320' }
    ],
    sizes: ['52 Petite', '54 Standard', '56 Medium', '58 Tall', '60 Extra Tall'],
    description: 'An architectural expression of modesty and grace. Tailored from matte Japanese Nida silk with cascading drape and gold silk thread detailing on cuffs and collar.',
    details: [
      'Includes matching silk chiffon Sheila (scarf)',
      'Concealed French horn snap button front closure',
      'Deep tailored side slip pockets',
      'Origin: Designed in Dubai, tailored in Milan'
    ],
    fabricCare: [
      'Gentle cool wash or dry clean',
      'Steam iron on medium heat'
    ],
    artisanStory: 'Created in collaboration with Dubai-based master modiste Fatima Al-Hosani, merging traditional Gulf Bisht cuts with Parisian tailoring precision.',
    isNewArrival: true,
    isTrending: true,
    stockCount: 12,
    rating: 4.92,
    reviewCount: 54
  },

  // 5. WOMEN'S - EMERALD MOROCCAN KAFTAN
  {
    id: 'tara-w-005',
    name: 'Marrakech Sfifa Silk Velvet Kaftan',
    subtitle: 'Royal floor-length gown with hand-braided gold sfifa and aakad buttons',
    fabricTag: 'Pure Silk Velvet & Metallic Trim',
    priceINR: 38000,
    originalPriceINR: 44000,
    gender: 'women',
    culturalCategory: 'Middle Eastern Elegance',
    category: 'Kaftans',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Royal Emerald', hex: '#0B4632' },
      { name: 'Jewel Sapphire', hex: '#0F2D59' },
      { name: 'Warm Terracotta', hex: '#B85D43' }
    ],
    sizes: ['S (UK 8)', 'M (UK 10)', 'L (UK 12)', 'XL (UK 14)'],
    description: 'A tribute to the majestic courtyards of Fez and Rabat. Hand-applied braided metallic trim (sfifa) and over 80 individually handmade silk knots (aakad) down the front placket.',
    details: [
      'Detachable embroidered Mdamma waist belt included',
      'Side slits for effortless movement',
      'Fully lined in breathable silk satin',
      'Origin: Fez, Morocco'
    ],
    fabricCare: ['Dry clean only'],
    artisanStory: 'Crafted by certified Maâlem artisans in the Medina of Fez using gold-plated thread sourced from Lyon.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 8,
    rating: 4.89,
    reviewCount: 38
  },

  // 6. WOMEN'S - EUROPEAN HAUTE COUTURE DRESS
  {
    id: 'tara-w-006',
    name: 'L’Atelier Bias-Cut Silk Crepe Evening Gown',
    subtitle: 'Sculptural asymmetric column silhouette with architectural back cowl',
    fabricTag: '100% Heavy Mulberry Silk Crepe (40mm)',
    priceINR: 48000,
    gender: 'women',
    culturalCategory: 'European Contemporary',
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Champagne Ivory', hex: '#EBE3D5' },
      { name: 'Midnight Onyx', hex: '#161616' },
      { name: 'Bordeaux Red', hex: '#5B1527' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    description: 'Elegance distilled to its purest geometry. Precision bias cut that contours naturally around the hips, ending in a dramatic floor-skimming hem.',
    details: [
      'Double-layered silk crepe de chine',
      'Concealed French side zipper',
      'French seam finishing throughout',
      'Hand-rolled hems'
    ],
    fabricCare: ['Professional dry clean only'],
    artisanStory: 'Draped and tailored in our partner atelier in Como, Italy, using heritage looms operating since 1912.',
    isNewArrival: true,
    isTrending: false,
    stockCount: 10,
    rating: 4.94,
    reviewCount: 19
  },

  // 7. WOMEN'S - EAST ASIAN SILK KIMONO JACKET
  {
    id: 'tara-w-007',
    name: 'Kyoto Yuzen Silk Haori Coat',
    subtitle: 'Hand-dyed botanical botanical crane motifs on textured chirimen silk',
    fabricTag: 'Pure Japanese Chirimen Silk',
    priceINR: 34000,
    gender: 'women',
    culturalCategory: 'East Asian Aesthetics',
    category: 'Kimonos & Silk Jackets',
    images: [
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ink Black & Gold', hex: '#1C1B1A' },
      { name: 'Misty Celadon', hex: '#8BA094' }
    ],
    sizes: ['One Size (Relaxed Drape)'],
    description: 'A versatile outer garment honoring Kyoto textile masters. Features traditional wide kimono sleeves and open-front styling suited for layered global dressing.',
    details: [
      'Origin: Kyoto, Japan',
      'Hand-painted utilizing Kyo-Yuzen resist-dye methods',
      'Fully lined in contrasting habotai silk',
      'Drop shoulders with generous draped armholes'
    ],
    fabricCare: ['Dry clean by silk specialist'],
    artisanStory: 'Produced in collaboration with an 80-year-old studio in the Nishijin district of Kyoto, carrying intangible cultural heritage.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 5,
    rating: 4.97,
    reviewCount: 23
  },

  // 8. WOMEN'S - AFRICAN PRINT COUTURE
  {
    id: 'tara-w-008',
    name: 'Asante Kente Architectural Trench Gown',
    subtitle: 'Structured cotton jacquard with geometric wax resist motifs and horn belt',
    fabricTag: 'Handwoven Kente Jacquard & Cotton Gabardine',
    priceINR: 36500,
    gender: 'women',
    culturalCategory: 'African Expressions',
    category: 'African Print Ensembles',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Sunburst Ochre & Indigo', hex: '#D97706' },
      { name: 'Terracotta & Slate', hex: '#9A3412' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A celebration of West African royal regalia reimagined into an avant-garde trench gown. Wide architectural notched lapels and cinched double-ring waist.',
    details: [
      'Origin: Accra, Ghana & Lagos, Nigeria',
      'Solid storm flap and deep patch pockets',
      'Removable belt with sculpted brass buckle',
      'Horn buttons sustainably sourced'
    ],
    fabricCare: ['Gentle dry clean'],
    artisanStory: 'Kente bands hand-woven on narrow strip looms in Bonwire, Ghana, assembled into a sharp international silhouette.',
    isNewArrival: true,
    isTrending: true,
    stockCount: 7,
    rating: 4.9,
    reviewCount: 18
  },

  // 9. WOMEN'S - ANARKALI KURTI SUIT
  {
    id: 'tara-w-009',
    name: 'Chanderi Gold Foil Anarkali Ensemble',
    subtitle: 'Flared floor-length kalidar silhouette with hand-block gold print & churidar',
    fabricTag: 'Handwoven Chanderi Cotton Silk',
    priceINR: 22000,
    originalPriceINR: 26000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Kurtis',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ivory & Khari Gold', hex: '#FAF7F0' },
      { name: 'Dusty Rose', hex: '#C59B97' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: '32-kali voluminous flared Anarkali paired with slim churidar and a sheer organza dupatta bordered in gota patti.',
    details: [
      'Includes 3 pieces: Anarkali Kurti, Churidar pants, Organza Dupatta',
      'Gota patti borders on hemline and sleeves',
      'Pure mulmul lining for all-day comfort'
    ],
    fabricCare: ['Dry clean first 2 washes, gentle hand wash thereafter'],
    artisanStory: 'Handwoven in Chanderi, Madhya Pradesh, combining lustrous silk warp with breezy cotton weft.',
    isNewArrival: false,
    isTrending: false,
    stockCount: 14,
    rating: 4.88,
    reviewCount: 47
  },

  // 10. MEN'S - ROYAL EMBROIDERED SHERWANI
  {
    id: 'tara-m-001',
    name: 'Maharaja Heritage Raw Silk Sherwani',
    subtitle: 'Structured achkan collar with tone-on-tone Resham threadwork and pearl buttons',
    fabricTag: '100% Handloom Matka Raw Silk',
    priceINR: 68000,
    originalPriceINR: 75000,
    gender: 'men',
    culturalCategory: 'Indian Heritage',
    category: 'Sherwanis',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Royal Ivory Cream', hex: '#F3EFE6' },
      { name: 'Regal Midnight Navy', hex: '#1B2433' },
      { name: 'Smoky Sage', hex: '#636F64' }
    ],
    sizes: ['38 Chest (S)', '40 Chest (M)', '42 Chest (L)', '44 Chest (XL)', 'Custom Bespoke Tailored'],
    description: 'The pinnacle of regal Indian menswear. Designed with an architectural silhouette, high stand collar, concealed button placket, and real mother-of-pearl accent buttons. Includes silk churidar trousers and matching pocket square.',
    details: [
      'Origin: Jaipur, Rajasthan & Kolkata, India',
      'Includes: Sherwani Coat + Silk Churidar Pants',
      'Interior pocket lined for pocket watch or phone',
      'Shoulder padding for a crisp sartorial posture'
    ],
    fabricCare: ['Specialist dry clean only', 'Keep in wooden coat hanger inside muslin garment bag'],
    artisanStory: 'Hand-embroidered by generational artisans in Kolkata over 80 hours. The raw Matka silk is spun from indigenous Indian cocoons.',
    isNewArrival: true,
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 5,
    rating: 4.97,
    reviewCount: 36,
    reviews: [
      {
        id: 'rev-m1',
        author: 'Kabir Oberoi',
        location: 'New Delhi',
        rating: 5,
        date: 'October 30, 2026',
        comment: 'Wore this for my wedding reception. The cut is modern yet deeply respectful of heritage.',
        verified: true
      }
    ]
  },

  // 11. MEN'S - HANDLOOM SILK KURTA SET
  {
    id: 'tara-m-002',
    name: 'Varanasi Zari-Bordered Tussar Silk Kurta Set',
    subtitle: 'Straight-cut relaxed kurta with subtle micro-pin-tucks and tapered silk trousers',
    fabricTag: 'Handwoven Wild Tussar Silk',
    priceINR: 19500,
    originalPriceINR: 23000,
    gender: 'men',
    culturalCategory: 'Indian Heritage',
    category: 'Kurtas',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Raw Honey Tan', hex: '#C49E69' },
      { name: 'Oatmeal Ivory', hex: '#EBE6DC' },
      { name: 'Forest Moss', hex: '#2C3E2D' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    description: 'An elevated festive essential for the discerning gentleman. Cut from organic Tussar silk featuring a delicate gold zari tipping along the mandarin collar and cuffs.',
    details: [
      'Includes Kurta and matching tailored trousers with drawstring waistband',
      'Two side pockets and one internal chest pocket',
      'Side slits for effortless comfort'
    ],
    fabricCare: ['Dry clean recommended'],
    artisanStory: 'Tussar silk reeled directly by tribal cooperatives in Jharkhand, woven on heritage pit-looms in Bihar.',
    isNewArrival: true,
    isTrending: false,
    stockCount: 16,
    rating: 4.91,
    reviewCount: 45
  },

  // 12. MEN'S - MIDDLE EASTERN LUXURY THOBE / KANDURA
  {
    id: 'tara-m-003',
    name: 'Emirati Royal Al-Kandura',
    subtitle: 'Classic collarless thobe with detachable silk tarboosh tassel and mother-of-pearl buttons',
    fabricTag: 'Japanese Toyobo Pure Cotton-Spun Fabric',
    priceINR: 16500,
    gender: 'men',
    culturalCategory: 'Middle Eastern Elegance',
    category: 'Thobes & Kanduras',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Crisp Arctic White', hex: '#FDFDFD' },
      { name: 'Sand Beige', hex: '#DDD0BE' },
      { name: 'Slate Smoke', hex: '#6D7174' }
    ],
    sizes: ['54 (Height 5\'4" - 5\'6")', '56 (Height 5\'7" - 5\'9")', '58 (Height 5\'10" - 6\'0")', '60 (Height 6\'1" - 6\'3")', '62 (Tall)'],
    description: 'The definitive garment of Arabian elegance. Tailored with seamless clean chest seams, relaxed drape, and iconic handcrafted silk tarboosh (tassel) that can be scented with oud.',
    details: [
      'Premium ultra-fine Japanese Toyobo weave for maximum thermal comfort in heat',
      'Double chest pockets with hidden internal compartments',
      'Hand-stitched perimeter neckline'
    ],
    fabricCare: ['Machine wash warm on gentle cycle', 'Medium steam press'],
    artisanStory: 'Crafted in collaboration with heritage Emirati tailors in Sharjah, honoring classical Gulf sartorial customs.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 18,
    rating: 4.96,
    reviewCount: 62
  },

  // 13. MEN'S - EUROPEAN DOUBLE-BREASTED SUIT
  {
    id: 'tara-m-004',
    name: 'Milano Sartoriale Wool & Mohair Double-Breasted Suit',
    subtitle: 'Unstructured Neapolitan shoulder with peak lapels and side-adjuster trousers',
    fabricTag: 'Super 150s Merino Wool & Kid Mohair',
    priceINR: 72000,
    originalPriceINR: 82000,
    gender: 'men',
    culturalCategory: 'European Contemporary',
    category: 'Suits',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Midnight Charcoal', hex: '#232528' },
      { name: 'Deep Espresso', hex: '#31231E' },
      { name: 'Chalkstripe Navy', hex: '#182436' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '42L', '44L'],
    description: 'A masterclass in modern European tailoring. Crafted in Biella wool with a touch of mohair for crisp crease-resistance and subtle natural luster.',
    details: [
      'Full floating horsehair canvas construction',
      'Neapolitan spalla camicia pleated shoulder',
      'Functional 4-button working surgeon cuffs',
      'Trousers feature high-rise waistband with buckled side adjusters'
    ],
    fabricCare: ['Specialist dry clean only'],
    artisanStory: 'Woven by Vitale Barberis Canonico in Piedmont, Italy, and assembled with 18 hours of bench-tailoring.',
    isNewArrival: true,
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 7,
    rating: 4.99,
    reviewCount: 28
  },

  // 14. MEN'S - AFRICAN COUTURE TUNIC
  {
    id: 'tara-m-005',
    name: 'Lagos Grand Boubou & Agbada Tunic',
    subtitle: 'Voluminous ceremonial robe with geometric high-density embroidery',
    fabricTag: 'Egyptian Giza Cotton & Metallic Thread',
    priceINR: 29000,
    gender: 'men',
    culturalCategory: 'African Expressions',
    category: 'African-Inspired',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Royal Gold & White', hex: '#D4AF37' },
      { name: 'Deep Indigo Blue', hex: '#16284F' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'A commanding traditional silhouette across Nigeria and Senegal. Worn with pride at grand celebrations, featuring monumental shoulder drapes and intricate chest embroidery.',
    details: [
      'Includes: Outer Grand Agbada robe, tailored inner tunic, and matching drawstring trousers',
      'High-thread count polished Egyptian cotton damask',
      'Chest panel embroidered with traditional Yoruba iconography'
    ],
    fabricCare: ['Dry clean only'],
    artisanStory: 'Crafted in the vibrant Victoria Island atelier in Lagos, Nigeria, celebrating contemporary African luxury.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 6,
    rating: 4.93,
    reviewCount: 22
  },

  // 15. MEN'S - CONTEMPORARY GLOBAL STREETWEAR
  {
    id: 'tara-m-006',
    name: 'Shibuya Asymmetric Bonded Trench & Kimono Overcoat',
    subtitle: 'Minimalist waterproof wool-gabardine coat with magnetic buckle closures',
    fabricTag: 'Bonded Japanese Wool Gabardine',
    priceINR: 32500,
    originalPriceINR: 38000,
    gender: 'men',
    culturalCategory: 'International Streetwear',
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#141414' },
      { name: 'Concrete Gray', hex: '#58595B' },
      { name: 'Olive Drab', hex: '#3C4035' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tokyo street minimalism meets Savile Row engineering. Cut with an exaggerated drop shoulder, storm lapel, and internal harness straps for hands-free carry.',
    details: [
      'Water-repellent 3-layer bonded wool membraned shell',
      'Matte black Fidlock magnetic buckle waistband',
      'Laser-cut interior pocket with waterproof taped seams'
    ],
    fabricCare: ['Professional dry clean or spot sponge clean'],
    artisanStory: 'Engineered in Tokyo with fabric woven in Osaka, capturing the intersection of streetwear culture and haute couture.',
    isNewArrival: true,
    isTrending: true,
    stockCount: 11,
    rating: 4.95,
    reviewCount: 39
  },

  // 16. MEN'S - ITALIAN LINEN SHIRT
  {
    id: 'tara-m-007',
    name: 'Capri Riviera Relaxed Washed Linen Shirt',
    subtitle: 'Camp collar resort silhouette with genuine mother-of-pearl buttons',
    fabricTag: '100% French Normandy Washed Flax Linen',
    priceINR: 9800,
    gender: 'men',
    culturalCategory: 'European Contemporary',
    category: 'Shirts',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ivory Chalk', hex: '#EBE5D8' },
      { name: 'Azure Mediterranean', hex: '#7E9BB8' },
      { name: 'Olive Sage', hex: '#778271' }
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)'],
    description: 'Breezy Mediterranean nonchalance. Pre-washed for a buttery soft handfeel that softens further with every wear.',
    details: [
      'Open camp collar',
      'Split back yoke for natural movement',
      'Chest patch pocket',
      'Hand-stitched bartacks at stress points'
    ],
    fabricCare: ['Machine wash cold, line dry in shade, light iron or embrace natural rumple'],
    artisanStory: 'Spun from long-staple flax grown in Normandy and finished in Tuscany.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 24,
    rating: 4.87,
    reviewCount: 51
  },

  // 17. WOMEN'S - SILK SALWAR SUIT
  {
    id: 'tara-w-010',
    name: 'Awadh Angrakha Silk Salwar Kameez',
    subtitle: 'Side-tie crossover tunic with gota borders and embroidered afghani pants',
    fabricTag: 'Pure Raw Silk & Tissue Georgette',
    priceINR: 26000,
    gender: 'women',
    culturalCategory: 'Indian Heritage',
    category: 'Salwar Suits',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Turmeric Saffron', hex: '#D97706' },
      { name: 'Pistachio Sage', hex: '#879780' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Inspired by the courts of Lucknow. The crossover Angrakha tie front is finished with hand-crafted latkans and fine silk tassels.',
    details: [
      'Set includes: Angrakha Kurti, Salwar trousers, Tissue Georgette Dupatta',
      'Concealed inner snap buttons for a secure flattering fit'
    ],
    fabricCare: ['Dry clean only'],
    artisanStory: 'Sewn by women artisans in Lucknow upholding traditional Chikan and Mukaish craft legacies.',
    isNewArrival: true,
    isTrending: false,
    stockCount: 9,
    rating: 4.86,
    reviewCount: 27
  },

  // 18. WOMEN'S - LUXURY DOUBLE-BREASTED BLAZER
  {
    id: 'tara-w-011',
    name: 'Sartoriale Double-Faced Cashmere Blazer',
    subtitle: 'Hand-stitched razor-lapel jacket in undyed Mongolian cashmere',
    fabricTag: '100% Double-Faced Cashmere',
    priceINR: 52000,
    originalPriceINR: 59000,
    gender: 'women',
    culturalCategory: 'European Contemporary',
    category: 'Blazers & Outerwear',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#B8A898' },
      { name: 'Midnight Pitch', hex: '#121212' }
    ],
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    description: 'The definitive quiet luxury outerwear piece. Crafted using double-faced split-seam technique where two layers of pure cashmere are hand-stitched invisibly around the perimeter.',
    details: [
      'Completely unlined for featherweight warmth and fluid drape',
      'Genuine buffalo horn buttons',
      'Flap pockets with optional tuck-in'
    ],
    fabricCare: ['Specialist luxury dry clean only'],
    artisanStory: 'Hand-sewn over 24 hours per garment in our atelier outside Florence, Italy.',
    isNewArrival: false,
    isTrending: true,
    isLimitedEdition: true,
    stockCount: 4,
    rating: 5.0,
    reviewCount: 16
  },

  // 19. MEN'S - RELAXED PLEATED TROUSERS
  {
    id: 'tara-m-008',
    name: 'Via Montenapoleone Double-Pleated Gurkha Trousers',
    subtitle: 'High-waisted trousers with cross-over cummerbund waistband and tapered cuff',
    fabricTag: 'English Wool Twill & Cotton Blend',
    priceINR: 14500,
    gender: 'men',
    culturalCategory: 'European Contemporary',
    category: 'Trousers',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Tobacco Brown', hex: '#583D2A' },
      { name: 'Desert Khaki', hex: '#9C917B' },
      { name: 'Charcoal Black', hex: '#2B2B2B' }
    ],
    sizes: ['30 Waist', '32 Waist', '34 Waist', '36 Waist', '38 Waist'],
    description: 'Inspired by military officer Gurkha trousers, elevated with sharp double forward pleats and brass-buckled side straps that negate the need for a belt.',
    details: [
      'Generous 2-inch turned-up cuff hem',
      'Interior curtain waistband to keep shirts tucked',
      'Deep slanted front pockets and rear jetted welt pockets'
    ],
    fabricCare: ['Dry clean or cool gentle wool cycle'],
    artisanStory: 'Pattern cut in Savile Row tradition and tailored with internal curtain waistbands in northern Italy.',
    isNewArrival: false,
    isTrending: true,
    stockCount: 15,
    rating: 4.88,
    reviewCount: 34
  },

  // 20. MEN'S - MINIMALIST STREETWEAR HOODIE & TEE
  {
    id: 'tara-m-009',
    name: 'Atelier Raw-Edge Heavyweight French Terry Hoodie',
    subtitle: '500 GSM custom loopback cotton with boxy dropped silhouette and matte branding',
    fabricTag: '500 GSM Organic Combed French Terry',
    priceINR: 11000,
    gender: 'men',
    culturalCategory: 'International Streetwear',
    category: 'Streetwear',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#2A2928' },
      { name: 'Bone White', hex: '#EAE6DC' },
      { name: 'Faded Olive', hex: '#525547' }
    ],
    sizes: ['S (Relaxed)', 'M (Relaxed)', 'L (Oversized)', 'XL (Oversized)'],
    description: 'Substantial, ultra-heavyweight luxury leisurewear. Features a double-layered crossover hood with no drawstrings for a pure sculptural profile.',
    details: [
      'Seamless kangaroo pouch with concealed side zippers',
      'Ribbed side expansion gussets for comfort',
      'Preshrunk to retain perfect oversized drape'
    ],
    fabricCare: ['Machine wash inside out cold', 'Hang dry'],
    artisanStory: 'Knitted on vintage circular loopwheel machines in Wakayama, Japan, producing dense, indestructible terry cloth.',
    isNewArrival: true,
    isTrending: true,
    stockCount: 22,
    rating: 4.93,
    reviewCount: 58
  }
];

export const CULTURAL_STORIES = [
  {
    id: 'indian-heritage',
    title: 'Indian Heritage',
    subheading: 'Woven Legacies & Timeless Drapes',
    description: 'From the sacred looms of Varanasi and the temple silks of Kanchipuram to the royal Zardozi ateliers of Rajasthan, our Indian collection celebrates centuries of textile mastery.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Pure Silk • Tested Zari • Handloom Weaves'
  },
  {
    id: 'middle-eastern',
    title: 'Middle Eastern Elegance',
    subheading: 'Modesty Elevated to Fine Art',
    description: 'Architectural Abayas, hand-braided Moroccan Kaftans, and pristine Emirati Kanduras crafted in collaboration with Gulf modistes and Mediterranean ateliers.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Flowing Silhouettes • Sfifa Trims • Japanese Nida'
  },
  {
    id: 'european-contemporary',
    title: 'European Contemporary',
    subheading: 'Architectural Tailoring & Pure Cuts',
    description: 'Neapolitan soft shoulders, Biella merino wools, double-faced cashmere blazers, and bias-cut evening gowns cut with razor precision in Italy and France.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Biella Super 150s • Florentine Atelier • Sartoriale'
  },
  {
    id: 'african-expressions',
    title: 'African Expressions',
    subheading: 'Regal Majesty & Geometric Splendour',
    description: 'Handwoven Kente strip cloth from Ghana and grand Yoruba Agbadas transformed into striking international outerwear with bold sculptural geometry.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Bonwire Kente • Grand Agbada • Egyptian Giza'
  },
  {
    id: 'east-asian',
    title: 'East Asian Aesthetics',
    subheading: 'Zen Simplicity & Kyoto Craftsmanship',
    description: 'Authentic Chirimen silk Haori coats, resist-dyed Yuzen botanicals, and origami-inspired draping honoring Japanese artisanal preservation.',
    image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1200&q=85',
    tagline: 'Kyo-Yuzen Dyeing • Chirimen Silk • Nishijin Looms'
  },
  {
    id: 'international-streetwear',
    title: 'International Streetwear',
    subheading: 'Modern Luxury Prêt-à-Porter',
    description: 'Tokyo street minimalism, bonded waterproof wools, Wakayama loopwheel terry, and boxy oversized tailoring for the modern global nomad.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
    tagline: '500 GSM French Terry • Bonded Gabardine • Modular Design'
  }
];
