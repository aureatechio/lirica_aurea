// Dados de Influências - Diretas (Mercado de Educação) e Indiretas (Grandes Marcas)
// 40x mais referências com pesos e categorização

export type TipoInfluencia = "direta" | "indireta";
export type CategoriaInfluencia = 
  | "educacao_negocios" 
  | "educacao_marketing" 
  | "educacao_tech" 
  | "educacao_desenvolvimento"
  | "educacao_financas"
  | "plataformas_infoprodutos"
  | "agencias_marketing"
  | "marcas_luxo"
  | "marcas_tech"
  | "marcas_lifestyle"
  | "marcas_moda"
  | "marcas_entretenimento"
  | "marcas_esportes"
  | "criadores_conteudo"
  | "podcasts"
  | "eventos";

export type PesoInfluencia = 1 | 2 | 3 | 4 | 5; // 5 = mais relevante

export interface Influencia {
  id: string;
  nome: string;
  tipo: TipoInfluencia;
  categoria: CategoriaInfluencia;
  peso: PesoInfluencia;
  descricao: string;
  fundadores?: string[];
  produtos?: string[];
  instagram?: string;
  linkedin?: string;
  site?: string;
  adLibrary?: string;
  ultimosAds?: { titulo: string; tipo: string; data: string; link?: string }[];
  ultimosLPs?: { titulo: string; link: string; tipo: string }[];
  ultimosPosts?: { conteudo: string; data: string; engajamento?: string }[];
  insights?: string[];
  oQueAprender?: string[];
}

// ============================================
// INFLUÊNCIAS DIRETAS - MERCADO DE EDUCAÇÃO
// ============================================

