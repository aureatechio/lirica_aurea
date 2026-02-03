// Biblioteca de Marketing Digital - Dados de Campanhas Icônicas e Livros Fundamentais

export interface CampanhaIconica {
  id: number;
  nome: string;
  infoprodutor: string;
  ano: number;
  pais: string;
  nicho: string;
  tipoLancamento: string;
  estrategia: string;
  resultados: string;
  bigIdea: string;
  copyPrincipal: string;
  gatilhosMentais: string[];
  elementosChave: string[];
  licoes: string;
  tags: string[];
  fontes?: { titulo: string; url: string; tipo: 'video' | 'artigo' | 'podcast' | 'curso' | 'livro' }[];
}

export interface LivroMkt {
  id: number;
  titulo: string;
  tituloOriginal?: string;
  autor: string;
  anoPublicacao: number;
  editora?: string;
  idioma: string;
  categoria: string;
  subcategoria?: string;
  sinopse: string;
  principaisConceitos: string[];
  citacoesChave: string[];
  aplicacaoPratica: string;
  nivelDificuldade: "iniciante" | "intermediario" | "avancado";
  rating: number;
  tags: string[];
}

// ==========================================
// CAMPANHAS ICÔNICAS - INFOPRODUTORES BRASILEIROS
// ==========================================

