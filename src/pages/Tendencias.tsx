import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Search,
  ExternalLink,
  Newspaper,
  Lightbulb,
  Zap,
  Clock,
  ArrowUpRight,
  Flame,
  Globe,
  RefreshCw,
  Loader2,
  Filter,
  CheckCircle,
  Layers,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

// Notícias simuladas com mais categorias
const noticiasBase = [
  {
    id: 1,
    titulo: "IA Generativa deve movimentar US$ 1.3 trilhão até 2032",
    fonte: "Bloomberg",
    categoria: "IA",
    tempo: "2h atrás",
    resumo: "Novo relatório aponta crescimento exponencial do mercado de IA generativa, com aplicações em marketing liderando a adoção.",
    oportunidade: "Criar campanha sobre como usar IA para escalar negócios",
    impacto: "alto",
    link: "https://bloomberg.com",
  },
  {
    id: 2,
    titulo: "TikTok lança novas ferramentas para criadores de conteúdo",
    fonte: "TechCrunch",
    categoria: "Social Media",
    tempo: "4h atrás",
    resumo: "Plataforma anuncia recursos de edição avançada e monetização para criadores, intensificando competição com YouTube.",
    oportunidade: "Testar novos formatos de vídeo curto para campanhas",
    impacto: "medio",
    link: "https://techcrunch.com",
  },
  {
    id: 3,
    titulo: "Pesquisa revela que 78% dos consumidores preferem marcas autênticas",
    fonte: "Harvard Business Review",
    categoria: "Branding",
    tempo: "6h atrás",
    resumo: "Estudo global mostra que autenticidade supera preço como fator de decisão de compra para millennials e Gen Z.",
    oportunidade: "Reforçar storytelling autêntico nas campanhas de branding",
    impacto: "alto",
    link: "https://hbr.org",
  },
  {
    id: 4,
    titulo: "Meta anuncia novos recursos de IA para anúncios",
    fonte: "Meta Newsroom",
    categoria: "Ads",
    tempo: "8h atrás",
    resumo: "Advantage+ ganha recursos de geração automática de criativos e otimização de público com IA.",
    oportunidade: "Testar novos recursos de automação em campanhas piloto",
    impacto: "medio",
    link: "https://about.meta.com",
  },
  {
    id: 5,
    titulo: "Vendas por WhatsApp crescem 150% no Brasil",
    fonte: "Meio & Mensagem",
    categoria: "Sales",
    tempo: "12h atrás",
    resumo: "Conversational commerce se consolida como canal principal de vendas para PMEs brasileiras.",
    oportunidade: "Intensificar fluxos de WhatsApp nas campanhas de vendas",
    impacto: "alto",
    link: "https://meioemensagem.com.br",
  },
  {
    id: 6,
    titulo: "Google atualiza algoritmo com foco em conteúdo de qualidade",
    fonte: "Search Engine Journal",
    categoria: "Growth",
    tempo: "14h atrás",
    resumo: "Nova atualização prioriza conteúdo original e experiência do usuário, penalizando sites com conteúdo gerado por IA de baixa qualidade.",
    oportunidade: "Revisar estratégia de conteúdo para SEO",
    impacto: "alto",
    link: "https://searchenginejournal.com",
  },
  {
    id: 7,
    titulo: "Mercado de cursos online deve atingir US$ 350 bilhões em 2025",
    fonte: "Forbes",
    categoria: "Educação",
    tempo: "18h atrás",
    resumo: "Crescimento acelerado do e-learning pós-pandemia continua, com foco em upskilling e reskilling.",
    oportunidade: "Posicionar MGS como referência em educação executiva",
    impacto: "alto",
    link: "https://forbes.com",
  },
  {
    id: 8,
    titulo: "Influenciadores B2B ganham relevância no LinkedIn",
    fonte: "LinkedIn News",
    categoria: "Social Media",
    tempo: "20h atrás",
    resumo: "Executivos e especialistas estão construindo audiências significativas na plataforma, gerando leads qualificados.",
    oportunidade: "Intensificar presença de Allan Barros no LinkedIn",
    impacto: "medio",
    link: "https://linkedin.com/news",
  },
];

// Tendências globais
const tendenciasGlobais = [
  {
    nome: "AI-First Marketing",
    descricao: "Campanhas criadas e otimizadas por IA do início ao fim",
    crescimento: "+340%",
    relevancia: "Muito Alta",
  },
  {
    nome: "Short-Form Video",
    descricao: "Vídeos de até 60 segundos dominam engajamento",
    crescimento: "+180%",
    relevancia: "Alta",
  },
  {
    nome: "Community-Led Growth",
    descricao: "Crescimento através de comunidades engajadas",
    crescimento: "+120%",
    relevancia: "Alta",
  },
  {
    nome: "Conversational Commerce",
    descricao: "Vendas via chat e mensageria",
    crescimento: "+95%",
    relevancia: "Média",
  },
  {
    nome: "Creator Economy",
    descricao: "Parcerias com micro e nano influenciadores",
    crescimento: "+85%",
    relevancia: "Média",
  },
];

