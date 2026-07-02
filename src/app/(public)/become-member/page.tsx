"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, MessageCircle, HelpCircle } from "lucide-react";
import { dbService } from "@/lib/db/service";

export default function BecomeMemberPage() {
  const router = useRouter();
  const settings = dbService.getBrandSettings();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "Weight Loss",
    preferredTiming: "06:00 AM - 08:00 AM",
    experience: "Beginner",
    medicalConditions: "None",
    phone: "",
    notes: ""
  });

  const goals = [
    "Weight Loss", "Weight Gain", "Muscle Building", "Bodybuilding", "Strength",
    "Powerlifting", "Six Pack", "General Fitness", "Cardio", "Women's Fitness",
    "Senior Fitness", "HIIT", "Functional Training", "Custom"
  ];

  const timings = [
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
    "08:00 PM - 10:00 PM"
  ];

  const experiences = ["Beginner", "Intermediate", "Advanced"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to join requests database in Demo Mode
    dbService.addJoinRequest({
      name: formData.name,
      age: parseInt(formData.age) || 0,
      height: parseInt(formData.height) || 0,
      weight: parseFloat(formData.weight) || 0,
      goal: formData.goal,
      preferredTiming: formData.preferredTiming,
      experience: formData.experience,
      phone: formData.phone,
      medicalConditions: formData.medicalConditions,
      notes: formData.notes
    });

    // Format the WhatsApp message
    const message = `Hello Fitness Corner Gym,
I want to become a member.
Name: ${formData.name}
Age: ${formData.age}
Height: ${formData.height} cm
Weight: ${formData.weight} kg
Fitness Goal: ${formData.goal}
Preferred Timing: ${formData.preferredTiming}
Experience: ${formData.experience}
Medical Conditions: ${formData.medicalConditions}
Phone Number: ${formData.phone}
Please contact me.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Route back to about page or show success
    router.push("/about");
  };

  return (
    <div className="flex-grow flex flex-col px-6 py-8 text-white bg-black">
      {/* Header Info */}
      <div className="text-center flex flex-col items-center mb-6">
        <div className="p-3 bg-gold/10 rounded-full text-gold border border-gold/20 mb-3">
          <UserPlus className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider">Become a Member</h2>
        <p className="text-xs text-text-secondary mt-1 max-w-xs">
          Submit your training goals. We will automatically format your profile and connect you to a coach via WhatsApp.
        </p>
      </div>

      {/* Enquiry Form */}
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
          />
        </div>

        {/* Age / Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Age (Years)</label>
            <input
              type="number"
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
            />
          </div>
        </div>

        {/* Height / Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Height (cm)</label>
            <input
              type="number"
              name="height"
              required
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g. 175"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              name="weight"
              required
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g. 78.5"
              className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
            />
          </div>
        </div>

        {/* Fitness Goal */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Fitness Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
          >
            {goals.map((g) => (
              <option key={g} value={g} className="bg-bg-card text-white">{g}</option>
            ))}
          </select>
        </div>

        {/* Preferred Timing */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Preferred Timing</label>
          <select
            name="preferredTiming"
            value={formData.preferredTiming}
            onChange={handleChange}
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
          >
            {timings.map((t) => (
              <option key={t} value={t} className="bg-bg-card text-white">{t}</option>
            ))}
          </select>
        </div>

        {/* Training Experience */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Training Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
          >
            {experiences.map((exp) => (
              <option key={exp} value={exp} className="bg-bg-card text-white">{exp}</option>
            ))}
          </select>
        </div>

        {/* Medical Conditions */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Medical Conditions</label>
          <input
            type="text"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            placeholder="e.g. Asthma, Back pain, None"
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any other comments or questions..."
            className="w-full bg-bg-card border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-gold outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="mt-4 w-full bg-gold text-black text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-hover transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
        >
          <MessageCircle className="w-4 h-4" /> Send Enquire via WhatsApp
        </motion.button>
      </form>
    </div>
  );
}
