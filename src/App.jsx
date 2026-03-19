import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Package, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle2,
  Award,
  Globe
} from 'lucide-react';

// --- Data ---
const PRODUCTS = [
  {
    id: '1',
    name: 'Moringa powder',
    category: 'Superfoods',
    description: 'Nutrient-dense organic moringa leaves, finely ground for maximum absorption.',
    longDescription: 'Our Moringa powder is sourced from the fertile lands of Southern India. Known as the "Miracle Tree", Moringa is packed with over 90 nutrients and 46 antioxidants.',
    benefits: ['Rich in Vitamins A, C, and E', 'Boosts Immune System', 'Natural Energy Enhancer', 'Anti-inflammatory Properties'],
    image: '/assets/images/Moringa powder.jpg'
  },
  {
    id: '2',
    name: 'Lakadong Turmeric',
    category: 'Spices',
    description: 'High-curcumin turmeric root powder, sourced from the finest organic farms.',
    longDescription: 'Sourced from the Erode region, famous for its high-quality turmeric. Our powder contains 5-7% curcumin, ensuring maximum therapeutic benefits.',
    benefits: ['Powerful Anti-inflammatory', 'High Antioxidant Content', 'Supports Joint Health', 'Improves Brain Function'],
    image: '/assets/images/Lakadong Turmeric.jpg'
  },
  {
    id: '3',
    name: 'Saffron Strands',
    category: 'Spices',
    description: 'Hand-picked Grade A saffron threads, known for intense aroma and color.',
    longDescription: 'Authentic Kashmiri Mongra Saffron. Each strand is hand-picked during the autumn harvest in Pampore, ensuring the highest grade of purity.',
    benefits: ['Mood Enhancer', 'Rich in Carotenoids', 'Supports Eye Health', 'Natural Skin Brightener'],
    image: '/assets/images/Saffron Strands.jpg'
  },
  {
    id: '4',
    name: 'Shatawari',
    category: 'Herbs',
    description: 'Traditional Ayurvedic herb for hormonal balance and vitality.',
    longDescription: 'Shatawari (Asparagus racemosus) is the premier Ayurvedic herb for female health. Our organic roots are sustainably harvested and processed.',
    benefits: ['Hormonal Balance', 'Supports Reproductive Health', 'Adaptogenic Properties', 'Digestive Support'],
    image: '/assets/images/Shatawari.jpg'
  },
  {
    id: '5',
    name: 'Ashwgandha',
    category: 'Herbs',
    description: 'Powerful adaptogen to help manage stress and improve energy levels.',
    longDescription: 'Known as "Indian Ginseng", our Ashwagandha is standardized for high withanolide content to ensure potency and effectiveness.',
    benefits: ['Reduces Stress & Anxiety', 'Improves Sleep Quality', 'Enhances Physical Performance', 'Supports Cognitive Function'],
    image: '/assets/images/Ashwagandha.jpg'
  },
  {
    id: '6',
    name: 'Rice',
    category: 'Grains',
    description: 'Long-grain, aromatic basmati rice aged to perfection for superior taste.',
    longDescription: 'Grown in the foothills of the Himalayas, our Basmati rice is aged for 2 years to develop its characteristic aroma and extra-long grains.',
    benefits: ['Low Glycemic Index', 'Gluten-Free', 'Aromatic & Flavorful', 'Perfect Grain Elongation'],
    image: '/assets/images/Rice.jpg'
  },
  {
    id: '7',
    name: 'Alfalfa Powder',
    category: 'Superfoods',
    description: 'A nutrient-rich powder from the leaves of the alfalfa plant.',
    longDescription: 'Our Alfalfa Powder is a powerhouse of vitamins and minerals, perfect for smoothies and health drinks.',
    benefits: ['Rich in Vitamin K', 'Good Source of Antioxidants', 'May Help Lower Cholesterol', 'Supports Healthy Digestion'],
    image: '/assets/images/Alfalfa powder.jpg'
  }
];

const CATEGORIES = [
  { name: 'Superfoods', icon: Leaf, count: 12 },
  { name: 'Spices', icon: Award, count: 8 },
  { name: 'Herbs', icon: ShieldCheck, count: 15 },
  { name: 'Grains', icon: Package, count: 5 }
];

// --- Components ---

