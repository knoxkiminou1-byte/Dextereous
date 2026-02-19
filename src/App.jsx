import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Menu, 
  X,
  Search,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOKING_URL = "https://book.squareup.com/appointments/qcqwb3bnqni8yy/location/LP3M72E5EMT6N/services?buttonTextColor=ffffff&color=212121&locale=en&referrer=so";

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { title: 'text-xl', sub: 'text-[7px] tracking-[0.3em]', dash: 'w-4' },
    md: { title: 'text-2xl', sub: 'text-[8px] tracking-[0.4em]', dash: 'w-6' },
    lg: { title: 'text-4xl md:text-5xl', sub: 'text-[10px] tracking-[0.5em]', dash: 'w-8' },
    xl: { title: 'text-5xl md:text-[5rem]', sub: 'text-[12px] md:text-[14px] tracking-[0.5em]', dash: 'w-10' },
    hero: { title: 'text-5xl md:text-[7rem]', sub: 'text-[12px] md:text-[16px] tracking-[0.5em]', dash: 'w-12' },
  };
  const s = sizes[size];
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className={`${s.title} font-bold text-white tracking-[0.15em] uppercase leading-none`} style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>DEXTEROUS</span>
      <div className="flex items-center gap-3 mt-2">
        <div className={`h-[1px] ${s.dash} bg-white`} />
        <span className={`${s.sub} font-bold text-white uppercase leading-none`} style={{ fontFamily: "'Arial', 'Helvetica Neue', sans-serif" }}>BARBER LOUNGE</span>
        <div className={`h-[1px] ${s.dash} bg-white`} />
      </div>
    </div>
  );
};

const SafeImage = ({ src, alt, className, grayscale = true }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition-all duration-1000 ${grayscale ? 'grayscale' : ''} ${loading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
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
    dark: "bg-black border border-white/30 text-white hover:bg-white hover:text-black",
    send: "bg-white text-black border border-white hover:bg-neutral-200",
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const HomePage = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <SafeImage src="/images/hero-barbershop.jpg" className="w-full h-full" alt="Barbershop" grayscale={true} />
      </div>
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeUp} custom={0.3}>
            <BrandLogo size="hero" />
          </motion.div>
          <motion.p variants={fadeUp} custom={0.6} className="text-white/70 uppercase tracking-[0.6em] text-[12px] md:text-[14px] font-medium mt-10">
            Precision . Style . Confidence
          </motion.p>
          <motion.div variants={fadeUp} custom={0.9} className="mt-12">
            <MagneticButton href={BOOKING_URL} variant="outline">Book Your Appointment</MagneticButton>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity }} 
          className="w-[1px] h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
};

