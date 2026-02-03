// Dados estruturados extraídos das planilhas do Plano de Negócios 2026
// Separação por Núcleos: MGS, Aceleraí, Outros
// Estrutura de Tiers padronizada:
// T1: Lançamento/Ação do Mês - Campanhas principais com maior investimento
// T2: Funis Menores e Variados - Campanhas de suporte com funis específicos
// T3: Perpétuo - Campanhas always-on que rodam continuamente
// T4: Renovação, Recuperação e RMKT - Ações focadas em base existente
// T5: Upsell - Campanhas de upgrade e cross-sell para clientes ativos

export type Nucleo = "MGS" | "ACELERAI" | "OUTROS";
export type TierNumber = 1 | 2 | 3 | 4 | 5;
export type StatusCampanha = "lançamento" | "perpétuo" | "lista_espera" | "sessão_aut" | "pre_lancamento" | "black" | "promo" | "renovação" | "recuperação" | "rmkt" | "upsell" | "recorrência" | "-";
export type ModeloFunil = "Lançamento" | "Perpétuo" | "Webinar" | "VSL" | "Challenge" | "PLF" | "Tripwire" | "High Ticket" | "Social Selling" | "Indicação" | "Venda Direta" | "Híbrido" | "Renovação" | "Recuperação" | "Remarketing" | "Upsell" | "Recorrência";

// Descrições dos Tiers - Padronizado em todas as abas
export const tierDescricoes: Record<TierNumber, { nome: string; descricao: string; cor: string }> = {
  1: { nome: "Lançamento/Ação do Mês", descricao: "Campanhas principais de lançamento com maior investimento e expectativa de retorno", cor: "bg-red-500" },
  2: { nome: "Funis Menores e Variados", descricao: "Campanhas de suporte com funis específicos para diferentes produtos ou públicos", cor: "bg-orange-500" },
  3: { nome: "Perpétuo", descricao: "Campanhas always-on que rodam continuamente. Focadas em captação constante", cor: "bg-yellow-500" },
  4: { nome: "Renovação, Recuperação e RMKT", descricao: "Ações focadas em base existente: renovação, recuperação de churns e remarketing", cor: "bg-blue-500" },
  5: { nome: "Upsell", descricao: "Campanhas de upgrade e cross-sell para clientes ativos. Foco em aumentar ticket médio", cor: "bg-purple-500" },
};

export interface Campanha {
  id: string;
  nome: string;
  nucleo: Nucleo;
  tier: TierNumber;
  produto: string;
  meses: Record<string, StatusCampanha>;
  metaFaturamento?: number;
  investimentoProjetado?: number;
  roasProjetado?: number;
  faturamentoAtual?: number;
  investimentoAtual?: number;
  roasAtual?: number;
  ticketMedio?: number;
  dataEvento?: string;
}

export interface ProjecaoMensal {
  mes: string;
  tier: TierNumber;
  faturamento: number;
  investimento: number;
  roas: number;
}

export interface DadosROAS {
  tier: TierNumber;
  nucleo: Nucleo;
  produto: string;
  fatMeta: number;
  invProjetado: number;
  roasProjetado: number;
  fatAtual: number;
  invAtual: number;
  roasAtual: number;
}

// Metas Anuais por Núcleo
export const metasAnuais = {
  MGS: {
    meta: 20000000, // Meta: R$ 20 milhões
    faturadoJaneiro: 200000, // Corrigido: R$ 200K em janeiro
    projecaoAtual: 12500000,
  },
  ACELERAI: {
    meta: 50000000, // Meta: R$ 50 milhões
    faturadoJaneiro: 1500000, // Corrigido: R$ 1.5M em janeiro
    projecaoAtual: 2800000,
  },
  OUTROS: {
    meta: 5000000,
    faturadoJaneiro: 0,
    projecaoAtual: 2300000,
  },
};

// Função para calcular gap entre meta e projeção
export function calcularGap(nucleo: Nucleo): { gap: number; percentual: number; status: 'ok' | 'warning' | 'critical' } {
  const dados = metasAnuais[nucleo];
  const gap = dados.meta - dados.projecaoAtual;
  const percentual = ((dados.projecaoAtual / dados.meta) * 100);
  
  let status: 'ok' | 'warning' | 'critical' = 'ok';
  if (percentual < 50) status = 'critical';
  else if (percentual < 80) status = 'warning';
  
  return { gap, percentual, status };
}

