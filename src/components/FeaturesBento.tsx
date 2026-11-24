import React, { useState } from 'react';
import { Smartphone, Laptop, Tv, Wifi, WifiOff, Download, Play, MessageSquare, Lock } from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  // Multitasking Phone Simulator State
  const [phoneMode, setPhoneMode] = useState<'watch' | 'pip' | 'lock'>('watch');

  // Offline Simulator State
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(8);

  // Sync Device State
  const [syncDevice, setSyncDevice] = useState<'pc' | 'mobile' | 'tv'>('pc');

  const phoneDescriptions = {
    watch: '현재 상태: 전체 화면 1080p Premium 고화질 스트리밍 시청 중',
    pip: '현재 상태: 메신저 답장 중에도 모바일 PIP 플로팅 창으로 끊김 없이 시청',
    lock: '현재 상태: 화면을 꺼도 백그라운드 오디오 위젯으로 배터리 절약하며 재생',
  };

  const deviceData = {
    pc: {
      label: 'MacBook Pro 웹 브라우저에서 시청 중',
      sub: 'Chrome 브라우저 · 1080p Premium 모드',
      icon: Laptop,
    },
    mobile: {
      label: '스마트폰 YouTube 앱에서 14:28부터 즉시 이어보기',
      sub: 'Galaxy S25 Ultra · 백그라운드 재생 대기',
      icon: Smartphone,
    },
    tv: {
      label: '거실 스마트 TV로 14:28 지점 원터치 캐스팅 연결됨',
      sub: 'LG OLED 65" TV · 5.1ch 지원 영상 오디오 동기화',
      icon: Tv,
    },
  };

  const currentDev = deviceData[syncDevice];
  const DevIcon = currentDev.icon;

  return (
    <section id="features" className="max-w-5xl mx-auto px-6 space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
          Core Multitasking
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          일상을 멈추지 않는 멀티태스킹
        </h2>
        <p className="text-sm text-zinc-400">
          버튼을 눌러 화면 전환과 오프라인 재생, 기기 간 이어보기를 직접 테스트해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Full-Width 5:5 Card (Multitasking & PIP Simulator) */}
        <div className="md:col-span-2 glass-card rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-white/10 hover:border-white/20 transition-all">
          {/* Left: Controls & Copy */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-400 tracking-wide uppercase">
                Background & Picture-in-Picture
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                메신저를 켜도, 화면을 꺼도
                <br />
                재생은 그대로
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                다른 앱으로 이동하거나 스마트폰 화면을 잠가도 오디오와 소형 PIP 화면이 중단 없이 이어집니다.
              </p>
            </div>

            {/* 3 Interactive Mode Selector Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setPhoneMode('watch')}
                className={`py-3 px-2 rounded-2xl text-xs font-semibold transition-all ${
                  phoneMode === 'watch'
                    ? 'border border-rose-500 bg-rose-500/20 text-white shadow-lg shadow-rose-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                기본 시청
              </button>

              <button
                onClick={() => setPhoneMode('pip')}
                className={`py-3 px-2 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  phoneMode === 'pip'
                    ? 'border border-rose-500 bg-rose-500/20 text-white shadow-lg shadow-rose-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                메신저 PIP
              </button>

              <button
                onClick={() => setPhoneMode('lock')}
                className={`py-3 px-2 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  phoneMode === 'lock'
                    ? 'border border-rose-500 bg-rose-500/20 text-white shadow-lg shadow-rose-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                화면 잠금
              </button>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-400">
              {phoneDescriptions[phoneMode]}
            </div>
          </div>

          {/* Right: Phone Simulator Visual */}
          <div className="flex justify-center">
            <div className="w-68 h-[380px] rounded-[38px] bg-zinc-950 border-[6px] border-zinc-800 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
              {/* Phone Notch */}
              <div className="w-24 h-4 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
              </div>

              {/* Mode 1: Default Watch */}
              {phoneMode === 'watch' && (
                <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                  <div className="rounded-2xl aspect-video accent-gradient flex items-center justify-center shadow-lg relative overflow-hidden">
                    <Play className="w-8 h-8 fill-white text-white drop-shadow-md" />
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60">
                      1080p
                    </span>
                  </div>

                  <div className="space-y-2 py-3 text-left">
                    <p className="text-xs font-bold text-white truncate">
                      우주 다큐멘터리: 신비로운 성운 탐사
                    </p>
                    <p className="text-[10px] text-zinc-400">조회수 128만회 · 2일 전</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-12 rounded-xl bg-zinc-900 border border-white/5 p-2.5 flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0 flex items-center justify-center text-[10px] text-zinc-500">
                        NEXT
                      </div>
                      <div className="space-y-1 flex-1 overflow-hidden">
                        <p className="text-[11px] font-medium text-zinc-300 truncate">다음 동영상 자동 이어재생</p>
                        <p className="text-[9px] text-zinc-500">광고 없이 24시간 연속 재생</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Messenger + Floating PIP */}
              {phoneMode === 'pip' && (
                <div className="flex-1 flex flex-col justify-between relative animate-fadeIn text-left">
                  <div className="text-center text-[11px] font-semibold text-zinc-400 pb-2 border-b border-white/10">
                    팀 프로젝트 단톡방
                  </div>

                  <div className="space-y-2.5 my-auto text-[11px]">
                    <div className="bg-zinc-800 text-zinc-200 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%]">
                      지금 공유해 준 영상 분석 자료 확인했어?
                    </div>
                    <div className="bg-amber-400 text-black font-medium px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
                      응! 모바일 PIP 창 띄워놓고 보면서 바로 답장 중이야 👍
                    </div>
                  </div>

                  {/* Floating PIP Window */}
                  <div className="self-end w-32 aspect-video rounded-xl accent-gradient shadow-2xl border-2 border-white/30 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full mb-1">
                      PIP 재생 중
                    </span>
                    <span className="text-[9px] text-white/90 truncate max-w-full">우주 다큐멘터리</span>
                  </div>
                </div>
              )}

              {/* Mode 3: Lock Screen Audio */}
              {phoneMode === 'lock' && (
                <div className="flex-1 flex flex-col justify-between py-2 text-center animate-fadeIn">
                  <div>
                    <p className="text-[11px] text-zinc-400 font-medium">화요일 오전</p>
                    <p className="text-4xl font-bold tracking-tight mt-0.5 text-white">09:41</p>
                  </div>

                  <div className="rounded-2xl bg-zinc-900/95 border border-white/10 p-3.5 text-left space-y-2.5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Deep Focus Playlist</p>
                        <p className="text-[10px] text-zinc-400">백그라운드 오디오 재생 중</p>
                      </div>
                      {/* Bouncing Equalizer Bars */}
                      <div className="flex items-end gap-1 h-5">
                        <span className="w-1 bg-rose-500 eq-bar rounded-full" />
                        <span className="w-1 bg-rose-500 eq-bar rounded-full" />
                        <span className="w-1 bg-rose-500 eq-bar rounded-full" />
                        <span className="w-1 bg-rose-500 eq-bar rounded-full" />
                      </div>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-rose-500" />
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1">
                      <span>화면 꺼짐 절전 모드</span>
                      <span>1080p 오디오 트랙</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Home Indicator */}
              <div className="w-24 h-1 bg-zinc-700 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>

        {/* Bottom Left Card: 1080p Smart Offline Downloads */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between min-h-[300px] border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                Offline & Smart Downloads
              </span>
              <h3 className="text-xl font-bold text-white">비행기 안에서도 끊김 없이</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                최대 1080p Full HD 화질로 스마트폰·태블릿에 미리 저장하여 데이터 소진 없이 시청하세요.
              </p>
            </div>

            <button
              onClick={() => setAirplaneOn(!airplaneOn)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                airplaneOn
                  ? 'border border-emerald-400 bg-emerald-500/25 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              {airplaneOn ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              {airplaneOn ? '✈️ 비행기 모드 ON' : '✈️ 비행기 모드 OFF'}
            </button>
          </div>

          <div
            className={`mt-6 rounded-2xl bg-zinc-900/80 border p-4 flex items-center justify-between transition-all ${
              airplaneOn ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-white/10'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                1080p
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Full HD 다큐멘터리 오프라인 팩</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {airplaneOn
                    ? '오프라인 단절 상태 · 기기 저장본으로 데이터 0원 재생 중'
                    : `Wi-Fi 연결됨 · ${downloadedCount}개 영상 스마트 오프라인 저장 완료`}
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 shrink-0">
              {airplaneOn ? '오프라인 재생 중' : '즉시 시청'}
            </span>
          </div>

          {/* Quick Storage Status */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <span>한국 기준 최대 29일 오프라인 유지 (인터넷 재연결 시 갱신)</span>
            <button
              onClick={() => setDownloadedCount((prev) => prev + 1)}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              영상 추가 저장 (+1)
            </button>
          </div>
        </div>

        {/* Bottom Right Card: Cross-Device Continue Watching */}
        <div className="glass-card rounded-3xl p-7 flex flex-col justify-between min-h-[300px] border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-semibold text-purple-400 tracking-wide uppercase">
              Cross-Device Continue Watching
            </span>
            <h3 className="text-xl font-bold text-white">기기를 바꿔도 14:28 그대로</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              시청을 멈춘 지점부터 다른 화면에서 광고 없이 1초 만에 바로 이어보세요.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {/* 3 Device Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSyncDevice('pc')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  syncDevice === 'pc'
                    ? 'border border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" /> 데스크톱
              </button>

              <button
                onClick={() => setSyncDevice('mobile')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  syncDevice === 'mobile'
                    ? 'border border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> 모바일
              </button>

              <button
                onClick={() => setSyncDevice('tv')}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  syncDevice === 'tv'
                    ? 'border border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-600/20'
                    : 'border border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <Tv className="w-3.5 h-3.5" /> 스마트 TV
              </button>
            </div>

            {/* Sync State Card */}
            <div className="rounded-2xl bg-zinc-900/80 border border-white/10 p-4 space-y-2.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <DevIcon className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">
                    {currentDev.label}
                  </span>
                </div>
                <span className="text-purple-400 font-mono font-bold shrink-0">14:28 / 32:10</span>
              </div>

              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full" />
              </div>

              <p className="text-[11px] text-zinc-400 pt-1">{currentDev.sub}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-zinc-400 text-left">
            <span>오프라인 저장 최대 10대 기기(연 4회 변경) · 개인 계정 동시 재생은 1대 기기 원칙</span>
          </div>
        </div>
      </div>
    </section>
  );
};