export const influenciasDiretas: Influencia[] = [
  // EDUCAÇÃO NEGÓCIOS - Peso 5 (Concorrentes Diretos)
  {
    id: "g4-educacao",
    nome: "G4 Educação",
    tipo: "direta",
    categoria: "educacao_negocios",
    peso: 5,
    descricao: "Maior escola de negócios do Brasil. Referência em lançamentos de alto ticket.",
    fundadores: ["Alfredo Soares", "Tallis Gomes", "Bruno Nardon"],
    produtos: ["G4 Gestão", "G4 Tração", "G4 Escala", "G4 Imersão", "G4 Valley"],
    instagram: "@gaborges",
    site: "https://g4educacao.com",
    adLibrary: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=g4%20educa%C3%A7%C3%A3o",
    ultimosAds: [
      { titulo: "G4 Gestão - Transforme sua empresa", tipo: "Video", data: "Jan 2026" },
      { titulo: "Imersão G4 Valley - Silicon Valley", tipo: "Carrossel", data: "Jan 2026" },
      { titulo: "Alfredo Soares - Depoimento", tipo: "Video", data: "Dez 2025" },
    ],
    ultimosLPs: [
      { titulo: "G4 Gestão", link: "https://g4educacao.com/gestao", tipo: "Lançamento" },
      { titulo: "G4 Valley", link: "https://g4educacao.com/valley", tipo: "High Ticket" },
    ],
    insights: [
      "Foco em prova social de empresários de sucesso",
      "Lançamentos com webinars ao vivo",
      "Uso intensivo de remarketing",
      "Parcerias com influenciadores de negócios",
    ],
    oQueAprender: [
      "Estrutura de funil de lançamento",
      "Comunicação B2B premium",
      "Estratégia de upsell para imersões",
    ],
  },
  {
    id: "startse",
    nome: "StartSe",
    tipo: "direta",
    categoria: "educacao_negocios",
    peso: 5,
    descricao: "Ecossistema de inovação e educação corporativa. Forte em missões internacionais.",
    fundadores: ["Maurício Benvenutti", "Pedro Englert"],
    produtos: ["StartSe University", "Missões Internacionais", "Eventos Corporativos", "StartSe Prime"],
    instagram: "@startse",
    site: "https://startse.com",
    adLibrary: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=startse",
    ultimosAds: [
      { titulo: "Missão China 2026", tipo: "Video", data: "Jan 2026" },
      { titulo: "StartSe University - MBA", tipo: "Carrossel", data: "Jan 2026" },
    ],
    ultimosLPs: [
      { titulo: "Missão Vale do Silício", link: "https://startse.com/missoes/vale", tipo: "High Ticket" },
    ],
    insights: [
      "Posicionamento premium com viagens internacionais",
      "Forte presença em LinkedIn",
      "Conteúdo focado em tendências globais",
    ],
    oQueAprender: [
      "Marketing de experiências premium",
      "Estratégia de conteúdo LinkedIn",
      "Posicionamento de autoridade global",
    ],
  },
  {
    id: "vinci-society",
    nome: "Vinci Society (Thay Dantas)",
    tipo: "direta",
    categoria: "educacao_negocios",
    peso: 5,
    descricao: "Escola de negócios focada em empreendedorismo feminino e lifestyle business.",
    fundadores: ["Thay Dantas"],
    produtos: ["Vinci Society", "Mentoria Vinci", "Imersão Vinci"],
    instagram: "@thaydantas",
    site: "https://vincisociety.com.br",
    ultimosAds: [
      { titulo: "Vinci Society - Empreenda com propósito", tipo: "Video", data: "Jan 2026" },
      { titulo: "Thay Dantas - Depoimento", tipo: "Reels", data: "Jan 2026" },
    ],
    insights: [
      "Comunicação emocional e aspiracional",
      "Forte comunidade feminina",
      "Uso de storytelling pessoal",
    ],
    oQueAprender: [
      "Marketing emocional",
      "Construção de comunidade",
      "Personal branding feminino",
    ],
  },
  {
    id: "novo-mercado",
    nome: "Novo Mercado (Ícaro de Carvalho)",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 5,
    descricao: "Referência em marketing digital e copywriting. Pioneiro em infoprodutos no Brasil.",
    fundadores: ["Ícaro de Carvalho"],
    produtos: ["Novo Mercado", "O Novo Mercado", "Cursos de Copy", "Mentoria"],
    instagram: "@icarodecarvalho",
    site: "https://novomercado.com.br",
    ultimosAds: [
      { titulo: "Novo Mercado - Aprenda a vender", tipo: "Video", data: "Jan 2026" },
    ],
    insights: [
      "Copywriting direto e provocativo",
      "Conteúdo educativo gratuito extenso",
      "Posicionamento anti-guru",
    ],
    oQueAprender: [
      "Técnicas de copywriting",
      "Construção de autoridade via conteúdo",
      "Posicionamento diferenciado",
    ],
  },
  {
    id: "empiricus",
    nome: "Empiricus",
    tipo: "direta",
    categoria: "educacao_financas",
    peso: 5,
    descricao: "Maior casa de análise financeira do Brasil. Referência em marketing agressivo.",
    fundadores: ["Felipe Miranda", "Caio Mesquita"],
    produtos: ["Empiricus Research", "Palavra do Estrategista", "Cursos de Investimento"],
    instagram: "@empirlovers",
    site: "https://empiricus.com.br",
    ultimosAds: [
      { titulo: "Ação que pode multiplicar 10x", tipo: "Video", data: "Jan 2026" },
      { titulo: "Relatório gratuito - Melhores ações 2026", tipo: "Lead Magnet", data: "Jan 2026" },
    ],
    insights: [
      "Marketing de urgência e escassez",
      "Headlines provocativas",
      "Funil de lead magnet agressivo",
    ],
    oQueAprender: [
      "Copywriting de urgência",
      "Estratégia de lead magnets",
      "Remarketing agressivo",
    ],
  },
  
  // EDUCAÇÃO MARKETING - Peso 4-5
  {
    id: "hotmart",
    nome: "Hotmart",
    tipo: "direta",
    categoria: "plataformas_infoprodutos",
    peso: 5,
    descricao: "Maior plataforma de infoprodutos da América Latina. Define tendências do mercado.",
    fundadores: ["João Pedro Resende", "Mateus Bicalho"],
    produtos: ["Hotmart", "Sparkle", "Hotmart Club", "FIRE Festival"],
    instagram: "@hotmart",
    site: "https://hotmart.com",
    ultimosAds: [
      { titulo: "Crie seu curso online", tipo: "Video", data: "Jan 2026" },
      { titulo: "FIRE Festival 2026", tipo: "Evento", data: "Jan 2026" },
    ],
    insights: [
      "Marketing de plataforma",
      "Eventos como estratégia de branding",
      "Educação do mercado",
    ],
    oQueAprender: [
      "Estratégia de eventos",
      "Marketing de ecossistema",
      "Educação de mercado",
    ],
  },
  {
    id: "v4-company",
    nome: "V4 Company",
    tipo: "direta",
    categoria: "agencias_marketing",
    peso: 4,
    descricao: "Maior rede de franquias de marketing digital do Brasil.",
    fundadores: ["Dener Lippert"],
    produtos: ["V4 Company", "Franquia V4", "V4 Academy"],
    instagram: "@v4company",
    site: "https://v4company.com",
    ultimosAds: [
      { titulo: "Seja um franqueado V4", tipo: "Video", data: "Jan 2026" },
    ],
    insights: [
      "Modelo de franquia em marketing",
      "Conteúdo educativo no YouTube",
      "Posicionamento de resultados",
    ],
    oQueAprender: [
      "Escalabilidade via franquias",
      "Marketing de resultados",
      "Conteúdo YouTube",
    ],
  },
  {
    id: "webliv",
    nome: "Webliv (Leandro Ladeira)",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 4,
    descricao: "Especialista em lançamentos e tráfego pago. Referência em estratégias de escala.",
    fundadores: ["Leandro Ladeira"],
    produtos: ["Webliv", "Curso de Lançamentos", "Mentoria Ladeira"],
    instagram: "@leloladeira",
    site: "https://webliv.com.br",
    ultimosAds: [
      { titulo: "Como fazer 7 dígitos em lançamentos", tipo: "Video", data: "Jan 2026" },
    ],
    insights: [
      "Conteúdo técnico de lançamentos",
      "Cases de sucesso detalhados",
      "Comunidade de lançadores",
    ],
    oQueAprender: [
      "Estrutura de lançamentos",
      "Estratégias de tráfego",
      "Métricas de lançamento",
    ],
  },
  {
    id: "sobral",
    nome: "Sobral (Pedro Sobral)",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 4,
    descricao: "Maior referência em tráfego pago do Brasil. Comunidade Sobral de Valor.",
    fundadores: ["Pedro Sobral"],
    produtos: ["Comunidade Sobral", "Curso de Tráfego", "Subido"],
    instagram: "@pedrosobral",
    site: "https://pedrosobral.com.br",
    ultimosAds: [
      { titulo: "Aprenda tráfego pago do zero", tipo: "Video", data: "Jan 2026" },
    ],
    insights: [
      "Conteúdo gratuito extensivo",
      "Comunidade engajada",
      "Linguagem acessível",
    ],
    oQueAprender: [
      "Estratégia de comunidade",
      "Conteúdo educativo gratuito",
      "Linguagem popular",
    ],
  },
  {
    id: "rockcontent",
    nome: "Rock Content",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 4,
    descricao: "Referência em marketing de conteúdo e inbound marketing.",
    fundadores: ["Diego Gomes", "Edmar Ferreira"],
    produtos: ["Rock Content", "Rock University", "Ion Interactive"],
    instagram: "@rockcontent",
    site: "https://rockcontent.com",
    insights: [
      "Marketing de conteúdo B2B",
      "SEO e inbound marketing",
      "Ferramentas interativas",
    ],
    oQueAprender: [
      "Estratégia de conteúdo",
      "SEO avançado",
      "Marketing B2B",
    ],
  },
  {
    id: "rd-station",
    nome: "RD Station",
    tipo: "direta",
    categoria: "plataformas_infoprodutos",
    peso: 4,
    descricao: "Plataforma de automação de marketing. Referência em eventos (RD Summit).",
    fundadores: ["Eric Santos", "Bruno Ghisi"],
    produtos: ["RD Station Marketing", "RD Station CRM", "RD Summit"],
    instagram: "@rdstation",
    site: "https://rdstation.com",
    insights: [
      "Eventos como estratégia de marca",
      "Conteúdo educativo B2B",
      "Certificações",
    ],
    oQueAprender: [
      "Estratégia de eventos B2B",
      "Marketing de produto SaaS",
      "Certificações como autoridade",
    ],
  },
  
  // EDUCAÇÃO TECH - Peso 4
  {
    id: "alura",
    nome: "Alura",
    tipo: "direta",
    categoria: "educacao_tech",
    peso: 4,
    descricao: "Maior plataforma de cursos de tecnologia do Brasil.",
    fundadores: ["Paulo Silveira", "Guilherme Silveira"],
    produtos: ["Alura", "Alura Para Empresas", "Imersões"],
    instagram: "@alaboradatech",
    site: "https://alura.com.br",
    insights: [
      "Modelo de assinatura",
      "Conteúdo atualizado constantemente",
      "Gamificação",
    ],
    oQueAprender: [
      "Modelo de recorrência",
      "Gamificação em educação",
      "Atualização de conteúdo",
    ],
  },
  {
    id: "rocketseat",
    nome: "Rocketseat",
    tipo: "direta",
    categoria: "educacao_tech",
    peso: 4,
    descricao: "Escola de programação com foco em comunidade e eventos.",
    fundadores: ["Diego Fernandes", "Robson Marques"],
    produtos: ["Ignite", "Explorer", "NLW", "DoWhile"],
    instagram: "@rocketseat",
    site: "https://rocketseat.com.br",
    insights: [
      "Eventos gratuitos como captação",
      "Comunidade Discord forte",
      "Conteúdo prático e projeto-based",
    ],
    oQueAprender: [
      "Eventos como funil de captação",
      "Comunidade no Discord",
      "Aprendizado baseado em projetos",
    ],
  },
  {
    id: "dio",
    nome: "DIO (Digital Innovation One)",
    tipo: "direta",
    categoria: "educacao_tech",
    peso: 3,
    descricao: "Plataforma de educação tech com foco em empregabilidade.",
    fundadores: ["Iglá Generoso"],
    produtos: ["Bootcamps", "Formações", "Santander Bootcamp"],
    instagram: "@dio_makethechange",
    site: "https://dio.me",
    insights: [
      "Parcerias com grandes empresas",
      "Foco em empregabilidade",
      "Bootcamps gratuitos patrocinados",
    ],
    oQueAprender: [
      "Parcerias corporativas",
      "Marketing de empregabilidade",
      "Modelo de patrocínio",
    ],
  },
  
  // DESENVOLVIMENTO PESSOAL - Peso 3-4
  {
    id: "conrado-adolpho",
    nome: "Conrado Adolpho",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 4,
    descricao: "Autor do 8Ps do Marketing Digital. Pioneiro em marketing digital no Brasil.",
    fundadores: ["Conrado Adolpho"],
    produtos: ["8Ps", "Webliv", "Mentoria"],
    instagram: "@conaborradoadolpho",
    site: "https://conradoadolpho.com.br",
    insights: [
      "Autoridade via livro",
      "Metodologia proprietária",
      "Conteúdo denso e técnico",
    ],
    oQueAprender: [
      "Construção de metodologia",
      "Autoridade via publicação",
      "Posicionamento de especialista",
    ],
  },
  {
    id: "joel-jota",
    nome: "Joel Jota",
    tipo: "direta",
    categoria: "educacao_desenvolvimento",
    peso: 4,
    descricao: "Ex-atleta olímpico. Referência em alta performance e mentalidade.",
    fundadores: ["Joel Jota"],
    produtos: ["Método Alta Performance", "Palestras", "Mentoria"],
    instagram: "@joaborraeljota",
    site: "https://joeljota.com.br",
    insights: [
      "Storytelling de superação",
      "Crossover esporte-negócios",
      "Conteúdo motivacional",
    ],
    oQueAprender: [
      "Personal branding de atleta",
      "Storytelling de superação",
      "Posicionamento de alta performance",
    ],
  },
  {
    id: "flavio-augusto",
    nome: "Flávio Augusto",
    tipo: "direta",
    categoria: "educacao_negocios",
    peso: 5,
    descricao: "Fundador da Wise Up e Geração de Valor. Ícone do empreendedorismo brasileiro.",
    fundadores: ["Flávio Augusto"],
    produtos: ["Geração de Valor", "MeuSucesso.com", "Wise Up"],
    instagram: "@flavioaugustodasilva",
    site: "https://geracaodevalor.com",
    insights: [
      "Personal branding forte",
      "Conteúdo polêmico e opinativo",
      "Posicionamento de self-made",
    ],
    oQueAprender: [
      "Personal branding empresarial",
      "Conteúdo opinativo",
      "Construção de legado",
    ],
  },
  {
    id: "paulo-vieira",
    nome: "Paulo Vieira",
    tipo: "direta",
    categoria: "educacao_desenvolvimento",
    peso: 4,
    descricao: "Master coach e autor best-seller. Referência em desenvolvimento pessoal.",
    fundadores: ["Paulo Vieira"],
    produtos: ["Método CIS", "Febracis", "Livros"],
    instagram: "@paulovieira",
    site: "https://paulovieira.com.br",
    insights: [
      "Eventos presenciais massivos",
      "Metodologia de coaching",
      "Livros como funil",
    ],
    oQueAprender: [
      "Eventos de transformação",
      "Metodologia proprietária",
      "Funil de livros",
    ],
  },
  {
    id: "wendell-carvalho",
    nome: "Wendell Carvalho",
    tipo: "direta",
    categoria: "educacao_desenvolvimento",
    peso: 3,
    descricao: "Especialista em inteligência emocional e liderança.",
    fundadores: ["Wendell Carvalho"],
    produtos: ["Método IE", "Palestras", "Mentoria"],
    instagram: "@wendellcarvalho",
    insights: [
      "Conteúdo de inteligência emocional",
      "Palestras corporativas",
      "Posicionamento de especialista",
    ],
    oQueAprender: [
      "Nicho de inteligência emocional",
      "Marketing para RH",
      "Palestras corporativas",
    ],
  },
  
  // PODCASTS E CRIADORES - Peso 3-4
  {
    id: "primocast",
    nome: "Primocast (Primo Rico)",
    tipo: "direta",
    categoria: "podcasts",
    peso: 4,
    descricao: "Maior podcast de finanças do Brasil. Referência em conteúdo educativo.",
    fundadores: ["Thiago Nigro"],
    produtos: ["Primocast", "Primo Rico", "Finclass"],
    instagram: "@thaborraiago.nigro",
    site: "https://primorico.com.br",
    insights: [
      "Podcast como funil de captação",
      "Linguagem acessível sobre finanças",
      "Parcerias com grandes nomes",
    ],
    oQueAprender: [
      "Estratégia de podcast",
      "Democratização de conteúdo",
      "Parcerias estratégicas",
    ],
  },
  {
    id: "inteligencia-ltda",
    nome: "Inteligência Ltda",
    tipo: "direta",
    categoria: "podcasts",
    peso: 3,
    descricao: "Podcast de entrevistas com empreendedores e pensadores.",
    fundadores: ["Rogério Vilela"],
    produtos: ["Inteligência Ltda", "Cortes"],
    instagram: "@intaborraeligencialtda",
    insights: [
      "Formato de entrevista longa",
      "Distribuição de cortes",
      "Convidados de alto perfil",
    ],
    oQueAprender: [
      "Estratégia de cortes",
      "Booking de convidados",
      "Formato long-form",
    ],
  },
  {
    id: "flow-podcast",
    nome: "Flow Podcast",
    tipo: "direta",
    categoria: "podcasts",
    peso: 4,
    descricao: "Maior podcast do Brasil. Referência em entretenimento e entrevistas.",
    fundadores: ["Igor 3K", "Monark"],
    produtos: ["Flow Podcast", "Flow Games", "Flow News"],
    instagram: "@flowpdc",
    insights: [
      "Formato descontraído",
      "Alta frequência de episódios",
      "Diversificação de canais",
    ],
    oQueAprender: [
      "Escala de produção",
      "Formato conversacional",
      "Diversificação de conteúdo",
    ],
  },
  {
    id: "hubspot",
    nome: "HubSpot",
    tipo: "direta",
    categoria: "plataformas_infoprodutos",
    peso: 4,
    descricao: "Referência global em inbound marketing e CRM.",
    fundadores: ["Brian Halligan", "Dharmesh Shah"],
    produtos: ["HubSpot CRM", "HubSpot Academy", "Certificações"],
    instagram: "@hubspot",
    site: "https://hubspot.com",
    insights: [
      "Educação como estratégia de produto",
      "Certificações gratuitas",
      "Conteúdo SEO massivo",
    ],
    oQueAprender: [
      "Inbound marketing",
      "Certificações como autoridade",
      "Estratégia de conteúdo SEO",
    ],
  },
  
  // MAIS INFLUÊNCIAS DIRETAS
  {
    id: "ecommerce-na-pratica",
    nome: "Ecommerce na Prática",
    tipo: "direta",
    categoria: "educacao_negocios",
    peso: 3,
    descricao: "Referência em educação para e-commerce.",
    fundadores: ["Bruno de Oliveira"],
    produtos: ["Ecommerce na Prática", "Mentoria", "Cursos"],
    instagram: "@eaborracommercenapratica",
    insights: [
      "Nicho específico de e-commerce",
      "Conteúdo prático e tático",
      "Comunidade de lojistas",
    ],
    oQueAprender: [
      "Especialização em nicho",
      "Conteúdo prático",
      "Comunidade vertical",
    ],
  },
  {
    id: "nathalia-arcuri",
    nome: "Nathalia Arcuri (Me Poupe)",
    tipo: "direta",
    categoria: "educacao_financas",
    peso: 4,
    descricao: "Maior canal de finanças pessoais do Brasil. Linguagem popular.",
    fundadores: ["Nathalia Arcuri"],
    produtos: ["Me Poupe", "Curso de Investimentos", "Livros"],
    instagram: "@nataborrahalia.arcuri",
    site: "https://mepoupe.com",
    insights: [
      "Linguagem popular e divertida",
      "Conteúdo para iniciantes",
      "Personal branding forte",
    ],
    oQueAprender: [
      "Comunicação popular",
      "Entretenimento educativo",
      "Personal branding feminino",
    ],
  },
  {
    id: "mairo-vergara",
    nome: "Mairo Vergara",
    tipo: "direta",
    categoria: "educacao_tech",
    peso: 3,
    descricao: "Maior canal de inglês do Brasil. Referência em educação de idiomas.",
    fundadores: ["Mairo Vergara"],
    produtos: ["Curso de Inglês", "Método Vergara", "App"],
    instagram: "@mairovergara",
    insights: [
      "Conteúdo gratuito extensivo",
      "Método proprietário",
      "YouTube como funil",
    ],
    oQueAprender: [
      "YouTube como estratégia",
      "Método de ensino",
      "Funil de conteúdo gratuito",
    ],
  },
  {
    id: "seiiti-arata",
    nome: "Seiiti Arata",
    tipo: "direta",
    categoria: "educacao_desenvolvimento",
    peso: 3,
    descricao: "Referência em produtividade e desenvolvimento pessoal.",
    fundadores: ["Seiiti Arata"],
    produtos: ["Arata Academy", "Cursos Online", "Livros"],
    instagram: "@aaborrarata.academy",
    insights: [
      "Conteúdo de alta qualidade",
      "Produção cinematográfica",
      "Posicionamento premium",
    ],
    oQueAprender: [
      "Qualidade de produção",
      "Posicionamento premium",
      "Conteúdo evergreen",
    ],
  },
  {
    id: "erico-rocha",
    nome: "Erico Rocha",
    tipo: "direta",
    categoria: "educacao_marketing",
    peso: 5,
    descricao: "Pioneiro em lançamentos no Brasil. Criador da Fórmula de Lançamento.",
    fundadores: ["Erico Rocha"],
    produtos: ["Fórmula de Lançamento", "Ignição Digital", "Mentoria"],
    instagram: "@ericorocha",
    site: "https://formuladelancamento.com.br",
    insights: [
      "Metodologia de lançamento",
      "Eventos ao vivo massivos",
      "Comunidade de lançadores",
    ],
    oQueAprender: [
      "Estrutura de lançamento",
      "Eventos de captação",
      "Comunidade de alunos",
    ],
  },
];

