// Ensinamentos e Frameworks de Allan Barros
// Baseado nos livros Jornada Exponencial e Calendário Exponencial

export interface EnsinamentoAllan {
  id: string;
  categoria: 'cliente' | 'produto' | 'comunicacao' | 'timing' | 'funil' | 'escala';
  titulo: string;
  principio: string;
  aplicacao: string;
  perguntaChave: string;
  tiersRecomendados: number[];
  mesesIdeais?: number[];
  produtosAplicaveis: string[];
}

export interface SugestaoAcao {
  id: string;
  tipo: 'gap_mes' | 'data_nao_aproveitada' | 'conjectura' | 'oportunidade';
  titulo: string;
  descricao: string;
  fundamentacao: string;
  acaoSugerida: string;
  tier: number;
  prioridade: 'alta' | 'media' | 'baixa';
  mes?: number;
  nucleo: 'mgs' | 'acelerai' | 'ambos';
  produtoSugerido?: string;
}

// Princípios fundamentais extraídos dos livros
export const principiosAllanBarros: EnsinamentoAllan[] = [
  // CLIENTE NO CENTRO
  {
    id: 'cliente-centro-1',
    categoria: 'cliente',
    titulo: 'O Cliente é o Centro de Tudo',
    principio: 'Toda empresa de sucesso é uma resposta elegante a um problema humano real. O maior ativo não são os produtos, mas as pessoas que esperam pela transformação.',
    aplicacao: 'Antes de criar qualquer campanha, pergunte: qual problema humano real estamos resolvendo?',
    perguntaChave: 'Sua empresa está focada nos seus produtos ou na expectativa de quem espera pela transformação?',
    tiersRecomendados: [1, 2],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'cliente-centro-2',
    categoria: 'cliente',
    titulo: 'Transferência de Poder',
    principio: 'O poder foi transferido do CNPJ para o CPF. O cliente não é mais espectador, é protagonista, produtor de conteúdo e maior influenciador da sua marca.',
    aplicacao: 'Crie campanhas que deem voz ao cliente, use prova social e depoimentos como protagonistas.',
    perguntaChave: 'Sua comunicação é um monólogo ou um diálogo com seu cliente?',
    tiersRecomendados: [1, 2, 3],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'cliente-centro-3',
    categoria: 'cliente',
    titulo: 'ICP como Estrela-Guia',
    principio: 'Tentar agradar a todos é a melhor receita para não ser lembrado por ninguém. Falar com a pessoa certa é o primeiro passo para construir um império.',
    aplicacao: 'Defina claramente quem é o cliente que extrai máximo valor E entrega máximo valor de volta.',
    perguntaChave: 'Você sabe para quem está vendendo? Se não sabe, todo o resto é apenas barulho.',
    tiersRecomendados: [1],
    produtosAplicaveis: ['todos']
  },

  // TIMING E CALENDÁRIO
  {
    id: 'timing-1',
    categoria: 'timing',
    titulo: 'Datas Comemorativas como Gatilhos',
    principio: 'Datas comemorativas são gatilhos emocionais naturais. O calendário é uma ferramenta de vendas subutilizada.',
    aplicacao: 'Planeje campanhas alinhadas com datas que fazem sentido para seu público e produto.',
    perguntaChave: 'Quais datas do calendário criam urgência natural para seu produto?',
    tiersRecomendados: [1, 2],
    mesesIdeais: [1, 3, 5, 6, 8, 11, 12],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'timing-2',
    categoria: 'timing',
    titulo: 'Janeiro - Mês da Renovação',
    principio: 'Janeiro é o mês das resoluções. As pessoas estão mais abertas a mudanças e investimentos em si mesmas.',
    aplicacao: 'Campanhas de transformação pessoal, novos começos, planejamento anual.',
    perguntaChave: 'Como seu produto ajuda as pessoas a começarem o ano de forma diferente?',
    tiersRecomendados: [1],
    mesesIdeais: [1],
    produtosAplicaveis: ['Calendário Exponencial', 'Criatividade Exponencial', 'Black Exponencial']
  },
  {
    id: 'timing-3',
    categoria: 'timing',
    titulo: 'Fevereiro - Carnaval e Foco',
    principio: 'Enquanto muitos param no Carnaval, é oportunidade para quem quer se destacar. Contraste entre festa e foco.',
    aplicacao: 'Campanhas de "enquanto eles descansam, você cresce" ou aproveitar o mood de celebração.',
    perguntaChave: 'Seu público é do tipo que para no Carnaval ou que aproveita para avançar?',
    tiersRecomendados: [2, 3],
    mesesIdeais: [2],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'timing-4',
    categoria: 'timing',
    titulo: 'Março - Volta à Realidade',
    principio: 'Março é quando o ano realmente começa para muitos. Momento de colocar planos em ação.',
    aplicacao: 'Campanhas de execução, metodologia, ferramentas práticas.',
    perguntaChave: 'Como ajudar seu cliente a sair do planejamento para a ação?',
    tiersRecomendados: [1, 2],
    mesesIdeais: [3],
    produtosAplicaveis: ['Growth Exponencial', 'Branding Exponencial']
  },
  {
    id: 'timing-5',
    categoria: 'timing',
    titulo: 'Segundo Semestre - Urgência Natural',
    principio: 'A partir de julho, a urgência de "ainda dá tempo" começa a aparecer. Use isso a seu favor.',
    aplicacao: 'Campanhas de aceleração, recuperação de metas, últimas chances do ano.',
    perguntaChave: 'Como criar senso de urgência genuíno baseado no calendário?',
    tiersRecomendados: [1, 4],
    mesesIdeais: [7, 8, 9, 10, 11],
    produtosAplicaveis: ['todos']
  },

  // COMUNICAÇÃO E NARRATIVA
  {
    id: 'comunicacao-1',
    categoria: 'comunicacao',
    titulo: 'Mentalidade Nova vs Antiga',
    principio: 'Troque "O que podemos vender?" por "Que problema podemos resolver?". Troque "features" por "benefícios para eles".',
    aplicacao: 'Toda comunicação deve focar na transformação do cliente, não nas características do produto.',
    perguntaChave: 'Sua comunicação fala sobre você ou sobre a vida do cliente após a transformação?',
    tiersRecomendados: [1, 2, 3],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'comunicacao-2',
    categoria: 'comunicacao',
    titulo: 'Da Lógica à Empatia',
    principio: 'Se o ICP é a planta baixa (lógica), a Persona é a foto de família na parede (emoção). Humanize seus dados.',
    aplicacao: 'Crie personas com nome, rosto e história. Fale COM elas, não SOBRE elas.',
    perguntaChave: 'Você consegue visualizar seu cliente como uma pessoa real com medos e sonhos?',
    tiersRecomendados: [1],
    produtosAplicaveis: ['todos']
  },

  // FUNIL E ESCALA
  {
    id: 'funil-1',
    categoria: 'funil',
    titulo: 'Perpétuo como Base',
    principio: 'Funis perpétuos garantem receita previsível. Lançamentos geram picos, perpétuo gera consistência.',
    aplicacao: 'Mantenha sempre um funil perpétuo rodando enquanto prepara lançamentos.',
    perguntaChave: 'Você tem receita previsível ou depende apenas de lançamentos?',
    tiersRecomendados: [3],
    produtosAplicaveis: ['Aceleraí', 'Pullse']
  },
  {
    id: 'funil-2',
    categoria: 'funil',
    titulo: 'Recuperação e Remarketing',
    principio: 'Quem já demonstrou interesse é mais fácil de converter. Não abandone leads quentes.',
    aplicacao: 'Crie fluxos específicos para quem não comprou, abandonou carrinho ou está inativo.',
    perguntaChave: 'Quanto dinheiro você está deixando na mesa por não fazer remarketing?',
    tiersRecomendados: [4],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'funil-3',
    categoria: 'funil',
    titulo: 'Upsell como Multiplicador',
    principio: 'Vender para quem já comprou é mais barato e mais fácil. O LTV define a saúde do negócio.',
    aplicacao: 'Crie jornadas de ascensão para clientes existentes.',
    perguntaChave: 'Qual é o próximo passo natural para quem já comprou de você?',
    tiersRecomendados: [5],
    produtosAplicaveis: ['todos']
  },

  // PRODUTO E POSICIONAMENTO
  {
    id: 'produto-1',
    categoria: 'produto',
    titulo: 'Produto como Resposta',
    principio: 'Um bom produto é uma resposta elegante a um problema real. Se não resolve problema, não vende.',
    aplicacao: 'Antes de criar campanha, valide se o produto realmente resolve a dor do ICP.',
    perguntaChave: 'Seu produto resolve um problema real ou é uma solução procurando um problema?',
    tiersRecomendados: [1],
    produtosAplicaveis: ['todos']
  },
  {
    id: 'produto-2',
    categoria: 'produto',
    titulo: 'Diferenciação Clara',
    principio: 'Em um mundo de opções infinitas, a única barreira sólida é o relacionamento genuíno.',
    aplicacao: 'Destaque o que torna seu produto único e construa comunidade.',
    perguntaChave: 'Por que alguém escolheria você e não o concorrente?',
    tiersRecomendados: [1, 2],
    produtosAplicaveis: ['todos']
  }
];

