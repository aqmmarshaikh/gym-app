"use client";

import { useEffect, useState } from "react";
import { 
  Save, Phone, MapPin, Sparkles
} from "lucide-react";
import { dbService } from "@/lib/db/service";
import { BrandSettings } from "@/lib/db/mockData";

export default function OwnerBrandingPage() {
  const [settings, setSettings] = useState<BrandSettings | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const s = dbService.getBrandSettings();
      if (s) {
        setSettings(s);
        setName(s.name);
        setTagline(s.tagline);
        setPhone(s.phone);
        setWhatsapp(s.whatsapp);
        setEmail(s.email);
        setAddress(s.address);
        setMapLink(s.googleMapLink);
        setOpeningTime(s.openingTime);
        setClosingTime(s.closingTime);
      }
    };
    loadData();
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    dbService.updateBrandSettings({
      name,
      tagline,
      phone,
      whatsapp,
      email,
      address,
      googleMapLink: mapLink,
      openingTime,
      closingTime
    });

    dbService.addAuditLog("Owner", "Updated Gym Branding & Contact Configurations", name);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (!settings) return null;

  return (
    <div className="flex-grow flex flex-col p-6 gap-6 text-white bg-black">
      {/* Header */}
      <div>
        <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">Settings</span>
        <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Brand Configuration</h2>
        <p className="text-xs text-text-secondary mt-1">Configure global details, phone contacts, address and schedule hours.</p>
      </div>

      {/* SUCCESS BANNER */}
      {showSuccess && (
        <div className="p-3 bg-green/10 border border-success/30 rounded-xl text-center text-xs text-success font-bold uppercase tracking-wider">
          Branding Details Saved successfully!
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
        
        {/* Basic Brand Details */}
        <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.03] pb-2">
            <Sparkles className="w-4 h-4 text-gold" /> Identity & Tagline
          </h3>
          
          <div>
            <label className="block text-[9px] text-text-secondary uppercase mb-1">Gym Corporate Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[9px] text-text-secondary uppercase mb-1">Motivational Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Contact info config */}
        <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.03] pb-2">
            <Phone className="w-4 h-4 text-gold" /> Contacts & Channels
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">Reception Call</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">WhatsApp Line</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] text-text-secondary uppercase mb-1">Corporate Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Location & Timings */}
        <div className="glass-card p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.03] pb-2">
            <MapPin className="w-4 h-4 text-gold" /> Schedule & Address
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">Opening Hour</label>
              <input
                type="text"
                required
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[9px] text-text-secondary uppercase mb-1">Closing Hour</label>
              <input
                type="text"
                required
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] text-text-secondary uppercase mb-1">Address Details</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-[9px] text-text-secondary uppercase mb-1">Google Maps Embed Link</label>
            <input
              type="text"
              required
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gold text-black text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-hover transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)] mt-4"
        >
          <Save className="w-4 h-4" /> Save Brand Configuration
        </button>
      </form>
    </div>
  );
}