export const campanhasIconicas: CampanhaIconica[] = [
  // ERICO ROCHA
  {
    id: 1,
    nome: "Lançamento da Fórmula de Lançamento",
    infoprodutor: "Erico Rocha",
    ano: 2013,
    pais: "Brasil",
    nicho: "Marketing Digital / Infoprodutos",
    tipoLancamento: "PLF (Product Launch Formula)",
    estrategia: "Erico trouxe a metodologia de Jeff Walker para o Brasil, adaptando o PLF para o mercado brasileiro. Utilizou uma série de 4 vídeos de conteúdo gratuito (CPL - Conteúdo Pré-Lançamento) para educar o mercado sobre lançamentos digitais, criando autoridade antes de abrir o carrinho.",
    resultados: "Primeiro lançamento de 7 dígitos no Brasil em infoprodutos. Criou um novo mercado e formou milhares de lançadores.",
    bigIdea: "Você pode faturar 6 dígitos em 7 dias vendendo seu conhecimento online",
    copyPrincipal: "Descubra como fazer um lançamento de 6 dígitos em 7 dias, mesmo que você esteja começando do zero",
    gatilhosMentais: ["Prova Social", "Escassez", "Autoridade", "Reciprocidade", "Antecipação"],
    elementosChave: ["CPL em 4 vídeos", "Webinário de abertura", "Carrinho aberto por 7 dias", "Depoimentos de alunos", "Garantia incondicional"],
    licoes: "A educação do mercado através de conteúdo gratuito de alto valor cria desejo e autoridade simultaneamente. O PLF funciona porque entrega valor antes de pedir algo em troca.",
    tags: ["PLF", "Lançamento", "Infoproduto", "Pioneiro", "6 em 7"],
    fontes: [
      { titulo: "Canal YouTube Erico Rocha", url: "https://www.youtube.com/@EricoRocha", tipo: "video" },
      { titulo: "Fórmula de Lançamento - Site Oficial", url: "https://formuladelancamento.com.br", tipo: "curso" },
      { titulo: "Podcast 6 em 7", url: "https://open.spotify.com/show/6em7", tipo: "podcast" }
    ]
  },
  {
    id: 2,
    nome: "Ignição Digital",
    infoprodutor: "Erico Rocha",
    ano: 2014,
    pais: "Brasil",
    nicho: "Marketing Digital",
    tipoLancamento: "Lançamento Semente",
    estrategia: "Lançamento para iniciantes que queriam começar no digital mas não tinham produto. Erico criou um funil de entrada mais acessível, validando o conceito de 'lançamento semente' - começar pequeno para crescer.",
    resultados: "Milhares de novos empreendedores digitais formados. Criou a base para o ecossistema de infoprodutores brasileiro.",
    bigIdea: "Comece do zero e construa seu negócio digital passo a passo",
    copyPrincipal: "O método para criar seu primeiro produto digital e fazer suas primeiras vendas online",
    gatilhosMentais: ["Simplicidade", "Passo a passo", "Comunidade", "Prova Social"],
    elementosChave: ["Preço de entrada acessível", "Comunidade de alunos", "Suporte intensivo", "Cases de sucesso de alunos"],
    licoes: "Ter um produto de entrada facilita a jornada do cliente e cria um funil natural para produtos de maior ticket.",
    tags: ["Lançamento Semente", "Iniciantes", "Produto de Entrada", "Comunidade"],
    fontes: [
      { titulo: "Ignição Digital - Site Oficial", url: "https://ignicaodigital.com.br", tipo: "curso" },
      { titulo: "YouTube - Como fazer lançamento semente", url: "https://www.youtube.com/watch?v=exemplo", tipo: "video" }
    ]
  },
  {
    id: 3,
    nome: "Lançamento Perpétuo FL",
    infoprodutor: "Erico Rocha",
    ano: 2018,
    pais: "Brasil",
    nicho: "Marketing Digital",
    tipoLancamento: "Perpétuo Automatizado",
    estrategia: "Evolução do modelo de lançamento para um sistema perpétuo que vende todos os dias. Webinários gravados simulando ao vivo, com escassez real baseada em data de inscrição do lead.",
    resultados: "Faturamento contínuo sem depender de lançamentos pontuais. Modelo replicado por centenas de infoprodutores.",
    bigIdea: "Venda todos os dias no piloto automático",
    copyPrincipal: "O sistema que vende seu curso 24 horas por dia, 7 dias por semana",
    gatilhosMentais: ["Escassez Real", "Urgência", "Automação", "Prova Social Dinâmica"],
    elementosChave: ["Webinário evergreen", "Countdown personalizado", "Email marketing automatizado", "Retargeting"],
    licoes: "A escassez precisa ser real para funcionar a longo prazo. Sistemas perpétuos exigem otimização constante.",
    tags: ["Perpétuo", "Evergreen", "Automação", "Webinário"],
    fontes: [
      { titulo: "Webinário Perpétuo - Guia Completo", url: "https://formuladelancamento.com.br/perpetuo", tipo: "artigo" },
      { titulo: "YouTube - Lançamento Perpétuo Explicado", url: "https://www.youtube.com/@EricoRocha", tipo: "video" }
    ]
  },

  // LEANDRO LADEIRA
  {
    id: 4,
    nome: "Método VTSD",
    infoprodutor: "Leandro Ladeira",
    ano: 2019,
    pais: "Brasil",
    nicho: "Tráfego Pago / Performance",
    tipoLancamento: "High Ticket + Comunidade",
    estrategia: "Ladeira revolucionou o mercado de tráfego com seu método VTSD (Vídeo, Texto, Sequência, Distribuição). Focou em ensinar gestores de tráfego a criar anúncios impossíveis de serem ignorados através de storytelling e criatividade.",
    resultados: "Formou a maior comunidade de gestores de tráfego do Brasil. Seus alunos gerenciam milhões em mídia paga.",
    bigIdea: "Anúncios criativos vendem mais que anúncios técnicos",
    copyPrincipal: "Aprenda a criar anúncios que as pessoas QUEREM assistir",
    gatilhosMentais: ["Curiosidade", "Novidade", "Autoridade Técnica", "Resultados Comprovados"],
    elementosChave: ["Método proprietário", "Cases reais com números", "Comunidade ativa", "Atualizações constantes"],
    licoes: "No tráfego pago, a criatividade supera o orçamento. Um bom criativo pode reduzir o CPL em até 80%.",
    tags: ["Tráfego Pago", "Criativos", "VTSD", "Performance", "Storytelling"],
    fontes: [
      { titulo: "Canal YouTube Ladeira", url: "https://www.youtube.com/@LeandroLadeira", tipo: "video" },
      { titulo: "Instagram @ladaborges", url: "https://www.instagram.com/ladaborges", tipo: "artigo" },
      { titulo: "Comunidade VTSD", url: "https://vtsd.com.br", tipo: "curso" }
    ]
  },
  {
    id: 5,
    nome: "Lançamentos com Advertorial",
    infoprodutor: "Leandro Ladeira",
    ano: 2020,
    pais: "Brasil",
    nicho: "Marketing Digital",
    tipoLancamento: "Advertorial + VSL",
    estrategia: "Popularizou o uso de advertoriais (artigos que parecem notícias mas são anúncios) combinados com VSLs (Video Sales Letters) para vender produtos de ticket médio a alto.",
    resultados: "Modelo adotado por centenas de infoprodutores. Aumentou conversões em nichos de saúde e finanças.",
    bigIdea: "Venda através de conteúdo que não parece venda",
    copyPrincipal: "A descoberta que está mudando a vida de milhares de brasileiros",
    gatilhosMentais: ["Curiosidade", "Prova Social", "Autoridade Científica", "Novidade"],
    elementosChave: ["Advertorial nativo", "VSL de alta conversão", "Depoimentos em vídeo", "Garantia estendida"],
    licoes: "O formato do conteúdo influencia diretamente na percepção de credibilidade. Advertoriais funcionam porque quebram a resistência inicial.",
    tags: ["Advertorial", "VSL", "Native Ads", "Conversão"],
    fontes: [
      { titulo: "YouTube - Advertorial que Converte", url: "https://www.youtube.com/@LeandroLadeira", tipo: "video" },
      { titulo: "Artigo - Como criar VSL", url: "https://vtsd.com.br/blog/vsl", tipo: "artigo" }
    ]
  },

  // PABLO MARÇAL
  {
    id: 6,
    nome: "Lançamento Meteórico IP",
    infoprodutor: "Pablo Marçal",
    ano: 2021,
    pais: "Brasil",
    nicho: "Desenvolvimento Pessoal / Negócios",
    tipoLancamento: "Lançamento Relâmpago",
    estrategia: "Marçal criou um modelo de lançamento ultra-rápido, com lives intensas de 3-4 horas, conteúdo polêmico e provocativo, e abertura de carrinho por apenas 24-48 horas. Usou sua base massiva de seguidores para criar urgência real.",
    resultados: "Lançamentos de 8 dígitos em menos de 48 horas. Um dos maiores faturamentos do mercado brasileiro.",
    bigIdea: "Você está vivendo abaixo do seu potencial",
    copyPrincipal: "Chega de ser medíocre. É hora de destravar sua vida.",
    gatilhosMentais: ["Urgência Extrema", "Provocação", "FOMO", "Autoridade Carismática"],
    elementosChave: ["Lives longas e intensas", "Conteúdo polêmico", "Carrinho curto", "Preço agressivo", "Comunidade engajada"],
    licoes: "Polarização gera engajamento. Carrinho curto com base grande pode superar lançamentos tradicionais.",
    tags: ["Lançamento Relâmpago", "Lives", "Polêmico", "Alta Conversão", "FOMO"],
    fontes: [
      { titulo: "Canal YouTube Pablo Marçal", url: "https://www.youtube.com/@paborges", tipo: "video" },
      { titulo: "Instagram @paborges", url: "https://www.instagram.com/paborges", tipo: "artigo" },
      { titulo: "Podcast Marçal", url: "https://open.spotify.com/show/marcal", tipo: "podcast" }
    ]
  },
  {
    id: 7,
    nome: "Método Destruindo Metas",
    infoprodutor: "Pablo Marçal",
    ano: 2022,
    pais: "Brasil",
    nicho: "Produtividade / Mentalidade",
    tipoLancamento: "Desafio + Lançamento",
    estrategia: "Desafios gratuitos de 21 dias com tarefas diárias, criando hábito de consumo de conteúdo e comunidade. Ao final, oferta do programa completo com desconto para participantes do desafio.",
    resultados: "Centenas de milhares de participantes. Conversão acima da média por causa do engajamento prévio.",
    bigIdea: "Metas não são para serem alcançadas, são para serem destruídas",
    copyPrincipal: "21 dias para transformar completamente sua mentalidade e resultados",
    gatilhosMentais: ["Compromisso", "Consistência", "Comunidade", "Gamificação"],
    elementosChave: ["Desafio gratuito", "Tarefas diárias", "Grupo de WhatsApp", "Lives de acompanhamento", "Certificado"],
    licoes: "Desafios criam comprometimento e filtram leads qualificados. Quem completa o desafio tem alta propensão a comprar.",
    tags: ["Desafio", "21 Dias", "Gamificação", "Comunidade", "Engajamento"],
    fontes: [
      { titulo: "Desafio Destruindo Metas", url: "https://destruindometas.com.br", tipo: "curso" },
      { titulo: "YouTube - Metodologia do Desafio", url: "https://www.youtube.com/@paborges", tipo: "video" }
    ]
  },

  // ÍCARO DE CARVALHO
  {
    id: 8,
    nome: "O Novo Mercado",
    infoprodutor: "Ícaro de Carvalho",
    ano: 2017,
    pais: "Brasil",
    nicho: "Marketing / Copywriting",
    tipoLancamento: "Assinatura + Comunidade",
    estrategia: "Ícaro criou um modelo de assinatura mensal com conteúdo semanal sobre marketing, copy e negócios. Diferenciou-se pelo conteúdo denso e pela comunidade de alto nível.",
    resultados: "Uma das maiores comunidades pagas de marketing do Brasil. Milhares de assinantes recorrentes.",
    bigIdea: "Marketing é sobre entender pessoas, não sobre técnicas",
    copyPrincipal: "A comunidade que vai mudar sua forma de pensar marketing para sempre",
    gatilhosMentais: ["Exclusividade", "Comunidade", "Conteúdo Premium", "Networking"],
    elementosChave: ["Assinatura mensal", "Conteúdo semanal", "Comunidade fechada", "Eventos exclusivos"],
    licoes: "Recorrência é o modelo mais sustentável. Comunidade forte reduz churn e aumenta LTV.",
    tags: ["Assinatura", "Recorrência", "Comunidade", "Premium", "Networking"],
    fontes: [
      { titulo: "O Novo Mercado - Site Oficial", url: "https://onovomercado.com.br", tipo: "curso" },
      { titulo: "Canal YouTube Ícaro de Carvalho", url: "https://www.youtube.com/@IcarodeCarvalho", tipo: "video" },
      { titulo: "Podcast O Novo Mercado", url: "https://open.spotify.com/show/onovomercado", tipo: "podcast" }
    ]
  },
  {
    id: 9,
    nome: "Curso de Copywriting",
    infoprodutor: "Ícaro de Carvalho",
    ano: 2018,
    pais: "Brasil",
    nicho: "Copywriting",
    tipoLancamento: "PLF Clássico",
    estrategia: "Lançamento tradicional com CPL focado em ensinar os fundamentos do copywriting. Ícaro usou sua autoridade construída no YouTube e no Novo Mercado para converter.",
    resultados: "Um dos cursos de copywriting mais vendidos do Brasil. Formou geração de copywriters.",
    bigIdea: "Copywriting é a habilidade mais valiosa do século 21",
    copyPrincipal: "Aprenda a escrever textos que vendem milhões",
    gatilhosMentais: ["Autoridade", "Escassez", "Prova Social", "Transformação"],
    elementosChave: ["CPL educativo", "Depoimentos de alunos", "Bônus exclusivos", "Garantia"],
    licoes: "Autoridade construída ao longo do tempo converte melhor que qualquer técnica de lançamento.",
    tags: ["Copywriting", "PLF", "Autoridade", "Educação"],
    fontes: [
      { titulo: "Curso de Copywriting - Site", url: "https://onovomercado.com.br/copywriting", tipo: "curso" },
      { titulo: "YouTube - Aulas de Copy", url: "https://www.youtube.com/@IcarodeCarvalho", tipo: "video" }
    ]
  },

  // WENDELL CARVALHO
  {
    id: 10,
    nome: "Método Faixa Preta",
    infoprodutor: "Wendell Carvalho",
    ano: 2019,
    pais: "Brasil",
    nicho: "Desenvolvimento Pessoal / Inteligência Emocional",
    tipoLancamento: "Evento Presencial + Online",
    estrategia: "Wendell combinou eventos presenciais transformacionais com lançamentos online. O evento presencial gerava depoimentos emocionais que alimentavam as campanhas digitais.",
    resultados: "Milhares de alunos formados. Um dos maiores nomes em inteligência emocional no Brasil.",
    bigIdea: "Sua mente é seu maior ativo ou seu maior passivo",
    copyPrincipal: "Domine sua mente e conquiste resultados extraordinários",
    gatilhosMentais: ["Transformação", "Emoção", "Comunidade", "Autoridade"],
    elementosChave: ["Eventos presenciais", "Imersões", "Depoimentos emocionais", "Acompanhamento"],
    licoes: "Experiências presenciais criam conexão emocional impossível de replicar online. Híbrido é poderoso.",
    tags: ["Presencial", "Imersão", "Inteligência Emocional", "Transformação"],
    fontes: [
      { titulo: "Canal YouTube Wendell Carvalho", url: "https://www.youtube.com/@WendellCarvalho", tipo: "video" },
      { titulo: "Método Faixa Preta - Site", url: "https://wendellcarvalho.com.br", tipo: "curso" }
    ]
  },

  // ITALO MARSILI
  {
    id: 11,
    nome: "Lançamento Filosofia",
    infoprodutor: "Italo Marsili",
    ano: 2020,
    pais: "Brasil",
    nicho: "Filosofia / Desenvolvimento Pessoal",
    tipoLancamento: "Conteúdo Longo + PLF",
    estrategia: "Marsili diferenciou-se pelo conteúdo denso e filosófico, atraindo um público mais intelectualizado. Seus vídeos longos no YouTube construíram autoridade antes dos lançamentos.",
    resultados: "Criou um nicho próprio de 'filosofia aplicada'. Base fiel e engajada.",
    bigIdea: "A filosofia é a ferramenta mais prática que existe",
    copyPrincipal: "Aprenda a pensar com clareza e viver com propósito",
    gatilhosMentais: ["Autoridade Intelectual", "Profundidade", "Diferenciação", "Comunidade"],
    elementosChave: ["Conteúdo longo no YouTube", "Livros publicados", "Comunidade intelectual", "Eventos"],
    licoes: "Nichar profundamente cria defensores da marca. Conteúdo denso atrai público qualificado.",
    tags: ["Filosofia", "Conteúdo Longo", "Nicho", "Intelectual"]
  },

  // THIAGO FINCH
  {
    id: 12,
    nome: "Lançamento Gringo",
    infoprodutor: "Thiago Finch",
    ano: 2021,
    pais: "Brasil",
    nicho: "Marketing Internacional",
    tipoLancamento: "Estilo de Vida + Lançamento",
    estrategia: "Finch usou o lifestyle de nômade digital e resultados em dólar para atrair brasileiros querendo internacionalizar. Mostrava bastidores da vida em diferentes países.",
    resultados: "Milhares de alunos aprendendo a vender para o mercado americano.",
    bigIdea: "Ganhe em dólar trabalhando de qualquer lugar do mundo",
    copyPrincipal: "O método para faturar em dólar sem sair do Brasil",
    gatilhosMentais: ["Lifestyle", "Aspiração", "Prova de Resultados", "Liberdade"],
    elementosChave: ["Conteúdo de bastidores", "Resultados em dólar", "Comunidade internacional", "Mentorias"],
    licoes: "Lifestyle selling funciona quando é autêntico. Mostrar bastidores cria conexão e desejo.",
    tags: ["Internacional", "Dólar", "Lifestyle", "Nômade Digital"]
  },

  // JOEL JOTA
  {
    id: 13,
    nome: "Método de Alta Performance",
    infoprodutor: "Joel Jota",
    ano: 2020,
    pais: "Brasil",
    nicho: "Produtividade / Performance",
    tipoLancamento: "Podcast + Lançamento",
    estrategia: "Joel construiu audiência através de podcast com entrevistas de alta qualidade. Usou a credibilidade dos convidados para fortalecer sua própria autoridade.",
    resultados: "Um dos maiores podcasts de negócios do Brasil. Lançamentos de alto ticket.",
    bigIdea: "Alta performance é método, não talento",
    copyPrincipal: "Os segredos dos maiores empreendedores do Brasil",
    gatilhosMentais: ["Autoridade Emprestada", "Networking", "Conteúdo Premium", "Exclusividade"],
    elementosChave: ["Podcast de entrevistas", "Convidados de peso", "Conteúdo gratuito de alto valor", "Comunidade"],
    licoes: "Entrevistar pessoas de sucesso transfere autoridade. Podcast é excelente para construir audiência qualificada.",
    tags: ["Podcast", "Entrevistas", "Autoridade", "Networking"]
  },

  // FLÁVIO AUGUSTO
  {
    id: 14,
    nome: "Geração de Valor",
    infoprodutor: "Flávio Augusto",
    ano: 2015,
    pais: "Brasil",
    nicho: "Empreendedorismo / Negócios",
    tipoLancamento: "Livro + Comunidade",
    estrategia: "Flávio usou seu livro best-seller como porta de entrada para uma comunidade de empreendedores. O livro validava a metodologia que era aprofundada na comunidade paga.",
    resultados: "Livro mais vendido de negócios no Brasil. Comunidade com milhares de membros.",
    bigIdea: "Empreender é a única forma de gerar riqueza real",
    copyPrincipal: "Os princípios que me fizeram construir empresas bilionárias",
    gatilhosMentais: ["Autoridade", "Resultados Comprovados", "Metodologia", "Comunidade"],
    elementosChave: ["Livro best-seller", "Comunidade paga", "Eventos", "Mentoria"],
    licoes: "Livro é o melhor cartão de visitas. Autoridade de empresário real supera qualquer guru.",
    tags: ["Livro", "Comunidade", "Empreendedorismo", "Autoridade Real"]
  },

  // NATHALIA ARCURI
  {
    id: 15,
    nome: "Me Poupe!",
    infoprodutor: "Nathalia Arcuri",
    ano: 2016,
    pais: "Brasil",
    nicho: "Finanças Pessoais",
    tipoLancamento: "YouTube + Produtos",
    estrategia: "Nathalia construiu o maior canal de finanças do Brasil com linguagem acessível e divertida. Monetizou através de cursos, livros e parcerias.",
    resultados: "Maior canal de finanças do Brasil. Milhões de seguidores. Múltiplos produtos.",
    bigIdea: "Finanças pessoais não precisa ser chato",
    copyPrincipal: "Aprenda a cuidar do seu dinheiro de forma simples e divertida",
    gatilhosMentais: ["Acessibilidade", "Humor", "Identificação", "Simplicidade"],
    elementosChave: ["Conteúdo divertido", "Linguagem simples", "Consistência", "Múltiplos produtos"],
    licoes: "Simplificar temas complexos amplia o mercado. Consistência no YouTube constrói impérios.",
    tags: ["YouTube", "Finanças", "Acessibilidade", "Humor", "Consistência"]
  },

  // AMERICANOS - REFERÊNCIAS INTERNACIONAIS
  {
    id: 16,
    nome: "Product Launch Formula",
    infoprodutor: "Jeff Walker",
    ano: 2005,
    pais: "EUA",
    nicho: "Marketing Digital",
    tipoLancamento: "PLF Original",
    estrategia: "Jeff criou a metodologia original de lançamentos com sequência de vídeos de conteúdo (CPL), construção de lista, e abertura de carrinho com escassez real.",
    resultados: "Gerou mais de 1 bilhão de dólares em vendas para seus alunos. Metodologia mais replicada do mundo.",
    bigIdea: "Lançamentos são eventos, não apenas vendas",
    copyPrincipal: "The proven formula to launch any product or service online",
    gatilhosMentais: ["Antecipação", "Reciprocidade", "Escassez", "Prova Social", "Autoridade"],
    elementosChave: ["Sideways Sales Letter", "CPL em 3-4 vídeos", "Sequência de emails", "Carrinho limitado"],
    licoes: "A estrutura do PLF funciona porque respeita a psicologia humana. Dar antes de pedir.",
    tags: ["PLF", "Original", "Metodologia", "Lançamento", "Internacional"],
    fontes: [
      { titulo: "Product Launch Formula - Site Oficial", url: "https://productlaunchformula.com", tipo: "curso" },
      { titulo: "Livro Launch - Jeff Walker", url: "https://www.amazon.com/Launch-Jeff-Walker/dp/1630470171", tipo: "livro" },
      { titulo: "YouTube Jeff Walker", url: "https://www.youtube.com/@JeffWalkerPLF", tipo: "video" }
    ]
  },
  {
    id: 17,
    nome: "DotCom Secrets Launch",
    infoprodutor: "Russell Brunson",
    ano: 2015,
    pais: "EUA",
    nicho: "Funis de Venda",
    tipoLancamento: "Livro Gratuito + Funil",
    estrategia: "Russell popularizou o modelo de 'livro gratuito + frete' como isca para um funil de vendas. O livro era a porta de entrada para upsells e downsells automatizados.",
    resultados: "ClickFunnels se tornou empresa de 100 milhões. Modelo replicado globalmente.",
    bigIdea: "Você está a um funil de distância de ficar rico",
    copyPrincipal: "Get the underground playbook for growing your company online",
    gatilhosMentais: ["Reciprocidade", "Valor Percebido", "Curiosidade", "Urgência"],
    elementosChave: ["Livro gratuito", "Funil de upsell", "Order bump", "OTO (One Time Offer)"],
    licoes: "O produto de entrada pode ter margem zero se o funil for bem construído. LTV é o que importa.",
    tags: ["Funil", "Livro Gratuito", "Upsell", "ClickFunnels"],
    fontes: [
      { titulo: "DotCom Secrets - Livro", url: "https://www.amazon.com/DotCom-Secrets-Underground-Playbook-Growing/dp/1401960464", tipo: "livro" },
      { titulo: "ClickFunnels", url: "https://www.clickfunnels.com", tipo: "curso" },
      { titulo: "Marketing Secrets Podcast", url: "https://marketingsecrets.com", tipo: "podcast" }
    ]
  },
  {
    id: 18,
    nome: "Expert Secrets Launch",
    infoprodutor: "Russell Brunson",
    ano: 2017,
    pais: "EUA",
    nicho: "Personal Branding / Infoprodutos",
    tipoLancamento: "Webinário Perfect",
    estrategia: "Russell codificou o 'Perfect Webinar Script' - uma estrutura de webinário de vendas que maximiza conversões através de storytelling e quebra de objeções.",
    resultados: "Milhares de experts usando o script. Conversões de webinário aumentaram drasticamente.",
    bigIdea: "Você é um expert em algo que as pessoas pagariam para aprender",
    copyPrincipal: "Turn your knowledge into a mass movement",
    gatilhosMentais: ["Storytelling", "Identificação", "Transformação", "Urgência"],
    elementosChave: ["Perfect Webinar Script", "Stack Slide", "Quebra de objeções", "Bônus empilhados"],
    licoes: "Webinários convertem quando seguem uma estrutura testada. O stack slide é crucial.",
    tags: ["Webinário", "Script", "Expert", "Storytelling"],
    fontes: [
      { titulo: "Expert Secrets - Livro", url: "https://www.amazon.com/Expert-Secrets-Underground-Playbook-Creating/dp/1683504585", tipo: "livro" },
      { titulo: "Perfect Webinar Script", url: "https://www.clickfunnels.com/perfect-webinar", tipo: "artigo" }
    ]
  },
  {
    id: 19,
    nome: "Challenge Funnel",
    infoprodutor: "Pedro Adao",
    ano: 2019,
    pais: "EUA",
    nicho: "Marketing Digital",
    tipoLancamento: "Desafio de 5 Dias",
    estrategia: "Pedro popularizou o modelo de desafio de 5 dias como alternativa ao webinário. Participantes pagam um valor baixo, recebem conteúdo diário, e no final recebem a oferta principal.",
    resultados: "Modelo adotado por milhares de infoprodutores. Conversões superiores a webinários tradicionais.",
    bigIdea: "Desafios criam comprometimento que webinários não conseguem",
    copyPrincipal: "5 days to transform your [resultado]",
    gatilhosMentais: ["Compromisso", "Consistência", "Comunidade", "Gamificação", "Investimento"],
    elementosChave: ["5 dias de conteúdo", "Tarefas diárias", "Grupo privado", "Lives diárias", "Oferta no dia 5"],
    licoes: "Micro-compromisso financeiro aumenta engajamento. 5 dias é o tempo ideal para criar hábito.",
    tags: ["Desafio", "5 Dias", "Challenge Funnel", "Engajamento"],
    fontes: [
      { titulo: "Challenge Secrets - Pedro Adao", url: "https://www.pedroadao.com", tipo: "curso" },
      { titulo: "YouTube Pedro Adao", url: "https://www.youtube.com/@PedroAdao", tipo: "video" }
    ]
  },
  {
    id: 20,
    nome: "Tripwire Funnel",
    infoprodutor: "Ryan Deiss",
    ano: 2012,
    pais: "EUA",
    nicho: "Marketing Digital",
    tipoLancamento: "Tripwire + Ascensão",
    estrategia: "Ryan criou o conceito de 'tripwire' - um produto de baixo custo (geralmente $7-27) que converte leads em compradores, facilitando vendas futuras de maior ticket.",
    resultados: "DigitalMarketer se tornou referência em funis. Conceito adotado globalmente.",
    bigIdea: "Um comprador vale 10x mais que um lead",
    copyPrincipal: "The $7 offer that builds million dollar businesses",
    gatilhosMentais: ["Baixo Risco", "Reciprocidade", "Compromisso", "Valor Extremo"],
    elementosChave: ["Oferta irresistível de baixo ticket", "Entrega de valor real", "Upsell imediato", "Email nurturing"],
    licoes: "Converter lead em comprador é o passo mais importante. Depois disso, vender mais é fácil.",
    tags: ["Tripwire", "Low Ticket", "Conversão", "Funil de Ascensão"],
    fontes: [
      { titulo: "DigitalMarketer", url: "https://www.digitalmarketer.com", tipo: "curso" },
      { titulo: "Customer Value Journey", url: "https://www.digitalmarketer.com/blog/customer-value-journey", tipo: "artigo" }
    ]
  },

  // TONY ROBBINS
  {
    id: 21,
    nome: "Unleash the Power Within",
    infoprodutor: "Tony Robbins",
    ano: 1988,
    pais: "EUA",
    nicho: "Desenvolvimento Pessoal",
    tipoLancamento: "Evento + Upsell",
    estrategia: "Tony criou o modelo de evento transformacional de 4 dias com firewalking como âncora emocional. O evento de entrada leva a programas de alto ticket como Date with Destiny e Business Mastery.",
    resultados: "Milhões de participantes globalmente. Empresa avaliada em centenas de milhões. Modelo de evento mais replicado do mundo.",
    bigIdea: "Você pode mudar sua vida em um instante se mudar suas decisões",
    copyPrincipal: "Unleash the power within you and transform every area of your life in just 4 days",
    gatilhosMentais: ["Transformação", "Prova Social Massiva", "Experiência", "Ancoragem Emocional", "Comunidade"],
    elementosChave: ["Firewalking", "Imersão de 4 dias", "Música e energia", "Intervenções ao vivo", "Upsell para programas premium"],
    licoes: "Experiências transformacionais vendem mais que informação. Eventos criam comunidade e lealdade incomparáveis.",
    tags: ["Evento", "Transformação", "High Ticket", "Experiência", "Desenvolvimento Pessoal"],
    fontes: [
      { titulo: "Tony Robbins - Site Oficial", url: "https://www.tonyrobbins.com", tipo: "curso" },
      { titulo: "UPW - Unleash the Power Within", url: "https://www.tonyrobbins.com/events/unleash-the-power-within", tipo: "curso" },
      { titulo: "YouTube Tony Robbins", url: "https://www.youtube.com/@TonyRobbinsLive", tipo: "video" }
    ]
  },
  {
    id: 22,
    nome: "Personal Power",
    infoprodutor: "Tony Robbins",
    ano: 1989,
    pais: "EUA",
    nicho: "Desenvolvimento Pessoal",
    tipoLancamento: "Infomercial + Produto Físico",
    estrategia: "Tony revolucionou o mercado de desenvolvimento pessoal com infomerciais de 30 minutos vendendo programas de áudio. Democratizou o acesso ao seu conteúdo.",
    resultados: "Mais de 50 milhões de cópias vendidas. Criou a indústria moderna de infoprodutos.",
    bigIdea: "30 dias para transformar sua vida",
    copyPrincipal: "The 30-day program that will transform your life forever",
    gatilhosMentais: ["Demonstração", "Depoimentos", "Garantia", "Parcelamento", "Urgência"],
    elementosChave: ["Infomercial de 30 min", "Programa de 30 dias", "CDs/Cassetes", "Workbook", "Garantia de 30 dias"],
    licoes: "Infomerciais funcionam porque dão tempo para construir valor. Produtos físicos têm valor percebido maior.",
    tags: ["Infomercial", "Produto Físico", "TV", "Programa de 30 dias", "Pioneiro"],
    fontes: [
      { titulo: "Personal Power II", url: "https://www.tonyrobbins.com/products/personal-power", tipo: "curso" },
      { titulo: "Documentário Tony Robbins", url: "https://www.netflix.com/title/80102204", tipo: "video" }
    ]
  },

  // GRANT CARDONE
  {
    id: 23,
    nome: "10X Growth Conference",
    infoprodutor: "Grant Cardone",
    ano: 2017,
    pais: "EUA",
    nicho: "Vendas / Negócios",
    tipoLancamento: "Evento + Ecossistema",
    estrategia: "Grant criou o maior evento de empreendedorismo do mundo com 35.000+ participantes. Usa o evento como topo de funil para seu ecossistema de produtos: Cardone University, real estate, coaching.",
    resultados: "Maior evento de negócios do mundo. Ecossistema de centenas de milhões em receita.",
    bigIdea: "10X é a única forma de garantir que você atinja seus objetivos",
    copyPrincipal: "The world's largest business conference - 10X your business, income and life",
    gatilhosMentais: ["Grandiosidade", "FOMO", "Celebridades", "Networking", "Status"],
    elementosChave: ["35.000+ participantes", "Palestrantes celebridades", "3 dias de imersão", "Expo de patrocinadores", "Ofertas exclusivas"],
    licoes: "Escala cria percepção de valor. Eventos grandes atraem mídia e patrocinadores que pagam o evento.",
    tags: ["Evento Massivo", "10X", "Networking", "Ecossistema", "Grandiosidade"],
    fontes: [
      { titulo: "10X Growth Conference", url: "https://10xgrowthcon.com", tipo: "curso" },
      { titulo: "YouTube Grant Cardone", url: "https://www.youtube.com/@GrantCardone", tipo: "video" },
      { titulo: "Livro 10X Rule", url: "https://www.amazon.com/10X-Rule-Difference-Between-Success/dp/0470627603", tipo: "livro" }
    ]
  },
  {
    id: 24,
    nome: "Cardone University",
    infoprodutor: "Grant Cardone",
    ano: 2014,
    pais: "EUA",
    nicho: "Vendas",
    tipoLancamento: "Assinatura + Certificação",
    estrategia: "Grant criou uma universidade online de vendas com modelo de assinatura. Empresas pagam para treinar equipes inteiras, gerando receita recorrente massiva.",
    resultados: "Milhares de empresas assinantes. Receita recorrente de dezenas de milhões por ano.",
    bigIdea: "Vendas é a habilidade mais importante do mundo",
    copyPrincipal: "The #1 sales training platform in the world - train your entire team",
    gatilhosMentais: ["B2B", "ROI Mensurável", "Certificação", "Gamificação", "Competição"],
    elementosChave: ["Plataforma de cursos", "Certificação", "Tracking de progresso", "Licença por usuário", "Suporte empresarial"],
    licoes: "B2B tem ticket médio muito maior. Assinatura empresarial escala melhor que individual.",
    tags: ["B2B", "Assinatura", "Treinamento Corporativo", "Vendas", "Certificação"],
    fontes: [
      { titulo: "Cardone University", url: "https://www.cardoneuniversity.com", tipo: "curso" },
      { titulo: "Cardone Training Technologies", url: "https://www.grantcardone.com", tipo: "curso" }
    ]
  },
  {
    id: 25,
    nome: "Redes Sociais Agressivas",
    infoprodutor: "Grant Cardone",
    ano: 2015,
    pais: "EUA",
    nicho: "Marketing / Vendas",
    tipoLancamento: "Conteúdo Orgânico + Omnipresença",
    estrategia: "Grant posta 50-100 vezes por dia em todas as plataformas. Usa polêmica e personalidade forte para gerar engajamento. Transforma haters em alcance gratuito.",
    resultados: "Milhões de seguidores em todas as plataformas. Alcance orgânico massivo sem pagar ads.",
    bigIdea: "Obscuridade é o maior problema, não a crítica",
    copyPrincipal: "Get attention or get forgotten",
    gatilhosMentais: ["Polêmica", "Consistência Extrema", "Personalidade", "Omnipresença", "Autenticidade"],
    elementosChave: ["50-100 posts/dia", "Todas as plataformas", "Conteúdo polarizador", "Responde comentários", "Lives frequentes"],
    licoes: "Volume supera perfeição. Polêmica gera alcance. Consistência extrema vence algoritmos.",
    tags: ["Redes Sociais", "Omnipresença", "Volume", "Polêmica", "Orgânico"],
    fontes: [
      { titulo: "Instagram @grantcardone", url: "https://www.instagram.com/grantcardone", tipo: "artigo" },
      { titulo: "YouTube Grant Cardone", url: "https://www.youtube.com/@GrantCardone", tipo: "video" },
      { titulo: "Podcast Power Players", url: "https://open.spotify.com/show/powerplayers", tipo: "podcast" }
    ]
  },

  // ALEX HORMOZI
  {
    id: 26,
    nome: "$100M Offers",
    infoprodutor: "Alex Hormozi",
    ano: 2021,
    pais: "EUA",
    nicho: "Negócios / Ofertas",
    tipoLancamento: "Livro + Conteúdo Gratuito",
    estrategia: "Alex lançou um livro a preço de custo ($0.99 Kindle) com todo seu conhecimento sobre criação de ofertas. Usa o livro como topo de funil para Acquisition.com, seu fundo de investimento.",
    resultados: "Best-seller instantâneo. Milhões de cópias. Posicionamento como autoridade máxima em ofertas.",
    bigIdea: "Crie ofertas tão boas que as pessoas se sintam estúpidas em dizer não",
    copyPrincipal: "How to make offers so good people feel stupid saying no",
    gatilhosMentais: ["Valor Extremo", "Transparência", "Frameworks", "Resultados Reais", "Generosidade"],
    elementosChave: ["Livro a preço de custo", "Frameworks práticos", "Exemplos reais", "Sem pitch no livro", "Conteúdo YouTube gratuito"],
    licoes: "Dar seu melhor conteúdo grátis constrói autoridade incomparável. O livro é o novo cartão de visitas.",
    tags: ["Livro", "Ofertas", "Grand Slam Offer", "Value Equation", "Generosidade"],
    fontes: [
      { titulo: "$100M Offers - Livro", url: "https://www.amazon.com/100M-Offers-People-Stupid-Saying/dp/1737475731", tipo: "livro" },
      { titulo: "YouTube Alex Hormozi", url: "https://www.youtube.com/@AlexHormozi", tipo: "video" },
      { titulo: "Acquisition.com", url: "https://www.acquisition.com", tipo: "artigo" }
    ]
  },
  {
    id: 27,
    nome: "Gym Launch",
    infoprodutor: "Alex Hormozi",
    ano: 2017,
    pais: "EUA",
    nicho: "Fitness / Negócios Locais",
    tipoLancamento: "Licenciamento + Revenue Share",
    estrategia: "Alex criou um modelo onde academias pagam uma taxa + porcentagem da receita para usar seu sistema de aquisição de clientes. Escalou para 4.000+ academias.",
    resultados: "$120M em receita. Vendido para private equity. Modelo replicável para qualquer nicho local.",
    bigIdea: "Negócios locais podem escalar com sistemas replicáveis",
    copyPrincipal: "The system that adds 30+ new members to your gym every month",
    gatilhosMentais: ["ROI Garantido", "Sistema Pronto", "Suporte", "Comunidade de Donos", "Resultados Rápidos"],
    elementosChave: ["Sistema de ads", "Scripts de vendas", "Treinamento de equipe", "Suporte semanal", "Revenue share"],
    licoes: "Licenciamento escala melhor que consultoria. Revenue share alinha incentivos.",
    tags: ["Licenciamento", "Negócio Local", "Sistema", "Revenue Share", "Academia"],
    fontes: [
      { titulo: "Gym Launch Secrets - Livro", url: "https://www.amazon.com/Gym-Launch-Secrets-Alex-Hormozi/dp/B08FKWD3G3", tipo: "livro" },
      { titulo: "YouTube - Gym Launch Case Studies", url: "https://www.youtube.com/@AlexHormozi", tipo: "video" }
    ]
  },
  {
    id: 28,
    nome: "Acquisition.com Content Strategy",
    infoprodutor: "Alex Hormozi",
    ano: 2022,
    pais: "EUA",
    nicho: "Marketing de Conteúdo",
    tipoLancamento: "Conteúdo Educacional Massivo",
    estrategia: "Alex posta conteúdo educacional de altíssima qualidade diariamente no YouTube, Instagram, TikTok e LinkedIn. Não vende nada diretamente - usa para atrair deals para seu fundo.",
    resultados: "Milhões de seguidores em 18 meses. Deal flow de centenas de empresas querendo investimento.",
    bigIdea: "Dê tanto valor que as pessoas queiram trabalhar com você",
    copyPrincipal: "Free game that would cost $100k from a consultant",
    gatilhosMentais: ["Valor Extremo", "Transparência Total", "Sem Pitch", "Educação", "Autoridade"],
    elementosChave: ["Conteúdo diário", "Produção profissional", "Frameworks únicos", "Storytelling pessoal", "Zero venda direta"],
    licoes: "Conteúdo de valor extremo atrai oportunidades melhores que qualquer funil de vendas.",
    tags: ["Conteúdo", "YouTube", "Autoridade", "Sem Pitch", "Deal Flow"],
    fontes: [
      { titulo: "YouTube Alex Hormozi", url: "https://www.youtube.com/@AlexHormozi", tipo: "video" },
      { titulo: "$100M Leads - Livro", url: "https://www.amazon.com/100M-Leads-Strangers-Want-Stuff/dp/1737475774", tipo: "livro" },
      { titulo: "Podcast The Game", url: "https://open.spotify.com/show/thegame", tipo: "podcast" }
    ]
  },

  // OUTROS INTERNACIONAIS
  {
    id: 29,
    nome: "MasterClass",
    infoprodutor: "David Rogier",
    ano: 2015,
    pais: "EUA",
    nicho: "Educação / Entretenimento",
    tipoLancamento: "Assinatura + Celebridades",
    estrategia: "MasterClass contrata celebridades de classe mundial (Gordon Ramsay, Serena Williams, etc.) para criar cursos cinematográficos. Vende assinatura anual com acesso a todos os cursos.",
    resultados: "Avaliação de $2.75 bilhões. Milhões de assinantes. Redefiniu o mercado de cursos online.",
    bigIdea: "Aprenda com os melhores do mundo",
    copyPrincipal: "Learn from the world's best",
    gatilhosMentais: ["Celebridade", "Aspiração", "Produção Premium", "Acesso Exclusivo", "Status"],
    elementosChave: ["Produção cinematográfica", "Celebridades A-list", "Assinatura anual", "Workbooks", "App premium"],
    licoes: "Produção premium justifica preço premium. Celebridades são o melhor marketing.",
    tags: ["Assinatura", "Celebridades", "Premium", "Produção", "Educação"],
    fontes: [
      { titulo: "MasterClass", url: "https://www.masterclass.com", tipo: "curso" },
      { titulo: "YouTube MasterClass", url: "https://www.youtube.com/@masterclass", tipo: "video" }
    ]
  },
  {
    id: 30,
    nome: "The Futur",
    infoprodutor: "Chris Do",
    ano: 2016,
    pais: "EUA",
    nicho: "Design / Negócios Criativos",
    tipoLancamento: "YouTube + Cursos Premium",
    estrategia: "Chris Do construiu audiência no YouTube ensinando design e negócios para criativos. Monetiza com cursos de alto ticket ($2k-10k) para designers que querem cobrar mais.",
    resultados: "2M+ inscritos no YouTube. Cursos de alto ticket com alta conversão. Referência para criativos.",
    bigIdea: "Designers podem e devem cobrar mais",
    copyPrincipal: "Learn to charge what you're worth",
    gatilhosMentais: ["Identificação", "Aspiração", "Educação", "Comunidade", "Transformação"],
    elementosChave: ["Conteúdo YouTube gratuito", "Roleplay de vendas", "Cursos de alto ticket", "Comunidade Pro", "Eventos"],
    licoes: "Nicho específico permite preços premium. Roleplay é conteúdo que viraliza.",
    tags: ["YouTube", "Design", "High Ticket", "Criativos", "Precificação"],
    fontes: [
      { titulo: "YouTube The Futur", url: "https://www.youtube.com/@thefutur", tipo: "video" },
      { titulo: "The Futur Pro", url: "https://thefutur.com", tipo: "curso" }
    ]
  }
];

