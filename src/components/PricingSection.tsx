import React, { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronUp, Calculator, ShieldCheck, Bell, CreditCard } from 'lucide-react';

interface PricingSectionProps {
  onOpenModal: (planName: string, monthlyPrice: number) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenModal }) => {
  const [priceView, setPriceView] = useState<'monthly' | 'annualSum'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Savings Calculator State
  const [isIosUser, setIsIosUser] = useState(true);
  const [cancelsOtherMusic, setCancelsOtherMusic] = useState(true);

  // Dynamic calculations
  // iOS web savings: (19500 - 14900) * 12 = 55,200 KRW
  const iosAnnualSavings = isIosUser ? (19500 - 14900) * 12 : 0;
  // Other music cancellation savings: ~10,900 * 12 = 130,800 KRW (국내 주요 음원 앱 월 평균 기준)
  const musicAnnualSavings = cancelsOtherMusic ? 10900 * 12 : 0;
  const totalAnnualSavings = iosAnnualSavings + musicAnnualSavings;

  const faqs = [
    {
      q: 'YouTube Premium(₩14,900)과 한국형 Premium Lite(₩8,500)는 무엇이 다른가요?',
      a: 'YouTube Premium(월 ₩14,900)은 모든 동영상 자체 광고 제거, 백그라운드 재생, 오프라인 저장에 더해 YouTube Music Premium(1억 곡 이상)까지 모두 포함된 올인원 요금제입니다. 반면 한국형 YouTube Premium Lite(웹 월 ₩8,500 / iOS ₩10,900)는 YouTube Music을 제외한 대신 가격을 낮춘 요금제로, 일반 동영상 광고 제거·백그라운드 재생·오프라인 저장을 지원하지만 음악 콘텐츠(공식 뮤직비디오·아트트랙 등) 및 Shorts·탐색 화면 광고 제거는 제외됩니다.',
    },
    {
      q: '무료 체험 시작 시 결제 수단 등록이 필요한가요? 중도 해지 시 요금이 나가나요?',
      a: '네. 신규 회원 무료 체험을 시작하려면 유효한 신용·체크카드, 통신사 소액결제 또는 간편결제(카카오페이, 토스페이) 등록이 필요하지만 오늘 결제되는 금액은 ₩0원입니다. 1개월 체험 종료일 이전에 언제든 해지하시면 추가 요금이 청구되지 않으며, 해지 신청 후에도 남은 체험 만료일까지 혜택이 유지됩니다.',
    },
    {
      q: '아이폰(iOS) 사용자인데 웹 브라우저에서 가입해도 아이폰 앱에서 적용되나요?',
      a: '네, 완벽히 동일하게 적용됩니다. iOS YouTube 앱 내부에서 결제하면 애플 앱스토어 수수료가 포함되어 월 ₩19,500(Premium 기준)이 청구되지만, Safari나 Chrome 웹 브라우저에서 월 ₩14,900(VAT 포함)으로 가입한 뒤 동일 Google 계정으로 아이폰·아이패드 앱에 로그인하면 매월 ₩4,600(연 ₩55,200)을 즉시 절약할 수 있습니다.',
    },
    {
      q: '유튜버가 영상 속에 직접 넣은 광고(PPL)도 사라지나요? 여러 기기 동시 시청은 가능한가요?',
      a: 'YouTube Premium은 유튜브 플랫폼이 송출하는 전면·중간·배너 광고를 제거하며, 크리에이터가 영상 제작 시 직접 삽입한 협찬·PPL(유료 광고 포함)은 차단 대상이 아닙니다. 또한 동일 계정으로 스마트폰·PC·TV 등에 로그인해 이어보기와 최대 10대 기기 오프라인 저장(한국 기준 최대 29일 유지, 기기 변경 연 4회 제한)을 쓸 수 있으나, 개인 계정의 실시간 동시 스트리밍은 1대 기기 원칙으로 제한됩니다.',
    },
  ];

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 space-y-16">
      {/* Title & View Toggle */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
          Korea Official Membership
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          투명한 국내 공식 요금 및 혜택 비교
        </h2>
        <p className="text-sm text-zinc-400">
          대한민국 정식 출시 요금제(부가가치세 10% 포함) 기준이며, 웹에서 가입 시 앱스토어 수수료 부담이 없습니다.
        </p>

        {/* Monthly vs Annual Cumulative View Toggle */}
        <div className="inline-flex items-center p-1 rounded-full glass-card border border-white/10">
          <button
            onClick={() => setPriceView('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              priceView === 'monthly'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            월간 정기 결제 기준
          </button>
          <button
            onClick={() => setPriceView('annualSum')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              priceView === 'annualSum'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            1년 유지 시 비용 비교
          </button>
        </div>
      </div>

      {/* 4-Column Official KR Plans & iOS Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {/* Card 1: YouTube Premium Lite (Korea Official) */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">Premium Lite</h3>
              <span className="text-[11px] font-medium text-sky-300 whitespace-nowrap">
                영상 실속형
              </span>
            </div>

            <div className="tabular-nums">
              <span className="text-3xl font-extrabold text-white">
                {priceView === 'monthly' ? '₩8,500' : '₩102,000'}
              </span>
              <span className="text-xs text-zinc-400 block mt-1">
                {priceView === 'monthly' ? '월 / 웹·안드로이드 (iOS ₩10,900)' : '12개월 누적 / 웹 기준'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-white/10">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>일반 동영상 자체 광고 제거</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>백그라운드 재생 & 오프라인 저장 (한국 특전)</span>
              </li>
              <li className="flex items-start gap-2 text-zinc-500">
                <X className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>YouTube Music · 쇼츠·음악 광고 제거 제외</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenModal('YouTube Premium Lite (웹 결제)', 8500)}
            className="mt-8 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer"
          >
            Lite 요금제 선택
          </button>
        </div>

        {/* Card 2: Music Premium Standalone (Verified ₩11,990) */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">Music Premium</h3>
              <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                음악 단독
              </span>
            </div>

            <div className="tabular-nums">
              <span className="text-3xl font-extrabold text-white">
                {priceView === 'monthly' ? '₩11,990' : '₩143,880'}
              </span>
              <span className="text-xs text-zinc-400 block mt-1">
                {priceView === 'monthly' ? '월 / 웹·안드로이드 (iOS ₩14,900)' : '12개월 누적 / 웹 기준'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-white/10">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>YouTube Music 광고 없는 감상 (최고 256kbps)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>음악 백그라운드 & 오프라인 저장</span>
              </li>
              <li className="flex items-start gap-2 text-zinc-500">
                <X className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span>일반 YouTube 동영상 광고 제거 미포함</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenModal('YouTube Music Premium 단독 (웹 결제)', 11990)}
            className="mt-8 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer"
          >
            Music 단독 시작하기
          </button>
        </div>

        {/* Card 3: YouTube Premium Web/Android (Best Value Highlight) */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between border-2 border-rose-500 shadow-2xl shadow-rose-600/20 relative bg-zinc-950/70">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full accent-gradient text-[11px] font-bold text-white shadow-md whitespace-nowrap">
            웹 결제 추천 · BEST VALUE
          </span>

          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">YouTube Premium</h3>
              <span className="text-[11px] font-semibold text-rose-300 whitespace-nowrap">
                신규 1개월 ₩0
              </span>
            </div>

            <div className="tabular-nums">
              <span className="text-3xl font-extrabold text-white">
                {priceView === 'monthly' ? '₩14,900' : '₩178,800'}
              </span>
              <span className="text-xs text-zinc-400 block mt-1">
                {priceView === 'monthly' ? '월 / 웹·안드로이드 (VAT 포함)' : '12개월 누적 / 웹 기준'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-200 pt-3 border-t border-white/10">
              <li className="flex items-start gap-2 font-medium text-rose-300">
                <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Music 단독에 ₩2,910만 더하면 올인원</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>YouTube 자체 전·중간 광고 제거 (PPL 제외)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>모바일 PIP · 백그라운드 · 1080p 저장</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>YouTube Music Premium 기본 포함</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenModal('YouTube Premium 개인 멤버십 (웹 결제)', 14900)}
            className="mt-8 w-full py-3.5 rounded-2xl accent-gradient text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            웹 할인가로 1개월 무료 시작
          </button>
        </div>

        {/* Card 4: iOS In-App Purchase Warning */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-zinc-300">iOS 인앱 결제 시</h3>
              <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1 whitespace-nowrap">
                <AlertTriangle className="w-3 h-3" /> 수수료 주의
              </span>
            </div>

            <div className="tabular-nums">
              <span className="text-3xl font-extrabold text-zinc-400 line-through decoration-rose-500/80">
                {priceView === 'monthly' ? '₩19,500' : '₩234,000'}
              </span>
              <span className="text-xs text-zinc-400 block mt-1">
                {priceView === 'monthly' ? '월 / 앱스토어 인앱 결제' : '12개월 (연 ₩55,200 손해)'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-white/10">
              <li className="flex items-start gap-2 text-emerald-400 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>웹 가입 시 매월 ₩4,600 즉시 절약</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>아이폰·아이패드 앱에서도 100% 동일 적용</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>약정 없이 언제든 웹에서 간편 해지</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onOpenModal('아이폰 유저 웹 결제 혜택 (월 ₩14,900)', 14900)}
            className="mt-8 w-full py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
          >
            ₩4,600 아끼고 웹에서 가입
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-zinc-400 max-w-3xl mx-auto leading-relaxed">
        ※ 대한민국에서는 개인 월간 정기 결제(Premium · Premium Lite · Music Premium)로 운영되며, 가족·학생 요금제는 공식 미도입 상태입니다.
        무료 체험은 신규 가입자(또는 일정 기간 미구독 대상자)에게 제공되며, 크리에이터가 영상 내에 직접 삽입한 협찬·PPL은 제거되지 않습니다.
      </p>

      {/* Interactive Savings Calculator */}
      <div id="calculator" className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Smart Savings Calculator
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">내가 1년에 아낄 수 있는 실질 금액은?</h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-zinc-400 block">예상 연간 절약 합계</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              ₩{totalAnnualSavings.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {/* Option 1: iPhone user check */}
          <div
            onClick={() => setIsIosUser(!isIosUser)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              isIosUser
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-white/10 bg-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">1. 아이폰 (iOS) 유저이신가요?</span>
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                  isIosUser ? 'bg-emerald-500 text-black font-bold' : 'border border-white/20'
                }`}
              >
                {isIosUser && '✓'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              앱스토어 인앱 결제(월 ₩19,500) 대신 웹 브라우저에서 월 ₩14,900으로 가입 시{' '}
              <span className="text-emerald-400 font-semibold font-mono tabular-nums">연간 ₩55,200 절약</span>
            </p>
          </div>

          {/* Option 2: Other music service cancellation */}
          <div
            onClick={() => setCancelsOtherMusic(!cancelsOtherMusic)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              cancelsOtherMusic
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-white/10 bg-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">2. 타 음원 스트리밍을 구독 중이신가요?</span>
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                  cancelsOtherMusic ? 'bg-emerald-500 text-black font-bold' : 'border border-white/20'
                }`}
              >
                {cancelsOtherMusic && '✓'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              YouTube Music 기본 포함으로 타 음원 앱(월 약 ₩10,900 평균 기준) 중복 해지 시{' '}
              <span className="text-emerald-400 font-semibold font-mono tabular-nums">연간 ₩130,800 추가 절약</span>
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 text-left">
            YouTube Premium 하나로 영상 자체 광고 제거 + 1억 곡 이상 음원 스트리밍을 한 번에 해결하세요.
          </p>
          <button
            onClick={() => onOpenModal('YouTube Premium 개인 멤버십 (웹 결제)', 14900)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl accent-gradient text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:opacity-95 transition-all whitespace-nowrap cursor-pointer"
          >
            최대 ₩{totalAnnualSavings.toLocaleString()} 절약하고 시작하기
          </button>
        </div>
      </div>

      {/* 3-Step Trust Timeline */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border border-white/10">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-rose-400">오늘 · ₩0원 청구</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            결제 수단 등록 후 신규 회원 1개월 무료 체험이 시작됩니다.
          </p>
        </div>

        <div className="space-y-2 sm:border-x border-white/10 px-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-zinc-300">
            <Bell className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-white">종료 약 7일 전 · 사전 알림</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            무료 체험 만료 약 7일 전에 등록된 이메일로 사전 안내를 보내드립니다.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-emerald-400">1개월 후 · 정기 결제 또는 해지</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            선택한 요금제로 정기 결제되며, 언제든 위약금 없이 해지 가능합니다.
          </p>
        </div>
      </div>

      {/* Verified FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3 pt-2 text-left">
        <h3 className="text-center text-lg font-bold text-white pb-2">자주 묻는 질문</h3>
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                <span className="pr-4">{faq.q}</span>
                <span className="text-zinc-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
