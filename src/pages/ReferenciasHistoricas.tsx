import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  History,
  Lightbulb,
  Calendar,
  Award,
  Tv,
  Radio,
  Newspaper,
  Film,
  Target,
  Users,
  TrendingUp,
  Star,
  ExternalLink,
  BookOpen,
  Layers,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

interface CampanhaHistorica {
  id: string;
  nome: string;
  marca: string;
  ano: number;
  decada: string;
  tipo: "tv" | "impresso" | "radio" | "outdoor" | "digital" | "guerrilha";
  agencia?: string;
  criador?: string;
  descricao: string;
  contexto: string;
  estrategia: string;
  resultado: string;
  insights: string[];
  aplicacoesMGS: string[];
  produtosRelacionados: string[];
  link?: string;
  imagem?: string;
}

const campanhasHistoricas: CampanhaHistorica[] = [
  // Campanhas Clássicas Internacionais
  {
    id: "think-different",
    nome: "Think Different",
    marca: "Apple",
    ano: 1997,
    decada: "1990s",
    tipo: "tv",
    agencia: "TBWA\\Chiat\\Day",
    criador: "Steve Jobs, Lee Clow",
    descricao: "Campanha icônica que reposicionou a Apple como marca para 'os loucos, os desajustados, os rebeldes'.",
    contexto: "Apple estava à beira da falência. Steve Jobs havia retornado e precisava reconstruir a marca.",
    estrategia: "Associar a marca a figuras históricas que 'pensaram diferente' - Einstein, Gandhi, Lennon, Picasso.",
    resultado: "Transformou a percepção da Apple e preparou o terreno para o iMac, iPod e iPhone.",
    insights: [
      "Posicionamento por valores, não por produto",
      "Associação com arquétipos de rebeldia e genialidade",
      "Simplicidade na mensagem central",
    ],
    aplicacoesMGS: [
      "Posicionar Allan Barros como 'o diferente' no mercado de educação",
      "Associar MGS a empresários que 'pensam diferente'",
      "Usar depoimentos de alunos que transformaram seus negócios",
    ],
    produtosRelacionados: ["Brand e Posicionamento", "Calendário Exponencial"],
    link: "https://www.youtube.com/watch?v=tjgtLSHhTPg",
  },
  {
    id: "just-do-it",
    nome: "Just Do It",
    marca: "Nike",
    ano: 1988,
    decada: "1980s",
    tipo: "tv",
    agencia: "Wieden+Kennedy",
    criador: "Dan Wieden",
    descricao: "Slogan que transcendeu o esporte e se tornou um mantra de vida.",
    contexto: "Nike competia com Reebok que dominava o mercado de fitness.",
    estrategia: "Criar uma mensagem universal de superação que qualquer pessoa pudesse adotar.",
    resultado: "Nike passou de US$877M para US$9.2B em 10 anos. Slogan mais reconhecido do mundo.",
    insights: [
      "Mensagem universal que transcende o produto",
      "Apelo emocional sobre racional",
      "Consistência por décadas",
    ],
    aplicacoesMGS: [
      "Criar um slogan/mantra para cada produto MGS",
      "Focar em transformação pessoal, não apenas em conteúdo",
      "Usar histórias de superação de alunos",
    ],
    produtosRelacionados: ["Todos os produtos MGS"],
    link: "https://www.youtube.com/watch?v=WYP9AGtLvRg",
  },
  {
    id: "1984-apple",
    nome: "1984",
    marca: "Apple",
    ano: 1984,
    decada: "1980s",
    tipo: "tv",
    agencia: "TBWA\\Chiat\\Day",
    criador: "Ridley Scott, Steve Hayden",
    descricao: "Comercial do Super Bowl que introduziu o Macintosh como libertador do 'Big Brother' IBM.",
    contexto: "IBM dominava o mercado de computadores. Apple precisava se diferenciar radicalmente.",
    estrategia: "Usar a metáfora de Orwell para posicionar Apple como revolucionária contra o establishment.",
    resultado: "Gerou US$155M em vendas do Macintosh nos 3 meses seguintes. Considerado o melhor comercial da história.",
    insights: [
      "Criar um inimigo comum para unir a audiência",
      "Usar storytelling cinematográfico",
      "Lançamento em momento de alta atenção (Super Bowl)",
    ],
    aplicacoesMGS: [
      "Posicionar 'educação tradicional' como o inimigo",
      "Criar manifestos em formato cinematográfico",
      "Lançar em momentos de alta atenção do mercado",
    ],
    produtosRelacionados: ["Calendário Exponencial", "IA Exponencial"],
    link: "https://www.youtube.com/watch?v=VtvjbmoDx-I",
  },
  {
    id: "volkswagen-think-small",
    nome: "Think Small",
    marca: "Volkswagen",
    ano: 1959,
    decada: "1950s",
    tipo: "impresso",
    agencia: "DDB",
    criador: "Bill Bernbach, Helmut Krone",
    descricao: "Revolucionou a publicidade ao usar honestidade e minimalismo para vender o Fusca.",
    contexto: "Carros americanos eram grandes e ostentosos. O Fusca era pequeno e 'feio'.",
    estrategia: "Transformar fraquezas em virtudes. Usar humor e honestidade radical.",
    resultado: "Tornou o Fusca o carro importado mais vendido nos EUA. Criou a 'revolução criativa' na publicidade.",
    insights: [
      "Honestidade radical como diferencial",
      "Transformar fraquezas em pontos fortes",
      "Minimalismo visual e textual",
    ],
    aplicacoesMGS: [
      "Ser honesto sobre o que MGS NÃO é",
      "Usar simplicidade nas comunicações",
      "Destacar o que é 'pequeno' mas valioso",
    ],
    produtosRelacionados: ["Brand e Posicionamento"],
    link: "https://www.adsoftheworld.com/campaigns/think-small",
  },
  {
    id: "dove-real-beauty",
    nome: "Real Beauty",
    marca: "Dove",
    ano: 2004,
    decada: "2000s",
    tipo: "tv",
    agencia: "Ogilvy",
    descricao: "Campanha que desafiou padrões de beleza e criou um movimento social.",
    contexto: "Indústria de beleza promovia padrões irreais. Mulheres reais não se identificavam.",
    estrategia: "Usar mulheres reais em vez de modelos. Criar discussão sobre autoestima.",
    resultado: "Vendas de Dove cresceram de US$2.5B para US$4B. Criou um movimento global.",
    insights: [
      "Criar movimento social, não apenas campanha",
      "Usar pessoas reais como protagonistas",
      "Desafiar o status quo da indústria",
    ],
    aplicacoesMGS: [
      "Mostrar empresários 'reais', não apenas cases de sucesso",
      "Criar movimento de 'negócios reais'",
      "Desafiar gurus do marketing digital",
    ],
    produtosRelacionados: ["Brand e Posicionamento", "Sales Exponencial"],
    link: "https://www.youtube.com/watch?v=XpaOjMXyJGk",
  },
  {
    id: "old-spice-man",
    nome: "The Man Your Man Could Smell Like",
    marca: "Old Spice",
    ano: 2010,
    decada: "2010s",
    tipo: "digital",
    agencia: "Wieden+Kennedy",
    descricao: "Campanha viral que reinventou uma marca 'de velho' para millennials.",
    contexto: "Old Spice era vista como marca do avô. Precisava rejuvenescer.",
    estrategia: "Humor absurdo, viralização, resposta em tempo real nas redes sociais.",
    resultado: "Vendas aumentaram 125%. 1.8 bilhão de impressões. Reinventou marketing digital.",
    insights: [
      "Humor absurdo funciona para viralização",
      "Resposta em tempo real aumenta engajamento",
      "Reinvenção de marca é possível",
    ],
    aplicacoesMGS: [
      "Usar humor nos criativos quando apropriado",
      "Criar conteúdo responsivo em tempo real",
      "Não ter medo de ser 'diferente'",
    ],
    produtosRelacionados: ["Criatividade Exponencial", "Growth Exponencial"],
    link: "https://www.youtube.com/watch?v=owGykVbfgUE",
  },
  // Campanhas Brasileiras Clássicas
  {
    id: "garoto-bombril",
    nome: "Garoto Bombril",
    marca: "Bombril",
    ano: 1978,
    decada: "1970s",
    tipo: "tv",
    agencia: "DPZ",
    criador: "Washington Olivetto",
    descricao: "Carlos Moreno como 'Garoto Bombril' por 26 anos - maior campanha da TV brasileira.",
    contexto: "Bombril precisava se diferenciar de concorrentes genéricos.",
    estrategia: "Criar personagem carismático que personificasse a marca com humor e criatividade.",
    resultado: "1001 comerciais. Bombril se tornou sinônimo de palha de aço no Brasil.",
    insights: [
      "Consistência de personagem por décadas",
      "Humor brasileiro funciona",
      "Personificação da marca",
    ],
    aplicacoesMGS: [
      "Allan Barros como 'rosto' consistente da MGS",
      "Criar série de conteúdos com mesmo formato",
      "Usar humor brasileiro nos criativos",
    ],
    produtosRelacionados: ["Todos os produtos MGS"],
    link: "https://www.youtube.com/watch?v=8UqXjLXJVZo",
  },
  {
    id: "havaianas-todo-mundo-usa",
    nome: "Todo Mundo Usa",
    marca: "Havaianas",
    ano: 1994,
    decada: "1990s",
    tipo: "tv",
    agencia: "AlmapBBDO",
    descricao: "Reposicionamento de chinelo popular para item fashion usando celebridades.",
    contexto: "Havaianas era vista como chinelo de pobre. Vendas em queda.",
    estrategia: "Mostrar celebridades usando Havaianas de forma natural e bem-humorada.",
    resultado: "De 80M para 200M de pares/ano. Exportação para 80 países. Virou item de luxo.",
    insights: [
      "Reposicionamento radical é possível",
      "Celebridades como prova social",
      "Humor derruba barreiras de classe",
    ],
    aplicacoesMGS: [
      "Usar celebridades/empresários famosos como prova social",
      "Reposicionar produtos se necessário",
      "Mostrar que 'todo mundo' pode ter sucesso",
    ],
    produtosRelacionados: ["Aceleraí", "Brand e Posicionamento"],
    link: "https://www.youtube.com/watch?v=3HLYhMIhXXk",
  },
  {
    id: "coca-cola-hilltop",
    nome: "I'd Like to Buy the World a Coke (Hilltop)",
    marca: "Coca-Cola",
    ano: 1971,
    decada: "1970s",
    tipo: "tv",
    agencia: "McCann Erickson",
    descricao: "Jovens de várias nacionalidades cantando sobre paz e harmonia no topo de uma colina.",
    contexto: "Guerra do Vietnã, tensões raciais. Mundo precisava de esperança.",
    estrategia: "Associar Coca-Cola a paz mundial e união entre povos.",
    resultado: "Um dos comerciais mais amados da história. Música virou hit.",
    insights: [
      "Conectar marca a valores universais",
      "Música como veículo emocional",
      "Timing com momento cultural",
    ],
    aplicacoesMGS: [
      "Criar hinos/músicas para campanhas",
      "Conectar MGS a valores de comunidade",
      "Aproveitar momentos culturais relevantes",
    ],
    produtosRelacionados: ["Brand e Posicionamento", "Calendário Exponencial"],
  },
  {
    id: "absolut-bottle",
    nome: "Absolut Bottle",
    marca: "Absolut Vodka",
    ano: 1981,
    decada: "1980s",
    tipo: "impresso",
    agencia: "TBWA",
    descricao: "Série de anúncios minimalistas focados na silhueta da garrafa.",
    contexto: "Vodka sueca desconhecida competindo com marcas russas estabelecidas.",
    estrategia: "Transformar a garrafa em ícone através de arte e design minimalista.",
    resultado: "De 10.000 para 4.5 milhões de caixas/ano. Campanha durou 25 anos.",
    insights: [
      "Consistência visual por décadas",
      "Produto como arte",
      "Colaborações com artistas",
    ],
    aplicacoesMGS: [
      "Criar identidade visual icônica e consistente",
      "Colaborar com artistas/designers",
      "Transformar materiais em 'arte'",
    ],
    produtosRelacionados: ["Criatividade Exponencial", "Brand e Posicionamento"],
  },
  {
    id: "red-bull-stratos",
    nome: "Red Bull Stratos",
    marca: "Red Bull",
    ano: 2012,
    decada: "2010s",
    tipo: "digital",
    descricao: "Felix Baumgartner saltando da estratosfera - maior evento de mídia da história.",
    contexto: "Red Bull já era associada a esportes radicais. Precisava de algo épico.",
    estrategia: "Criar evento impossível que personificasse 'Red Bull te dá asas'.",
    resultado: "8 milhões assistindo ao vivo. 52 milhões de views no YouTube. Cobertura global.",
    insights: [
      "Criar eventos impossíveis",
      "Conteúdo como produto",
      "Transmissão ao vivo como estratégia",
    ],
    aplicacoesMGS: [
      "Criar eventos épicos e memoráveis",
      "Transmitir imersões ao vivo",
      "Fazer algo 'impossível' no mercado",
    ],
    produtosRelacionados: ["Calendário Exponencial", "Growth Exponencial"],
  },
  {
    id: "mastercard-priceless",
    nome: "Priceless",
    marca: "Mastercard",
    ano: 1997,
    decada: "1990s",
    tipo: "tv",
    agencia: "McCann Erickson",
    descricao: "Formato 'X custa Y, Z custa W, mas [momento emocional] não tem preço'.",
    contexto: "Cartões de crédito eram vistos como frios e transacionais.",
    estrategia: "Associar uso do cartão a momentos emocionais preciosos.",
    resultado: "Campanha mais longeva da categoria. Reconhecimento global instantâneo.",
    insights: [
      "Formato replicável infinitamente",
      "Emoção sobre transação",
      "Estrutura narrativa consistente",
    ],
    aplicacoesMGS: [
      "Criar formato de conteúdo replicável",
      "Focar no valor emocional, não no preço",
      "Estrutura: investimento + transformação = não tem preço",
    ],
    produtosRelacionados: ["Todos os produtos MGS"],
  },
  {
    id: "avis-we-try-harder",
    nome: "We Try Harder",
    marca: "Avis",
    ano: 1962,
    decada: "1960s",
    tipo: "impresso",
    agencia: "DDB",
    criador: "Bill Bernbach",
    descricao: "Avis admitiu ser a número 2 e transformou isso em vantagem.",
    contexto: "Hertz dominava o mercado. Avis era vista como inferior.",
    estrategia: "Admitir ser número 2 e usar isso como motivação para se esforçar mais.",
    resultado: "Market share de 11% para 35% em 4 anos. Virou case de posicionamento.",
    insights: [
      "Admitir fraqueza pode ser força",
      "Underdog gera simpatia",
      "Honestidade radical funciona",
    ],
    aplicacoesMGS: [
      "Posicionar MGS como alternativa aos 'gigantes'",
      "Usar narrativa de underdog quando apropriado",
      "Ser honesto sobre limitações",
    ],
    produtosRelacionados: ["Brand e Posicionamento"],
  },
  {
    id: "de-beers-diamond",
    nome: "A Diamond is Forever",
    marca: "De Beers",
    ano: 1947,
    decada: "1940s",
    tipo: "impresso",
    agencia: "N.W. Ayer",
    descricao: "Criou a tradição do anel de noivado de diamante.",
    contexto: "Diamantes não eram tradição de noivado. De Beers tinha excesso de estoque.",
    estrategia: "Associar diamantes a amor eterno e criar uma 'tradição'.",
    resultado: "Criou uma indústria de US$72 bilhões. Tradição global inventada.",
    insights: [
      "É possível criar tradições",
      "Associar produto a emoções universais",
      "Marketing de longo prazo",
    ],
    aplicacoesMGS: [
      "Criar 'tradições' no mercado de educação",
      "Associar MGS a momentos de vida importantes",
      "Pensar em legado de longo prazo",
    ],
    produtosRelacionados: ["Brand e Posicionamento", "Calendário Exponencial"],
  },
  {
    id: "marlboro-man",
    nome: "Marlboro Man",
    marca: "Marlboro",
    ano: 1954,
    decada: "1950s",
    tipo: "impresso",
    agencia: "Leo Burnett",
    descricao: "Cowboy masculino que reposicionou cigarro 'feminino' para homens.",
    contexto: "Marlboro era cigarro com filtro, considerado feminino na época.",
    estrategia: "Criar arquétipo masculino icônico - o cowboy americano.",
    resultado: "De marca feminina para líder mundial. Ícone cultural por 45 anos.",
    insights: [
      "Arquétipos funcionam",
      "Reposicionamento radical é possível",
      "Consistência de imagem por décadas",
    ],
    aplicacoesMGS: [
      "Definir arquétipo claro para cada produto",
      "Usar imagens consistentes",
      "Criar personagem/figura icônica",
    ],
    produtosRelacionados: ["Brand e Posicionamento", "Criatividade Exponencial"],
  },
  {
    id: "california-milk",
    nome: "Got Milk?",
    marca: "California Milk Processor Board",
    ano: 1993,
    decada: "1990s",
    tipo: "tv",
    agencia: "Goodby Silverstein",
    descricao: "Campanha que mostrava momentos de desespero sem leite.",
    contexto: "Consumo de leite em queda. Leite era commodity sem diferenciação.",
    estrategia: "Mostrar a falta do produto em momentos críticos (cookie sem leite).",
    resultado: "Reverteu queda de consumo. Uma das frases mais reconhecidas dos EUA.",
    insights: [
      "Mostrar a dor da ausência",
      "Formato pergunta funciona",
      "Humor situacional",
    ],
    aplicacoesMGS: [
      "Mostrar o que acontece SEM a metodologia MGS",
      "Usar formato pergunta em headlines",
      "Criar situações de 'falta'",
    ],
    produtosRelacionados: ["Todos os produtos MGS"],
  },
];