// ==========================================
// LIVROS FUNDAMENTAIS DE MARKETING DIGITAL
// ==========================================

export const livrosMkt: LivroMkt[] = [
  // COPYWRITING CLÁSSICO
  {
    id: 1,
    titulo: "O Boron Letters",
    tituloOriginal: "The Boron Letters",
    autor: "Gary Halbert",
    anoPublicacao: 1984,
    idioma: "Português",
    categoria: "Copywriting",
    subcategoria: "Clássico",
    sinopse: "Cartas escritas por Gary Halbert para seu filho Bond enquanto estava preso, ensinando os fundamentos do copywriting e marketing direto. Considerado a bíblia do copywriting.",
    principaisConceitos: ["A-pile vs B-pile", "Starving crowd", "Headline é 80% do sucesso", "Pesquisa antes de escrever", "Swipe files"],
    citacoesChave: ["A melhor coisa que você pode ter é uma multidão faminta", "Ninguém lê anúncios. As pessoas leem o que lhes interessa", "Escreva como você fala"],
    aplicacaoPratica: "Use para criar headlines magnéticas, entender a psicologia do consumidor e estruturar cartas de vendas que convertem.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Copywriting", "Clássico", "Cartas de Vendas", "Headlines", "Marketing Direto"]
  },
  {
    id: 2,
    titulo: "Breakthrough Advertising",
    tituloOriginal: "Breakthrough Advertising",
    autor: "Eugene Schwartz",
    anoPublicacao: 1966,
    idioma: "Inglês",
    categoria: "Copywriting",
    subcategoria: "Avançado",
    sinopse: "Considerado o livro mais importante de copywriting já escrito. Schwartz apresenta os 5 níveis de consciência do mercado e como adaptar sua copy para cada um.",
    principaisConceitos: ["5 níveis de consciência", "Intensificação do desejo", "Canalização de desejo", "Sophistication do mercado", "Mecanismo único"],
    citacoesChave: ["Copy não cria desejo, apenas canaliza", "O trabalho do copywriter é intensificar desejos existentes", "Cada mercado tem um nível de sofisticação"],
    aplicacaoPratica: "Essencial para entender em qual estágio seu mercado está e como posicionar sua oferta de acordo.",
    nivelDificuldade: "avancado",
    rating: 5,
    tags: ["Copywriting", "Consciência", "Avançado", "Posicionamento", "Clássico"]
  },
  {
    id: 3,
    titulo: "O Copywriter de Um Milhão de Dólares",
    tituloOriginal: "The Adweek Copywriting Handbook",
    autor: "Joseph Sugarman",
    anoPublicacao: 2006,
    idioma: "Português",
    categoria: "Copywriting",
    subcategoria: "Prático",
    sinopse: "Sugarman compartilha suas técnicas de copywriting que geraram milhões em vendas. Foco em criar conexão emocional e usar gatilhos psicológicos.",
    principaisConceitos: ["Slippery slide", "Seeds of curiosity", "Psychological triggers", "Storytelling em copy", "Simplicidade"],
    citacoesChave: ["Cada elemento da copy deve fazer o leitor ler a próxima frase", "Venda o conceito, não o produto", "Simplicidade é a sofisticação suprema"],
    aplicacaoPratica: "Perfeito para aprender a criar copy que flui naturalmente e mantém o leitor engajado até o CTA.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Copywriting", "Gatilhos", "Storytelling", "Prático"]
  },
  {
    id: 4,
    titulo: "Great Leads",
    tituloOriginal: "Great Leads",
    autor: "Michael Masterson e John Forde",
    anoPublicacao: 2011,
    idioma: "Inglês",
    categoria: "Copywriting",
    subcategoria: "Headlines",
    sinopse: "Guia definitivo sobre como criar aberturas (leads) poderosas para cartas de vendas. Apresenta 6 tipos de leads e quando usar cada um.",
    principaisConceitos: ["6 tipos de leads", "Offer lead", "Promise lead", "Problem-solution lead", "Big idea lead", "Story lead", "Secret lead"],
    citacoesChave: ["O lead é a parte mais importante da sua copy", "Escolha o lead baseado no nível de consciência do mercado"],
    aplicacaoPratica: "Use para criar aberturas que capturam atenção imediatamente e preparam o terreno para a venda.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Copywriting", "Headlines", "Leads", "Estrutura"]
  },
  {
    id: 5,
    titulo: "Cashvertising",
    tituloOriginal: "Ca$hvertising",
    autor: "Drew Eric Whitman",
    anoPublicacao: 2008,
    idioma: "Português",
    categoria: "Copywriting",
    subcategoria: "Psicologia",
    sinopse: "100+ técnicas de publicidade baseadas em psicologia do consumidor. Whitman explica a ciência por trás de anúncios que vendem.",
    principaisConceitos: ["Life Force 8", "Secondary wants", "Fear appeals", "Social proof", "Scarcity", "Authority"],
    citacoesChave: ["As pessoas compram por razões emocionais e justificam com lógica", "Os 8 desejos básicos são universais"],
    aplicacaoPratica: "Referência rápida para aplicar gatilhos psicológicos comprovados em qualquer peça de copy.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Copywriting", "Psicologia", "Gatilhos", "Publicidade"]
  },

  // PERSUASÃO E INFLUÊNCIA
  {
    id: 6,
    titulo: "As Armas da Persuasão 2.0",
    tituloOriginal: "Influence: The Psychology of Persuasion",
    autor: "Robert Cialdini",
    anoPublicacao: 1984,
    idioma: "Português",
    categoria: "Persuasão",
    subcategoria: "Psicologia Social",
    sinopse: "O livro definitivo sobre os 6 (agora 7) princípios da persuasão. Cialdini explica como somos influenciados e como usar isso eticamente.",
    principaisConceitos: ["Reciprocidade", "Compromisso e Coerência", "Prova Social", "Autoridade", "Afeição", "Escassez", "Unidade"],
    citacoesChave: ["Devemos sempre tentar retribuir favores", "Queremos ser consistentes com nossos compromissos anteriores", "Seguimos o que os outros fazem"],
    aplicacaoPratica: "Base obrigatória para qualquer profissional de marketing. Use os princípios em toda comunicação.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Persuasão", "Psicologia", "Influência", "Clássico", "Obrigatório"]
  },
  {
    id: 7,
    titulo: "Pré-Suasão",
    tituloOriginal: "Pre-Suasion",
    autor: "Robert Cialdini",
    anoPublicacao: 2016,
    idioma: "Português",
    categoria: "Persuasão",
    subcategoria: "Psicologia",
    sinopse: "Sequência de 'As Armas da Persuasão'. Cialdini explica como preparar o terreno ANTES de fazer o pedido para aumentar aceitação.",
    principaisConceitos: ["Momento privilegiado", "Atenção direcionada", "Associações", "Priming", "Unidade"],
    citacoesChave: ["O que está focal é causal", "A melhor persuasão acontece antes da mensagem principal"],
    aplicacaoPratica: "Use para estruturar a jornada do cliente, preparando-o mentalmente antes da oferta.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Persuasão", "Priming", "Psicologia", "Preparação"]
  },
  {
    id: 8,
    titulo: "O Poder do Hábito",
    tituloOriginal: "The Power of Habit",
    autor: "Charles Duhigg",
    anoPublicacao: 2012,
    idioma: "Português",
    categoria: "Comportamento",
    subcategoria: "Hábitos",
    sinopse: "Como hábitos funcionam e como mudá-los. Essencial para entender comportamento do consumidor e criar produtos que geram hábito.",
    principaisConceitos: ["Loop do hábito", "Deixa-rotina-recompensa", "Hábitos angulares", "Craving", "Mudança de hábitos"],
    citacoesChave: ["Hábitos são loops de 3 partes", "Você não pode eliminar um hábito, apenas substituí-lo"],
    aplicacaoPratica: "Use para criar produtos e campanhas que se tornam hábito na vida do cliente.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Comportamento", "Hábitos", "Psicologia", "Produto"]
  },
  {
    id: 9,
    titulo: "Hooked: Como Criar Produtos Viciantes",
    tituloOriginal: "Hooked: How to Build Habit-Forming Products",
    autor: "Nir Eyal",
    anoPublicacao: 2014,
    idioma: "Português",
    categoria: "Produto",
    subcategoria: "Engajamento",
    sinopse: "Framework para criar produtos que geram hábito. O modelo Hook de 4 fases para engajamento contínuo.",
    principaisConceitos: ["Modelo Hook", "Trigger", "Action", "Variable reward", "Investment", "Habit zone"],
    citacoesChave: ["Produtos que formam hábito criam associações internas", "Recompensas variáveis são mais poderosas que fixas"],
    aplicacaoPratica: "Essencial para criar produtos digitais, apps e comunidades que retêm usuários.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Produto", "Engajamento", "Hábito", "UX", "Retenção"]
  },

  // VENDAS E NEGOCIAÇÃO
  {
    id: 10,
    titulo: "SPIN Selling",
    tituloOriginal: "SPIN Selling",
    autor: "Neil Rackham",
    anoPublicacao: 1988,
    idioma: "Português",
    categoria: "Vendas",
    subcategoria: "B2B",
    sinopse: "Metodologia de vendas baseada em pesquisa com 35.000 calls de vendas. O método SPIN para vendas complexas.",
    principaisConceitos: ["Situation questions", "Problem questions", "Implication questions", "Need-payoff questions"],
    citacoesChave: ["Em vendas grandes, as técnicas tradicionais não funcionam", "Perguntas são mais poderosas que afirmações"],
    aplicacaoPratica: "Use para vendas de alto ticket, B2B e qualquer venda que exija múltiplas interações.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Vendas", "B2B", "High Ticket", "Metodologia", "Perguntas"]
  },
  {
    id: 11,
    titulo: "Os Segredos da Mente Milionária",
    tituloOriginal: "Secrets of the Millionaire Mind",
    autor: "T. Harv Eker",
    anoPublicacao: 2005,
    idioma: "Português",
    categoria: "Mentalidade",
    subcategoria: "Dinheiro",
    sinopse: "Como sua programação mental sobre dinheiro determina seus resultados financeiros. 17 arquivos de riqueza.",
    principaisConceitos: ["Blueprint financeiro", "17 arquivos de riqueza", "Termostato financeiro", "Pensamentos-sentimentos-ações"],
    citacoesChave: ["Seus rendimentos só podem crescer na mesma medida que você", "Rico pensa grande, pobre pensa pequeno"],
    aplicacaoPratica: "Use para entender objeções de preço e como comunicar valor para diferentes mentalidades.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Mentalidade", "Dinheiro", "Objeções", "Valor"]
  },
  {
    id: 12,
    titulo: "Como Fazer Amigos e Influenciar Pessoas",
    tituloOriginal: "How to Win Friends and Influence People",
    autor: "Dale Carnegie",
    anoPublicacao: 1936,
    idioma: "Português",
    categoria: "Relacionamento",
    subcategoria: "Clássico",
    sinopse: "O livro mais vendido de todos os tempos sobre relações humanas. Princípios atemporais de comunicação e influência.",
    principaisConceitos: ["Não critique", "Elogie sinceramente", "Desperte desejo ardente", "Interesse genuíno", "Sorria", "Lembre o nome"],
    citacoesChave: ["Você pode fazer mais amigos em 2 meses interessando-se pelos outros do que em 2 anos tentando fazer os outros se interessarem por você"],
    aplicacaoPratica: "Base para qualquer comunicação de vendas, networking e construção de relacionamentos.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Relacionamento", "Comunicação", "Clássico", "Networking"]
  },

  // ESTRATÉGIA E POSICIONAMENTO
  {
    id: 13,
    titulo: "Posicionamento: A Batalha por sua Mente",
    tituloOriginal: "Positioning: The Battle for Your Mind",
    autor: "Al Ries e Jack Trout",
    anoPublicacao: 1981,
    idioma: "Português",
    categoria: "Estratégia",
    subcategoria: "Posicionamento",
    sinopse: "O livro que criou o conceito de posicionamento em marketing. Como ocupar um espaço único na mente do consumidor.",
    principaisConceitos: ["Posicionamento mental", "Ser o primeiro", "Criar categoria", "Escada mental", "Reposicionamento"],
    citacoesChave: ["Marketing é uma batalha de percepções, não de produtos", "É melhor ser o primeiro do que ser o melhor"],
    aplicacaoPratica: "Essencial para definir posicionamento de marca, produto ou personal branding.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Posicionamento", "Estratégia", "Branding", "Diferenciação"]
  },
  {
    id: 14,
    titulo: "A Estratégia do Oceano Azul",
    tituloOriginal: "Blue Ocean Strategy",
    autor: "W. Chan Kim e Renée Mauborgne",
    anoPublicacao: 2005,
    idioma: "Português",
    categoria: "Estratégia",
    subcategoria: "Inovação",
    sinopse: "Como criar mercados inexplorados (oceanos azuis) em vez de competir em mercados saturados (oceanos vermelhos).",
    principaisConceitos: ["Oceano azul vs vermelho", "Inovação de valor", "Canvas estratégico", "4 ações", "Não-clientes"],
    citacoesChave: ["A única forma de vencer a competição é parar de tentar vencer a competição"],
    aplicacaoPratica: "Use para encontrar oportunidades de mercado e criar ofertas diferenciadas.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Estratégia", "Inovação", "Diferenciação", "Mercado"]
  },
  {
    id: 15,
    titulo: "Se o Marketing Fosse um Jogo",
    tituloOriginal: "This is Marketing",
    autor: "Seth Godin",
    anoPublicacao: 2018,
    idioma: "Português",
    categoria: "Marketing",
    subcategoria: "Filosofia",
    sinopse: "Seth Godin apresenta sua visão de marketing como serviço ao cliente, não manipulação. Marketing que faz diferença.",
    principaisConceitos: ["Menor mercado viável", "Pessoas como nós fazem coisas assim", "Tensão e status", "Permissão", "Tribos"],
    citacoesChave: ["Marketing é a arte de fazer mudança acontecer", "Não encontre clientes para seus produtos, encontre produtos para seus clientes"],
    aplicacaoPratica: "Mude sua mentalidade de marketing de interrupção para marketing de permissão e valor.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Marketing", "Filosofia", "Permissão", "Tribos"]
  },

  // STORYTELLING E CONTEÚDO
  {
    id: 16,
    titulo: "Se a História Fosse Contada por um Marqueteiro",
    tituloOriginal: "Building a StoryBrand",
    autor: "Donald Miller",
    anoPublicacao: 2017,
    idioma: "Português",
    categoria: "Storytelling",
    subcategoria: "Framework",
    sinopse: "Framework SB7 para criar mensagens claras usando princípios de storytelling. O cliente é o herói, você é o guia.",
    principaisConceitos: ["SB7 Framework", "Cliente como herói", "Marca como guia", "Problema externo/interno/filosófico", "Plano", "CTA"],
    citacoesChave: ["Se você confunde, você perde", "As pessoas não compram os melhores produtos, compram os que entendem mais rápido"],
    aplicacaoPratica: "Use o framework para criar páginas de vendas, apresentações e qualquer comunicação de marca.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Storytelling", "Framework", "Clareza", "Mensagem"]
  },
  {
    id: 17,
    titulo: "Made to Stick",
    tituloOriginal: "Made to Stick",
    autor: "Chip Heath e Dan Heath",
    anoPublicacao: 2007,
    idioma: "Português",
    categoria: "Comunicação",
    subcategoria: "Memorabilidade",
    sinopse: "Por que algumas ideias pegam e outras não. O framework SUCCES para criar mensagens memoráveis.",
    principaisConceitos: ["Simple", "Unexpected", "Concrete", "Credible", "Emotional", "Stories"],
    citacoesChave: ["A maldição do conhecimento é o maior obstáculo para comunicação clara"],
    aplicacaoPratica: "Use SUCCES para criar headlines, slogans e qualquer mensagem que precisa ser lembrada.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Comunicação", "Memorabilidade", "Framework", "Ideias"]
  },
  {
    id: 18,
    titulo: "Contagioso",
    tituloOriginal: "Contagious: Why Things Catch On",
    autor: "Jonah Berger",
    anoPublicacao: 2013,
    idioma: "Português",
    categoria: "Viralização",
    subcategoria: "Word of Mouth",
    sinopse: "A ciência por trás do que faz as coisas viralizarem. Framework STEPPS para criar conteúdo compartilhável.",
    principaisConceitos: ["Social Currency", "Triggers", "Emotion", "Public", "Practical Value", "Stories"],
    citacoesChave: ["Viralização não é sorte, é ciência", "As pessoas compartilham coisas que as fazem parecer bem"],
    aplicacaoPratica: "Use STEPPS para criar campanhas, conteúdos e produtos com potencial viral.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Viralização", "Compartilhamento", "Framework", "Conteúdo"]
  },

  // FUNIS E LANÇAMENTOS
  {
    id: 19,
    titulo: "A Fórmula do Lançamento",
    tituloOriginal: "Launch",
    autor: "Jeff Walker",
    anoPublicacao: 2014,
    idioma: "Português",
    categoria: "Lançamentos",
    subcategoria: "PLF",
    sinopse: "O livro oficial da metodologia Product Launch Formula. Jeff Walker explica passo a passo como fazer lançamentos de sucesso.",
    principaisConceitos: ["Seed launch", "Internal launch", "JV launch", "CPL", "Sideways sales letter", "Sequências"],
    citacoesChave: ["Lançamentos são eventos que criam urgência e escassez naturais"],
    aplicacaoPratica: "Guia completo para planejar e executar lançamentos de infoprodutos.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Lançamentos", "PLF", "Infoprodutos", "Metodologia"]
  },
  {
    id: 20,
    titulo: "DotCom Secrets",
    tituloOriginal: "DotCom Secrets",
    autor: "Russell Brunson",
    anoPublicacao: 2015,
    idioma: "Português",
    categoria: "Funis",
    subcategoria: "Estrutura",
    sinopse: "O playbook underground para crescer empresas online. Russell revela os funis que construíram empresas de milhões.",
    principaisConceitos: ["Value ladder", "Attractive character", "Soap opera sequence", "Seinfeld sequence", "Funis de vendas"],
    citacoesChave: ["Você está a um funil de distância", "O dinheiro está no backend"],
    aplicacaoPratica: "Use para estruturar sua escada de valor e criar funis que maximizam LTV.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Funis", "Escada de Valor", "Backend", "Estrutura"]
  },
  {
    id: 21,
    titulo: "Expert Secrets",
    tituloOriginal: "Expert Secrets",
    autor: "Russell Brunson",
    anoPublicacao: 2017,
    idioma: "Português",
    categoria: "Personal Branding",
    subcategoria: "Expert",
    sinopse: "Como se posicionar como expert e criar um movimento em torno da sua mensagem. Inclui o Perfect Webinar Script.",
    principaisConceitos: ["Expert positioning", "Big domino", "Epiphany bridge", "Perfect webinar", "Stack slide"],
    citacoesChave: ["Você não precisa ser o maior expert, apenas 10% à frente do seu público"],
    aplicacaoPratica: "Use para criar webinários de alta conversão e se posicionar como autoridade.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Expert", "Webinário", "Posicionamento", "Movimento"]
  },
  {
    id: 22,
    titulo: "Traffic Secrets",
    tituloOriginal: "Traffic Secrets",
    autor: "Russell Brunson",
    anoPublicacao: 2020,
    idioma: "Português",
    categoria: "Tráfego",
    subcategoria: "Aquisição",
    sinopse: "O guia definitivo para encontrar seus clientes ideais. Russell ensina estratégias de tráfego orgânico e pago.",
    principaisConceitos: ["Dream 100", "Hook story offer", "Trabalhar o algoritmo", "Infiltrar congregações", "Tráfego que você controla"],
    citacoesChave: ["Seu cliente dos sonhos já está em algum lugar online", "Dream 100 é a estratégia mais poderosa de aquisição"],
    aplicacaoPratica: "Use Dream 100 para identificar onde seu público está e como alcançá-lo.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Tráfego", "Aquisição", "Dream 100", "Audiência"]
  },

  // COPYWRITING BRASILEIRO
  {
    id: 23,
    titulo: "Copywriting Vol. 1",
    autor: "Paulo Macedo",
    anoPublicacao: 2019,
    idioma: "Português",
    categoria: "Copywriting",
    subcategoria: "Brasileiro",
    sinopse: "O primeiro grande livro de copywriting escrito por um brasileiro. Paulo Macedo adapta os conceitos clássicos para o mercado brasileiro.",
    principaisConceitos: ["Estrutura de copy", "Headlines", "Leads", "Bullets", "CTAs", "Gatilhos mentais"],
    citacoesChave: ["Copy é a arte de vender com palavras", "Cada palavra deve ter um propósito"],
    aplicacaoPratica: "Referência prática para copywriters brasileiros com exemplos do nosso mercado.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Copywriting", "Brasileiro", "Prático", "Iniciante"]
  },
  {
    id: 24,
    titulo: "Copywriting Vol. 2",
    autor: "Paulo Macedo",
    anoPublicacao: 2020,
    idioma: "Português",
    categoria: "Copywriting",
    subcategoria: "Brasileiro",
    sinopse: "Continuação do primeiro volume com técnicas avançadas e mais exemplos práticos do mercado brasileiro.",
    principaisConceitos: ["VSL", "Advertoriais", "Email marketing", "Sequências", "Testes A/B"],
    citacoesChave: ["O melhor copy é aquele que vende", "Teste tudo, assuma nada"],
    aplicacaoPratica: "Técnicas avançadas para copywriters que já dominam o básico.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Copywriting", "Brasileiro", "Avançado", "VSL"]
  },

  // NEGÓCIOS E EMPREENDEDORISMO
  {
    id: 25,
    titulo: "O Mito do Empreendedor",
    tituloOriginal: "The E-Myth Revisited",
    autor: "Michael Gerber",
    anoPublicacao: 1995,
    idioma: "Português",
    categoria: "Negócios",
    subcategoria: "Sistemas",
    sinopse: "Por que a maioria das pequenas empresas não funciona e o que fazer. A importância de criar sistemas.",
    principaisConceitos: ["Empreendedor vs técnico vs gerente", "Trabalhar NO negócio vs PARA o negócio", "Franquia protótipo", "Sistemas"],
    citacoesChave: ["A maioria dos empreendedores são técnicos que tiveram um ataque empreendedor"],
    aplicacaoPratica: "Use para sistematizar seu negócio e parar de ser refém das operações.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Negócios", "Sistemas", "Processos", "Escala"]
  },
  {
    id: 26,
    titulo: "De Zero a Um",
    tituloOriginal: "Zero to One",
    autor: "Peter Thiel",
    anoPublicacao: 2014,
    idioma: "Português",
    categoria: "Startups",
    subcategoria: "Inovação",
    sinopse: "Notas sobre startups e como construir o futuro. Peter Thiel compartilha sua filosofia de criar monopólios.",
    principaisConceitos: ["0 a 1 vs 1 a n", "Monopólio", "Segredo", "Last mover advantage", "Power law"],
    citacoesChave: ["Competição é para perdedores", "O próximo Bill Gates não vai criar um sistema operacional"],
    aplicacaoPratica: "Mude sua mentalidade de competir para criar algo único.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Startups", "Inovação", "Monopólio", "Estratégia"]
  },
  {
    id: 27,
    titulo: "A Startup Enxuta",
    tituloOriginal: "The Lean Startup",
    autor: "Eric Ries",
    anoPublicacao: 2011,
    idioma: "Português",
    categoria: "Startups",
    subcategoria: "Metodologia",
    sinopse: "Como usar inovação contínua para criar negócios de sucesso. O método Build-Measure-Learn.",
    principaisConceitos: ["MVP", "Build-Measure-Learn", "Pivot", "Validated learning", "Innovation accounting"],
    citacoesChave: ["Se você não tem vergonha da primeira versão do seu produto, você lançou tarde demais"],
    aplicacaoPratica: "Use para validar ideias rapidamente antes de investir pesado.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Startups", "MVP", "Validação", "Lean"]
  },

  // GROWTH E MÉTRICAS
  {
    id: 28,
    titulo: "Se a Tração Fosse um Jogo",
    tituloOriginal: "Traction",
    autor: "Gabriel Weinberg e Justin Mares",
    anoPublicacao: 2015,
    idioma: "Português",
    categoria: "Growth",
    subcategoria: "Canais",
    sinopse: "Os 19 canais de tração e como testar cada um sistematicamente. Framework Bullseye para encontrar seu canal.",
    principaisConceitos: ["19 canais de tração", "Bullseye framework", "50% regra", "Tração vs produto"],
    citacoesChave: ["Quase toda startup que falha tem um produto. O que falta é tração"],
    aplicacaoPratica: "Use o Bullseye para testar canais de aquisição de forma sistemática.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Growth", "Tração", "Canais", "Aquisição"]
  },
  {
    id: 29,
    titulo: "Se o Growth Hacking Fosse um Jogo",
    tituloOriginal: "Hacking Growth",
    autor: "Sean Ellis e Morgan Brown",
    anoPublicacao: 2017,
    idioma: "Português",
    categoria: "Growth",
    subcategoria: "Metodologia",
    sinopse: "O método de growth hacking usado por empresas como Dropbox, Airbnb e Facebook. Processo sistemático de crescimento.",
    principaisConceitos: ["Growth team", "North star metric", "Aha moment", "Growth loops", "Experimentação"],
    citacoesChave: ["Growth hacking é um processo, não um hack", "Encontre seu momento Aha"],
    aplicacaoPratica: "Implemente um processo de growth na sua empresa com experimentação contínua.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Growth", "Experimentação", "Métricas", "Processo"]
  },

  // DIGITAL E REDES SOCIAIS
  {
    id: 30,
    titulo: "Nocaute",
    tituloOriginal: "Jab, Jab, Jab, Right Hook",
    autor: "Gary Vaynerchuk",
    anoPublicacao: 2013,
    idioma: "Português",
    categoria: "Redes Sociais",
    subcategoria: "Conteúdo",
    sinopse: "Como contar sua história em um mundo social barulhento. Gary Vee ensina a equilibrar valor e pedidos.",
    principaisConceitos: ["Jab jab jab right hook", "Conteúdo nativo", "Contexto", "Dar antes de pedir"],
    citacoesChave: ["Dê valor, dê valor, dê valor, depois peça", "Conteúdo é rei, contexto é deus"],
    aplicacaoPratica: "Use para criar estratégia de conteúdo que equilibra valor e conversão.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Redes Sociais", "Conteúdo", "Valor", "Contexto"]
  },
  {
    id: 31,
    titulo: "Se a Economia da Atenção Fosse um Jogo",
    tituloOriginal: "Crushing It!",
    autor: "Gary Vaynerchuk",
    anoPublicacao: 2018,
    idioma: "Português",
    categoria: "Personal Branding",
    subcategoria: "Redes Sociais",
    sinopse: "Como grandes empreendedores construíram seus negócios e influência usando redes sociais.",
    principaisConceitos: ["Personal brand", "Documentar vs criar", "Plataformas", "Consistência", "Autenticidade"],
    citacoesChave: ["Documente, não crie", "Sua marca pessoal é seu maior ativo"],
    aplicacaoPratica: "Use para construir sua marca pessoal nas redes sociais de forma autêntica.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Personal Branding", "Redes Sociais", "Autenticidade"]
  },

  // PSICOLOGIA DO CONSUMIDOR
  {
    id: 32,
    titulo: "Rápido e Devagar",
    tituloOriginal: "Thinking, Fast and Slow",
    autor: "Daniel Kahneman",
    anoPublicacao: 2011,
    idioma: "Português",
    categoria: "Psicologia",
    subcategoria: "Decisão",
    sinopse: "Como tomamos decisões. Kahneman explica os dois sistemas de pensamento e os vieses cognitivos.",
    principaisConceitos: ["Sistema 1 e 2", "Vieses cognitivos", "Heurísticas", "Aversão à perda", "Ancoragem"],
    citacoesChave: ["Nada é tão importante quanto você pensa enquanto está pensando nisso"],
    aplicacaoPratica: "Entenda como seu cliente toma decisões e use vieses a seu favor eticamente.",
    nivelDificuldade: "avancado",
    rating: 5,
    tags: ["Psicologia", "Decisão", "Vieses", "Comportamento"]
  },
  {
    id: 33,
    titulo: "Previsivelmente Irracional",
    tituloOriginal: "Predictably Irrational",
    autor: "Dan Ariely",
    anoPublicacao: 2008,
    idioma: "Português",
    categoria: "Economia Comportamental",
    subcategoria: "Irracionalidade",
    sinopse: "As forças ocultas que moldam nossas decisões. Ariely mostra como somos irracionais de formas previsíveis.",
    principaisConceitos: ["Relatividade", "Âncoras", "Grátis", "Normas sociais vs mercado", "Procrastinação"],
    citacoesChave: ["Somos irracionais, mas de formas previsíveis", "Grátis não é apenas um preço"],
    aplicacaoPratica: "Use os padrões de irracionalidade para criar ofertas mais atrativas.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Comportamento", "Irracionalidade", "Preços", "Decisão"]
  },

  // BRANDING
  {
    id: 34,
    titulo: "Se a Marca Fosse um Jogo",
    tituloOriginal: "Building a Brand Story",
    autor: "Donald Miller",
    anoPublicacao: 2019,
    idioma: "Português",
    categoria: "Branding",
    subcategoria: "Storytelling",
    sinopse: "Continuação de StoryBrand com foco em implementação. Como aplicar o framework em toda a empresa.",
    principaisConceitos: ["BrandScript", "One-liner", "Website wireframe", "Lead generator", "Email sequence"],
    citacoesChave: ["Clareza é mais importante que criatividade"],
    aplicacaoPratica: "Use para implementar StoryBrand em todos os pontos de contato da marca.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Branding", "StoryBrand", "Implementação", "Clareza"]
  },
  {
    id: 35,
    titulo: "Comece pelo Porquê",
    tituloOriginal: "Start with Why",
    autor: "Simon Sinek",
    anoPublicacao: 2009,
    idioma: "Português",
    categoria: "Liderança",
    subcategoria: "Propósito",
    sinopse: "Como grandes líderes inspiram ação. O Golden Circle e a importância de começar pelo porquê.",
    principaisConceitos: ["Golden Circle", "Why-How-What", "Law of diffusion", "Manipulação vs inspiração"],
    citacoesChave: ["Pessoas não compram o que você faz, compram por que você faz", "O porquê é a razão de existir"],
    aplicacaoPratica: "Use para definir o propósito da sua marca e comunicar de forma inspiradora.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Propósito", "Liderança", "Inspiração", "Golden Circle"]
  },

  // PRODUTIVIDADE E EXECUÇÃO
  {
    id: 36,
    titulo: "Se o Trabalho Profundo Fosse um Jogo",
    tituloOriginal: "Deep Work",
    autor: "Cal Newport",
    anoPublicacao: 2016,
    idioma: "Português",
    categoria: "Produtividade",
    subcategoria: "Foco",
    sinopse: "Regras para sucesso focado em um mundo distraído. Como fazer trabalho profundo em era de distrações.",
    principaisConceitos: ["Deep work vs shallow work", "Attention residue", "Rituais", "Abraçar o tédio"],
    citacoesChave: ["Deep work é a superpotência do século 21", "A capacidade de fazer deep work está se tornando rara e valiosa"],
    aplicacaoPratica: "Use para criar blocos de trabalho focado e produzir conteúdo de qualidade.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Produtividade", "Foco", "Deep Work", "Execução"]
  },
  {
    id: 37,
    titulo: "Se a Semana de 4 Horas Fosse um Jogo",
    tituloOriginal: "The 4-Hour Workweek",
    autor: "Tim Ferriss",
    anoPublicacao: 2007,
    idioma: "Português",
    categoria: "Lifestyle",
    subcategoria: "Automação",
    sinopse: "Escape do 9-5, viva em qualquer lugar e junte-se aos novos ricos. Tim Ferriss ensina automação e delegação.",
    principaisConceitos: ["DEAL", "Elimination", "Automation", "Liberation", "Mini-retirements", "Outsourcing"],
    citacoesChave: ["Ser ocupado é uma forma de preguiça", "Foco em ser produtivo, não ocupado"],
    aplicacaoPratica: "Use para automatizar tarefas repetitivas e focar no que realmente importa.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Lifestyle", "Automação", "Delegação", "Liberdade"]
  },

  // VENDAS ONLINE
  {
    id: 38,
    titulo: "Se as Objeções Fossem um Jogo",
    tituloOriginal: "Objections",
    autor: "Jeb Blount",
    anoPublicacao: 2018,
    idioma: "Português",
    categoria: "Vendas",
    subcategoria: "Objeções",
    sinopse: "O guia definitivo para lidar com objeções em vendas. Frameworks para superar qualquer resistência.",
    principaisConceitos: ["Ledge", "Disrupt", "Ask", "Listen", "Confirm", "Tipos de objeções"],
    citacoesChave: ["Objeções são pedidos de mais informação", "A maioria das objeções são reflexos, não reais"],
    aplicacaoPratica: "Use os frameworks para criar scripts de quebra de objeções em VSLs e calls.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Vendas", "Objeções", "Scripts", "Conversão"]
  },
  {
    id: 39,
    titulo: "Se a Prospecção Fosse um Jogo",
    tituloOriginal: "Fanatical Prospecting",
    autor: "Jeb Blount",
    anoPublicacao: 2015,
    idioma: "Português",
    categoria: "Vendas",
    subcategoria: "Prospecção",
    sinopse: "O guia definitivo para abrir conversas de vendas. Como prospectar de forma consistente e eficaz.",
    principaisConceitos: ["30-day rule", "Law of replacement", "Prospecting pyramid", "Multi-channel"],
    citacoesChave: ["Prospecção é a atividade mais importante em vendas", "Pipeline é vida"],
    aplicacaoPratica: "Use para criar rotina de prospecção e manter pipeline sempre cheio.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Vendas", "Prospecção", "Pipeline", "Consistência"]
  },

  // ECONOMIA E COMPORTAMENTO
  {
    id: 40,
    titulo: "Nudge",
    tituloOriginal: "Nudge",
    autor: "Richard Thaler e Cass Sunstein",
    anoPublicacao: 2008,
    idioma: "Português",
    categoria: "Economia Comportamental",
    subcategoria: "Arquitetura de Escolha",
    sinopse: "Como pequenas mudanças podem influenciar grandes decisões. O poder da arquitetura de escolha.",
    principaisConceitos: ["Nudge", "Arquitetura de escolha", "Libertarian paternalism", "Default options", "Feedback"],
    citacoesChave: ["Pequenos detalhes podem ter grandes impactos no comportamento"],
    aplicacaoPratica: "Use para otimizar páginas de vendas, formulários e jornadas do cliente.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Comportamento", "UX", "Conversão", "Arquitetura"]
  },

  // NEGOCIAÇÃO
  {
    id: 41,
    titulo: "Nunca Divida a Diferença",
    tituloOriginal: "Never Split the Difference",
    autor: "Chris Voss",
    anoPublicacao: 2016,
    idioma: "Português",
    categoria: "Negociação",
    subcategoria: "Tática",
    sinopse: "Técnicas de negociação de um ex-negociador de reféns do FBI. Como conseguir o que você quer.",
    principaisConceitos: ["Tactical empathy", "Mirroring", "Labeling", "Calibrated questions", "Black swans"],
    citacoesChave: ["Não é sobre você ter razão, é sobre eles se sentirem ouvidos", "Sim é nada sem como"],
    aplicacaoPratica: "Use para negociar preços, parcerias e qualquer situação de conflito.",
    nivelDificuldade: "intermediario",
    rating: 5,
    tags: ["Negociação", "Comunicação", "Empatia", "Tática"]
  },

  // CRIATIVIDADE
  {
    id: 42,
    titulo: "Se Roubar Fosse Como um Artista",
    tituloOriginal: "Steal Like an Artist",
    autor: "Austin Kleon",
    anoPublicacao: 2012,
    idioma: "Português",
    categoria: "Criatividade",
    subcategoria: "Processo",
    sinopse: "10 coisas que ninguém te contou sobre ser criativo. Como encontrar inspiração e desenvolver sua voz.",
    principaisConceitos: ["Roubar como artista", "Side projects", "Mostrar o processo", "Ser boring", "Genealogia criativa"],
    citacoesChave: ["Nada é original", "Você é a soma de suas influências"],
    aplicacaoPratica: "Use para criar swipe files e desenvolver seu processo criativo.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Criatividade", "Processo", "Inspiração", "Swipe"]
  },

  // EMAIL MARKETING
  {
    id: 43,
    titulo: "Se o Email Marketing Fosse um Jogo",
    tituloOriginal: "Email Marketing Rules",
    autor: "Chad White",
    anoPublicacao: 2017,
    idioma: "Inglês",
    categoria: "Email Marketing",
    subcategoria: "Estratégia",
    sinopse: "Checklists, frameworks e 150 melhores práticas para email marketing de sucesso.",
    principaisConceitos: ["Deliverability", "Segmentação", "Automação", "Testes", "Métricas"],
    citacoesChave: ["Email marketing tem o maior ROI de todos os canais"],
    aplicacaoPratica: "Use como referência para otimizar suas campanhas de email.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Email", "Automação", "Métricas", "Conversão"]
  },

  // ANALYTICS
  {
    id: 44,
    titulo: "Se a Análise de Dados Fosse um Jogo",
    tituloOriginal: "Lean Analytics",
    autor: "Alistair Croll e Benjamin Yoskovitz",
    anoPublicacao: 2013,
    idioma: "Português",
    categoria: "Analytics",
    subcategoria: "Métricas",
    sinopse: "Use dados para construir uma startup melhor mais rápido. O framework para métricas que importam.",
    principaisConceitos: ["One metric that matters", "Pirate metrics", "Stages of startup", "Vanity vs actionable"],
    citacoesChave: ["Se você não pode medir, não pode melhorar", "Foque na métrica que importa"],
    aplicacaoPratica: "Use para definir KPIs e tomar decisões baseadas em dados.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Analytics", "Métricas", "KPIs", "Dados"]
  },

  // PREÇOS
  {
    id: 45,
    titulo: "Se a Precificação Fosse um Jogo",
    tituloOriginal: "Pricing Creativity",
    autor: "Blair Enns",
    anoPublicacao: 2018,
    idioma: "Inglês",
    categoria: "Preços",
    subcategoria: "Valor",
    sinopse: "Como precificar serviços criativos baseado em valor, não em horas. Transforme sua relação com preços.",
    principaisConceitos: ["Value-based pricing", "Anchoring", "Options", "Diagnosis before prescription"],
    citacoesChave: ["Preço é uma função de valor, não de custo"],
    aplicacaoPratica: "Use para precificar produtos e serviços de forma mais lucrativa.",
    nivelDificuldade: "avancado",
    rating: 4,
    tags: ["Preços", "Valor", "Serviços", "Posicionamento"]
  },

  // COMUNIDADES
  {
    id: 46,
    titulo: "Tribos",
    tituloOriginal: "Tribes",
    autor: "Seth Godin",
    anoPublicacao: 2008,
    idioma: "Português",
    categoria: "Comunidade",
    subcategoria: "Liderança",
    sinopse: "Como liderar e criar movimentos. Seth Godin sobre o poder das tribos e comunidades.",
    principaisConceitos: ["Tribos", "Liderança", "Movimento", "Heresia", "Conexão"],
    citacoesChave: ["Uma tribo é qualquer grupo de pessoas conectadas umas às outras, a um líder e a uma ideia"],
    aplicacaoPratica: "Use para criar e liderar comunidades em torno da sua marca.",
    nivelDificuldade: "iniciante",
    rating: 4,
    tags: ["Comunidade", "Liderança", "Movimento", "Tribos"]
  },

  // APRESENTAÇÕES
  {
    id: 47,
    titulo: "Se as Apresentações Fossem um Jogo",
    tituloOriginal: "Resonate",
    autor: "Nancy Duarte",
    anoPublicacao: 2010,
    idioma: "Português",
    categoria: "Apresentações",
    subcategoria: "Storytelling",
    sinopse: "Como criar apresentações visuais que ressoam com a audiência. A estrutura por trás de apresentações memoráveis.",
    principaisConceitos: ["Sparkline", "What is vs what could be", "STAR moment", "Call to action"],
    citacoesChave: ["Apresentações são sobre a audiência, não sobre você"],
    aplicacaoPratica: "Use para criar webinários e apresentações de vendas mais impactantes.",
    nivelDificuldade: "intermediario",
    rating: 4,
    tags: ["Apresentações", "Webinário", "Storytelling", "Visual"]
  },

  // DESIGN
  {
    id: 48,
    titulo: "Se o Design Fosse um Jogo",
    tituloOriginal: "Don't Make Me Think",
    autor: "Steve Krug",
    anoPublicacao: 2000,
    idioma: "Português",
    categoria: "UX",
    subcategoria: "Usabilidade",
    sinopse: "O guia de senso comum para usabilidade web. Como criar sites que funcionam.",
    principaisConceitos: ["Don't make me think", "Scanning vs reading", "Satisficing", "Trunk test"],
    citacoesChave: ["Se algo requer um grande investimento de tempo ou parece muito trabalhoso, é menos provável que seja usado"],
    aplicacaoPratica: "Use para criar páginas de vendas e sites mais intuitivos.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["UX", "Usabilidade", "Web", "Conversão"]
  },

  // MINDSET
  {
    id: 49,
    titulo: "Mindset",
    tituloOriginal: "Mindset: The New Psychology of Success",
    autor: "Carol Dweck",
    anoPublicacao: 2006,
    idioma: "Português",
    categoria: "Psicologia",
    subcategoria: "Mentalidade",
    sinopse: "A nova psicologia do sucesso. Como a mentalidade de crescimento pode transformar resultados.",
    principaisConceitos: ["Fixed vs growth mindset", "Effort", "Challenges", "Criticism", "Success of others"],
    citacoesChave: ["No mindset de crescimento, o fracasso é uma oportunidade de aprendizado"],
    aplicacaoPratica: "Use para desenvolver resiliência e comunicar transformação para clientes.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Mindset", "Crescimento", "Psicologia", "Transformação"]
  },

  // ESCRITA
  {
    id: 50,
    titulo: "Se a Escrita Fosse um Jogo",
    tituloOriginal: "On Writing Well",
    autor: "William Zinsser",
    anoPublicacao: 1976,
    idioma: "Português",
    categoria: "Escrita",
    subcategoria: "Clareza",
    sinopse: "O guia clássico para escrever não-ficção. Princípios de clareza e simplicidade na escrita.",
    principaisConceitos: ["Simplicidade", "Cortar palavras", "Reescrever", "Voz ativa", "Unidade"],
    citacoesChave: ["A escrita é difícil. Uma frase clara não é acidente", "Corte tudo que não é essencial"],
    aplicacaoPratica: "Use para melhorar qualquer texto de marketing, email ou copy.",
    nivelDificuldade: "iniciante",
    rating: 5,
    tags: ["Escrita", "Clareza", "Simplicidade", "Edição"]
  }
];

