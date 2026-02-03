// Dados extraídos das planilhas de pesquisa de clientes reais
// Fonte: Aceleraí Aprovados, Janeiro de Vantagens, Live IA

export interface PerfilClienteReal {
  tipo: string;
  cargo: string;
  segmento: string;
  cidade: string;
  momento: string;
  objetivo: string;
  desafio: string;
  anunciaHoje: string;
  prioridade: string;
  investimento?: string;
}

// Tipos de cliente encontrados nas pesquisas
export const tiposCliente = [
  'Empreendedor',
  'Prestador de Serviço Autônomo/PJ',
  'Prestador de Serviço CLT',
  'Empresa',
  'Diretor',
  'Aposentado'
];

// Cargos encontrados
export const cargos = [
  'CEO',
  'Diretor',
  'Gerente',
  'Coordenador',
  'Supervisor',
  'Analista',
  'Proprietário',
  'Sócio',
  'Não trabalho em empresa'
];

// Segmentos mais comuns
export const segmentos = [
  'Alimentação / Restaurante',
  'Saúde / Estética',
  'Varejo',
  'Serviços',
  'Educação',
  'Indústria',
  'Construção',
  'Entretenimento',
  'E-Commerce',
  'Atacado',
  'Joalheria',
  'Beleza',
  'Produção de Shows',
  'Frigorífico',
  'Importadora',
  'Tatuagem',
  'Circo'
];

// Cidades/Estados encontrados
export const localizacoes = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Fortaleza',
  'Recife',
  'Salvador',
  'Porto Alegre',
  'Curitiba',
  'Manaus',
  'Belém',
  'Goiânia',
  'Campinas',
  'Guarulhos',
  'Maceió',
  'Natal',
  'Florianópolis',
  'Santa Catarina',
  'Minas Gerais',
  'Bahia',
  'Pernambuco',
  'Paraná',
  'Rio Grande do Sul',
  'Amazonas',
  'Pará',
  'Ceará'
];

// Momentos de negócio
export const momentosNegocio = [
  'Estou prestes a lançar meu negócio',
  'Estou vendendo, mas sinto que poderia vender mais',
  'Vendo bem em alguns períodos, mas falta previsibilidade',
  'Invisto em marketing, mas a conta não fecha no fim do mês',
  'Já cresci, mas perdi eficiência nos últimos meses',
  'Não estou vendendo nada',
  'Já vendo muito bem e quero aumentar ainda mais meu lucro',
  'To um ano sem resultado'
];

// Objetivos de campanha
export const objetivosCampanha = [
  'Aumentar vendas rapidamente',
  'Fortalecer a marca e autoridade digital',
  'Gerar movimento (loja, site ou WhatsApp)',
  'Lançar um produto ou serviço',
  'Atrair clientes no WhatsApp',
  'Vender mais (promoção/oferta)',
  'Ganhar seguidores/autoridade',
  'Melhorar minhas campanhas Sazonais (Verão, Black Friday, Dia das Mães)',
  'Ganhar visibilidade',
  'Ainda não sei'
];

// Desafios em marketing
export const desafiosMarketing = [
  'Transformar investimento em resultado real',
  'Criar campanhas que se destaquem da concorrência',
  'Manter constância de vendas',
  'Não sei dizer'
];

// Status de anúncio
export const statusAnuncio = [
  'Sim, tráfego pago (Patrocinados/Meta/Google)',
  'Sim, só orgânico',
  'Ainda não'
];

// Prioridades
export const prioridades = [
  'Atrair clientes com mais frequência',
  'Fazer mais vendas',
  'Ter mais visibilidade de marca',
  'Saber o que postar/anunciar'
];

// Faixas de investimento
export const faixasInvestimento = [
  'Até R$300',
  'R$300–1.000',
  'R$1.000–3.000',
  'R$3.000–10.000',
  'R$10.000+',
  'Ainda não sei'
];