const ProductModal = ({ product, onClose }) => {
  const handleWhatsAppInquiry = (productName) => {
    const phone = "919217914166";
    const message = productName 
      ? `Hello, I am interested in inquiring about ${productName}. Please provide more details.`
      : "Hello, I am interested in your products. Please provide more details.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-brand-accent w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="md:w-1/2 aspect-[4/5] md:aspect-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh] md:max-h-none">
          <span className="text-brand-secondary font-bold uppercase tracking-widest text-xs mb-4 block">
            {product.category}
          </span>
          <h2 className="text-4xl font-serif text-brand-primary mb-6">{product.name}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.longDescription}
          </p>

          <div className="mb-8">
            <h4 className="font-serif text-xl mb-4 text-brand-primary">Key Benefits</h4>
            <ul className="grid grid-cols-1 gap-3">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="text-brand-secondary shrink-0" size={18} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => {
              onClose();
              handleWhatsAppInquiry(product.name);
            }}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
          >
            Inquire on WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppInquiry = () => {
    const phone = "919217914166";
    const message = "Hello, I am interested in your products. Please provide more details.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-[#2d4d2e] tracking-tight">
              Natural PranVayu
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection('products')} className="text-sm font-medium hover:text-brand-secondary transition-colors">Products</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-brand-secondary transition-colors">Our Story</button>
            <button onClick={() => scrollToSection('why-us')} className="text-sm font-medium hover:text-brand-secondary transition-colors">Why Choose Us</button>
            <button 
              onClick={handleWhatsAppInquiry}
              className="bg-[#2d4d2e] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
            >
              Inquire Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-black/5 px-4 pt-2 pb-6 space-y-4"
        >
          <button onClick={() => scrollToSection('products')} className="block text-lg font-serif w-full text-left">Products</button>
          <button onClick={() => scrollToSection('about')} className="block text-lg font-serif w-full text-left">Our Story</button>
          <button onClick={() => scrollToSection('why-us')} className="block text-lg font-serif w-full text-left">Why Choose Us</button>
          <button 
            onClick={handleWhatsAppInquiry}
            className="w-full block bg-[#2d4d2e] text-white px-6 py-3 rounded-xl text-center font-medium"
          >
            Inquire Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [formData, setFormData] = useState({ name: '', email: '', product: '' });

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();
    const phone = "919217914166";
    const message = `Hello, I am ${formData.name} (${formData.email}). I am interested in inquiring about ${formData.product || 'your products'}. Please provide more details.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#fbfaf7] pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f4e4c1] text-[#b48c34] text-[10px] font-bold uppercase tracking-widest mb-8">
              Global Natural Exports
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-[84px] font-serif leading-[1.05] text-[#2d4d2e] mb-8">
              Nature's Purest <br />
              <span className="italic text-[#b48c34]">Essence</span> Delivered.
            </h1>
            <p className="text-lg text-gray-500 mb-12 max-w-lg leading-relaxed">
              Natural PranVayu Exports brings you the finest organic superfoods and spices from the heart of India. Sustainably sourced, ethically processed.
            </p>

            {/* Quick Inquiry Form */}
            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-black/5 max-w-md">
              <h3 className="text-xl font-serif mb-6 text-gray-800">Quick Inquiry</h3>
              <form className="space-y-4" onSubmit={handleWhatsAppInquiry}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#b48c34] focus:ring-1 focus:ring-[#b48c34] outline-none text-sm placeholder:text-gray-400" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#b48c34] focus:ring-1 focus:ring-[#b48c34] outline-none text-sm placeholder:text-gray-400" 
                  />
                </div>
                <div className="relative">
                  <select 
                    required 
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#b48c34] focus:ring-1 focus:ring-[#b48c34] outline-none text-sm appearance-none text-gray-700"
                  >
                    <option value="">Select Product</option>
                    <option>Moringa powder</option>
                    <option>Lakadong Turmeric</option>
                    <option>Saffron Strands</option>
                    <option>Shatawari</option>
                    <option>Ashwgandha</option>
                    <option>Rice</option>
                    <option>Alfalfa Powder</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronRight className="rotate-90" size={16} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#b48c34] text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#b48c34]/20">
                  Get Pricing on WhatsApp <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src="/Hero-image.png" 
                alt="Natural Products" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Badge */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="absolute top-1/3 right-6 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-black/5 max-w-[200px] cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">Certified Organic</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                  100% pure, lab-tested quality for international standards.
                </p>
              </motion.div>
            </div>
            
            {/* Decorative background shape */}
            <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-[#f4e4c1] rounded-full blur-3xl opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const QuickCategories = ({ scrollToSection }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl border border-black/5 bg-brand-accent/30 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => scrollToSection('products')}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <cat.icon size={32} />
              </div>
              <h3 className="text-xl font-serif mb-2">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProduct = ({ onQuickView }) => {
  return (
    <section className="py-24 bg-brand-primary text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="">
            <div className="relative">
              <img 
                src="/assets/images/Moringa powder.jpg" 
                alt="Featured Moringa" 
                className="rounded-[60px] shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -inset-4 border border-white/20 rounded-[64px] -z-10" />
            </div>
          </div>
          
          <div className="">
            <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Product Spotlight</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              Moringa Powder: <br />
              <span className="italic opacity-80">The Miracle Tree</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Our Moringa powder is sourced from the fertile lands of Southern India. Packed with over 90 nutrients and 46 antioxidants, it is nature's most nutrient-dense superfood for vitality and wellness.
            </p>
            <ul className="space-y-4 mb-12">
              {['Rich in Vitamins A, C, and E', 'Boosts Immune System', 'Natural Energy Enhancer', 'Anti-inflammatory Properties'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="text-brand-secondary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => onQuickView(PRODUCTS.find(p => p.name === 'Moringa powder'))}
              className="px-10 py-4 border border-white/30 rounded-full hover:bg-white hover:text-brand-primary transition-all font-bold"
            >
              View Specifications
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-secondary/5 skew-x-12 transform translate-x-1/2" />
    </section>
  );
};

const ProductGrid = ({ onQuickView }) => {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProducts = PRODUCTS
    .filter(p => filter === 'All' || p.category === filter)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  return (
    <section id="products" className="py-24 bg-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif mb-4">From the Basket</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Premium quality natural products processed with care and exported globally.</p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {['All', ...new Set(PRODUCTS.map(p => p.category))].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-brand-primary text-white shadow-lg' 
                    : 'neo-button text-gray-600 hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Sort by Name:</span>
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="neo-button p-2.5 rounded-xl text-brand-primary"
            >
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className="group neo-flat p-4 rounded-[40px] transition-all"
            >
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => onQuickView(product)}
                    className="bg-white text-brand-primary px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform"
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-secondary transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryBanner = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-accent rounded-[60px] p-12 md:p-20 relative overflow-hidden neo-flat"
        >
          <div className="relative z-10 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-brand-primary"
            >
              From Indian Soil to <br />
              <span className="italic">Global Doorsteps.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              At Natural PranVayu, we believe in the power of nature. Our journey started with a simple mission: to bridge the gap between local organic farmers and the global market, ensuring that the purity of Indian herbs and spices reaches every corner of the world.
            </motion.p>
            <div className="flex flex-wrap gap-8">
              {[
                { val: '15+', label: 'Countries Served' },
                { val: '500+', label: 'Farmers Partnered' },
                { val: '100%', label: 'Organic Certified' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <p className="text-4xl font-serif text-brand-secondary mb-1">{stat.val}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none"
          >
             <Globe size={600} className="text-brand-primary translate-x-1/4 translate-y-1/4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: 'Ethical Sourcing', desc: 'Direct partnerships with organic farmers ensuring fair trade.', icon: Leaf },
    { title: 'Global Logistics', desc: 'Efficient supply chain for timely international delivery.', icon: Truck },
    { title: 'Quality Assurance', desc: 'Multi-level lab testing for purity and potency.', icon: ShieldCheck },
    { title: 'Custom Packaging', desc: 'Tailored packaging solutions to meet market needs.', icon: Package }
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Excellence</span>
          <h2 className="text-5xl font-serif">Why Partner with Us?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-[40px] border border-black/5 hover:border-brand-secondary/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-brand-accent flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-serif mb-4">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section className="py-20 bg-brand-accent/50 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex flex-col items-center gap-2">
            <Award size={48} />
            <span className="text-[10px] font-bold uppercase tracking-widest">ISO 9001:2015</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={48} />
            <span className="text-[10px] font-bold uppercase tracking-widest">HACCP Certified</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf size={48} />
            <span className="text-[10px] font-bold uppercase tracking-widest">USDA Organic</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 size={48} />
            <span className="text-[10px] font-bold uppercase tracking-widest">FSSAI Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const PackagingSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-serif mb-8 leading-tight">
              Premium Packaging <br />
              <span className="italic">Built for Export.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We understand that international transit requires robust and secure packaging. Our solutions are designed to preserve freshness, aroma, and quality while complying with global labeling standards.
            </p>
            <div className="space-y-6">
              {[
                { t: 'Vacuum Sealed', d: 'Ensures zero moisture entry and long shelf life.' },
                { t: 'Bulk & Retail', d: 'Available in 100g to 25kg industrial packs.' },
                { t: 'Eco-Friendly', d: 'Sustainable materials that reduce environmental impact.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                      <CheckCircle2 size={14} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.t}</h4>
                    <p className="text-xs text-gray-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <img src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=400&auto=format&fit=crop" alt="Packaging 1" className="rounded-3xl shadow-lg" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1628102422203-997c88195867?q=80&w=400&auto=format&fit=crop" alt="Packaging 2" className="rounded-3xl shadow-lg mt-12" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
  );
};

const InquiryForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    product: '', 
    quantity: '', 
    message: '' 
  });

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();
    const phone = "919217914166";
    const waMessage = `Hello, I am ${formData.name} from ${formData.company}. 
