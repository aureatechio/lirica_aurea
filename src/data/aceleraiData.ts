// Dados do Aceleraí - Celebridades e Segmentos

export interface Celebridade {
  id: string;
  nome: string;
  categoria: 'ator' | 'apresentador' | 'cantor' | 'atleta' | 'influencer' | 'chef' | 'jornalista';
  destaque: boolean;
  segmentos?: string[];
}

export interface Segmento {
  id: string;
  nome: string;
  descricao: string;
  celebridadesSugeridas: string[];
}

// Celebridades do Aceleraí (lista atualizada do site oficial)
export const celebridades: Celebridade[] = [
  // Destaques principais
  { id: "rodrigo-faro", nome: "Rodrigo Faro", categoria: "apresentador", destaque: true, segmentos: ["varejo", "alimentacao", "servicos"] },
  { id: "caua-reymond", nome: "Cauã Reymond", categoria: "ator", destaque: true, segmentos: ["moda", "lifestyle", "saude"] },
  { id: "henrique-fogaca", nome: "Henrique Fogaça", categoria: "chef", destaque: true, segmentos: ["alimentacao", "gastronomia", "restaurantes"] },
  { id: "arthur-aguiar", nome: "Arthur Aguiar", categoria: "ator", destaque: true, segmentos: ["fitness", "saude", "empreendedorismo"] },
  { id: "deborah-secco", nome: "Deborah Secco", categoria: "ator", destaque: true, segmentos: ["beleza", "moda", "lifestyle"] },
  { id: "jojo-todynho", nome: "Jojo Todynho", categoria: "cantor", destaque: true, segmentos: ["varejo", "alimentacao", "entretenimento"] },
  { id: "gloria-pires", nome: "Gloria Pires", categoria: "ator", destaque: true, segmentos: ["saude", "beleza", "lifestyle"] },
  { id: "danielle-winits", nome: "Danielle Winits", categoria: "ator", destaque: true, segmentos: ["beleza", "moda", "saude"] },
  
  // Apresentadores e jornalistas
  { id: "susana-vieira", nome: "Susana Vieira", categoria: "ator", destaque: false },
  { id: "adriane-galisteu", nome: "Adriane Galisteu", categoria: "apresentador", destaque: false },
  { id: "leticia-spiller", nome: "Letícia Spiller", categoria: "ator", destaque: false },
  { id: "marcelo-serrado", nome: "Marcelo Serrado", categoria: "ator", destaque: false },
  { id: "carla-diaz", nome: "Carla Diaz", categoria: "ator", destaque: false },
  { id: "wanessa", nome: "Wanessa", categoria: "cantor", destaque: false },
  { id: "kiko", nome: "Kiko", categoria: "ator", destaque: false },
  { id: "fernanda-faveron", nome: "Fernanda Faveron", categoria: "apresentador", destaque: false },
  { id: "thiago-lacerda", nome: "Thiago Lacerda", categoria: "ator", destaque: false },
  { id: "marcao-do-povo", nome: "Marcão do Povo", categoria: "apresentador", destaque: false },
  { id: "fabiana-karla", nome: "Fabiana Karla", categoria: "ator", destaque: false },
  { id: "marcos-pasquim", nome: "Marcos Pasquim", categoria: "ator", destaque: false },
  { id: "cris-vianna", nome: "Cris Vianna", categoria: "ator", destaque: false },
  { id: "vera-viel", nome: "Vera Viel", categoria: "apresentador", destaque: false },
  { id: "gabriel-santana", nome: "Gabriel Santana", categoria: "ator", destaque: false },
  { id: "mariano", nome: "Mariano", categoria: "cantor", destaque: false },
  { id: "manoel-soares", nome: "Manoel Soares", categoria: "apresentador", destaque: false },
  { id: "viviane-araujo", nome: "Viviane Araújo", categoria: "ator", destaque: false },
  { id: "charles-do-bronxs", nome: "Charles do Bronxs", categoria: "atleta", destaque: false },
  { id: "alessandra-scatena", nome: "Alessandra Scatena", categoria: "apresentador", destaque: false },
  { id: "evaristo-costa", nome: "Evaristo Costa", categoria: "jornalista", destaque: false },
  { id: "monique-curi", nome: "Monique Curi", categoria: "ator", destaque: false },
  { id: "rachel-sheherazade", nome: "Rachel Sheherazade", categoria: "jornalista", destaque: false },
  { id: "zaac", nome: "Zaac", categoria: "cantor", destaque: false },
  { id: "michelle-loreto", nome: "Michelle Loreto", categoria: "jornalista", destaque: false },
  { id: "gloria-vanique", nome: "Gloria Vanique", categoria: "jornalista", destaque: false },
  { id: "amanda-francozo", nome: "Amanda Françozo", categoria: "apresentador", destaque: false },
  { id: "amanda-meirelles", nome: "Amanda Meirelles", categoria: "influencer", destaque: false },
  { id: "eri-johnson", nome: "Eri Johnson", categoria: "ator", destaque: false },
  { id: "juan-alba", nome: "Juan Alba", categoria: "ator", destaque: false },
  { id: "helen-ganzarolli", nome: "Helen Ganzarolli", categoria: "apresentador", destaque: false },
  { id: "paloma-bernardi", nome: "Paloma Bernardi", categoria: "ator", destaque: false },
  { id: "renata-alves", nome: "Renata Alves", categoria: "jornalista", destaque: false },
  { id: "fabiola-gadelha", nome: "Fabíola Gadelha", categoria: "jornalista", destaque: false },
  { id: "priscila-tovic", nome: "Priscila Tovic", categoria: "influencer", destaque: false },
  { id: "luiza-possi", nome: "Luiza Possi", categoria: "cantor", destaque: false },
  { id: "cris-dias", nome: "Cris Dias", categoria: "jornalista", destaque: false },
  { id: "solange-couto", nome: "Solange Couto", categoria: "ator", destaque: false },
  { id: "jose-loreto", nome: "José Loreto", categoria: "ator", destaque: false },
  { id: "rafael-cardoso", nome: "Rafael Cardoso", categoria: "ator", destaque: false },
  { id: "andre-goncalves", nome: "André Gonçalves", categoria: "ator", destaque: false },
  { id: "suzy-rego", nome: "Suzy Rêgo", categoria: "ator", destaque: false },
  { id: "lavinia-vlasak", nome: "Lavínia Vlasak", categoria: "ator", destaque: false },
  { id: "yana-sardenberg", nome: "Yana Sardenberg", categoria: "ator", destaque: false },
  { id: "juliana-silveira", nome: "Juliana Silveira", categoria: "ator", destaque: false },
  { id: "monique-alfradique", nome: "Monique Alfradique", categoria: "ator", destaque: false },
  { id: "isabela-garcia", nome: "Isabela Garcia", categoria: "ator", destaque: false },
  { id: "thierry-figueira", nome: "Thierry Figueira", categoria: "ator", destaque: false },
  { id: "fernanda-de-freitas", nome: "Fernanda de Freitas", categoria: "ator", destaque: false },
  { id: "anaju-dorigon", nome: "Anajú Dorigon", categoria: "ator", destaque: false },
  { id: "henri-castelli", nome: "Henri Castelli", categoria: "ator", destaque: false },
  { id: "pedro-andrade", nome: "Pedro Andrade", categoria: "apresentador", destaque: false },
  { id: "mauricio-lima", nome: "Maurício Lima", categoria: "atleta", destaque: false },
  { id: "gabriela-duarte", nome: "Gabriela Duarte", categoria: "ator", destaque: false },
  { id: "marcelo-negrao", nome: "Marcelo Negrão", categoria: "atleta", destaque: false },
  { id: "adenizia-ferreira", nome: "Adenízia Ferreira", categoria: "atleta", destaque: false },
  { id: "paula-pequeno", nome: "Paula Pequeno", categoria: "atleta", destaque: false },
  { id: "virna-dias", nome: "Virna Dias", categoria: "atleta", destaque: false },
  { id: "nany-people", nome: "Nany People", categoria: "ator", destaque: false },
  { id: "dudu-azevedo", nome: "Dudu Azevedo", categoria: "ator", destaque: false },
  { id: "pablo-spyer", nome: "Pablo Spyer", categoria: "influencer", destaque: false },
  { id: "sheilla-castro", nome: "Sheilla Castro", categoria: "atleta", destaque: false },
  { id: "maria-joana", nome: "Maria Joana", categoria: "ator", destaque: false },
  { id: "ana-mascarenhas", nome: "Ana Mascarenhas", categoria: "ator", destaque: false },
  { id: "laryssa-dias", nome: "Laryssa Dias", categoria: "ator", destaque: false },
  { id: "bianca-rinaldi", nome: "Bianca Rinaldi", categoria: "ator", destaque: false },
  { id: "biel", nome: "Biel", categoria: "cantor", destaque: false },
  { id: "tays-reis", nome: "Tays Reis", categoria: "cantor", destaque: false },
  { id: "alexandra-richter", nome: "Alexandra Richter", categoria: "ator", destaque: false },
  { id: "felipe-araujo", nome: "Felipe Araújo", categoria: "cantor", destaque: false },
  { id: "cariucha", nome: "Cariúcha", categoria: "apresentador", destaque: false },
  { id: "maria-padilha", nome: "Maria Padilha", categoria: "ator", destaque: false },
  { id: "priscila-fantin", nome: "Priscila Fantin", categoria: "ator", destaque: false },
  { id: "marcia-fu", nome: "Márcia Fu", categoria: "atleta", destaque: false },
  { id: "bruno-loves", nome: "Bruno Loves", categoria: "ator", destaque: false },
];

