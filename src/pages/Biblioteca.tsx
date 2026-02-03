import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ExternalLink,
  Play,
  Image,
  FileText,
  Layout,
  MessageSquare,
  Video,
  Instagram,
  BookOpen,
  Sparkles,
  Copy,
  Search,
  Star,
  Filter,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  bibliotecaReferencias,
  temasCentrais,
  tiposReferencia,
  getTotalReferencias,
  type Referencia,
} from "@/data/bibliotecaData";

const tipoIcons: Record<string, React.ElementType> = {
  feed: Instagram,
  lp: Layout,
  manifesto: FileText,
  video: Video,
  estatico: Image,
  organico: MessageSquare,
};

const nivelColors: Record<string, string> = {
  iniciante: "bg-green-500/20 text-green-400",
  intermediario: "bg-yellow-500/20 text-yellow-400",
  avancado: "bg-red-500/20 text-red-400",
};

const nivelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function Biblioteca() {
  const [temaSelecionado, setTemaSelecionado] = useState("growth");
  const [tipoSelecionado, setTipoSelecionado] = useState("feed");
  const [nivelFiltro, setNivelFiltro] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const temaInfo = temasCentrais.find(t => t.id === temaSelecionado);
  const referencias = bibliotecaReferencias[temaSelecionado]?.[tipoSelecionado] || [];
  
  const referenciasFiltradas = referencias.filter(ref => {
    if (nivelFiltro !== "todos" && ref.nivel !== nivelFiltro) return false;
    if (busca) {
      const searchLower = busca.toLowerCase();
      return (
        ref.titulo.toLowerCase().includes(searchLower) ||
        ref.descricao.toLowerCase().includes(searchLower) ||
        ref.fonte.toLowerCase().includes(searchLower) ||
        ref.elementos.some(e => e.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const totalReferencias = getTotalReferencias();

  const handleCopiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    toast.success("Copiado para a área de transferência!");
  };

  // Contar referências por tema
  const contarPorTema = (temaId: string) => {
    let total = 0;
    Object.values(bibliotecaReferencias[temaId] || {}).forEach(tipo => {
      total += tipo.length;
    });
    return total;
  };

  // Contar referências por tipo no tema atual
  const contarPorTipo = (tipoId: string) => {
    return (bibliotecaReferencias[temaSelecionado]?.[tipoId] || []).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Biblioteca de Referências
          </h1>
          <p className="text-muted-foreground">
            {totalReferencias} referências curadas • 12 temas • 6 formatos
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Referências</p>
                <p className="text-2xl font-bold text-purple-400">{totalReferencias}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temas</p>
                <p className="text-2xl font-bold text-blue-400">12</p>
              </div>
              <Filter className="h-8 w-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Formatos</p>
                <p className="text-2xl font-bold text-green-400">6</p>
              </div>
              <Layout className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">No Tema Atual</p>
                <p className="text-2xl font-bold text-orange-400">{contarPorTema(temaSelecionado)}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar referência, fonte, elemento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={temaSelecionado} onValueChange={setTemaSelecionado}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                {temasCentrais.map(tema => (
                  <SelectItem key={tema.id} value={tema.id}>
                    {tema.nome} ({contarPorTema(tema.id)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={nivelFiltro} onValueChange={setNivelFiltro}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Níveis</SelectItem>
                <SelectItem value="iniciante">Iniciante</SelectItem>
                <SelectItem value="intermediario">Intermediário</SelectItem>
                <SelectItem value="avancado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Info do Tema */}
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Badge className={temaInfo?.cor + " text-lg px-4 py-2"}>
              {temaInfo?.nome}
            </Badge>
            <p className="text-muted-foreground">
              {contarPorTema(temaSelecionado)} referências curadas para campanhas de {temaInfo?.nome.toLowerCase()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Referência */}
      <Tabs value={tipoSelecionado} onValueChange={setTipoSelecionado}>
        <TabsList className="w-full justify-start bg-zinc-900/50 border border-zinc-800">
          {tiposReferencia.map(tipo => {
            const Icon = tipoIcons[tipo.id] || FileText;
            const count = contarPorTipo(tipo.id);
            return (
              <TabsTrigger key={tipo.id} value={tipo.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {tipo.nome}
                <Badge variant="outline" className="ml-1 text-xs">{count}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tiposReferencia.map(tipo => (
          <TabsContent key={tipo.id} value={tipo.id} className="mt-6">
            <div className="grid gap-6">
              {referenciasFiltradas.length > 0 ? (
                referenciasFiltradas.map((ref, index) => (
                  <Card key={ref.id || index} className="overflow-hidden hover:border-primary/50 transition-all">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                              {ref.titulo}
                            </CardTitle>
                            <Badge className={nivelColors[ref.nivel]}>
                              {nivelLabels[ref.nivel]}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1">
                            {ref.descricao}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{ref.fonte}</Badge>
                          {ref.link && (
                            <a href={ref.link.startsWith('http') ? ref.link : `https://${ref.link}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Por que funciona */}
                        <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-green-400" />
                            <span className="font-semibold text-sm">Por que funciona</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{ref.porque}</p>
                        </div>

                        {/* Elementos-chave */}
                        <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-4 w-4 text-blue-400" />
                            <span className="font-semibold text-sm">Elementos-chave</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ref.elementos.map((elem, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {elem}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Metadados extras */}
                      {(ref.formato || ref.duracao || ref.metricas) && (
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                          {ref.formato && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Layout className="h-4 w-4" />
                              {ref.formato}
                            </div>
                          )}
                          {ref.duracao && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Play className="h-4 w-4" />
                              {ref.duracao}
                            </div>
                          )}
                          {ref.metricas && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <TrendingUp className="h-4 w-4" />
                              {ref.metricas}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Ações */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-800">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopiar(`${ref.titulo}: ${ref.descricao}\n\nPor que funciona: ${ref.porque}\n\nElementos: ${ref.elementos.join(', ')}`)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Referência
                        </Button>
                        {ref.link && (
                          <a href={ref.link.startsWith('http') ? ref.link : `https://${ref.link}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver Original
                            </Button>
                          </a>
                        )}
                        <Button variant="default" size="sm" onClick={() => toast.success("Referência adicionada à campanha!")}>
                          Usar como Base
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Nenhuma referência encontrada</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tente ajustar os filtros ou buscar por outro termo
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => { setBusca(""); setNivelFiltro("todos"); }}>
                      Limpar Filtros
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