// Perfis de clientes reais extraídos das planilhas (amostra representativa)
export const perfisClientesReais: PerfilClienteReal[] = [
  {
    tipo: 'Empreendedor',
    cargo: 'CEO',
    segmento: 'Varejo',
    cidade: 'São Paulo',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Fortalecer a marca e autoridade digital',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, só orgânico',
    prioridade: 'Atrair clientes com mais frequência'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'CEO',
    segmento: 'Serviços',
    cidade: 'Fortaleza',
    momento: 'Estou prestes a lançar meu negócio',
    objetivo: 'Aumentar vendas rapidamente',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Ainda não',
    prioridade: 'Fazer mais vendas'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Alimentação / Restaurante',
    cidade: 'São José dos Campos',
    momento: 'Estou prestes a lançar meu negócio',
    objetivo: 'Lançar um produto ou serviço',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Ainda não',
    prioridade: 'Atrair clientes com mais frequência'
  },
  {
    tipo: 'Prestador de Serviço Autônomo/PJ',
    cargo: 'Não trabalho em empresa',
    segmento: 'Varejo',
    cidade: 'Chapecó - Santa Catarina',
    momento: 'Invisto em marketing, mas a conta não fecha no fim do mês',
    objetivo: 'Aumentar vendas rapidamente',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Saber o que postar/anunciar'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'CEO',
    segmento: 'Saúde / Estética',
    cidade: 'Belém',
    momento: 'Estou prestes a lançar meu negócio',
    objetivo: 'Aumentar vendas rapidamente',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, só orgânico',
    prioridade: 'Fazer mais vendas'
  },
  {
    tipo: 'Prestador de Serviço CLT',
    cargo: 'Coordenador',
    segmento: 'Importadora de Bebidas e Alimentos',
    cidade: 'Brasil',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Fortalecer a marca e autoridade digital',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Ter mais visibilidade de marca'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Educação',
    cidade: 'Pedra Branca - Ceará',
    momento: 'Invisto em marketing, mas a conta não fecha no fim do mês',
    objetivo: 'Aumentar vendas rapidamente',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Atrair clientes com mais frequência'
  },
  {
    tipo: 'Empresa',
    cargo: 'Gerente',
    segmento: 'Serviços',
    cidade: 'São Paulo',
    momento: 'Já cresci, mas perdi eficiência nos últimos meses',
    objetivo: 'Aumentar vendas rapidamente',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'CEO',
    segmento: 'Tatuagem',
    cidade: 'Guarulhos - SP',
    momento: 'Invisto em marketing, mas a conta não fecha no fim do mês',
    objetivo: 'Fortalecer a marca e autoridade digital',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Entretenimento cultural',
    cidade: 'São Paulo',
    momento: 'Já cresci, mas perdi eficiência nos últimos meses',
    objetivo: 'Fortalecer a marca e autoridade digital',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas'
  },
  {
    tipo: 'Prestador de Serviço Autônomo/PJ',
    cargo: 'Analista',
    segmento: 'Saúde / Estética',
    cidade: 'São Paulo',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Atrair clientes no WhatsApp',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas',
    investimento: 'R$10.000+'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Varejo',
    cidade: 'Rio de Janeiro',
    momento: 'Vendo bem em alguns períodos, mas falta previsibilidade',
    objetivo: 'Gerar movimento (loja, site ou WhatsApp)',
    desafio: 'Manter constância de vendas',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Atrair clientes com mais frequência',
    investimento: 'R$1.000–3.000'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Produção de Shows',
    cidade: 'Florianópolis - SC',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Lançar um produto ou serviço',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas',
    investimento: 'R$3.000–10.000'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Joalheria',
    cidade: 'Santarém - PA',
    momento: 'Estou prestes a lançar meu negócio',
    objetivo: 'Vender mais (promoção/oferta)',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Ainda não',
    prioridade: 'Fazer mais vendas',
    investimento: 'R$1.000–3.000'
  },
  {
    tipo: 'Prestador de Serviço Autônomo/PJ',
    cargo: 'Diretor',
    segmento: 'Saúde / Estética',
    cidade: 'Recife',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Atrair clientes no WhatsApp',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas',
    investimento: 'R$300–1.000'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Proprietário',
    segmento: 'Beleza e estética',
    cidade: 'Parnamirim - RN',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Ganhar visibilidade',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, só orgânico',
    prioridade: 'Atrair clientes com mais frequência',
    investimento: 'R$300–1.000'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Não trabalho em empresa',
    segmento: 'Alimentação / Restaurante',
    cidade: 'Manaus',
    momento: 'Vendo bem em alguns períodos, mas falta previsibilidade',
    objetivo: 'Vender mais (promoção/oferta)',
    desafio: 'Manter constância de vendas',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Fazer mais vendas',
    investimento: 'R$300–1.000'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Proprietário',
    segmento: 'Atacadista de bebidas',
    cidade: 'Rio de Janeiro',
    momento: 'Estou vendendo, mas sinto que poderia vender mais',
    objetivo: 'Atrair clientes no WhatsApp',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Ter mais visibilidade de marca',
    investimento: 'R$3.000–10.000'
  },
  {
    tipo: 'Prestador de Serviço CLT',
    cargo: 'Proprietária',
    segmento: 'Saúde / Estética',
    cidade: 'Santa Maria - RS',
    momento: 'Estou prestes a lançar meu negócio',
    objetivo: 'Lançar um produto ou serviço',
    desafio: 'Criar campanhas que se destaquem da concorrência',
    anunciaHoje: 'Sim, só orgânico',
    prioridade: 'Atrair clientes com mais frequência',
    investimento: 'Até R$300'
  },
  {
    tipo: 'Empreendedor',
    cargo: 'Diretor',
    segmento: 'Indústria',
    cidade: 'São Francisco de Itabapoana - RJ',
    momento: 'Já vendo muito bem e quero aumentar ainda mais meu lucro',
    objetivo: 'Vender mais (promoção/oferta)',
    desafio: 'Transformar investimento em resultado real',
    anunciaHoje: 'Sim, tráfego pago (Patrocinados/Meta/Google)',
    prioridade: 'Atrair clientes com mais frequência',
    investimento: 'R$10.000+'
  }
];