Email: ${formData.email}
Product: ${formData.product}
Quantity: ${formData.quantity}
Requirements: ${formData.message}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  return (
    <section id="inquiry" className="py-24 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">Request a Quote</h2>
            <p className="text-white/60">Fill out the form below and we will connect with you on WhatsApp instantly.</p>
          </div>
          
          <form className="grid md:grid-cols-2 gap-8" onSubmit={handleWhatsAppInquiry}>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Company Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors" 
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Product of Interest</label>
                <select 
                  required 
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-brand-primary">Select a product</option>
                  <option className="bg-brand-primary">Moringa Powder</option>
                  <option className="bg-brand-primary">Lakadong Turmeric</option>
                  <option className="bg-brand-primary">Saffron Strands</option>
                  <option className="bg-brand-primary">Rice</option>
                  <option className="bg-brand-primary">Alfalfa Powder</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Order Quantity (Approx)</label>
                <input 
                  type="text" 
                  required 
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Message / Requirements</label>
                <textarea 
                  rows={1} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-secondary outline-none transition-colors"
                ></textarea>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-brand-secondary text-white py-5 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-2xl shadow-brand-secondary/20">
                Submit Inquiry via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-accent pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-brand-primary mb-6">Natural PranVayu</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Premium exporters of natural and organic products. Dedicated to quality, sustainability, and global health.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:neo-button transition-all">
                <Globe size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:neo-button transition-all">
                <ShieldCheck size={18} />
              </a>
              <a href="mailto:naturalpranavayu@gmail.com" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:neo-button transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-brand-primary">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Home</a></li>
              <li><a href="#products" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Products</a></li>
              <li><a href="#about" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Our Story</a></li>
              <li><a href="#inquiry" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-brand-primary">Products</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Moringa Powder</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Lakadong Turmeric & Saffron Strands</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Ayurvedic Herbs</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-secondary transition-colors">Basmati Rice</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-8 text-brand-primary">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Mail className="text-brand-secondary shrink-0" size={20} />
                <span className="text-sm text-gray-500">naturalpranavayu@gmail.com</span>
              </li>
              <li className="flex gap-4">
                <MapPin className="text-brand-secondary shrink-0" size={20} />
                <span className="text-sm text-gray-500">New Delhi, India <br /> Global Export Hub</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-brand-secondary shrink-0" size={20} />
                <span className="text-sm text-gray-500">+91 92179 14166</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">© 2026 Natural PranVayu Exports. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="fixed top-40 left-10 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="fixed bottom-40 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <Hero />
      <QuickCategories scrollToSection={scrollToSection} />
      <FeaturedProduct onQuickView={setSelectedProduct} />
      <ProductGrid onQuickView={setSelectedProduct} />
      <StoryBanner />
      <WhyChooseUs />
      <Certifications />
      <PackagingSection />
      <InquiryForm />
      <Footer />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
