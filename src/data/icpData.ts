// Dados de ICPs e MQLs extraídos do documento ICP's MGS

export interface ICP {
  id: string;
  mql: number;
  numero: number;
  perfil: string;
  segmentos: string[];
  dor: string;
  produtosIndicados?: string[];
}

export interface MQL {
  id: number;
  descricao: string;
  faturamento: string;
  icps: ICP[];
}

// MQL 1: Empresários com faturamento acima de 10M/ano
export const mql1: MQL = {
  id: 1,
  descricao: "Faturamento acima de 10 milhões ano, empresário, decisor, quer crescer mais rápido mas não conhece um modelo validado para isso.",
  faturamento: "> R$ 10M/ano",
  icps: [
    {
      id: "mql1-icp1",
      mql: 1,
      numero: 1,
      perfil: "Empresário de segmentos relacionados à economia real",
      segmentos: ["Indústria", "Energia", "Imobiliário", "Finanças", "Construção", "Agronegócio", "Seguros", "Importação"],
      dor: "Toma decisões de alto risco e capital intensivo sem um modelo claro de marketing como alavanca estratégica. É tão imerso no próprio negócio que não consegue acompanhar as tendências gerais do mercado.",
      produtosIndicados: ["Growth Exponencial", "Calendário Exponencial", "Symphonia"]
    },
    {
      id: "mql1-icp2",
      mql: 1,
      numero: 2,
      perfil: "Empresário dono de redes de lojas",
      segmentos: ["Farmácia", "Mercado", "Moda feminina", "Restaurante", "Hotel", "Telefonia", "Automotivo"],
      dor: "Cresceu pela operação, mas não domina um modelo de marketing previsível para escalar múltiplas unidades com eficiência.",
      produtosIndicados: ["Sales Exponencial", "Varejo", "CLC"]
    },
    {
      id: "mql1-icp3",
      mql: 1,
      numero: 3,
      perfil: "Empresário dono de empresa consolidada no e-commerce",
      segmentos: ["Site próprio", "App", "Logística", "Gateway de pagamento", "Distribuição própria"],
      dor: "Escalar seu negócio e manter sua posição em um mercado onde os top levels são players globais: Amazon, Ali Baba... Sem sacrificar.",
      produtosIndicados: ["Growth Exponencial", "IA Exponencial"]
    },
    {
      id: "mql1-icp4",
      mql: 1,
      numero: 4,
      perfil: "Empresário de empresa no ramo de luxo",
      segmentos: ["Carros esportivos", "Grifes", "Obras de arte"],
      dor: "Vender valor e status, mas não consegue escalar percepção de marca sem banalizar exclusividade. Não deve fazer marketing para as massas.",
      produtosIndicados: ["Brand e Posicionamento", "Esquire Luxo"]
    },
    {
      id: "mql1-icp5",
      mql: 1,
      numero: 5,
      perfil: "Empresário dono de startup em segmentos específicos",
      segmentos: ["Tecnologia", "Soluções administrativas", "Marca de cosméticos", "Marca nichada", "Videogames", "Apostas", "Suplementos"],
      dor: "Cresceu rápido por produto ou timing, mas não tem clareza sobre como sustentar e acelerar growth com marketing, não sabe o valuation e quando atingir o breaking even, têm dificuldade de mapear concorrentes e comunicar sua solução para a persona.",
      produtosIndicados: ["Growth Exponencial", "IA Exponencial", "Criatividade Exponencial"]
    }
  ]
};

