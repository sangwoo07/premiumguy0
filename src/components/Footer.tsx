import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6 text-center text-xs text-zinc-500 space-y-4 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
        <a href="#hero" className="hover:text-white transition-colors">체험하기</a>
        <a href="#features" className="hover:text-white transition-colors">핵심 기능</a>
        <a href="#music" className="hover:text-white transition-colors">YouTube Music</a>
        <a href="#pricing" className="hover:text-white transition-colors">멤버십 요금</a>
        <a href="#calculator" className="hover:text-white transition-colors">절약 계산기</a>
      </div>

      <div className="space-y-1.5 pt-2">
        <p className="font-medium text-zinc-400">
          YouTube Premium Interactive Renewal Prototype (Korea Official Policy Verified)
        </p>
        <p className="text-[11px] text-zinc-600">
          표기된 모든 금액은 대한민국 웹 결제 기준 부가가치세(VAT 10%)가 포함된 실제 청구 금액입니다.
        </p>
        <p className="text-[11px] text-zinc-600">
          Google LLC · YouTube 유료 서비스 이용약관 준수 · 중도 해지 시 남은 기간 혜택 정상 유지
        </p>
      </div>
    </footer>
  );
};
