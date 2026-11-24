import React, { useState } from 'react';
import { X, Check, Calendar, Bell, Sparkles } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  planName: string;
  monthlyPrice: number;
  onClose: () => void;
  onActivated: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  planName,
  monthlyPrice,
  onClose,
  onActivated,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakaopay' | 'tosspay' | 'carrier'>('kakaopay');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate dynamic dates
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const noticeDate = new Date(nextMonth);
  noticeDate.setDate(nextMonth.getDate() - 7);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleConfirm = () => {
    setIsSuccess(true);
    onActivated();
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative glass-card bg-zinc-950/95 max-w-md w-full rounded-3xl p-6 sm:p-8 text-center space-y-6 border border-white/15 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="w-12 h-12 rounded-2xl accent-gradient mx-auto flex items-center justify-center font-bold text-lg shadow-lg shadow-rose-600/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-bold text-white tracking-tight">{planName}</h4>
              <p className="text-xs text-zinc-400">
                투명한 결제 조건 및 신규 회원 무료 체험 상세 안내
              </p>
            </div>

            {/* Billing Details Summary */}
            <div className="space-y-3 rounded-2xl bg-zinc-900/80 border border-white/10 p-4 text-xs text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-zinc-400">오늘 청구 금액</span>
                <span className="text-sm font-extrabold text-rose-400 tabular-nums">₩0원 (신규 무료 체험)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  첫 정기 결제 예정일
                </span>
                <span className="font-medium text-white tabular-nums">{formatDate(nextMonth)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-zinc-500" />
                  사전 알림 이메일 발송
                </span>
                <span className="text-zinc-300 font-medium tabular-nums">{formatDate(noticeDate)} (약 7일 전)</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-zinc-400">체험 종료 후 정기 구독료</span>
                <span className="font-bold text-white tabular-nums">
                  월 ₩{monthlyPrice.toLocaleString()} (VAT 10% 포함)
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 text-left">
              <span className="text-xs font-semibold text-zinc-400">웹 결제 수단 선택</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('kakaopay')}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    paymentMethod === 'kakaopay'
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  카카오페이
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tosspay')}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    paymentMethod === 'tosspay'
                      ? 'border-blue-400 bg-blue-400/20 text-blue-300'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  토스페이
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-purple-400 bg-purple-400/20 text-purple-300'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  카드 결제
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('carrier')}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    paymentMethod === 'carrier'
                      ? 'border-emerald-400 bg-emerald-400/20 text-emerald-300'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  통신사 결제
                </button>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed text-left">
              ※ 무료 체험 기간 중 언제든 해지 가능하며, 해지 즉시 서비스가 중단되지 않고 1개월 체험
              만료일까지 Premium 혜택이 정상 유지됩니다.
            </p>

            <button
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-2xl accent-gradient text-xs font-bold text-white shadow-lg shadow-rose-600/30 hover:opacity-95 active:scale-95 transition cursor-pointer"
            >
              오늘 ₩0원으로 1개월 무료 체험 시작
            </button>
          </>
        ) : (
          <div className="space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">무료 체험이 활성화되었습니다!</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                모든 광고 없는 몰입 시청과 백그라운드 재생, YouTube Music 1억 곡을 지금 바로 마음껏
                경험해 보세요.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900/80 border border-emerald-500/30 p-4 text-xs text-left space-y-1">
              <p className="font-semibold text-emerald-300">✓ 만료 7일 전 안내 메일 자동 등록 완료</p>
              <p className="text-zinc-400">등록된 이메일 계정으로 세부 영수증과 해지 링크가 발송되었습니다.</p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition cursor-pointer"
            >
              프로토타입 화면으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