// Datas e conjecturas importantes para 2026
export const datasEConjecturas2026 = [
  { mes: 1, evento: 'Ano Novo / Resoluções', tipo: 'data', oportunidade: 'Transformação pessoal, planejamento' },
  { mes: 1, evento: 'NRF Retail', tipo: 'conjectura', oportunidade: 'Tendências de varejo e negócios' },
  { mes: 2, evento: 'Carnaval', tipo: 'data', oportunidade: 'Contraste foco vs festa' },
  { mes: 3, evento: 'Dia da Mulher', tipo: 'data', oportunidade: 'Empreendedorismo feminino' },
  { mes: 3, evento: 'Início do ano fiscal', tipo: 'conjectura', oportunidade: 'Planejamento empresarial' },
  { mes: 4, evento: 'Páscoa', tipo: 'data', oportunidade: 'Renovação, recomeço' },
  { mes: 5, evento: 'Dia das Mães', tipo: 'data', oportunidade: 'Empreendedoras, equilíbrio' },
  { mes: 6, evento: 'Meio do ano', tipo: 'conjectura', oportunidade: 'Revisão de metas, ajuste de rota' },
  { mes: 6, evento: 'Dia dos Namorados', tipo: 'data', oportunidade: 'Parcerias, sociedades' },
  { mes: 7, evento: 'Férias escolares', tipo: 'data', oportunidade: 'Tempo para estudar, se desenvolver' },
  { mes: 8, evento: 'Dia dos Pais', tipo: 'data', oportunidade: 'Legado, sucessão' },
  { mes: 9, evento: 'Volta às aulas', tipo: 'data', oportunidade: 'Aprendizado, capacitação' },
  { mes: 10, evento: 'Dia das Crianças', tipo: 'data', oportunidade: 'Criatividade, inovação' },
  { mes: 11, evento: 'Black Friday', tipo: 'data', oportunidade: 'Ofertas especiais, volume' },
  { mes: 11, evento: 'Planejamento 2027', tipo: 'conjectura', oportunidade: 'Estratégia para próximo ano' },
  { mes: 12, evento: 'Natal / Fim de ano', tipo: 'data', oportunidade: 'Gratidão, retrospectiva, metas' }
];

