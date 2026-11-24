import React, { useState } from 'react';
import { Play, Pause, Disc3, Radio, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface MusicJukeboxProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MusicJukebox: React.FC<MusicJukeboxProps> = ({ isMuted, onToggleMute }) => {
  const [selectedMood, setSelectedMood] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const moods = [
    {
      title: 'Midnight Desk Beats',
      genre: '#집중코딩_LoFi',
      desc: '새벽 코딩과 업무 집중을 위한 차분한 칠홉 비트',
      glow: 'bg-blue-600/30',
      centerGrad: 'from-blue-500 to-indigo-600',
      borderActive: 'border-blue-400 bg-blue-500/15',
      accentText: 'text-blue-400',
      bpm: '78 BPM · Mellow Lo-Fi',
    },
    {
      title: 'Neon Highway Drive',
      genre: '#퇴근길_시티팝',
      desc: '도심 야경과 함께 달리는 경쾌한 레트로 신스팝',
      glow: 'bg-pink-600/30',
      centerGrad: 'from-pink-500 to-rose-600',
      borderActive: 'border-pink-400 bg-pink-500/15',
      accentText: 'text-pink-400',
      bpm: '108 BPM · Retro Synth',
    },
    {
      title: 'Gym Power Boost',
      genre: '#텐션업_힙합',
      desc: '한계 돌파를 위한 파워풀한 808 베이스 힙합',
      glow: 'bg-emerald-600/30',
      centerGrad: 'from-emerald-400 to-teal-600',
      borderActive: 'border-emerald-400 bg-emerald-500/15',
      accentText: 'text-emerald-400',
      bpm: '130 BPM · Punchy Trap',
    },
    {
      title: 'Wembley Live Audio',
      genre: '#라이브_콘서트',
      desc: '현장 관객 함성과 생생한 무대 사운드를 담은 라이브 실황 음원',
      glow: 'bg-amber-600/30',
      centerGrad: 'from-amber-400 to-orange-600',
      borderActive: 'border-amber-400 bg-amber-500/15',
      accentText: 'text-amber-400',
      bpm: '라이브 실황 · 256kbps AAC/Opus',
    },
  ];

  const current = moods[selectedMood];

  const handleSelectMood = (idx: number) => {
    setSelectedMood(idx);
    if (isPlaying) {
      soundEngine.startMoodMusic(idx);
    }
  };

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      soundEngine.startMoodMusic(selectedMood);
    } else {
      soundEngine.pauseMusic();
    }
  };

  return (
    <section id="music" className="max-w-5xl mx-auto px-6">
      <div className="glass-card rounded-3xl p-7 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative overflow-hidden border border-white/10 hover:border-white/20 transition-all">
        {/* Dynamic Ambient Background Glow */}
        <div
          className={`pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full blur-[120px] transition-all duration-700 ${current.glow}`}
        />

        {/* Left: Copy + 2x2 Mood Grid */}
        <div className="space-y-6 text-center md:text-left relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              YouTube Music Premium 포함
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              음원 앱 중복 결제 끝.
              <br />
              1억 곡 이상 기본 포함.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              정식 발매 음원은 물론 커버곡, 리믹스, 라이브 무대 음원까지 별도 음원 스트리밍 결제 없이
              광고 없이 감상하세요. 공식 음원 기준 최고 256kbps AAC/Opus 음질을 제공합니다.
              <span className="block text-[11px] text-zinc-500 mt-1">
                ※ 무손실(FLAC) 및 Dolby Atmos·공간 음향은 미지원
              </span>
            </p>
          </div>

          {/* 2x2 Mood Selector Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {moods.map((m, idx) => (
              <button
                key={m.genre}
                onClick={() => handleSelectMood(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedMood === idx
                    ? `${m.borderActive} shadow-lg shadow-black/40 scale-[1.02]`
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white">{m.genre}</p>
                  {selectedMood === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 truncate">{m.title}</p>
              </button>
            ))}
          </div>

          {/* Sound Preview Indicator */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-400" />
              <span>{isMuted ? '인터랙티브 신스 사운드 음소거됨' : '웹 오디오 실시간 생성 중'}</span>
            </div>
            <button
              onClick={onToggleMute}
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              {isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" /> 사운드 켜기
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" /> 음소거
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Symmetric Vinyl & Equalizer */}
        <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
          {/* Vinyl Disc Container */}
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
            <div
              className={`w-full h-full rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 border-4 border-zinc-700/60 shadow-2xl flex items-center justify-center relative transition-transform ${
                isPlaying ? 'vinyl-spin' : 'vinyl-spin vinyl-paused'
              }`}
            >
              {/* Vinyl Grooves Effect */}
              <div className="absolute inset-4 rounded-full border border-zinc-700/20 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-zinc-700/30 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-zinc-700/20 pointer-events-none" />

              {/* Center Vinyl Label */}
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${current.centerGrad} flex items-center justify-center shadow-inner transition-all duration-700`}
              >
                <div className="w-5 h-5 rounded-full bg-zinc-950 border-2 border-white/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
              </div>
            </div>

            {/* Stylus Arm Visual Hint */}
            <div className="absolute -top-3 -right-2 pointer-events-none opacity-80">
              <Disc3 className="w-6 h-6 text-zinc-500 animate-spin" />
            </div>
          </div>

          {/* Player Controller Bar */}
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900/90 border border-white/10 px-5 py-4 flex items-center justify-between shadow-2xl">
            <div className="text-left overflow-hidden mr-3">
              <p className="text-sm font-bold text-white truncate">{current.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                <span className="font-semibold text-purple-300">256kbps AAC</span>
                <span>·</span>
                <span className="truncate">{current.bpm}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Equalizer Bars */}
              <div className="flex items-end gap-1 h-5">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <span
                    key={bar}
                    className={`w-1 bg-rose-500 rounded-full eq-bar ${
                      !isPlaying ? 'style-paused' : ''
                    }`}
                    style={{
                      animationPlayState: isPlaying ? 'running' : 'paused',
                      opacity: isPlaying ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={handleTogglePlay}
                aria-label={isPlaying ? '일시정지' : '재생'}
                className="w-9 h-9 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
