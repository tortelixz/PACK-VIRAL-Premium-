import { ArrowLeft, EllipsisVertical, Link as LinkIcon, MessageCircle, UserPlus } from 'lucide-react';
import type { ProfileExample } from '../data/packData';

interface ProfileCardProps {
  profile: ProfileExample;
  isActive: boolean;
  onSelect?: () => void;
}

export function ProfileCard({ profile, isActive, onSelect }: ProfileCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-[#0B0F14] rounded-2xl border transition-all duration-300 p-4 sm:p-5 text-left text-white flex flex-col justify-between ${
        isActive
          ? 'border-[#58D4F2] shadow-[0_0_28px_rgba(88,212,242,0.28),0_10px_32px_rgba(168,85,247,0.18)] md:-translate-y-1.5'
          : 'border-[#58D4F2]/40 hover:border-[#A855F7]/65 shadow-[0_0_16px_rgba(88,212,242,0.12),0_4px_18px_rgba(255,46,147,0.08)] opacity-95 cursor-pointer'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3.5 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-200" aria-hidden="true" />
            <span className="font-bold text-[15px] sm:text-[16px] tracking-tight truncate">{profile.handle}</span>
          </div>
          <EllipsisVertical className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-neutral-300" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-3.5 mb-3">
          {profile.avatar ? (
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0">
              <div className="w-full h-full rounded-full bg-[#0B0F14] p-[2px]">
                <img
                  alt={profile.handle}
                  width={120}
                  height={120}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full rounded-full object-cover"
                  src={profile.avatar}
                />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-black border border-neutral-700 flex items-center justify-center shrink-0 shadow-inner">
              <span className="font-serif text-xl font-semibold tracking-wider text-neutral-200">
                {profile.initials}
              </span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="text-[13px] sm:text-[14px] font-semibold text-white truncate mb-1.5">{profile.name}</div>
            <div className="grid grid-cols-3 gap-1.5 text-left">
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">{profile.posts}</div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">posts</div>
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {profile.followers}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">seguidores</div>
              </div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {profile.following}
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-300 leading-tight">seguindo</div>
              </div>
            </div>
          </div>
        </div>

        {profile.subtitle && <p className="text-xs sm:text-[13px] text-neutral-300 mb-3">{profile.subtitle}</p>}

        {(profile.bioLines || profile.link) && (
          <div className="space-y-1 text-[12px] sm:text-[12.5px] leading-snug mb-3.5 text-neutral-100">
            {profile.bioLines?.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
            {profile.highlightHandle && (
              <div>
                👁️ <span className="text-[#93C5FD]">{profile.highlightHandle}</span>
              </div>
            )}
            {profile.handle === 'smsindelicado' && <div>📩 comercial@husers.com.br</div>}
            {profile.link && (
              <div className="flex items-center gap-1 text-[#7DD3FC] font-medium pt-0.5">
                <LinkIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{profile.link}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {profile.channelName ? (
        <div className="flex items-center gap-1.5 text-xs text-neutral-200 pt-2 border-t border-white/10 mt-auto">
          <MessageCircle className="w-4 h-4 text-neutral-300 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-white">{profile.channelName}</span>
          <span className="text-neutral-400">{profile.channelMembers}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <div className="flex-1 bg-[#4A5DF9] text-white text-xs sm:text-[13px] font-semibold py-2 rounded-md text-center">
            Seguir
          </div>
          <div className="flex-1 bg-[#262A30] text-white text-xs sm:text-[13px] font-semibold py-2 rounded-md text-center">
            Mensagem
          </div>
          <div className="bg-[#262A30] text-white p-2 rounded-md flex items-center justify-center">
            <UserPlus className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}
