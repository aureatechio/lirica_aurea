import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ExternalLink,
  Instagram,
  Linkedin,
  Globe,
  Star,
  TrendingUp,
  Users,
  Building2,
  Sparkles,
  Target,
  Eye,
  Lightbulb,
  Crown,
  Zap,
  BookOpen,
  Megaphone,
  Filter,
  Layers,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  influenciasDiretas,
  influenciasIndiretas,
  todasInfluencias,
  totalInfluencias,
  type Influencia,
  type TipoInfluencia,
  type CategoriaInfluencia,
  type PesoInfluencia,
} from "@/data/influenciasData";

const categoriaLabels: Record<CategoriaInfluencia, { label: string; icon: React.ReactNode }> = {
  educacao_negocios: { label: "Educação Negócios", icon: <Building2 className="h-4 w-4" /> },
  educacao_marketing: { label: "Educação Marketing", icon: <Megaphone className="h-4 w-4" /> },
  educacao_tech: { label: "Educação Tech", icon: <Zap className="h-4 w-4" /> },
  educacao_desenvolvimento: { label: "Desenvolvimento Pessoal", icon: <Users className="h-4 w-4" /> },
  educacao_financas: { label: "Educação Finanças", icon: <TrendingUp className="h-4 w-4" /> },
  plataformas_infoprodutos: { label: "Plataformas", icon: <Globe className="h-4 w-4" /> },
  agencias_marketing: { label: "Agências", icon: <Target className="h-4 w-4" /> },
  marcas_luxo: { label: "Marcas de Luxo", icon: <Crown className="h-4 w-4" /> },
  marcas_tech: { label: "Marcas Tech", icon: <Sparkles className="h-4 w-4" /> },
  marcas_lifestyle: { label: "Marcas Lifestyle", icon: <Star className="h-4 w-4" /> },
  marcas_moda: { label: "Marcas Moda", icon: <Eye className="h-4 w-4" /> },
  marcas_entretenimento: { label: "Entretenimento", icon: <Lightbulb className="h-4 w-4" /> },
  marcas_esportes: { label: "Esportes", icon: <Target className="h-4 w-4" /> },
  criadores_conteudo: { label: "Criadores", icon: <Users className="h-4 w-4" /> },
  podcasts: { label: "Podcasts", icon: <BookOpen className="h-4 w-4" /> },
  eventos: { label: "Eventos", icon: <TrendingUp className="h-4 w-4" /> },
};

const pesoColors: Record<PesoInfluencia, string> = {
  5: "bg-red-500 text-white",
  4: "bg-orange-500 text-white",
  3: "bg-yellow-500 text-black",
  2: "bg-blue-500 text-white",
  1: "bg-gray-500 text-white",
};

const pesoLabels: Record<PesoInfluencia, string> = {
  5: "Crítico",
  4: "Alto",
  3: "Médio",
  2: "Baixo",
  1: "Referência",
};

