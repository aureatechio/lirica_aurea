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
  FolderOpen,
  Upload,
  Search,
  FileText,
  Video,
  Image,
  BarChart3,
  ExternalLink,
  Download,
  Eye,
  Calendar,
  Target,
  TrendingUp,
  Filter,
  Plus,
  BookOpen,
  FileSpreadsheet,
  Smartphone,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { documentosRepositorio, type DocumentoRepositorio } from "@/data/campanhasData";

// Tipos de materiais
const tiposMaterial = [
  { id: "lp", nome: "Landing Pages", icon: FileText },
  { id: "manifesto", nome: "Manifestos", icon: FileText },
  { id: "live", nome: "Lives/Webinars", icon: Video },
  { id: "video", nome: "Criativos em Vídeo", icon: Video },
  { id: "estatico", nome: "Criativos Estáticos", icon: Image },
  { id: "copy", nome: "Copies", icon: FileText },
  { id: "metricas", nome: "Métricas/BI", icon: BarChart3 },
];

// Categorias de documentos
const categoriasDocs = [
  { id: "calendario", nome: "Calendários", icon: Calendar },
  { id: "metodologia", nome: "Metodologias", icon: BookOpen },
  { id: "campanha", nome: "Campanhas", icon: Target },
  { id: "referencia", nome: "Referências", icon: FileText },
  { id: "ebook", nome: "E-books", icon: BookOpen },
  { id: "livro", nome: "Livros", icon: BookOpen },
  { id: "app", nome: "Aplicativos", icon: Smartphone },
];

// Campanhas passadas simuladas
const campanhasPassadas = [
  {
    id: "1",
    nome: "Lançamento Criatividade Exponencial",
    produto: "Criatividade Exponencial",
    nucleo: "MGS",
    data: "Janeiro 2025",
    faturamento: "R$ 2.1M",
    leads: 12500,
    conversao: "3.2%",
    roas: "4.2x",
    materiais: {
      lp: 2,
      manifesto: 1,
      live: 3,
      video: 8,
      estatico: 15,
      copy: 12,
    },
  },
  {
    id: "2",
    nome: "Black Friday MGS",
    produto: "Passaporte MGS",
    nucleo: "MGS",
    data: "Novembro 2024",
    faturamento: "R$ 3.5M",
    leads: 25000,
    conversao: "2.8%",
    roas: "5.1x",
    materiais: {
      lp: 3,
      manifesto: 2,
      live: 5,
      video: 12,
      estatico: 25,
      copy: 20,
    },
  },
  {
    id: "3",
    nome: "Lançamento IA Exponencial",
    produto: "IA Exponencial",
    nucleo: "MGS",
    data: "Outubro 2024",
    faturamento: "R$ 1.8M",
    leads: 18000,
    conversao: "2.5%",
    roas: "3.8x",
    materiais: {
      lp: 2,
      manifesto: 1,
      live: 4,
      video: 10,
      estatico: 18,
      copy: 15,
    },
  },
  {
    id: "4",
    nome: "Campanha Arthur Aguiar",
    produto: "Bloco",
    nucleo: "ACELERAI",
    data: "Setembro 2024",
    faturamento: "R$ 850K",
    leads: 35000,
    conversao: "1.2%",
    roas: "2.8x",
    materiais: {
      lp: 1,
      manifesto: 1,
      live: 2,
      video: 6,
      estatico: 12,
      copy: 8,
    },
  },
];

// Materiais do repositório
const materiaisRepositorio = [
  {
    id: "1",
    tipo: "lp",
    nome: "LP Criatividade Exponencial - Versão A",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    conversao: "12.5%",
    visualizacoes: 45000,
    tags: ["alta conversão", "VSL", "urgência"],
  },
  {
    id: "2",
    tipo: "manifesto",
    nome: "Manifesto - O Despertar Criativo",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    visualizacoes: 120000,
    engajamento: "8.2%",
    tags: ["viral", "storytelling", "emocional"],
  },
  {
    id: "3",
    tipo: "video",
    nome: "VSL Principal - 15 minutos",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    visualizacoes: 85000,
    retencao: "45%",
    tags: ["VSL", "alta retenção", "oferta"],
  },
  {
    id: "4",
    tipo: "estatico",
    nome: "Carrossel - 5 Erros Criativos",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    impressoes: 250000,
    ctr: "3.8%",
    tags: ["carrossel", "educativo", "alto CTR"],
  },
  {
    id: "5",
    tipo: "copy",
    nome: "Email Sequência - Dia 1",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    abertura: "42%",
    cliques: "8.5%",
    tags: ["email", "abertura alta", "storytelling"],
  },
  {
    id: "6",
    tipo: "metricas",
    nome: "Dashboard BI - Funil Completo",
    campanha: "Lançamento Criatividade Exponencial",
    data: "Jan 2025",
    tags: ["BI", "funil", "métricas"],
  },
];

