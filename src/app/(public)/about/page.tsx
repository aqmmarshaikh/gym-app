"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ShieldCheck, MapPin, Clock, Star, HelpCircle, 
  ChevronDown, MessageCircle, Phone, Sparkles,
  ArrowRight, Users
} from "lucide-react";
import { dbService } from "@/lib/db/service";

export default function AboutPage() {
  const router = useRouter();
  const settings = dbService.getBrandSettings();
  const coaches = dbService.getCoaches();
  const machines = dbService.getMachines();
  const transformations = dbService.getTransformations();
  const testimonials = dbService.getTestimonials();
  const galleryItems = dbService.getGallery();
  
  // States
  const [activeGalleryTab, setActiveGalleryTab] = useState("Gym");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const facilities = [
    { title: "Air Conditioned Gym", desc: "Top tier temperature control" },
    { title: "Locker Area", desc: "Secure digital locker systems" },
    { title: "Clean Washrooms", desc: "Daily sanitized facilities" },
    { title: "Free Parking", desc: "Ample parking for members" },
    { title: "Personal Coaching", desc: "One-on-one expert trainers" },
    { title: "Strength Area", desc: "Heavy free weights & platforms" },
    { title: "Cardio Area", desc: "Connected interactive machines" },
    { title: "Functional Zone", desc: "TRX, kettlebells & battle ropes" },
    { title: "RO Drinking Water", desc: "Chilled pure drinking water" },
    { title: "Premium Music System", desc: "High-energy workout beats" }
  ];

  const faqs = [
    { q: "How do I join the gym?", a: "Go to the 'Join Gym' tab, fill out the basic physical details, and tap submit. The system will pre-fill a professional WhatsApp message directly to our Head Coach to schedule your onboarding session!" },
    { q: "What is the fee structure?", a: "We offer premium memberships starting from 1 Month up to 12 Months. Contact the coach or drop an enquiry to receive the current pricing plans and seasonal offers." },
    { q: "What are the Gym timings?", a: "We are open Monday to Saturday from 5:00 AM to 11:00 PM. Sundays are designated recovery days and the gym remains closed." },
    { q: "Do you have Ladies timing or batches?", a: "We maintain a safe, professional, and inclusive co-ed environment with certified male & female coaches active throughout all operating hours." },
    { q: "Is personal training mandatory?", a: "No, general fitness guidance and custom workout/diet templates are included in your standard membership code!" }
  ];

  const galleryTabs = ["Gym", "Machines", "Transformations", "Coaches"];

  return (
    <div className="flex-grow flex flex-col pb-12 bg-black text-white">
      {/* 1. HERO BANNER */}
      <section className="relative h-[480px] flex flex-col justify-end p-6 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 scale-105 animate-zoom">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80"
            alt="Gym interior banner"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 mb-3">
            <Image src="/logo.png" alt="FCG Logo" fill className="object-contain" />
          </div>
          <span className="px-3 py-1 bg-gold/15 border border-gold/30 rounded-full text-[10px] text-gold tracking-widest uppercase font-semibold mb-2">
            Luxury Gym & Fitness Club
          </span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-md">
            Build Strength.<br />Build Discipline.
          </h2>
          <p className="text-text-secondary text-sm mt-3 max-w-xs drop-shadow">
            Experience premium coaching, top-tier equipment, and personalized nutrition plans.
          </p>

          <div className="flex gap-4 w-full mt-6 max-w-sm">
            <button 
              onClick={() => router.push("/become-member")}
              className="flex-1 bg-gold text-black text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1 hover:bg-gold-hover active:scale-95 transition-all"
            >
              Become Member <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a 
              href="#facilities"
              className="flex-1 bg-white/10 text-white text-xs font-bold py-3.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              Explore Gym
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE GYM */}
      <section className="px-6 py-10 bg-bg-secondary border-y border-white/[0.03]">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Our Philosophy</h2>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          At **Fitness Corner Gym**, we reject the standard quick-fix approach. True transformation is built on **discipline, safety, and science-backed training protocols**. Our premium facility provides an elite focused environment to break plateaus.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-bg-card border border-white/[0.03]">
            <h4 className="text-gold font-semibold text-sm">Certified Coaching</h4>
            <p className="text-[11px] text-text-secondary mt-1">Every coach is certified in biomechanics and nutrition.</p>
          </div>
          <div className="p-4 rounded-xl bg-bg-card border border-white/[0.03]">
            <h4 className="text-gold font-semibold text-sm">Luxury Equipment</h4>
            <p className="text-[11px] text-text-secondary mt-1">Biomechanical alignment with custom plate-loaded machines.</p>
          </div>
        </div>
      </section>

      {/* 3. FACILITIES SECTION */}
      <section id="facilities" className="px-6 py-10">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Our Facilities</h2>
        <p className="text-xs text-text-secondary mb-6">Designed exclusively for an uninterrupted, luxury training flow.</p>
        
        <div className="grid grid-cols-2 gap-3">
          {facilities.map((fac, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-bg-card border border-white/[0.03] flex flex-col justify-between">
              <ShieldCheck className="w-5 h-5 text-gold mb-2" />
              <div>
                <h4 className="text-white text-xs font-semibold">{fac.title}</h4>
                <p className="text-[10px] text-text-secondary mt-0.5">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PREMIUM MACHINES HIGHLIGHT */}
      <section className="px-6 py-10 bg-bg-secondary border-y border-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider">Premium Machines</h2>
            <p className="text-[11px] text-text-secondary mt-0.5">Explore our professional biomechanical fleet</p>
          </div>
          <span className="px-2.5 py-1 bg-gold/10 text-gold text-[10px] rounded-lg border border-gold/20 font-bold">
            {machines.length}+ Units
          </span>
        </div>

        {/* Horizontal scroll list of machines */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {machines.slice(0, 8).map((m) => (
            <div 
              key={m.id} 
              className="flex-shrink-0 w-44 bg-bg-card rounded-2xl border border-white/[0.05] overflow-hidden snap-start"
            >
              <div className="relative h-28 w-full bg-neutral-900">
                <Image
                  src={m.imageUrl}
                  alt={m.name}
                  fill
                  className="object-cover"
                />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-bold tracking-wider ${
                  m.status === "Available" ? "bg-green/10 text-success border border-green/20" : "bg-warning/10 text-warning border border-warning/20"
                }`}>
                  {m.status}
                </span>
              </div>
              <div className="p-3">
                <h4 className="text-white text-xs font-bold truncate">{m.name}</h4>
                <p className="text-[10px] text-gold mt-0.5">{m.targetMuscle} Focus</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.03]">
                  <span className="text-[9px] text-text-secondary uppercase">Difficulty</span>
                  <span className="text-[9px] text-white font-medium">Intermediate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Gym Gallery</h2>
        <p className="text-xs text-text-secondary mb-6">Take a look inside the luxury atmosphere.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveGalleryTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                activeGalleryTab === tab 
                  ? "bg-gold text-black border-gold" 
                  : "bg-white/5 text-text-secondary border-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3">
          {galleryItems
            .filter((item: any) => item.category === activeGalleryTab)
            .slice(0, 4)
            .map((item: any) => (
              <div key={item.id} className="relative h-28 rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.03]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      </section>

      {/* 6. EXPERT COACHES */}
      <section className="px-6 py-10 bg-bg-secondary border-y border-white/[0.03]">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Our Coaches</h2>
        <p className="text-xs text-text-secondary mb-6">Expert guidance to push your boundaries safely.</p>

        <div className="grid grid-cols-1 gap-4">
          {coaches.map((c) => (
            <div key={c.id} className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-white/[0.02]">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gold/30">
                <Image src={c.photoUrl} alt={c.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-bold">{c.name}</h4>
                <p className="text-[10px] text-gold tracking-wide uppercase font-semibold mt-0.5">{c.specialization}</p>
                <p className="text-[10px] text-text-secondary mt-1">Exp: {c.experience} | Languages: {c.languages.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-2">
                <a 
                  href={`https://wa.me/${settings.whatsapp}?text=Hello ${c.name}, I want to enquire about Fitness Corner Gym.`}
                  className="p-2 bg-green/10 text-success rounded-lg border border-green/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. THE OWNER SECTION */}
      <section className="px-6 py-10 text-center flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/45 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Image 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
            alt="Gym Owner" 
            fill 
            className="object-cover" 
          />
        </div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-bold">Gym Director</span>
        <h3 className="text-lg font-bold text-white mt-1">Ammar Patel Sr.</h3>
        <p className="text-xs text-text-secondary italic mt-3 max-w-sm">
          &ldquo;Our vision is to build an environment of sheer focus. We believe that steel sharpens steel, and with elite equipment and strict discipline, anyone can unlock their full potential.&rdquo;
        </p>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="px-6 py-10 bg-bg-secondary border-y border-white/[0.03]">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Member Testimonials</h2>
        <p className="text-xs text-text-secondary mb-6">Real stories from our dedicated fitness community.</p>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {testimonials.slice(0, 6).map((t) => (
            <div 
              key={t.id}
              className="flex-shrink-0 w-64 p-4 rounded-xl bg-bg-card border border-white/[0.05] snap-start"
            >
              <div className="flex items-center gap-1 text-gold mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <p className="text-xs text-text-secondary italic leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/[0.03]">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-800">
                  <Image src={t.profileImageUrl} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h5 className="text-white text-xs font-bold">{t.name}</h5>
                  <span className="text-[9px] text-text-secondary">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2">Got Questions?</h2>
        <p className="text-xs text-text-secondary mb-6">Frequently asked questions about our membership.</p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="rounded-xl border border-white/[0.04] bg-bg-secondary overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-xs font-semibold text-white">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-text-secondary leading-relaxed border-t border-white/[0.02] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CONTACT / MAP / DETAILS */}
      <section className="px-6 py-10 bg-bg-secondary border-t border-white/[0.03]">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-4">Contact & Location</h2>
        
        <div className="flex flex-col gap-4 text-xs text-text-secondary">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold">Our Address</p>
              <p className="mt-1 leading-relaxed">{settings.address}</p>
              <a 
                href={settings.googleMapLink} 
                target="_blank" 
                rel="noreferrer"
                className="text-gold mt-1.5 inline-block font-medium hover:underline"
              >
                Open Google Maps &rarr;
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-white/[0.03] pt-4">
            <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold">Working Hours</p>
              <p className="mt-1">Mon - Sat: {settings.openingTime} - {settings.closingTime}</p>
              <p className="text-danger mt-0.5 font-medium">Sunday: Recovery (Closed)</p>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello Fitness Corner Gym, I want to become a member.`}
            className="bg-green/10 text-success border border-green/20 rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
          <a
            href={`tel:${settings.phone}`}
            className="bg-gold/15 text-gold border border-gold/30 rounded-xl py-3 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" /> Call Front Desk
          </a>
        </div>
      </section>
    </div>
  );
}
