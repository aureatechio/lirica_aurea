import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  ArrowRight,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

type Nucleo = "MGS" | "ACELERAI" | "OUTROS";

// Campanhas disponíveis para seleção (com metas pré-definidas)
const campanhasDisponiveis = [
  { id: "branding", nome: "Branding Exponencial", nucleo: "MGS" as Nucleo, tier: 1, metaFat: 300000, invProjetado: 50000, ticketMedio: 15000, taxaConversao: 2.5 },
  { id: "bloco", nome: "Bloco", nucleo: "ACELERAI" as Nucleo, tier: 1, metaFat: 200000, invProjetado: 50000, ticketMedio: 8000, taxaConversao: 3 },
  { id: "ia", nome: "IA Exponencial", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 100000, invProjetado: 30000, ticketMedio: 5000, taxaConversao: 2 },
  { id: "incompany", nome: "In Company", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 50000, invProjetado: 15000, ticketMedio: 25000, taxaConversao: 1.5 },
  { id: "calendario", nome: "Calendário Exponencial", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 100000, invProjetado: 20000, ticketMedio: 2000, taxaConversao: 4 },
  { id: "passaporte", nome: "Passaporte", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 360000, invProjetado: 20000, ticketMedio: 3000, taxaConversao: 5 },
  { id: "pulse", nome: "Pulse + MGS", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 60000, invProjetado: 15000, ticketMedio: 6000, taxaConversao: 2 },
  { id: "politico", nome: "Marketing Político", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 100000, invProjetado: 20000, ticketMedio: 10000, taxaConversao: 2 },
  { id: "hotseat", nome: "Hotseat", nucleo: "MGS" as Nucleo, tier: 2, metaFat: 20000, invProjetado: 6000, ticketMedio: 2000, taxaConversao: 3 },
  { id: "saude", nome: "Saúde", nucleo: "ACELERAI" as Nucleo, tier: 2, metaFat: 200000, invProjetado: 20000, ticketMedio: 5000, taxaConversao: 4 },
  { id: "asc", nome: "ASC", nucleo: "ACELERAI" as Nucleo, tier: 2, metaFat: 900000, invProjetado: 300000, ticketMedio: 15000, taxaConversao: 2 },
  { id: "cargos", nome: "Cargos", nucleo: "ACELERAI" as Nucleo, tier: 2, metaFat: 150000, invProjetado: 50000, ticketMedio: 7500, taxaConversao: 2.5 },
  { id: "rr", nome: "R&R", nucleo: "ACELERAI" as Nucleo, tier: 2, metaFat: 50000, invProjetado: 5000, ticketMedio: 2500, taxaConversao: 4 },
  { id: "custom", nome: "Campanha Personalizada", nucleo: "OUTROS" as Nucleo, tier: 0, metaFat: 100000, invProjetado: 20000, ticketMedio: 5000, taxaConversao: 2 },
];

const nucleoColors: Record<Nucleo, string> = {
  MGS: "bg-[var(--md3-primary-container)] text-[var(--md3-primary)] border-[var(--md3-outline-variant)]",
  ACELERAI: "bg-[var(--md3-secondary-container)] text-[var(--md3-secondary)] border-[var(--md3-outline-variant)]",
  OUTROS: "bg-[var(--md3-tertiary-container)] text-[var(--md3-tertiary)] border-[var(--md3-outline-variant)]",
};

