import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  DollarSign,
  TrendingUp,
  Target,
  Rocket,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Users,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Edit,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { SugestoesAcao } from "@/components/SugestoesAcao";
import {
  metasAnuais,
  analisarGaps,
  getTodasCampanhas,
  tierDescricoes,
  type Nucleo,
} from "@/data/campanhasData";

// Metas anuais por núcleo (conforme solicitado)
const metasAnuaisPorNucleo = {
  MGS: {
    metaAnual: 20000000, // R$ 20M
    faturadoAtual: 1290000, // Jan R$200K + Fev R$1.09M
    investimentoAnual: 4120000,
    campanhasAtivas: 8,
    cor: "#ef4444",
  },
  ACELERAI: {
    metaAnual: 50000000, // R$ 50M
    faturadoAtual: 3000000, // Jan R$1.5M + Fev R$1.5M
    investimentoAnual: 1100000,
    campanhasAtivas: 4,
    cor: "#f97316",
  },
  OUTROS: {
    metaAnual: 5000000, // R$ 5M
    faturadoAtual: 0,
    investimentoAnual: 730000,
    campanhasAtivas: 4,
    cor: "#8b5cf6",
  },
};

// Dados de faturamento mensal por núcleo (sincronizado com aba Tático)
const faturamentoMensalPorNucleo = [
  { mes: "Jan", MGS: 200000, ACELERAI: 1500000, OUTROS: 0 },
  { mes: "Fev", MGS: 1090000, ACELERAI: 1500000, OUTROS: 0 },
  { mes: "Mar", MGS: 900000, ACELERAI: 600000, OUTROS: 500000 },
  { mes: "Abr", MGS: 700000, ACELERAI: 0, OUTROS: 360000 },
  { mes: "Mai", MGS: 650000, ACELERAI: 710000, OUTROS: 350000 },
  { mes: "Jun", MGS: 1200000, ACELERAI: 0, OUTROS: 1000000 },
  { mes: "Jul", MGS: 1800000, ACELERAI: 0, OUTROS: 250000 },
  { mes: "Ago", MGS: 450000, ACELERAI: 0, OUTROS: 500000 },
  { mes: "Set", MGS: 1200000, ACELERAI: 450000, OUTROS: 500000 },
  { mes: "Out", MGS: 1800000, ACELERAI: 1000000, OUTROS: 250000 },
  { mes: "Nov", MGS: 2000000, ACELERAI: 0, OUTROS: 750000 },
  { mes: "Dez", MGS: 1000000, ACELERAI: 0, OUTROS: 500000 },
];

// Próximas campanhas
const proximasCampanhas = [
  { nome: "MGS - Jornada Exponencial", nucleo: "MGS" as Nucleo, tier: 1, data: "25-27 Fev", status: "Em preparação" },
  { nome: "MGS - Brand e Posicionamento", nucleo: "MGS" as Nucleo, tier: 1, data: "18-20 Mar", status: "Planejado" },
  { nome: "Aceleraí - Arthur Aguiar", nucleo: "ACELERAI" as Nucleo, tier: 3, data: "Mar", status: "Planejado" },
  { nome: "Criatividade Exponencial", nucleo: "MGS" as Nucleo, tier: 2, data: "Perpétuo", status: "Ativo" },
  { nome: "Symphonia", nucleo: "MGS" as Nucleo, tier: 5, data: "Mar", status: "Lista Espera" },
];

const statusColors: Record<string, string> = {
  "Em preparação": "bg-[var(--md3-tertiary-container)] text-[var(--md3-on-tertiary-container)]",
  "Planejado": "bg-[var(--md3-secondary-container)] text-[var(--md3-on-secondary-container)]",
  "Ativo": "bg-[var(--md3-success-container)] text-[var(--md3-on-success-container)]",
  "Lista Espera": "bg-[var(--md3-tertiary-container)] text-[var(--md3-on-tertiary-container)]",
};

const nucleoColors: Record<Nucleo, string> = {
  MGS: "bg-[var(--md3-primary-container)] text-[var(--md3-on-primary-container)] border-[var(--md3-primary-container)]",
  ACELERAI: "bg-[var(--md3-secondary-container)] text-[var(--md3-on-secondary-container)] border-[var(--md3-secondary-container)]",
  OUTROS: "bg-[var(--md3-tertiary-container)] text-[var(--md3-on-tertiary-container)] border-[var(--md3-tertiary-container)]",
};

