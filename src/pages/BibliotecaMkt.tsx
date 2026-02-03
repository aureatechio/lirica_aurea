import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  BookOpen, 
  Rocket, 
  Filter, 
  Star, 
  Calendar, 
  User, 
  Target, 
  Lightbulb,
  Quote,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
  Sparkles,
  Library,
  Brain,
  Zap,
  Heart,
  Layers
} from "lucide-react";
import { useLocation } from "wouter";
import { 
  campanhasIconicas, 
  livrosMkt, 
  getCategorias, 
  getNichos, 
  getInfoprodutores, 
  getTiposLancamento,
  buscarCampanhas,
  buscarLivros,
  type CampanhaIconica,
  type LivroMkt
} from "@/data/bibliotecaMktData";

// Componente de Comparação com IA
function ComparacaoIA() {
  const [estrategia, setEstrategia] = useState("");
  const [tipoComparacao, setTipoComparacao] = useState<"campanha" | "livro" | "ambos">("ambos");
  const [resultado, setResultado] = useState<any>(null);
  
  const compararMutation = trpc.biblioteca.comparar.useMutation({
    onSuccess: (data) => {
      setResultado(data);
      toast.success("Análise concluída!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao analisar estratégia");
    }
  });

  const handleComparar = () => {
    if (estrategia.length < 10) {
      toast.error("Descreva sua estratégia com pelo menos 10 caracteres");
      return;
    }
    compararMutation.mutate({ estrategia, tipo: tipoComparacao });
  };

  return (
    <div className="space-y-6">
      {/* Input de Estratégia */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Compare sua Estratégia
          </CardTitle>
          <CardDescription>
            Descreva sua estratégia de campanha e a IA encontrará referências similares na biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ex: Quero fazer um lançamento de um curso de finanças pessoais usando uma sequência de 3 vídeos de conteúdo gratuito, seguido de uma live de vendas com escassez real de vagas..."
            value={estrategia}
            onChange={(e) => setEstrategia(e.target.value)}
            className="min-h-[120px] bg-zinc-800/50 border-zinc-700 text-white"
          />
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Buscar em:</span>
              <Select value={tipoComparacao} onValueChange={(v: "campanha" | "livro" | "ambos") => setTipoComparacao(v)}>
                <SelectTrigger className="w-[180px] bg-zinc-800/50 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ambos">Campanhas e Livros</SelectItem>
                  <SelectItem value="campanha">Apenas Campanhas</SelectItem>
                  <SelectItem value="livro">Apenas Livros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleComparar}
              disabled={compararMutation.isPending || estrategia.length < 10}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {compararMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analisando...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Comparar com IA</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultado da Comparação */}
      {resultado && (
        <div className="space-y-6">
          {/* Análise Geral */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Análise da Estratégia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 whitespace-pre-line">{resultado.analise}</p>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">Score de Originalidade:</span>
                  <Badge className={resultado.scoreOriginalidade >= 70 ? "bg-green-500/20 text-green-400" : resultado.scoreOriginalidade >= 40 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}>
                    {resultado.scoreOriginalidade}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campanhas Similares */}
          {resultado.campanhasSimilares?.length > 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-orange-400" />
                  Campanhas Similares ({resultado.campanhasSimilares.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resultado.campanhasSimilares.map((c: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{c.nome}</h4>
                        <p className="text-sm text-zinc-400">{c.infoprodutor} • {c.pais} • {c.ano}</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400">
                        {c.similaridade}% similar
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      <div className="p-2 rounded bg-green-500/10 border border-green-500/30">
                        <p className="text-xs text-green-400 font-medium mb-1">O que funcionou</p>
                        <p className="text-sm text-zinc-300">{c.oQueFuncionou}</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
                        <p className="text-xs text-red-400 font-medium mb-1">O que evitar</p>
                        <p className="text-sm text-zinc-300">{c.oQueEvitar}</p>
                      </div>
                      <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30">
                        <p className="text-xs text-blue-400 font-medium mb-1">Como adaptar</p>
                        <p className="text-sm text-zinc-300">{c.comoAdaptar}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Livros Recomendados */}
          {resultado.livrosRecomendados?.length > 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  Livros Recomendados ({resultado.livrosRecomendados.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resultado.livrosRecomendados.map((l: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <h4 className="font-semibold text-white">{l.titulo}</h4>
                    <p className="text-sm text-zinc-400 mb-2">por {l.autor}</p>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-purple-400">Por que relevante:</span> <span className="text-zinc-300">{l.porqueRelevante}</span></p>
                      <p className="text-sm"><span className="text-blue-400">Conceito-chave:</span> <span className="text-zinc-300">{l.conceitoChave}</span></p>
                      <p className="text-sm"><span className="text-green-400">Como aplicar:</span> <span className="text-zinc-300">{l.comoAplicar}</span></p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Sugestões de Melhoria */}
          {resultado.sugestoesMelhoria?.length > 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Sugestões de Melhoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resultado.sugestoesMelhoria.map((s: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <p className="text-white font-medium">{s.sugestao}</p>
                    <p className="text-sm text-zinc-400 mt-1">Baseado em: {s.baseadoEm}</p>
                    <p className="text-sm text-green-400 mt-1">Impacto esperado: {s.impactoEsperado}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Riscos Identificados */}
          {resultado.riscosIdentificados?.length > 0 && (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Riscos Identificados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resultado.riscosIdentificados.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default function BibliotecaMkt() {
  const [activeTab, setActiveTab] = useState("campanhas");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroNicho, setFiltroNicho] = useState("todos");
  const [filtroInfoprodutor, setFiltroInfoprodutor] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroDificuldade, setFiltroDificuldade] = useState("todas");
  const [filtroPais, setFiltroPais] = useState("todos");
  
  const [campanhaDetalhe, setCampanhaDetalhe] = useState<CampanhaIconica | null>(null);
  const [livroDetalhe, setLivroDetalhe] = useState<LivroMkt | null>(null);

  // Filtrar campanhas
  const campanhasFiltradas = campanhasIconicas.filter(c => {
    const matchSearch = searchTerm === "" || 
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.infoprodutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.estrategia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchNicho = filtroNicho === "todos" || c.nicho === filtroNicho;
    const matchInfoprodutor = filtroInfoprodutor === "todos" || c.infoprodutor === filtroInfoprodutor;
    const matchTipo = filtroTipo === "todos" || c.tipoLancamento === filtroTipo;
    const matchPais = filtroPais === "todos" || c.pais === filtroPais;
    
    return matchSearch && matchNicho && matchInfoprodutor && matchTipo && matchPais;
  });

  // Filtrar livros
  const livrosFiltrados = livrosMkt.filter(l => {
    const matchSearch = searchTerm === "" || 
      l.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.sinopse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchCategoria = filtroCategoria === "todas" || l.categoria === filtroCategoria;
    const matchDificuldade = filtroDificuldade === "todas" || l.nivelDificuldade === filtroDificuldade;
    
    return matchSearch && matchCategoria && matchDificuldade;
  });

  const categorias = getCategorias();
  const nichos = getNichos();
  const infoprodutores = getInfoprodutores();
  const tiposLancamento = getTiposLancamento();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-600'}`} 
      />
    ));
  };

  const getDificuldadeColor = (nivel: string) => {
    switch (nivel) {
      case "iniciante": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediario": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "avancado": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <Library className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Biblioteca de MKT Digital</h1>
              <p className="text-zinc-400">Campanhas icônicas e livros fundamentais para sua estratégia</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{campanhasIconicas.length}</p>
                  <p className="text-xs text-zinc-400">Campanhas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{livrosMkt.length}</p>
                  <p className="text-xs text-zinc-400">Livros</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-3">
                <User className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{infoprodutores.length}</p>
                  <p className="text-xs text-zinc-400">Infoprodutores</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-3">
                <Brain className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{categorias.length}</p>
                  <p className="text-xs text-zinc-400">Categorias</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <Input
            placeholder="Buscar campanhas, livros, autores, estratégias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900/50 border-zinc-700 text-white h-12"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1">
            <TabsTrigger value="campanhas" className="data-[state=active]:bg-purple-600">
              <Rocket className="w-4 h-4 mr-2" />
              Campanhas Icônicas
            </TabsTrigger>
            <TabsTrigger value="livros" className="data-[state=active]:bg-purple-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Livros Fundamentais
            </TabsTrigger>
            <TabsTrigger value="comparar" className="data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Comparar com IA
            </TabsTrigger>
          </TabsList>

          {/* Campanhas Tab */}
          <TabsContent value="campanhas" className="space-y-4">
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <Select value={filtroInfoprodutor} onValueChange={setFiltroInfoprodutor}>
                <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-700">
                  <SelectValue placeholder="Infoprodutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Infoprodutores</SelectItem>
                  {infoprodutores.map(i => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-700">
                  <SelectValue placeholder="Tipo de Lançamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  {tiposLancamento.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroPais} onValueChange={setFiltroPais}>
                <SelectTrigger className="w-[150px] bg-zinc-900/50 border-zinc-700">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Países</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="EUA">EUA</SelectItem>
                </SelectContent>
              </Select>

              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                {campanhasFiltradas.length} campanhas
              </Badge>
            </div>

            {/* Lista de Campanhas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campanhasFiltradas.map(campanha => (
                <Card 
                  key={campanha.id} 
                  className="bg-zinc-900/50 border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer group"
                  onClick={() => setCampanhaDetalhe(campanha)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                        {campanha.tipoLancamento}
                      </Badge>
                      <Badge variant="outline" className={campanha.pais === "Brasil" ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"}>
                        {campanha.pais === "Brasil" ? "🇧🇷" : "🇺🇸"} {campanha.pais}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                      {campanha.nome}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {campanha.infoprodutor} • {campanha.ano}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                      {campanha.bigIdea}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {campanha.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                          {tag}
                        </Badge>
                      ))}
                      {campanha.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                          +{campanha.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Livros Tab */}
          <TabsContent value="livros" className="space-y-4">
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-700">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas Categorias</SelectItem>
                  {categorias.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroDificuldade} onValueChange={setFiltroDificuldade}>
                <SelectTrigger className="w-[150px] bg-zinc-900/50 border-zinc-700">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos os Níveis</SelectItem>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                </SelectContent>
              </Select>

              <Badge variant="outline" className="border-green-500/30 text-green-400">
                {livrosFiltrados.length} livros
              </Badge>
            </div>

            {/* Lista de Livros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {livrosFiltrados.map(livro => (
                <Card 
                  key={livro.id} 
                  className="bg-zinc-900/50 border-zinc-800 hover:border-green-500/50 transition-all cursor-pointer group"
                  onClick={() => setLivroDetalhe(livro)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                        {livro.categoria}
                      </Badge>
                      <Badge variant="outline" className={getDificuldadeColor(livro.nivelDificuldade)}>
                        {livro.nivelDificuldade === "iniciante" ? "Iniciante" : 
                         livro.nivelDificuldade === "intermediario" ? "Intermediário" : "Avançado"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors">
                      {livro.titulo}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {livro.autor} • {livro.anoPublicacao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(livro.rating)}
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                      {livro.sinopse}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {livro.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-zinc-800 text-zinc-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comparar com IA Tab */}
          <TabsContent value="comparar" className="space-y-6">
            <ComparacaoIA />
          </TabsContent>
        </Tabs>

        {/* Modal Detalhe Campanha */}
        <Dialog open={!!campanhaDetalhe} onOpenChange={() => setCampanhaDetalhe(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  {campanhaDetalhe?.tipoLancamento}
                </Badge>
                <Badge variant="outline" className={campanhaDetalhe?.pais === "Brasil" ? "border-green-500/30 text-green-400" : "border-red-500/30 text-red-400"}>
                  {campanhaDetalhe?.pais === "Brasil" ? "🇧🇷" : "🇺🇸"} {campanhaDetalhe?.pais}
                </Badge>
              </div>
              <DialogTitle className="text-2xl text-white">{campanhaDetalhe?.nome}</DialogTitle>
              <DialogDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {campanhaDetalhe?.infoprodutor}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {campanhaDetalhe?.ano}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" /> {campanhaDetalhe?.nicho}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Big Idea */}
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-purple-400">Big Idea</h3>
                  </div>
                  <p className="text-white text-lg">{campanhaDetalhe?.bigIdea}</p>
                </div>

                {/* Copy Principal */}
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Quote className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-blue-400">Copy Principal</h3>
                  </div>
                  <p className="text-white italic">"{campanhaDetalhe?.copyPrincipal}"</p>
                </div>

                {/* Estratégia */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-orange-400" /> Estratégia
                  </h3>
                  <p className="text-zinc-300">{campanhaDetalhe?.estrategia}</p>
                </div>

                {/* Resultados */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" /> Resultados
                  </h3>
                  <p className="text-zinc-300">{campanhaDetalhe?.resultados}</p>
                </div>

                {/* Gatilhos Mentais */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-pink-400" /> Gatilhos Mentais
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {campanhaDetalhe?.gatilhosMentais.map(g => (
                      <Badge key={g} className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Elementos Chave */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-400" /> Elementos Chave
                  </h3>
                  <ul className="space-y-1">
                    {campanhaDetalhe?.elementosChave.map(e => (
                      <li key={e} className="flex items-center gap-2 text-zinc-300">
                        <ArrowRight className="w-4 h-4 text-cyan-400" /> {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lições */}
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-semibold text-yellow-400">Lições Aprendidas</h3>
                  </div>
                  <p className="text-zinc-300">{campanhaDetalhe?.licoes}</p>
                </div>

                {/* Fontes */}
                {campanhaDetalhe?.fontes && campanhaDetalhe.fontes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-400" /> Fontes e Referências
                    </h3>
                    <div className="space-y-2">
                      {campanhaDetalhe.fontes.map((fonte, idx) => (
                        <a 
                          key={idx}
                          href={fonte.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-blue-500/50 transition-all group"
                        >
                          <Badge variant="outline" className={`text-xs ${
                            fonte.tipo === 'video' ? 'border-red-500/30 text-red-400' :
                            fonte.tipo === 'podcast' ? 'border-green-500/30 text-green-400' :
                            fonte.tipo === 'livro' ? 'border-purple-500/30 text-purple-400' :
                            fonte.tipo === 'curso' ? 'border-blue-500/30 text-blue-400' :
                            'border-zinc-500/30 text-zinc-400'
                          }`}>
                            {fonte.tipo === 'video' ? '🎥 Vídeo' :
                             fonte.tipo === 'podcast' ? '🎧 Podcast' :
                             fonte.tipo === 'livro' ? '📚 Livro' :
                             fonte.tipo === 'curso' ? '🎓 Curso' :
                             '📝 Artigo'}
                          </Badge>
                          <span className="text-zinc-300 group-hover:text-blue-400 transition-colors flex-1">
                            {fonte.titulo}
                          </span>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <h3 className="font-semibold text-white mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {campanhaDetalhe?.tags.map(t => (
                      <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Botão Usar como Modelo */}
                <div className="pt-4 border-t border-zinc-800">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                      if (campanhaDetalhe) {
                        const modelo = {
                          id: `campanha-${campanhaDetalhe.id}-${Date.now()}`,
                          tipo: 'campanha' as const,
                          nome: campanhaDetalhe.nome,
                          fonte: `Biblioteca MKT - ${campanhaDetalhe.infoprodutor}`,
                          conteudo: {
                            bigIdea: campanhaDetalhe.bigIdea,
                            copyPrincipal: campanhaDetalhe.copyPrincipal,
                            estrategia: campanhaDetalhe.estrategia,
                            gatilhosMentais: campanhaDetalhe.gatilhosMentais,
                            elementosChave: campanhaDetalhe.elementosChave,
                            licoes: campanhaDetalhe.licoes
                          },
                          dataCriacao: new Date().toISOString(),
                          tags: campanhaDetalhe.tags
                        };
                        const modelos = JSON.parse(localStorage.getItem('meus-modelos') || '[]');
                        modelos.push(modelo);
                        localStorage.setItem('meus-modelos', JSON.stringify(modelos));
                        toast.success(`"${campanhaDetalhe.nome}" salvo em Meus Modelos!`);
                        setCampanhaDetalhe(null);
                      }
                    }}
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Usar como Modelo
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Modal Detalhe Livro */}
        <Dialog open={!!livroDetalhe} onOpenChange={() => setLivroDetalhe(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  {livroDetalhe?.categoria}
                </Badge>
                {livroDetalhe?.subcategoria && (
                  <Badge variant="outline" className="border-zinc-500/30 text-zinc-400">
                    {livroDetalhe.subcategoria}
                  </Badge>
                )}
                <Badge variant="outline" className={getDificuldadeColor(livroDetalhe?.nivelDificuldade || "")}>
                  {livroDetalhe?.nivelDificuldade === "iniciante" ? "Iniciante" : 
                   livroDetalhe?.nivelDificuldade === "intermediario" ? "Intermediário" : "Avançado"}
                </Badge>
              </div>
              <DialogTitle className="text-2xl text-white">{livroDetalhe?.titulo}</DialogTitle>
              {livroDetalhe?.tituloOriginal && livroDetalhe.tituloOriginal !== livroDetalhe.titulo && (
                <p className="text-sm text-zinc-500 italic">Original: {livroDetalhe.tituloOriginal}</p>
              )}
              <DialogDescription className="flex items-center gap-4 text-base">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {livroDetalhe?.autor}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {livroDetalhe?.anoPublicacao}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {livroDetalhe?.idioma}
                </span>
              </DialogDescription>
              <div className="flex items-center gap-1 mt-2">
                {livroDetalhe && renderStars(livroDetalhe.rating)}
              </div>
            </DialogHeader>
            
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Sinopse */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-400" /> Sinopse
                  </h3>
                  <p className="text-zinc-300">{livroDetalhe?.sinopse}</p>
                </div>

                {/* Principais Conceitos */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" /> Principais Conceitos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {livroDetalhe?.principaisConceitos.map(c => (
                      <Badge key={c} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Citações Chave */}
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Quote className="w-5 h-5 text-blue-400" /> Citações Chave
                  </h3>
                  <div className="space-y-2">
                    {livroDetalhe?.citacoesChave.map((c, i) => (
                      <div key={i} className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-white italic">"{c}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aplicação Prática */}
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <h3 className="font-semibold text-green-400">Aplicação Prática</h3>
                  </div>
                  <p className="text-zinc-300">{livroDetalhe?.aplicacaoPratica}</p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-semibold text-white mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {livroDetalhe?.tags.map(t => (
                      <Badge key={t} variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Botão Usar como Modelo */}
                <div className="pt-4 border-t border-zinc-800">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => {
                      if (livroDetalhe) {
                        const modelo = {
                          id: `livro-${livroDetalhe.id}-${Date.now()}`,
                          tipo: 'livro' as const,
                          nome: livroDetalhe.titulo,
                          fonte: `Biblioteca MKT - ${livroDetalhe.autor}`,
                          conteudo: {
                            sinopse: livroDetalhe.sinopse,
                            principaisConceitos: livroDetalhe.principaisConceitos,
                            citacoesChave: livroDetalhe.citacoesChave,
                            aplicacaoPratica: livroDetalhe.aplicacaoPratica
                          },
                          dataCriacao: new Date().toISOString(),
                          tags: livroDetalhe.tags
                        };
                        const modelos = JSON.parse(localStorage.getItem('meus-modelos') || '[]');
                        modelos.push(modelo);
                        localStorage.setItem('meus-modelos', JSON.stringify(modelos));
                        toast.success(`"${livroDetalhe.titulo}" salvo em Meus Modelos!`);
                        setLivroDetalhe(null);
                      }
                    }}
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Usar como Modelo
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
  );
}
