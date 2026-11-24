/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesBento } from './components/FeaturesBento';
import { MusicJukebox } from './components/MusicJukebox';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { soundEngine } from './utils/audioSynth';

export default function App() {
  const [isPremium, setIsPremium] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    name: 'YouTube Premium 개인 멤버십 (웹 결제)',
    monthlyPrice: 14900,
  });

  const handleTogglePremium = (force?: boolean) => {
    setIsPremium((prev) => (typeof force === 'boolean' ? force : !prev));
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleOpenModal = (planName?: string, monthlyPrice?: number) => {
    setSelectedPlan({
      name: planName || 'YouTube Premium 개인 멤버십 (웹 결제)',
      monthlyPrice: monthlyPrice ?? 14900,
    });
    setModalOpen(true);
  };

  const handleActivated = () => {
    setIsPremium(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-rose-500/30 selection:text-white">
      {/* 00. Top Navigation Bar */}
      <Header
        onOpenModal={handleOpenModal}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main className="pt-24 pb-20 space-y-28 sm:space-y-36">
        {/* 01. Hero Interactive Ad-Removal Switch & Cinema Player */}
        <HeroSection
          isPremium={isPremium}
          onTogglePremium={handleTogglePremium}
          onOpenModal={handleOpenModal}
        />

        {/* 02. Multitasking Simulator Bento Grid */}
        <FeaturesBento />

        {/* 03. YouTube Music Interactive Jukebox */}
        <MusicJukebox
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* 04. Verified Korea Pricing & Savings Calculator & FAQ */}
        <PricingSection onOpenModal={handleOpenModal} />
      </main>

      {/* 05. Footer */}
      <Footer />

      {/* Subscription Terms & Confirmation Modal */}
      <SubscriptionModal
        isOpen={modalOpen}
        planName={selectedPlan.name}
        monthlyPrice={selectedPlan.monthlyPrice}
        onClose={() => setModalOpen(false)}
        onActivated={handleActivated}
      />
    </div>
  );
}