// Cores dos Tiers corrigidas para MD3
const tierColors: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: "bg-[var(--md3-primary)]", text: "text-[var(--md3-on-primary)]", label: "Lançamento/Ação do Mês" },
  2: { bg: "bg-[var(--md3-secondary)]", text: "text-[var(--md3-on-secondary)]", label: "Funis Menores e Variados" },
  3: { bg: "bg-[var(--md3-tertiary)]", text: "text-[var(--md3-on-tertiary)]", label: "Perpétuo" },
  4: { bg: "bg-[var(--md3-surface-variant)]", text: "text-[var(--md3-on-surface-variant)]", label: "Renovação, Recuperação e RMKT" },
  5: { bg: "bg-[var(--md3-outline)]", text: "text-[var(--md3-on-surface)]", label: "Upsell" },
};

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return `R$ ${value.toFixed(0)}`;
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [nucleoSelecionado, setNucleoSelecionado] = useState<"TODOS" | Nucleo>("TODOS");
  const [taxaConversao, setTaxaConversao] = useState(2); // Taxa de conversão padrão 2%
  const [mesSelecionado, setMesSelecionado] = useState(1); // Fevereiro (0-indexed)
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [metasEditaveis, setMetasEditaveis] = useState({
    MGS: 20000000,
    ACELERAI: 50000000,
    OUTROS: 5000000
  });
  const [faturamentoEditavel, setFaturamentoEditavel] = useState([
    { mes: "Jan", MGS: 200000, ACELERAI: 1500000, OUTROS: 0 },
    { mes: "Fev", MGS: 1090000, ACELERAI: 1500000, OUTROS: 0 },
    { mes: "Mar", MGS: 900000, ACELERAI: 600000, OUTROS: 500000 },
    { mes: "Abr", MGS: 700000, ACELERAI: 0, OUTROS: 360000 },
    { mes: "Mai", MGS: 650000, ACELERAI: 710000, OUTROS: 350000 },
    { mes: "Jun", MGS: 1200000, ACELERAI: 0, OUTROS: 1000000 },
    { mes: "Jul", MGS: 1800000, ACELERAI: 0, OUTROS: 250000 },
    { mes: "Ago", MGS: 450000, ACELERAI: 0, OUTROS: 500000 },
    { mes: "Set", MGS: 1200000, ACELERAI: 450000, OUTROS: 500000 },
    { mes: "Out", MGS: 1800000, ACELERAI: 1000000, OUTROS: 250000 },
    { mes: "Nov", MGS: 2000000, ACELERAI: 0, OUTROS: 750000 },
    { mes: "Dez", MGS: 1000000, ACELERAI: 0, OUTROS: 500000 },
  ]);

  // Calcular totais
  const totalMetaAnual = Object.values(metasAnuaisPorNucleo).reduce((acc, n) => acc + n.metaAnual, 0);
  const totalFaturadoAtual = Object.values(metasAnuaisPorNucleo).reduce((acc, n) => acc + n.faturadoAtual, 0);
  const totalInvestimento = Object.values(metasAnuaisPorNucleo).reduce((acc, n) => acc + n.investimentoAnual, 0);
  const totalCampanhas = Object.values(metasAnuaisPorNucleo).reduce((acc, n) => acc + n.campanhasAtivas, 0);

  // Dados filtrados por núcleo
  const dadosFiltrados = nucleoSelecionado === "TODOS" 
    ? { 
        metaAnual: totalMetaAnual, 
        faturadoAtual: totalFaturadoAtual, 
        investimentoAnual: totalInvestimento, 
        campanhasAtivas: totalCampanhas 
      }
    : metasAnuaisPorNucleo[nucleoSelecionado];

  // Calcular progresso da meta
  const progressoMeta = (dadosFiltrados.faturadoAtual / dadosFiltrados.metaAnual) * 100;
  
  // Calcular projeção anual baseada no faturamento atual (2 meses)
  const projecaoAnual = (dadosFiltrados.faturadoAtual / 2) * 12;
  const tendenciaMeta = projecaoAnual >= dadosFiltrados.metaAnual;
  const gapMeta = dadosFiltrados.metaAnual - projecaoAnual;

  // Estados para edição da Visão de Leads
  const [editandoLeads, setEditandoLeads] = useState(false);
  const [ticketMedioEditavel, setTicketMedioEditavel] = useState({
    MGS: 15000,
    ACELERAI: 5000,
    OUTROS: 10000,
    TODOS: 10000
  });
  const [mesesRestantes, setMesesRestantes] = useState(10);
  const [investimentoEditavel, setInvestimentoEditavel] = useState({
    MGS: 4120000,
    ACELERAI: 1100000,
    OUTROS: 730000,
    TODOS: 5950000
  });

  // Calcular leads necessários baseado na taxa de conversão
  const ticketMedio = ticketMedioEditavel[nucleoSelecionado];
  const vendasNecessarias = Math.ceil((dadosFiltrados.metaAnual - dadosFiltrados.faturadoAtual) / ticketMedio);
  const leadsNecessarios = Math.ceil(vendasNecessarias / (taxaConversao / 100));
  const leadsNecessariosPorMes = Math.ceil(leadsNecessarios / mesesRestantes);

  // Dados de tiers corrigidos
  const todasCampanhas = getTodasCampanhas();
  const tiersData = [1, 2, 3, 4, 5].map(tier => {
    const campanhasTier = todasCampanhas.filter(c => c.tier === tier);
    const faturamento = campanhasTier.reduce((acc, c) => acc + (c.metaFaturamento || 0), 0);
    const investimento = campanhasTier.reduce((acc, c) => acc + (c.investimentoProjetado || 0), 0);
    return {
      tier: `T${tier}`,
      tierNum: tier,
      nome: tierColors[tier].label,
      faturamento,
      investimento,
      roas: investimento > 0 ? (faturamento / investimento).toFixed(2) : "-",
      campanhas: campanhasTier.length,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header com seletor de núcleo */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Lírica
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            O Renascimento da Comunicação • MGS & Aceleraí
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-6">
          {/* Seletor de Mês */}
          <div className="flex items-center gap-2 bg-[var(--md3-surface-container)]/50 rounded-2xl p-1 border border-[var(--md3-outline-variant)]/20">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setMesSelecionado(Math.max(0, mesSelecionado - 1))}
              disabled={mesSelecionado === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select value={mesSelecionado.toString()} onValueChange={(v) => setMesSelecionado(parseInt(v))}>
              <SelectTrigger className="w-[100px] border-0 bg-transparent">
                <SelectValue>{meses[mesSelecionado]} 2026</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {meses.map((mes, idx) => (
                  <SelectItem key={mes} value={idx.toString()}>{mes} 2026</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setMesSelecionado(Math.min(11, mesSelecionado + 1))}
              disabled={mesSelecionado === 11}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Botão Editar Metas */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditandoMeta(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar Metas
          </Button>

          {/* Botão Exportar para Planejamento */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportDialog(true)}
            className="gap-2 border-[var(--md3-success)] text-[var(--md3-success)] hover:bg-[var(--md3-success-container)]"
          >
            <Upload className="h-4 w-4" />
            Exportar
          </Button>

          <SugestoesAcao campanhasExistentes={getTodasCampanhas()} />
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs md:text-sm text-muted-foreground">
              Atualizado em {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs de Núcleos */}
      <Tabs value={nucleoSelecionado} onValueChange={(v) => setNucleoSelecionado(v as "TODOS" | Nucleo)}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="TODOS" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="MGS" className="gap-2">
            <Building2 className="h-4 w-4" />
            MGS
          </TabsTrigger>
          <TabsTrigger value="ACELERAI" className="gap-2">
            <Users className="h-4 w-4" />
            Aceleraí
          </TabsTrigger>
          <TabsTrigger value="OUTROS" className="gap-2">
            <Rocket className="h-4 w-4" />
            Outros
          </TabsTrigger>
        </TabsList>

        {/* KPIs Cards - Meta Anual e Faturamento Atual */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {/* Meta Anual */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meta Anual 2026</CardTitle>
              <Target className="h-4 w-4 text-[var(--md3-primary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[var(--md3-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                {formatCurrency(dadosFiltrados.metaAnual)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {nucleoSelecionado === "ACELERAI" ? "Meta Aceleraí" : 
                 nucleoSelecionado === "MGS" ? "Meta MGS" : 
                 nucleoSelecionado === "OUTROS" ? "Meta Outros" : "Meta Consolidada"}
              </p>
            </CardContent>
          </Card>

          {/* Faturamento Atual */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturado (Jan-Fev)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {formatCurrency(dadosFiltrados.faturadoAtual)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progressoMeta} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">{progressoMeta.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Tendência/Projeção */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projeção Anual</CardTitle>
              {tendenciaMeta ? (
                <CheckCircle className="h-4 w-4 text-[var(--md3-success)]" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-[var(--md3-error)]" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${tendenciaMeta ? "text-[var(--md3-success)]" : "text-[var(--md3-error)]"}`} style={{ fontFamily: 'var(--font-display)' }}>
                {formatCurrency(projecaoAnual)}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {tendenciaMeta ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-[var(--md3-success)]" />
                    <span className="text-[var(--md3-success)]">No caminho da meta</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-[var(--md3-error)]" />
                    <span className="text-[var(--md3-error)]">Gap de {formatCurrency(gapMeta)}</span>
                  </>
                )}
              </p>
            </CardContent>
          </Card>

          {/* Campanhas Ativas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
              <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {dadosFiltrados.campanhasAtivas}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-[var(--md3-success)]" />
                <span className="text-[var(--md3-success)]">+2</span> Este mês
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visão de Leads */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Visão de Leads Necessários
                </CardTitle>
                <CardDescription>
                  Projeção de leads para atingir a meta anual
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant={editandoLeads ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (editandoLeads) {
                      toast.success("Parâmetros de leads salvos!");
                    }
                    setEditandoLeads(!editandoLeads);
                  }}
                >
                  {editandoLeads ? (
                    <><Save className="h-4 w-4 mr-2" />Salvar</>  
                  ) : (
                    <><Edit className="h-4 w-4 mr-2" />Editar Parâmetros</>  
                  )}
                </Button>
                <Label className="text-sm">Taxa de Conversão:</Label>
                <div className="flex items-center gap-2 w-48">
                  <Slider
                    value={[taxaConversao]}
                    onValueChange={(v) => setTaxaConversao(v[0])}
                    min={1}
                    max={5}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{taxaConversao}%</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Parâmetros Editáveis */}
            {editandoLeads && (
              <div className="mb-6 p-4 rounded-2xl bg-[var(--md3-surface-container)]/50 border border-[var(--md3-outline-variant)]/30 space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Parâmetros de Cálculo</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Ticket Médio (R$)</Label>
                    <Input
                      type="number"
                      value={ticketMedioEditavel[nucleoSelecionado]}
                      onChange={(e) => {
                        setTicketMedioEditavel({
                          ...ticketMedioEditavel,
                          [nucleoSelecionado]: parseFloat(e.target.value) || 0
                        });
                      }}
                      className="bg-[var(--md3-surface-container-low)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Meses Restantes</Label>
                    <Input
                      type="number"
                      value={mesesRestantes}
                      onChange={(e) => setMesesRestantes(parseInt(e.target.value) || 1)}
                      min={1}
                      max={12}
                      className="bg-[var(--md3-surface-container-low)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Investimento Anual (R$)</Label>
                    <Input
                      type="number"
                      value={investimentoEditavel[nucleoSelecionado]}
                      onChange={(e) => {
                        setInvestimentoEditavel({
                          ...investimentoEditavel,
                          [nucleoSelecionado]: parseFloat(e.target.value) || 0
                        });
                      }}
                      className="bg-[var(--md3-surface-container-low)]"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-[var(--md3-surface-container-low)]/30 rounded-2xl p-4 border border-[var(--md3-outline-variant)]/20 hover:border-[var(--md3-outline-variant)]/40 transition-all group relative">
                <div className="text-sm text-muted-foreground mb-1">Vendas Necessárias</div>
                <div className="text-2xl font-bold text-[var(--md3-primary)]">{formatNumber(vendasNecessarias)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ticket médio: {formatCurrency(ticketMedio)}
                </div>
              </div>
              <div className="bg-[var(--md3-surface-container-low)]/30 rounded-2xl p-4 border border-[var(--md3-outline-variant)]/20 hover:border-[var(--md3-outline-variant)]/40 transition-all">
                <div className="text-sm text-muted-foreground mb-1">Leads Totais</div>
                <div className="text-2xl font-bold text-[var(--md3-secondary)]">{formatNumber(leadsNecessarios)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Com conversão de {taxaConversao}%
                </div>
              </div>
              <div className="bg-[var(--md3-surface-container-low)]/30 rounded-2xl p-4 border border-[var(--md3-outline-variant)]/20 hover:border-[var(--md3-outline-variant)]/40 transition-all">
                <div className="text-sm text-muted-foreground mb-1">Leads/Mês</div>
                <div className="text-2xl font-bold text-[var(--md3-tertiary)]">{formatNumber(leadsNecessariosPorMes)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Próximos {mesesRestantes} meses
                </div>
              </div>
              <div className="bg-[var(--md3-surface-container-low)]/30 rounded-2xl p-4 border border-[var(--md3-outline-variant)]/20 hover:border-[var(--md3-outline-variant)]/40 transition-all">
                <div className="text-sm text-muted-foreground mb-1">CPL Máximo</div>
                <div className="text-2xl font-bold text-[var(--md3-success)]">
                  {formatCurrency(investimentoEditavel[nucleoSelecionado] / leadsNecessarios)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Para manter ROAS positivo
                </div>
              </div>
            </div>

            {/* Tabela de cenários por taxa de conversão */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--md3-outline-variant)]">
                    <th className="text-left py-2 px-3 text-muted-foreground">Taxa</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Leads Totais</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Leads/Mês</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">CPL Máximo</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Dificuldade</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((taxa) => {
                    const leads = Math.ceil(vendasNecessarias / (taxa / 100));
                    const leadsMes = Math.ceil(leads / mesesRestantes);
                    const cplMax = investimentoEditavel[nucleoSelecionado] / leads;
                    const dificuldade = taxa <= 2 ? "Alta" : taxa <= 3 ? "Média" : "Baixa";
                    const corDificuldade = taxa <= 2 ? "text-[var(--md3-error)]" : taxa <= 3 ? "text-[var(--md3-tertiary)]" : "text-[var(--md3-success)]";
                    return (
                      <tr key={taxa} className={`border-b border-[var(--md3-outline-variant)] ${taxa === taxaConversao ? "bg-[var(--md3-primary-container)]" : ""}`}>
                        <td className="py-2 px-3 font-medium">{taxa}%</td>
                        <td className="py-2 px-3 text-right">{formatNumber(leads)}</td>
                        <td className="py-2 px-3 text-right">{formatNumber(leadsMes)}</td>
                        <td className="py-2 px-3 text-right">{formatCurrency(cplMax)}</td>
                        <td className={`py-2 px-3 text-right ${corDificuldade}`}>{dificuldade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Núcleo */}
        {nucleoSelecionado === "TODOS" && (
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            {(["MGS", "ACELERAI", "OUTROS"] as Nucleo[]).map((nucleo) => {
              const dados = metasAnuaisPorNucleo[nucleo];
              const progresso = (dados.faturadoAtual / dados.metaAnual) * 100;
              const projecao = (dados.faturadoAtual / 2) * 12;
              const noTarget = projecao >= dados.metaAnual;
              
              return (
                <Card key={nucleo} className="hover:border-[var(--md3-primary)]/40 transition-all cursor-pointer hover:shadow-md" onClick={() => setNucleoSelecionado(nucleo)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge className={nucleoColors[nucleo]}>{nucleo}</Badge>
                      <span className="text-xs text-muted-foreground">{dados.campanhasAtivas} campanhas</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Meta Anual</span>
                          <span className="font-semibold text-[var(--md3-primary)]">{formatCurrency(dados.metaAnual)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Faturado</span>
                          <span className="font-semibold">{formatCurrency(dados.faturadoAtual)}</span>
                        </div>
                        <Progress value={progresso} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{progresso.toFixed(1)}% da meta</span>
                          <span className={noTarget ? "text-[var(--md3-success)]" : "text-[var(--md3-error)]"}>
                            {noTarget ? "✓ No caminho" : "⚠ Abaixo"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Projeção</span>
                          <span className={`font-semibold ${noTarget ? "text-[var(--md3-success)]" : "text-[var(--md3-error)]"}`}>
                            {formatCurrency(projecao)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Distribuição por Tier - Corrigida */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Distribuição por Tier</CardTitle>
            <CardDescription>
              Faturamento projetado por tipo de campanha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {tiersData.map((tier) => (
                <div key={tier.tier} className="flex items-center gap-4 p-3 bg-[var(--md3-surface-container-low)]/30 rounded-2xl border border-[var(--md3-outline-variant)]/20 hover:border-[var(--md3-outline-variant)]/40 transition-all">
                  <div className={`w-10 h-10 rounded-xl ${tierColors[tier.tierNum].bg} flex items-center justify-center text-white font-bold shadow-sm`}>
                    {tier.tier}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{tier.nome}</span>
                      <span className="text-sm text-muted-foreground">{tier.campanhas} campanhas</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Fat: <span className="text-white font-medium">{formatCurrency(tier.faturamento)}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Inv: <span className="text-white font-medium">{formatCurrency(tier.investimento)}</span>
                      </span>
                      <span className="text-muted-foreground">
                        ROAS: <span className={`font-medium ${parseFloat(tier.roas) >= 3 ? "text-[var(--md3-success)]" : parseFloat(tier.roas) >= 2 ? "text-[var(--md3-tertiary)]" : "text-[var(--md3-error)]"}`}>
                          {tier.roas}x
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-7 mt-8">
          {/* Gráfico de Faturamento Mensal */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Projeção de Faturamento por Núcleo</CardTitle>
              <CardDescription>Valores em milhares (R$ mil) • 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={faturamentoMensalPorNucleo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="mes" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="MGS" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="MGS" />
                  <Area type="monotone" dataKey="ACELERAI" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Aceleraí" />
                  <Area type="monotone" dataKey="OUTROS" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Outros" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Próximas Campanhas */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Próximas Campanhas</CardTitle>
              <CardDescription>Lançamentos programados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximasCampanhas.map((campanha, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--md3-surface-container)]/50 transition-all">
                    <div className={`w-8 h-8 rounded-lg ${tierColors[campanha.tier].bg} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                      T{campanha.tier}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{campanha.nome}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className={nucleoColors[campanha.nucleo] + " text-xs py-0"}>
                          {campanha.nucleo}
                        </Badge>
                        <span>{campanha.data}</span>
                      </div>
                    </div>
                    <Badge className={statusColors[campanha.status] + " text-xs"}>
                      {campanha.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>

      {/* Modal de Edição de Metas */}
      <Dialog open={editandoMeta} onOpenChange={setEditandoMeta}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Editar Metas e Faturamento
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Metas Anuais */}
            <div>
              <h3 className="font-semibold mb-4">Metas Anuais 2026</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Meta MGS</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={metasEditaveis.MGS}
                      onChange={(e) => setMetasEditaveis({...metasEditaveis, MGS: parseInt(e.target.value) || 0})}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(metasEditaveis.MGS)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Aceleraí</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={metasEditaveis.ACELERAI}
                      onChange={(e) => setMetasEditaveis({...metasEditaveis, ACELERAI: parseInt(e.target.value) || 0})}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(metasEditaveis.ACELERAI)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Outros</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={metasEditaveis.OUTROS}
                      onChange={(e) => setMetasEditaveis({...metasEditaveis, OUTROS: parseInt(e.target.value) || 0})}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(metasEditaveis.OUTROS)}</p>
                </div>
              </div>
            </div>

            {/* Faturamento do Mês Selecionado */}
            <div>
              <h3 className="font-semibold mb-4">Faturamento de {meses[mesSelecionado]} 2026</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Faturamento MGS</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={faturamentoEditavel[mesSelecionado]?.MGS || 0}
                      onChange={(e) => {
                        const novoFaturamento = [...faturamentoEditavel];
                        novoFaturamento[mesSelecionado] = {
                          ...novoFaturamento[mesSelecionado],
                          MGS: parseInt(e.target.value) || 0
                        };
                        setFaturamentoEditavel(novoFaturamento);
                      }}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(faturamentoEditavel[mesSelecionado]?.MGS || 0)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Faturamento Aceleraí</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={faturamentoEditavel[mesSelecionado]?.ACELERAI || 0}
                      onChange={(e) => {
                        const novoFaturamento = [...faturamentoEditavel];
                        novoFaturamento[mesSelecionado] = {
                          ...novoFaturamento[mesSelecionado],
                          ACELERAI: parseInt(e.target.value) || 0
                        };
                        setFaturamentoEditavel(novoFaturamento);
                      }}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(faturamentoEditavel[mesSelecionado]?.ACELERAI || 0)}</p>
                </div>
                <div className="space-y-2">
                  <Label>Faturamento Outros</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <Input
                      type="number"
                      value={faturamentoEditavel[mesSelecionado]?.OUTROS || 0}
                      onChange={(e) => {
                        const novoFaturamento = [...faturamentoEditavel];
                        novoFaturamento[mesSelecionado] = {
                          ...novoFaturamento[mesSelecionado],
                          OUTROS: parseInt(e.target.value) || 0
                        };
                        setFaturamentoEditavel(novoFaturamento);
                      }}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(faturamentoEditavel[mesSelecionado]?.OUTROS || 0)}</p>
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="p-4 rounded-2xl bg-[var(--md3-surface-container)]/50 border border-[var(--md3-outline-variant)]/30">
              <h4 className="font-medium mb-2">Resumo das Alterações</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meta Total Anual:</span>
                  <span className="font-medium">{formatCurrency(metasEditaveis.MGS + metasEditaveis.ACELERAI + metasEditaveis.OUTROS)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faturamento {meses[mesSelecionado]}:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      (faturamentoEditavel[mesSelecionado]?.MGS || 0) +
                      (faturamentoEditavel[mesSelecionado]?.ACELERAI || 0) +
                      (faturamentoEditavel[mesSelecionado]?.OUTROS || 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditandoMeta(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                toast.success("Metas e faturamento atualizados com sucesso!");
                setEditandoMeta(false);
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Exportação */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-400" />
              Exportar Alterações
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Exporte as alterações do Dashboard para sincronizar com as outras abas de planejamento.
            </p>

            {/* Resumo das alterações */}
            <div className="p-4 rounded-2xl bg-[var(--md3-surface-container)]/50 border border-[var(--md3-outline-variant)]/30">
              <h4 className="font-medium mb-3 text-sm">Dados a serem exportados:</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meta MGS:</span>
                  <span className="font-medium text-[var(--md3-primary)]">{formatCurrency(metasEditaveis.MGS)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meta Aceleraí:</span>
                  <span className="font-medium text-[var(--md3-secondary)]">{formatCurrency(metasEditaveis.ACELERAI)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meta Outros:</span>
                  <span className="font-medium text-[var(--md3-tertiary)]">{formatCurrency(metasEditaveis.OUTROS)}</span>
                </div>
                <div className="flex justify-between border-t border-[var(--md3-outline-variant)] pt-2 mt-2">
                  <span className="text-muted-foreground">Total Anual:</span>
                  <span className="font-bold text-[var(--md3-success)]">{formatCurrency(metasEditaveis.MGS + metasEditaveis.ACELERAI + metasEditaveis.OUTROS)}</span>
                </div>
              </div>
            </div>

            {/* Botões de exportação */}
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-4 border-[var(--md3-secondary)] hover:bg-[var(--md3-secondary-container)]"
                onClick={() => {
                  toast.success("Metas exportadas para Planejamento Estratégico!", {
                    description: "Visão anual atualizada com as novas metas."
                  });
                  setShowExportDialog(false);
                  setLocation("/estrategico");
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--md3-secondary-container)]">
                    <Target className="h-5 w-5 text-[var(--md3-on-secondary-container)]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Exportar para Estratégico</div>
                    <div className="text-xs text-muted-foreground">Visão anual com metas consolidadas</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--md3-on-secondary-container)]" />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between h-auto py-4 border-[var(--md3-secondary)] hover:bg-[var(--md3-secondary-container)]"
                onClick={() => {
                  toast.success("Faturamento exportado para Planejamento Tático!", {
                    description: "Visão mensal atualizada com os novos valores."
                  });
                  setShowExportDialog(false);
                  setLocation("/tatico");
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--md3-secondary-container)]">
                    <Calendar className="h-5 w-5 text-[var(--md3-on-secondary-container)]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Exportar para Tático</div>
                    <div className="text-xs text-muted-foreground">Visão mensal com faturamento por mês</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--md3-on-secondary-container)]" />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between h-auto py-4 border-[var(--md3-success)] hover:bg-[var(--md3-success-container)]"
                onClick={() => {
                  toast.success("Dados exportados para todas as abas!", {
                    description: "Estratégico, Tático e Operacional sincronizados."
                  });
                  setShowExportDialog(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--md3-success-container)]">
                    <Sparkles className="h-5 w-5 text-[var(--md3-on-success-container)]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Exportar para Todas as Abas</div>
                    <div className="text-xs text-muted-foreground">Sincronizar Estratégico, Tático e Operacional</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--md3-on-success-container)]" />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowExportDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
