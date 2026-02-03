// Frameworks Teóricos por Produto MGS - Metodologia Allan Barros
// Substrato teórico dividido em módulos para cada produto

export interface ModuloFramework {
  id: string;
  titulo: string;
  descricao: string;
  pilares: string[];
  ferramentas: string[];
  metricas: string[];
}

export interface FrameworkProduto {
  produtoId: string;
  nome: string;
  metodologia: string;
  visaoGeral: string;
  modulos: ModuloFramework[];
  referencias: string[];
  casesDeSuccesso: string[];
  alertas: string[];
  vantagens: string[];
}

export const frameworksPorProduto: Record<string, FrameworkProduto> = {
  "calendario-exponencial": {
    produtoId: "calendario-exponencial",
    nome: "Calendário Exponencial",
    metodologia: "HyperCube",
    visaoGeral: "Metodologia de planejamento estratégico anual que integra visão de negócio, marketing e vendas em um calendário unificado de ações exponenciais.",
    modulos: [
      {
        id: "diagnostico",
        titulo: "Módulo 1: Diagnóstico Exponencial",
        descricao: "Análise profunda do estado atual do negócio e identificação de gaps de crescimento",
        pilares: [
          "Análise de faturamento histórico",
          "Mapeamento de canais de aquisição",
          "Identificação de gargalos operacionais",
          "Benchmark com concorrentes"
        ],
        ferramentas: ["Matriz SWOT Exponencial", "Funil de Conversão Atual", "Análise de Cohort"],
        metricas: ["CAC atual", "LTV médio", "ROAS por canal", "Taxa de conversão por etapa"]
      },
      {
        id: "visao",
        titulo: "Módulo 2: Visão de Futuro",
        descricao: "Definição de metas exponenciais e construção do cenário ideal",
        pilares: [
          "Meta de faturamento anual",
          "Número de clientes desejados",
          "Ticket médio ideal",
          "Posicionamento de mercado"
        ],
        ferramentas: ["Canvas de Visão Exponencial", "OKRs Trimestrais", "Roadmap Anual"],
        metricas: ["Gap entre atual e desejado", "Taxa de crescimento necessária", "Investimento requerido"]
      },
      {
        id: "calendario",
        titulo: "Módulo 3: Construção do Calendário",
        descricao: "Montagem do calendário de ações com datas, investimentos e metas por campanha",
        pilares: [
          "Definição de Tiers de campanha",
          "Distribuição de investimento mensal",
          "Sazonalidades e oportunidades",
          "Integração com eventos do mercado"
        ],
        ferramentas: ["Template HyperCube", "Calculadora de Campanhas", "Matriz de Priorização"],
        metricas: ["Meta por campanha", "Investimento por tier", "ROAS projetado"]
      },
      {
        id: "execucao",
        titulo: "Módulo 4: Plano de Execução",
        descricao: "Detalhamento operacional de cada campanha do calendário",
        pilares: [
          "Cronograma de produção",
          "Alocação de equipe",
          "Checklist de entregáveis",
          "Pontos de controle"
        ],
        ferramentas: ["Gantt de Campanhas", "Checklist de Lançamento", "Dashboard de Acompanhamento"],
        metricas: ["Prazo de entrega", "Taxa de conclusão", "Qualidade dos entregáveis"]
      }
    ],
    referencias: [
      "Livro: Jornada Exponencial - Allan Barros",
      "Framework: HyperCube Planning",
      "Case: Calendário 2025 - R$ 30M em faturamento"
    ],
    casesDeSuccesso: [
      "Empresa X: De R$ 2M para R$ 8M em 12 meses",
      "Empresa Y: 4x de crescimento com calendário estruturado",
      "Empresa Z: ROAS médio de 5x em todas as campanhas"
    ],
    alertas: [
      "Não subestimar tempo de produção de criativos",
      "Considerar sazonalidades do mercado",
      "Manter reserva de contingência (10-15%)",
      "Validar capacidade operacional antes de escalar"
    ],
    vantagens: [
      "Visão clara do ano inteiro",
      "Previsibilidade de faturamento",
      "Otimização de recursos",
      "Redução de decisões de última hora"
    ]
  },
  "jornada-exponencial": {
    produtoId: "jornada-exponencial",
    nome: "Jornada Exponencial",
    metodologia: "Transformação 360°",
    visaoGeral: "Imersão de 3 dias para transformação completa do negócio, integrando estratégia, marketing, vendas e operações em um plano de ação executável.",
    modulos: [
      {
        id: "fundamentos",
        titulo: "Módulo 1: Fundamentos do Negócio Exponencial",
        descricao: "Construção das bases sólidas para crescimento acelerado",
        pilares: [
          "Proposta de valor única",
          "Modelo de negócio escalável",
          "Posicionamento de mercado",
          "Diferenciação competitiva"
        ],
        ferramentas: ["Canvas de Proposta de Valor", "Modelo de Negócio Exponencial", "Matriz de Posicionamento"],
        metricas: ["NPS", "Market share", "Brand awareness", "Recall de marca"]
      },
      {
        id: "aquisicao",
        titulo: "Módulo 2: Motor de Aquisição",
        descricao: "Construção de máquina de geração de leads e vendas previsíveis",
        pilares: [
          "Funil de vendas otimizado",
          "Canais de aquisição diversificados",
          "Automação de marketing",
          "Gestão de tráfego pago"
        ],
        ferramentas: ["Funil de Conversão", "Matriz de Canais", "Automações de Nurturing"],
        metricas: ["CPL", "CAC", "Taxa de conversão", "Velocidade do funil"]
      },
      {
        id: "escala",
        titulo: "Módulo 3: Estratégias de Escala",
        descricao: "Metodologias para multiplicar resultados sem multiplicar problemas",
        pilares: [
          "Processos documentados",
          "Equipe de alta performance",
          "Tecnologia como alavanca",
          "Cultura de dados"
        ],
        ferramentas: ["Playbook de Processos", "Framework de Contratação", "Stack Tecnológico"],
        metricas: ["Produtividade por colaborador", "Tempo de onboarding", "Taxa de retenção de talentos"]
      },
      {
        id: "plano",
        titulo: "Módulo 4: Plano de Ação 90 Dias",
        descricao: "Construção do plano executável para os próximos 90 dias",
        pilares: [
          "Priorização de iniciativas",
          "Definição de responsáveis",
          "Cronograma detalhado",
          "Métricas de acompanhamento"
        ],
        ferramentas: ["OKRs Trimestrais", "Kanban de Projetos", "Dashboard de Resultados"],
        metricas: ["Taxa de execução", "Resultados vs metas", "ROI das iniciativas"]
      }
    ],
    referencias: [
      "Livro: Jornada Exponencial - Allan Barros",
      "Framework: Transformação 360°",
      "Metodologia: Sprint de 90 Dias"
    ],
    casesDeSuccesso: [
      "Participante A: Triplicou faturamento em 6 meses",
      "Participante B: Saiu de 0 para R$ 1M/mês",
      "Participante C: Estruturou equipe de 3 para 25 pessoas"
    ],
    alertas: [
      "Implementação requer dedicação pós-imersão",
      "Mudanças culturais levam tempo",
      "Necessário investimento em equipe e tecnologia",
      "Resultados dependem de execução disciplinada"
    ],
    vantagens: [
      "Visão sistêmica do negócio",
      "Networking com outros empresários",
      "Acesso a metodologias testadas",
      "Mentoria direta com Allan Barros"
    ]
  },
  "brand-posicionamento": {
    produtoId: "brand-posicionamento",
    nome: "Brand e Posicionamento",
    metodologia: "Arquitetura de Marca",
    visaoGeral: "Construção de marca pessoal e empresarial com posicionamento estratégico para dominar o mercado e justificar premium pricing.",
    modulos: [
      {
        id: "essencia",
        titulo: "Módulo 1: Essência da Marca",
        descricao: "Descoberta do DNA da marca e definição de propósito",
        pilares: [
          "Propósito e missão",
          "Valores fundamentais",
          "Personalidade da marca",
          "Tom de voz"
        ],
        ferramentas: ["Brand Essence Canvas", "Arquétipos de Marca", "Mapa de Personalidade"],
        metricas: ["Clareza de posicionamento", "Consistência de comunicação", "Recall de marca"]
      },
      {
        id: "posicionamento",
        titulo: "Módulo 2: Estratégia de Posicionamento",
        descricao: "Definição do espaço único que a marca ocupará na mente do consumidor",
        pilares: [
          "Análise de concorrentes",
          "Identificação de gaps de mercado",
          "Proposta de valor única",
          "Território de marca"
        ],
        ferramentas: ["Mapa de Posicionamento", "Análise de Concorrentes", "Canvas de Diferenciação"],
        metricas: ["Share of voice", "Percepção de valor", "Preferência de marca"]
      },
      {
        id: "narrativa",
        titulo: "Módulo 3: Narrativa de Marca",
        descricao: "Construção da história que conecta emocionalmente com o público",
        pilares: [
          "Storytelling de origem",
          "Jornada do herói aplicada",
          "Manifesto de marca",
          "Mensagens-chave"
        ],
        ferramentas: ["Framework de Storytelling", "Template de Manifesto", "Banco de Mensagens"],
        metricas: ["Engajamento emocional", "Compartilhamento orgânico", "Conexão com audiência"]
      },
      {
        id: "execucao-brand",
        titulo: "Módulo 4: Execução e Consistência",
        descricao: "Implementação da marca em todos os pontos de contato",
        pilares: [
          "Identidade visual",
          "Guidelines de marca",
          "Touchpoints prioritários",
          "Governança de marca"
        ],
        ferramentas: ["Brand Book", "Checklist de Touchpoints", "Calendário de Conteúdo"],
        metricas: ["Consistência visual", "NPS de marca", "Brand equity"]
      }
    ],
    referencias: [
      "Framework: Arquitetura de Marca Exponencial",
      "Referência: Ogilvy on Branding",
      "Case: Construção de autoridade no digital"
    ],
    casesDeSuccesso: [
      "Expert A: De desconhecido a referência em 18 meses",
      "Empresa B: Premium pricing 3x acima do mercado",
      "Marca C: Top of mind no segmento"
    ],
    alertas: [
      "Branding é investimento de longo prazo",
      "Consistência é mais importante que perfeição",
      "Marca pessoal requer exposição contínua",
      "Reposicionamento pode confundir audiência existente"
    ],
    vantagens: [
      "Justifica premium pricing",
      "Reduz custo de aquisição",
      "Aumenta fidelização",
      "Facilita expansão de portfólio"
    ]
  },
  "criatividade-exponencial": {
    produtoId: "criatividade-exponencial",
    nome: "Criatividade Exponencial",
    metodologia: "Desbloqueio Criativo",
    visaoGeral: "Metodologia para desbloquear a criatividade e aplicá-la estrategicamente na comunicação e inovação de negócios.",
    modulos: [
      {
        id: "desbloqueio",
        titulo: "Módulo 1: Desbloqueio Criativo",
        descricao: "Técnicas para superar bloqueios e acessar o potencial criativo",
        pilares: [
          "Identificação de bloqueios",
          "Técnicas de brainstorming",
          "Pensamento lateral",
          "Mindset de abundância"
        ],
        ferramentas: ["Mapa de Bloqueios", "Técnicas de Ideação", "Exercícios de Criatividade"],
        metricas: ["Volume de ideias geradas", "Qualidade das ideias", "Tempo de ideação"]
      },
      {
        id: "aplicacao",
        titulo: "Módulo 2: Criatividade Aplicada",
        descricao: "Como transformar ideias criativas em comunicação efetiva",
        pilares: [
          "Big Ideas memoráveis",
          "Conceitos de campanha",
          "Storytelling criativo",
          "Disrupção estratégica"
        ],
        ferramentas: ["Framework de Big Idea", "Canvas de Conceito", "Matriz de Disrupção"],
        metricas: ["Memorabilidade", "Diferenciação", "Impacto emocional"]
      }
    ],
    referencias: [
      "Framework: Criatividade Estratégica",
      "Referência: A Technique for Producing Ideas - James Webb Young",
      "Metodologia: Design Thinking aplicado"
    ],
    casesDeSuccesso: [
      "Campanha A: Viral orgânico com 10M de views",
      "Conceito B: Reposicionamento que dobrou vendas",
      "Criativo C: CTR 5x acima da média do mercado"
    ],
    alertas: [
      "Criatividade sem estratégia é arte, não marketing",
      "Testar antes de escalar",
      "Nem toda ideia criativa é boa ideia de negócio"
    ],
    vantagens: [
      "Diferenciação no mercado saturado",
      "Redução de custo de mídia",
      "Maior engajamento orgânico",
      "Construção de marca memorável"
    ]
  },
  "sales-exponencial": {
    produtoId: "sales-exponencial",
    nome: "Sales Exponencial",
    metodologia: "Vendas de Alta Performance",
    visaoGeral: "Técnicas avançadas de vendas consultivas e negociação para fechar mais negócios com tickets maiores.",
    modulos: [
      {
        id: "fundamentos-vendas",
        titulo: "Módulo 1: Fundamentos de Vendas Consultivas",
        descricao: "Base sólida para vendas de alto valor",
        pilares: [
          "Mindset de vendedor consultor",
          "Processo de descoberta",
          "Qualificação de leads",
          "Construção de rapport"
        ],
        ferramentas: ["Script de Descoberta", "Matriz de Qualificação", "Checklist de Rapport"],
        metricas: ["Taxa de qualificação", "Tempo médio de venda", "NPS de atendimento"]
      },
      {
        id: "negociacao",
        titulo: "Módulo 2: Negociação e Fechamento",
        descricao: "Técnicas para conduzir negociações e fechar com confiança",
        pilares: [
          "Ancoragem de preço",
          "Tratamento de objeções",
          "Técnicas de fechamento",
          "Follow-up estratégico"
        ],
        ferramentas: ["Banco de Objeções", "Scripts de Fechamento", "Sequência de Follow-up"],
        metricas: ["Taxa de conversão", "Ticket médio", "Ciclo de vendas"]
      }
    ],
    referencias: [
      "Framework: Vendas Consultivas Exponenciais",
      "Referência: SPIN Selling",
      "Metodologia: Challenger Sale adaptada"
    ],
    casesDeSuccesso: [
      "Vendedor A: De R$ 50K para R$ 500K/mês",
      "Equipe B: Taxa de conversão de 15% para 45%",
      "Empresa C: Ticket médio 2x maior"
    ],
    alertas: [
      "Vendas é processo, não talento",
      "Scripts são guias, não prisões",
      "Follow-up é onde a maioria falha"
    ],
    vantagens: [
      "Previsibilidade de receita",
      "Escalabilidade de equipe",
      "Redução de ciclo de vendas",
      "Aumento de ticket médio"
    ]
  },
  "growth-exponencial": {
    produtoId: "growth-exponencial",
    nome: "Growth Exponencial",
    metodologia: "Growth Hacking Estratégico",
    visaoGeral: "Estratégias de crescimento acelerado baseadas em experimentação, dados e otimização contínua.",
    modulos: [
      {
        id: "fundamentos-growth",
        titulo: "Módulo 1: Fundamentos de Growth",
        descricao: "Mentalidade e processos para crescimento acelerado",
        pilares: [
          "Mindset de experimentação",
          "North Star Metric",
          "Funil AARRR",
          "Cultura de dados"
        ],
        ferramentas: ["Framework AARRR", "Priorização ICE", "Dashboard de Growth"],
        metricas: ["North Star Metric", "Taxa de ativação", "Retenção", "Referral"]
      },
      {
        id: "experimentacao",
        titulo: "Módulo 2: Experimentação e Escala",
        descricao: "Como rodar experimentos e escalar o que funciona",
        pilares: [
          "Hipóteses estruturadas",
          "Testes A/B",
          "Análise de resultados",
          "Playbook de escala"
        ],
        ferramentas: ["Template de Experimento", "Calculadora de Significância", "Playbook de Escala"],
        metricas: ["Velocidade de experimentos", "Win rate", "Impacto no North Star"]
      }
    ],
    referencias: [
      "Framework: Growth Exponencial",
      "Referência: Hacking Growth - Sean Ellis",
      "Metodologia: Lean Startup aplicada"
    ],
    casesDeSuccesso: [
      "Startup A: 10x crescimento em 12 meses",
      "Empresa B: CAC reduzido em 60%",
      "Produto C: Retenção de 20% para 65%"
    ],
    alertas: [
      "Growth sem produto bom é desperdício",
      "Nem todo hack é sustentável",
      "Dados ruins levam a decisões ruins"
    ],
    vantagens: [
      "Crescimento baseado em dados",
      "Redução de desperdício",
      "Velocidade de aprendizado",
      "Escalabilidade previsível"
    ]
  },
  "ia-exponencial": {
    produtoId: "ia-exponencial",
    nome: "IA Exponencial",
    metodologia: "IA Aplicada aos Negócios",
    visaoGeral: "Como usar Inteligência Artificial para automatizar, otimizar e escalar operações de marketing e vendas.",
    modulos: [
      {
        id: "fundamentos-ia",
        titulo: "Módulo 1: Fundamentos de IA para Negócios",
        descricao: "Entendendo IA e identificando oportunidades de aplicação",
        pilares: [
          "O que é IA (e o que não é)",
          "Tipos de IA aplicáveis",
          "Identificação de use cases",
          "ROI de implementação"
        ],
        ferramentas: ["Mapa de Oportunidades IA", "Calculadora de ROI", "Matriz de Priorização"],
        metricas: ["Tempo economizado", "Custo reduzido", "Qualidade aumentada"]
      },
      {
        id: "implementacao-ia",
        titulo: "Módulo 2: Implementação Prática",
        descricao: "Como implementar IA no dia a dia do negócio",
        pilares: [
          "Ferramentas de IA disponíveis",
          "Prompts efetivos",
          "Automações com IA",
          "Integração com processos"
        ],
        ferramentas: ["Biblioteca de Prompts", "Stack de Ferramentas IA", "Workflows Automatizados"],
        metricas: ["Adoção da equipe", "Produtividade", "Qualidade de output"]
      }
    ],
    referencias: [
      "Framework: IA Exponencial",
      "Ferramentas: ChatGPT, Claude, Midjourney, etc.",
      "Metodologia: AI-First Marketing"
    ],
    casesDeSuccesso: [
      "Equipe A: 10x mais conteúdo com mesma equipe",
      "Empresa B: Atendimento 24/7 com chatbot",
      "Marketing C: Criativos em 1/10 do tempo"
    ],
    alertas: [
      "IA é ferramenta, não substituto de estratégia",
      "Qualidade do input define qualidade do output",
      "Supervisão humana ainda é necessária"
    ],
    vantagens: [
      "Escala sem proporcional aumento de custo",
      "Velocidade de produção",
      "Consistência de qualidade",
      "Disponibilidade 24/7"
    ]
  }
};

