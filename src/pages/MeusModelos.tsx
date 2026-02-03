import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Layers, 
  Plus, 
  Search, 
  Star, 
  StarOff, 
  Trash2, 
  Copy, 
  ExternalLink,
  Combine,
  Wand2,
  FileText,
  Video,
  Lightbulb,
  Target,
  Filter,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  History,
  Sparkles,
  ChevronRight,
  RotateCcw,
  GitBranch,
  Eye,
  ArrowLeft
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Tipos de modelo
const tiposModelo = {
  tendencia: { label: "Tendência", icon: TrendingUp, color: "bg-blue-500" },
  influencia: { label: "Influência", icon: Users, color: "bg-purple-500" },
  ref_historica: { label: "Ref. Histórica", icon: History, color: "bg-amber-500" },
  repositorio: { label: "Repositório", icon: FileText, color: "bg-green-500" },
  campanha_iconica: { label: "Campanha Icônica", icon: Target, color: "bg-red-500" },
  livro: { label: "Livro", icon: BookOpen, color: "bg-indigo-500" },
  combinado: { label: "Combinado", icon: Combine, color: "bg-pink-500" },
  criado: { label: "Criado", icon: Sparkles, color: "bg-cyan-500" },
};

// Filtros de criação
const filtrosCriacao = [
  { id: "copyLP", label: "Copy de LP", icon: FileText },
  { id: "bigIdea", label: "Big Idea", icon: Lightbulb },
  { id: "roteiro", label: "Roteiro em Vídeo", icon: Video },
  { id: "estrategia", label: "Estratégia", icon: Target },
  { id: "geral", label: "Geral (Todos)", icon: Layers },
];

// Tipo do modelo
interface ModeloData {
  id: number;
  nome: string;
  tipo: keyof typeof tiposModelo;
  fonteNome?: string;
  fonteTipo?: string;
  conteudo: {
    titulo?: string;
    descricao?: string;
    bigIdea?: string;
    copyLP?: string;
    roteiro?: string;
    estrategia?: string;
    gatilhos?: string[];
    elementos?: string[];
  };
  modelosBase?: number[];
  promptCombinacao?: string;
  filtrosCriacao?: Record<string, boolean>;
  favorito: boolean;
  createdAt: Date;
  versaoAtual?: number;
  versoes?: ModeloVersion[];
}

// Tipo de versão do modelo
interface ModeloVersion {
  id: number;
  versao: number;
  nome: string;
  conteudo: ModeloData["conteudo"];
  descricaoAlteracao?: string;
  createdAt: Date;
}