// Cenários de performance
const cenarios = [
  { nome: "Ideal", cpl: 30, conversaoMult: 1.5, cor: "text-[var(--md3-success)] bg-[var(--md3-success-container)]" },
  { nome: "Ótimo", cpl: 40, conversaoMult: 1.3, cor: "text-[var(--md3-tertiary)] bg-[var(--md3-tertiary-container)]" },
  { nome: "Bom", cpl: 50, conversaoMult: 1.1, cor: "text-[var(--md3-tertiary)] bg-[var(--md3-tertiary-container)]" },
  { nome: "Padrão", cpl: 60, conversaoMult: 1.0, cor: "text-[var(--md3-tertiary)] bg-[var(--md3-tertiary-container)]" },
  { nome: "Ruim", cpl: 70, conversaoMult: 0.8, cor: "text-[var(--md3-secondary)] bg-[var(--md3-secondary-container)]" },
  { nome: "Péssimo", cpl: 80, conversaoMult: 0.6, cor: "text-[var(--md3-error)] bg-[var(--md3-primary-container)]" },
];

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(1)}K`;
  }
  return `R$ ${value.toFixed(0)}`;
}

export default function Operacional() {
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<string>("branding");
  
  // Encontrar campanha selecionada
  const campanha = campanhasDisponiveis.find(c => c.id === campanhaSelecionada) || campanhasDisponiveis[0];
  
  // Estados do simulador (inicializados com valores da campanha)
  const [simulador, setSimulador] = useState({
    metaFaturamento: campanha.metaFat,
    investimento: campanha.invProjetado,
    ticketMedio: campanha.ticketMedio,
    taxaConversao: campanha.taxaConversao,
    cpl: 40,
    leadsOrganicos: 200,
  });

  // Atualizar simulador quando mudar campanha
  const handleCampanhaChange = (id: string) => {
    setCampanhaSelecionada(id);
    const novaCampanha = campanhasDisponiveis.find(c => c.id === id);
    if (novaCampanha) {
      setSimulador({
        ...simulador,
        metaFaturamento: novaCampanha.metaFat || 100000,
        investimento: novaCampanha.invProjetado || 20000,
        ticketMedio: novaCampanha.ticketMedio || 5000,
        taxaConversao: novaCampanha.taxaConversao || 2,
      });
    }
  };

  // Cálculos do funil
  const leadsPagos = Math.floor(simulador.investimento / simulador.cpl);
  const leadsTotal = simulador.leadsOrganicos + leadsPagos;
  const vendasProjetadas = Math.floor(leadsTotal * (simulador.taxaConversao / 100));
  const faturamentoProjetado = vendasProjetadas * simulador.ticketMedio;
  const roasProjetado = simulador.investimento > 0 ? faturamentoProjetado / simulador.investimento : 0;

  // Determinar cenário atual
  const getCenarioAtual = () => {
    if (simulador.cpl <= 30) return "Ideal";
    if (simulador.cpl <= 40) return "Ótimo";
    if (simulador.cpl <= 50) return "Bom";
    if (simulador.cpl <= 60) return "Padrão";
    if (simulador.cpl <= 70) return "Ruim";
    return "Péssimo";
  };

  const cenarioAtual = getCenarioAtual();
  const cenarioInfo = cenarios.find(c => c.nome === cenarioAtual);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Visão Operacional
          </h1>
          <p className="text-muted-foreground">
            Simulador de cenários e calculadora de campanhas
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={campanhaSelecionada} onValueChange={handleCampanhaChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione uma campanha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">➕ Campanha Personalizada</SelectItem>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">MGS</div>
              {campanhasDisponiveis.filter(c => c.nucleo === "MGS").map(c => (
                <SelectItem key={c.id} value={c.id}>
                  T{c.tier} - {c.nome}
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">ACELERAÍ</div>
              {campanhasDisponiveis.filter(c => c.nucleo === "ACELERAI").map(c => (
                <SelectItem key={c.id} value={c.id}>
                  T{c.tier} - {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge className={`text-sm px-3 py-1 ${cenarioInfo?.cor}`}>
            Cenário: {cenarioAtual}
          </Badge>
        </div>
      </div>

      {/* Info da Campanha Selecionada */}
      {campanha.id !== "custom" && (
        <Card className="border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={nucleoColors[campanha.nucleo]}>{campanha.nucleo}</Badge>
                <Badge variant="outline">Tier {campanha.tier}</Badge>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {campanha.nome}
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Meta</p>
                  <p className="text-lg font-bold text-[var(--md3-success)]">{formatCurrency(campanha.metaFat)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Investimento</p>
                  <p className="text-lg font-bold text-[var(--md3-error)]">{formatCurrency(campanha.invProjetado)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">ROAS Alvo</p>
                  <p className="text-lg font-bold">{(campanha.metaFat / campanha.invProjetado).toFixed(1)}x</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Simulador de Funil */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
              <Calculator className="h-5 w-5 inline mr-2" />
              Parâmetros da Campanha
            </CardTitle>
            <CardDescription>Ajuste os valores para simular diferentes cenários</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Investimento */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Investimento em Mídia</Label>
                <span className="text-sm font-mono text-[var(--md3-error)]">{formatCurrency(simulador.investimento)}</span>
              </div>
              <Slider
                value={[simulador.investimento]}
                onValueChange={([v]) => setSimulador({ ...simulador, investimento: v })}
                min={1000}
                max={500000}
                step={1000}
              />
            </div>

            {/* CPL */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>CPL (Custo por Lead)</Label>
                <span className="text-sm font-mono">R$ {simulador.cpl}</span>
              </div>
              <Slider
                value={[simulador.cpl]}
                onValueChange={([v]) => setSimulador({ ...simulador, cpl: v })}
                min={15}
                max={100}
                step={5}
              />
            </div>

            {/* Leads Orgânicos */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Leads Orgânicos</Label>
                <span className="text-sm font-mono">{simulador.leadsOrganicos}</span>
              </div>
              <Slider
                value={[simulador.leadsOrganicos]}
                onValueChange={([v]) => setSimulador({ ...simulador, leadsOrganicos: v })}
                min={0}
                max={2000}
                step={50}
              />
            </div>

            {/* Ticket Médio */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Ticket Médio</Label>
                <span className="text-sm font-mono">{formatCurrency(simulador.ticketMedio)}</span>
              </div>
              <Slider
                value={[simulador.ticketMedio]}
                onValueChange={([v]) => setSimulador({ ...simulador, ticketMedio: v })}
                min={500}
                max={50000}
                step={500}
              />
            </div>

            {/* Taxa de Conversão */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Taxa de Conversão</Label>
                <span className="text-sm font-mono">{simulador.taxaConversao.toFixed(1)}%</span>
              </div>
              <Slider
                value={[simulador.taxaConversao * 10]}
                onValueChange={([v]) => setSimulador({ ...simulador, taxaConversao: v / 10 })}
                min={5}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        {/* Projeção do Funil */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
              <BarChart3 className="h-5 w-5 inline mr-2" />
              Projeção de Resultados
            </CardTitle>
            <CardDescription>Baseado nos parâmetros configurados</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Funil Visual */}
            <div className="grid gap-4 grid-cols-2 mb-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Leads Pagos</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{leadsPagos.toLocaleString()}</span>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-muted-foreground">Leads Total</span>
                </div>
                <span className="text-2xl font-bold text-cyan-400">{leadsTotal.toLocaleString()}</span>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">Vendas</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{vendasProjetadas}</span>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-muted-foreground">Faturamento</span>
                </div>
                <span className="text-2xl font-bold text-green-400">{formatCurrency(faturamentoProjetado)}</span>
              </div>
            </div>

            {/* ROAS */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ROAS Projetado</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {roasProjetado.toFixed(2)}x
                  </p>
                </div>
                <div className="text-right">
                  {roasProjetado >= 3 ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span>Excelente</span>
                    </div>
                  ) : roasProjetado >= 2 ? (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <TrendingUp className="h-5 w-5" />
                      <span>Bom</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Atenção</span>
                    </div>
                  )}
                </div>
              </div>
              {faturamentoProjetado < simulador.metaFaturamento && (
                <p className="text-xs text-yellow-400 mt-2">
                  Gap para meta: {formatCurrency(simulador.metaFaturamento - faturamentoProjetado)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Cenários */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
            <Zap className="h-5 w-5 inline mr-2" />
            Matriz de Cenários
          </CardTitle>
          <CardDescription>
            Projeções para diferentes combinações de CPL e taxa de conversão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cenário</TableHead>
                <TableHead className="text-right">CPL</TableHead>
                <TableHead className="text-right">Conversão</TableHead>
                <TableHead className="text-right">Leads Pagos</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead className="text-right">Faturamento</TableHead>
                <TableHead className="text-right">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cenarios.map((cenario) => {
                const leadsPagosCenario = Math.floor(simulador.investimento / cenario.cpl);
                const leadsTotalCenario = simulador.leadsOrganicos + leadsPagosCenario;
                const conversaoCenario = simulador.taxaConversao * cenario.conversaoMult;
                const vendasCenario = Math.floor(leadsTotalCenario * (conversaoCenario / 100));
                const faturamentoCenario = vendasCenario * simulador.ticketMedio;
                const roasCenario = simulador.investimento > 0 ? faturamentoCenario / simulador.investimento : 0;

                return (
                  <TableRow
                    key={cenario.nome}
                    className={cenario.nome === cenarioAtual ? "bg-primary/10" : ""}
                  >
                    <TableCell>
                      <Badge className={cenario.cor}>{cenario.nome}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">R$ {cenario.cpl}</TableCell>
                    <TableCell className="text-right font-mono">{conversaoCenario.toFixed(1)}%</TableCell>
                    <TableCell className="text-right font-mono">{leadsPagosCenario.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">{vendasCenario}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(faturamentoCenario)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {roasCenario.toFixed(2)}x
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