// Sugestões de nomes de campanha por tipo
export const sugestoesNomesCampanha = {
  lancamento: [
    "Operação Decolagem",
    "Projeto Ignição",
    "Missão Transformação",
    "Operação Virada",
    "Projeto Despertar",
    "Missão Exponencial",
    "Operação Impacto",
    "Projeto Ascensão",
    "Missão Breakthrough",
    "Operação Revolução"
  ],
  perpetuo: [
    "Fluxo Contínuo",
    "Máquina de Vendas",
    "Evergreen Power",
    "Funil Perpétuo",
    "Sistema Automático",
    "Motor de Crescimento",
    "Pipeline Infinito",
    "Gerador de Leads",
    "Captação Contínua",
    "Aquisição 24/7"
  ],
  remarketing: [
    "Operação Resgate",
    "Projeto Reconexão",
    "Missão Reativação",
    "Operação Segunda Chance",
    "Projeto Retorno",
    "Missão Recuperação",
    "Operação Reconquista",
    "Projeto Reencontro",
    "Missão Reengajamento",
    "Operação Comeback"
  ],
  upsell: [
    "Projeto Evolução",
    "Operação Upgrade",
    "Missão Premium",
    "Projeto Ascensão VIP",
    "Operação Next Level",
    "Missão Elite",
    "Projeto Expansão",
    "Operação Crescimento",
    "Missão Multiplicação",
    "Projeto Potencialização"
  ]
};

