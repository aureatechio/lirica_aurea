import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  Edit,
  Save,
  X,
  Building2,
  Users,
  Calendar,
} from "lucide-react";

type Nucleo = "MGS" | "ACELERAI" | "OUTROS";

const meses = [
  { value: "JAN", label: "Janeiro" },
  { value: "FEV", label: "Fevereiro" },
  { value: "MAR", label: "Março" },
  { value: "ABR", label: "Abril" },
  { value: "MAI", label: "Maio" },
  { value: "JUN", label: "Junho" },
  { value: "JUL", label: "Julho" },
  { value: "AGO", label: "Agosto" },
  { value: "SET", label: "Setembro" },
  { value: "OUT", label: "Outubro" },
  { value: "NOV", label: "Novembro" },
  { value: "DEZ", label: "Dezembro" },
];

// Dados de campanhas de Fevereiro (ROAS 4) - dados corretos da planilha
const campanhasFevereiro = [
  // T1
  { tier: 1, nucleo: "MGS" as Nucleo, produto: "Branding Exponencial", fatMeta: 300000, invProjetado: 50000, roasProjetado: 6, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 1, nucleo: "ACELERAI" as Nucleo, produto: "Bloco", fatMeta: 200000, invProjetado: 50000, roasProjetado: 4, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  // T2
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "IA Exponencial", fatMeta: 100000, invProjetado: 30000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "In Company", fatMeta: 50000, invProjetado: 15000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "Calendário Exponencial", fatMeta: 100000, invProjetado: 20000, roasProjetado: 5, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "Passaporte", fatMeta: 360000, invProjetado: 20000, roasProjetado: 18, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "Pulse + MGS", fatMeta: 60000, invProjetado: 15000, roasProjetado: 4, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "Marketing Político", fatMeta: 100000, invProjetado: 20000, roasProjetado: 5, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "MGS" as Nucleo, produto: "Hotseat", fatMeta: 20000, invProjetado: 6000, roasProjetado: 3.33, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI" as Nucleo, produto: "Saúde", fatMeta: 200000, invProjetado: 20000, roasProjetado: 10, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI" as Nucleo, produto: "ASC", fatMeta: 900000, invProjetado: 300000, roasProjetado: 3, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI" as Nucleo, produto: "Cargos", fatMeta: 150000, invProjetado: 50000, roasProjetado: 3, fatAtual: 0, invAtual: 0, roasAtual: 0 },
  { tier: 2, nucleo: "ACELERAI" as Nucleo, produto: "R&R", fatMeta: 50000, invProjetado: 5000, roasProjetado: 10, fatAtual: 0, invAtual: 0, roasAtual: 0 },
];

const nucleoColors: Record<Nucleo, string> = {
  MGS: "bg-[var(--md3-primary-container)] text-[var(--md3-primary)] border-[var(--md3-outline-variant)]",
  ACELERAI: "bg-[var(--md3-secondary-container)] text-[var(--md3-secondary)] border-[var(--md3-outline-variant)]",
  OUTROS: "bg-[var(--md3-tertiary-container)] text-[var(--md3-tertiary)] border-[var(--md3-outline-variant)]",
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

export default function Tatico() {
  const [mesSelecionado, setMesSelecionado] = useState("FEV");
  const [nucleoFiltro, setNucleoFiltro] = useState<"TODOS" | Nucleo>("TODOS");
  const [tierFiltro, setTierFiltro] = useState<"TODOS" | string>("TODOS");
  const [editMode, setEditMode] = useState(false);

  // Calculadora de Funil
  const [calculadora, setCalculadora] = useState({
    ticketMedio: 5000,
    taxaConversao: 2,
    metaFaturamento: 500000,
    cpl: 15,
  });

  // Filtrar campanhas
  const campanhasFiltradas = campanhasFevereiro.filter(c => {
    const nucleoMatch = nucleoFiltro === "TODOS" || c.nucleo === nucleoFiltro;
    const tierMatch = tierFiltro === "TODOS" || c.tier === parseInt(tierFiltro);
    return nucleoMatch && tierMatch;
  });

  // Calcular totais
  const totais = campanhasFiltradas.reduce(
    (acc, c) => ({
      fatMeta: acc.fatMeta + c.fatMeta,
      invProjetado: acc.invProjetado + c.invProjetado,
      fatAtual: acc.fatAtual + c.fatAtual,
      invAtual: acc.invAtual + c.invAtual,
    }),
    { fatMeta: 0, invProjetado: 0, fatAtual: 0, invAtual: 0 }
  );

  const roasProjetadoTotal = totais.invProjetado > 0 ? totais.fatMeta / totais.invProjetado : 0;
  const roasAtualTotal = totais.invAtual > 0 ? totais.fatAtual / totais.invAtual : 0;

  // Cálculos da calculadora
  const vendasNecessarias = Math.ceil(calculadora.metaFaturamento / calculadora.ticketMedio);
  const leadsNecessarios = Math.ceil(vendasNecessarias / (calculadora.taxaConversao / 100));
  const investimentoEstimado = leadsNecessarios * calculadora.cpl;
  const roasEstimado = calculadora.metaFaturamento / investimentoEstimado;

  // Totais por núcleo
  const totaisPorNucleo = {
    MGS: campanhasFevereiro.filter(c => c.nucleo === "MGS").reduce((acc, c) => ({ fat: acc.fat + c.fatMeta, inv: acc.inv + c.invProjetado }), { fat: 0, inv: 0 }),
    ACELERAI: campanhasFevereiro.filter(c => c.nucleo === "ACELERAI").reduce((acc, c) => ({ fat: acc.fat + c.fatMeta, inv: acc.inv + c.invProjetado }), { fat: 0, inv: 0 }),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Visão Tática
          </h1>
          <p className="text-muted-foreground">
            Controle mensal de metas, investimentos e ROAS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map(m => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={nucleoFiltro} onValueChange={(v) => setNucleoFiltro(v as "TODOS" | Nucleo)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Núcleo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="MGS">MGS</SelectItem>
              <SelectItem value="ACELERAI">Aceleraí</SelectItem>
              <SelectItem value="OUTROS">Outros</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tierFiltro} onValueChange={setTierFiltro}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="1">T1</SelectItem>
              <SelectItem value="2">T2</SelectItem>
              <SelectItem value="3">T3</SelectItem>
              <SelectItem value="4">T4</SelectItem>
              <SelectItem value="5">T5</SelectItem>
            </SelectContent>
          </Select>
          {editMode ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button size="sm" onClick={() => setEditMode(false)}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* KPIs do Mês */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Meta de Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {formatCurrency(totais.fatMeta)}
            </div>
            <Progress value={(totais.fatAtual / totais.fatMeta) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((totais.fatAtual / totais.fatMeta) * 100).toFixed(1)}% atingido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Investimento Projetado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {formatCurrency(totais.invProjetado)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Atual: {formatCurrency(totais.invAtual)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ROAS Projetado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--md3-success)]" style={{ fontFamily: 'var(--font-display)' }}>
              {roasProjetadoTotal.toFixed(2)}x
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Atual: {roasAtualTotal.toFixed(2)}x
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Campanhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {campanhasFiltradas.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {meses.find(m => m.value === mesSelecionado)?.label} 2026
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Núcleo */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-[var(--md3-outline-variant)]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[var(--md3-primary)]" />
                MGS
              </CardTitle>
              <Badge className={nucleoColors.MGS}>
                {campanhasFevereiro.filter(c => c.nucleo === "MGS").length} campanhas
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Meta</span>
                <span className="font-medium">{formatCurrency(totaisPorNucleo.MGS.fat)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Investimento</span>
                <span>{formatCurrency(totaisPorNucleo.MGS.inv)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ROAS Proj.</span>
                <span className="text-[var(--md3-success)]">{(totaisPorNucleo.MGS.fat / totaisPorNucleo.MGS.inv).toFixed(2)}x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--md3-outline-variant)]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--md3-secondary)]" />
                Aceleraí
              </CardTitle>
              <Badge className={nucleoColors.ACELERAI}>
                {campanhasFevereiro.filter(c => c.nucleo === "ACELERAI").length} campanhas
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Meta</span>
                <span className="font-medium">{formatCurrency(totaisPorNucleo.ACELERAI.fat)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Investimento</span>
                <span>{formatCurrency(totaisPorNucleo.ACELERAI.inv)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ROAS Proj.</span>
                <span className="text-[var(--md3-success)]">{(totaisPorNucleo.ACELERAI.fat / totaisPorNucleo.ACELERAI.inv).toFixed(2)}x</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roas" className="w-full">
        <TabsList>
          <TabsTrigger value="roas">ROAS por Campanha</TabsTrigger>
          <TabsTrigger value="funil">Calculadora de Funil</TabsTrigger>
        </TabsList>

        {/* Tab ROAS */}
        <TabsContent value="roas">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                <DollarSign className="h-5 w-5 inline mr-2" />
                Campanhas de {meses.find(m => m.value === mesSelecionado)?.label} - ROAS
              </CardTitle>
              <CardDescription>Metas e investimentos por campanha</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Tier</TableHead>
                      <TableHead className="w-[100px]">Núcleo</TableHead>
                      <TableHead className="min-w-[200px]">Produto</TableHead>
                      <TableHead className="text-right">Fat. Meta</TableHead>
                      <TableHead className="text-right">Inv. Proj.</TableHead>
                      <TableHead className="text-right">ROAS Proj.</TableHead>
                      <TableHead className="text-right">Fat. Atual</TableHead>
                      <TableHead className="text-right">Inv. Atual</TableHead>
                      <TableHead className="text-right">ROAS Atual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campanhasFiltradas.map((campanha, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge variant="outline">T{campanha.tier}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={nucleoColors[campanha.nucleo]}>{campanha.nucleo}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{campanha.produto}</TableCell>
                        <TableCell className="text-right">
                          {editMode ? (
                            <Input type="number" defaultValue={campanha.fatMeta} className="w-24 h-8 text-right" />
                          ) : (
                            <span className="text-[var(--md3-success)]">{formatCurrency(campanha.fatMeta)}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editMode ? (
                            <Input type="number" defaultValue={campanha.invProjetado} className="w-24 h-8 text-right" />
                          ) : (
                            <span className="text-[var(--md3-error)]">{formatCurrency(campanha.invProjetado)}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {campanha.roasProjetado.toFixed(2)}x
                        </TableCell>
                        <TableCell className="text-right">
                          {editMode ? (
                            <Input type="number" defaultValue={campanha.fatAtual} className="w-24 h-8 text-right" />
                          ) : (
                            formatCurrency(campanha.fatAtual)
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editMode ? (
                            <Input type="number" defaultValue={campanha.invAtual} className="w-24 h-8 text-right" />
                          ) : (
                            formatCurrency(campanha.invAtual)
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {campanha.roasAtual > 0 ? `${campanha.roasAtual.toFixed(2)}x` : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Linha de totais */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell colSpan={3}>TOTAL</TableCell>
                      <TableCell className="text-right text-[var(--md3-success)]">{formatCurrency(totais.fatMeta)}</TableCell>
                      <TableCell className="text-right text-[var(--md3-error)]">{formatCurrency(totais.invProjetado)}</TableCell>
                      <TableCell className="text-right">{roasProjetadoTotal.toFixed(2)}x</TableCell>
                      <TableCell className="text-right">{formatCurrency(totais.fatAtual)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(totais.invAtual)}</TableCell>
                      <TableCell className="text-right">{roasAtualTotal > 0 ? `${roasAtualTotal.toFixed(2)}x` : "-"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Funil */}
        <TabsContent value="funil">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-display)' }}>
                <Calculator className="h-5 w-5 inline mr-2" />
                Calculadora de Funil
              </CardTitle>
              <CardDescription>Simule cenários de campanha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Inputs */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ticket Médio (R$)</label>
                    <Input
                      type="number"
                      value={calculadora.ticketMedio}
                      onChange={(e) => setCalculadora({ ...calculadora, ticketMedio: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Taxa de Conversão (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={calculadora.taxaConversao}
                      onChange={(e) => setCalculadora({ ...calculadora, taxaConversao: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta de Faturamento (R$)</label>
                    <Input
                      type="number"
                      value={calculadora.metaFaturamento}
                      onChange={(e) => setCalculadora({ ...calculadora, metaFaturamento: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CPL Estimado (R$)</label>
                    <Input
                      type="number"
                      value={calculadora.cpl}
                      onChange={(e) => setCalculadora({ ...calculadora, cpl: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Resultados */}
                <div className="space-y-4 p-6 rounded-lg bg-muted/50">
                  <h4 className="font-semibold">Projeção do Funil</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded bg-background">
                      <span className="text-muted-foreground">Vendas Necessárias</span>
                      <span className="text-xl font-bold">{vendasNecessarias}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded bg-background">
                      <span className="text-muted-foreground">Leads Necessários</span>
                      <span className="text-xl font-bold">{leadsNecessarios.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded bg-background">
                      <span className="text-muted-foreground">Investimento Estimado</span>
                      <span className="text-xl font-bold text-[var(--md3-error)]">{formatCurrency(investimentoEstimado)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded bg-background">
                      <span className="text-muted-foreground">ROAS Estimado</span>
                      <span className="text-xl font-bold text-[var(--md3-success)]">{roasEstimado.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