// MQL 2: Profissional de marketing/dono de agência
export const mql2: MQL = {
  id: 2,
  descricao: "Profissional de marketing, dono de agência, com no mínimo 10 milhões por ano de faturamento.",
  faturamento: "> R$ 10M/ano",
  icps: [
    {
      id: "mql2-icp1",
      mql: 2,
      numero: 1,
      perfil: "Agência nichada para um segmento da saúde",
      segmentos: ["Médicos", "Dentistas", "Clínicas", "Hospitais"],
      dor: "Fatura bem, mas sente que seus clientes demandam muito e pouco posicionamento dificulta a percepção de valor (precisa barganhar pela conta).",
      produtosIndicados: ["Brand e Posicionamento", "Certificação MGS"]
    },
    {
      id: "mql2-icp2",
      mql: 2,
      numero: 2,
      perfil: "Agência orientada para contas de e-commerce",
      segmentos: ["Loja de suplementos", "Cosméticos", "Farmácia", "Vestimentas"],
      dor: "Depende excessivamente de mídia paga e margens apertadas, sem um modelo claro de diferenciação da marca que acaba reduzindo seu valor percebido.",
      produtosIndicados: ["Growth Exponencial", "IA Exponencial"]
    },
    {
      id: "mql2-icp3",
      mql: 2,
      numero: 3,
      perfil: "Agência nichada para personalidades",
      segmentos: ["Mentores", "Atores", "Influenciadores", "Infoprodutores", "Celebridades"],
      dor: "Cresce junto com o cliente, mas fica refém da imagem alheia e da ameaça constante de perder a conta para um concorrente ou próprio cliente.",
      produtosIndicados: ["Aceleraí", "Criatividade Exponencial"]
    },
    {
      id: "mql2-icp4",
      mql: 2,
      numero: 4,
      perfil: "Agência orientada para 1 cliente grande",
      segmentos: ["Oracle", "Samsung Brasil", "Outback"],
      dor: "Fatura alto, mas precisa equilibrar ideias de crescimento com a dependência das diretrizes de posicionamento, aparato administrativo, cadeia de comando intrínsecos a uma marca global.",
      produtosIndicados: ["CLC", "Brand e Posicionamento"]
    },
    {
      id: "mql2-icp5",
      mql: 2,
      numero: 5,
      perfil: "Agência orientada para uma etapa específica da jornada",
      segmentos: ["Tráfego pago", "Estratégia de posicionamento", "Audiovisual", "Social media"],
      dor: "É excelente tecnicamente, mas sente dificuldade em prospectar clientes, aumentar ticket, contratar especialistas.",
      produtosIndicados: ["Sales Exponencial", "Growth Exponencial"]
    }
  ]
};

// MQL 3: C'level de empresas que faturam no mínimo 1 bi por ano
export const mql3: MQL = {
  id: 3,
  descricao: "C'level de empresas que faturam no mínimo 1 bi por ano, decisor, orientado a growth.",
  faturamento: "> R$ 1B/ano",
  icps: [
    {
      id: "mql3-icp1",
      mql: 3,
      numero: 1,
      perfil: "C'level de empresa multinacional (filial no Brasil)",
      segmentos: ["Coca Cola", "Mastercard", "Amazon"],
      dor: "Precisa adaptar estratégias globais à realidade local sem perder eficiência nem alinhamento corporativo.",
      produtosIndicados: ["CLC", "Symphonia"]
    },
    {
      id: "mql3-icp2",
      mql: 3,
      numero: 2,
      perfil: "CMO ou head de marketing com a missão de crescer a empresa no Brasil/América Latina",
      segmentos: ["Expansão regional", "Marketing LATAM"],
      dor: "Tem metas agressivas de expansão regional e recursos limitados para atingir os objetivos exigidos.",
      produtosIndicados: ["Growth Exponencial", "Calendário Exponencial"]
    },
    {
      id: "mql3-icp3",
      mql: 3,
      numero: 3,
      perfil: "Sócio não operacional (membro de conselho, diretoria, governança)",
      segmentos: ["Conselho", "Diretoria", "Governança"],
      dor: "Participa de decisões estratégicas sem profundidade suficiente para avaliar marketing com segurança.",
      produtosIndicados: ["Symphonia", "Calendário Exponencial"]
    },
    {
      id: "mql3-icp4",
      mql: 3,
      numero: 4,
      perfil: "CEO técnico: sabe programar/negociar/expandir mas não consegue atrelar esses resultados a sua marca/persona",
      segmentos: ["Tech", "Startups escaladas"],
      dor: "Construiu resultados sólidos, mas não consegue traduzir performance em força de marca e influência.",
      produtosIndicados: ["Brand e Posicionamento", "Criatividade Exponencial"]
    },
    {
      id: "mql3-icp5",
      mql: 3,
      numero: 5,
      perfil: "C'level em ascensão: Recentemente promovido ou na iminência de ser promovido",
      segmentos: ["Novos executivos", "Promoções recentes"],
      dor: "Assumiu (ou assumirá) um cargo estratégico e precisa entregar resultados rápidos para se legitimar. Ainda não definiu a meta da sua gestão e o formato da sua liderança.",
      produtosIndicados: ["Jornada Exponencial", "Cultura Exponencial"]
    }
  ]
};