// Sugestões de nomes de produto
export const sugestoesNomesProduto = [
  "Exponencial",
  "Intensivo",
  "Masterclass",
  "Imersão",
  "Bootcamp",
  "Academy",
  "Lab",
  "Summit",
  "Experience",
  "Journey"
];

// Sugestões de trilhas sonoras por tipo de conteúdo
export const sugestoesTrilhas = {
  motivacional: [
    { nome: "Epic Cinematic", estilo: "Orquestral épico", uso: "Abertura de manifesto" },
    { nome: "Inspirational Corporate", estilo: "Corporate motivacional", uso: "Vídeos institucionais" },
    { nome: "Uplifting Piano", estilo: "Piano emocional", uso: "Depoimentos e transformação" },
    { nome: "Powerful Drums", estilo: "Percussão intensa", uso: "Chamadas para ação" },
    { nome: "Victory Theme", estilo: "Triunfante", uso: "Resultados e conquistas" }
  ],
  educacional: [
    { nome: "Minimal Tech", estilo: "Eletrônico minimalista", uso: "Explicações técnicas" },
    { nome: "Soft Background", estilo: "Ambiente suave", uso: "Conteúdo longo" },
    { nome: "Focus Flow", estilo: "Lo-fi concentração", uso: "Tutoriais" },
    { nome: "Clean Corporate", estilo: "Corporate neutro", uso: "Apresentações" },
    { nome: "Gentle Acoustic", estilo: "Violão suave", uso: "Storytelling" }
  ],
  urgencia: [
    { nome: "Countdown Tension", estilo: "Tensão crescente", uso: "Escassez e urgência" },
    { nome: "Fast Pace", estilo: "Ritmo acelerado", uso: "Ofertas limitadas" },
    { nome: "Dramatic Build", estilo: "Construção dramática", uso: "Revelações" },
    { nome: "Action Pulse", estilo: "Pulso de ação", uso: "CTAs fortes" },
    { nome: "Ticking Clock", estilo: "Relógio", uso: "Deadlines" }
  ],
  emocional: [
    { nome: "Heartfelt Strings", estilo: "Cordas emocionais", uso: "Histórias de superação" },
    { nome: "Nostalgic Piano", estilo: "Piano nostálgico", uso: "Memórias e origem" },
    { nome: "Warm Acoustic", estilo: "Acústico acolhedor", uso: "Conexão pessoal" },
    { nome: "Gentle Hope", estilo: "Esperança suave", uso: "Transformação" },
    { nome: "Emotional Journey", estilo: "Jornada emocional", uso: "Narrativas longas" }
  ]
};

