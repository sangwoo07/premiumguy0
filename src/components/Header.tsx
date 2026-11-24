import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenModal: (planName?: string, monthlyPrice?: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, isMuted, onToggleMute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#09090B]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element with Logo Icon) */}
        <a href="#hero" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-6 rounded-md bg-[#FF0033] flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <svg className="w-3.5 h-3.5 fill-white ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight text-white">YouTube Premium</span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400 font-medium">
          <a href="#hero" className="hover:text-white transition-colors whitespace-nowrap">
            체험하기
          </a>
          <a href="#features" className="hover:text-white transition-colors whitespace-nowrap">
            핵심 기능
          </a>
          <a href="#music" className="hover:text-white transition-colors whitespace-nowrap">
            Music
          </a>
          <a href="#pricing" className="hover:text-white transition-colors whitespace-nowrap">
            멤버십 요금
          </a>
          <a href="#calculator" className="hover:text-white transition-colors whitespace-nowrap">
            절약 계산기
          </a>
        </nav>

        {/* Zone 3: Audio Toggle + 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            title={isMuted ? '인터랙티브 사운드 켜기' : '사운드 음소거'}
            aria-label={isMuted ? '음소거 해제' : '음소거'}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" />}
          </button>

          <button
            onClick={() => onOpenModal('YouTube Premium 개인 멤버십 (웹 결제)')}
            className="accent-gradient text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-rose-600/25 hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
          >
            1개월 무료 체험
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#09090B]/95 backdrop-blur-2xl px-6 py-4 space-y-3">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            체험하기 (광고 제거 스위치)
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            핵심 기능 (멀티태스킹 & 오프라인)
          </a>
          <a
            href="#music"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            YouTube Music 주크박스
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            멤버십 요금 안내
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-white py-1.5"
          >
            연간 절약 금액 계산기
          </a>
        </div>
      )}
    </header>
  );
};