// Nomes fictícios para gerar clientes sintéticos
export const nomesMasculinos = [
  'João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Matheus', 'Bruno', 'Felipe',
  'Gustavo', 'André', 'Ricardo', 'Marcelo', 'Fernando', 'Carlos', 'Eduardo',
  'Rodrigo', 'Thiago', 'Leonardo', 'Diego', 'Henrique', 'Vinícius', 'Caio'
];

export const nomesFemininos = [
  'Maria', 'Ana', 'Juliana', 'Fernanda', 'Camila', 'Patrícia', 'Aline', 'Bruna',
  'Carla', 'Daniela', 'Renata', 'Tatiana', 'Vanessa', 'Priscila', 'Larissa',
  'Amanda', 'Beatriz', 'Carolina', 'Débora', 'Érica', 'Flávia', 'Gabriela'
];

export const sobrenomes = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
  'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
  'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha'
];

// Dores específicas por segmento
export const doresPorSegmento: Record<string, string[]> = {
  'Alimentação / Restaurante': [
    'Meu restaurante fica vazio em dias de semana',
    'Não consigo fidelizar clientes, eles vêm uma vez e não voltam',
    'O delivery não está funcionando como esperava',
    'Não sei como me diferenciar dos concorrentes da região',
    'Gasto muito com ingredientes e o lucro não aparece'
  ],
  'Saúde / Estética': [
    'Minha agenda tem muitos buracos entre os atendimentos',
    'Clientes cancelam em cima da hora',
    'Não consigo cobrar o que meu serviço vale',
    'Tenho dificuldade em mostrar resultados nas redes sociais',
    'Pacientes não retornam para manutenção'
  ],
  'Varejo': [
    'O movimento da loja caiu muito nos últimos meses',
    'Não sei como competir com o e-commerce',
    'Meu estoque está parado e preciso girar',
    'Clientes entram, olham e saem sem comprar',
    'Não consigo atrair público jovem'
  ],
  'Serviços': [
    'Dependo muito de indicação para conseguir clientes',
    'Não sei como precificar meu serviço',
    'Clientes não entendem o valor do que eu entrego',
    'Tenho dificuldade em escalar meu negócio',
    'Não consigo me posicionar como especialista'
  ],
  'Educação': [
    'Turmas não estão fechando com o número mínimo de alunos',
    'Evasão está alta nos primeiros meses',
    'Não sei como competir com cursos online gratuitos',
    'Pais não veem valor no investimento',
    'Dificuldade em mostrar resultados dos alunos'
  ],
  'E-Commerce': [
    'Carrinho abandonado é meu maior problema',
    'Custo de aquisição de cliente está muito alto',
    'Não sei como fazer remarketing eficiente',
    'Taxa de conversão do site está muito baixa',
    'Clientes reclamam do frete'
  ]
};

