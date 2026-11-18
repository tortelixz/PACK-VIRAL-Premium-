import { useEffect } from 'react';
import { X } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-[#58D4F2]/50 bg-[#080E1A] p-6 sm:p-8 text-left shadow-[0_20px_55px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <h2
            id="legal-modal-title"
            className="font-['Plus_Jakarta_Sans',sans-serif] text-xl sm:text-2xl font-extrabold text-white"
          >
            {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm sm:text-[15px] text-neutral-200 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                A sua privacidade é importante para nós. É política do <strong>Pack Verso</strong> respeitar a sua
                privacidade em relação a qualquer informação sua que possamos coletar em nosso site e canais de
                atendimento.
              </p>
              <p>
                Solicitamos informações pessoais (como nome, e-mail e número de WhatsApp) apenas quando realmente
                precisamos delas para liberar o seu acesso imediato à área de membros e oferecer suporte técnico após a
                confirmação do pedido.
              </p>
              <p>
                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando
                exigido por lei ou para processamento seguro do pagamento.
              </p>
              <p>
                Em caso de dúvidas sobre como lidamos com dados de usuários e informações pessoais, entre em contato pelo
                e-mail <strong>contato@packverso.shop</strong>.
              </p>
            </>
          ) : (
            <>
              <p>
                Ao acessar e adquirir o <strong>Pack Verso</strong>, você concorda em cumprir estes termos de serviço e
                todas as leis e regulamentos aplicáveis.
              </p>
              <p>
                O acesso adquirido garante licença individual e vitalícia para utilização dos materiais disponíveis na
                área de membros, permitindo baixar e publicar os cortes em seus perfis nas redes sociais (TikTok,
                Instagram, YouTube Shorts, Kwai, entre outros).
              </p>
              <p>
                É proibida a revenda, redistribuição integral do acervo ou compartilhamento público do link da área de
                membros para terceiros sem autorização expressa.
              </p>
              <p>
                Oferecemos garantia incondicional conforme informado na página de oferta. Para solicitações de suporte ou
                garantia, entre em contato pelo e-mail <strong>contato@packverso.shop</strong> ou pelo nosso WhatsApp
                oficial.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#58D4F2] text-[#050912] font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
