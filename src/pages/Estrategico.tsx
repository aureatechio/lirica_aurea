import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Edit,
  Building2,
  Sparkles,
  Rocket,
  TrendingUp,
  DollarSign,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Target,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { SugestoesAcao } from "@/components/SugestoesAcao";
import {
  campanhasT1MGS,
  campanhasT1Acelerai,
  campanhasT2MGS,
  campanhasT2Acelerai,
  campanhasT3Perpetuo,
  campanhasT4RenovacaoRecuperacao,
  campanhasT5UpsellRecorrencia,
  campanhasOutros,
  metasAnuais,
  analisarGaps,
  tierDescricoes,
  type Nucleo,
  type TierNumber,
  type Campanha,
} from "@/data/campanhasData";

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const statusColors: Record<string, string> = {
  "lançamento": "bg-red-500 text-white",
  "perpétuo": "bg-green-500/20 text-green-400 border border-green-500/30",
  "lista_espera": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "sessão_aut": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "pre_lancamento": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  "black": "bg-black text-white border border-white/30",
  "promo": "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  "renovação": "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  "recuperação": "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "rmkt": "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  "upsell": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  "recorrência": "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
  "-": "",
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

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    "lançamento": "🚀",
    "perpétuo": "♾️",
    "lista_espera": "📋",
    "sessão_aut": "✍️",
    "pre_lancamento": "⏳",
    "black": "🖤",
    "promo": "🎁",
    "renovação": "🔄",
    "recuperação": "💪",
    "rmkt": "📢",
    "upsell": "⬆️",
    "recorrência": "🔁",
    "-": "-",
  };
  return labels[status] || status;
}

// Calcular projeção mensal baseada nas campanhas
function calcularProjecaoMensal(campanhas: Campanha[]): { mes: string; faturamento: number; investimento: number }[] {
  return meses.map(mes => {
    let faturamento = 0;
    let investimento = 0;
    
    campanhas.forEach(c => {
      const status = c.meses[mes];
      if (status && status !== "-") {
        const mesesAtivos = Object.values(c.meses).filter(s => s && s !== "-").length;
        if (mesesAtivos > 0 && c.metaFaturamento) {
          faturamento += c.metaFaturamento / mesesAtivos;
          if (c.investimentoProjetado) {
            investimento += c.investimentoProjetado / mesesAtivos;
          }
        }
      }
    });
    
    return { mes, faturamento, investimento };
  });
}

// Componente de célula editável
function EditableCell({ 
  value, 
  onSave, 
  type = "text",
  prefix = "",
  suffix = ""
}: { 
  value: string | number; 
  onSave: (value: string | number) => void;
  type?: "text" | "number" | "currency";
  prefix?: string;
  suffix?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());

  const handleSave = () => {
    if (type === "number" || type === "currency") {
      onSave(parseFloat(tempValue.replace(/[^\d.-]/g, '')) || 0);
    } else {
      onSave(tempValue);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="h-7 w-24 text-xs"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setEditing(false);
          }}
        />
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleSave}>
          <Save className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setEditing(false)}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-1 cursor-pointer hover:bg-zinc-800/50 rounded px-1 py-0.5 group"
      onClick={() => setEditing(true)}
    >
      <span>{prefix}{value}{suffix}</span>
      <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  );
}