function InfluenciaCard({ influencia, onSelect }: { influencia: Influencia; onSelect: () => void }) {
  return (
    <Card 
      className="hover:border-primary/50 transition-all cursor-pointer group"
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base group-hover:text-primary transition-colors">
              {influencia.nome}
            </CardTitle>
            <CardDescription className="text-xs mt-1 line-clamp-2">
              {influencia.descricao}
            </CardDescription>
          </div>
          <Badge className={`${pesoColors[influencia.peso]} text-xs ml-2`}>
            {pesoLabels[influencia.peso]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {categoriaLabels[influencia.categoria]?.label || influencia.categoria}
          </Badge>
          {influencia.fundadores && influencia.fundadores.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {influencia.fundadores.slice(0, 2).join(", ")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          {influencia.instagram && (
            <>
              <a 
                href={`https://instagram.com/${influencia.instagram.replace("@", "")}`} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                title="Perfil do Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href={`https://instagram.com/${influencia.instagram.replace("@", "")}/?__a=1`} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted-foreground hover:text-pink-500 transition-colors underline"
                title="Ver último post"
              >
                Último post
              </a>
            </>
          )}
          {influencia.linkedin && (
            <a 
              href={influencia.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-blue-500 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {influencia.site && (
            <a 
              href={influencia.site} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-green-500 transition-colors"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {influencia.adLibrary && (
            <a 
              href={influencia.adLibrary} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-blue-400 transition-colors"
              title="Ver Ads no Meta Ad Library"
            >
              <Megaphone className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function InfluenciaModal({ influencia, open, onClose }: { influencia: Influencia | null; open: boolean; onClose: () => void }) {
  if (!influencia) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{influencia.nome}</DialogTitle>
            <Badge className={pesoColors[influencia.peso]}>
              Peso {influencia.peso} - {pesoLabels[influencia.peso]}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground">{influencia.descricao}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Tipo</h4>
              <Badge variant="outline">
                {influencia.tipo === "direta" ? "Influência Direta" : "Influência Indireta"}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Categoria</h4>
              <Badge variant="outline">
                {categoriaLabels[influencia.categoria]?.label}
              </Badge>
            </div>
          </div>

          {influencia.fundadores && influencia.fundadores.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Fundadores/Líderes</h4>
              <div className="flex flex-wrap gap-2">
                {influencia.fundadores.map((f, i) => (
                  <Badge key={i} variant="secondary">{f}</Badge>
                ))}
              </div>
            </div>
          )}

          {influencia.produtos && influencia.produtos.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Produtos/Serviços</h4>
              <div className="flex flex-wrap gap-2">
                {influencia.produtos.map((p, i) => (
                  <Badge key={i} variant="outline">{p}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {influencia.instagram && (
              <div className="flex items-center gap-3">
                <a 
                  href={`https://instagram.com/${influencia.instagram.replace("@", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500"
                >
                  <Instagram className="h-4 w-4" />
                  {influencia.instagram}
                </a>
                <a 
                  href={`https://instagram.com/${influencia.instagram.replace("@", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded hover:bg-pink-500/30 transition-colors"
                >
                  Ver último post
                </a>
              </div>
            )}
            {influencia.site && (
              <a 
                href={influencia.site} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500"
              >
                <Globe className="h-4 w-4" />
                Site
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {influencia.adLibrary && (
              <a 
                href={influencia.adLibrary} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500"
              >
                <Megaphone className="h-4 w-4" />
                Meta Ad Library
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {influencia.ultimosAds && influencia.ultimosAds.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Últimos Ads Identificados
              </h4>
              <div className="space-y-2">
                {influencia.ultimosAds.map((ad, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{ad.titulo}</p>
                      <p className="text-xs text-muted-foreground">{ad.tipo} • {ad.data}</p>
                    </div>
                    {ad.link && (
                      <a href={ad.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {influencia.ultimosLPs && influencia.ultimosLPs.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Landing Pages Identificadas
              </h4>
              <div className="space-y-2">
                {influencia.ultimosLPs.map((lp, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{lp.titulo}</p>
                      <p className="text-xs text-muted-foreground">{lp.tipo}</p>
                    </div>
                    <a href={lp.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {influencia.insights && influencia.insights.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Insights de Estratégia
              </h4>
              <ul className="space-y-1">
                {influencia.insights.map((insight, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {influencia.oQueAprender && influencia.oQueAprender.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-500" />
                O Que Aprender
              </h4>
              <ul className="space-y-1">
                {influencia.oQueAprender.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botão Usar como Modelo */}
          <div className="pt-4 border-t">
            <Button 
              className="w-full"
              onClick={() => {
                const modeloParaSalvar = {
                  nome: influencia.nome,
                  tipo: "influencia",
                  fonteNome: influencia.nome,
                  fonteTipo: influencia.tipo === "direta" ? "Influência Direta" : "Influência Indireta",
                  conteudo: {
                    descricao: influencia.descricao,
                    categoria: influencia.categoria,
                    fundadores: influencia.fundadores,
                    produtos: influencia.produtos,
                    insights: influencia.insights,
                    oQueAprender: influencia.oQueAprender,
                  },
                  createdAt: new Date().toISOString(),
                };
                const modelosSalvos = JSON.parse(localStorage.getItem("meusModelos") || "[]");
                modelosSalvos.push({ ...modeloParaSalvar, id: Date.now() });
                localStorage.setItem("meusModelos", JSON.stringify(modelosSalvos));
                onClose();
              }}
            >
              <Layers className="h-4 w-4 mr-2" />
              Usar como Modelo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Influencias() {
  const [tipoFiltro, setTipoFiltro] = useState<"todas" | TipoInfluencia>("todas");
  const [categoriaFiltro, setCategoriaFiltro] = useState<"todas" | CategoriaInfluencia>("todas");
  const [pesoFiltro, setPesoFiltro] = useState<"todos" | string>("todos");
  const [busca, setBusca] = useState("");
  const [influenciaSelecionada, setInfluenciaSelecionada] = useState<Influencia | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [, setLocation] = useLocation();

  // Função para salvar como modelo
  const salvarComoModelo = (influencia: Influencia) => {
    const modeloParaSalvar = {
      nome: influencia.nome,
      tipo: "influencia",
      fonteNome: influencia.nome,
      fonteTipo: influencia.tipo === "direta" ? "Influência Direta" : "Influência Indireta",
      conteudo: {
        descricao: influencia.descricao,
        categoria: influencia.categoria,
        fundadores: influencia.fundadores,
        produtos: influencia.produtos,
        insights: influencia.insights,
        oQueAprender: influencia.oQueAprender,
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

  const influenciasFiltradas = todasInfluencias.filter(i => {
    if (tipoFiltro !== "todas" && i.tipo !== tipoFiltro) return false;
    if (categoriaFiltro !== "todas" && i.categoria !== categoriaFiltro) return false;
    if (pesoFiltro !== "todos" && i.peso !== parseInt(pesoFiltro)) return false;
    if (busca) {
      const searchLower = busca.toLowerCase();
      return (
        i.nome.toLowerCase().includes(searchLower) ||
        i.descricao.toLowerCase().includes(searchLower) ||
        i.fundadores?.some(f => f.toLowerCase().includes(searchLower)) ||
        i.produtos?.some(p => p.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const influenciasPorCategoria = influenciasFiltradas.reduce((acc, i) => {
    if (!acc[i.categoria]) acc[i.categoria] = [];
    acc[i.categoria].push(i);
    return acc;
  }, {} as Record<CategoriaInfluencia, Influencia[]>);

  const totalDiretas = influenciasDiretas.length;
  const totalIndiretas = influenciasIndiretas.length;
  const totalPeso5 = todasInfluencias.filter(i => i.peso === 5).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Mapa de Influências
          </h1>
          <p className="text-muted-foreground">
            {totalInfluencias} referências • {totalDiretas} diretas • {totalIndiretas} indiretas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Influências Diretas</p>
                <p className="text-2xl font-bold text-red-400">{totalDiretas}</p>
              </div>
              <Target className="h-8 w-8 text-red-500/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Mercado de educação</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Influências Indiretas</p>
                <p className="text-2xl font-bold text-purple-400">{totalIndiretas}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Grandes marcas globais</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peso Crítico</p>
                <p className="text-2xl font-bold text-orange-400">{totalPeso5}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Referências essenciais</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categorias</p>
                <p className="text-2xl font-bold text-green-400">{Object.keys(categoriaLabels).length}</p>
              </div>
              <Filter className="h-8 w-8 text-green-500/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Segmentos mapeados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar influência, fundador, produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={tipoFiltro} onValueChange={(v) => setTipoFiltro(v as "todas" | TipoInfluencia)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="direta">Diretas</SelectItem>
                <SelectItem value="indireta">Indiretas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoriaFiltro} onValueChange={(v) => setCategoriaFiltro(v as "todas" | CategoriaInfluencia)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Categorias</SelectItem>
                {Object.entries(categoriaLabels).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={pesoFiltro} onValueChange={setPesoFiltro}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Peso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Pesos</SelectItem>
                <SelectItem value="5">Peso 5 - Crítico</SelectItem>
                <SelectItem value="4">Peso 4 - Alto</SelectItem>
                <SelectItem value="3">Peso 3 - Médio</SelectItem>
                <SelectItem value="2">Peso 2 - Baixo</SelectItem>
                <SelectItem value="1">Peso 1 - Referência</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-sm">
              {influenciasFiltradas.length} resultados
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList className="bg-zinc-900/50 border border-zinc-800">
          <TabsTrigger value="todas" onClick={() => setTipoFiltro("todas")}>
            Todas ({totalInfluencias})
          </TabsTrigger>
          <TabsTrigger value="diretas" onClick={() => setTipoFiltro("direta")}>
            <Target className="h-4 w-4 mr-2" />
            Diretas ({totalDiretas})
          </TabsTrigger>
          <TabsTrigger value="indiretas" onClick={() => setTipoFiltro("indireta")}>
            <Crown className="h-4 w-4 mr-2" />
            Indiretas ({totalIndiretas})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-6">
          {Object.entries(influenciasPorCategoria).map(([categoria, influencias]) => (
            <div key={categoria}>
              <div className="flex items-center gap-2 mb-4">
                {categoriaLabels[categoria as CategoriaInfluencia]?.icon}
                <h3 className="text-lg font-semibold">
                  {categoriaLabels[categoria as CategoriaInfluencia]?.label || categoria}
                </h3>
                <Badge variant="outline">{influencias.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {influencias.sort((a, b) => b.peso - a.peso).map((influencia) => (
                  <InfluenciaCard
                    key={influencia.id}
                    influencia={influencia}
                    onSelect={() => {
                      setInfluenciaSelecionada(influencia);
                      setModalAberto(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="diretas" className="space-y-6">
          {Object.entries(influenciasPorCategoria)
            .filter(([_, influencias]) => influencias.some(i => i.tipo === "direta"))
            .map(([categoria, influencias]) => (
              <div key={categoria}>
                <div className="flex items-center gap-2 mb-4">
                  {categoriaLabels[categoria as CategoriaInfluencia]?.icon}
                  <h3 className="text-lg font-semibold">
                    {categoriaLabels[categoria as CategoriaInfluencia]?.label || categoria}
                  </h3>
                  <Badge variant="outline">{influencias.filter(i => i.tipo === "direta").length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {influencias
                    .filter(i => i.tipo === "direta")
                    .sort((a, b) => b.peso - a.peso)
                    .map((influencia) => (
                      <InfluenciaCard
                        key={influencia.id}
                        influencia={influencia}
                        onSelect={() => {
                          setInfluenciaSelecionada(influencia);
                          setModalAberto(true);
                        }}
                      />
                    ))}
                </div>
              </div>
            ))}
        </TabsContent>

        <TabsContent value="indiretas" className="space-y-6">
          {Object.entries(influenciasPorCategoria)
            .filter(([_, influencias]) => influencias.some(i => i.tipo === "indireta"))
            .map(([categoria, influencias]) => (
              <div key={categoria}>
                <div className="flex items-center gap-2 mb-4">
                  {categoriaLabels[categoria as CategoriaInfluencia]?.icon}
                  <h3 className="text-lg font-semibold">
                    {categoriaLabels[categoria as CategoriaInfluencia]?.label || categoria}
                  </h3>
                  <Badge variant="outline">{influencias.filter(i => i.tipo === "indireta").length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {influencias
                    .filter(i => i.tipo === "indireta")
                    .sort((a, b) => b.peso - a.peso)
                    .map((influencia) => (
                      <InfluenciaCard
                        key={influencia.id}
                        influencia={influencia}
                        onSelect={() => {
                          setInfluenciaSelecionada(influencia);
                          setModalAberto(true);
                        }}
                      />
                    ))}
                </div>
              </div>
            ))}
        </TabsContent>
      </Tabs>

      <InfluenciaModal
        influencia={influenciaSelecionada}
        open={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}