// Dados mockados para demonstração
const modelosMock: ModeloData[] = [
  {
    id: 1,
    nome: "Apple 1984 - Adaptação",
    tipo: "ref_historica" as const,
    fonteNome: "Apple 1984 Super Bowl",
    fonteTipo: "Campanha Clássica",
    conteudo: {
      titulo: "Think Different para Jornada Exponencial",
      descricao: "Adaptação do conceito revolucionário da Apple para o contexto de mentorias de negócios",
      bigIdea: "Você não precisa seguir as regras do mercado tradicional",
      copyLP: "Em um mundo onde todos fazem igual, os que pensam diferente dominam...",
      estrategia: "Posicionamento disruptivo + escassez + autoridade",
      gatilhos: ["Exclusividade", "Pertencimento", "Autoridade"],
    },
    favorito: true,
    createdAt: new Date("2024-01-15"),
    versaoAtual: 3,
    versoes: [
      {
        id: 101,
        versao: 1,
        nome: "Apple 1984 - Rascunho",
        conteudo: {
          titulo: "Think Different",
          descricao: "Primeira versão do conceito",
          bigIdea: "Pense diferente",
        },
        descricaoAlteracao: "Versão inicial criada",
        createdAt: new Date("2024-01-10"),
      },
      {
        id: 102,
        versao: 2,
        nome: "Apple 1984 - Refinamento",
        conteudo: {
          titulo: "Think Different para Negócios",
          descricao: "Adaptação para contexto de mentorias",
          bigIdea: "Você não precisa seguir o mercado",
          copyLP: "Em um mundo onde todos fazem igual...",
        },
        descricaoAlteracao: "Adicionado copy de LP e refinado Big Idea",
        createdAt: new Date("2024-01-12"),
      },
      {
        id: 103,
        versao: 3,
        nome: "Apple 1984 - Adaptação",
        conteudo: {
          titulo: "Think Different para Jornada Exponencial",
          descricao: "Adaptação do conceito revolucionário da Apple para o contexto de mentorias de negócios",
          bigIdea: "Você não precisa seguir as regras do mercado tradicional",
          copyLP: "Em um mundo onde todos fazem igual, os que pensam diferente dominam...",
          estrategia: "Posicionamento disruptivo + escassez + autoridade",
          gatilhos: ["Exclusividade", "Pertencimento", "Autoridade"],
        },
        descricaoAlteracao: "Versão final com estratégia e gatilhos",
        createdAt: new Date("2024-01-15"),
      },
    ],
  },
  {
    id: 2,
    nome: "Fórmula de Lançamento + Desafio",
    tipo: "combinado" as const,
    fonteNome: "Erico Rocha + Ladeira",
    fonteTipo: "Combinação",
    conteudo: {
      titulo: "Híbrido PLF + Desafio 7 Dias",
      descricao: "Combinação da estrutura de lançamento do Erico com o engajamento do desafio do Ladeira",
      bigIdea: "Transformação em 7 dias com método validado",
      estrategia: "CPL + Desafio gratuito + Oferta no final",
      gatilhos: ["Urgência", "Prova Social", "Reciprocidade"],
    },
    modelosBase: [3, 4],
    promptCombinacao: "Combine a estrutura de CPLs do Erico Rocha com o formato de desafio de 7 dias do Ladeira",
    favorito: false,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 3,
    nome: "Roteiro VSL - Hormozi Style",
    tipo: "criado" as const,
    fonteNome: "Alex Hormozi - $100M Offers",
    fonteTipo: "Livro",
    conteudo: {
      titulo: "VSL de Alta Conversão",
      roteiro: "Hook: O que você está prestes a ver vai mudar sua forma de pensar sobre [NICHO]...\n\nProblema: A maioria das pessoas...\n\nSolução: Existe um método...\n\nProva: Nos últimos 12 meses...\n\nOferta: Por isso criei...",
      estrategia: "Oferta irresistível + Stack de valor + Garantia reversa",
    },
    filtrosCriacao: { roteiro: true, bigIdea: true },
    favorito: true,
    createdAt: new Date("2024-02-10"),
  },
];