// Função para gerar sugestões de ação baseadas nos gaps
export function gerarSugestoesAcao(
  campanhasExistentes: any[],
  nucleo: 'mgs' | 'acelerai' | 'todos',
  mesInicio: number,
  mesFim: number
): SugestaoAcao[] {
  const sugestoes: SugestaoAcao[] = [];
  
  // Verificar gaps por mês
  for (let mes = mesInicio; mes <= mesFim; mes++) {
    const campanhasNoMes = campanhasExistentes.filter(c => {
      const mesInicioCampanha = new Date(c.dataInicio).getMonth() + 1;
      return mesInicioCampanha === mes && (nucleo === 'todos' || c.nucleo === nucleo);
    });
    
    // Se não tem campanha T1 no mês
    const temT1 = campanhasNoMes.some(c => c.tier === 1);
    if (!temT1) {
      const dataDoMes = datasEConjecturas2026.find(d => d.mes === mes);
      sugestoes.push({
        id: `gap-t1-${mes}`,
        tipo: 'gap_mes',
        titulo: `Gap de Lançamento em ${getNomeMes(mes)}`,
        descricao: `Não há campanha T1 (Lançamento) planejada para ${getNomeMes(mes)}.`,
        fundamentacao: 'Segundo Allan Barros, cada mês deve ter pelo menos uma ação principal para manter o momentum de vendas.',
        acaoSugerida: dataDoMes 
          ? `Aproveite "${dataDoMes.evento}" para criar uma campanha de ${dataDoMes.oportunidade}.`
          : `Crie um lançamento ou ação principal para o mês.`,
        tier: 1,
        prioridade: 'alta',
        mes,
        nucleo: nucleo === 'todos' ? 'ambos' : nucleo
      });
    }
    
    // Se não tem perpétuo rodando
    const temT3 = campanhasNoMes.some(c => c.tier === 3);
    if (!temT3 && mes >= 2) {
      sugestoes.push({
        id: `gap-t3-${mes}`,
        tipo: 'gap_mes',
        titulo: `Sem Perpétuo em ${getNomeMes(mes)}`,
        descricao: `Não há funil perpétuo (T3) ativo em ${getNomeMes(mes)}.`,
        fundamentacao: 'Allan ensina que perpétuos garantem receita previsível entre lançamentos.',
        acaoSugerida: 'Ative um funil perpétuo para garantir entrada constante de leads e vendas.',
        tier: 3,
        prioridade: 'media',
        mes,
        nucleo: nucleo === 'todos' ? 'ambos' : nucleo
      });
    }
    
    // Verificar datas não aproveitadas
    const datasDoMes = datasEConjecturas2026.filter(d => d.mes === mes);
    for (const data of datasDoMes) {
      const aproveitaData = campanhasNoMes.some(c => 
        c.nome?.toLowerCase().includes(data.evento.toLowerCase()) ||
        c.bigIdea?.toLowerCase().includes(data.evento.toLowerCase())
      );
      
      if (!aproveitaData && data.tipo === 'data') {
        sugestoes.push({
          id: `data-${mes}-${data.evento.replace(/\s/g, '-')}`,
          tipo: 'data_nao_aproveitada',
          titulo: `${data.evento} não aproveitado`,
          descricao: `A data "${data.evento}" em ${getNomeMes(mes)} não está sendo aproveitada.`,
          fundamentacao: 'Datas comemorativas são gatilhos emocionais naturais que facilitam a venda.',
          acaoSugerida: `Crie uma campanha explorando: ${data.oportunidade}`,
          tier: 2,
          prioridade: 'media',
          mes,
          nucleo: nucleo === 'todos' ? 'ambos' : nucleo
        });
      }
    }
  }
  
  // Verificar se tem remarketing ativo
  const temT4 = campanhasExistentes.some(c => c.tier === 4);
  if (!temT4) {
    sugestoes.push({
      id: 'gap-t4-geral',
      tipo: 'oportunidade',
      titulo: 'Sem Recuperação/Remarketing',
      descricao: 'Não há campanhas de recuperação (T4) planejadas.',
      fundamentacao: 'Allan Barros: "Quem já demonstrou interesse é mais fácil de converter. Não abandone leads quentes."',
      acaoSugerida: 'Crie fluxos para leads que não compraram, carrinhos abandonados e clientes inativos.',
      tier: 4,
      prioridade: 'alta',
      nucleo: 'ambos'
    });
  }
  
  // Verificar se tem upsell
  const temT5 = campanhasExistentes.some(c => c.tier === 5);
  if (!temT5) {
    sugestoes.push({
      id: 'gap-t5-geral',
      tipo: 'oportunidade',
      titulo: 'Sem Estratégia de Upsell',
      descricao: 'Não há campanhas de upsell (T5) planejadas.',
      fundamentacao: 'Allan Barros: "Vender para quem já comprou é mais barato e mais fácil. O LTV define a saúde do negócio."',
      acaoSugerida: 'Crie jornadas de ascensão para clientes existentes com ofertas de maior valor.',
      tier: 5,
      prioridade: 'media',
      nucleo: 'ambos'
    });
  }
  
  return sugestoes.sort((a, b) => {
    const prioridadeOrdem = { alta: 0, media: 1, baixa: 2 };
    return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
  });
}