// ============================================
// INFLUÊNCIAS INDIRETAS - GRANDES MARCAS
// ============================================

export const influenciasIndiretas: Influencia[] = [
  // MARCAS DE LUXO - Peso 5 (Inspiração Premium)
  {
    id: "dior",
    nome: "Dior",
    tipo: "indireta",
    categoria: "marcas_luxo",
    peso: 5,
    descricao: "Referência em branding de luxo e storytelling aspiracional.",
    produtos: ["Alta Costura", "Perfumes", "Acessórios"],
    instagram: "@dior",
    site: "https://dior.com",
    insights: [
      "Storytelling de herança e tradição",
      "Campanhas cinematográficas",
      "Exclusividade como valor",
      "Parcerias com celebridades globais",
    ],
    oQueAprender: [
      "Construção de marca aspiracional",
      "Storytelling de luxo",
      "Experiência de marca premium",
    ],
  },
  {
    id: "louis-vuitton",
    nome: "Louis Vuitton",
    tipo: "indireta",
    categoria: "marcas_luxo",
    peso: 5,
    descricao: "Ícone do luxo mundial. Referência em exclusividade e desejo.",
    produtos: ["Bolsas", "Malas", "Roupas", "Acessórios"],
    instagram: "@louisvuitton",
    site: "https://louisvuitton.com",
    insights: [
      "Escassez artificial",
      "Colaborações inesperadas",
      "Heritage marketing",
      "Experiências exclusivas",
    ],
    oQueAprender: [
      "Marketing de escassez",
      "Colaborações estratégicas",
      "Construção de legado",
    ],
  },
  {
    id: "chanel",
    nome: "Chanel",
    tipo: "indireta",
    categoria: "marcas_luxo",
    peso: 5,
    descricao: "Elegância atemporal. Referência em posicionamento de marca.",
    produtos: ["Alta Costura", "Perfumes", "Cosméticos"],
    instagram: "@chanelofficial",
    site: "https://chanel.com",
    insights: [
      "Consistência de marca por décadas",
      "Storytelling de fundadora",
      "Minimalismo sofisticado",
    ],
    oQueAprender: [
      "Consistência de marca",
      "Storytelling de origem",
      "Elegância na comunicação",
    ],
  },
  {
    id: "rolex",
    nome: "Rolex",
    tipo: "indireta",
    categoria: "marcas_luxo",
    peso: 4,
    descricao: "Símbolo de sucesso e conquista. Marketing de status.",
    produtos: ["Relógios de Luxo"],
    instagram: "@rolex",
    site: "https://rolex.com",
    insights: [
      "Associação com conquistas",
      "Patrocínio de eventos premium",
      "Escassez real de produto",
    ],
    oQueAprender: [
      "Marketing de status",
      "Patrocínio estratégico",
      "Escassez como estratégia",
    ],
  },
  
  // MARCAS TECH - Peso 5
  {
    id: "apple",
    nome: "Apple",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 5,
    descricao: "Referência máxima em branding, lançamentos e experiência do usuário.",
    fundadores: ["Steve Jobs", "Steve Wozniak"],
    produtos: ["iPhone", "Mac", "iPad", "Apple Watch", "Services"],
    instagram: "@apple",
    site: "https://apple.com",
    insights: [
      "Eventos de lançamento icônicos",
      "Simplicidade na comunicação",
      "Ecossistema integrado",
      "Design como diferencial",
      "Comunidade de fãs leais",
    ],
    oQueAprender: [
      "Estrutura de keynotes",
      "Simplicidade na mensagem",
      "Construção de ecossistema",
      "Design thinking",
    ],
  },
  {
    id: "tesla",
    nome: "Tesla",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 5,
    descricao: "Disrupção e inovação. Marketing sem publicidade tradicional.",
    fundadores: ["Elon Musk"],
    produtos: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
    instagram: "@teslamotors",
    site: "https://tesla.com",
    insights: [
      "Zero publicidade tradicional",
      "CEO como porta-voz",
      "Comunidade de evangelistas",
      "Produto como marketing",
    ],
    oQueAprender: [
      "Marketing sem ads",
      "Personal branding do fundador",
      "Comunidade de evangelistas",
    ],
  },
  {
    id: "netflix",
    nome: "Netflix",
    tipo: "indireta",
    categoria: "marcas_entretenimento",
    peso: 4,
    descricao: "Referência em marketing de conteúdo e engajamento social.",
    produtos: ["Streaming", "Séries Originais", "Filmes"],
    instagram: "@netflix",
    site: "https://netflix.com",
    insights: [
      "Social media irreverente",
      "Marketing de conteúdo nativo",
      "Personalização extrema",
      "Memes como estratégia",
    ],
    oQueAprender: [
      "Voz de marca nas redes",
      "Marketing de entretenimento",
      "Engajamento social",
    ],
  },
  {
    id: "spotify",
    nome: "Spotify",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 4,
    descricao: "Personalização e dados como marketing. Wrapped como fenômeno.",
    produtos: ["Streaming de Música", "Podcasts", "Wrapped"],
    instagram: "@spotify",
    site: "https://spotify.com",
    insights: [
      "Wrapped como viral anual",
      "Personalização como valor",
      "Dados como storytelling",
    ],
    oQueAprender: [
      "Campanhas virais anuais",
      "Personalização de experiência",
      "Dados como conteúdo",
    ],
  },
  
  // MARCAS LIFESTYLE - Peso 4
  {
    id: "nike",
    nome: "Nike",
    tipo: "indireta",
    categoria: "marcas_esportes",
    peso: 5,
    descricao: "Just Do It. Referência em storytelling emocional e atletas.",
    produtos: ["Tênis", "Roupas", "Equipamentos"],
    instagram: "@nike",
    site: "https://nike.com",
    insights: [
      "Storytelling de superação",
      "Atletas como embaixadores",
      "Campanhas polêmicas e corajosas",
      "Comunidade de corredores",
    ],
    oQueAprender: [
      "Storytelling emocional",
      "Marketing de atletas",
      "Posicionamento corajoso",
    ],
  },
  {
    id: "red-bull",
    nome: "Red Bull",
    tipo: "indireta",
    categoria: "marcas_lifestyle",
    peso: 5,
    descricao: "Marketing de conteúdo extremo. Empresa de mídia que vende energético.",
    produtos: ["Red Bull", "Red Bull Media House", "Eventos"],
    instagram: "@redbull",
    site: "https://redbull.com",
    insights: [
      "Conteúdo > Produto",
      "Eventos próprios icônicos",
      "Patrocínio de esportes radicais",
      "Media house própria",
    ],
    oQueAprender: [
      "Content marketing extremo",
      "Eventos como marca",
      "Patrocínio estratégico",
    ],
  },
  {
    id: "patagonia",
    nome: "Patagonia",
    tipo: "indireta",
    categoria: "marcas_lifestyle",
    peso: 4,
    descricao: "Propósito acima do lucro. Referência em marketing de causa.",
    produtos: ["Roupas Outdoor", "Equipamentos"],
    instagram: "@patagonia",
    site: "https://patagonia.com",
    insights: [
      "Propósito como diferencial",
      "Anti-consumismo como marketing",
      "Transparência radical",
    ],
    oQueAprender: [
      "Marketing de propósito",
      "Autenticidade de marca",
      "Transparência como valor",
    ],
  },
  {
    id: "airbnb",
    nome: "Airbnb",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 4,
    descricao: "Pertencer a qualquer lugar. Marketing de experiências.",
    produtos: ["Hospedagem", "Experiências", "Airbnb Luxe"],
    instagram: "@airbnb",
    site: "https://airbnb.com",
    insights: [
      "User-generated content",
      "Storytelling de anfitriões",
      "Marketing de experiências",
    ],
    oQueAprender: [
      "UGC como estratégia",
      "Marketing de comunidade",
      "Experiências como produto",
    ],
  },
  
  // MARCAS DE MODA - Peso 3-4
  {
    id: "zara",
    nome: "Zara",
    tipo: "indireta",
    categoria: "marcas_moda",
    peso: 3,
    descricao: "Fast fashion premium. Zero publicidade tradicional.",
    produtos: ["Roupas", "Acessórios"],
    instagram: "@zara",
    site: "https://zara.com",
    insights: [
      "Zero publicidade",
      "Localização premium",
      "Velocidade de lançamento",
    ],
    oQueAprender: [
      "Marketing sem ads",
      "Experiência de loja",
      "Velocidade de mercado",
    ],
  },
  {
    id: "supreme",
    nome: "Supreme",
    tipo: "indireta",
    categoria: "marcas_moda",
    peso: 4,
    descricao: "Hype e escassez. Referência em drops e exclusividade.",
    produtos: ["Streetwear", "Acessórios", "Colaborações"],
    instagram: "@supremenewyork",
    site: "https://supremenewyork.com",
    insights: [
      "Drops semanais",
      "Escassez extrema",
      "Colaborações inesperadas",
      "Comunidade de colecionadores",
    ],
    oQueAprender: [
      "Marketing de escassez",
      "Drops como estratégia",
      "Hype culture",
    ],
  },
  {
    id: "off-white",
    nome: "Off-White",
    tipo: "indireta",
    categoria: "marcas_moda",
    peso: 3,
    descricao: "Streetwear de luxo. Colaborações icônicas.",
    fundadores: ["Virgil Abloh"],
    produtos: ["Streetwear", "Colaborações Nike", "Acessórios"],
    instagram: "@offwhite",
    insights: [
      "Crossover streetwear-luxo",
      "Colaborações estratégicas",
      "Design conceitual",
    ],
    oQueAprender: [
      "Posicionamento híbrido",
      "Colaborações de marca",
      "Design como diferencial",
    ],
  },
  
  // ENTRETENIMENTO - Peso 3-4
  {
    id: "disney",
    nome: "Disney",
    tipo: "indireta",
    categoria: "marcas_entretenimento",
    peso: 4,
    descricao: "Magia e storytelling. Referência em experiência de marca.",
    produtos: ["Filmes", "Parques", "Disney+", "Merchandise"],
    instagram: "@disney",
    site: "https://disney.com",
    insights: [
      "Storytelling emocional",
      "Experiência imersiva",
      "Franquias de longo prazo",
      "Nostalgia como estratégia",
    ],
    oQueAprender: [
      "Storytelling de marca",
      "Experiência imersiva",
      "Marketing de nostalgia",
    ],
  },
  {
    id: "marvel",
    nome: "Marvel Studios",
    tipo: "indireta",
    categoria: "marcas_entretenimento",
    peso: 4,
    descricao: "Universo cinematográfico. Referência em franquias conectadas.",
    produtos: ["Filmes MCU", "Séries Disney+", "Merchandise"],
    instagram: "@marvelstudios",
    site: "https://marvel.com",
    insights: [
      "Universo expandido",
      "Easter eggs e teorias",
      "Comunidade de fãs",
      "Lançamentos como eventos",
    ],
    oQueAprender: [
      "Construção de universo",
      "Engajamento de comunidade",
      "Lançamentos como eventos",
    ],
  },
  
  // MAIS MARCAS INDIRETAS
  {
    id: "coca-cola",
    nome: "Coca-Cola",
    tipo: "indireta",
    categoria: "marcas_lifestyle",
    peso: 4,
    descricao: "Felicidade engarrafada. Referência em branding emocional.",
    produtos: ["Coca-Cola", "Fanta", "Sprite"],
    instagram: "@cocacola",
    site: "https://coca-cola.com",
    insights: [
      "Branding emocional",
      "Campanhas sazonais icônicas",
      "Consistência global",
    ],
    oQueAprender: [
      "Branding emocional",
      "Campanhas sazonais",
      "Consistência de marca",
    ],
  },
  {
    id: "amazon",
    nome: "Amazon",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 4,
    descricao: "Customer obsession. Referência em experiência do cliente.",
    fundadores: ["Jeff Bezos"],
    produtos: ["E-commerce", "AWS", "Prime", "Alexa"],
    instagram: "@amazon",
    site: "https://amazon.com",
    insights: [
      "Obsessão pelo cliente",
      "Prime como fidelização",
      "Ecossistema de serviços",
    ],
    oQueAprender: [
      "Customer experience",
      "Programas de fidelidade",
      "Ecossistema de produtos",
    ],
  },
  {
    id: "google",
    nome: "Google",
    tipo: "indireta",
    categoria: "marcas_tech",
    peso: 4,
    descricao: "Organizar a informação do mundo. Referência em simplicidade.",
    fundadores: ["Larry Page", "Sergey Brin"],
    produtos: ["Search", "YouTube", "Android", "Cloud"],
    instagram: "@google",
    site: "https://google.com",
    insights: [
      "Simplicidade extrema",
      "Produto como marketing",
      "Inovação constante",
    ],
    oQueAprender: [
      "Simplicidade de produto",
      "Inovação como marca",
      "Ecossistema de serviços",
    ],
  },
  {
    id: "lego",
    nome: "LEGO",
    tipo: "indireta",
    categoria: "marcas_entretenimento",
    peso: 3,
    descricao: "Criatividade e nostalgia. Referência em comunidade de fãs.",
    produtos: ["LEGO Sets", "LEGO Ideas", "Parques"],
    instagram: "@lego",
    site: "https://lego.com",
    insights: [
      "Comunidade de criadores",
      "LEGO Ideas (co-criação)",
      "Nostalgia + inovação",
    ],
    oQueAprender: [
      "Co-criação com comunidade",
      "Marketing de nostalgia",
      "Engajamento de fãs",
    ],
  },
  {
    id: "starbucks",
    nome: "Starbucks",
    tipo: "indireta",
    categoria: "marcas_lifestyle",
    peso: 3,
    descricao: "Terceiro lugar. Referência em experiência de marca.",
    produtos: ["Café", "Bebidas", "Merchandise"],
    instagram: "@starbucks",
    site: "https://starbucks.com",
    insights: [
      "Experiência > Produto",
      "Personalização de pedidos",
      "Programa de fidelidade",
    ],
    oQueAprender: [
      "Experiência de marca",
      "Personalização",
      "Fidelização",
    ],
  },
  {
    id: "porsche",
    nome: "Porsche",
    tipo: "indireta",
    categoria: "marcas_luxo",
    peso: 4,
    descricao: "Performance e tradição. Referência em heritage marketing.",
    produtos: ["911", "Cayenne", "Taycan"],
    instagram: "@porsche",
    site: "https://porsche.com",
    insights: [
      "Heritage como diferencial",
      "Comunidade de entusiastas",
      "Experiências exclusivas",
    ],
    oQueAprender: [
      "Heritage marketing",
      "Comunidade de marca",
      "Experiências premium",
    ],
  },
  {
    id: "ogilvy",
    nome: "Ogilvy",
    tipo: "indireta",
    categoria: "agencias_marketing",
    peso: 5,
    descricao: "Agência lendária. Referência em copywriting e estratégia criativa.",
    fundadores: ["David Ogilvy"],
    produtos: ["Publicidade", "Branding", "Digital"],
    instagram: "@ogilvy",
    site: "https://ogilvy.com",
    insights: [
      "Copywriting clássico",
      "Research como base",
      "Big ideas",
      "Campanhas icônicas",
    ],
    oQueAprender: [
      "Princípios de copywriting",
      "Pesquisa de mercado",
      "Construção de big ideas",
    ],
  },
  {
    id: "droga5",
    nome: "Droga5",
    tipo: "indireta",
    categoria: "agencias_marketing",
    peso: 4,
    descricao: "Agência criativa premiada. Referência em campanhas inovadoras.",
    fundadores: ["David Droga"],
    produtos: ["Publicidade", "Campanhas Integradas"],
    instagram: "@droga5",
    site: "https://droga5.com",
    insights: [
      "Criatividade disruptiva",
      "Campanhas integradas",
      "Storytelling inovador",
    ],
    oQueAprender: [
      "Criatividade em campanhas",
      "Integração de canais",
      "Storytelling moderno",
    ],
  },
  {
    id: "wieden-kennedy",
    nome: "Wieden+Kennedy",
    tipo: "indireta",
    categoria: "agencias_marketing",
    peso: 4,
    descricao: "Criadores do Just Do It. Referência em campanhas icônicas.",
    fundadores: ["Dan Wieden", "David Kennedy"],
    produtos: ["Publicidade", "Nike", "Old Spice"],
    instagram: "@wiedenkennedy",
    site: "https://wk.com",
    insights: [
      "Slogans icônicos",
      "Campanhas memoráveis",
      "Parcerias de longo prazo",
    ],
    oQueAprender: [
      "Criação de slogans",
      "Campanhas de impacto",
      "Relacionamento com clientes",
    ],
  },
];