// Sugestões de oportunidades
const oportunidadesBase = [
  {
    tipo: "Gancho de Notícia",
    titulo: "IA para Escalar Negócios",
    descricao: "Use a notícia sobre IA generativa para criar uma campanha sobre como a MGS ensina a usar IA para escalar.",
    campanha: "MGS - IA Exponencial",
    prioridade: "alta",
  },
  {
    tipo: "Ângulo de Tendência",
    titulo: "Autenticidade no Branding",
    descricao: "A pesquisa sobre autenticidade pode ser usada como gancho para a imersão de Brand e Posicionamento.",
    campanha: "MGS - Brand e Posicionamento",
    prioridade: "alta",
  },
  {
    tipo: "Formato em Alta",
    titulo: "Reels de Bastidores",
    descricao: "Criar série de Reels mostrando bastidores das imersões para aumentar autenticidade.",
    campanha: "Todas",
    prioridade: "media",
  },
  {
    tipo: "Gancho de Notícia",
    titulo: "WhatsApp como Canal de Vendas",
    descricao: "Usar dados de crescimento do WhatsApp para campanha de Sales Exponencial.",
    campanha: "MGS - Sales Exponencial",
    prioridade: "media",
  },
  {
    tipo: "Tendência Global",
    titulo: "Community-Led Growth",
    descricao: "Criar comunidade exclusiva para alunos MGS com conteúdo recorrente.",
    campanha: "MGS - Todos os produtos",
    prioridade: "alta",
  },
];

const impactoColors: Record<string, string> = {
  alto: "bg-red-500/20 text-red-400 border-red-500/30",
  medio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  baixo: "bg-green-500/20 text-green-400 border-green-500/30",
};

const prioridadeColors: Record<string, string> = {
  alta: "bg-red-500/20 text-red-400",
  media: "bg-yellow-500/20 text-yellow-400",
  baixa: "bg-green-500/20 text-green-400",
};

