export interface ProfileExample {
  handle: string;
  name: string;
  posts: string;
  followers: string;
  following: string;
  avatar?: string;
  initials?: string;
  subtitle?: string;
  bioLines?: string[];
  highlightHandle?: string;
  link?: string;
  channelName?: string;
  channelMembers?: string;
}

export interface NicheCard {
  image: string;
  caption: string;
  variant: 'cyan' | 'purple' | 'pink';
  centered?: boolean;
}

export interface StudentResult {
  image: string;
  alt: string;
  accent: 'cyan' | 'purple' | 'pink';
}

export interface TestimonialSlide {
  image: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CHECKOUT_URL = 'https://pay.wiapy.com/2w3O7s9uCmeZ';

export const WHATSAPP_URL =
  'https://wa.me/5515991035895?text=oi%2C+eu+quero+adquirir+o+pack+viral+de+voc%C3%AAs%2C+mas+antes+preciso+tirar+algumas+duvidas.';

export const PROFILE_EXAMPLES: ProfileExample[] = [
  {
    handle: 'evolutionmilionaria',
    name: 'Evolution Milionária',
    posts: '743',
    followers: '470 mil',
    following: '8',
    initials: 'EM',
    subtitle: 'Página de fãs',
  },
  {
    handle: 'desenhoadultoo',
    name: 'Cortes família da pesada',
    posts: '879',
    followers: '238 mil',
    following: '0',
    avatar: '/assets/aistudio/profile-desenho_6a5a93dc.webp',
    bioLines: [
      '😂 Os melhores momentos de Family Guy',
      '🔞 Vídeo todos os dias',
      '👇 Clique em seguir',
    ],
    link: 'girodecarnaval.site',
  },
  {
    handle: 'smsindelicado',
    name: 'Memes e diálogos engraçados',
    posts: '20,2 mil',
    followers: '5,3 mi',
    following: '38',
    avatar: '/assets/aistudio/profile-sms_b22b4247.webp',
    bioLines: [
      '💬 Sabe aquela conversa que você teve no WhatsApp? Ela pode acabar parando aqui.',
    ],
    highlightHandle: '@hyeser',
    link: 's.shopee.com.br/AUkkfNQxPT',
    channelName: 'Apenas diálogos',
    channelMembers: '22,7 mil membros',
  },
];

export const NICHE_CARDS: NicheCard[] = [
  {
    image: '/assets/aistudio/Design-sem-nome-3-1-1_5dd80040_a7f75455.webp',
    caption: 'Mais de 250 cortes de melhores momentos do futebol.',
    variant: 'cyan',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-2-1-1_e15ecb4f_de694280.webp',
    caption: 'Mais de 350 cortes de Family Guy selecionados.',
    variant: 'purple',
  },
  {
    image: '/assets/aistudio/AVIACAO-47-1_71ffc73e_eab66105.webp',
    caption: 'Mais de 2.500 cortes de Vários Animes.',
    variant: 'pink',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-4-1-1_8062e2f9_90fd811b.webp',
    caption:
      'Não tem quem não goste de Cortes de Os Simpsons. Uma das séries animadas mais antigas ainda ativas. Mais de 120 cortes prontos.',
    variant: 'cyan',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-5-1-1_f59abd97_5b0a0eec.webp',
    caption: 'São mais de 900 cortes prontos para postar de filmes e séries variadas.',
    variant: 'purple',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-6-1-1_a988238a_94cc8691.webp',
    caption: 'Mais de 600 cortes prontos de Pica-Pau, a maioria já legendados, só postar!',
    variant: 'pink',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-7-1-1_0772e08a_0d154b03.webp',
    caption:
      'Cortes de Rick and Morty estão viralizando com força. Conteúdos que capturam atenção e entregam humor ácido na medida certa. Receba mais de 100 cortes prontos.',
    variant: 'cyan',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-8-1-1_6e6dd46b_fc470082.webp',
    caption: 'Mais de 130 cortes de Todo Mundo Odeia o Chris prontos para postar.',
    variant: 'purple',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-9-1-1_e14a7024_3d5e889a.webp',
    caption: 'São mais de 500 cortes de Academia para postar na sua página e viralizar!',
    variant: 'pink',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-10-1-1_45aa8c0a.webp',
    caption: 'Mais de 500 vídeos de memes limpos + efeitos sonoros.',
    variant: 'cyan',
  },
  {
    image: '/assets/aistudio/AVIACAO-46_b97374a7.webp',
    caption: 'Centenas de cortes religiosos para viralizar sua página gospel.',
    variant: 'purple',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-12-1-1_de036ac2.webp',
    caption: 'Os melhores cortes de Pablo Marçal.',
    variant: 'pink',
  },
  {
    image: '/assets/aistudio/Design-sem-nome-13-1-1_daea7436.webp',
    caption: '',
    variant: 'cyan',
    centered: true,
  },
];

export const TARGET_AUDIENCE_ITEMS: string[] = [
  'Para quem quer ganhar dinheiro postando vídeos sem aparecer.',
  'Para quem não quer perder tempo criando ou editando.',
  'Para iniciantes, mesmo sem seguidores.',
  'Para quem quer começar usando apenas o celular.',
  'Para quem busca renda extra nas redes sociais.',
  'Para quem trabalha ou estuda e tem pouco tempo.',
];

export const STUDENT_RESULTS: StudentResult[] = [
  {
    image: '/assets/aistudio/result-tiktok-1_0f6a08be.webp',
    alt: 'Perfil @falecomdeus_ com 1,8 milhão de seguidores e 14,8 milhões de curtidas',
    accent: 'cyan',
  },
  {
    image: '/assets/aistudio/result-tiktok-2_a1edd376.webp',
    alt: 'Perfil @itsamerog.2 com 484,5 mil seguidores e 30 milhões de curtidas',
    accent: 'purple',
  },
  {
    image: '/assets/aistudio/result-tiktok-3_fec5d4f3.webp',
    alt: 'Perfil @agoftbl com 293,7 mil seguidores e 35,4 milhões de curtidas',
    accent: 'pink',
  },
];

export const TESTIMONIAL_SLIDES: TestimonialSlide[] = [
  {
    image: '/assets/aistudio/Depoimento_Marcelo_65acef83.webp',
    alt: 'Depoimento Marcelo',
  },
  {
    image: '/assets/aistudio/Depoimento_Leticia_31b70476.webp',
    alt: 'Depoimento Letícia',
  },
  {
    image: '/assets/aistudio/Depoimento_Rafael_275b4200.webp',
    alt: 'Depoimento Rafael',
  },
];

export const OFFER_FEATURES: { text: string; boldPrefix?: string }[] = [
  { text: '100.000 Cortes Virais' },
  { text: '41 Nichos Diferentes' },
  { text: 'Acesso Vitalício' },
  { text: 'Garantia de 30 dias' },
  { text: 'Vídeos 100% Licenciados (Zero Bloqueios nas Plataformas)' },
  { text: "Todos os Vídeos Sem Marca d'Água" },
  { text: 'Cortes Livres de Metadados' },
  { text: '+3 Super Bônus' },
  { text: 'Pack de Memes' },
  { text: 'Efeitos Sonoros' },
  { text: 'Músicas sem Copyright' },
  { text: 'Suporte 24h Ensinando a Viralizar + Número de Quem Já Viralizou' },
  {
    boldPrefix: 'Bônus Extra 1:',
    text: '+50mil cortes virais (totalizando 150mil cortes virais)',
  },
  {
    boldPrefix: 'Presente Surpresa:',
    text: 'Você Também Receberá um Presentinho Especial que Preparamos para Você Ainda Hoje…',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Preciso aparecer?',
    answer: 'Não. Os vídeos já estão prontos pra você postar anonimamente se preferir.',
  },
  {
    question: 'Preciso editar?',
    answer: 'Não. Você pode apenas baixar e postar direto nas suas redes.',
  },
  {
    question: 'Como recebo?',
    answer:
      'O acesso é imediato e enviado para o seu WHATSAPP assim que o pagamento for aprovado.',
  },
  {
    question: 'Funciona pra iniciante?',
    answer:
      'Sim. O pack foi feito exatamente para quem não tem experiência nenhuma com edição ou criação.',
  },
  {
    question: 'Os vídeos têm copyright ou posso tomar bloqueio nas plataformas?',
    answer:
      "Não! Você NÃO vai mais tomar bloqueio das plataformas tentando postar. Todos os vídeos e músicas do pack são 100% LICENCIADOS, totalmente sem copyright (livres de direitos autorais) e sem marcas d'água. Você pode postar no TikTok, Instagram, YouTube Shorts e Kwai e monetizar suas contas com total segurança jurídica.",
  },
  {
    question: 'E se eu tiver dúvida ou precisar de ajuda depois da compra?',
    answer:
      'Quando você compra, você recebe suporte 24 horas ensinando passo a passo como viralizar, além do número direto das melhores pessoas que já viralizaram usando esse pack para te ajudar. E se quiser tirar dúvidas antes de comprar, também atendemos no WhatsApp a qualquer hora!',
  },
];