// Componente de seção por núcleo
function NucleoSection({ 
  nucleo, 
  campanhas,
  metaAnual,
  faturadoJaneiro,
  projecaoAtual,
  gap
}: { 
  nucleo: Nucleo;
  campanhas: Campanha[];
  metaAnual: number;
  faturadoJaneiro: number;
  projecaoAtual: number;
  gap: ReturnType<typeof analisarGaps>[0];
}) {
  const [editingCampanha, setEditingCampanha] = useState<string | null>(null);
  
  // Agrupar campanhas por tier
  const campanhasPorTier = ([1, 2, 3, 4, 5] as TierNumber[]).map(tier => ({
    tier,
    nome: tierDescricoes[tier].nome,
    campanhas: campanhas.filter(c => c.tier === tier),
    faturamento: campanhas.filter(c => c.tier === tier).reduce((acc, c) => acc + (c.metaFaturamento || 0), 0),
    investimento: campanhas.filter(c => c.tier === tier).reduce((acc, c) => acc + (c.investimentoProjetado || 0), 0),
  }));

  const projecaoMensal = calcularProjecaoMensal(campanhas);

  return (
    <div className="space-y-6">
      {/* Card de Status do Núcleo */}
      <Card className={`border-2 ${
        gap.status === 'critical' ? 'border-red-500 bg-red-500/5' : 
        gap.status === 'warning' ? 'border-yellow-500 bg-yellow-500/5' : 
        'border-green-500 bg-green-500/5'
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              {gap.status === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
              {gap.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
              {gap.status === 'ok' && <CheckCircle className="h-5 w-5 text-green-500" />}
              Status {nucleo}
            </CardTitle>
            <Badge 
              variant={gap.status === 'critical' ? 'destructive' : gap.status === 'warning' ? 'outline' : 'default'}
              className={gap.status === 'warning' ? 'border-yellow-500 text-yellow-500' : ''}
            >
              {gap.percentualAtingido.toFixed(0)}% da meta
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Meta Anual</span>
              <p className="text-2xl font-bold">{formatCurrency(metaAnual)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Faturado Janeiro</span>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(faturadoJaneiro)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Projeção Atual</span>
              <p className="text-2xl font-bold text-blue-400">{formatCurrency(projecaoAtual)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Gap</span>
              <p className={`text-2xl font-bold ${gap.gap > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {gap.gap > 0 ? '-' : '+'}{formatCurrency(Math.abs(gap.gap))}
              </p>
            </div>
          </div>
          
          {gap.status !== 'ok' && gap.sugestoes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-yellow-400 mb-2">Ações sugeridas para cobrir o gap:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {gap.sugestoes.slice(0, 3).map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projeção Mensal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Projeção Mensal de Faturamento
              </CardTitle>
              <CardDescription>Metas e investimentos por mês • Clique para editar</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Campanha
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Métrica</TableHead>
                  {meses.map(mes => (
                    <TableHead key={mes} className="text-center min-w-[80px]">{mes}</TableHead>
                  ))}
                  <TableHead className="text-center font-bold">TOTAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Faturamento</TableCell>
                  {projecaoMensal.map(p => (
                    <TableCell key={p.mes} className="text-center text-green-400 text-sm">
                      <EditableCell 
                        value={formatCurrency(p.faturamento)} 
                        onSave={(v) => console.log('Save:', p.mes, v)}
                        type="currency"
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold text-green-400">
                    {formatCurrency(projecaoMensal.reduce((acc, p) => acc + p.faturamento, 0))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Investimento</TableCell>
                  {projecaoMensal.map(p => (
                    <TableCell key={p.mes} className="text-center text-red-400 text-sm">
                      <EditableCell 
                        value={formatCurrency(p.investimento)} 
                        onSave={(v) => console.log('Save:', p.mes, v)}
                        type="currency"
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold text-red-400">
                    {formatCurrency(projecaoMensal.reduce((acc, p) => acc + p.investimento, 0))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ROAS</TableCell>
                  {projecaoMensal.map(p => (
                    <TableCell key={p.mes} className="text-center text-sm">
                      {p.investimento > 0 ? (p.faturamento / p.investimento).toFixed(1) : "-"}x
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold">
                    {projecaoMensal.reduce((acc, p) => acc + p.investimento, 0) > 0 
                      ? (projecaoMensal.reduce((acc, p) => acc + p.faturamento, 0) / 
                         projecaoMensal.reduce((acc, p) => acc + p.investimento, 0)).toFixed(1) 
                      : "-"}x
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Campanhas por Tier */}
      <div className="space-y-4">
        {campanhasPorTier.filter(t => t.campanhas.length > 0).map(tierGroup => (
          <Card key={tierGroup.tier}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    T{tierGroup.tier} - {tierGroup.nome}
                  </CardTitle>
                  <CardDescription>{tierDescricoes[tierGroup.tier].descricao}</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Faturamento: </span>
                    <span className="text-green-400 font-medium">{formatCurrency(tierGroup.faturamento)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Investimento: </span>
                    <span className="text-red-400 font-medium">{formatCurrency(tierGroup.investimento)}</span>
                  </div>
                  <Badge variant="outline">{tierGroup.campanhas.length} campanhas</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Campanha</TableHead>
                      <TableHead className="w-[100px]">Produto</TableHead>
                      <TableHead className="text-right w-[100px]">Meta</TableHead>
                      <TableHead className="text-right w-[100px]">Invest.</TableHead>
                      <TableHead className="text-center w-[60px]">ROAS</TableHead>
                      {meses.map(mes => (
                        <TableHead key={mes} className="text-center w-[50px]">{mes}</TableHead>
                      ))}
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tierGroup.campanhas.map((campanha, idx) => (
                      <TableRow key={`${campanha.id}-${idx}`}>
                        <TableCell className="font-medium">
                          <EditableCell 
                            value={campanha.nome} 
                            onSave={(v) => console.log('Save nome:', v)}
                          />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <EditableCell 
                            value={campanha.produto} 
                            onSave={(v) => console.log('Save produto:', v)}
                          />
                        </TableCell>
                        <TableCell className="text-right text-green-400">
                          <EditableCell 
                            value={campanha.metaFaturamento ? formatCurrency(campanha.metaFaturamento) : '-'} 
                            onSave={(v) => console.log('Save meta:', v)}
                            type="currency"
                          />
                        </TableCell>
                        <TableCell className="text-right text-red-400">
                          <EditableCell 
                            value={campanha.investimentoProjetado ? formatCurrency(campanha.investimentoProjetado) : '-'} 
                            onSave={(v) => console.log('Save invest:', v)}
                            type="currency"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          {campanha.roasProjetado ? `${campanha.roasProjetado.toFixed(1)}x` : '-'}
                        </TableCell>
                        {meses.map(mes => (
                          <TableCell key={mes} className="text-center p-1">
                            {campanha.meses[mes] && campanha.meses[mes] !== "-" ? (
                              <Badge className={`text-xs px-1 py-0 ${statusColors[campanha.meses[mes]] || ''}`}>
                                {getStatusLabel(campanha.meses[mes])}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Estrategico() {
  const [nucleoAtivo, setNucleoAtivo] = useState<Nucleo>("MGS");

  // Todas as campanhas agrupadas
  const todasCampanhas = [
    ...campanhasT1MGS,
    ...campanhasT1Acelerai,
    ...campanhasT2MGS,
    ...campanhasT2Acelerai,
    ...campanhasT3Perpetuo,
    ...campanhasT4RenovacaoRecuperacao,
    ...campanhasT5UpsellRecorrencia,
    ...campanhasOutros,
  ];

  // Agrupar campanhas por núcleo
  const campanhasPorNucleo: Record<Nucleo, Campanha[]> = {
    MGS: todasCampanhas.filter(c => c.nucleo === "MGS"),
    ACELERAI: todasCampanhas.filter(c => c.nucleo === "ACELERAI"),
    OUTROS: todasCampanhas.filter(c => c.nucleo === "OUTROS"),
  };

  // Análise de gaps
  const gapsAnalysis = analisarGaps();
  const getGap = (nucleo: Nucleo) => gapsAnalysis.find(g => g.nucleo === nucleo) || gapsAnalysis[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Visão Estratégica
          </h1>
          <p className="text-muted-foreground">
            Planejamento anual 2026 • Cronograma de lançamentos e projeções
          </p>
        </div>
        <SugestoesAcao campanhasExistentes={[
          ...campanhasT1MGS,
          ...campanhasT1Acelerai,
          ...campanhasT2MGS,
          ...campanhasT2Acelerai,
          ...campanhasT3Perpetuo,
          ...campanhasT4RenovacaoRecuperacao,
          ...campanhasT5UpsellRecorrencia,
          ...campanhasOutros,
        ]} />
      </div>

      {/* Tabs por Núcleo */}
      <Tabs value={nucleoAtivo} onValueChange={(v) => setNucleoAtivo(v as Nucleo)} className="space-y-6">
        <TabsList className="bg-zinc-900/50 border border-zinc-800">
          <TabsTrigger value="MGS" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Building2 className="w-4 h-4 mr-2" />
            MGS
          </TabsTrigger>
          <TabsTrigger value="ACELERAI" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Aceleraí
          </TabsTrigger>
          <TabsTrigger value="OUTROS" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Rocket className="w-4 h-4 mr-2" />
            Outros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="MGS">
          <NucleoSection 
            nucleo="MGS"
            campanhas={campanhasPorNucleo.MGS}
            metaAnual={metasAnuais.MGS.meta}
            faturadoJaneiro={metasAnuais.MGS.faturadoJaneiro}
            projecaoAtual={metasAnuais.MGS.projecaoAtual}
            gap={getGap("MGS")}
          />
        </TabsContent>

        <TabsContent value="ACELERAI">
          <NucleoSection 
            nucleo="ACELERAI"
            campanhas={campanhasPorNucleo.ACELERAI}
            metaAnual={metasAnuais.ACELERAI.meta}
            faturadoJaneiro={metasAnuais.ACELERAI.faturadoJaneiro}
            projecaoAtual={metasAnuais.ACELERAI.projecaoAtual}
            gap={getGap("ACELERAI")}
          />
        </TabsContent>

        <TabsContent value="OUTROS">
          <NucleoSection 
            nucleo="OUTROS"
            campanhas={campanhasPorNucleo.OUTROS}
            metaAnual={metasAnuais.OUTROS.meta}
            faturadoJaneiro={metasAnuais.OUTROS.faturadoJaneiro}
            projecaoAtual={metasAnuais.OUTROS.projecaoAtual}
            gap={getGap("OUTROS")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