function getNomeMes(mes: number): string {
  const meses = [
    '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return meses[mes] || '';
}

// Sugestões específicas por produto MGS
export const sugestoesPorProdutoMGS: Record<string, string[]> = {
  'Calendário Exponencial': [
    'Janeiro: Lançamento principal - "Novo ano, nova estratégia"',
    'Julho: Relançamento - "Ainda dá tempo de virar o jogo"',
    'Novembro: Black Friday - Oferta especial para planejamento 2027'
  ],
  'Criatividade Exponencial': [
    'Março: Pós-carnaval - "Hora de criar diferente"',
    'Outubro: Dia das Crianças - "Resgate sua criatividade"'
  ],
  'Growth Exponencial': [
    'Março: Início do ano fiscal - "Acelere seu crescimento"',
    'Setembro: Volta às aulas - "Aprenda a escalar"'
  ],
  'Branding Exponencial': [
    'Março: Dia da Mulher - "Marcas que inspiram"',
    'Junho: Meio do ano - "Reposicione sua marca"'
  ],
  'Black Exponencial': [
    'Janeiro: Ano novo - "Comece com mentalidade de elite"',
    'Novembro: Black Friday - Meta-campanha sobre Black Friday'
  ],
  'Sales Exponencial': [
    'Março: Início trimestre - "Bata suas metas"',
    'Setembro: Último trimestre - "Sprint final de vendas"'
  ],
  'IA Exponencial': [
    'Qualquer mês: Tendência constante',
    'Janeiro: NRF - "IA no varejo"',
    'Março: Produtividade - "IA para fazer mais com menos"'
  ]
};

// Sugestões para Aceleraí por segmento
export const sugestoesPorSegmentoAcelerai: Record<string, string[]> = {
  'Saúde': [
    'Janeiro: Resoluções de saúde',
    'Abril: Páscoa - Alimentação consciente',
    'Setembro: Primavera - Renovação'
  ],
  'Beleza': [
    'Março: Dia da Mulher',
    'Maio: Dia das Mães',
    'Dezembro: Festas de fim de ano'
  ],
  'Fitness': [
    'Janeiro: Projeto verão',
    'Julho: Férias - Manter a forma',
    'Setembro: Primavera - Corpo novo'
  ],
  'Alimentação': [
    'Abril: Páscoa',
    'Junho: Festas juninas',
    'Dezembro: Natal'
  ],
  'Negócios': [
    'Janeiro: Planejamento anual',
    'Março: Início do ano fiscal',
    'Novembro: Planejamento próximo ano'
  ]
};
