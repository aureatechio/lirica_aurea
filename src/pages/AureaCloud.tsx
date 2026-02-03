import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Mock data structures - ready for Supabase integration via useFunilMetricas
interface MetricData {
  value: string;
  variation: string;
  variationPercent: number;
  conversion?: string;
  costMetric?: string;
  costValue?: string;
}

interface FunilMetric {
  name: string;
  hoje: MetricData;
  ontem: MetricData;
  mes: MetricData;
}

// Static data - structured for easy Supabase integration
const funilData: FunilMetric[] = [
  {
    name: "INVESTIMENTO",
    hoje: { value: "R$ 4.035", variation: "+33%", variationPercent: 33 },
    ontem: { value: "R$ 11.528", variation: "-235%", variationPercent: -235 },
    mes: { value: "R$ 24.098", variation: "+205%", variationPercent: 205 },
  },
  {
    name: "VISITANTES",
    hoje: { value: "341", variation: "-29%", variationPercent: -29, conversion: "333,7%", costMetric: "CPV", costValue: "R$ 11,83" },
    ontem: { value: "2.135", variation: "+296%", variationPercent: 296, conversion: "1,5%", costMetric: "CPV", costValue: "R$ 5,40" },
    mes: { value: "4.373", variation: "+216%", variationPercent: 216, conversion: "27,9%", costMetric: "CPV", costValue: "R$ 5,51" },
  },
  {
    name: "LEADS RECEBIDOS",
    hoje: { value: "1.138", variation: "+696%", variationPercent: 696, conversion: "49,4%", costMetric: "CPL", costValue: "R$ 3,55" },
    ontem: { value: "31", variation: "-71%", variationPercent: -71, conversion: "35,5%", costMetric: "CPL", costValue: "R$ 371,87" },
    mes: { value: "1.220", variation: "+321%", variationPercent: 321, conversion: "47,5%", costMetric: "CPL", costValue: "R$ 19,75" },
  },
  {
    name: "OPORTUNIDADES",
    hoje: { value: "562", variation: "+1713%", variationPercent: 1713, conversion: "0,7%", costMetric: "CPO", costValue: "R$ 7,18" },
    ontem: { value: "11", variation: "-65%", variationPercent: -65, conversion: "81,8%", costMetric: "CPO", costValue: "R$ 1.047,99" },
    mes: { value: "579", variation: "+704%", variationPercent: 704, conversion: "2,2%", costMetric: "CPO", costValue: "R$ 41,62" },
  },
  {
    name: "REUNIÕES",
    hoje: { value: "4", variation: "0%", variationPercent: 0, conversion: "275,0%", costMetric: "CPR", costValue: "R$ 1.008,84" },
    ontem: { value: "9", variation: "0%", variationPercent: 0, conversion: "677,8%", costMetric: "CPR", costValue: "R$ 1.280,87" },
    mes: { value: "13", variation: "0%", variationPercent: 0, conversion: "553,8%", costMetric: "CPR", costValue: "R$ 1.853,72" },
  },
  {
    name: "PROPOSTAS",
    hoje: { value: "11", variation: "+450%", variationPercent: 450, conversion: "0,0%", costMetric: "CPP", costValue: "R$ 366,85" },
    ontem: { value: "61", variation: "+455%", variationPercent: 455, conversion: "3,3%", costMetric: "CPP", costValue: "R$ 188,98" },
    mes: { value: "72", variation: "+454%", variationPercent: 454, conversion: "2,8%", costMetric: "CPP", costValue: "R$ 334,70" },
  },
  {
    name: "VENDAS",
    hoje: { value: "0", variation: "-100%", variationPercent: -100, costMetric: "CAC", costValue: "R$ 0,00" },
    ontem: { value: "2", variation: "0%", variationPercent: 0, costMetric: "CAC", costValue: "R$ 5.763,93" },
    mes: { value: "2", variation: "0%", variationPercent: 0, costMetric: "CAC", costValue: "R$ 12.049" },
  },
];