const ServicePage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-32">
      <motion.div variants={fadeUp}>
        <BrandLogo size="lg" />
      </motion.div>
      <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase font-black text-white/50 border-t border-white/10 pt-4 inline-block mt-8">Choose one of my specialties</motion.p>
      <motion.div variants={fadeUp} className="mt-8">
        <MagneticButton href={BOOKING_URL} variant="primary">Book Now</MagneticButton>
      </motion.div>
    </motion.div>
    
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
        <motion.div 
          key={i} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={staggerContainer}
          className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-start`}
        >
          <motion.div variants={i % 2 === 0 ? slideInLeft : slideInRight} className="flex-1 w-full aspect-[4/3] overflow-hidden">
            <SafeImage src={s.img} className="w-full h-full" alt={s.name} grayscale={true} />
          </motion.div>
          <motion.div variants={i % 2 === 0 ? slideInRight : slideInLeft} className="flex-1 space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-white/30" />
              <h3 className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-black">{s.name}</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">{s.desc}</p>
            <p className="text-white text-lg font-bold tracking-wide">{s.price}</p>
            <MagneticButton variant="dark" href={BOOKING_URL}>Book Now</MagneticButton>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </section>
);

const PortfolioPage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
      <motion.div variants={fadeUp}>
        <BrandLogo size="lg" />
      </motion.div>
      <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase font-black text-white/50 mt-6">Our Work</motion.p>
    </motion.div>
    
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-3 gap-2"
    >
      {[
        "/images/portfolio1.webp",
        "/images/portfolio2.webp",
        "/images/portfolio3.webp",
        "/images/portfolio4.webp",
        "/images/portfolio5.webp",
        "/images/portfolio6.webp",
      ].map((url, i) => (
        <motion.div 
          key={i} 
          variants={scaleIn}
          className="aspect-square overflow-hidden group cursor-crosshair relative"
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10" />
          <img 
            src={url} 
            alt={`Portfolio ${i + 1}`} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
        </motion.div>
      ))}
    </motion.div>

    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={staggerContainer}
      className="mt-48 text-center"
    >
      <motion.div variants={fadeUp}>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-[0.1em] uppercase">Ratings & Reviews</h2>
        <div className="flex items-center justify-center gap-3 mb-24">
          <div className="h-[1px] w-12 bg-white/30" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/50">What Our Clients Say</span>
          <div className="h-[1px] w-12 bg-white/30" />
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
        {[
          "Very happy with the removal of a hefty growth from my head and beard. Pleasant and competent hair stylist! Thanks.",
          "Loren is always friendly and always does a great job with my hair.",
          "It was simply an amazing hair day! Dexterous is wonderful. He listens to exactly what you want and pulls it off like it's nothing!",
          "Simply put, Dexterous is a godsend! He had so much patience with my young son and provided us with such a loving experience!",
          "Been going to Dexterous for years and will be going for YEARS to come! Thank you Dexterous for always making me look amazing!",
          "I went to see Dexterous today with no idea what I wanted, I just wanted a change. He had great ideas!"
        ].map((review, i) => (
          <motion.div key={i} variants={fadeUp} className="flex flex-col items-center space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-white text-white" />)}
            </div>
            <p className="text-white/80 italic text-xl leading-relaxed max-w-md">"{review}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const ContactPage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
      <motion.div variants={fadeUp}>
        <BrandLogo size="lg" />
      </motion.div>
      <motion.p variants={fadeUp} className="text-[12px] tracking-[0.4em] uppercase font-black text-white/80 mt-8">Ask Dexterous a Question</motion.p>
    </motion.div>
    
    <motion.form 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={staggerContainer}
      className="w-full max-w-2xl space-y-4" 
      onSubmit={(e) => e.preventDefault()}
    >
      <motion.div variants={fadeUp}>
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30" 
        />
      </motion.div>
      <motion.div variants={fadeUp}>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30" 
        />
      </motion.div>
      <motion.div variants={fadeUp}>
        <textarea 
          placeholder="Message" 
          rows={6}
          className="w-full bg-black border border-white/20 p-4 outline-none focus:border-white transition-all text-white placeholder:text-white/30 resize-none" 
        />
      </motion.div>
      <motion.div variants={fadeUp} className="text-center pt-8">
        <p className="text-[10px] text-white/40 uppercase tracking-widest leading-loose mb-12 max-w-md mx-auto">
          You may receive marketing and promotional materials. Contact the merchant for their privacy practices.
          <br/>
          This form is protected by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
        </p>
        <MagneticButton variant="send" className="px-12 py-5">Send</MagneticButton>
      </motion.div>
    </motion.form>
  </section>
);

const AboutPage = () => (
  <section className="py-48 px-6 max-w-7xl mx-auto min-h-screen">
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={staggerContainer}
      className="grid md:grid-cols-2 gap-24 items-center"
    >
      <motion.div variants={slideInLeft} className="aspect-[4/5] overflow-hidden border border-white/10">
        <SafeImage src="/images/shop.webp" className="w-full h-full" alt="Dexterous Barber Lounge" grayscale={true} />
      </motion.div>
      <motion.div variants={slideInRight} className="space-y-12">
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-[0.05em] uppercase leading-none">Our Craft</h2>
        <div className="h-[1px] w-16 bg-white/30" />
        <p className="text-white/50 text-xl leading-relaxed">
          Founded in Newark, CA, Dexterous Barber Lounge is where artistry meets heritage. We specialize in precision blends, razor-sharp edges, and the classic lounge atmosphere. Our mission is simple: engineering confidence one client at a time.
        </p>
        <div className="pt-12 border-t border-white/10 flex gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <p className="text-3xl font-bold">Newark</p>
            <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/30 mt-2">California</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <p className="text-3xl font-bold">4.3<span className="text-white/50">&#9733;</span></p>
            <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/30 mt-2">Local Rating</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
          <MagneticButton href={BOOKING_URL} variant="outline">Visit Us</MagneticButton>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
);

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(onComplete, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: phase >= 0 ? 1 : 0, y: phase >= 0 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-5xl md:text-[6rem] font-bold text-white tracking-[0.15em] uppercase leading-none block" style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}>DEXTEROUS</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scaleX: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center gap-3 mt-4"
        >
          <div className="h-[1px] w-10 bg-white" />
          <span className="text-[11px] md:text-[14px] font-bold text-white uppercase tracking-[0.5em] leading-none" style={{ fontFamily: "'Arial', 'Helvetica Neue', sans-serif" }}>BARBER LOUNGE</span>
          <div className="h-[1px] w-10 bg-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 h-[1px] w-64 bg-white/20 mx-auto overflow-hidden"
        >
          <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="h-full w-full bg-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const PaymentIcons = () => (
  <div className="flex gap-3 items-center flex-wrap">
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-[#00D632]">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="M17.5 6.5l-3.3 3.3c-.4-.3-.9-.5-1.5-.6V5.5h-1.5v3.7c-1.6.3-2.8 1.5-2.8 3.1 0 1.1.6 2.1 1.5 2.6l-3.4 3.4 1.1 1.1 3.3-3.3c.4.2.9.4 1.4.4v3.9h1.5v-3.9c1.6-.3 2.8-1.6 2.8-3.1 0-1.1-.6-2-1.4-2.6l3.3-3.3-1.1-1zm-5.2 7.4c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7v3.4zm1.5-.1V10.5c1 .1 1.6.8 1.6 1.7s-.7 1.5-1.6 1.6z" fill="white"/>
      </svg>
    </div>
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 24 10" className="h-4 w-auto">
        <path d="M7.3 4.2C6.7 4.9 5.8 5.4 4.8 5.3C4.7 4.4 5.1 3.4 5.6 2.8C6.2 2.1 7.2 1.6 8.1 1.5C8.2 2.5 7.8 3.4 7.3 4.2ZM8 5.5C6.7 5.4 5.6 6.2 5 6.2C4.4 6.2 3.4 5.5 2.4 5.5C1.1 5.5 0 6.3 0 8.1C0 11.1 2.2 14 3.6 14C4.4 14 4.9 13.5 6.1 13.5C7.3 13.5 7.7 14 8.6 14C9.8 14 10.6 12.5 11.2 11.6C10.4 11.2 9.2 10.1 9.2 8.2C9.2 6.6 10.1 5.6 10.7 5.2C10 5.1 8.9 5.1 8 5.5Z" fill="black" transform="translate(0,-3)"/>
        <text x="14" y="7" fill="black" fontSize="6" fontWeight="600" fontFamily="system-ui">Pay</text>
      </svg>
    </div>
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 38 16" className="h-4 w-auto">
        <text x="1" y="12" fill="#4285F4" fontSize="9" fontWeight="700" fontFamily="system-ui">G</text>
        <text x="10" y="12" fill="#3C4043" fontSize="7.5" fontWeight="500" fontFamily="system-ui">Pay</text>
      </svg>
    </div>
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 48 16" className="h-4 w-auto">
        <text x="24" y="12" textAnchor="middle" fill="#1A1F71" fontSize="12" fontWeight="800" fontFamily="system-ui" fontStyle="italic">VISA</text>
      </svg>
    </div>
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 36 22" className="h-5 w-auto">
        <circle cx="13" cy="11" r="7" fill="#EB001B"/>
        <circle cx="23" cy="11" r="7" fill="#F79E1B"/>
        <path d="M18 5.4C19.7 6.8 20.7 8.8 20.7 11C20.7 13.2 19.7 15.2 18 16.6C16.3 15.2 15.3 13.2 15.3 11C15.3 8.8 16.3 6.8 18 5.4Z" fill="#FF5F00"/>
      </svg>
    </div>
    <div className="h-10 w-16 rounded-md flex items-center justify-center bg-[#006FCF]">
      <svg viewBox="0 0 40 14" className="h-3 w-auto">
        <text x="20" y="11" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="system-ui" letterSpacing="0.5">AMEX</text>
      </svg>
    </div>
    <div className="h-10 w-20 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 70 16" className="h-3 w-auto">
        <text x="35" y="12" textAnchor="middle" fill="#FF6000" fontSize="9" fontWeight="800" fontFamily="system-ui" letterSpacing="0.3">DISCOVER</text>
      </svg>
    </div>
    <div className="h-10 w-14 rounded-md flex items-center justify-center bg-white border border-neutral-200">
      <svg viewBox="0 0 30 16" className="h-4 w-auto">
        <text x="15" y="12" textAnchor="middle" fill="#0E4C96" fontSize="9" fontWeight="800" fontFamily="system-ui">JCB</text>
      </svg>
    </div>
  </div>
);

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
            
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center mix-blend-difference">
              <div onClick={() => navigate('home')} className="cursor-pointer group">
                <BrandLogo size="sm" className="items-start" />
              </div>
              <div className="hidden lg:flex gap-10 items-center text-[10px] font-black uppercase tracking-[0.3em]">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Service', id: 'service' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'Contact', id: 'contact' },
                  { label: 'About', id: 'about' }
                ].map(item => (
                  <button key={item.id} onClick={() => navigate(item.id)} className={`transition-colors duration-300 relative ${page === item.id ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                    {item.label}
                    {page === item.id && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white" />}
                  </button>
                ))}
                <div className="h-10 w-px bg-white/10" />
                <MagneticButton variant="outline" href={BOOKING_URL}>Book Now</MagneticButton>
              </div>
              <button onClick={() => setMenuOpen(true)} className="lg:hidden p-4 bg-white/5 rounded-full">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </nav>

            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="fixed inset-0 z-[60] bg-black p-12 flex flex-col items-center justify-center space-y-6"
                >
                  <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-white"><X className="w-10 h-10" /></button>
                  {['Home', 'Service', 'Portfolio', 'Contact', 'About'].map((item, i) => (
                    <motion.button 
                      key={item} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => navigate(item.toLowerCase())} 
                      className="text-4xl md:text-5xl font-bold uppercase tracking-[0.1em] hover:text-white/50 transition-colors"
                    >
                      {item}
                    </motion.button>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <MagneticButton href={BOOKING_URL} className="mt-8">Book Online</MagneticButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <main>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {page === 'home' && <HomePage />}
                  {page === 'service' && <ServicePage />}
                  {page === 'portfolio' && <PortfolioPage />}
                  {page === 'contact' && <ContactPage />}
                  {page === 'about' && <AboutPage />}
                </motion.div>
              </AnimatePresence>
            </main>

            <footer className="bg-black pt-40 pb-20 px-8 border-t border-white/10">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="flex flex-col lg:flex-row justify-between gap-20 mb-32 items-start"
                >
                  <motion.div variants={fadeUp}>
                    <BrandLogo size="md" className="items-start" />
                  </motion.div>
                  <motion.div variants={fadeUp} className="max-w-md w-full">
                    <div className="flex gap-4">
                      <input type="email" placeholder="Email" className="flex-1 bg-black border border-white/20 p-5 outline-none focus:border-white transition-all text-white text-xs placeholder:text-white/20" />
                      <button className="px-8 py-5 border border-white text-white hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">Sign Up</button>
                    </div>
                    <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] mt-8 leading-loose">
                      This form is protected by reCAPTCHA and the Google <span className="underline decoration-white/20">Privacy Policy</span> and <span className="underline decoration-white/20">Terms of Service</span> apply.
                    </p>
                  </motion.div>
                </motion.div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5">
                  <PaymentIcons />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">&copy; 2026 &bull; Newark, CA &bull; Designed by AAFC</p>
                </div>
              </div>
            </footer>

            <motion.a 
              href="sms:+15105576921" 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="fixed bottom-8 right-8 z-[55] bg-white text-black px-6 py-4 rounded-md flex items-center gap-3 shadow-2xl hover:scale-105 transition-all group"
            >
              <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Text us</span>
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
