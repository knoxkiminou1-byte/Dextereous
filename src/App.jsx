import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Calendar, 
  Instagram, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Menu, 
  X,
  Sparkles,
  Camera,
  Search,
  ArrowRight,
  MessageCircle,
  Mail,
  CheckCircle2,
  Send
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Global Constants ---
const BOOKING_URL = "https://book.squareup.com/appointments/qcqwb3bnqni8yy/location/LP3M72E5EMT6N/services?buttonTextColor=ffffff&color=212121&locale=en&referrer=so";
const BRAND_TITLE = "DEXTEROUS";
const BRAND_SUB = "BARBER LOUNGE";

// --- Utility Components ---

const SafeImage = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <Scissors className="w-8 h-8 text-white/5 animate-pulse" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover grayscale transition-all duration-1000 ${loading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
      />
    </div>
  );
};

const MagneticButton = ({ children, variant = 'primary', className = '', href, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const styles = {
    primary: "bg-white text-black hover:bg-neutral-200",
    outline: "bg-transparent border border-white text-white hover:bg-white hover:text-black",
    ghost: "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black",
    dark: "bg-black border border-white/30 text-white hover:bg-white hover:text-black"
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      className={`relative inline-block cursor-pointer px-8 py-3 rounded-none font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.div>
  );

  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
};

// --- Page Views ---

const HomePage = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <SafeImage src="https://images.unsplash.com/photo-1512690118275-1aa3c2417b16?q=80&w=2000" className="w-full h-full" alt="Lounge Hero" />
      </div>
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="text-5xl md:text-[8rem] font-serif italic text-white leading-tight mb-2 tracking-tighter">
            DEXTEROUS<br/>BARBER LOUNGE
          </h1>
          <p className="text-white/80 uppercase tracking-[0.6em] text-[14px] font-medium mb-12">
            Precision . Style . Confidence
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ServicePage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
    <div className="text-center mb-32">
        <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-4">DEXTEROUS BARBER LOUNGE</h2>
        <p className="text-[10px] tracking-[0.4em] uppercase font-black text-white/50 border-t border-white/10 pt-4 inline-block">Choose one of my specialties</p>
        <div className="mt-8">
            <MagneticButton href={BOOKING_URL} variant="primary">Book Now</MagneticButton>
        </div>
    </div>
    
    <div className="space-y-32">
      {[
        { 
          name: "THE PERFORMANCE, DEXTEROUS CUT", 
          price: "$70 | 45min", 
          desc: "Experience the ultimate precision with 'The Performance, Dexterous Cut' service. Benefit from a meticulously designed cut tailored to your needs, ensuring a comfortable fit and an enhanced grip. Haircut, Beard Trim and Razor.", 
          img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200" 
        },
        { 
          name: "DEXTEROUS CUT, RAZOR FINISH", 
          price: "$55 | 30min", 
          desc: "Experience the art of precise cutting and a smooth finish with our razor haircut service. Our skilled stylists will create versatile styles that suit your unique look. Book your appointment now for a truly exceptional grooming experience!", 
          img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200" 
        },
        { 
          name: "DEXTEROUS CUT", 
          price: "$50 | 30min", 
          desc: "Experience the expertise of our professional stylists who offer a wide variety of styles to suit your preferences. Enjoy top-notch service and book your appointment now for a quality haircut experience like no other!", 
          img: "https://images.unsplash.com/photo-1605497746481-9885868ef2b4?q=80&w=1200" 
        },
        { 
          name: "DEXTEROUS, LINE UP", 
          price: "$25 | 15min", 
          desc: "Experience the ultimate in personalized service with Line Up - a premium appointment booking that caters exclusively to your needs. Our expert team ensures a seamless experience, combining versatile designs, high-quality materials, and functional features.", 
          img: "https://images.unsplash.com/photo-1512690118275-1aa3c2417b16?q=80&w=1200" 
        },
        { 
          name: "DEXTEROUS, BEARD TRIM", 
          price: "$35 | 30min", 
          desc: "Experience the art of precision trimming with our Dexterous Beard Trim service. Our skilled professionals ensure easy handling and deliver impeccable results, leaving you looking sharp and well-groomed.", 
          img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200" 
        }
      ].map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1 w-full aspect-[4/3] overflow-hidden grayscale">
            <SafeImage src={s.img} className="w-full h-full" alt={s.name} />
          </div>
          <div className="flex-1 space-y-6 pt-4">
            <h3 className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-black">{s.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">{s.desc}</p>
            <p className="text-white text-lg font-serif italic">{s.price}</p>
            <MagneticButton variant="dark" href={BOOKING_URL}>Book Now</MagneticButton>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const PortfolioPage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
    <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-4 tracking-tighter uppercase">Dexterous Barber Lounge</h2>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
      {[
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80",
        "https://images.unsplash.com/photo-1599351431247-f5793383897d?q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80",
        "https://images.unsplash.com/photo-1605497746481-9885868ef2b4?q=80",
        "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80",
        "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80",
        "https://images.unsplash.com/photo-1512690118275-1aa3c2417b16?q=80",
        "https://images.unsplash.com/photo-1593702295094-ada225545f43?q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80",
        "https://images.unsplash.com/photo-1599351431247-f5793383897d?q=80"
      ].map((url, i) => (
        <div key={i} className="aspect-square grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair">
          <SafeImage src={url} className="w-full h-full" alt="Work" />
        </div>
      ))}
    </div>

    {/* Reviews Section */}
    <div className="mt-48 text-center">
      <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-24 tracking-tighter uppercase">Ratings & Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
        {[
          "Very happy with the removal of a hefty growth from my head and beard. Pleasant and competent hair stylist! Thanks.",
          "Loren is always friendly and always does a great job with my hair.",
          "It was simply an amazing hair day! Dexterous is wonderful. He listens to exactly what you want and pulls it off like it's nothing!",
          "Simply put, Dexterous is a godsend! He had so much patience with my young son and provided us with such a loving experience!",
          "Been going to Dexterous for years and will be going for YEARS to come! Thank you Dexterous for always making me look amazing!",
          "I went to see Dexterous today with no idea what I wanted, I just wanted a change. He had great ideas!"
        ].map((review, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-white text-white" />)}
            </div>
            <p className="text-white/80 italic text-xl leading-relaxed max-w-md">"{review}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactPage = () => (
    <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-8 tracking-tighter uppercase">Dexterous Barber Lounge</h2>
            <p className="text-[12px] tracking-[0.4em] uppercase font-black text-white/80">Ask Dexterous a Question</p>
        </div>
        
        <form className="w-full max-w-2xl space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30 font-serif" 
            />
            <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30 font-serif" 
            />
            <textarea 
                placeholder="Message" 
                rows={6}
                className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30 font-serif resize-none" 
            />
            <div className="text-center pt-8">
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-loose mb-12 max-w-md mx-auto">
                    You may receive marketing and promotional materials. Contact the merchant for their privacy practices.
                    <br/>
                    This form is protected by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
                </p>
                <MagneticButton variant="dark" className="px-12 py-5 bg-white text-black border-none hover:bg-neutral-200">Send</MagneticButton>
            </div>
        </form>
    </section>
);

const AboutPage = () => (
    <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="aspect-[4/5] overflow-hidden grayscale border border-white/10">
                <SafeImage src="https://images.unsplash.com/photo-1512690118275-1aa3c2417b16?q=80&w=1200" className="w-full h-full" alt="Lounge" />
            </div>
            <div className="space-y-12">
                <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter uppercase leading-none">Our Craft</h2>
                <p className="text-white/50 text-xl leading-relaxed">
                    Founded in Newark, CA, Dexterous Barber Lounge is where artistry meets heritage. We specialize in precision blends, razor-sharp edges, and the classic lounge atmosphere. Our mission is simple: engineering confidence one client at a time.
                </p>
                <div className="pt-12 border-t border-white/10 flex gap-12">
                    <div>
                        <p className="text-3xl font-serif italic">Newark</p>
                        <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/30 mt-2">California</p>
                    </div>
                    <div>
                        <p className="text-3xl font-serif italic">4.3★</p>
                        <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/30 mt-2">Local Rating</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <Scissors className="w-16 h-16 text-white mx-auto mb-10" />
        <h1 className="text-5xl md:text-[8rem] font-serif italic text-white leading-none tracking-tighter">DEXTEROUS</h1>
        <div className="mt-10 h-[1px] w-64 bg-white/20 mx-auto overflow-hidden">
          <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-full bg-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            
            {/* Header / Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
              <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
                <div className="flex flex-col">
                    <span className="text-2xl font-serif italic text-white tracking-tighter uppercase leading-none">DEXTEROUS</span>
                    <span className="text-[8px] tracking-[0.4em] font-black border-t border-white pt-1">BARBER LOUNGE</span>
                </div>
              </div>
              <div className="hidden lg:flex gap-10 items-center text-[10px] font-black uppercase tracking-[0.3em]">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Service', id: 'service' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'Contact', id: 'contact' },
                  { label: 'About', id: 'about' }
                ].map(item => (
                  <button key={item.id} onClick={() => navigate(item.id)} className={`transition-colors ${page === item.id ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                    {item.label}
                  </button>
                ))}
                <div className="h-10 w-px bg-white/10" />
                <button className="text-white/60 hover:text-white transition-colors"><Search className="w-4 h-4" /></button>
                <MagneticButton variant="outline" href={BOOKING_URL}>Book Now</MagneticButton>
              </div>
              <button onClick={() => setMenuOpen(true)} className="lg:hidden p-4 bg-white/5 rounded-full">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </nav>

            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-[60] bg-black p-12 flex flex-col items-center justify-center space-y-8">
                  <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-white"><X className="w-10 h-10" /></button>
                  {['Home', 'Service', 'Portfolio', 'Contact', 'About'].map(item => (
                    <button key={item} onClick={() => navigate(item.toLowerCase())} className="text-5xl font-serif italic hover:text-white/50">{item}</button>
                  ))}
                  <MagneticButton href={BOOKING_URL} className="mt-8">Book Online</MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>

            <main>
              {page === 'home' && <HomePage />}
              {page === 'service' && <ServicePage />}
              {page === 'portfolio' && <PortfolioPage />}
              {page === 'contact' && <ContactPage />}
              {page === 'about' && <AboutPage />}
            </main>

            {/* Global Footer */}
            <footer className="bg-black pt-40 pb-20 px-8 border-t border-white/10">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-20 mb-32 items-start">
                  <div className="flex flex-col items-start gap-4">
                    <span className="text-2xl font-serif italic text-white tracking-tighter uppercase leading-none">DEXTEROUS</span>
                    <span className="text-[8px] tracking-[0.4em] font-black border-t border-white pt-1">BARBER LOUNGE</span>
                  </div>
                  <div className="max-w-md w-full">
                    <div className="flex gap-4">
                      <input type="email" placeholder="Email" className="flex-1 bg-black border border-white/20 p-5 outline-none focus:border-white transition-all text-white text-xs font-serif italic placeholder:text-white/20" />
                      <button className="px-8 py-5 border border-white text-white hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">Sign Up</button>
                    </div>
                    <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] mt-8 leading-loose">
                        This form is protected by reCAPTCHA and the Google <span className="underline decoration-white/20">Privacy Policy</span> and <span className="underline decoration-white/20">Terms of Service</span> apply.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5">
                  <div className="flex gap-4 items-center">
                    {/* Payment Icons Mock */}
                    {[
                        { label: 'S', color: 'bg-[#00D632]' }, // CashApp
                        { label: 'Pay', color: 'bg-white text-black' }, // Apple Pay
                        { label: 'G', color: 'bg-white text-black' }, // Google Pay
                        { label: 'VISA', color: 'bg-white text-black' },
                        { label: 'M', color: 'bg-white text-black' },
                        { label: 'A', color: 'bg-white text-black' },
                    ].map((p, i) => (
                      <div key={i} className={`h-6 px-3 rounded-sm flex items-center justify-center text-[6px] font-black uppercase ${p.color}`}>{p.label}</div>
                    ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 • Newark, CA • Designed by AAFC</p>
                </div>
              </div>
            </footer>

            {/* Floating Widget */}
            <a href="sms:+15105576921" className="fixed bottom-8 right-8 z-[55] bg-white text-black px-6 py-4 rounded-md flex items-center gap-3 shadow-2xl hover:scale-105 transition-all group">
              <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Text us</span>
            </a>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