export default function Tendencias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [isLoading, setIsLoading] = useState(false);
  const [noticias, setNoticias] = useState(noticiasBase);
  const [oportunidades, setOportunidades] = useState(oportunidadesBase);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());
  const [, setLocation] = useLocation();

  // Função para salvar como modelo
  const salvarComoModelo = (item: { titulo?: string; nome?: string; descricao?: string; resumo?: string; oportunidade?: string; tipo?: string }) => {
    // Salvar no localStorage temporariamente (depois integrar com backend)
    const modeloParaSalvar = {
      nome: item.titulo || item.nome || "Modelo sem nome",
      tipo: "tendencia",
      fonteNome: item.titulo || item.nome,
      fonteTipo: item.tipo || "Tendência",
      conteudo: {
        titulo: item.titulo || item.nome,
        descricao: item.descricao || item.resumo,
        estrategia: item.oportunidade,
      },
      createdAt: new Date().toISOString(),
    };
    
    const modelosSalvos = JSON.parse(localStorage.getItem("meusModelos") || "[]");
    modelosSalvos.push({ ...modeloParaSalvar, id: Date.now() });
    localStorage.setItem("meusModelos", JSON.stringify(modelosSalvos));
    
    toast.success("Salvo em Meus Modelos!", {
      description: "Acesse a aba Meus Modelos para gerenciar",
      action: {
        label: "Ver",
        onClick: () => setLocation("/meus-modelos"),
      },
    });
  };

  const categorias = ["todas", "IA", "Social Media", "Branding", "Ads", "Sales", "Growth", "Educação"];

  const noticiasFiltradas = noticias.filter(
    (n) =>
      (categoriaFiltro === "todas" || n.categoria === categoriaFiltro) &&
      (n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.resumo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Função para atualizar notícias
  const atualizarNoticias = async () => {
    setIsLoading(true);
    
    // Simular busca de novas notícias
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Gerar novas notícias simuladas baseadas na categoria filtrada
    const novasNoticias = [...noticiasBase];
    
    if (categoriaFiltro !== "todas") {
      // Adicionar notícia específica da categoria
      const novaNoticia = {
        id: Date.now(),
        titulo: `Nova tendência em ${categoriaFiltro}: O que esperar para 2026`,
        fonte: "Marketing Insights",
        categoria: categoriaFiltro,
        tempo: "Agora",
        resumo: `Análise atualizada sobre as principais movimentações no segmento de ${categoriaFiltro} para o próximo trimestre.`,
        oportunidade: `Criar conteúdo sobre tendências de ${categoriaFiltro}`,
        impacto: "alto" as const,
        link: "#",
      };
      novasNoticias.unshift(novaNoticia);
    }
    
    // Atualizar timestamps
    const noticiasAtualizadas = novasNoticias.map((n, idx) => ({
      ...n,
      tempo: idx === 0 ? "Agora" : n.tempo,
    }));
    
    setNoticias(noticiasAtualizadas);
    setUltimaAtualizacao(new Date());
    setIsLoading(false);
    
    toast.success(
      categoriaFiltro === "todas" 
        ? "Notícias atualizadas com sucesso!" 
        : `Notícias de ${categoriaFiltro} atualizadas!`,
      {
        description: `${noticiasAtualizadas.length} notícias encontradas`,
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Tendências & Notícias
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o que está acontecendo no mercado em tempo real
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-muted-foreground">
            Última atualização: {ultimaAtualizacao.toLocaleTimeString('pt-BR')}
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Atualização */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrar por categoria:</span>
            </div>
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat === "todas" ? "Todas as categorias" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              {categorias.slice(1).map((cat) => (
                <Badge
                  key={cat}
                  variant={categoriaFiltro === cat ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setCategoriaFiltro(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
          <Button 
            onClick={atualizarNoticias} 
            disabled={isLoading}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </>
            )}
          </Button>
        </div>
        {categoriaFiltro !== "todas" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Filtrando por: <Badge variant="secondary">{categoriaFiltro}</Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCategoriaFiltro("todas")}
              className="h-6 text-xs"
            >
              Limpar filtro
            </Button>
          </div>
        )}
      </Card>

      {/* Tendências Globais */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
            <Globe className="h-5 w-5 inline mr-2" />
            Tendências Globais
          </CardTitle>
          <CardDescription>O que está em alta no marketing digital mundial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {tendenciasGlobais.map((tendencia, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <Badge variant="outline" className="text-xs text-green-400">
                    {tendencia.crescimento}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{tendencia.nome}</h4>
                <p className="text-xs text-muted-foreground mb-2">{tendencia.descricao}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs w-full mt-1"
                  onClick={() => salvarComoModelo({ nome: tendencia.nome, descricao: tendencia.descricao, tipo: "Tendência Global" })}
                >
                  <Layers className="h-3 w-3 mr-1" />
                  Usar como Modelo
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feed de Notícias */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                  <Newspaper className="h-5 w-5 inline mr-2" />
                  Feed de Notícias
                  {categoriaFiltro !== "todas" && (
                    <Badge variant="secondary" className="ml-2">{categoriaFiltro}</Badge>
                  )}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {noticiasFiltradas.length} notícias
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Buscando notícias...</p>
                    </div>
                  </div>
                ) : noticiasFiltradas.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Nenhuma notícia encontrada</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => {
                          setCategoriaFiltro("todas");
                          setSearchTerm("");
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {noticiasFiltradas.map((noticia) => (
                      <div
                        key={noticia.id}
                        className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{noticia.categoria}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {noticia.tempo}
                            </span>
                          </div>
                          <Badge className={impactoColors[noticia.impacto]}>
                            Impacto {noticia.impacto}
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-2">{noticia.titulo}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{noticia.resumo}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Fonte: {noticia.fonte}</span>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => salvarComoModelo({ titulo: noticia.titulo, resumo: noticia.resumo, oportunidade: noticia.oportunidade, tipo: noticia.categoria })}
                            >
                              <Layers className="h-4 w-4 mr-2" />
                              Modelo
                            </Button>
                            <a href={noticia.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Ver mais
                              </Button>
                            </a>
                          </div>
                        </div>
                        {noticia.oportunidade && (
                          <div className="mt-3 p-2 rounded bg-primary/10 border border-primary/20">
                            <div className="flex items-center gap-2 text-xs">
                              <Lightbulb className="h-3 w-3 text-primary" />
                              <span className="font-medium">Oportunidade:</span>
                              <span className="text-muted-foreground">{noticia.oportunidade}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Sugestões de Oportunidades */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                <Zap className="h-5 w-5 inline mr-2" />
                Oportunidades
              </CardTitle>
              <CardDescription>Sugestões baseadas nas tendências</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {oportunidades.map((op, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {op.tipo}
                        </Badge>
                        <Badge className={prioridadeColors[op.prioridade]}>
                          {op.prioridade}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{op.titulo}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{op.descricao}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Para: {op.campanha}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => salvarComoModelo({ titulo: op.titulo, descricao: op.descricao, oportunidade: op.descricao, tipo: op.tipo })}
                        >
                          <Layers className="h-3 w-3 mr-1" />
                          Usar como Modelo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