// Metodologias de criativo
export const metodologiasCriativo = [
  { id: "aida", nome: "AIDA", descricao: "Atenção, Interesse, Desejo, Ação", uso: "Criativos de conversão" },
  { id: "pas", nome: "PAS", descricao: "Problema, Agitação, Solução", uso: "Criativos de dor" },
  { id: "bab", nome: "BAB", descricao: "Before, After, Bridge", uso: "Criativos de transformação" },
  { id: "4ps", nome: "4Ps", descricao: "Promise, Picture, Proof, Push", uso: "Criativos de oferta" },
  { id: "hook-story-offer", nome: "Hook-Story-Offer", descricao: "Gancho, História, Oferta", uso: "Vídeos de vendas" },
  { id: "star", nome: "STAR", descricao: "Situação, Tarefa, Ação, Resultado", uso: "Cases e depoimentos" },
  { id: "quest", nome: "QUEST", descricao: "Qualify, Understand, Educate, Stimulate, Transition", uso: "Conteúdo educacional" },
  { id: "slap", nome: "SLAP", descricao: "Stop, Look, Act, Purchase", uso: "Criativos de impulso" }
];

// Tipos de criativo
export const tiposCriativo = {
  video: [
    { id: "corte-podcast", nome: "Corte de Podcast", descricao: "Trecho de entrevista ou podcast" },
    { id: "nativo", nome: "Nativo/UGC", descricao: "Estilo orgânico, gravado com celular" },
    { id: "reaproveitado", nome: "Reaproveitado", descricao: "Adaptado de outra campanha" },
    { id: "estudio", nome: "Gravado em Estúdio", descricao: "Produção profissional" },
    { id: "ia-gerado", nome: "Gerado com IA", descricao: "Criado com ferramentas de IA" },
    { id: "corte-aula", nome: "Corte de Aula", descricao: "Trecho de conteúdo educacional" },
    { id: "prova-social", nome: "Prova Social", descricao: "Depoimento ou resultado" },
    { id: "bastidores", nome: "Bastidores", descricao: "Behind the scenes" },
    { id: "reels-tiktok", nome: "Reels/TikTok", descricao: "Formato vertical curto" },
    { id: "animacao", nome: "Animação/Motion", descricao: "Motion graphics" }
  ],
  estatico: [
    { id: "carrossel", nome: "Carrossel", descricao: "Múltiplas imagens em sequência" },
    { id: "single-image", nome: "Imagem Única", descricao: "Post de imagem única" },
    { id: "quote", nome: "Quote/Frase", descricao: "Citação ou frase de impacto" },
    { id: "infografico", nome: "Infográfico", descricao: "Dados visuais" },
    { id: "antes-depois", nome: "Antes/Depois", descricao: "Comparativo visual" },
    { id: "lista", nome: "Lista/Checklist", descricao: "Conteúdo em lista" },
    { id: "meme", nome: "Meme/Humor", descricao: "Conteúdo humorístico" },
    { id: "prova-social-estatico", nome: "Prova Social", descricao: "Print de resultado" },
    { id: "oferta", nome: "Oferta/Preço", descricao: "Destaque de oferta" },
    { id: "evento", nome: "Evento/Data", descricao: "Anúncio de evento" }
  ]
};