// Dados do funil consolidado (visualização vertical)
const funilConsolidado = [
  { name: "INVESTIMENTO", value: "R$ 425.049", percentage: "74%", conversion: "", metric: "", width: "100%" },
  { name: "VISITANTES", value: "125.886", percentage: "", conversion: "8.5%", metric: "CPV R$ 3.38", width: "92%" },
  { name: "LEADS RECEBIDOS", value: "10.657", percentage: "50%", conversion: "22.6%", metric: "CPL R$ 39.88", width: "84%" },
  { name: "OPORTUNIDADES", value: "2.409", percentage: "7%", conversion: "14.6%", metric: "CPO R$ 176.52", width: "76%" },
  { name: "REUNIÕES", value: "351", percentage: "1%", conversion: "440.0%", metric: "CPR R$ 1.219.96", width: "68%" },
  { name: "PROPOSTAS", value: "1.576", percentage: "17%", conversion: "6.8%", metric: "CPP R$ 269.70", width: "60%" },
  { name: "VENDAS", value: "107", percentage: "20%", conversion: "", metric: "CAC R$ 3.972.42", width: "52%" },
];

type ViewType = "comparativo" | "consolidado";

// Componente para célula de métrica no grid
function MetricCell({
  data,
  isLast = false,
  isOntem = false
}: {
  data: MetricData;
  isLast?: boolean;
  isOntem?: boolean;
}) {
  const getVariationIcon = () => {
    if (data.variationPercent > 0) return <TrendingUp className="h-4 w-4" />;
    if (data.variationPercent < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getVariationColor = () => {
    if (data.variationPercent > 0) return "text-green-500";
    if (data.variationPercent < 0) return "text-red-400";
    return "text-[var(--md3-on-surface-variant)]";
  };

  return (
    <div className="relative group">
      <div
        className={`
          bg-[var(--md3-surface)]
          p-6
          rounded-2xl
          border
          border-[var(--md3-outline-variant)]/40
          shadow-sm
          transition-colors
          group-hover:border-[var(--md3-primary)]/50
          ${isLast ? "border-b-4 border-b-[var(--md3-primary)]/40" : ""}
          ${isOntem ? "opacity-70" : ""}
        `}
      >
        <div className={`text-2xl font-bold font-mono ${isOntem ? "text-[var(--md3-on-surface-variant)]" : "text-[var(--md3-on-surface)]"}`}>
          {data.value}
        </div>
        <div className={`flex items-center gap-1 text-sm mt-1 ${getVariationColor()}`}>
          {getVariationIcon()}
          <span>{data.variation}</span>
        </div>
        {data.costMetric && (
          <div className="mt-4 flex justify-between text-[10px] text-[var(--md3-on-surface-variant)] uppercase font-bold">
            <span>{data.costMetric}</span>
            <span className="text-[var(--md3-on-surface)] font-mono">{data.costValue}</span>
          </div>
        )}
      </div>
      {data.conversion && (
        <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 z-10 bg-[var(--md3-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
          CONV: {data.conversion}
        </div>
      )}
    </div>
  );
}

// Componente para célula no funil vertical
function FunnelStep({
  step,
  isHovered,
  onHover,
  onLeave
}: {
  step: typeof funilConsolidado[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="transition-all duration-200"
      style={{
        width: step.width,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`
          bg-[var(--md3-surface-variant)]
          rounded-2xl
          p-4
          border
          border-[var(--md3-outline-variant)]
          transition-all
          duration-200
          ${isHovered ? "shadow-lg" : "shadow-sm"}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-title-medium text-[var(--md3-on-surface-variant)] font-medium">
            {step.name}
          </h3>
          {step.percentage && (
            <span className="text-label-small text-[var(--md3-on-surface-variant)] bg-[var(--md3-surface)] px-2 py-1 rounded-md">
              {step.percentage}
            </span>
          )}
        </div>
        <div className="text-headline-small text-[var(--md3-primary)] font-bold mb-2">
          {step.value}
        </div>
        <div className="flex items-center gap-4 text-body-small text-[var(--md3-on-surface-variant)]">
          {step.conversion && (
            <div>
              <span className="text-label-small">Conv: </span>
              <span className="font-medium">{step.conversion}</span>
            </div>
          )}
          {step.metric && (
            <div className="flex-1">
              <span className="font-medium">{step.metric}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AureaCloud() {
  const [viewType, setViewType] = useState<ViewType>("consolidado");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Google Blue color palette override for this page
  const googleBlueTheme = {
    '--md3-primary': 'oklch(0.58 0.17 255)',           // Google Blue #4285F4
    '--md3-on-primary': 'oklch(1 0 0)',                 // White
    '--md3-primary-container': 'oklch(0.90 0.08 255)', // Light blue
    '--md3-on-primary-container': 'oklch(0.25 0.12 255)', // Dark blue
  } as React.CSSProperties;

  return (
    <div className="container mx-auto space-y-8 py-8" style={googleBlueTheme}>
      {/* Page Header with View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-headline-large text-[var(--md3-on-surface)]">
            Visão Gerencial
          </h1>
          <p className="text-body-small text-[var(--md3-on-surface-variant)]">
            Funil Consolidado • Comparativo de Desempenho
          </p>
        </div>

        {/* View Type Selector */}
        <div className="flex items-center gap-2 bg-[var(--md3-surface)] border border-[var(--md3-outline-variant)] rounded-full p-1">
          <button
            onClick={() => setViewType("comparativo")}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${viewType === "comparativo"
                ? "bg-[var(--md3-primary)] text-white shadow-sm"
                : "text-[var(--md3-on-surface-variant)] hover:bg-[var(--md3-surface-variant)]"
              }
            `}
          >
            Hoje / Ontem / Mês
          </button>
          <button
            onClick={() => setViewType("consolidado")}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${viewType === "consolidado"
                ? "bg-[var(--md3-primary)] text-white shadow-sm"
                : "text-[var(--md3-on-surface-variant)] hover:bg-[var(--md3-surface-variant)]"
              }
            `}
          >
            Funil Consolidado
          </button>
        </div>
      </div>

      {/* View: Comparativo (Grid Hoje/Ontem/Mês) */}
      {viewType === "comparativo" && (
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Grid com 4 colunas: Hoje, Ontem, Mês, Label */}
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 180px" }}
            >
              {/* Header */}
              <div className="text-center pb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--md3-on-surface-variant)]">
                  Hoje
                </h3>
              </div>
              <div className="text-center pb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--md3-on-surface-variant)]">
                  Ontem
                </h3>
              </div>
              <div className="text-center pb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--md3-on-surface-variant)]">
                  Mês Atual
                </h3>
              </div>
              <div className="pb-4"></div>

              {/* Rows */}
              {funilData.map((metric, index) => (
                <>
                  <div key={`hoje-${index}`} className={index > 0 ? "pt-4" : ""}>
                    <MetricCell data={metric.hoje} isLast={metric.name === "VENDAS"} />
                  </div>
                  <div key={`ontem-${index}`} className={index > 0 ? "pt-4" : ""}>
                    <MetricCell data={metric.ontem} isLast={metric.name === "VENDAS"} isOntem />
                  </div>
                  <div key={`mes-${index}`} className={index > 0 ? "pt-4" : ""}>
                    <MetricCell data={metric.mes} isLast={metric.name === "VENDAS"} />
                  </div>
                  <div
                    key={`label-${index}`}
                    className={`flex items-center font-bold tracking-tight ${index > 0 ? "pt-4" : ""} ${
                      metric.name === "VENDAS"
                        ? "text-[var(--md3-primary)]"
                        : "text-[var(--md3-on-surface-variant)]"
                    }`}
                  >
                    {metric.name}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View: Funil Consolidado (Vertical) */}
      {viewType === "consolidado" && (
        <div className="bg-[var(--md3-surface)] rounded-2xl border border-[var(--md3-outline-variant)] p-8">
          <div className="space-y-4">
            {funilConsolidado.map((step, index) => (
              <FunnelStep
                key={index}
                step={step}
                isHovered={hoveredStep === index}
                onHover={() => setHoveredStep(index)}
                onLeave={() => setHoveredStep(null)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--md3-surface)]/40 backdrop-blur-md p-4 rounded-xl border border-[var(--md3-outline-variant)]/30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[var(--md3-primary)]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--md3-on-surface-variant)] font-medium uppercase tracking-wider">
              Conversão Média
            </p>
            <p className="text-lg font-bold text-[var(--md3-on-surface)]">
              4.2% <span className="text-green-500 text-xs">+0.5%</span>
            </p>
          </div>
        </div>
        <div className="bg-[var(--md3-surface)]/40 backdrop-blur-md p-4 rounded-xl border border-[var(--md3-outline-variant)]/30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--md3-on-surface-variant)] font-medium uppercase tracking-wider">
              Oportunidades Quentes
            </p>
            <p className="text-lg font-bold text-[var(--md3-on-surface)]">
              42 <span className="text-[var(--md3-on-surface-variant)] text-xs font-normal">atualmente</span>
            </p>
          </div>
        </div>
        <div className="bg-[var(--md3-surface)]/40 backdrop-blur-md p-4 rounded-xl border border-[var(--md3-outline-variant)]/30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--md3-on-surface-variant)] font-medium uppercase tracking-wider">
              Ticket Médio
            </p>
            <p className="text-lg font-bold text-[var(--md3-on-surface)]">
              R$ 4.250 <span className="text-green-500 text-xs">▲ 12%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