// MQL 4: Herdeiro, investidor, autônomo
export const mql4: MQL = {
  id: 4,
  descricao: "Herdeiro, investidor, autônomo, não necessariamente empresário, mas possui renda relevante.",
  faturamento: "Renda relevante",
  icps: [
    {
      id: "mql4-icp1",
      mql: 4,
      numero: 1,
      perfil: "Médico de alto rendimento ou dono de clínica/hospital",
      segmentos: ["Cirurgião plástico", "Cardiologista", "Clínica", "Hospital"],
      dor: "Construiu autoridade técnica, mas não tem diretriz ou metodologia para pensar o marketing do seu negócio. Costuma se queixar de agências.",
      produtosIndicados: ["Criatividade Exponencial", "Brand e Posicionamento"]
    },
    {
      id: "mql4-icp2",
      mql: 4,
      numero: 2,
      perfil: "Administrador de renda passiva",
      segmentos: ["Imóveis", "Investimentos", "Ações"],
      dor: "Tem patrimônio relevante, mas não possui narrativa ou estratégia para alavancar influência e oportunidades ou antecipar riscos. Sabe que o dinheiro parado poderia ser melhor aproveitado.",
      produtosIndicados: ["Calendário Exponencial", "Symphonia"]
    },
    {
      id: "mql4-icp3",
      mql: 4,
      numero: 3,
      perfil: "Herdeiro/membro da classe A (filho, irmão, neto) de família com bens e negócios",
      segmentos: ["Famílias empresárias", "Holdings familiares"],
      dor: "Herdou capital e status, mas carece de posicionamento próprio e visão estratégica. Pode se tornar irrelevante ou perder o patrimônio caso perca a capacidade de gerar valor e oportunidades por conta própria.",
      produtosIndicados: ["Jornada Exponencial", "Brand e Posicionamento"]
    },
    {
      id: "mql4-icp4",
      mql: 4,
      numero: 4,
      perfil: "Advogado buscando alternativas para divulgar sua persona",
      segmentos: ["Advogados", "Escritórios de advocacia"],
      dor: "Quer prospectar pelas publicidades mas é legalmente impedido, precisa encontrar estratégias indiretas para construir valor e posicionamento, mas não tem uma metodologia para isso.",
      produtosIndicados: ["Criatividade Exponencial", "Brand e Posicionamento"]
    },
    {
      id: "mql4-icp5",
      mql: 4,
      numero: 5,
      perfil: "Mentor ou influenciador do segmento educacional, marketing digital, de marca própria",
      segmentos: ["Comunidade Samia Marsili", "G4", "StartSe", "Venda todo santo dia"],
      dor: "Já vende todos os dias, mas sente dificuldade para ter resultados de ROI ao invés de ROAS.",
      produtosIndicados: ["Growth Exponencial", "Aceleraí"]
    }
  ]
};

// Todos os MQLs
export const todosMQLs: MQL[] = [mql1, mql2, mql3, mql4];

// Todos os ICPs
export const todosICPs: ICP[] = [
  ...mql1.icps,
  ...mql2.icps,
  ...mql3.icps,
  ...mql4.icps,
];

// Helper functions
export function getICPsByMQL(mqlId: number): ICP[] {
  const mql = todosMQLs.find(m => m.id === mqlId);
  return mql?.icps || [];
}

export function getICPById(icpId: string): ICP | undefined {
  return todosICPs.find(icp => icp.id === icpId);
}

export function getProdutosIndicadosPorICP(icpId: string): string[] {
  const icp = getICPById(icpId);
  return icp?.produtosIndicados || [];
}

export function getICPsPorSegmento(segmento: string): ICP[] {
  return todosICPs.filter(icp => 
    icp.segmentos.some(s => s.toLowerCase().includes(segmento.toLowerCase()))
  );
}

// Sugestões de comunicação por ICP
export interface SugestaoComunicacao {
  icpId: string;
  abordagem: string;
  gatilhos: string[];
  objecoes: string[];
  argumentos: string[];
}

export const sugestoesComunicacao: SugestaoComunicacao[] = [
  {
    icpId: "mql1-icp1",
    abordagem: "Foco em previsibilidade e modelo validado de crescimento",
    gatilhos: ["Escala", "Previsibilidade", "Modelo validado", "Tendências de mercado"],
    objecoes: ["Não tenho tempo", "Já tentei marketing antes", "Meu negócio é diferente"],
    argumentos: ["Cases de empresários do mesmo segmento", "ROI comprovado", "Metodologia testada em +500 empresas"]
  },
  {
    icpId: "mql1-icp2",
    abordagem: "Foco em escala de múltiplas unidades com eficiência",
    gatilhos: ["Expansão", "Padronização", "Eficiência operacional"],
    objecoes: ["Cada loja é diferente", "Não funciona no varejo"],
    argumentos: ["Cases de redes de varejo", "Modelo de franquias", "Padronização de marketing"]
  },
  {
    icpId: "mql2-icp3",
    abordagem: "Foco em independência e construção de marca própria da agência",
    gatilhos: ["Autoridade", "Diferenciação", "Retenção de clientes"],
    objecoes: ["Meus clientes são muito exigentes", "Dependo da imagem deles"],
    argumentos: ["Construção de marca própria", "Metodologia proprietária", "Cases de agências que se tornaram referência"]
  },
];