export default function MeusModelos() {
  const [modelos, setModelos] = useState<ModeloData[]>(modelosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloData | null>(null);
  const [showCombinar, setShowCombinar] = useState(false);
  const [showCriar, setShowCriar] = useState(false);
  const [modelosParaCombinar, setModelosParaCombinar] = useState<number[]>([]);
  const [promptCombinacao, setPromptCombinacao] = useState("");
  const [filtrosCriacaoSelecionados, setFiltrosCriacaoSelecionados] = useState<string[]>(["geral"]);
  const [modeloBaseCriacao, setModeloBaseCriacao] = useState<number | null>(null);
  const [promptCriacao, setPromptCriacao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);
  const [modeloHistorico, setModeloHistorico] = useState<ModeloData | null>(null);
  const [versaoSelecionada, setVersaoSelecionada] = useState<ModeloVersion | null>(null);
  const [showComparacao, setShowComparacao] = useState(false);
  const [versaoComparacao, setVersaoComparacao] = useState<ModeloVersion | null>(null);

  // Filtrar modelos
  const modelosFiltrados = modelos.filter(m => {
    const matchSearch = m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.fonteNome?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filtroTipo === "todos" || m.tipo === filtroTipo;
    return matchSearch && matchTipo;
  });

  // Toggle favorito
  const toggleFavorito = (id: number) => {
    setModelos(prev => prev.map(m => 
      m.id === id ? { ...m, favorito: !m.favorito } : m
    ));
    toast.success("Favorito atualizado!");
  };

  // Excluir modelo
  const excluirModelo = (id: number) => {
    setModelos(prev => prev.filter(m => m.id !== id));
    toast.success("Modelo excluído!");
  };

  // Combinar modelos
  const combinarModelos = async () => {
    if (modelosParaCombinar.length < 2) {
      toast.error("Selecione pelo menos 2 modelos para combinar");
      return;
    }
    if (!promptCombinacao.trim()) {
      toast.error("Descreva como deseja combinar os modelos");
      return;
    }

    setIsLoading(true);
    // Simular chamada à IA
    await new Promise(resolve => setTimeout(resolve, 2000));

    const modelosSelecionados = modelos.filter(m => modelosParaCombinar.includes(m.id));
    const novoModelo = {
      id: Date.now(),
      nome: `Combinação: ${modelosSelecionados.map(m => m.nome.split(" ")[0]).join(" + ")}`,
      tipo: "combinado" as const,
      fonteNome: modelosSelecionados.map(m => m.fonteNome).join(" + "),
      fonteTipo: "Combinação",
      conteudo: {
        titulo: "Modelo Combinado",
        descricao: `Combinação gerada a partir de: ${modelosSelecionados.map(m => m.nome).join(", ")}`,
        bigIdea: "Big Idea gerada pela IA baseada nos modelos selecionados",
        estrategia: "Estratégia híbrida combinando os melhores elementos",
        gatilhos: ["Urgência", "Autoridade", "Prova Social"],
      },
      modelosBase: modelosParaCombinar,
      promptCombinacao,
      favorito: false,
      createdAt: new Date(),
    };

    setModelos(prev => [novoModelo, ...prev]);
    setShowCombinar(false);
    setModelosParaCombinar([]);
    setPromptCombinacao("");
    setIsLoading(false);
    toast.success("Modelos combinados com sucesso!");
  };

  // Criar sobre modelo
  const criarSobreModelo = async () => {
    if (!modeloBaseCriacao) {
      toast.error("Selecione um modelo base");
      return;
    }
    if (!promptCriacao.trim()) {
      toast.error("Descreva o que deseja criar");
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const modeloBase = modelos.find(m => m.id === modeloBaseCriacao);
    const filtrosAtivos = filtrosCriacaoSelecionados.filter(f => f !== "geral");
    
    const novoModelo = {
      id: Date.now(),
      nome: `Criação: ${promptCriacao.slice(0, 30)}...`,
      tipo: "criado" as const,
      fonteNome: modeloBase?.nome || "Modelo Base",
      fonteTipo: "Criação Personalizada",
      conteudo: {
        titulo: promptCriacao.slice(0, 50),
        descricao: `Criado a partir de: ${modeloBase?.nome}`,
        ...(filtrosAtivos.includes("copyLP") || filtrosCriacaoSelecionados.includes("geral") ? {
          copyLP: "Copy de LP gerada pela IA baseada no prompt e modelo selecionado..."
        } : {}),
        ...(filtrosAtivos.includes("bigIdea") || filtrosCriacaoSelecionados.includes("geral") ? {
          bigIdea: "Big Idea gerada pela IA..."
        } : {}),
        ...(filtrosAtivos.includes("roteiro") || filtrosCriacaoSelecionados.includes("geral") ? {
          roteiro: "Roteiro de vídeo gerado pela IA..."
        } : {}),
        ...(filtrosAtivos.includes("estrategia") || filtrosCriacaoSelecionados.includes("geral") ? {
          estrategia: "Estratégia gerada pela IA..."
        } : {}),
      },
      filtrosCriacao: Object.fromEntries(filtrosCriacaoSelecionados.map(f => [f, true])),
      favorito: false,
      createdAt: new Date(),
    };

    setModelos(prev => [novoModelo, ...prev]);
    setShowCriar(false);
    setModeloBaseCriacao(null);
    setPromptCriacao("");
    setFiltrosCriacaoSelecionados(["geral"]);
    setIsLoading(false);
    toast.success("Modelo criado com sucesso!");
  };

  // Abrir histórico de versões
  const abrirHistorico = (modelo: ModeloData) => {
    setModeloHistorico(modelo);
    setShowHistorico(true);
    setVersaoSelecionada(null);
    setVersaoComparacao(null);
    setShowComparacao(false);
  };

  // Reverter para versão anterior
  const reverterVersao = (modelo: ModeloData, versao: ModeloVersion) => {
    // Criar nova versão com o conteúdo da versão selecionada
    const novaVersao: ModeloVersion = {
      id: Date.now(),
      versao: (modelo.versaoAtual || 1) + 1,
      nome: modelo.nome,
      conteudo: { ...versao.conteudo },
      descricaoAlteracao: `Revertido para versão ${versao.versao}`,
      createdAt: new Date(),
    };

    setModelos(prev => prev.map(m => {
      if (m.id === modelo.id) {
        return {
          ...m,
          conteudo: { ...versao.conteudo },
          versaoAtual: novaVersao.versao,
          versoes: [...(m.versoes || []), novaVersao],
        };
      }
      return m;
    }));

    toast.success(`Revertido para versão ${versao.versao}!`, {
      description: "Uma nova versão foi criada com o conteúdo anterior",
    });
    setShowHistorico(false);
  };

  // Salvar nova versão ao editar
  const salvarNovaVersao = (modelo: ModeloData, novoConteudo: ModeloData["conteudo"], descricao: string) => {
    const novaVersao: ModeloVersion = {
      id: Date.now(),
      versao: (modelo.versaoAtual || 1) + 1,
      nome: modelo.nome,
      conteudo: { ...novoConteudo },
      descricaoAlteracao: descricao,
      createdAt: new Date(),
    };

    setModelos(prev => prev.map(m => {
      if (m.id === modelo.id) {
        return {
          ...m,
          conteudo: { ...novoConteudo },
          versaoAtual: novaVersao.versao,
          versoes: [...(m.versoes || []), novaVersao],
        };
      }
      return m;
    }));

    toast.success("Nova versão salva!");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Layers className="h-7 w-7 text-primary" />
              Meus Modelos
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus modelos salvos, combine referências e crie novos materiais
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCombinar} onOpenChange={setShowCombinar}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Combine className="h-4 w-4" />
                  Combinar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Combine className="h-5 w-5" />
                    Combinar Modelos
                  </DialogTitle>
                  <DialogDescription>
                    Selecione modelos para combinar e descreva como deseja mesclá-los
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Selecione os modelos para combinar</Label>
                    <ScrollArea className="h-48 border rounded-md p-2 mt-2">
                      {modelos.map(modelo => (
                        <div key={modelo.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded">
                          <Checkbox
                            checked={modelosParaCombinar.includes(modelo.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setModelosParaCombinar(prev => [...prev, modelo.id]);
                              } else {
                                setModelosParaCombinar(prev => prev.filter(id => id !== modelo.id));
                              }
                            }}
                          />
                          <Badge className={tiposModelo[modelo.tipo].color} variant="secondary">
                            {tiposModelo[modelo.tipo].label}
                          </Badge>
                          <span className="text-sm">{modelo.nome}</span>
                        </div>
                      ))}
                    </ScrollArea>
                    <p className="text-xs text-muted-foreground mt-1">
                      {modelosParaCombinar.length} modelo(s) selecionado(s)
                    </p>
                  </div>
                  <div>
                    <Label>Comando de combinação</Label>
                    <Textarea
                      placeholder="Ex: Combine a estrutura de lançamento do Erico Rocha com o posicionamento disruptivo da Apple 1984 para criar uma campanha do Jornada Exponencial"
                      value={promptCombinacao}
                      onChange={(e) => setPromptCombinacao(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={combinarModelos} 
                    className="w-full gap-2"
                    disabled={isLoading || modelosParaCombinar.length < 2}
                  >
                    {isLoading ? (
                      <>Combinando...</>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Combinar com IA
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showCriar} onOpenChange={setShowCriar}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  Criar sobre Modelo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Criar sobre Modelo
                  </DialogTitle>
                  <DialogDescription>
                    Selecione um modelo base e defina o que deseja criar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Modelo base</Label>
                    <Select value={modeloBaseCriacao?.toString() || ""} onValueChange={(v) => setModeloBaseCriacao(Number(v))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelos.map(modelo => (
                          <SelectItem key={modelo.id} value={modelo.id.toString()}>
                            {modelo.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>O que deseja gerar?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {filtrosCriacao.map(filtro => (
                        <div
                          key={filtro.id}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                            filtrosCriacaoSelecionados.includes(filtro.id) 
                              ? "border-primary bg-primary/10" 
                              : "hover:border-muted-foreground"
                          }`}
                          onClick={() => {
                            if (filtro.id === "geral") {
                              setFiltrosCriacaoSelecionados(["geral"]);
                            } else {
                              setFiltrosCriacaoSelecionados(prev => {
                                const newFilters = prev.filter(f => f !== "geral");
                                if (prev.includes(filtro.id)) {
                                  return newFilters.filter(f => f !== filtro.id);
                                }
                                return [...newFilters, filtro.id];
                              });
                            }
                          }}
                        >
                          <filtro.icon className="h-4 w-4" />
                          <span className="text-sm">{filtro.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Descreva o que deseja criar</Label>
                    <Textarea
                      placeholder="Ex: Crie uma copy de LP para o Jornada Exponencial usando o estilo disruptivo da Apple 1984, focando em empreendedores que querem escalar seus negócios"
                      value={promptCriacao}
                      onChange={(e) => setPromptCriacao(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={criarSobreModelo} 
                    className="w-full gap-2"
                    disabled={isLoading || !modeloBaseCriacao}
                  >
                    {isLoading ? (
                      <>Criando...</>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Criar com IA
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar modelos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              {Object.entries(tiposModelo).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList>
            <TabsTrigger value="todos">Todos ({modelos.length})</TabsTrigger>
            <TabsTrigger value="favoritos">
              <Star className="h-4 w-4 mr-1" />
              Favoritos ({modelos.filter(m => m.favorito).length})
            </TabsTrigger>
            <TabsTrigger value="combinados">
              <Combine className="h-4 w-4 mr-1" />
              Combinados ({modelos.filter(m => m.tipo === "combinado").length})
            </TabsTrigger>
            <TabsTrigger value="criados">
              <Sparkles className="h-4 w-4 mr-1" />
              Criados ({modelos.filter(m => m.tipo === "criado").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelosFiltrados.map(modelo => (
                <ModeloCard
                  key={modelo.id}
                  modelo={modelo}
                  onToggleFavorito={() => toggleFavorito(modelo.id)}
                  onExcluir={() => excluirModelo(modelo.id)}
                  onVer={() => setModeloSelecionado(modelo)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favoritos" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelosFiltrados.filter(m => m.favorito).map(modelo => (
                <ModeloCard
                  key={modelo.id}
                  modelo={modelo}
                  onToggleFavorito={() => toggleFavorito(modelo.id)}
                  onExcluir={() => excluirModelo(modelo.id)}
                  onVer={() => setModeloSelecionado(modelo)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combinados" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelosFiltrados.filter(m => m.tipo === "combinado").map(modelo => (
                <ModeloCard
                  key={modelo.id}
                  modelo={modelo}
                  onToggleFavorito={() => toggleFavorito(modelo.id)}
                  onExcluir={() => excluirModelo(modelo.id)}
                  onVer={() => setModeloSelecionado(modelo)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="criados" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelosFiltrados.filter(m => m.tipo === "criado").map(modelo => (
                <ModeloCard
                  key={modelo.id}
                  modelo={modelo}
                  onToggleFavorito={() => toggleFavorito(modelo.id)}
                  onExcluir={() => excluirModelo(modelo.id)}
                  onVer={() => setModeloSelecionado(modelo)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de detalhes do modelo */}
        <Dialog open={!!modeloSelecionado} onOpenChange={() => setModeloSelecionado(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {modeloSelecionado && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <Badge className={tiposModelo[modeloSelecionado.tipo].color}>
                      {tiposModelo[modeloSelecionado.tipo].label}
                    </Badge>
                    {modeloSelecionado.favorito && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <DialogTitle className="text-xl">{modeloSelecionado.nome}</DialogTitle>
                  <DialogDescription>
                    Fonte: {modeloSelecionado.fonteNome} • {modeloSelecionado.fonteTipo}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {modeloSelecionado.conteudo.titulo && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Título</h4>
                      <p>{modeloSelecionado.conteudo.titulo}</p>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.descricao && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Descrição</h4>
                      <p>{modeloSelecionado.conteudo.descricao}</p>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.bigIdea && (
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Big Idea
                      </h4>
                      <p className="italic">"{modeloSelecionado.conteudo.bigIdea}"</p>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.copyLP && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Copy de LP
                      </h4>
                      <p className="text-sm bg-muted p-3 rounded">{modeloSelecionado.conteudo.copyLP}</p>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.roteiro && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Roteiro
                      </h4>
                      <pre className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{modeloSelecionado.conteudo.roteiro}</pre>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.estrategia && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Estratégia
                      </h4>
                      <p>{modeloSelecionado.conteudo.estrategia}</p>
                    </div>
                  )}
                  {modeloSelecionado.conteudo.gatilhos && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Gatilhos Mentais</h4>
                      <div className="flex flex-wrap gap-2">
                        {modeloSelecionado.conteudo.gatilhos.map((g, i) => (
                          <Badge key={i} variant="outline">{g}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {modeloSelecionado.promptCombinacao && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Comando de Combinação</h4>
                      <p className="text-sm italic">"{modeloSelecionado.promptCombinacao}"</p>
                    </div>
                  )}
                  {/* Indicador de versão */}
                  {modeloSelecionado.versaoAtual && (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Versão {modeloSelecionado.versaoAtual}</span>
                        {modeloSelecionado.versoes && (
                          <Badge variant="secondary" className="text-xs">
                            {modeloSelecionado.versoes.length} versões
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => {
                          abrirHistorico(modeloSelecionado);
                          setModeloSelecionado(null);
                        }}
                      >
                        <History className="h-3 w-3" />
                        Ver Histórico
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Button variant="outline" className="gap-2" onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(modeloSelecionado.conteudo, null, 2));
                      toast.success("Conteúdo copiado!");
                    }}>
                      <Copy className="h-4 w-4" />
                      Copiar Conteúdo
                    </Button>
                    {modeloSelecionado.versoes && modeloSelecionado.versoes.length > 0 && (
                      <Button variant="outline" className="gap-2" onClick={() => {
                        abrirHistorico(modeloSelecionado);
                        setModeloSelecionado(null);
                      }}>
                        <RotateCcw className="h-4 w-4" />
                        Reverter Versão
                      </Button>
                    )}
                    <Button className="gap-2" onClick={() => {
                      setModeloBaseCriacao(modeloSelecionado.id);
                      setModeloSelecionado(null);
                      setShowCriar(true);
                    }}>
                      <Wand2 className="h-4 w-4" />
                      Criar sobre este
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Histórico de Versões */}
        <Dialog open={showHistorico} onOpenChange={setShowHistorico}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                <DialogTitle>Histórico de Versões</DialogTitle>
              </div>
              {modeloHistorico && (
                <DialogDescription>
                  {modeloHistorico.nome} • {modeloHistorico.versoes?.length || 0} versões
                </DialogDescription>
              )}
            </DialogHeader>
            
            {modeloHistorico && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Lista de versões */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">Versões Disponíveis</h4>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      {modeloHistorico.versoes?.slice().reverse().map((versao) => (
                        <Card 
                          key={versao.id}
                          className={`cursor-pointer transition-colors ${
                            versaoSelecionada?.id === versao.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setVersaoSelecionada(versao)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant={versao.versao === modeloHistorico.versaoAtual ? "default" : "secondary"}>
                                  v{versao.versao}
                                </Badge>
                                {versao.versao === modeloHistorico.versaoAtual && (
                                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
                                    Atual
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {versao.createdAt.toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <p className="text-sm mt-2 line-clamp-1">{versao.nome}</p>
                            {versao.descricaoAlteracao && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {versao.descricaoAlteracao}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Preview da versão selecionada */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">Preview da Versão</h4>
                  {versaoSelecionada ? (
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge>Versão {versaoSelecionada.versao}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {versaoSelecionada.createdAt.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                        <CardTitle className="text-base">{versaoSelecionada.nome}</CardTitle>
                        {versaoSelecionada.descricaoAlteracao && (
                          <CardDescription>{versaoSelecionada.descricaoAlteracao}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[250px]">
                          <div className="space-y-3 text-sm">
                            {versaoSelecionada.conteudo.titulo && (
                              <div>
                                <span className="font-medium text-muted-foreground">Título:</span>
                                <p>{versaoSelecionada.conteudo.titulo}</p>
                              </div>
                            )}
                            {versaoSelecionada.conteudo.bigIdea && (
                              <div className="bg-primary/10 p-2 rounded">
                                <span className="font-medium">Big Idea:</span>
                                <p className="italic">"{versaoSelecionada.conteudo.bigIdea}"</p>
                              </div>
                            )}
                            {versaoSelecionada.conteudo.descricao && (
                              <div>
                                <span className="font-medium text-muted-foreground">Descrição:</span>
                                <p>{versaoSelecionada.conteudo.descricao}</p>
                              </div>
                            )}
                            {versaoSelecionada.conteudo.copyLP && (
                              <div>
                                <span className="font-medium text-muted-foreground">Copy LP:</span>
                                <p className="bg-muted p-2 rounded text-xs">{versaoSelecionada.conteudo.copyLP}</p>
                              </div>
                            )}
                            {versaoSelecionada.conteudo.estrategia && (
                              <div>
                                <span className="font-medium text-muted-foreground">Estratégia:</span>
                                <p>{versaoSelecionada.conteudo.estrategia}</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                        
                        {/* Botões de ação */}
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 flex-1"
                            onClick={() => {
                              setVersaoComparacao(versaoSelecionada);
                              setShowComparacao(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                            Comparar
                          </Button>
                          {versaoSelecionada.versao !== modeloHistorico.versaoAtual && (
                            <Button 
                              size="sm" 
                              className="gap-1 flex-1"
                              onClick={() => reverterVersao(modeloHistorico, versaoSelecionada)}
                            >
                              <RotateCcw className="h-3 w-3" />
                              Reverter para esta
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-[350px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Selecione uma versão para visualizar</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Comparação de Versões */}
        <Dialog open={showComparacao} onOpenChange={setShowComparacao}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeft 
                  className="h-5 w-5 cursor-pointer hover:text-primary" 
                  onClick={() => setShowComparacao(false)}
                />
                Comparação de Versões
              </DialogTitle>
              <DialogDescription>
                Comparando versão {versaoComparacao?.versao} com versão atual ({modeloHistorico?.versaoAtual})
              </DialogDescription>
            </DialogHeader>
            
            {modeloHistorico && versaoComparacao && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Versão selecionada */}
                <Card>
                  <CardHeader className="pb-2">
                    <Badge variant="secondary">Versão {versaoComparacao.versao}</Badge>
                    <CardTitle className="text-sm">{versaoComparacao.nome}</CardTitle>
                    <CardDescription className="text-xs">
                      {versaoComparacao.createdAt.toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 text-sm">
                        {versaoComparacao.conteudo.titulo && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Título</span>
                            <p>{versaoComparacao.conteudo.titulo}</p>
                          </div>
                        )}
                        {versaoComparacao.conteudo.bigIdea && (
                          <div className="p-2 bg-primary/10 rounded">
                            <span className="text-xs font-medium">Big Idea</span>
                            <p className="italic">"{versaoComparacao.conteudo.bigIdea}"</p>
                          </div>
                        )}
                        {versaoComparacao.conteudo.copyLP && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Copy LP</span>
                            <p className="text-xs">{versaoComparacao.conteudo.copyLP}</p>
                          </div>
                        )}
                        {versaoComparacao.conteudo.estrategia && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Estratégia</span>
                            <p>{versaoComparacao.conteudo.estrategia}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Versão atual */}
                <Card className="border-primary">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge>Versão {modeloHistorico.versaoAtual}</Badge>
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
                        Atual
                      </Badge>
                    </div>
                    <CardTitle className="text-sm">{modeloHistorico.nome}</CardTitle>
                    <CardDescription className="text-xs">
                      {modeloHistorico.createdAt.toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 text-sm">
                        {modeloHistorico.conteudo.titulo && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Título</span>
                            <p>{modeloHistorico.conteudo.titulo}</p>
                          </div>
                        )}
                        {modeloHistorico.conteudo.bigIdea && (
                          <div className="p-2 bg-primary/10 rounded">
                            <span className="text-xs font-medium">Big Idea</span>
                            <p className="italic">"{modeloHistorico.conteudo.bigIdea}"</p>
                          </div>
                        )}
                        {modeloHistorico.conteudo.copyLP && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Copy LP</span>
                            <p className="text-xs">{modeloHistorico.conteudo.copyLP}</p>
                          </div>
                        )}
                        {modeloHistorico.conteudo.estrategia && (
                          <div className="p-2 bg-muted/50 rounded">
                            <span className="text-xs font-medium text-muted-foreground">Estratégia</span>
                            <p>{modeloHistorico.conteudo.estrategia}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowComparacao(false)}>
                Voltar
              </Button>
              {versaoComparacao && versaoComparacao.versao !== modeloHistorico?.versaoAtual && (
                <Button onClick={() => {
                  if (modeloHistorico && versaoComparacao) {
                    reverterVersao(modeloHistorico, versaoComparacao);
                    setShowComparacao(false);
                  }
                }}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reverter para Versão {versaoComparacao.versao}
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

// Componente de Card do Modelo
function ModeloCard({ 
  modelo, 
  onToggleFavorito, 
  onExcluir, 
  onVer 
}: { 
  modelo: ModeloData;
  onToggleFavorito: () => void;
  onExcluir: () => void;
  onVer: () => void;
}) {
  const tipoInfo = tiposModelo[modelo.tipo];
  const Icon = tipoInfo.icon;

  return (
    <Card className="group hover:border-primary/50 transition-colors cursor-pointer" onClick={onVer}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge className={tipoInfo.color} variant="secondary">
            <Icon className="h-3 w-3 mr-1" />
            {tipoInfo.label}
          </Badge>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => { e.stopPropagation(); onToggleFavorito(); }}
            >
              {modelo.favorito ? (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={(e) => { e.stopPropagation(); onExcluir(); }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-base line-clamp-2">{modelo.nome}</CardTitle>
        <CardDescription className="text-xs">
          {modelo.fonteNome}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {modelo.conteudo.bigIdea && (
          <p className="text-sm text-muted-foreground line-clamp-2 italic">
            "{modelo.conteudo.bigIdea}"
          </p>
        )}
        {modelo.conteudo.descricao && !modelo.conteudo.bigIdea && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {modelo.conteudo.descricao}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {modelo.createdAt.toLocaleDateString("pt-BR")}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