const tipoIcons: Record<string, React.ReactNode> = {
  tv: <Tv className="h-4 w-4" />,
  impresso: <Newspaper className="h-4 w-4" />,
  radio: <Radio className="h-4 w-4" />,
  outdoor: <Target className="h-4 w-4" />,
  digital: <TrendingUp className="h-4 w-4" />,
  guerrilha: <Users className="h-4 w-4" />,
};

const tipoLabels: Record<string, string> = {
  tv: "TV",
  impresso: "Impresso",
  radio: "Rádio",
  outdoor: "Outdoor",
  digital: "Digital",
  guerrilha: "Guerrilha",
};

export default function ReferenciasHistoricas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [decadaFiltro, setDecadaFiltro] = useState("todas");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [selectedCampanha, setSelectedCampanha] = useState<CampanhaHistorica | null>(null);

  const decadas = ["todas", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];
  const tipos = ["todos", "tv", "impresso", "radio", "outdoor", "digital", "guerrilha"];

  const campanhasFiltradas = campanhasHistoricas.filter(
    (c) =>
      (decadaFiltro === "todas" || c.decada === decadaFiltro) &&
      (tipoFiltro === "todos" || c.tipo === tipoFiltro) &&
      (c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <History className="h-8 w-8 text-amber-500" />
            Referências Históricas
          </h1>
          <p className="text-muted-foreground">
            Grandes campanhas do passado que inspiram o presente
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar campanha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{campanhasHistoricas.length}</p>
                <p className="text-sm text-muted-foreground">Campanhas Clássicas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">80+</p>
                <p className="text-sm text-muted-foreground">Anos de História</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{campanhasHistoricas.reduce((acc, c) => acc + c.insights.length, 0)}</p>
                <p className="text-sm text-muted-foreground">Insights Extraídos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{campanhasHistoricas.reduce((acc, c) => acc + c.aplicacoesMGS.length, 0)}</p>
                <p className="text-sm text-muted-foreground">Aplicações MGS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Década:</span>
            <div className="flex gap-1">
              {decadas.map((dec) => (
                <Badge
                  key={dec}
                  variant={decadaFiltro === dec ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setDecadaFiltro(dec)}
                >
                  {dec === "todas" ? "Todas" : dec}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tipo:</span>
            <div className="flex gap-1">
              {tipos.map((tipo) => (
                <Badge
                  key={tipo}
                  variant={tipoFiltro === tipo ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setTipoFiltro(tipo)}
                >
                  {tipo === "todos" ? "Todos" : tipoLabels[tipo]}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Lista de Campanhas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campanhasFiltradas.map((campanha) => (
          <Card
            key={campanha.id}
            className="hover:border-amber-500/50 transition-all cursor-pointer group"
            onClick={() => setSelectedCampanha(campanha)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-amber-500 transition-colors">
                    {campanha.nome}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {campanha.marca} • {campanha.ano}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  {tipoIcons[campanha.tipo]}
                  {tipoLabels[campanha.tipo]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {campanha.descricao}
              </p>
              {campanha.agencia && (
                <p className="text-xs text-muted-foreground mb-2">
                  Agência: {campanha.agencia}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {campanha.insights.length} insights
                </Badge>
                <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                  {campanha.aplicacoesMGS.length} aplicações MGS
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Dialog open={!!selectedCampanha} onOpenChange={() => setSelectedCampanha(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCampanha && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      <Star className="h-6 w-6 text-amber-500" />
                      {selectedCampanha.nome}
                    </DialogTitle>
                    <p className="text-muted-foreground">
                      {selectedCampanha.marca} • {selectedCampanha.ano} • {selectedCampanha.agencia}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {tipoIcons[selectedCampanha.tipo]}
                    {tipoLabels[selectedCampanha.tipo]}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Descrição</h4>
                  <p className="text-muted-foreground">{selectedCampanha.descricao}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Contexto
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedCampanha.contexto}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Estratégia
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedCampanha.estrategia}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    Resultado
                  </h4>
                  <p className="text-sm">{selectedCampanha.resultado}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Insights Extraídos
                  </h4>
                  <div className="space-y-2">
                    {selectedCampanha.insights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded bg-yellow-500/10">
                        <span className="text-yellow-500 font-bold">{i + 1}.</span>
                        <span className="text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Aplicações para MGS/Aceleraí
                  </h4>
                  <div className="space-y-2">
                    {selectedCampanha.aplicacoesMGS.map((aplicacao, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded bg-primary/10">
                        <span className="text-primary">→</span>
                        <span className="text-sm">{aplicacao}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Produtos Relacionados</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedCampanha.produtosRelacionados.map((produto, i) => (
                      <Badge key={i} variant="secondary">{produto}</Badge>
                    ))}
                  </div>
                </div>

                {/* Links de Referência */}
                {selectedCampanha.link && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-400" />
                      Links de Referência
                    </h4>
                    <a 
                      href={selectedCampanha.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-all group"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 group-hover:text-blue-300">Ver campanha original</span>
                    </a>
                  </div>
                )}

                <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    onClick={() => {
                      const modelo = {
                        id: `ref-historica-${selectedCampanha.id}-${Date.now()}`,
                        tipo: 'referencia-historica' as const,
                        nome: selectedCampanha.nome,
                        fonte: `Ref. Históricas - ${selectedCampanha.marca} (${selectedCampanha.ano})`,
                        conteudo: {
                          descricao: selectedCampanha.descricao,
                          contexto: selectedCampanha.contexto,
                          estrategia: selectedCampanha.estrategia,
                          resultado: selectedCampanha.resultado,
                          insights: selectedCampanha.insights,
                          aplicacoesMGS: selectedCampanha.aplicacoesMGS
                        },
                        dataCriacao: new Date().toISOString(),
                        tags: [selectedCampanha.marca, selectedCampanha.decada, tipoLabels[selectedCampanha.tipo]]
                      };
                      const modelos = JSON.parse(localStorage.getItem('meus-modelos') || '[]');
                      modelos.push(modelo);
                      localStorage.setItem('meus-modelos', JSON.stringify(modelos));
                      toast.success(`"${selectedCampanha.nome}" salvo em Meus Modelos!`);
                      setSelectedCampanha(null);
                    }}
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Usar como Modelo
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedCampanha(null)}>
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