// Campanhas T1 - Lançamentos Principais MGS
export const campanhasT1MGS: Campanha[] = [
  {
    id: "mgs-calendario-t1",
    nome: "MGS - Calendário Exponencial + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Calendário Exponencial",
    meses: { JAN: "lançamento", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 300000,
    investimentoProjetado: 100000,
    roasProjetado: 3,
    dataEvento: "29 e 30 JAN"
  },
  {
    id: "mgs-jornada-t1",
    nome: "MGS - Jornada + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Jornada Exponencial",
    meses: { JAN: "-", FEV: "lançamento", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 500000,
    investimentoProjetado: 200000,
    roasProjetado: 2.5,
    dataEvento: "25, 26 e 27 FEV"
  },
  {
    id: "mgs-brand-t1",
    nome: "MGS - Brand e Posicionamento + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Brand e Posicionamento",
    meses: { JAN: "-", FEV: "-", MAR: "lançamento", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 600000,
    investimentoProjetado: 300000,
    roasProjetado: 2,
    dataEvento: "18, 19, 20 MAR"
  },
  {
    id: "mgs-criatividade-t1",
    nome: "MGS - Criatividade Exponencial + relançamento livro",
    nucleo: "MGS",
    tier: 1,
    produto: "Criatividade Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "lançamento", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 300000,
    investimentoProjetado: 100000,
    roasProjetado: 3,
    dataEvento: "MAR"
  },
  {
    id: "mgs-sales-t1",
    nome: "MGS - Sales Exponencial + upsell MBA",
    nucleo: "MGS",
    tier: 1,
    produto: "Sales Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "lançamento", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 700000,
    investimentoProjetado: 200000,
    roasProjetado: 3.5,
    dataEvento: "22 e 23 ABRIL"
  },
  {
    id: "mgs-ia-t1",
    nome: "MGS - IA Exponencial + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "IA Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "lançamento", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 650000,
    investimentoProjetado: 250000,
    roasProjetado: 2.6,
    dataEvento: "MAI"
  },
  {
    id: "mgs-growth-t1",
    nome: "MGS - Growth + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Growth Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "lançamento", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 1200000,
    investimentoProjetado: 400000,
    roasProjetado: 3,
    dataEvento: "13, 14 MAIO"
  },
  {
    id: "mgs-transnovacao-t1",
    nome: "MGS - Transnovação Exponencial (MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Transnovação Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "lançamento", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 1800000,
    investimentoProjetado: 500000,
    roasProjetado: 3.6,
    dataEvento: "22 e 23 JULHO"
  },
  {
    id: "mgs-black-t1",
    nome: "MGS - Black Friday + upsell(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Black Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "lançamento", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 450000,
    investimentoProjetado: 120000,
    roasProjetado: 3.75,
    dataEvento: "29 e 30 OUTUBRO"
  },
  {
    id: "mgs-multiplica-t1",
    nome: "MGS - Multiplica Exponencial (MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Multiplica Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "lançamento", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 1200000,
    investimentoProjetado: 350000,
    roasProjetado: 3.43,
    dataEvento: "26 e 27 AGOSTO"
  },
  {
    id: "mgs-cultura-t1",
    nome: "MGS - Cultura Exponencial(MBA)",
    nucleo: "MGS",
    tier: 1,
    produto: "Cultura Exponencial",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "lançamento", NOV: "-", DEZ: "-" },
    metaFaturamento: 1800000,
    investimentoProjetado: 700000,
    roasProjetado: 2.57,
    dataEvento: "28 e 29 SETEMBRO"
  },
  {
    id: "mgs-calendario-t2",
    nome: "MGS - Calendário Exponencial TURMA 2",
    nucleo: "MGS",
    tier: 1,
    produto: "Calendário Exponencial T2",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "lançamento", DEZ: "-" },
    metaFaturamento: 2000000,
    investimentoProjetado: 600000,
    roasProjetado: 3.33,
    dataEvento: "16, 17 NOVEMBRO"
  },
];

// Campanhas T1 - Lançamentos Principais Aceleraí
export const campanhasT1Acelerai: Campanha[] = [
  {
    id: "acelerai-bloco-fev",
    nome: "Aceleraí - Bloco (Lançamento Principal)",
    nucleo: "ACELERAI",
    tier: 1,
    produto: "Bloco Aceleraí",
    meses: { JAN: "-", FEV: "lançamento", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 200000,
    investimentoProjetado: 50000,
    roasProjetado: 4,
    dataEvento: "FEV"
  },
  {
    id: "acelerai-asc-main",
    nome: "Aceleraí - ASC (Lançamento Principal)",
    nucleo: "ACELERAI",
    tier: 1,
    produto: "ASC",
    meses: { JAN: "-", FEV: "lançamento", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 900000,
    investimentoProjetado: 300000,
    roasProjetado: 3,
    dataEvento: "FEV"
  },
];

// Campanhas T2 - Funis Diversos MGS
export const campanhasT2MGS: Campanha[] = [
  {
    id: "mgs-ia-t2",
    nome: "IA Exponencial - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "IA Exponencial",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 100000,
    investimentoProjetado: 30000,
    roasProjetado: 3.33,
  },
  {
    id: "mgs-incompany-t2",
    nome: "In Company - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "In Company",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 50000,
    investimentoProjetado: 15000,
    roasProjetado: 3.33,
  },
  {
    id: "mgs-calendario-t2-funil",
    nome: "Calendário Exponencial - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "Calendário Exponencial",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 100000,
    investimentoProjetado: 20000,
    roasProjetado: 5,
  },
  {
    id: "mgs-passaporte-t2",
    nome: "Passaporte MGS - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "Passaporte",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 360000,
    investimentoProjetado: 20000,
    roasProjetado: 18,
  },
  {
    id: "mgs-pulse-t2",
    nome: "Pulse + MGS - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "Pulse + MGS",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 60000,
    investimentoProjetado: 15000,
    roasProjetado: 4,
  },
  {
    id: "mgs-politico-t2",
    nome: "Marketing Político - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "Marketing Político",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 100000,
    investimentoProjetado: 20000,
    roasProjetado: 5,
  },
  {
    id: "mgs-hotseat-t2",
    nome: "Hotseat - Funil Diverso",
    nucleo: "MGS",
    tier: 2,
    produto: "Hotseat",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 20000,
    investimentoProjetado: 6000,
    roasProjetado: 3.33,
  },
];

// Campanhas T2 - Funis Diversos Aceleraí
export const campanhasT2Acelerai: Campanha[] = [
  {
    id: "acelerai-saude-t2",
    nome: "Saúde - Funil Diverso",
    nucleo: "ACELERAI",
    tier: 2,
    produto: "Saúde",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 200000,
    investimentoProjetado: 20000,
    roasProjetado: 10,
  },
  {
    id: "acelerai-cargos-t2",
    nome: "Cargos - Funil Diverso",
    nucleo: "ACELERAI",
    tier: 2,
    produto: "Cargos",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 150000,
    investimentoProjetado: 50000,
    roasProjetado: 3,
  },
];

// Campanhas T3 - Perpétuo (funil sempre aberto)
export const campanhasT3Perpetuo: Campanha[] = [
  {
    id: "mgs-criatividade-perpetuo",
    nome: "Criatividade Exponencial - Perpétuo",
    nucleo: "MGS",
    tier: 3,
    produto: "Criatividade Exponencial",
    meses: { JAN: "perpétuo", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 200000,
    ticketMedio: 4900,
  },
  {
    id: "mgs-certificacao-perpetuo",
    nome: "Certificação MGS - Perpétuo",
    nucleo: "MGS",
    tier: 3,
    produto: "Certificação MGS",
    meses: { JAN: "perpétuo", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 750000,
    ticketMedio: 6900,
  },
  {
    id: "acelerai-bloco-perpetuo",
    nome: "Bloco Aceleraí - Perpétuo",
    nucleo: "ACELERAI",
    tier: 3,
    produto: "Bloco",
    meses: { JAN: "perpétuo", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 500000,
    ticketMedio: 1900,
  },
  {
    id: "acelerai-asc-perpetuo",
    nome: "ASC - Perpétuo",
    nucleo: "ACELERAI",
    tier: 3,
    produto: "ASC",
    meses: { JAN: "perpétuo", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "perpétuo", JUN: "perpétuo", JUL: "perpétuo", AGO: "perpétuo", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "perpétuo" },
    metaFaturamento: 1200000,
    ticketMedio: 2900,
  },
];

// Campanhas T4 - Renovação, Recuperação e Remarketing
export const campanhasT4RenovacaoRecuperacao: Campanha[] = [
  {
    id: "mgs-renovacao-mba",
    nome: "Renovação MBA - Base Existente",
    nucleo: "MGS",
    tier: 4,
    produto: "Renovação MBA",
    meses: { JAN: "renovação", FEV: "renovação", MAR: "renovação", ABR: "renovação", MAI: "renovação", JUN: "renovação", JUL: "renovação", AGO: "renovação", SET: "renovação", OUT: "renovação", NOV: "renovação", DEZ: "renovação" },
    metaFaturamento: 800000,
    investimentoProjetado: 50000,
    roasProjetado: 16,
  },
  {
    id: "mgs-recuperacao-desistentes",
    nome: "Recuperação Desistentes - Carrinho Abandonado",
    nucleo: "MGS",
    tier: 4,
    produto: "Recuperação",
    meses: { JAN: "recuperação", FEV: "recuperação", MAR: "recuperação", ABR: "recuperação", MAI: "recuperação", JUN: "recuperação", JUL: "recuperação", AGO: "recuperação", SET: "recuperação", OUT: "recuperação", NOV: "recuperação", DEZ: "recuperação" },
    metaFaturamento: 400000,
    investimentoProjetado: 30000,
    roasProjetado: 13.33,
  },
  {
    id: "mgs-rmkt-base",
    nome: "Remarketing Base Fria",
    nucleo: "MGS",
    tier: 4,
    produto: "Remarketing",
    meses: { JAN: "rmkt", FEV: "rmkt", MAR: "rmkt", ABR: "rmkt", MAI: "rmkt", JUN: "rmkt", JUL: "rmkt", AGO: "rmkt", SET: "rmkt", OUT: "rmkt", NOV: "rmkt", DEZ: "rmkt" },
    metaFaturamento: 300000,
    investimentoProjetado: 60000,
    roasProjetado: 5,
  },
  {
    id: "acelerai-renovacao",
    nome: "Renovação Aceleraí - Base Existente",
    nucleo: "ACELERAI",
    tier: 4,
    produto: "Renovação Aceleraí",
    meses: { JAN: "renovação", FEV: "renovação", MAR: "renovação", ABR: "renovação", MAI: "renovação", JUN: "renovação", JUL: "renovação", AGO: "renovação", SET: "renovação", OUT: "renovação", NOV: "renovação", DEZ: "renovação" },
    metaFaturamento: 600000,
    investimentoProjetado: 40000,
    roasProjetado: 15,
  },
  {
    id: "acelerai-rr",
    nome: "R&R Aceleraí - Recuperação e Remarketing",
    nucleo: "ACELERAI",
    tier: 4,
    produto: "R&R",
    meses: { JAN: "-", FEV: "recuperação", MAR: "recuperação", ABR: "recuperação", MAI: "recuperação", JUN: "recuperação", JUL: "recuperação", AGO: "recuperação", SET: "recuperação", OUT: "recuperação", NOV: "recuperação", DEZ: "recuperação" },
    metaFaturamento: 50000,
    investimentoProjetado: 5000,
    roasProjetado: 10,
  },
];

// Campanhas T5 - Upsell e Venda de Recorrência
export const campanhasT5UpsellRecorrencia: Campanha[] = [
  {
    id: "symphonia",
    nome: "Symphonia - Upsell MBA Premium",
    nucleo: "MGS",
    tier: 5,
    produto: "Symphonia MBA",
    meses: { JAN: "upsell", FEV: "upsell", MAR: "upsell", ABR: "upsell", MAI: "upsell", JUN: "upsell", JUL: "upsell", AGO: "upsell", SET: "upsell", OUT: "upsell", NOV: "upsell", DEZ: "upsell" },
    metaFaturamento: 5750000,
    investimentoProjetado: 310000,
    ticketMedio: 150000,
  },
  {
    id: "viagem-china",
    nome: "Viagem China - Upsell Experiência",
    nucleo: "MGS",
    tier: 5,
    produto: "Viagem China",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "upsell", AGO: "upsell", SET: "upsell", OUT: "upsell", NOV: "upsell", DEZ: "upsell" },
    metaFaturamento: 600000,
    ticketMedio: 75000,
  },
  {
    id: "summit",
    nome: "Summit MGS - Recorrência Anual",
    nucleo: "MGS",
    tier: 5,
    produto: "Summit MGS",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "recorrência", DEZ: "-" },
    metaFaturamento: 3000000,
    ticketMedio: 599,
  },
  {
    id: "acelerai-upsell-premium",
    nome: "Aceleraí Premium - Upsell",
    nucleo: "ACELERAI",
    tier: 5,
    produto: "Aceleraí Premium",
    meses: { JAN: "upsell", FEV: "upsell", MAR: "upsell", ABR: "upsell", MAI: "upsell", JUN: "upsell", JUL: "upsell", AGO: "upsell", SET: "upsell", OUT: "upsell", NOV: "upsell", DEZ: "upsell" },
    metaFaturamento: 2000000,
    ticketMedio: 9900,
  },
];

// Campanhas Outros
export const campanhasOutros: Campanha[] = [
  {
    id: "criatividade-editorial",
    nome: "Imersão Criatividade Exponencial - Editorial",
    nucleo: "OUTROS",
    tier: 2,
    produto: "Criatividade Editorial",
    meses: { JAN: "perpétuo", FEV: "perpétuo", MAR: "perpétuo", ABR: "lançamento", MAI: "perpétuo", JUN: "perpétuo", JUL: "lançamento", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "lançamento" },
    metaFaturamento: 360000,
    investimentoProjetado: 80000,
    roasProjetado: 4.5,
    ticketMedio: 4900,
  },
  {
    id: "esquire-turismo",
    nome: "Esquire - Imersão Turismo",
    nucleo: "OUTROS",
    tier: 2,
    produto: "Esquire Turismo",
    meses: { JAN: "-", FEV: "perpétuo", MAR: "perpétuo", ABR: "perpétuo", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "-", OUT: "-", NOV: "-", DEZ: "-" },
    metaFaturamento: 800000,
    ticketMedio: 9900,
  },
  {
    id: "esquire-luxo",
    nome: "Esquire - Imersão Luxo",
    nucleo: "OUTROS",
    tier: 2,
    produto: "Esquire Luxo",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "-", AGO: "-", SET: "perpétuo", OUT: "perpétuo", NOV: "perpétuo", DEZ: "-" },
    metaFaturamento: 800000,
    ticketMedio: 9900,
  },
  {
    id: "livro-hypercube",
    nome: "Novo Livro Hypercube - Editorial",
    nucleo: "OUTROS",
    tier: 1,
    produto: "Livro Hypercube",
    meses: { JAN: "-", FEV: "-", MAR: "-", ABR: "-", MAI: "-", JUN: "-", JUL: "pre_lancamento", AGO: "lançamento", SET: "perpétuo", OUT: "perpétuo", NOV: "black", DEZ: "promo" },
    metaFaturamento: 950000,
  },
];

// Dados ROAS da aba ROAS R4 - Fevereiro
export const dadosROASFevereiro: DadosROAS[] = [
  { tier: 1, nucleo: "MGS", produto: "Branding Exponencial", fatMeta: 300000, invProjetado: 50000, roasProjetado: 6, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 1, nucleo: "ACELERAI", produto: "Bloco", fatMeta: 200000, invProjetado: 50000, roasProjetado: 4, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "IA Exponencial", fatMeta: 100000, invProjetado: 30000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "In Company", fatMeta: 50000, invProjetado: 15000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "Calendário Exponencial", fatMeta: 100000, invProjetado: 20000, roasProjetado: 5, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "Passaporte", fatMeta: 360000, invProjetado: 20000, roasProjetado: 18, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "Pulse + MGS", fatMeta: 60000, invProjetado: 15000, roasProjetado: 4, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "Marketing Político", fatMeta: 100000, invProjetado: 20000, roasProjetado: 5, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS", produto: "Hotseat", fatMeta: 20000, invProjetado: 6000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI", produto: "Saúde", fatMeta: 200000, invProjetado: 20000, roasProjetado: 10, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI", produto: "ASC", fatMeta: 900000, invProjetado: 300000, roasProjetado: 3, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI", produto: "Cargos", fatMeta: 150000, invProjetado: 50000, roasProjetado: 3, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI", produto: "R&R", fatMeta: 50000, invProjetado: 5000, roasProjetado: 10, fatAtual: 0, invAtual: 0, roasAtual: 0 },
];

// Modelos de Funil disponíveis no mercado
export const modelosFunil: { nome: ModeloFunil; descricao: string; indicado: string }[] = [
  { nome: "Lançamento", descricao: "Funil clássico de lançamento com CPL, Webinar e Carrinho", indicado: "Produtos de alto ticket, cursos completos" },
  { nome: "Perpétuo", descricao: "Funil sempre aberto com automação de vendas", indicado: "Produtos de entrada, assinaturas" },
  { nome: "Webinar", descricao: "Apresentação ao vivo ou gravada para conversão", indicado: "Produtos educacionais, serviços" },
  { nome: "VSL", descricao: "Video Sales Letter - vídeo de vendas longo", indicado: "Produtos de ticket médio, info-produtos" },
  { nome: "Challenge", descricao: "Desafio de 5-7 dias com entrega de valor", indicado: "Engajamento, comunidade, upsell" },
  { nome: "PLF", descricao: "Product Launch Formula - 4 vídeos de conteúdo", indicado: "Lançamentos de alto impacto" },
  { nome: "Tripwire", descricao: "Oferta de baixo custo para converter leads", indicado: "Aquisição de clientes, entrada no funil" },
  { nome: "High Ticket", descricao: "Funil de aplicação + call de vendas", indicado: "Mentorias, consultorias, programas premium" },
  { nome: "Social Selling", descricao: "Vendas via redes sociais e relacionamento", indicado: "B2B, serviços personalizados" },
  { nome: "Indicação", descricao: "Programa de indicação e afiliados", indicado: "Escala orgânica, comunidades" },
  { nome: "Venda Direta", descricao: "Página de vendas direta sem funil elaborado", indicado: "Produtos simples, impulso" },
  { nome: "Híbrido", descricao: "Combinação de múltiplos modelos", indicado: "Estratégias complexas, múltiplos produtos" },
  { nome: "Renovação", descricao: "Funil focado em renovar clientes existentes", indicado: "Base de clientes, assinaturas" },
  { nome: "Recuperação", descricao: "Funil para recuperar desistentes e carrinhos abandonados", indicado: "Leads quentes, remarketing" },
  { nome: "Remarketing", descricao: "Campanhas de retargeting para base fria", indicado: "Reativação, awareness" },
  { nome: "Upsell", descricao: "Funil de upgrade para clientes existentes", indicado: "Aumento de ticket, fidelização" },
  { nome: "Recorrência", descricao: "Modelo de assinatura ou pagamento recorrente", indicado: "SaaS, comunidades, clubes" },
];

// Documentos do Repositório
export interface DocumentoRepositorio {
  id: string;
  nome: string;
  tipo: 'pdf' | 'video' | 'imagem' | 'planilha' | 'documento';
  categoria: 'calendario' | 'metodologia' | 'campanha' | 'referencia' | 'ebook' | 'livro' | 'app';
  nucleo: Nucleo | 'GERAL';
  arquivo: string;
  descricao: string;
  dataUpload: string;
}

export const documentosRepositorio: DocumentoRepositorio[] = [
  {
    id: "doc-calendario-hyper",
    nome: "Calendário Hyper 2026",
    tipo: "pdf",
    categoria: "calendario",
    nucleo: "GERAL",
    arquivo: "/docs/calendariohyper2026gray.pdf",
    descricao: "Plano de conteúdo para 2026 usando a Metodologia HyperCube - 6 Dimensões Proprietárias",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-cartas-supertrunfo",
    nome: "Cartas Supertrunfo Allan Barros",
    tipo: "pdf",
    categoria: "referencia",
    nucleo: "GERAL",
    arquivo: "/docs/CARTASSUPERTRUNFALANBARROS_TODOS3.pdf",
    descricao: "Material de referência com conceitos-chave do método Allan Barros",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-ebook-nrf",
    nome: "Ebook NRF 2026",
    tipo: "pdf",
    categoria: "ebook",
    nucleo: "GERAL",
    arquivo: "/docs/EbookNRF26.pdf",
    descricao: "Tendências do varejo e negócios - Material educativo NRF 2026",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-calendario-mgs",
    nome: "Calendário MGS",
    tipo: "pdf",
    categoria: "calendario",
    nucleo: "MGS",
    arquivo: "/docs/CalendarioMGS.pdf",
    descricao: "Planejamento anual de campanhas e cronograma de lançamentos MGS",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-jornada-exponencial",
    nome: "Jornada Exponencial - Livro Completo",
    tipo: "pdf",
    categoria: "livro",
    nucleo: "GERAL",
    arquivo: "/docs/Jornada_Exponencial_Livro_Completo.pdf",
    descricao: "Metodologia central do Allan Barros - Base conceitual para campanhas",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-app-mgs-janeiro",
    nome: "App MGS Janeiro",
    tipo: "pdf",
    categoria: "app",
    nucleo: "MGS",
    arquivo: "/docs/AppMGSjaneiro(1).pdf",
    descricao: "Material do aplicativo MGS - Conteúdo de janeiro 2026",
    dataUpload: "2026-01-31"
  },
  {
    id: "doc-icps-mgs",
    nome: "ICPs MGS",
    tipo: "pdf",
    categoria: "referencia",
    nucleo: "MGS",
    arquivo: "/docs/ICP´sMGS.pdf",
    descricao: "Perfis de Cliente Ideal (ICPs) da MGS School",
    dataUpload: "2026-01-31"
  },
];

// Função para obter todas as campanhas
export function getTodasCampanhas(): Campanha[] {
  return [
    ...campanhasT1MGS,
    ...campanhasT1Acelerai,
    ...campanhasT2MGS,
    ...campanhasT2Acelerai,
    ...campanhasT3Perpetuo,
    ...campanhasT4RenovacaoRecuperacao,
    ...campanhasT5UpsellRecorrencia,
    ...campanhasOutros,
  ];
}

// Função para obter campanhas por núcleo
export function getCampanhasPorNucleo(nucleo: Nucleo): Campanha[] {
  return getTodasCampanhas().filter(c => c.nucleo === nucleo);
}

// Função para obter campanhas por tier
export function getCampanhasPorTier(tier: TierNumber): Campanha[] {
  return getTodasCampanhas().filter(c => c.tier === tier);
}

// Função para calcular projeção total por núcleo
export function calcularProjecaoNucleo(nucleo: Nucleo): number {
  return getCampanhasPorNucleo(nucleo).reduce((acc, c) => acc + (c.metaFaturamento || 0), 0);
}

// Função para identificar gaps e sugerir ações
export interface GapAnalysis {
  nucleo: Nucleo;
  metaAnual: number;
  projecaoAtual: number;
  faturadoAtual: number;
  gap: number;
  percentualAtingido: number;
  status: 'ok' | 'warning' | 'critical';
  sugestoes: string[];
}

export function analisarGaps(): GapAnalysis[] {
  const nucleos: Nucleo[] = ['MGS', 'ACELERAI', 'OUTROS'];
  
  return nucleos.map(nucleo => {
    const meta = metasAnuais[nucleo];
    const projecao = calcularProjecaoNucleo(nucleo);
    const gap = meta.meta - projecao;
    const percentual = (projecao / meta.meta) * 100;
    
    let status: 'ok' | 'warning' | 'critical' = 'ok';
    let sugestoes: string[] = [];
    
    if (percentual < 50) {
      status = 'critical';
      sugestoes = [
        `Adicionar ${Math.ceil(gap / 500000)} novos lançamentos T1`,
        `Intensificar campanhas de perpétuo (T3)`,
        `Criar programa agressivo de upsell (T5)`,
        `Implementar recuperação de base (T4)`,
      ];
    } else if (percentual < 80) {
      status = 'warning';
      sugestoes = [
        `Adicionar ${Math.ceil(gap / 300000)} campanhas T2`,
        `Aumentar investimento em perpétuo`,
        `Focar em renovação de clientes`,
      ];
    } else {
      sugestoes = [`Manter estratégia atual`, `Otimizar ROAS das campanhas existentes`];
    }
    
    return {
      nucleo,
      metaAnual: meta.meta,
      projecaoAtual: projecao,
      faturadoAtual: meta.faturadoJaneiro,
      gap,
      percentualAtingido: percentual,
      status,
      sugestoes,
    };
  });
}