// Segmentos de atuação do Aceleraí
export const segmentos: Segmento[] = [
  {
    id: "saude",
    nome: "Saúde",
    descricao: "Clínicas, hospitais, profissionais de saúde, wellness",
    celebridadesSugeridas: ["gloria-pires", "caua-reymond", "arthur-aguiar", "danielle-winits"]
  },
  {
    id: "beleza",
    nome: "Beleza e Estética",
    descricao: "Salões, clínicas estéticas, cosméticos, skincare",
    celebridadesSugeridas: ["deborah-secco", "danielle-winits", "gloria-pires", "leticia-spiller"]
  },
  {
    id: "arquitetura",
    nome: "Arquitetura e Design",
    descricao: "Arquitetos, designers de interiores, decoração",
    celebridadesSugeridas: ["thiago-lacerda", "marcelo-serrado", "gabriela-duarte"]
  },
  {
    id: "alimentacao",
    nome: "Alimentação e Gastronomia",
    descricao: "Restaurantes, delivery, produtos alimentícios",
    celebridadesSugeridas: ["henrique-fogaca", "rodrigo-faro", "jojo-todynho"]
  },
  {
    id: "fitness",
    nome: "Fitness e Esportes",
    descricao: "Academias, personal trainers, suplementos",
    celebridadesSugeridas: ["arthur-aguiar", "charles-do-bronxs", "marcelo-negrao", "sheilla-castro"]
  },
  {
    id: "moda",
    nome: "Moda e Lifestyle",
    descricao: "Lojas de roupas, acessórios, lifestyle",
    celebridadesSugeridas: ["caua-reymond", "deborah-secco", "carla-diaz", "paloma-bernardi"]
  },
  {
    id: "varejo",
    nome: "Varejo e Comércio",
    descricao: "Lojas físicas e e-commerce em geral",
    celebridadesSugeridas: ["rodrigo-faro", "jojo-todynho", "fabiana-karla"]
  },
  {
    id: "servicos",
    nome: "Serviços Profissionais",
    descricao: "Advocacia, contabilidade, consultoria",
    celebridadesSugeridas: ["rachel-sheherazade", "evaristo-costa", "manoel-soares"]
  },
  {
    id: "educacao",
    nome: "Educação e Cursos",
    descricao: "Escolas, cursos online, treinamentos",
    celebridadesSugeridas: ["arthur-aguiar", "pablo-spyer", "pedro-andrade"]
  },
  {
    id: "imobiliario",
    nome: "Imobiliário",
    descricao: "Construtoras, imobiliárias, corretores",
    celebridadesSugeridas: ["rodrigo-faro", "marcos-pasquim", "henri-castelli"]
  },
  {
    id: "tecnologia",
    nome: "Tecnologia",
    descricao: "Startups, apps, SaaS, fintechs",
    celebridadesSugeridas: ["pablo-spyer", "evaristo-costa", "arthur-aguiar"]
  },
  {
    id: "entretenimento",
    nome: "Entretenimento",
    descricao: "Eventos, shows, casas noturnas",
    celebridadesSugeridas: ["jojo-todynho", "wanessa", "felipe-araujo", "biel"]
  },
];

// Casais disponíveis para campanhas
export const casais = [
  { id: "faro-viel", nomes: ["Rodrigo Faro", "Vera Viel"], segmentos: ["familia", "varejo", "lifestyle"] },
  { id: "winits-goncalves", nomes: ["Danielle Winits", "André Gonçalves"], segmentos: ["familia", "lifestyle"] },
  { id: "fantin-loves", nomes: ["Priscila Fantin", "Bruno Loves"], segmentos: ["familia", "lifestyle"] },
];

// Função para buscar celebridades por segmento
export function getCelebridadesPorSegmento(segmentoId: string): Celebridade[] {
  const segmento = segmentos.find(s => s.id === segmentoId);
  if (!segmento) return [];
  return celebridades.filter(c => segmento.celebridadesSugeridas.includes(c.id));
}

// Função para buscar celebridades em destaque
export function getCelebridadesDestaque(): Celebridade[] {
  return celebridades.filter(c => c.destaque);
}