// ============================================
// EVENTOS E OPORTUNIDADES
// ============================================

export interface EventoMercado {
  id: string;
  nome: string;
  tipo: "evento" | "data_comemorativa" | "tendencia" | "oportunidade" | "perigo";
  mes: number;
  dia?: number;
  descricao: string;
  impacto: "alto" | "medio" | "baixo";
  segmentos: string[];
  acaoSugerida?: string;
}

export const eventosMercado: EventoMercado[] = [
  // JANEIRO
  { id: "nrf-2026", nome: "NRF Retail's Big Show", tipo: "evento", mes: 1, dia: 12, descricao: "Maior evento de varejo do mundo em NYC", impacto: "alto", segmentos: ["negocios", "varejo", "tech"], acaoSugerida: "Criar conteúdo sobre tendências da NRF" },
  { id: "ano-novo", nome: "Ano Novo - Metas e Planejamento", tipo: "oportunidade", mes: 1, dia: 1, descricao: "Momento de definição de metas", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas de planejamento e metas" },
  { id: "volta-ferias", nome: "Volta das Férias", tipo: "oportunidade", mes: 1, dia: 15, descricao: "Retorno ao trabalho, momento de novos projetos", impacto: "medio", segmentos: ["negocios", "educacao"], acaoSugerida: "Lançamentos de início de ano" },
  
  // FEVEREIRO
  { id: "carnaval-2026", nome: "Carnaval", tipo: "perigo", mes: 2, dia: 17, descricao: "Baixa atenção do público, evitar lançamentos", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Pausar campanhas ou criar conteúdo temático" },
  { id: "dia-namorados-us", nome: "Valentine's Day (EUA)", tipo: "tendencia", mes: 2, dia: 14, descricao: "Tendências de campanhas românticas globais", impacto: "baixo", segmentos: ["lifestyle", "moda"], acaoSugerida: "Observar campanhas internacionais" },
  
  // MARÇO
  { id: "dia-mulher", nome: "Dia Internacional da Mulher", tipo: "oportunidade", mes: 3, dia: 8, descricao: "Campanhas de empoderamento feminino", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Conteúdo de empoderamento, destaque para mulheres" },
  { id: "sxsw-2026", nome: "SXSW", tipo: "evento", mes: 3, dia: 7, descricao: "Festival de inovação, tech e criatividade em Austin", impacto: "alto", segmentos: ["tech", "criatividade", "marketing"], acaoSugerida: "Cobertura de tendências do SXSW" },
  
  // ABRIL
  { id: "pascoa-2026", nome: "Páscoa", tipo: "oportunidade", mes: 4, dia: 20, descricao: "Momento de renovação e família", impacto: "medio", segmentos: ["lifestyle", "familia"], acaoSugerida: "Campanhas de renovação e recomeço" },
  { id: "dia-livro", nome: "Dia Mundial do Livro", tipo: "oportunidade", mes: 4, dia: 23, descricao: "Promoção de livros e educação", impacto: "medio", segmentos: ["educacao", "desenvolvimento"], acaoSugerida: "Lançamento de livros, promoções" },
  
  // MAIO
  { id: "dia-maes", nome: "Dia das Mães", tipo: "oportunidade", mes: 5, dia: 11, descricao: "Segunda maior data do varejo", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas emocionais, promoções" },
  { id: "google-io", nome: "Google I/O", tipo: "evento", mes: 5, dia: 14, descricao: "Conferência de desenvolvedores Google", impacto: "alto", segmentos: ["tech", "ia"], acaoSugerida: "Cobertura de novidades em IA" },
  
  // JUNHO
  { id: "dia-namorados-br", nome: "Dia dos Namorados", tipo: "oportunidade", mes: 6, dia: 12, descricao: "Data comercial importante no Brasil", impacto: "alto", segmentos: ["lifestyle", "moda"], acaoSugerida: "Campanhas românticas" },
  { id: "festa-junina", nome: "Festas Juninas", tipo: "oportunidade", mes: 6, dia: 24, descricao: "Tradição brasileira, conteúdo temático", impacto: "medio", segmentos: ["lifestyle"], acaoSugerida: "Conteúdo temático, engajamento" },
  { id: "wwdc", nome: "Apple WWDC", tipo: "evento", mes: 6, dia: 9, descricao: "Conferência de desenvolvedores Apple", impacto: "alto", segmentos: ["tech"], acaoSugerida: "Cobertura de novidades Apple" },
  
  // JULHO
  { id: "ferias-julho", nome: "Férias de Julho", tipo: "perigo", mes: 7, dia: 1, descricao: "Período de férias escolares, menor engajamento", impacto: "medio", segmentos: ["educacao"], acaoSugerida: "Conteúdo leve, preparação para agosto" },
  { id: "prime-day", nome: "Amazon Prime Day", tipo: "tendencia", mes: 7, dia: 15, descricao: "Tendências de promoções e e-commerce", impacto: "medio", segmentos: ["varejo", "tech"], acaoSugerida: "Observar estratégias de promoção" },
  
  // AGOSTO
  { id: "dia-pais", nome: "Dia dos Pais", tipo: "oportunidade", mes: 8, dia: 10, descricao: "Data comercial importante", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas para público masculino" },
  { id: "volta-aulas", nome: "Volta às Aulas", tipo: "oportunidade", mes: 8, dia: 1, descricao: "Retorno escolar, novos projetos", impacto: "alto", segmentos: ["educacao"], acaoSugerida: "Lançamentos de cursos" },
  
  // SETEMBRO
  { id: "independencia", nome: "Independência do Brasil", tipo: "oportunidade", mes: 9, dia: 7, descricao: "Feriado nacional, conteúdo patriótico", impacto: "baixo", segmentos: ["todos"], acaoSugerida: "Conteúdo institucional" },
  { id: "rd-summit", nome: "RD Summit", tipo: "evento", mes: 9, dia: 10, descricao: "Maior evento de marketing digital do Brasil", impacto: "alto", segmentos: ["marketing", "tech"], acaoSugerida: "Participação ou cobertura do evento" },
  { id: "apple-event", nome: "Apple Event (iPhone)", tipo: "evento", mes: 9, dia: 10, descricao: "Lançamento de novos iPhones", impacto: "alto", segmentos: ["tech"], acaoSugerida: "Cobertura de tendências" },
  
  // OUTUBRO
  { id: "dia-criancas", nome: "Dia das Crianças", tipo: "oportunidade", mes: 10, dia: 12, descricao: "Data comercial importante", impacto: "alto", segmentos: ["familia", "varejo"], acaoSugerida: "Campanhas para famílias" },
  { id: "halloween", nome: "Halloween", tipo: "tendencia", mes: 10, dia: 31, descricao: "Tendência crescente no Brasil", impacto: "baixo", segmentos: ["lifestyle", "entretenimento"], acaoSugerida: "Conteúdo temático criativo" },
  { id: "web-summit", nome: "Web Summit", tipo: "evento", mes: 10, dia: 4, descricao: "Maior conferência de tech da Europa", impacto: "alto", segmentos: ["tech", "startups"], acaoSugerida: "Cobertura de tendências globais" },
  
  // NOVEMBRO
  { id: "black-friday", nome: "Black Friday", tipo: "oportunidade", mes: 11, dia: 28, descricao: "Maior data promocional do ano", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas promocionais agressivas" },
  { id: "cyber-monday", nome: "Cyber Monday", tipo: "oportunidade", mes: 11, dia: 1, descricao: "Extensão da Black Friday para digital", impacto: "alto", segmentos: ["tech", "varejo"], acaoSugerida: "Promoções digitais" },
  { id: "fire-festival", nome: "FIRE Festival (Hotmart)", tipo: "evento", mes: 11, dia: 5, descricao: "Maior evento de infoprodutos do Brasil", impacto: "alto", segmentos: ["educacao", "marketing"], acaoSugerida: "Participação ou cobertura" },
  
  // DEZEMBRO
  { id: "natal", nome: "Natal", tipo: "oportunidade", mes: 12, dia: 25, descricao: "Maior data comercial do ano", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas emocionais, promoções" },
  { id: "retrospectiva", nome: "Retrospectiva do Ano", tipo: "oportunidade", mes: 12, dia: 20, descricao: "Momento de reflexão e planejamento", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Conteúdo de retrospectiva, preparação 2027" },
  { id: "reveillon", nome: "Réveillon", tipo: "oportunidade", mes: 12, dia: 31, descricao: "Virada do ano, metas e sonhos", impacto: "alto", segmentos: ["todos"], acaoSugerida: "Campanhas de virada, metas" },
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export function getInfluenciasPorCategoria(categoria: CategoriaInfluencia): Influencia[] {
  return [...influenciasDiretas, ...influenciasIndiretas].filter(i => i.categoria === categoria);
}

export function getInfluenciasPorPeso(pesoMinimo: PesoInfluencia): Influencia[] {
  return [...influenciasDiretas, ...influenciasIndiretas].filter(i => i.peso >= pesoMinimo);
}

export function getEventosPorMes(mes: number): EventoMercado[] {
  return eventosMercado.filter(e => e.mes === mes);
}

export function getOportunidadesPorMes(mes: number): EventoMercado[] {
  return eventosMercado.filter(e => e.mes === mes && (e.tipo === "oportunidade" || e.tipo === "evento"));
}

export function getPerigosPorMes(mes: number): EventoMercado[] {
  return eventosMercado.filter(e => e.mes === mes && e.tipo === "perigo");
}

export const todasInfluencias = [...influenciasDiretas, ...influenciasIndiretas];
export const totalInfluencias = todasInfluencias.length;
