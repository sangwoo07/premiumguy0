import React, { useState } from 'react';
import { Play, Pause, Sparkles, Check, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface HeroSectionProps {
  isPremium: boolean;
  onTogglePremium: (force?: boolean) => void;
  onOpenModal: (planName?: string, monthlyPrice?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isPremium,
  onTogglePremium,
  onOpenModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<'nature' | 'live' | 'tech'>('nature');

  const videoMeta = {
    nature: {
      title: 'Aurora Borealis 4K Cinematic Documentary',
      channel: 'Earth Exploration Official',
      duration: '24:18',
      accentColor: 'from-emerald-950/60 via-zinc-950 to-cyan-950/60',
      tag: '자연 & 다큐멘터리',
    },
    live: {
      title: 'World Stadium Tour Live in Seoul (공식 라이브 실황)',
      channel: 'Live Music Arena',
      duration: '18:45',
      accentColor: 'from-purple-950/60 via-zinc-950 to-rose-950/60',
      tag: '라이브 콘서트',
    },
    tech: {
      title: 'Full-Stack Modern Web Engineering Masterclass 2026',
      channel: 'Dev Tech Lab',
      duration: '42:10',
      accentColor: 'from-blue-950/60 via-zinc-950 to-indigo-950/60',
      tag: '개발 튜토리얼',
    },
  };

  const handleToggle = (force?: boolean) => {
    const nextState = typeof force === 'boolean' ? force : !isPremium;
    soundEngine.playSwitchSound(nextState);
    onTogglePremium(force);
  };

  const current = videoMeta[selectedVideo];

  return (
    <section id="hero" className="max-w-5xl mx-auto px-6 text-center relative pt-4">
      {/* Ambient Backdrop Glow */}
      <div
        className={`ambient-glow pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[540px] sm:w-[780px] h-[440px] rounded-full blur-[130px] accent-gradient transition-all duration-700 ${
          isPremium ? 'opacity-40 scale-105' : 'opacity-0 scale-90'
        }`}
      />

      <div className="relative z-10 max-w-2xl mx-auto space-y-5">
        {/* State Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card text-xs text-zinc-300 font-medium">
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              isPremium ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span>{isPremium ? 'Premium 몰입 모드 활성화됨' : '현재 일반 무료 모드 체험 중'}</span>
          <span className="text-zinc-500">|</span>
          <span className="text-[11px] text-zinc-400">대한민국 공식 기준</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
          흐름을 끊는 광고,
          <br />
          <span
            className={`transition-all duration-500 ${
              isPremium ? 'text-gradient' : 'text-zinc-400'
            }`}
          >
            스위치 하나로 지우세요.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl mx-auto leading-relaxed">
          글로 읽는 설명 대신 직접 켜보세요. 영상 전·중간 광고 제거부터 백그라운드 재생, YouTube
          Music까지 즉시 실시간 전환됩니다.
        </p>

        {/* Master Toggle Switch */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center gap-4 p-2 pl-5 pr-2.5 rounded-full glass-card border border-white/15 shadow-2xl">
            <span
              className={`text-xs sm:text-sm font-semibold transition-colors ${
                !isPremium ? 'text-white' : 'text-zinc-500'
              }`}
            >
              일반 모드 OFF
            </span>

            <button
              onClick={() => handleToggle()}
              aria-label="Premium 모드 전환"
              className={`relative w-16 h-9 rounded-full p-1 transition-all duration-500 focus:outline-none cursor-pointer ${
                isPremium ? 'accent-gradient shadow-lg shadow-rose-600/30' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`block w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-500 ${
                  isPremium ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            <span
              className={`text-xs sm:text-sm font-semibold pr-3 transition-colors ${
                isPremium ? 'text-white' : 'text-zinc-500'
              }`}
            >
              Premium ON
            </span>
          </div>
        </div>
      </div>

      {/* 16:9 Symmetric Player Mockup */}
      <div className="relative z-10 mt-10 max-w-4xl mx-auto">
        {/* Video Scenario Switcher Bar */}
        <div className="flex items-center justify-between pb-3 px-1 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">체험 영상:</span>
            <div className="inline-flex p-1 rounded-xl glass-card gap-1">
              {(['nature', 'live', 'tech'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedVideo(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedVideo === key
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {videoMeta[key].tag}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-xs">
            <span>화질 모드:</span>
            <span className="font-semibold text-rose-400">
              {isPremium ? '1080p Premium (향상된 비트레이트)' : '일반 1080p (광고 송출)'}
            </span>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div
          className={`aspect-video w-full rounded-3xl overflow-hidden glass-card border shadow-2xl relative transition-all duration-700 ${
            isPremium ? 'border-rose-500/30 shadow-rose-950/40' : 'border-white/15 shadow-black'
          }`}
        >
          {/* Cinema Visual Surface */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700 ${
              isPremium
                ? `bg-gradient-to-br ${current.accentColor}`
                : 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900'
            }`}
          >
            {/* Top Badges (Verified Real Specs Only) */}
            <div
              className={`absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between transition-all duration-500 pointer-events-none ${
                isPremium
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-rose-400 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                1080p Premium 향상된 비트레이트
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-purple-300 flex items-center gap-1.5 shadow-lg">
                <Volume2 className="w-3.5 h-3.5 text-purple-300" />
                공식 음원·뮤비 256kbps 고음질
              </span>
            </div>

            {/* Center Visual Content */}
            <div className="text-center space-y-4 max-w-lg mx-auto z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                  isPremium
                    ? 'bg-rose-500/25 border border-rose-400/50 text-white hover:scale-110 shadow-lg shadow-rose-600/30'
                    : 'bg-white/10 border border-white/20 text-zinc-300 hover:scale-105'
                }`}
                aria-label={isPlaying ? '일시정지' : '재생'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white text-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white text-white ml-1" />
                )}
              </button>

              <div className="space-y-1">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {current.channel}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-medium text-zinc-300">
                {isPremium ? (
                  <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    광고 없이 1080p Premium 향상된 비트레이트 연속 재생 중
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold">광고 대기 중 · 영상 시작 전 1/2</span>
                )}
              </p>
            </div>

            {/* FREE MODE: ANNOYING AD OVERLAYS */}
            {!isPremium && (
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 bg-black/65 backdrop-blur-[2px] transition-all duration-500 z-20">
                {/* Ad Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-amber-400 text-black text-xs font-bold">
                      광고 1/2 · 0:15
                    </span>
                    <span className="text-xs text-zinc-300 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                      스폰서 광고 노출 중
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">일반 회원 시청 화면</span>
                </div>

                {/* Mid Interruption Banner */}
                <div className="max-w-md mx-auto w-full rounded-2xl bg-zinc-900/95 border border-amber-400/50 p-4 flex items-center justify-between gap-3 shadow-2xl">
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-amber-300">
                      시청 흐름이 끊기셨나요?
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      상단 스위치를 켜면 유튜브 자체 전·중간 광고가 즉시 사라집니다. (크리에이터 PPL 제외)
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(true)}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 active:scale-95 transition"
                  >
                    광고 즉시 제거
                  </button>
                </div>

                {/* Bottom Ad Skip & Yellow Scrubber */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleToggle(true)}
                      className="px-4 py-2 rounded-xl bg-zinc-900/95 hover:bg-zinc-800 border border-white/30 text-xs font-semibold text-white flex items-center gap-1.5 transition active:scale-95 shadow-lg"
                    >
                      광고 건너뛰고 Premium 체험 <span>⏭</span>
                    </button>
                  </div>
                  {/* Yellow Scrubber indicating ads */}
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden flex">
                    <div className="w-1/3 h-full bg-amber-400 rounded-full" />
                    <div className="w-1/4 h-full bg-zinc-700 mx-1" />
                    <div className="w-2 h-full bg-amber-400 mr-8" />
                    <div className="w-2 h-full bg-amber-400 mr-16" />
                  </div>
                </div>
              </div>
            )}

            {/* PREMIUM MODE: CLEAN CINEMA TIMELINE BAR */}
            {isPremium && (
              <div className="absolute bottom-4 inset-x-6 z-20 space-y-2 pointer-events-auto">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-zinc-300">
                  <span className="font-mono font-medium">
                    04:12 / {current.duration} · 끊김 없는 몰입 재생
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px]">
                      Ambient Mode Active
                    </span>
                    <button
                      onClick={() => onOpenModal('YouTube Premium 개인 멤버십 (웹 결제)')}
                      className="text-rose-400 hover:text-rose-300 underline font-semibold text-[11px]"
                    >
                      1개월 무료 가입
                    </button>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full accent-gradient rounded-full progress-live" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
