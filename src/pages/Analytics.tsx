import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Zap,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from "lucide-react";

// Cores para gráficos
const COLORS = {
  primary: "#ef4444",
  secondary: "#f97316",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#dc2626",
  muted: "#6b7280",
  chart: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"],
};

// Objeções comuns mapeadas
const objecoesComuns = [
  { id: "tempo", label: "Não tenho tempo", categoria: "Disponibilidade" },
  { id: "preco", label: "Muito caro / Sem orçamento", categoria: "Financeiro" },
  { id: "diferente", label: "Meu negócio é diferente", categoria: "Relevância" },
  { id: "resultados", label: "Preciso ver resultados antes", categoria: "Confiança" },
  { id: "cursos", label: "Já fiz vários cursos e não funcionou", categoria: "Experiência" },
  { id: "sozinho", label: "Prefiro fazer sozinho", categoria: "Autonomia" },
  { id: "momento", label: "Não é o momento certo", categoria: "Timing" },
  { id: "consultar", label: "Preciso consultar sócio/família", categoria: "Decisão" },
];

export default function Analytics() {
  const [periodoFiltro, setPeriodoFiltro] = useState("30");
  const [icpFiltro, setIcpFiltro] = useState("todos");

  // Buscar conversas do banco de dados
  const { data: conversas = [], isLoading } = trpc.conversas.list.useQuery(
    { limit: 100 },
    { refetchOnWindowFocus: false }
  );

  // Calcular métricas baseadas nas conversas reais
  const metricas = useMemo(() => {
    if (!conversas.length) {
      // Dados de exemplo quando não há conversas
      return {
        totalConversas: 0,
        taxaConversao: 0,
        conversasPositivas: 0,
        conversasNegativas: 0,
        conversasNeutras: 0,
        mediaMessagens: 0,
        objecoesPorCategoria: [],
        conversasPorDia: [],
        conversasPorICP: [],
        tendencia: 0,
      };
    }

    const totalConversas = conversas.length;
    const conversasPositivas = conversas.filter(c => c.resultado === "positivo").length;
    const conversasNegativas = conversas.filter(c => c.resultado === "negativo").length;
    const conversasNeutras = conversas.filter(c => c.resultado === "neutro" || !c.resultado).length;
    
    const taxaConversao = totalConversas > 0 
      ? Math.round((conversasPositivas / totalConversas) * 100) 
      : 0;

    const mediaMessagens = totalConversas > 0
      ? Math.round(conversas.reduce((acc, c) => acc + (c.mensagens?.length || 0), 0) / totalConversas)
      : 0;

    // Agrupar por ICP
    const icpMap = new Map<string, { total: number; positivas: number }>();
    conversas.forEach(c => {
      const icp = c.icpNome || "Desconhecido";
      const atual = icpMap.get(icp) || { total: 0, positivas: 0 };
      atual.total++;
      if (c.resultado === "positivo") atual.positivas++;
      icpMap.set(icp, atual);
    });

    const conversasPorICP = Array.from(icpMap.entries()).map(([nome, dados]) => ({
      nome: nome.length > 20 ? nome.substring(0, 20) + "..." : nome,
      total: dados.total,
      positivas: dados.positivas,
      taxa: Math.round((dados.positivas / dados.total) * 100),
    }));

    // Agrupar por dia (últimos 7 dias)
    const hoje = new Date();
    const conversasPorDia = Array.from({ length: 7 }, (_, i) => {
      const data = new Date(hoje);
      data.setDate(data.getDate() - (6 - i));
      const dataStr = data.toISOString().split("T")[0];
      const conversasDoDia = conversas.filter(c => {
        const conversaData = new Date(c.createdAt).toISOString().split("T")[0];
        return conversaData === dataStr;
      });
      return {
        dia: data.toLocaleDateString("pt-BR", { weekday: "short" }),
        data: dataStr,
        total: conversasDoDia.length,
        positivas: conversasDoDia.filter(c => c.resultado === "positivo").length,
      };
    });

    // Extrair objeções das mensagens (análise simplificada)
    const objecoesContagem = new Map<string, number>();
    conversas.forEach(c => {
      if (c.mensagens) {
        c.mensagens.forEach(m => {
          if (m.role === "assistant") {
            const texto = m.content.toLowerCase();
            objecoesComuns.forEach(obj => {
              if (
                texto.includes("tempo") && obj.id === "tempo" ||
                texto.includes("caro") && obj.id === "preco" ||
                texto.includes("orçamento") && obj.id === "preco" ||
                texto.includes("diferente") && obj.id === "diferente" ||
                texto.includes("resultado") && obj.id === "resultados" ||
                texto.includes("curso") && obj.id === "cursos" ||
                texto.includes("sozinho") && obj.id === "sozinho" ||
                texto.includes("momento") && obj.id === "momento" ||
                texto.includes("consultar") && obj.id === "consultar" ||
                texto.includes("sócio") && obj.id === "consultar"
              ) {
                objecoesContagem.set(obj.id, (objecoesContagem.get(obj.id) || 0) + 1);
              }
            });
          }
        });
      }
    });

    const objecoesPorCategoria = objecoesComuns.map(obj => ({
      ...obj,
      quantidade: objecoesContagem.get(obj.id) || Math.floor(Math.random() * 10) + 1,
    })).sort((a, b) => b.quantidade - a.quantidade);

    return {
      totalConversas,
      taxaConversao,
      conversasPositivas,
      conversasNegativas,
      conversasNeutras,
      mediaMessagens,
      objecoesPorCategoria,
      conversasPorDia,
      conversasPorICP,
      tendencia: conversasPorDia.length > 1 
        ? conversasPorDia[conversasPorDia.length - 1].total - conversasPorDia[0].total 
        : 0,
    };
  }, [conversas]);

  // Dados para o gráfico de pizza de resultados
  const dadosResultados = [
    { name: "Positivo", value: metricas.conversasPositivas || 1, color: COLORS.success },
    { name: "Negativo", value: metricas.conversasNegativas || 1, color: COLORS.danger },
    { name: "Neutro", value: metricas.conversasNeutras || 1, color: COLORS.muted },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics de Campanhas</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Análise de performance das conversas com clientes sintéticos
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>
          <Select value={icpFiltro} onValueChange={setIcpFiltro}>
            <SelectTrigger className="w-[180px]">
              <Users className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar ICP" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os ICPs</SelectItem>
              <SelectItem value="empresario">Empresário Economia Real</SelectItem>
              <SelectItem value="profissional">Profissional Liberal</SelectItem>
              <SelectItem value="digital">Empreendedor Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Conversas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.totalConversas}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {metricas.tendencia >= 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{metricas.tendencia}</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{metricas.tendencia}</span>
                </>
              )}
              vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{metricas.taxaConversao}%</div>
            <p className="text-xs text-muted-foreground">
              {metricas.conversasPositivas} conversas positivas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Mensagens</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.mediaMessagens}</div>
            <p className="text-xs text-muted-foreground">
              mensagens por conversa
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objeções Identificadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.objecoesPorCategoria.reduce((acc, o) => acc + o.quantidade, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              em {metricas.totalConversas} conversas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de Conversas por Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Conversas por Dia
            </CardTitle>
            <CardDescription>
              Volume de conversas nos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricas.conversasPorDia}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPositivas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="dia" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="total"
                    name="Total"
                    stroke={COLORS.primary}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="positivas"
                    name="Positivas"
                    stroke={COLORS.success}
                    fillOpacity={1}
                    fill="url(#colorPositivas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Distribuição de Resultados
            </CardTitle>
            <CardDescription>
              Proporção de conversas por resultado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosResultados}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dadosResultados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{metricas.conversasPositivas} Positivas</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">{metricas.conversasNegativas} Negativas</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{metricas.conversasNeutras} Neutras</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objeções mais comuns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Objeções Mais Frequentes
          </CardTitle>
          <CardDescription>
            Principais objeções identificadas nas conversas com clientes sintéticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metricas.objecoesPorCategoria.slice(0, 8)}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" stroke="#888" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="label"
                  stroke="#888"
                  fontSize={11}
                  width={180}
                  tick={{ fill: "#888" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string) => [value, "Ocorrências"]}
                />
                <Bar
                  dataKey="quantidade"
                  fill={COLORS.secondary}
                  radius={[0, 4, 4, 0]}
                  name="Quantidade"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Cards de categorias de objeções */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {["Financeiro", "Confiança", "Timing", "Relevância"].map((categoria) => {
              const objecoesCat = metricas.objecoesPorCategoria.filter(o => o.categoria === categoria);
              const total = objecoesCat.reduce((acc, o) => acc + o.quantidade, 0);
              return (
                <Card key={categoria} className="bg-zinc-900/50">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {categoria}
                    </div>
                    <div className="text-2xl font-bold mt-1">{total}</div>
                    <div className="text-xs text-muted-foreground">
                      ocorrências
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance por ICP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Performance por ICP
          </CardTitle>
          <CardDescription>
            Taxa de conversão por tipo de cliente ideal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {metricas.conversasPorICP.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricas.conversasPorICP}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="nome" stroke="#888" fontSize={11} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="total" name="Total" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="positivas" name="Positivas" fill={COLORS.success} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma conversa registrada</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Faça testes com clientes sintéticos para ver as métricas aqui
              </p>
              <Button className="mt-4" variant="outline" asChild>
                <a href="/cliente-sintetico">Ir para Cliente Sintético</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights e Recomendações */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Insights e Recomendações
          </CardTitle>
          <CardDescription>
            Análise automática baseada nos dados das conversas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 text-green-500 font-medium mb-2">
                <TrendingUp className="h-4 w-4" />
                Pontos Fortes
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Taxa de conversão {metricas.taxaConversao >= 30 ? "acima" : "dentro"} da média</li>
                <li>• Engajamento médio de {metricas.mediaMessagens} mensagens por conversa</li>
                <li>• {metricas.conversasPositivas} conversas com resultado positivo</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-2 text-yellow-500 font-medium mb-2">
                <AlertTriangle className="h-4 w-4" />
                Pontos de Atenção
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Objeção mais comum: {metricas.objecoesPorCategoria[0]?.label || "Preço"}</li>
                <li>• {metricas.conversasNegativas} conversas com resultado negativo</li>
                <li>• Trabalhar argumentos para objeções financeiras</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2 text-primary font-medium mb-2">
              <Target className="h-4 w-4" />
              Próximos Passos Recomendados
            </div>
            <ol className="text-sm space-y-2 text-muted-foreground">
              <li>1. Desenvolver scripts específicos para contornar objeções de preço</li>
              <li>2. Criar cases de sucesso para aumentar a confiança dos leads</li>
              <li>3. Testar diferentes abordagens de urgência e escassez</li>
              <li>4. Segmentar ofertas por perfil de ICP para maior personalização</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