// Funções auxiliares
export const getCategorias = (): string[] => {
  const categorias = new Set(livrosMkt.map(l => l.categoria));
  return Array.from(categorias).sort();
};

export const getNichos = (): string[] => {
  const nichos = new Set(campanhasIconicas.map(c => c.nicho));
  return Array.from(nichos).sort();
};

export const getInfoprodutores = (): string[] => {
  const infoprodutores = new Set(campanhasIconicas.map(c => c.infoprodutor));
  return Array.from(infoprodutores).sort();
};

export const getTiposLancamento = (): string[] => {
  const tipos = new Set(campanhasIconicas.map(c => c.tipoLancamento));
  return Array.from(tipos).sort();
};

export const buscarCampanhas = (termo: string): CampanhaIconica[] => {
  const termoLower = termo.toLowerCase();
  return campanhasIconicas.filter(c => 
    c.nome.toLowerCase().includes(termoLower) ||
    c.infoprodutor.toLowerCase().includes(termoLower) ||
    c.estrategia.toLowerCase().includes(termoLower) ||
    c.bigIdea.toLowerCase().includes(termoLower) ||
    c.tags.some(t => t.toLowerCase().includes(termoLower))
  );
};

export const buscarLivros = (termo: string): LivroMkt[] => {
  const termoLower = termo.toLowerCase();
  return livrosMkt.filter(l => 
    l.titulo.toLowerCase().includes(termoLower) ||
    l.autor.toLowerCase().includes(termoLower) ||
    l.sinopse.toLowerCase().includes(termoLower) ||
    l.categoria.toLowerCase().includes(termoLower) ||
    l.tags.some(t => t.toLowerCase().includes(termoLower))
  );
};