// Objeções comuns por momento de negócio
export const objecoesPorMomento: Record<string, string[]> = {
  'Estou prestes a lançar meu negócio': [
    'Ainda não tenho dinheiro para investir em marketing',
    'Não sei se meu produto/serviço vai funcionar',
    'Tenho medo de gastar e não ter retorno',
    'Não entendo nada de redes sociais',
    'Prefiro esperar ter mais estrutura'
  ],
  'Estou vendendo, mas sinto que poderia vender mais': [
    'Já tentei anunciar e não funcionou',
    'Não tenho tempo para cuidar de marketing',
    'Meu concorrente vende mais barato',
    'Não sei o que está faltando',
    'Marketing é muito caro para o meu porte'
  ],
  'Vendo bem em alguns períodos, mas falta previsibilidade': [
    'Não consigo manter a constância',
    'Dependo muito de sazonalidade',
    'Não sei planejar para o ano todo',
    'Quando está bom, não invisto, quando está ruim, não tenho dinheiro',
    'Falta equipe para dar conta'
  ],
  'Invisto em marketing, mas a conta não fecha no fim do mês': [
    'Não sei medir o retorno dos anúncios',
    'Agência não entrega resultado',
    'Gasto muito e vendo pouco',
    'Não entendo as métricas',
    'Tráfego pago é muito caro'
  ],
  'Já cresci, mas perdi eficiência nos últimos meses': [
    'O que funcionava antes não funciona mais',
    'Mercado mudou e não me adaptei',
    'Concorrência aumentou muito',
    'Perdi clientes importantes',
    'Equipe não está performando'
  ]
};

// Função para gerar cliente sintético aleatório
export function gerarClienteSinteticoAleatorio(): {
  nome: string;
  perfil: PerfilClienteReal;
  dores: string[];
  objecoes: string[];
  idade: number;
  genero: 'M' | 'F';
} {
  const genero = Math.random() > 0.5 ? 'M' : 'F';
  const nomes = genero === 'M' ? nomesMasculinos : nomesFemininos;
  const nome = `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
  
  // Seleciona um perfil base aleatório
  const perfilBase = perfisClientesReais[Math.floor(Math.random() * perfisClientesReais.length)];
  
  // Pode variar alguns campos
  const perfil: PerfilClienteReal = {
    ...perfilBase,
    tipo: tiposCliente[Math.floor(Math.random() * tiposCliente.length)],
    cargo: cargos[Math.floor(Math.random() * cargos.length)],
    segmento: segmentos[Math.floor(Math.random() * segmentos.length)],
    cidade: localizacoes[Math.floor(Math.random() * localizacoes.length)],
    momento: momentosNegocio[Math.floor(Math.random() * momentosNegocio.length)],
    objetivo: objetivosCampanha[Math.floor(Math.random() * objetivosCampanha.length)],
    desafio: desafiosMarketing[Math.floor(Math.random() * desafiosMarketing.length)],
    anunciaHoje: statusAnuncio[Math.floor(Math.random() * statusAnuncio.length)],
    prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
    investimento: faixasInvestimento[Math.floor(Math.random() * faixasInvestimento.length)]
  };
  
  // Busca dores específicas do segmento
  const doresSegmento = doresPorSegmento[perfil.segmento] || doresPorSegmento['Serviços'];
  const dores = doresSegmento.sort(() => Math.random() - 0.5).slice(0, 3);
  
  // Busca objeções do momento
  const objecoesMomento = objecoesPorMomento[perfil.momento] || objecoesPorMomento['Estou vendendo, mas sinto que poderia vender mais'];
  const objecoes = objecoesMomento.sort(() => Math.random() - 0.5).slice(0, 3);
  
  // Idade entre 25 e 60
  const idade = Math.floor(Math.random() * 35) + 25;
  
  return { nome, perfil, dores, objecoes, idade, genero };
}

// Função para gerar 5 clientes sintéticos aleatórios
export function gerarCincoClientesSinteticos() {
  return Array.from({ length: 5 }, () => gerarClienteSinteticoAleatorio());
}

// Função para gerar clientes filtrados por segmento
export function gerarClientesPorSegmento(segmentoFiltro: string, quantidade: number = 5) {
  const clientes = [];
  let tentativas = 0;
  const maxTentativas = quantidade * 10; // Evita loop infinito
  
  while (clientes.length < quantidade && tentativas < maxTentativas) {
    const cliente = gerarClienteSinteticoAleatorio();
    
    // Se "Todos" ou segmento corresponde
    if (segmentoFiltro === 'Todos' || cliente.perfil.segmento === segmentoFiltro) {
      clientes.push(cliente);
    } else {
      // Força o segmento desejado
      cliente.perfil.segmento = segmentoFiltro;
      const doresSegmento = doresPorSegmento[segmentoFiltro] || doresPorSegmento['Serviços'];
      cliente.dores = doresSegmento.sort(() => Math.random() - 0.5).slice(0, 3);
      clientes.push(cliente);
    }
    tentativas++;
  }
  
  return clientes;
}

// Lista de segmentos disponíveis para filtro
export const segmentosParaFiltro = [
  'Todos',
  ...segmentos
];