function getIconForDocType(tipo: string) {
  switch (tipo) {
    case 'pdf': return FileText;
    case 'video': return Video;
    case 'imagem': return Image;
    case 'planilha': return FileSpreadsheet;
    default: return FileText;
  }
}

function getCategoryIcon(categoria: string) {
  const cat = categoriasDocs.find(c => c.id === categoria);
  return cat?.icon || FileText;
}

export default function Repositorio() {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroNucleo, setFiltroNucleo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [busca, setBusca] = useState("");
  const [campanhaExpandida, setCampanhaExpandida] = useState<string | null>(null);

  const materiaisFiltrados = materiaisRepositorio.filter(m => {
    if (filtroTipo !== "todos" && m.tipo !== filtroTipo) return false;
    if (busca && !m.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  });

  const campanhasFiltradas = campanhasPassadas.filter(c => {
    if (filtroNucleo !== "todos" && c.nucleo !== filtroNucleo) return false;
    return true;
  });

  const documentosFiltrados = documentosRepositorio.filter(d => {
    if (filtroCategoria !== "todos" && d.categoria !== filtroCategoria) return false;
    if (filtroNucleo !== "todos" && d.nucleo !== filtroNucleo && d.nucleo !== "GERAL") return false;
    if (busca && !d.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  });

  const handleViewDocument = (doc: DocumentoRepositorio) => {
    window.open(doc.arquivo, '_blank');
    toast.success(`Abrindo ${doc.nome}`);
  };

  const handleDownloadDocument = (doc: DocumentoRepositorio) => {
    const link = document.createElement('a');
    link.href = doc.arquivo;
    link.download = doc.nome;
    link.click();
    toast.success(`Download iniciado: ${doc.nome}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Repositório
          </h1>
          <p className="text-muted-foreground">
            Documentos, materiais e métricas de campanhas
          </p>
        </div>
        <Button onClick={() => toast.info("Funcionalidade de upload em desenvolvimento")}>
          <Upload className="h-4 w-4 mr-2" />
          Upload de Material
        </Button>
      </div>

      <Tabs defaultValue="documentos">
        <TabsList>
          <TabsTrigger value="documentos">Documentos Base</TabsTrigger>
          <TabsTrigger value="campanhas">Campanhas Passadas</TabsTrigger>
          <TabsTrigger value="materiais">Biblioteca de Materiais</TabsTrigger>
          <TabsTrigger value="metricas">Métricas Consolidadas</TabsTrigger>
        </TabsList>

        {/* Documentos Base (PDFs) */}
        <TabsContent value="documentos" className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar documentos..." 
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Categorias</SelectItem>
                {categoriasDocs.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroNucleo} onValueChange={setFiltroNucleo}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Núcleo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="MGS">MGS</SelectItem>
                <SelectItem value="ACELERAI">Aceleraí</SelectItem>
                <SelectItem value="GERAL">Geral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documentosFiltrados.map(doc => {
              const IconComponent = getIconForDocType(doc.tipo);
              const CategoryIcon = getCategoryIcon(doc.categoria);
              return (
                <Card key={doc.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm line-clamp-2">{doc.nome}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {doc.nucleo}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {categoriasDocs.find(c => c.id === doc.categoria)?.nome}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {doc.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {doc.dataUpload}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                          onClick={() => {
                            const modelo = {
                              id: `doc-${doc.id}-${Date.now()}`,
                              tipo: 'documento' as const,
                              nome: doc.nome,
                              fonte: `Repositório - ${doc.nucleo}`,
                              conteudo: {
                                descricao: doc.descricao,
                                categoria: doc.categoria,
                                arquivo: doc.arquivo
                              },
                              dataCriacao: new Date().toISOString(),
                              tags: [doc.nucleo, categoriasDocs.find(c => c.id === doc.categoria)?.nome || '']
                            };
                            const modelos = JSON.parse(localStorage.getItem('meus-modelos') || '[]');
                            modelos.push(modelo);
                            localStorage.setItem('meus-modelos', JSON.stringify(modelos));
                            toast.success(`"${doc.nome}" salvo em Meus Modelos!`);
                          }}
                        >
                          <Layers className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {documentosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum documento encontrado</p>
            </div>
          )}
        </TabsContent>

        {/* Campanhas Passadas */}
        <TabsContent value="campanhas" className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Select value={filtroNucleo} onValueChange={setFiltroNucleo}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por núcleo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Núcleos</SelectItem>
                <SelectItem value="MGS">MGS</SelectItem>
                <SelectItem value="ACELERAI">Aceleraí</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {campanhasFiltradas.map(campanha => (
              <Card key={campanha.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setCampanhaExpandida(campanhaExpandida === campanha.id ? null : campanha.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className={campanha.nucleo === "MGS" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}>
                        {campanha.nucleo}
                      </Badge>
                      <div>
                        <CardTitle style={{ fontFamily: 'var(--font-display)' }}>{campanha.nome}</CardTitle>
                        <CardDescription>{campanha.produto} • {campanha.data}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">Faturamento</p>
                        <p className="text-lg font-bold text-green-400">{campanha.faturamento}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROAS</p>
                        <p className="text-lg font-bold">{campanha.roas}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversão</p>
                        <p className="text-lg font-bold">{campanha.conversao}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {campanhaExpandida === campanha.id && (
                  <CardContent className="border-t bg-muted/30">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
                      <div className="p-4 rounded-lg bg-background">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Leads Captados</span>
                        </div>
                        <p className="text-2xl font-bold">{campanha.leads.toLocaleString()}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                        </div>
                        <p className="text-2xl font-bold">{campanha.conversao}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">ROAS</span>
                        </div>
                        <p className="text-2xl font-bold">{campanha.roas}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background">
                        <div className="flex items-center gap-2 mb-2">
                          <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Total Materiais</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {Object.values(campanha.materiais).reduce((a, b) => a + b, 0)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Materiais da Campanha</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(campanha.materiais).map(([tipo, quantidade]) => {
                          const tipoInfo = tiposMaterial.find(t => t.id === tipo);
                          if (!tipoInfo || quantidade === 0) return null;
                          const Icon = tipoInfo.icon;
                          return (
                            <Badge key={tipo} variant="outline" className="gap-1">
                              <Icon className="h-3 w-3" />
                              {quantidade} {tipoInfo.nome}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Biblioteca de Materiais */}
        <TabsContent value="materiais" className="mt-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar materiais..." 
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {tiposMaterial.map(tipo => (
                  <SelectItem key={tipo.id} value={tipo.id}>{tipo.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materiaisFiltrados.map(material => {
              const tipoInfo = tiposMaterial.find(t => t.id === material.tipo);
              const Icon = tipoInfo?.icon || FileText;
              return (
                <Card key={material.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm">{material.nome}</CardTitle>
                        <CardDescription className="text-xs">{material.campanha}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {material.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{material.data}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="h-7 px-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={() => {
                            const modelo = {
                              id: `material-${material.id}-${Date.now()}`,
                              tipo: 'material' as const,
                              nome: material.nome,
                              fonte: `Repositório - ${material.campanha}`,
                              conteudo: {
                                tipo: material.tipo,
                                campanha: material.campanha,
                                tags: material.tags
                              },
                              dataCriacao: new Date().toISOString(),
                              tags: material.tags
                            };
                            const modelos = JSON.parse(localStorage.getItem('meus-modelos') || '[]');
                            modelos.push(modelo);
                            localStorage.setItem('meus-modelos', JSON.stringify(modelos));
                            toast.success(`"${material.nome}" salvo em Meus Modelos!`);
                          }}
                        >
                          <Layers className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Métricas Consolidadas */}
        <TabsContent value="metricas" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Faturado</CardDescription>
                <CardTitle className="text-2xl text-green-400">R$ 8.25M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">4 campanhas analisadas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Leads Totais</CardDescription>
                <CardTitle className="text-2xl">90.5K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Média: 22.6K por campanha</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>ROAS Médio</CardDescription>
                <CardTitle className="text-2xl">3.97x</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Melhor: 5.1x (Black Friday)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Conversão Média</CardDescription>
                <CardTitle className="text-2xl">2.43%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Melhor: 3.2% (Criatividade)</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Insights das Campanhas</CardTitle>
              <CardDescription>Aprendizados consolidados do repositório</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2">O que funcionou bem</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manifestos com storytelling emocional tiveram 8%+ de engajamento</li>
                    <li>• VSLs de 15 minutos com retenção acima de 40% converteram melhor</li>
                    <li>• Carrosséis educativos alcançaram CTR médio de 3.5%</li>
                    <li>• Campanhas com urgência real (Black Friday) tiveram ROAS 30% maior</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <h4 className="font-medium text-yellow-400 mb-2">Pontos de atenção</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Campanhas com celebridades tiveram conversão menor (1.2% vs 2.8%)</li>
                    <li>• Emails com abertura abaixo de 35% indicam lista fria</li>
                    <li>• LPs com muitos elementos tiveram conversão 20% menor</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
