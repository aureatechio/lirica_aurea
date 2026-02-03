import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  UserSearch, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles,
  Users,
  Globe,
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
  Brain
} from "lucide-react";

export default function Headhunter() {
  const [activeTab, setActiveTab] = useState("avaliar");
  
  // Estado para Avaliação
  const [nomeMentor, setNomeMentor] = useState("");
  const [plataformas, setPlataformas] = useState<string[]>([]);
  const [contextoAvaliar, setContextoAvaliar] = useState("");
  const [resultadoAvaliacao, setResultadoAvaliacao] = useState<any>(null);
  
  // Estado para Descoberta
  const [nicho, setNicho] = useState("");
  const [pais, setPais] = useState<"brasil" | "eua" | "ambos">("brasil");
  const [tamanhoBase, setTamanhoBase] = useState<"micro" | "medio" | "grande" | "qualquer">("qualquer");
  const [contextoDescoberta, setContextoDescoberta] = useState("");
  const [resultadoDescoberta, setResultadoDescoberta] = useState<any>(null);

  // Mutations
  const avaliarMutation = trpc.headhunter.avaliar.useMutation({
    onSuccess: (data) => {
      setResultadoAvaliacao(data);
      toast.success("Análise concluída!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao analisar mentor");
    }
  });

  const descobrirMutation = trpc.headhunter.descobrir.useMutation({
    onSuccess: (data) => {
      setResultadoDescoberta(data);
      toast.success("Busca concluída!");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao buscar experts");
    }
  });

  const handleAvaliar = () => {
    if (nomeMentor.length < 2) {
      toast.error("Digite o nome do mentor");
      return;
    }
    avaliarMutation.mutate({ 
      nome: nomeMentor, 
      plataformas: plataformas.length > 0 ? plataformas as any : undefined,
      contexto: contextoAvaliar || undefined 
    });
  };

  const handleDescobrir = () => {
    if (nicho.length < 3) {
      toast.error("Descreva o nicho com pelo menos 3 caracteres");
      return;
    }
    descobrirMutation.mutate({ 
      nicho, 
      pais, 
      tamanhoBase,
      contexto: contextoDescoberta || undefined 
    });
  };

  const togglePlataforma = (plat: string) => {
    setPlataformas(prev => 
      prev.includes(plat) 
        ? prev.filter(p => p !== plat)
        : [...prev, plat]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (score >= 40) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bom";
    if (score >= 40) return "Moderado";
    return "Baixo";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <UserSearch className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Headhunter</h1>
              <p className="text-zinc-400">Encontre e avalie mentores para seus lançamentos</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1">
            <TabsTrigger value="avaliar" className="data-[state=active]:bg-cyan-600">
              <Target className="w-4 h-4 mr-2" />
              Avaliar Mentor
            </TabsTrigger>
            <TabsTrigger value="descobrir" className="data-[state=active]:bg-cyan-600">
              <Search className="w-4 h-4 mr-2" />
              Descobrir Experts
            </TabsTrigger>
          </TabsList>

          {/* Tab Avaliar */}
          <TabsContent value="avaliar" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Avaliar Potencial de Lançamento
                </CardTitle>
                <CardDescription>
                  Informe o nome de um mentor/expert e a IA analisará o potencial de lançamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Nome do Mentor/Expert</label>
                  <Input
                    placeholder="Ex: Nathalia Arcuri, Erico Rocha, Alex Hormozi..."
                    value={nomeMentor}
                    onChange={(e) => setNomeMentor(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Plataformas para focar (opcional)</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "youtube", icon: Youtube, label: "YouTube" },
                      { id: "instagram", icon: Instagram, label: "Instagram" },
                      { id: "linkedin", icon: Linkedin, label: "LinkedIn" },
                      { id: "tiktok", icon: Sparkles, label: "TikTok" },
                      { id: "twitter", icon: Twitter, label: "Twitter/X" },
                    ].map(({ id, icon: Icon, label }) => (
                      <Button
                        key={id}
                        variant="outline"
                        size="sm"
                        onClick={() => togglePlataforma(id)}
                        className={plataformas.includes(id) 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-zinc-800/50 border-zinc-700 text-zinc-400"
                        }
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Contexto adicional (opcional)</label>
                  <Textarea
                    placeholder="Ex: Estou pensando em lançar um curso de finanças com ela, focado em mulheres..."
                    value={contextoAvaliar}
                    onChange={(e) => setContextoAvaliar(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white min-h-[80px]"
                  />
                </div>

                <Button 
                  onClick={handleAvaliar}
                  disabled={avaliarMutation.isPending || nomeMentor.length < 2}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  {avaliarMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analisando...</>
                  ) : (
                    <><Brain className="w-4 h-4 mr-2" /> Analisar Mentor</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Resultado da Avaliação */}
            {resultadoAvaliacao && (
              <div className="space-y-6">
                {/* Score e Resumo */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Score */}
                      <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-800/50 border border-zinc-700 min-w-[200px]">
                        <div className="text-5xl font-bold text-white mb-2">
                          {resultadoAvaliacao.scoreViabilidade}
                        </div>
                        <Badge className={getScoreColor(resultadoAvaliacao.scoreViabilidade)}>
                          {getScoreLabel(resultadoAvaliacao.scoreViabilidade)}
                        </Badge>
                        <p className="text-sm text-zinc-400 mt-2">Score de Viabilidade</p>
                        <Progress 
                          value={resultadoAvaliacao.scoreViabilidade} 
                          className="w-full mt-3 h-2"
                        />
                      </div>

                      {/* Resumo */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {resultadoAvaliacao.conhecePessoa ? (
                            <Badge className="bg-green-500/20 text-green-400">
                              <CheckCircle className="w-3 h-3 mr-1" /> Pessoa conhecida
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/20 text-yellow-400">
                              <AlertTriangle className="w-3 h-3 mr-1" /> Informações limitadas
                            </Badge>
                          )}
                        </div>
                        <p className="text-zinc-300 whitespace-pre-line">{resultadoAvaliacao.resumo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Presença Digital */}
                {resultadoAvaliacao.presencaDigital?.length > 0 && (
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        Presença Digital
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resultadoAvaliacao.presencaDigital.map((p: any, i: number) => (
                          <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                            <div className="flex items-center gap-2 mb-2">
                              {p.plataforma.toLowerCase().includes("youtube") && <Youtube className="w-5 h-5 text-red-400" />}
                              {p.plataforma.toLowerCase().includes("instagram") && <Instagram className="w-5 h-5 text-pink-400" />}
                              {p.plataforma.toLowerCase().includes("linkedin") && <Linkedin className="w-5 h-5 text-blue-400" />}
                              {p.plataforma.toLowerCase().includes("tiktok") && <Sparkles className="w-5 h-5 text-cyan-400" />}
                              {p.plataforma.toLowerCase().includes("twitter") && <Twitter className="w-5 h-5 text-sky-400" />}
                              <span className="font-medium text-white">{p.plataforma}</span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-zinc-400">Seguidores:</span> <span className="text-white">{p.seguidoresEstimados}</span></p>
                              <p><span className="text-zinc-400">Engajamento:</span> <span className="text-white">{p.engajamentoEstimado}</span></p>
                              <p><span className="text-zinc-400">Frequência:</span> <span className="text-white">{p.frequenciaPostagem}</span></p>
                              <p><span className="text-zinc-400">Conteúdo:</span> <span className="text-white">{p.tipoConteudo}</span></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Posicionamento */}
                {resultadoAvaliacao.posicionamento && (
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        Posicionamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-400">Nicho</p>
                          <p className="text-white font-medium">{resultadoAvaliacao.posicionamento.nicho}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">Subnicho</p>
                          <p className="text-white font-medium">{resultadoAvaliacao.posicionamento.subnicho}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">Tom de Voz</p>
                          <p className="text-white font-medium">{resultadoAvaliacao.posicionamento.tomDeVoz}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">Público-Alvo</p>
                          <p className="text-white font-medium">{resultadoAvaliacao.posicionamento.publicoAlvo}</p>
                        </div>
                      </div>
                      {resultadoAvaliacao.posicionamento.diferenciais?.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-zinc-400 mb-2">Diferenciais</p>
                          <div className="flex flex-wrap gap-2">
                            {resultadoAvaliacao.posicionamento.diferenciais.map((d: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-purple-500/20 text-purple-300">
                                {d}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Pontos Fortes e Fracos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Pontos Fortes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {resultadoAvaliacao.pontosFortes?.map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-400" />
                        Pontos Fracos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {resultadoAvaliacao.pontosFracos?.map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-300">
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Estratégias Recomendadas */}
                {resultadoAvaliacao.estrategiasRecomendadas?.length > 0 && (
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        Estratégias Recomendadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resultadoAvaliacao.estrategiasRecomendadas.map((e: any, i: number) => (
                        <div key={i} className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                          <h4 className="font-semibold text-white mb-2">{e.estrategia}</h4>
                          <p className="text-sm text-zinc-400 mb-2"><span className="text-yellow-400">Por quê:</span> {e.porque}</p>
                          <p className="text-sm text-zinc-300"><span className="text-green-400">Como executar:</span> {e.comoExecutar}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Riscos e Veredicto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resultadoAvaliacao.riscos?.length > 0 && (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />
                          Riscos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {resultadoAvaliacao.riscos.map((r: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-300">
                              <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        Veredicto Final
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-300">{resultadoAvaliacao.veredictoFinal}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab Descobrir */}
          <TabsContent value="descobrir" className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-400" />
                  Descobrir Experts por Nicho
                </CardTitle>
                <CardDescription>
                  Informe um nicho e a IA sugerirá potenciais mentores/experts para lançamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Nicho/Tema</label>
                  <Input
                    placeholder="Ex: Finanças para mulheres, Produtividade para devs, Emagrecimento saudável..."
                    value={nicho}
                    onChange={(e) => setNicho(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">País</label>
                    <Select value={pais} onValueChange={(v: "brasil" | "eua" | "ambos") => setPais(v)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brasil">🇧🇷 Brasil</SelectItem>
                        <SelectItem value="eua">🇺🇸 EUA</SelectItem>
                        <SelectItem value="ambos">🌎 Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Tamanho da Base</label>
                    <Select value={tamanhoBase} onValueChange={(v: "micro" | "medio" | "grande" | "qualquer") => setTamanhoBase(v)}>
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qualquer">Qualquer tamanho</SelectItem>
                        <SelectItem value="micro">Micro (10k-100k)</SelectItem>
                        <SelectItem value="medio">Médio (100k-500k)</SelectItem>
                        <SelectItem value="grande">Grande (500k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Contexto adicional (opcional)</label>
                  <Textarea
                    placeholder="Ex: Preciso de alguém que fale com linguagem acessível, sem termos técnicos..."
                    value={contextoDescoberta}
                    onChange={(e) => setContextoDescoberta(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white min-h-[80px]"
                  />
                </div>

                <Button 
                  onClick={handleDescobrir}
                  disabled={descobrirMutation.isPending || nicho.length < 3}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  {descobrirMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Buscando...</>
                  ) : (
                    <><Search className="w-4 h-4 mr-2" /> Descobrir Experts</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Resultado da Descoberta */}
            {resultadoDescoberta && (
              <div className="space-y-6">
                {/* Análise do Nicho */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      Análise do Nicho
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 whitespace-pre-line">{resultadoDescoberta.analiseNicho}</p>
                  </CardContent>
                </Card>

                {/* Lista de Experts */}
                {resultadoDescoberta.experts?.length > 0 && (
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                        Experts Encontrados ({resultadoDescoberta.experts.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resultadoDescoberta.experts.map((expert: any, i: number) => (
                        <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-cyan-500/50 transition-all">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-white text-lg">{expert.nome}</h4>
                                <Badge variant="outline" className={expert.pais === "Brasil" ? "border-green-500/30 text-green-400" : "border-blue-500/30 text-blue-400"}>
                                  {expert.pais === "Brasil" ? "🇧🇷" : "🇺🇸"} {expert.pais}
                                </Badge>
                              </div>
                              <p className="text-sm text-zinc-400 mb-3">{expert.nicho}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                <div>
                                  <p className="text-xs text-zinc-500">Plataforma</p>
                                  <p className="text-sm text-white">{expert.plataformaPrincipal}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-500">Seguidores</p>
                                  <p className="text-sm text-white">{expert.seguidoresEstimados}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-500">Engajamento</p>
                                  <p className="text-sm text-white">{expert.engajamentoEstimado}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-500">Acesso</p>
                                  <p className="text-sm text-white">{expert.dificuldadeAcesso}</p>
                                </div>
                              </div>

                              <p className="text-sm text-zinc-300 mb-2">
                                <span className="text-cyan-400">Por que indicar:</span> {expert.porqueIndicar}
                              </p>
                              <p className="text-sm text-zinc-300">
                                <span className="text-green-400">Estratégia sugerida:</span> {expert.estrategiaSugerida}
                              </p>
                            </div>

                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-900/50 border border-zinc-700 min-w-[100px]">
                              <div className="text-3xl font-bold text-white">{expert.scoreViabilidade}</div>
                              <Badge className={getScoreColor(expert.scoreViabilidade)}>
                                {getScoreLabel(expert.scoreViabilidade)}
                              </Badge>
                            </div>
                          </div>

                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                            onClick={() => {
                              setNomeMentor(expert.nome);
                              setActiveTab("avaliar");
                              toast.info(`Clique em "Analisar Mentor" para ver análise completa de ${expert.nome}`);
                            }}
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            Ver análise completa
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Tendências e Dicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resultadoDescoberta.tendenciasNicho?.length > 0 && (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          Tendências do Nicho
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {resultadoDescoberta.tendenciasNicho.map((t: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-300">
                              <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {resultadoDescoberta.dicasAbordagem?.length > 0 && (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-400" />
                          Dicas de Abordagem
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {resultadoDescoberta.dicasAbordagem.map((d: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-300">
                              <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
